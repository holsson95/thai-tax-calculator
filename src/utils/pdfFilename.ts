import { EmploymentType } from '../types/taxForm';

const EMPLOYMENT_TYPE_SLUG: Record<string, string> = {
  salaried: 'salaried',
  freelancer: 'freelancer',
  'self-employed': 'freelancer',
  sole_proprietor: 'sole-proprietor',
  business: 'sole-proprietor',
  company_owner: 'company-owner',
};

export function generatePdfFilename(employmentType: EmploymentType, taxYear = 2025): string {
  const slug = EMPLOYMENT_TYPE_SLUG[employmentType] ?? 'tax';
  const today = new Date();
  const datePart =
    today.getFullYear().toString() +
    String(today.getMonth() + 1).padStart(2, '0') +
    String(today.getDate()).padStart(2, '0');
  return `thai-tax-packet-${taxYear}-${slug}-${datePart}.pdf`;
}
