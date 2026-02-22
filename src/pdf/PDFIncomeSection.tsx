import { Page, Text, View } from '@react-pdf/renderer';
import { TaxFormData } from '../types/taxForm';
import { FreelancerFormData, IncomeType } from '../types/freelancerForm';
import { CompanyOwnerFormData } from '../types/companyOwnerForm';
import { SoleProprietorFormData } from '../types/soleProprietorForm';
import { styles } from './pdfStyles';

function formatThb(amount: number): string {
  return 'THB ' + amount.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function incomeTypeLabel(type: IncomeType): string {
  const labels: Record<IncomeType, string> = {
    salary_40_1: 'Salary (Sec. 40(1))',
    liberal_profession_40_6: 'Liberal Profession (Sec. 40(6))',
    contractor_40_7: 'Contractor / Service (Sec. 40(7))',
    business_sales_40_8: 'Business / Sales (Sec. 40(8))',
    rental_40_5: 'Rental Income (Sec. 40(5))',
    dividend: 'Dividend Income',
    other: 'Other Income',
  };
  return labels[type] ?? type;
}

function monthName(m: number): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[m - 1] ?? String(m);
}

type AnyFormData = TaxFormData | FreelancerFormData | SoleProprietorFormData | CompanyOwnerFormData;

interface PDFIncomeSectionProps {
  formData: AnyFormData;
  taxYear?: number;
}

const PageHeader: React.FC<{ title: string; taxYear: number }> = ({ title, taxYear }) => (
  <View style={styles.sectionPageHeader}>
    <Text style={styles.sectionPageTitle}>{title}</Text>
    <Text style={styles.sectionPageMeta}>Thai Tax Calculator · Tax Year {taxYear}</Text>
  </View>
);

const PageFooter: React.FC<{ page: string }> = ({ page }) => (
  <View style={styles.pageFooter}>
    <Text>Thai Tax Calculator — Tax Filing Packet</Text>
    <Text>{page}</Text>
  </View>
);

const PDFIncomeSection: React.FC<PDFIncomeSectionProps> = ({ formData, taxYear = 2025 }) => {
  const isFreelancer = 'thaiIncomeEntries' in formData;
  const isCompanyOwner = 'companyInfo' in formData;
  const isSoleProprietor = 'businessProfile' in formData;

  return (
    <Page size="A4" style={styles.page}>
      <PageHeader title="Income Sources" taxYear={taxYear} />

      {/* ── Salaried / Base Income ─────────────────────────────────── */}
      {'annualIncome' in formData && (
        <>
          <Text style={styles.sectionTitle}>Employment Income</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Source</Text>
              <Text style={[styles.tableHeaderCell, { width: 90, textAlign: 'right' }]}>Gross Amount</Text>
              <Text style={[styles.tableHeaderCell, { width: 90, textAlign: 'right' }]}>Tax Withheld</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 1 }]}>Annual Employment Income</Text>
              <Text style={[styles.tableCell, { width: 90, textAlign: 'right' }]}>
                {formatThb(formData.annualIncome)}
              </Text>
              <Text style={[styles.tableCell, { width: 90, textAlign: 'right' }]}>
                {formatThb(formData.taxWithheld)}
              </Text>
            </View>
            <View style={styles.tableTotalRow}>
              <Text style={[styles.tableTotalCell, { flex: 1 }]}>Total</Text>
              <Text style={[styles.tableTotalCell, { width: 90, textAlign: 'right' }]}>
                {formatThb(formData.annualIncome)}
              </Text>
              <Text style={[styles.tableTotalCell, { width: 90, textAlign: 'right' }]}>
                {formatThb(formData.taxWithheld)}
              </Text>
            </View>
          </View>
        </>
      )}

      {/* ── Company Owner Income ───────────────────────────────────── */}
      {isCompanyOwner && (
        <>
          <Text style={styles.sectionTitle}>Income from Company</Text>
          {(() => {
            const co = formData as CompanyOwnerFormData;
            const rows = [
              { label: `Salary — ${co.companyInfo.companyName || 'Company'}`, amount: co.salaryFromCompany },
              { label: 'Director Fees', amount: co.directorFees },
              { label: 'Other Company Benefits', amount: co.otherCompanyBenefits },
            ].filter(r => r.amount > 0);
            const total = rows.reduce((s, r) => s + r.amount, 0);
            return (
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Income Source</Text>
                  <Text style={[styles.tableHeaderCell, { width: 120, textAlign: 'right' }]}>Amount (THB)</Text>
                </View>
                {rows.map((r, i) => (
                  <View key={r.label} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
                    <Text style={[styles.tableCell, { flex: 1 }]}>{r.label}</Text>
                    <Text style={[styles.tableCell, { width: 120, textAlign: 'right' }]}>{formatThb(r.amount)}</Text>
                  </View>
                ))}
                <View style={styles.tableTotalRow}>
                  <Text style={[styles.tableTotalCell, { flex: 1 }]}>Total Employment Income</Text>
                  <Text style={[styles.tableTotalCell, { width: 120, textAlign: 'right' }]}>{formatThb(total)}</Text>
                </View>
              </View>
            );
          })()}

          {/* Dividends */}
          {(() => {
            const co = formData as CompanyOwnerFormData;
            if (!co.hasDividends || co.dividendEntries.length === 0) return null;
            return (
              <>
                <Text style={styles.sectionTitle}>Dividend Income</Text>
                <View style={styles.table}>
                  <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Company</Text>
                    <Text style={[styles.tableHeaderCell, { width: 60 }]}>Type</Text>
                    <Text style={[styles.tableHeaderCell, { width: 80, textAlign: 'right' }]}>Amount</Text>
                    <Text style={[styles.tableHeaderCell, { width: 80, textAlign: 'right' }]}>Withholding</Text>
                    <Text style={[styles.tableHeaderCell, { width: 50 }]}>In PIT?</Text>
                  </View>
                  {co.dividendEntries.map((d, i) => (
                    <View key={d.id} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
                      <Text style={[styles.tableCell, { flex: 1 }]}>{d.companyName || '—'}</Text>
                      <Text style={[styles.tableCell, { width: 60 }]}>
                        {d.dividendType === 'thai_listed' ? 'Thai Listed' :
                          d.dividendType === 'thai_unlisted' ? 'Thai Unlisted' : 'Foreign'}
                      </Text>
                      <Text style={[styles.tableCell, { width: 80, textAlign: 'right' }]}>{formatThb(d.amount)}</Text>
                      <Text style={[styles.tableCell, { width: 80, textAlign: 'right' }]}>{formatThb(d.withholdingTax)}</Text>
                      <Text style={[styles.tableCell, { width: 50 }]}>{d.includeInPIT ? 'Yes' : 'No'}</Text>
                    </View>
                  ))}
                </View>
              </>
            );
          })()}
        </>
      )}

      {/* ── Freelancer / Sole Proprietor Thai Income ───────────────── */}
      {(isFreelancer || isSoleProprietor) && (() => {
        const fl = formData as FreelancerFormData;
        if (fl.thaiIncomeEntries.length === 0) return null;
        const total = fl.thaiIncomeEntries.reduce((s, e) => s + e.grossAmount, 0);
        const totalWithholding = fl.thaiIncomeEntries.reduce((s, e) => s + e.withholdingAmount, 0);
        return (
          <>
            <Text style={styles.sectionTitle}>Thai Income Sources</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderCell, { width: 90 }]}>Income Type</Text>
                <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Payer / Description</Text>
                <Text style={[styles.tableHeaderCell, { width: 40 }]}>Month</Text>
                <Text style={[styles.tableHeaderCell, { width: 75, textAlign: 'right' }]}>Gross Amount</Text>
                <Text style={[styles.tableHeaderCell, { width: 65, textAlign: 'right' }]}>Withholding</Text>
              </View>
              {fl.thaiIncomeEntries.map((e, i) => (
                <View key={e.id} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}>
                  <Text style={[styles.tableCell, { width: 90 }]}>{incomeTypeLabel(e.incomeType)}</Text>
                  <Text style={[styles.tableCell, { flex: 1 }]}>{e.payerName || e.description || '—'}</Text>
                  <Text style={[styles.tableCell, { width: 40 }]}>{monthName(e.monthReceived)}</Text>
                  <Text style={[styles.tableCell, { width: 75, textAlign: 'right' }]}>{formatThb(e.grossAmount)}</Text>
                  <Text style={[styles.tableCell, { width: 65, textAlign: 'right' }]}>{formatThb(e.withholdingAmount)}</Text>
                </View>
              ))}
              <View style={styles.tableTotalRow}>
                <Text style={[styles.tableTotalCell, { width: 90 }]}>Total</Text>
                <Text style={[styles.tableTotalCell, { flex: 1 }]}> </Text>
                <Text style={[styles.tableTotalCell, { width: 40 }]}> </Text>
                <Text style={[styles.tableTotalCell, { width: 75, textAlign: 'right' }]}>{formatThb(total)}</Text>
                <Text style={[styles.tableTotalCell, { width: 65, textAlign: 'right' }]}>{formatThb(totalWithholding)}</Text>
              </View>
            </View>
          </>
        );
      })()}

      {/* ── Foreign Income ─────────────────────────────────────────── */}
      {(isFreelancer || isSoleProprietor) && (() => {
        const fl = formData as FreelancerFormData;
        if (!fl.hasForeignIncome || fl.foreignIncomeEntries.length === 0) return null;

        const fmtOrig = (amount: number, currency: string) =>
          amount.toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' ' + currency;

        const fmtRate = (entry: typeof fl.foreignIncomeEntries[0]) => {
          if (!entry.amount || entry.amount === 0) return '—';
          const rate = entry.amountThb / entry.amount;
          return '1 ' + entry.currency + ' = ' + rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 }) + ' THB';
        };

        return (
          <>
            <Text style={styles.sectionTitle}>Foreign Income</Text>
            {fl.foreignIncomeEntries.map((e, i) => (
              <View key={e.id} style={{ marginBottom: 10, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 4 }}>
                {/* Entry header */}
                <View style={{ backgroundColor: '#EFF6FF', paddingHorizontal: 8, paddingVertical: 4, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
                  <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#1D4ED8' }}>
                    Entry {i + 1}{e.description ? ' — ' + e.description : ''}
                  </Text>
                  <Text style={{ fontSize: 8, color: '#1D4ED8' }}>{e.country}</Text>
                </View>

                {/* Top row: original amount, exchange rate, THB amount */}
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' }}>
                  <View style={{ flex: 1, padding: 6, borderRightWidth: 1, borderRightColor: '#E5E7EB' }}>
                    <Text style={{ fontSize: 7, color: '#6B7280', marginBottom: 2 }}>Original Amount</Text>
                    <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#1F2937' }}>{fmtOrig(e.amount, e.currency)}</Text>
                  </View>
                  <View style={{ flex: 1, padding: 6, borderRightWidth: 1, borderRightColor: '#E5E7EB' }}>
                    <Text style={{ fontSize: 7, color: '#6B7280', marginBottom: 2 }}>Exchange Rate (BOT)</Text>
                    <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#1F2937' }}>{fmtRate(e)}</Text>
                  </View>
                  <View style={{ flex: 1, padding: 6 }}>
                    <Text style={{ fontSize: 7, color: '#6B7280', marginBottom: 2 }}>Amount (THB)</Text>
                    <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#1D4ED8' }}>{formatThb(e.amountThb)}</Text>
                  </View>
                </View>

                {/* Bottom row: date earned, date remitted, foreign tax paid */}
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1, padding: 6, borderRightWidth: 1, borderRightColor: '#E5E7EB' }}>
                    <Text style={{ fontSize: 7, color: '#6B7280', marginBottom: 2 }}>Date Earned</Text>
                    <Text style={{ fontSize: 8, color: '#1F2937' }}>{e.dateEarned || '—'}</Text>
                  </View>
                  <View style={{ flex: 1, padding: 6, borderRightWidth: 1, borderRightColor: '#E5E7EB' }}>
                    <Text style={{ fontSize: 7, color: '#6B7280', marginBottom: 2 }}>Date Remitted to Thailand</Text>
                    <Text style={{ fontSize: 8, color: e.dateRemitted ? '#166534' : '#6B7280' }}>
                      {e.dateRemitted || 'Not remitted'}
                    </Text>
                  </View>
                  <View style={{ flex: 1, padding: 6 }}>
                    <Text style={{ fontSize: 7, color: '#6B7280', marginBottom: 2 }}>
                      Foreign Tax Paid{e.foreignTaxPaidOriginal && e.foreignTaxPaidCurrency ? ' (' + e.foreignTaxPaidCurrency + ')' : ''}
                    </Text>
                    <Text style={{ fontSize: 8, color: '#1F2937' }}>
                      {e.foreignTaxPaidOriginal && e.foreignTaxPaidCurrency
                        ? fmtOrig(e.foreignTaxPaidOriginal, e.foreignTaxPaidCurrency) + '\n= ' + formatThb(e.foreignTaxPaid)
                        : e.foreignTaxPaid > 0 ? formatThb(e.foreignTaxPaid) : '—'}
                    </Text>
                  </View>
                </View>
              </View>
            ))}

            {/* Totals row */}
            <View style={styles.tableTotalRow}>
              <Text style={[styles.tableTotalCell, { flex: 1 }]}>Total Foreign Income</Text>
              <Text style={[styles.tableTotalCell, { width: 120, textAlign: 'right' }]}>
                {formatThb(fl.foreignIncomeEntries.reduce((s, e) => s + e.amountThb, 0))}
              </Text>
            </View>
          </>
        );
      })()}

      <PageFooter page="Page 2 — Income Sources" />
    </Page>
  );
};

export default PDFIncomeSection;
