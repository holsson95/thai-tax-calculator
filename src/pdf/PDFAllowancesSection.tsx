import { Page, Text, View } from '@react-pdf/renderer';
import { TaxFormData, TaxBreakdown, TAX_CONSTANTS } from '../types/taxForm';
import { FreelancerFormData, FreelancerTaxResult, ExpenseMethod } from '../types/freelancerForm';
import { styles } from './pdfStyles';

function formatThb(amount: number): string {
  return 'THB ' + amount.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

interface PDFAllowancesSectionProps {
  formData: TaxFormData | FreelancerFormData;
  breakdown?: TaxBreakdown;
  freelancerResult?: FreelancerTaxResult;
  taxYear?: number;
}

const PageHeader: React.FC<{ taxYear: number }> = ({ taxYear }) => (
  <View style={styles.sectionPageHeader}>
    <Text style={styles.sectionPageTitle}>Allowances & Deductions</Text>
    <Text style={styles.sectionPageMeta}>Thai Tax Calculator · Tax Year {taxYear}</Text>
  </View>
);

const PageFooter: React.FC = () => (
  <View style={styles.pageFooter}>
    <Text>Thai Tax Calculator — Tax Filing Packet</Text>
    <Text>Page 3 — Allowances & Deductions</Text>
  </View>
);

function expenseMethodLabel(method: ExpenseMethod, recommended?: string): string {
  if (method === 'auto_compare') {
    return recommended === 'actual' ? 'Actual Expenses (Auto-selected as higher)' : 'Flat-Rate (Auto-selected as higher)';
  }
  if (method === 'force_flat') return 'Flat-Rate Deduction (Manual selection)';
  return 'Actual Expenses (Manual selection)';
}

const PDFAllowancesSection: React.FC<PDFAllowancesSectionProps> = ({
  formData,
  breakdown,
  freelancerResult,
  taxYear = 2025,
}) => {
  const isFreelancer = 'thaiIncomeEntries' in formData;

  // Build allowances list
  const allowances: { label: string; amount: number }[] = [];
  if (breakdown) {
    if (breakdown.personalAllowance) allowances.push({ label: 'Personal Allowance', amount: breakdown.personalAllowance });
    if (breakdown.spouseAllowance) allowances.push({ label: 'Spouse Allowance', amount: breakdown.spouseAllowance });
    if (breakdown.seniorAllowance) allowances.push({ label: 'Senior Citizen Allowance (65+)', amount: breakdown.seniorAllowance });
    if (breakdown.childAllowance) allowances.push({ label: `Children's Allowance (${formData.children.length} child${formData.children.length !== 1 ? 'ren' : ''})`, amount: breakdown.childAllowance });
    if (breakdown.parentAllowance) allowances.push({ label: `Parent Support Allowance (${formData.numberOfParents} parent${formData.numberOfParents !== 1 ? 's' : ''})`, amount: breakdown.parentAllowance });
  } else {
    // Reconstruct from formData constants
    allowances.push({ label: 'Personal Allowance', amount: TAX_CONSTANTS.PERSONAL_ALLOWANCE });
    if (formData.maritalStatus === 'married' && formData.spouseHasNoIncome) {
      allowances.push({ label: 'Spouse Allowance', amount: TAX_CONSTANTS.SPOUSE_ALLOWANCE });
    }
    if (formData.isAge65OrOlder) {
      allowances.push({ label: 'Senior Citizen Allowance (65+)', amount: TAX_CONSTANTS.SENIOR_ALLOWANCE });
    }
    if (formData.children.length > 0) {
      let childTotal = 0;
      formData.children.forEach((c, i) => {
        childTotal += TAX_CONSTANTS.CHILD_ALLOWANCE_BASE;
        if (i >= 1 && c.birthYear >= TAX_CONSTANTS.CHILD_BONUS_BIRTH_YEAR) {
          childTotal += TAX_CONSTANTS.CHILD_ALLOWANCE_BONUS;
        }
      });
      allowances.push({ label: `Children's Allowance (${formData.children.length} child${formData.children.length !== 1 ? 'ren' : ''})`, amount: childTotal });
    }
    if (formData.numberOfParents > 0) {
      allowances.push({ label: `Parent Support Allowance (${formData.numberOfParents})`, amount: formData.numberOfParents * TAX_CONSTANTS.PARENT_ALLOWANCE });
    }
  }
  const totalAllowances = allowances.reduce((s, a) => s + a.amount, 0);

  // Build deductions list
  const deductions: { label: string; amount: number; cap?: string }[] = [];
  if (breakdown) {
    if (breakdown.standardDeduction) deductions.push({ label: 'Expense Deduction (50%, max THB100,000)', amount: breakdown.standardDeduction });
    if (breakdown.socialSecurity) deductions.push({ label: 'Social Security Contributions', amount: breakdown.socialSecurity });
    if (breakdown.lifeInsurance) deductions.push({ label: 'Life Insurance Premium', amount: breakdown.lifeInsurance, cap: 'max THB100,000' });
    if (breakdown.healthInsurance) deductions.push({ label: 'Health Insurance Premium', amount: breakdown.healthInsurance, cap: 'max THB25,000' });
    if (breakdown.pensionFund) deductions.push({ label: 'Pension Fund Contribution', amount: breakdown.pensionFund, cap: 'max THB500,000' });
    if (breakdown.providentFund) deductions.push({ label: 'Provident Fund Contribution', amount: breakdown.providentFund, cap: 'max THB500,000' });
    if (breakdown.rmf) deductions.push({ label: 'RMF (Retirement Mutual Fund)', amount: breakdown.rmf, cap: 'max THB500,000' });
    if (breakdown.ssf) deductions.push({ label: 'SSF (Super Savings Fund)', amount: breakdown.ssf, cap: 'max THB200,000' });
    if (breakdown.donations) deductions.push({ label: 'Charitable Donations', amount: breakdown.donations, cap: 'max 10% of income' });
  } else {
    if (formData.includeSocialSecurity && formData.socialSecurityContribution > 0) {
      deductions.push({ label: 'Social Security Contributions', amount: formData.socialSecurityContribution });
    }
    if (formData.hasLifeInsurance && formData.lifeInsurance > 0) deductions.push({ label: 'Life Insurance Premium', amount: Math.min(formData.lifeInsurance, TAX_CONSTANTS.MAX_LIFE_INSURANCE), cap: 'max THB100,000' });
    if (formData.hasHealthInsurance && formData.healthInsurance > 0) deductions.push({ label: 'Health Insurance Premium', amount: Math.min(formData.healthInsurance, TAX_CONSTANTS.MAX_HEALTH_INSURANCE), cap: 'max THB25,000' });
    if (formData.hasPensionFund && formData.pensionFund > 0) deductions.push({ label: 'Pension Fund Contribution', amount: Math.min(formData.pensionFund, TAX_CONSTANTS.MAX_PENSION_FUND), cap: 'max THB500,000' });
    if (formData.hasProvidentFund && formData.providentFund > 0) deductions.push({ label: 'Provident Fund Contribution', amount: Math.min(formData.providentFund, TAX_CONSTANTS.MAX_PROVIDENT_FUND), cap: 'max THB500,000' });
    if (formData.hasRMF && formData.rmf > 0) deductions.push({ label: 'RMF (Retirement Mutual Fund)', amount: Math.min(formData.rmf, TAX_CONSTANTS.MAX_RMF), cap: 'max THB500,000' });
    if (formData.hasSSF && formData.ssf > 0) deductions.push({ label: 'SSF (Super Savings Fund)', amount: Math.min(formData.ssf, TAX_CONSTANTS.MAX_SSF), cap: 'max THB200,000' });
    if (formData.hasDonations && formData.donations > 0) deductions.push({ label: 'Charitable Donations', amount: formData.donations, cap: 'max 10% of income' });
  }
  const totalDeductions = deductions.reduce((s, d) => s + d.amount, 0);

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader taxYear={taxYear} />

      {/* ── Allowances ────────────────────────────────────────────── */}
      <Text style={styles.sectionTitle}>Family & Personal Allowances</Text>
      {allowances.map((a, i) => (
        <View key={a.label} style={[styles.kvRow, i % 2 === 1 ? styles.kvRowAlt : {}]}>
          <Text style={styles.kvLabel}>{a.label}</Text>
          <Text style={styles.kvValueGreen}>{formatThb(a.amount)}</Text>
        </View>
      ))}
      <View style={styles.kvTotalRow}>
        <Text style={styles.kvTotalLabel}>Total Allowances</Text>
        <Text style={styles.kvTotalValue}>{formatThb(totalAllowances)}</Text>
      </View>

      {/* ── Children Detail ───────────────────────────────────────── */}
      {formData.children.length > 0 && (
        <>
          <Text style={styles.subsectionTitle}>Children Detail</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { width: 40 }]}>#</Text>
              <Text style={[styles.tableHeaderCell, { width: 70 }]}>Birth Year</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Notes</Text>
              <Text style={[styles.tableHeaderCell, { width: 80, textAlign: 'right' }]}>Allowance</Text>
            </View>
            {formData.children.map((c, i) => {
              const base = TAX_CONSTANTS.CHILD_ALLOWANCE_BASE;
              const bonus = (i >= 1 && c.birthYear >= TAX_CONSTANTS.CHILD_BONUS_BIRTH_YEAR) ? TAX_CONSTANTS.CHILD_ALLOWANCE_BONUS : 0;
              const notes = [
                c.isStudent ? 'Full-time student (20–25)' : '',
                bonus > 0 ? '+THB30,000 birth bonus (2nd+ child born 2018+)' : '',
              ].filter(Boolean).join('; ') || '—';
              return (
                <View key={i} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
                  <Text style={[styles.tableCell, { width: 40 }]}>{i + 1}</Text>
                  <Text style={[styles.tableCell, { width: 70 }]}>{c.birthYear}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{notes}</Text>
                  <Text style={[styles.tableCell, { width: 80, textAlign: 'right' }]}>{formatThb(base + bonus)}</Text>
                </View>
              );
            })}
          </View>
        </>
      )}

      {/* ── Tax Deductions ────────────────────────────────────────── */}
      {deductions.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Tax Deductions</Text>
          {deductions.map((d, i) => (
            <View key={d.label} style={[styles.kvRow, i % 2 === 1 ? styles.kvRowAlt : {}]}>
              <Text style={styles.kvLabel}>
                {d.label}{d.cap ? ` (${d.cap})` : ''}
              </Text>
              <Text style={styles.kvValueGreen}>{formatThb(d.amount)}</Text>
            </View>
          ))}
          <View style={styles.kvTotalRow}>
            <Text style={styles.kvTotalLabel}>Total Deductions</Text>
            <Text style={styles.kvTotalValue}>{formatThb(totalDeductions)}</Text>
          </View>
        </>
      )}

      {/* ── Expense Method (Freelancers) ──────────────────────────── */}
      {isFreelancer && freelancerResult && (
        <>
          <Text style={styles.sectionTitle}>Expense Deduction Method</Text>
          <View style={[styles.alertBox, { borderColor: '#7C3AED', backgroundColor: '#F5F3FF' }]}>
            <Text style={[styles.alertTitle, { color: '#7C3AED' }]}>
              Method Used: {expenseMethodLabel(freelancerResult.expenseMethod, freelancerResult.expenseComparison?.recommended)}
            </Text>
            <Text style={[styles.alertBody, { color: '#5B21B6' }]}>
              Expense Deduction Applied: {formatThb(freelancerResult.expenseDeduction)}
            </Text>
            {freelancerResult.expenseComparison && (
              <Text style={[styles.alertBody, { color: '#5B21B6', marginTop: 3 }]}>
                Flat-Rate Deduction: {formatThb(freelancerResult.expenseComparison.flatRateDeduction)} · Actual Expenses: {formatThb(freelancerResult.expenseComparison.actualDeduction)} · Tax Savings from Optimal Choice: {formatThb(freelancerResult.expenseComparison.taxSavings)}
              </Text>
            )}
          </View>
        </>
      )}

      <PageFooter />
    </Page>
  );
};

export default PDFAllowancesSection;
