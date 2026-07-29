/**
 * mythaitaxes MCP + REST API
 *
 * Exposes the site's Thai personal income tax calculation as:
 *  - POST /api/calculate-annual-tax  — plain JSON REST endpoint
 *  - POST /mcp                       — stateless MCP (Streamable HTTP, JSON-only) endpoint
 *
 * Stateless by design (no sessions, no Durable Objects) so this runs on
 * Cloudflare's free Workers plan. Open CORS is intentional: there is no
 * auth, no secrets, and no side effects — it's a pure calculator meant to
 * be called from other sites and by AI agents.
 *
 * Deploy:
 *   cd cloudflare-worker/mcp-server
 *   npm install
 *   npx wrangler login   (first time only)
 *   npm run deploy
 */

import { annualTaxTool, runAnnualTaxCalculation } from './taxTool';
import { openApiSpec } from './openapi';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Mcp-Session-Id',
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

const SERVER_INFO = { name: 'mythaitaxes-mcp', version: '1.0.0' };
const PROTOCOL_VERSION = '2025-06-18';

interface JsonRpcRequest {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: { name?: string; arguments?: unknown };
}

function handleSingleMessage(msg: JsonRpcRequest): unknown | undefined {
  const { jsonrpc, id, method, params } = msg ?? {};
  const isNotification = id === undefined;

  if (jsonrpc !== '2.0' || typeof method !== 'string') {
    return isNotification ? undefined : { jsonrpc: '2.0', id: id ?? null, error: { code: -32600, message: 'Invalid Request' } };
  }

  switch (method) {
    case 'initialize':
      if (isNotification) return undefined;
      return {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: PROTOCOL_VERSION,
          capabilities: { tools: {} },
          serverInfo: SERVER_INFO,
        },
      };

    case 'notifications/initialized':
    case 'ping':
      return isNotification ? undefined : { jsonrpc: '2.0', id, result: {} };

    case 'tools/list':
      if (isNotification) return undefined;
      return { jsonrpc: '2.0', id, result: { tools: [annualTaxTool.definition] } };

    case 'tools/call': {
      if (isNotification) return undefined;
      const name = params?.name;
      if (name !== annualTaxTool.definition.name) {
        return { jsonrpc: '2.0', id, error: { code: -32602, message: `Unknown tool: ${name}` } };
      }
      try {
        return { jsonrpc: '2.0', id, result: annualTaxTool.run(params?.arguments) };
      } catch (err) {
        return {
          jsonrpc: '2.0',
          id,
          result: {
            isError: true,
            content: [{ type: 'text', text: err instanceof Error ? err.message : 'Invalid input' }],
          },
        };
      }
    }

    default:
      return isNotification ? undefined : { jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } };
  }
}

async function handleMcp(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    // No SSE/GET stream support — this server only answers discrete POST requests.
    return json({ error: 'This endpoint only supports POST (stateless MCP over Streamable HTTP).' }, 405);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } });
  }

  const isBatch = Array.isArray(body);
  const messages = (isBatch ? body : [body]) as JsonRpcRequest[];
  const responses = messages.map(handleSingleMessage).filter((r) => r !== undefined);

  if (responses.length === 0) {
    return new Response(null, { status: 202, headers: CORS_HEADERS });
  }
  return json(isBatch ? responses : responses[0]);
}

async function handleRest(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Use POST with a JSON body.' }, 405);
  }
  let args: unknown;
  try {
    args = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400);
  }
  try {
    const result = runAnnualTaxCalculation(args);
    return json(result);
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : 'Invalid input.' }, 400);
  }
}

function handleInfo(): Response {
  return json({
    name: SERVER_INFO.name,
    description: 'Thai personal income tax calculator API, from mythaitaxes.com.',
    endpoints: {
      mcp: { method: 'POST', path: '/mcp', description: 'MCP (Streamable HTTP, JSON-only, stateless) endpoint.' },
      rest: {
        method: 'POST',
        path: '/api/calculate-annual-tax',
        description: 'Plain JSON REST endpoint. Body/response shape matches the MCP tool.',
      },
      openapi: { method: 'GET', path: '/openapi.json', description: 'OpenAPI schema for the REST endpoint (for GPT Actions, etc).' },
    },
    tools: [annualTaxTool.definition],
    website: 'https://www.mythaitaxes.com',
  });
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const { pathname } = new URL(request.url);

    if (pathname === '/mcp') return handleMcp(request);
    if (pathname === '/api/calculate-annual-tax') return handleRest(request);
    if (pathname === '/openapi.json') return json(openApiSpec);
    if (pathname === '/' || pathname === '') return handleInfo();

    return json({ error: 'Not found' }, 404);
  },
};
