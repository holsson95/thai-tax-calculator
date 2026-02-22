import { Page, Text, View } from '@react-pdf/renderer';
import { FreelancerFormData, FreelancerTaxResult } from '../types/freelancerForm';
import { styles, COLORS } from './pdfStyles';

function formatThb(amount: number): string {
  return 'THB ' + amount.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

interface PDFPreparerNotesProps {
  formData: FreelancerFormData;
  result: FreelancerTaxResult;
  taxYear?: number;
}

const PageHeader: React.FC<{ taxYear: number }> = ({ taxYear }) => (
  <View style={styles.sectionPageHeader}>
    <Text style={styles.sectionPageTitle}>Notes for Tax Preparer</Text>
    <Text style={styles.sectionPageMeta}>Thai Tax Calculator · Tax Year {taxYear}</Text>
  </View>
);

const PageFooter: React.FC<{ page: string }> = ({ page }) => (
  <View style={styles.pageFooter}>
    <Text>Thai Tax Calculator — Tax Filing Packet</Text>
    <Text>{page}</Text>
  </View>
);

function visaLabel(visaType: string): string {
  const labels: Record<string, string> = {
    ltr_wealthy_global: 'LTR — Wealthy Global Citizen',
    ltr_wealthy_pensioner: 'LTR — Wealthy Pensioner',
    ltr_work_from_thailand: 'LTR — Work from Thailand Professional',
    ltr_highly_skilled: 'LTR — Highly Skilled Professional',
    thailand_privilege: 'Thailand Privilege Visa',
    regular: 'Regular Visa',
    other: 'Other Visa Type',
  };
  return labels[visaType] ?? visaType;
}

const PDFPreparerNotes: React.FC<PDFPreparerNotesProps> = ({ formData, result, taxYear = 2025 }) => {
  const hasPND94 = result.pnd94.required;
  const hasVAT = result.vat.required;
  const hasLTR = result.ltrBenefitApplied;
  const hasForeignTaxability = result.foreignIncomeTaxability.length > 0;
  const hasMissingDTA = result.foreignIncomeTaxability.some(e => e.isTaxable && e.hasDTA === false && e.entry.foreignTaxPaid > 0);

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader taxYear={taxYear} />

      <View style={[styles.alertBox, { borderColor: COLORS.blue, backgroundColor: COLORS.blueLight, marginBottom: 12 }]}>
        <Text style={[styles.alertBody, { color: COLORS.blueDark }]}>
          This page summarises obligations and special situations for use by the taxpayer's
          accountant or tax preparer. Items requiring action are highlighted.
        </Text>
      </View>

      {/* ── Residency Status ──────────────────────────────────────── */}
      <Text style={styles.sectionTitle}>Residency & Visa Status</Text>
      {[
        { label: 'Days in Thailand', value: String(formData.daysInThailand) },
        { label: 'Thai Tax Resident', value: formData.isThaiResident ? 'Yes (180+ days)' : 'No (fewer than 180 days)' },
        { label: 'Visa Type', value: visaLabel(formData.visaType) },
      ].map((row, i) => (
        <View key={row.label} style={[styles.kvRow, i % 2 === 1 ? styles.kvRowAlt : {}]}>
          <Text style={styles.kvLabel}>{row.label}</Text>
          <Text style={styles.kvValue}>{row.value}</Text>
        </View>
      ))}

      {/* ── LTR Visa Benefit ──────────────────────────────────────── */}
      {hasLTR && (
        <>
          <Text style={styles.sectionTitle}>LTR Visa Tax Benefit Applied</Text>
          <View style={[styles.alertBox, { borderColor: COLORS.purple, backgroundColor: '#F5F3FF' }]}>
            <Text style={[styles.alertTitle, { color: COLORS.purple }]}>
              LTR Benefit: {visaLabel(formData.visaType)}
            </Text>
            {result.ltrFlatRateTax !== undefined && (
              <Text style={[styles.alertBody, { color: '#5B21B6' }]}>
                Highly Skilled Professional — 17% flat rate applied. Flat rate tax: {formatThb(result.ltrFlatRateTax)}
              </Text>
            )}
            {result.ltrForeignIncomeExempt && (
              <Text style={[styles.alertBody, { color: '#5B21B6' }]}>
                Foreign income is exempt from Thai personal income tax under LTR visa rules.
              </Text>
            )}
            <Text style={[styles.alertBody, { color: '#5B21B6', marginTop: 3 }]}>
              Action Required: Confirm LTR visa certificate is valid and on file. Obtain BOI endorsement letter if required.
            </Text>
          </View>
        </>
      )}

      {/* ── PND94 Obligation ──────────────────────────────────────── */}
      <Text style={styles.sectionTitle}>Mid-Year Filing — PND94</Text>
      {hasPND94 ? (
        <View style={[styles.alertBox, { borderColor: COLORS.red, backgroundColor: COLORS.redLight }]}>
          <Text style={[styles.alertTitle, { color: COLORS.red }]}>PND94 Filing Required</Text>
          <Text style={[styles.alertBody, { color: '#7F1D1D' }]}>
            Half-year qualifying income (Jan–Jun): {formatThb(result.pnd94.halfYearIncome)}{'\n'}
            Threshold: {formatThb(result.pnd94.threshold)}{'\n'}
            Provisional Tax Amount: {formatThb(result.pnd94.provisionalTax)}{'\n'}
            Due Date: {result.pnd94.dueDate}
          </Text>
        </View>
      ) : (
        <View style={[styles.alertBox, { borderColor: COLORS.green, backgroundColor: COLORS.greenLight }]}>
          <Text style={[styles.alertBody, { color: '#166534' }]}>
            PND94 mid-year filing is NOT required. Half-year qualifying income ({formatThb(result.pnd94.halfYearIncome)}) is below the threshold ({formatThb(result.pnd94.threshold)}).
          </Text>
        </View>
      )}

      {/* ── VAT Registration ──────────────────────────────────────── */}
      <Text style={styles.sectionTitle}>VAT Registration Obligation</Text>
      {hasVAT ? (
        <View style={[styles.alertBox, { borderColor: COLORS.red, backgroundColor: COLORS.redLight }]}>
          <Text style={[styles.alertTitle, { color: COLORS.red }]}>VAT Registration Required</Text>
          <Text style={[styles.alertBody, { color: '#7F1D1D' }]}>
            Annual turnover: {formatThb(result.vat.turnover)} — exceeds the THB1,800,000 threshold.{'\n'}
            Must register for VAT within {result.vat.mustRegisterWithinDays} days of crossing the threshold.
          </Text>
        </View>
      ) : (
        <View style={[styles.alertBox, { borderColor: COLORS.green, backgroundColor: COLORS.greenLight }]}>
          <Text style={[styles.alertBody, { color: '#166534' }]}>
            VAT registration NOT required. Annual turnover ({formatThb(result.vat.turnover)}) is below the THB1,800,000 threshold.
          </Text>
        </View>
      )}

      {/* ── Foreign Income Taxability ─────────────────────────────── */}
      {hasForeignTaxability && (
        <>
          <Text style={styles.sectionTitle}>Foreign Income Taxability Analysis</Text>
          {hasMissingDTA && (
            <View style={[styles.alertBox, { borderColor: '#D97706', backgroundColor: '#FFFBEB' }]}>
              <Text style={[styles.alertTitle, { color: '#92400E' }]}>DTA Warning</Text>
              <Text style={[styles.alertBody, { color: '#78350F' }]}>
                Some foreign income sources are from countries without a Double Tax Agreement with Thailand. Foreign tax credits may not be available for these sources.
              </Text>
            </View>
          )}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Description</Text>
              <Text style={[styles.tableHeaderCell, { width: 55 }]}>Country</Text>
              <Text style={[styles.tableHeaderCell, { width: 55 }]}>Taxable?</Text>
              <Text style={[styles.tableHeaderCell, { width: 40 }]}>DTA?</Text>
              <Text style={[styles.tableHeaderCell, { width: 70, textAlign: 'right' }]}>Tax Credit</Text>
            </View>
            {result.foreignIncomeTaxability.map((e, i) => (
              <View key={e.entry.id} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
                <Text style={[styles.tableCell, { flex: 1 }]}>{e.entry.description || e.entry.country}</Text>
                <Text style={[styles.tableCell, { width: 55 }]}>{e.entry.country}</Text>
                <Text style={[styles.tableCell, { width: 55, color: e.isTaxable ? COLORS.red : COLORS.green }]}>
                  {e.isTaxable ? 'Yes' : 'No'}
                </Text>
                <Text style={[styles.tableCell, { width: 40, color: e.hasDTA ? COLORS.green : COLORS.red }]}>
                  {e.hasDTA === null ? '?' : e.hasDTA ? 'Yes' : 'No'}
                </Text>
                <Text style={[styles.tableCell, { width: 70, textAlign: 'right' }]}>
                  {e.dtaCreditAllowed ? formatThb(e.foreignTaxCredit) : 'Blocked'}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}

      <PageFooter page="Page 6 — Preparer Notes" />
    </Page>
  );
};

export default PDFPreparerNotes;
