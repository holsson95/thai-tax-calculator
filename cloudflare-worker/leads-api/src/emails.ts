import { LEAD_INCOME_TYPES, REMITTANCE_RANGES, URGENCY_OPTIONS } from '../../../src/shared/leads';
import type { EmailMessage, LeadRecord } from './types';

export function escapeHtml(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const thb = (n: number | null | undefined) =>
  typeof n === 'number' && Number.isFinite(n) ? `฿${Math.round(n).toLocaleString('en-US')}` : '—';

const label = <T extends { value: string; label: string }>(list: readonly T[], v: string) =>
  list.find((o) => o.value === v)?.label ?? v;

function layout(title: string, bodyHtml: string): string {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111827">
<div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;padding:24px">
<h1 style="font-size:20px;margin:0 0 16px">${escapeHtml(title)}</h1>
${bodyHtml}
</div></body></html>`;
}

const row = (k: string, v: string) =>
  `<tr><td style="padding:6px 8px;color:#6b7280;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 8px">${v}</td></tr>`;

/** Email to the partner firm with the lead details. */
export function partnerLeadEmail(lead: LeadRecord, to: string[]): EmailMessage {
  const incomeTypes = (JSON.parse(lead.income_types) as string[]).map((t) => label(LEAD_INCOME_TYPES, t)).join(', ');
  const flags = lead.flags ? (JSON.parse(lead.flags) as string[]) : [];
  const calc = lead.calculator ? (JSON.parse(lead.calculator) as Record<string, unknown>) : null;

  const rows = [
    row('Lead ID', `<strong>${escapeHtml(lead.id)}</strong>`),
    row('Name', escapeHtml(lead.name)),
    row('Email', `<a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a>`),
    row('WhatsApp / phone', escapeHtml(lead.phone || '—')),
    row('Nationality', escapeHtml(lead.nationality)),
    row('Days in Thailand', escapeHtml(lead.days_in_thailand ?? '—')),
    row('Income types', escapeHtml(incomeTypes || '—')),
    row('Yearly remittance', escapeHtml(label(REMITTANCE_RANGES, lead.remittance_range))),
    row('Urgency', escapeHtml(label(URGENCY_OPTIONS, lead.urgency))),
    row('Estimated Thai tax', escapeHtml(thb(lead.estimated_tax_thb))),
    row('Complexity flags', escapeHtml(flags.length ? flags.join(', ') : 'none')),
    row('Calculator', escapeHtml(lead.calculator_source ?? '—')),
    row('Notes', escapeHtml(lead.notes || '—').replace(/\n/g, '<br>')),
    row('Consent', `${escapeHtml(lead.consent_text)}<br><span style="color:#6b7280">${escapeHtml(lead.consent_recorded_at)}</span>`),
  ].join('');

  const html = layout(
    `New lead ${lead.id}${lead.is_duplicate ? ' (repeat enquiry)' : ''}`,
    `<table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
${calc ? `<p style="font-size:12px;color:#6b7280;margin-top:16px">Calculator snapshot: ${escapeHtml(JSON.stringify(calc))}</p>` : ''}
<p style="font-size:12px;color:#6b7280;margin-top:16px">The person consented to share these details with you so you can contact them about their Thai taxes. Figures are the visitor's own self-reported estimate.</p>`
  );

  const text = [
    `New lead ${lead.id}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || '-'}`,
    `Nationality: ${lead.nationality}`,
    `Days in Thailand: ${lead.days_in_thailand ?? '-'}`,
    `Income types: ${incomeTypes}`,
    `Yearly remittance: ${label(REMITTANCE_RANGES, lead.remittance_range)}`,
    `Urgency: ${label(URGENCY_OPTIONS, lead.urgency)}`,
    `Estimated Thai tax: ${thb(lead.estimated_tax_thb)}`,
    `Flags: ${flags.join(', ') || 'none'}`,
    `Notes: ${lead.notes || '-'}`,
    `Consent: ${lead.consent_text} (${lead.consent_recorded_at})`,
  ].join('\n');

  return { to, subject: `New Thai tax lead ${lead.id}`, html, text, replyTo: lead.email };
}

/** Confirmation to the visitor. */
export function userConfirmationEmail(lead: LeadRecord, bookingUrl: string | null, siteUrl: string, replyTo?: string): EmailMessage {
  const funded = `${siteUrl}/how-this-site-is-funded/`;
  const privacy = `${siteUrl}/privacy/`;
  const html = layout(
    'We have passed on your request',
    `<p>Hi ${escapeHtml(lead.name)},</p>
<p>Thanks for your request. We have shared your details with <strong>${escapeHtml(lead.partner_name)}</strong> so they can contact you about your Thai taxes. Your reference is <strong>${escapeHtml(lead.id)}</strong>.</p>
${bookingUrl ? `<p><a href="${escapeHtml(bookingUrl)}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px">Book your free 15-minute call</a></p>` : ''}
<p style="font-size:13px;color:#4b5563">The figures from our calculator are estimates for information only, not tax advice. ${escapeHtml(lead.partner_name)} is an independent firm; any advice comes from them.</p>
<p style="font-size:13px;color:#4b5563">My Thai Taxes may receive a referral fee from partner firms. <a href="${escapeHtml(funded)}">How this site is funded</a> · <a href="${escapeHtml(privacy)}">Privacy policy</a>. To withdraw consent or ask us to delete your details, reply to this email.</p>`
  );
  const text = `Hi ${lead.name},

Thanks for your request. We have shared your details with ${lead.partner_name} so they can contact you about your Thai taxes. Your reference is ${lead.id}.
${bookingUrl ? `\nBook your free 15-minute call: ${bookingUrl}\n` : ''}
The figures from our calculator are estimates for information only, not tax advice.
My Thai Taxes may receive a referral fee from partner firms: ${funded}
Privacy policy: ${privacy}. To withdraw consent or ask us to delete your details, reply to this email.`;
  return { to: [lead.email], subject: `Your Thai tax review request (${lead.id})`, html, text, replyTo };
}

export interface BreakdownPayload {
  calculator: string;
  taxYear: number;
  estimatedTaxThb: number;
  taxableIncomeThb: number;
  totalRemittedThb?: number;
  foreignAssessableThb?: number;
  brackets: { label: string; rate: number; taxableAmount: number; tax: number }[];
  flags: string[];
  assumptions: string[];
}

/** Coerce untrusted breakdown input into a safe, bounded shape. Returns null if unusable. */
export function sanitizeBreakdown(input: unknown): BreakdownPayload | null {
  if (!input || typeof input !== 'object') return null;
  const o = input as Record<string, unknown>;
  const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 && v < 1e12 ? v : null);
  const str = (v: unknown, max = 300) => (typeof v === 'string' ? v.slice(0, max) : null);
  const est = num(o.estimatedTaxThb);
  const taxable = num(o.taxableIncomeThb);
  const year = num(o.taxYear);
  if (est === null || taxable === null || year === null) return null;
  const brackets = Array.isArray(o.brackets)
    ? o.brackets.slice(0, 10).flatMap((b) => {
        const x = b as Record<string, unknown>;
        const l = str(x.label, 40), r = num(x.rate), a = num(x.taxableAmount), t = num(x.tax);
        return l !== null && r !== null && r <= 1 && a !== null && t !== null ? [{ label: l, rate: r, taxableAmount: a, tax: t }] : [];
      })
    : [];
  const strings = (v: unknown, n: number) => (Array.isArray(v) ? v.slice(0, n).flatMap((s) => (str(s) !== null ? [str(s) as string] : [])) : []);
  return {
    calculator: str(o.calculator, 40) ?? 'calculator',
    taxYear: Math.round(year),
    estimatedTaxThb: est,
    taxableIncomeThb: taxable,
    totalRemittedThb: num(o.totalRemittedThb) ?? undefined,
    foreignAssessableThb: num(o.foreignAssessableThb) ?? undefined,
    brackets,
    flags: strings(o.flags, 12),
    assumptions: strings(o.assumptions, 8),
  };
}

export function breakdownEmail(to: string, b: BreakdownPayload, siteUrl: string, unsubscribeUrl: string | null): EmailMessage {
  const rows = [
    b.totalRemittedThb !== undefined ? row('Brought into Thailand', escapeHtml(thb(b.totalRemittedThb))) : '',
    b.foreignAssessableThb !== undefined ? row('Assessable remitted income', escapeHtml(thb(b.foreignAssessableThb))) : '',
    row('Taxable income', escapeHtml(thb(b.taxableIncomeThb))),
    row('Estimated Thai tax', `<strong>${escapeHtml(thb(b.estimatedTaxThb))}</strong>`),
  ].join('');
  const brackets = b.brackets.length
    ? `<h2 style="font-size:16px;margin:20px 0 8px">Tax by bracket</h2><table style="width:100%;border-collapse:collapse;font-size:14px">
${b.brackets.map((x) => `<tr><td style="padding:4px 8px">${escapeHtml(x.label)}</td><td style="padding:4px 8px;text-align:right">${Math.round(x.rate * 100)}%</td><td style="padding:4px 8px;text-align:right">${escapeHtml(thb(x.taxableAmount))}</td><td style="padding:4px 8px;text-align:right">${escapeHtml(thb(x.tax))}</td></tr>`).join('')}
</table>`
    : '';
  const list = (title: string, items: string[]) =>
    items.length ? `<h2 style="font-size:16px;margin:20px 0 8px">${escapeHtml(title)}</h2><ul style="font-size:14px;padding-left:20px">${items.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>` : '';

  const html = layout(
    `Your ${b.taxYear} Thai tax estimate`,
    `<table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
${brackets}
${list('Things that make this more complex', b.flags)}
${list('Assumptions', b.assumptions)}
<p style="font-size:13px;color:#4b5563;margin-top:20px">This is an estimate for information only, not tax advice. Speak to a qualified tax advisor before filing or moving money. <a href="${escapeHtml(siteUrl)}">mythaitaxes.com</a></p>
${unsubscribeUrl ? `<p style="font-size:12px;color:#6b7280"><a href="${escapeHtml(unsubscribeUrl)}">Unsubscribe from updates</a></p>` : ''}`
  );
  const text = [
    `Your ${b.taxYear} Thai tax estimate`,
    b.totalRemittedThb !== undefined ? `Brought into Thailand: ${thb(b.totalRemittedThb)}` : '',
    b.foreignAssessableThb !== undefined ? `Assessable remitted income: ${thb(b.foreignAssessableThb)}` : '',
    `Taxable income: ${thb(b.taxableIncomeThb)}`,
    `Estimated Thai tax: ${thb(b.estimatedTaxThb)}`,
    ...b.brackets.map((x) => `  ${x.label} @ ${Math.round(x.rate * 100)}%: ${thb(x.tax)}`),
    b.flags.length ? `\nComplexity: ${b.flags.join('; ')}` : '',
    b.assumptions.length ? `\nAssumptions:\n- ${b.assumptions.join('\n- ')}` : '',
    '\nEstimate only, not tax advice.',
    unsubscribeUrl ? `Unsubscribe: ${unsubscribeUrl}` : '',
  ]
    .filter(Boolean)
    .join('\n');
  return { to: [to], subject: `Your ${b.taxYear} Thai tax estimate`, html, text };
}
