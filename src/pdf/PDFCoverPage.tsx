import { Page, Text, View } from '@react-pdf/renderer';
import { TaxFormData, TaxCalculationResult } from '../types/taxForm';
import { FreelancerFormData, FreelancerTaxResult } from '../types/freelancerForm';
import { styles, COLORS } from './pdfStyles';

interface PDFCoverPageProps {
  formData: TaxFormData | FreelancerFormData;
  result: TaxCalculationResult | FreelancerTaxResult;
  taxYear?: number;
}

function formatThb(amount: number): string {
  return 'THB ' + Math.abs(amount).toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function formatPercent(rate: number): string {
  return (rate * 100).toFixed(2) + '%';
}

function getEmploymentLabel(type: string): string {
  const labels: Record<string, string> = {
    salaried: 'Salaried Employee',
    freelancer: 'Freelancer / Self-Employed',
    'self-employed': 'Freelancer / Self-Employed',
    sole_proprietor: 'Sole Proprietor',
    business: 'Sole Proprietor',
    company_owner: 'Company Owner',
  };
  return labels[type] ?? 'Individual Taxpayer';
}

function isTaxCalculationResult(r: TaxCalculationResult | FreelancerTaxResult): r is TaxCalculationResult {
  return 'refundOrOwed' in r;
}

function getResultValues(result: TaxCalculationResult | FreelancerTaxResult) {
  if (isTaxCalculationResult(result)) {
    return {
      grossIncome: result.grossIncome,
      totalAllowances: result.totalAllowances,
      totalDeductions: result.totalDeductions,
      taxableIncome: result.taxableIncome,
      taxOwed: result.taxOwed,
      taxWithheld: result.taxWithheld,
      refundOrOwed: result.refundOrOwed,
      effectiveRate: result.effectiveRate,
    };
  }
  // FreelancerTaxResult
  const fl = result as FreelancerTaxResult;
  const totalWithholding = fl.withholdingCredits + fl.foreignTaxCredits;
  const refundOrOwed = totalWithholding - fl.grossTaxBeforeCredits;
  return {
    grossIncome: fl.grossIncome,
    totalAllowances: fl.totalAllowances,
    totalDeductions: fl.totalDeductions,
    taxableIncome: fl.taxableIncome,
    taxOwed: fl.grossTaxBeforeCredits,
    taxWithheld: totalWithholding,
    refundOrOwed,
    effectiveRate: fl.effectiveRate,
  };
}

const PDFCoverPage: React.FC<PDFCoverPageProps> = ({ formData, result, taxYear = 2025 }) => {
  const vals = getResultValues(result);
  const isRefund = vals.refundOrOwed > 0;
  const resultColor = isRefund ? COLORS.green : COLORS.red;
  const resultBg = isRefund ? COLORS.greenLight : '#FEF2F2';
  const resultBorder = isRefund ? COLORS.green : COLORS.red;
  const resultLabel = isRefund ? 'Estimated Tax Refund' : vals.refundOrOwed < 0 ? 'Estimated Tax Owed' : 'Tax Balanced';
  const resultNote = isRefund
    ? 'You may be eligible for a tax refund'
    : vals.refundOrOwed < 0
    ? 'Additional tax is due at filing'
    : 'Your withholding matches your tax liability';

  const generatedDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Page size="A4" style={styles.page}>
      {/* ── Cover Hero ─────────────────────────────────────────────────── */}
      <View style={styles.coverHero}>
        <Text style={styles.coverTitle}>Thai Tax Filing Packet</Text>
        <Text style={styles.coverSubtitle}>
          Prepared by Thai Tax Calculator · mythaitaxes.com
        </Text>
        <View style={styles.coverMeta}>
          <Text style={styles.coverMetaBadge}>Tax Year {taxYear}</Text>
          <Text style={styles.coverMetaBadge}>{getEmploymentLabel(formData.employmentType)}</Text>
          <Text style={styles.coverMetaBadge}>Generated {generatedDate}</Text>
        </View>
      </View>

      {/* ── Taxpayer Info Fill-in ────────────────────────────────────── */}
      <View style={styles.fillInBox}>
        <Text style={styles.fillInTitle}>Taxpayer Information (complete before submitting to preparer)</Text>
        {[
          { label: 'Full Name' },
          { label: 'Email Address' },
          { label: 'Phone Number' },
          { label: 'Thai Tax ID (TIN)' },
        ].map(({ label }) => (
          <View key={label} style={styles.fillInRow}>
            <Text style={styles.fillInLabel}>{label}:</Text>
            <View style={styles.fillInLine} />
          </View>
        ))}
      </View>

      {/* ── Main Result Card ─────────────────────────────────────────── */}
      <View
        style={[
          styles.resultCard,
          { borderColor: resultBorder, backgroundColor: resultBg },
        ]}
      >
        <Text style={styles.resultCardLabel}>{resultLabel}</Text>
        <Text style={[styles.resultCardAmount, { color: resultColor }]}>
          {formatThb(Math.abs(vals.refundOrOwed))}
        </Text>
        <Text style={[styles.resultCardNote, { color: resultColor }]}>{resultNote}</Text>
      </View>

      {/* ── Summary Grid ────────────────────────────────────────────── */}
      <View style={styles.summaryGrid}>
        {[
          { label: 'Gross Income', value: formatThb(vals.grossIncome), color: COLORS.text },
          { label: 'Total Allowances', value: '−' + formatThb(vals.totalAllowances), color: COLORS.green },
          { label: 'Total Deductions', value: '−' + formatThb(vals.totalDeductions), color: COLORS.green },
          { label: 'Taxable Income', value: formatThb(vals.taxableIncome), color: COLORS.text },
          { label: 'Tax Owed', value: formatThb(vals.taxOwed), color: COLORS.blue },
          { label: 'Tax Withheld / Credits', value: formatThb(vals.taxWithheld), color: COLORS.blue },
          { label: 'Effective Tax Rate', value: formatPercent(vals.effectiveRate), color: COLORS.text },
          { label: 'Employment Type', value: getEmploymentLabel(formData.employmentType), color: COLORS.text },
        ].map(({ label, value, color }) => (
          <View key={label} style={styles.summaryCell}>
            <Text style={styles.summaryCellLabel}>{label}</Text>
            <Text style={[styles.summaryCellValue, { color }]}>{value}</Text>
          </View>
        ))}
      </View>

      {/* ── Disclaimer ───────────────────────────────────────────────── */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          DISCLAIMER: This filing packet is generated by Thai Tax Calculator and provides estimates
          only. Tax laws are complex and individual circumstances may affect your actual liability.
          Please consult a qualified tax professional or the Thai Revenue Department (rd.go.th) for
          official guidance. This document does not constitute professional tax advice.
        </Text>
      </View>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <View style={styles.pageFooter}>
        <Text>Thai Tax Calculator — Tax Filing Packet {taxYear}</Text>
        <Text>Page 1 — Cover Summary</Text>
      </View>
    </Page>
  );
};

export default PDFCoverPage;
