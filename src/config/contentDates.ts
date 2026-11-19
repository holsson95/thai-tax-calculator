/**
 * Visible "Last updated" dates for calculator and guide pages (ISO YYYY-MM-DD).
 *
 * Bump a date only when that page's content or the tax rules it relies on
 * were actually reviewed or changed. Article dates live on each article in
 * src/data/articles.ts (`updatedAt` / `publishedAt`), not here.
 */
export const PAGE_LAST_UPDATED = {
  // Calculators: date the tax rules they use were last reviewed (see TAX_RULES.md)
  home: '2026-11-19',
  annualTax: '2026-11-19',
  monthlyWithholding: '2026-11-19',
  foreignIncomeCalculator: '2026-11-19',
  // Guide pages: date of the last content change
  thailandTax2026: '2026-09-10',
  taxExamples: '2026-09-10',
} as const;

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Format an ISO date as e.g. "19 November 2026". Done by hand (not
 * toLocaleDateString) so the prerendered HTML and the client render are
 * byte-identical regardless of the runtime's locale/ICU data or timezone.
 */
export function formatDisplayDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(isoDate);
  if (!match) return isoDate;
  const [, year, month, day] = match;
  const monthName = MONTHS[Number(month) - 1];
  if (!monthName) return isoDate;
  return `${Number(day)} ${monthName} ${year}`;
}
