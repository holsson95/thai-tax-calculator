import { annualTaxInputSchema } from './taxTool';

const WORKER_URL = 'https://mythaitaxes-mcp.hannwill999.workers.dev';

const breakdownSchema = {
  type: 'object',
  properties: {
    standardDeduction: { type: 'number' },
    personalAllowance: { type: 'number' },
    spouseAllowance: { type: 'number' },
    seniorAllowance: { type: 'number' },
    childAllowance: { type: 'number' },
    parentAllowance: { type: 'number' },
    socialSecurity: { type: 'number' },
    lifeInsurance: { type: 'number' },
    healthInsurance: { type: 'number' },
    pensionFund: { type: 'number' },
    providentFund: { type: 'number' },
    rmf: { type: 'number' },
    ssf: { type: 'number' },
    donations: { type: 'number' },
  },
};

const resultSchema = {
  type: 'object',
  properties: {
    grossIncome: { type: 'number', description: 'Total gross annual income in THB.' },
    totalAllowances: { type: 'number', description: 'Sum of personal/spouse/senior/child/parent allowances.' },
    totalDeductions: { type: 'number', description: 'Sum of all deductions, including the standard deduction.' },
    taxableIncome: { type: 'number', description: 'Income remaining after allowances and deductions.' },
    taxOwed: { type: 'number', description: 'Total tax computed from the progressive brackets, in THB.' },
    taxWithheld: { type: 'number', description: 'Tax already withheld, as passed in the request.' },
    refundOrOwed: {
      type: 'number',
      description: 'taxWithheld minus taxOwed. Positive means a refund; negative means additional tax is owed.',
    },
    effectiveRate: { type: 'number', description: 'taxOwed as a percentage of grossIncome.' },
    breakdown: breakdownSchema,
  },
};

export const openApiSpec = {
  openapi: '3.1.0',
  info: {
    title: 'My Thai Taxes — Annual Income Tax Calculator',
    description:
      'Calculates Thailand personal income tax (PIT) for a salaried employee for a tax year, using ' +
      'current progressive tax brackets, standard allowances, and common deductions. Free, no API key required.',
    version: '1.0.0',
  },
  servers: [{ url: WORKER_URL }],
  paths: {
    '/api/calculate-annual-tax': {
      post: {
        operationId: 'calculateThaiAnnualIncomeTax',
        summary: 'Calculate Thai annual personal income tax for a salaried employee',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: annualTaxInputSchema },
          },
        },
        responses: {
          '200': {
            description: 'Tax calculation result',
            content: {
              'application/json': { schema: resultSchema },
            },
          },
          '400': {
            description: 'Invalid input',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { error: { type: 'string' } } },
              },
            },
          },
        },
      },
    },
  },
} as const;
