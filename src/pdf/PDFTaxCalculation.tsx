import { Page, Text, View } from '@react-pdf/renderer';
import { TaxCalculationResult, TAX_BRACKETS } from '../types/taxForm';
import { FreelancerTaxResult } from '../types/freelancerForm';
import { styles, COLORS } from './pdfStyles';

function formatThb(amount: number): string {
  return 'THB ' + amount.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function formatPercent(rate: number): string {
  return (rate * 100).toFixed(1) + '%';
}

interface PDFTaxCalculationProps {
  result: TaxCalculationResult | FreelancerTaxResult;
  taxYear?: number;
}

function isTaxCalculationResult(r: TaxCalculationResult | FreelancerTaxResult): r is TaxCalculationResult {
  return 'refundOrOwed' in r;
}

function getBrackets(taxableIncome: number) {
  const brackets: { label: string; rate: number; taxableAmount: number; tax: number }[] = [];
  let remaining = taxableIncome;
  let previousLimit = 0;

  for (const bracket of TAX_BRACKETS) {
    if (remaining <= 0) break;
    const size = bracket.upTo - previousLimit;
    const taxable = Math.min(remaining, size);
    const tax = taxable * bracket.rate;
    if (taxable > 0) {
      brackets.push({
        label: bracket.label,
        rate: bracket.rate,
        taxableAmount: taxable,
        tax,
      });
    }
    remaining -= taxable;
    previousLimit = bracket.upTo;
  }
  return brackets;
}

const PageHeader: React.FC<{ taxYear: number }> = ({ taxYear }) => (
  <View style={styles.sectionPageHeader}>
    <Text style={styles.sectionPageTitle}>Tax Calculation</Text>
    <Text style={styles.sectionPageMeta}>Thai Tax Calculator · Tax Year {taxYear}</Text>
  </View>
);

const PageFooter: React.FC = () => (
  <View style={styles.pageFooter}>
    <Text>Thai Tax Calculator — Tax Filing Packet</Text>
    <Text>Page 4 — Tax Calculation</Text>
  </View>
);

const PDFTaxCalculation: React.FC<PDFTaxCalculationProps> = ({ result, taxYear = 2025 }) => {
  const isBase = isTaxCalculationResult(result);
  const taxableIncome = result.taxableIncome;
  const brackets = getBrackets(taxableIncome);

  // Unified values
  let grossTax: number;
  let withholdingCredit: number;
  let foreignTaxCredit: number;
  let refundOrOwed: number;
  let effectiveRate: number;
  let grossIncome: number;

  if (isBase) {
    const r = result as TaxCalculationResult;
    grossTax = r.taxOwed;
    withholdingCredit = r.taxWithheld;
    foreignTaxCredit = 0;
    refundOrOwed = r.refundOrOwed;
    effectiveRate = r.effectiveRate;
    grossIncome = r.grossIncome;
  } else {
    const r = result as FreelancerTaxResult;
    grossTax = r.grossTaxBeforeCredits;
    withholdingCredit = r.withholdingCredits;
    foreignTaxCredit = r.foreignTaxCredits;
    const totalCredits = r.withholdingCredits + r.foreignTaxCredits;
    refundOrOwed = totalCredits - r.grossTaxBeforeCredits;
    effectiveRate = r.effectiveRate;
    grossIncome = r.grossIncome;
  }

  const isRefund = refundOrOwed > 0;
  const resultColor = isRefund ? COLORS.green : COLORS.red;

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader taxYear={taxYear} />

      {/* ── Income & Deduction Summary ───────────────────────────── */}
      <Text style={styles.sectionTitle}>Income & Deduction Summary</Text>
      {[
        { label: 'Gross Income', value: formatThb(grossIncome) },
        { label: 'Less: Allowances', value: '−' + formatThb(result.totalAllowances) },
        { label: 'Less: Deductions', value: '−' + formatThb(result.totalDeductions) },
        { label: 'Taxable Income', value: formatThb(taxableIncome) },
      ].map((row, i) => (
        <View key={row.label} style={[styles.kvRow, i % 2 === 1 ? styles.kvRowAlt : {}]}>
          <Text style={[styles.kvLabel, i === 3 ? { fontFamily: 'Helvetica-Bold' } : {}]}>{row.label}</Text>
          <Text style={[styles.kvValue, i === 3 ? { fontFamily: 'Helvetica-Bold' } : {}]}>{row.value}</Text>
        </View>
      ))}

      {/* ── Progressive Tax Brackets ──────────────────────────────── */}
      <Text style={styles.sectionTitle}>Progressive Tax Calculation</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { width: 80 }]}>Bracket</Text>
          <Text style={[styles.tableHeaderCell, { width: 45 }]}>Rate</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1, textAlign: 'right' }]}>Income in Bracket</Text>
          <Text style={[styles.tableHeaderCell, { width: 90, textAlign: 'right' }]}>Tax</Text>
        </View>
        {brackets.map((b, i) => (
          <View key={b.label} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
            <Text style={[styles.tableCell, { width: 80 }]}>{b.label}</Text>
            <Text style={[styles.tableCell, { width: 45 }]}>{formatPercent(b.rate)}</Text>
            <Text style={[styles.tableCell, { flex: 1, textAlign: 'right' }]}>{formatThb(b.taxableAmount)}</Text>
            <Text style={[styles.tableCell, { width: 90, textAlign: 'right' }]}>{formatThb(b.tax)}</Text>
          </View>
        ))}
        <View style={styles.tableTotalRow}>
          <Text style={[styles.tableTotalCell, { flex: 1 }]}>Gross Tax Before Credits</Text>
          <Text style={[styles.tableTotalCell, { width: 90, textAlign: 'right' }]}>{formatThb(grossTax)}</Text>
        </View>
      </View>

      {/* ── Credits Applied ───────────────────────────────────────── */}
      <Text style={styles.sectionTitle}>Credits & Withholding</Text>
      {[
        { label: 'Tax Withheld at Source', value: withholdingCredit },
        ...(foreignTaxCredit > 0 ? [{ label: 'Foreign Tax Credits (DTA)', value: foreignTaxCredit }] : []),
      ].map((row, i) => (
        <View key={row.label} style={[styles.kvRow, i % 2 === 1 ? styles.kvRowAlt : {}]}>
          <Text style={styles.kvLabel}>{row.label}</Text>
          <Text style={styles.kvValueGreen}>−{formatThb(row.value)}</Text>
        </View>
      ))}

      {/* ── Final Result ──────────────────────────────────────────── */}
      <Text style={styles.sectionTitle}>Final Tax Result</Text>
      <View style={[styles.resultCard, {
        borderColor: resultColor,
        backgroundColor: isRefund ? COLORS.greenLight : '#FEF2F2',
        marginTop: 4,
      }]}>
        <Text style={styles.resultCardLabel}>
          {isRefund ? 'Estimated Tax Refund' : refundOrOwed < 0 ? 'Additional Tax Owed' : 'Tax Balanced'}
        </Text>
        <Text style={[styles.resultCardAmount, { color: resultColor }]}>
          {formatThb(Math.abs(refundOrOwed))}
        </Text>
        <Text style={[styles.resultCardNote, { color: resultColor }]}>
          Effective Tax Rate: {formatPercent(effectiveRate)} · Gross Tax: {formatThb(grossTax)} · Total Credits: {formatThb(withholdingCredit + foreignTaxCredit)}
        </Text>
      </View>

      <PageFooter />
    </Page>
  );
};

export default PDFTaxCalculation;
