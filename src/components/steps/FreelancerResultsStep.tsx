import { useEffect, useMemo, useState } from 'react';
import LeadCTA from '../leads/LeadCTA';
import { leadContextFromFreelancer } from '../../utils/leadContext';
import { track, taxBand } from '../../utils/analytics';
import { FreelancerFormData, IncomeType } from '../../types/freelancerForm';
import { calculateFreelancerTax, formatThb, formatPercent } from '../../utils/taxCalculations';
import { getTaxByBracket } from '../../utils/tax';
import { ObligationAlerts, ObligationSummary } from '../ObligationAlerts';
import { checkAllObligations } from '../../utils/obligationChecks';
import { INCOME_TYPE_INFO } from '../../data/incomeTypes';
import { generatePdfFilename } from '../../utils/pdfFilename';
import TaxFlowDiagram, { TaxFlowStep, TaxFlowBracket } from '../TaxFlowDiagram';
import TakeHomeIncomeCard from '../TakeHomeIncomeCard';
import { FieldLabel, ResultCell, SourceTicket, Stamp, StepHeading } from '../ui/form';
import { RULES_TAX_YEAR } from '../../config/taxRules';

interface FreelancerResultsStepProps {
  formData: FreelancerFormData;
  onStartOver: () => void;
}

const FreelancerResultsStep: React.FC<FreelancerResultsStepProps> = ({
  formData,
  onStartOver,
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showObligations, setShowObligations] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const result = calculateFreelancerTax(formData);
  const obligations = checkAllObligations(formData);
  const leadContext = useMemo(() => leadContextFromFreelancer(formData, result), [formData, result]);

  useEffect(() => {
    track('calculator_completed', {
      calculator: 'annual',
      is_resident: formData.isThaiResident,
      flag_count: leadContext.flags.length,
      tax_band: taxBand(result.grossTaxBeforeCredits),
    });
    // fire once when the results step is shown
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const [{ pdf }, { default: TaxPacketPDF }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('../../pdf/TaxPacketPDF'),
      ]);
      const blob = await pdf(<TaxPacketPDF formData={formData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = generatePdfFilename(formData.employmentType);
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Check for missing DTA warnings
  const missingDTAEntries = result.foreignIncomeTaxability.filter(
    e => e.isTaxable && e.hasDTA === false && e.entry.foreignTaxPaid > 0
  );
  const totalDTACreditDisallowed = missingDTAEntries.reduce(
    (sum, e) => sum + e.dtaCreditDisallowed, 0
  );

  // Calculate refund/owed
  const totalWithholding = result.withholdingCredits + result.foreignTaxCredits;
  const refundOrOwed = totalWithholding - result.grossTaxBeforeCredits;
  const isRefund = refundOrOwed > 0;
  const refundOrOwedLabel = isRefund ? 'Tax Refund' : 'Additional Tax Owed';

  // Calculate tax by bracket for breakdown
  const taxBrackets = getTaxByBracket(result.taxableIncome).map((b) => ({
    label: b.label,
    rate: b.rate * 100,
    taxableAmount: b.taxableAmount,
    tax: b.tax,
  }));

  // Get expense deduction display
  const getExpenseDeductionLabel = () => {
    switch (result.expenseMethod) {
      case 'auto_compare':
        return result.expenseComparison?.recommended === 'actual'
          ? 'Actual Expenses (Auto-selected)'
          : 'Flat-Rate (Auto-selected)';
      case 'force_flat':
        return 'Flat-Rate Deduction';
      case 'force_actual':
        return 'Actual Expenses';
      default:
        return 'Expense Deduction';
    }
  };

  const otherDeductions = result.totalDeductions - result.expenseDeduction;
  const takeHomeIncome = result.grossIncome - (result.grossTaxBeforeCredits - result.foreignTaxCredits);

  const progressiveBrackets: TaxFlowBracket[] =
    result.ltrFlatRateTax !== undefined && result.ltrFlatRateTax > 0
      ? [{ label: 'Employment Income (LTR 17% flat rate)', rate: 17, tax: result.ltrFlatRateTax }, ...taxBrackets]
      : taxBrackets;

  const flowSteps: TaxFlowStep[] = [
    { kind: 'start', label: 'Total Gross Income', amount: result.grossIncome },
    { kind: 'subtract', label: getExpenseDeductionLabel(), amount: result.expenseDeduction },
    {
      kind: 'subtract',
      label: 'Personal Allowance',
      amount: result.totalAllowances,
      sublabel: 'Personal, spouse, senior, child & parent allowances',
    },
    { kind: 'subtract', label: 'Other Deductions', amount: otherDeductions, sublabel: 'Insurance, retirement funds, donations & social security' },
    { kind: 'result', label: 'Taxable Income', amount: result.taxableIncome },
    { kind: 'brackets', label: 'Progressive Tax Calculation', brackets: progressiveBrackets },
    { kind: 'result', label: 'Estimated Tax', amount: result.grossTaxBeforeCredits },
  ];

  return (
    <div>
      <StepHeading title="Your Tax Calculation Results">Based on your freelance/self-employment income</StepHeading>

      {/* Annual minimum tax (RD PND90 guide, No. 11 item 9) */}
      {result.minimumTaxApplied && (
        <div className="note mb-6" data-testid="minimum-tax-note">
          <h3 className="note-title">Minimum tax applied</h3>
          <p className="text-sm text-ink-soft">
            Your income other than salary is large enough that the Revenue Department's minimum tax
            applies: 0.5% of that income before expenses and allowances (formatThb(result.minimumTax)), which is
            more than the tax worked out from the brackets. The tax shown uses the minimum.
          </p>
        </div>
      )}

      {/* LTR Visa Benefit Notice */}
      {result.ltrBenefitApplied && (
        <div className="note mb-6">
          <div>
            <div>
              <h3 className="note-title">LTR Visa Tax Benefits Applied</h3>
              <ul className="text-sm text-ink-soft mt-1 space-y-1">
                {result.ltrForeignIncomeExempt && (
                  <li>• Foreign income is tax exempt under your LTR visa status</li>
                )}
                {result.ltrFlatRateTax !== undefined && result.ltrFlatRateTax > 0 && (
                  <li>• 17% flat tax rate applied to employment income ({formatThb(result.ltrFlatRateTax)} tax)</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* DTA Warning - shown when foreign tax paid but no treaty */}
      {totalDTACreditDisallowed > 0 && (
        <div className="note-strong mb-6">
          <div className="flex items-start gap-3">
            <div>
              <h3 className="note-title">Double Taxation Risk</h3>
              <p className="text-sm text-ink mt-1">
                {formatThb(totalDTACreditDisallowed)} in foreign taxes paid cannot be credited because{' '}
                {missingDTAEntries.length === 1
                  ? `${missingDTAEntries[0].entry.country} has`
                  : 'some countries have'} no tax treaty with Thailand.
                You may be taxed on this income in both countries.
              </p>
              <p className="text-xs text-ink mt-1">
                Consider consulting a tax professional about available relief options.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Result box */}
      <FieldLabel>Estimated Thai income tax, tax year {RULES_TAX_YEAR}</FieldLabel>
      <div className="relative border-2 border-desk" aria-live="polite">
        <div className="grid grid-cols-1 divide-y-2 divide-desk sm:grid-cols-2 sm:divide-x-2 sm:divide-y-0">
          <ResultCell label="Tax for the year" value={formatThb(result.grossTaxBeforeCredits)} />
          <ResultCell label={refundOrOwedLabel} value={formatThb(Math.abs(refundOrOwed))} testId="refund-or-owed" />
        </div>
        <div className="border-t-2 border-desk pb-7 pl-4 pr-4 pt-2 text-xs text-ink-soft sm:py-2 sm:pr-40">
          {isRefund ? (
            <p data-outcome="refund">You've overpaid your taxes and may claim a refund</p>
          ) : refundOrOwed < 0 ? (
            <p data-outcome="owed">You owe additional tax beyond what was withheld</p>
          ) : (
            <p data-outcome="settled">Your withholding matches your tax liability</p>
          )}
        </div>
        <Stamp className="absolute -bottom-4 right-3 sm:-top-5 sm:bottom-auto">
          {isRefund ? 'Refund' : refundOrOwed < 0 ? 'Balance due' : result.grossTaxBeforeCredits === 0 ? 'No tax due' : 'Estimate'}
        </Stamp>
      </div>
      <SourceTicket year={RULES_TAX_YEAR} className="mt-6 sm:mt-2" />

      {/* Take-Home Income */}
      <div className="mt-8">
        <TakeHomeIncomeCard annualTakeHome={takeHomeIncome} />
      </div>

      {/* The return, line by line */}
      <div className="mb-8">
        <FieldLabel>Your return, line by line</FieldLabel>
        <ul>
          <li className="form-line">
            <span>
              Total Gross Income
              {result.foreignIncomeTotal > 0 && (
                <span className="block text-xs text-ink-mute">
                  Thai: {formatThb(result.thaiIncomeTotal)} + Foreign: {formatThb(result.taxableForeignIncome)}
                </span>
              )}
            </span>
            <span>{formatThb(result.grossIncome)}</span>
          </li>
          <li className="form-line">
            <span>
              Expense Deduction
              <span className="block text-xs text-ink-mute">{getExpenseDeductionLabel()}</span>
            </span>
            <span>−{formatThb(result.expenseDeduction)}</span>
          </li>
          <li className="form-line"><span>Total Allowances</span><span>−{formatThb(result.totalAllowances)}</span></li>
          <li className="form-line font-semibold"><span>Taxable Income</span><span>{formatThb(result.taxableIncome)}</span></li>
          <li className="form-line"><span>Tax Owed</span><span>{formatThb(result.grossTaxBeforeCredits)}</span></li>
          <li className="form-line">
            <span>
              Tax Credits
              {result.foreignTaxCredits > 0 && (
                <span className="block text-xs text-ink-mute">Incl. foreign tax credit: {formatThb(result.foreignTaxCredits)}</span>
              )}
            </span>
            <span>{formatThb(totalWithholding)}</span>
          </li>
          <li className="form-total"><span>Effective Tax Rate</span><span>{formatPercent(result.effectiveRate)}</span></li>
        </ul>
      </div>

      {/* Expense Comparison (if auto_compare) */}
      {result.expenseComparison && (
        <div className="note mb-6">
          <h4 className="note-title">Expense Comparison Result</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className={`p-3 ${result.expenseComparison.recommended === 'flat' ? 'border-2 border-desk' : 'border border-ink/25'}`}>
              <p className="text-ink-soft">Flat-Rate</p>
              <p className="font-mono font-semibold tabular-nums text-ink">
                {formatThb(result.expenseComparison.flatRateDeduction)}
              </p>
              {result.expenseComparison.recommended === 'flat' && (
                <span className="field-label text-ink">Selected</span>
              )}
            </div>
            <div className={`p-3 ${result.expenseComparison.recommended === 'actual' ? 'border-2 border-desk' : 'border border-ink/25'}`}>
              <p className="text-ink-soft">Actual Expenses</p>
              <p className="font-mono font-semibold tabular-nums text-ink">
                {formatThb(result.expenseComparison.actualDeduction)}
              </p>
              {result.expenseComparison.recommended === 'actual' && (
                <span className="field-label text-ink">Selected</span>
              )}
            </div>
          </div>
          <p className="text-xs text-ink-soft mt-2">
            Tax savings from optimal choice: ~{formatThb(result.expenseComparison.taxSavings)}
          </p>
        </div>
      )}

      {/* How Your Tax Was Calculated */}
      <div className="mb-6">
        <h3 className="field-label mb-3 block border-b-2 border-desk pb-1.5 text-ink">How Your Tax Was Calculated</h3>
        <TaxFlowDiagram steps={flowSteps} />
      </div>

      {/* Tax Obligations Section */}
      <div className="mb-6 border-2 border-desk">
        <button
          onClick={() => setShowObligations(!showObligations)}
          className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-desk/[0.05]"
          aria-expanded={showObligations}
        >
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-bold text-ink">Tax Obligations</span>
            {obligations.hasAnyObligation && (
              <span className="field-label border border-desk px-1.5 py-0.5 text-ink">
                Action Required
              </span>
            )}
          </div>
          <svg
            className={`w-5 h-5 text-ink-mute transition-transform ${showObligations ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showObligations && (
          <div className="p-4 border-t border-paper-rule">
            <ObligationAlerts result={obligations} showAll />
          </div>
        )}

        {!showObligations && obligations.hasAnyObligation && (
          <div className="px-4 pb-4">
            <ObligationSummary result={obligations} />
          </div>
        )}
      </div>

      {/* Collapsible Detailed Breakdown */}
      <div className="mb-6 border-2 border-desk">
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-desk/[0.05]"
          aria-expanded={showBreakdown}
        >
          <span className="text-[15px] font-bold text-ink">Detailed Breakdown</span>
          <svg
            className={`w-5 h-5 text-ink-mute transition-transform ${showBreakdown ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showBreakdown && (
          <div className="border-t-2 border-desk px-4 pb-4 pt-3 [&>div+div]:mt-5">
            {/* Income by Type */}
            {result.incomeByType.size > 0 && (
              <div className="mb-4">
                <h4 className="field-label mb-1 text-ink-mute">Income by Type</h4>
                <div>
                  {Array.from(result.incomeByType.entries()).map(([type, amount]) => (
                    <div key={type} className="flex justify-between">
                      <span className="text-ink-soft">
                        {INCOME_TYPE_INFO[type as IncomeType]?.shortLabel || type}
                      </span>
                      <span>{formatThb(amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Foreign Income Taxability */}
            {result.foreignIncomeTaxability.length > 0 && (
              <div className="mb-4">
                <h4 className="field-label mb-1 text-ink-mute">Foreign Income Analysis</h4>
                {result.ltrForeignIncomeExempt && (
                  <div className="border border-ink/25 p-2 mb-2">
                    <p className="text-xs text-ink-soft">
                      <strong>LTR Visa Exemption:</strong> All foreign income is tax exempt under your visa status.
                    </p>
                  </div>
                )}
                <div className="text-sm space-y-2">
                  {result.foreignIncomeTaxability.map((item, idx) => (
                    <div key={idx} className="p-2 border border-ink/25">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-ink-soft">
                            {item.entry.country} - {item.entry.description || 'Foreign Income'}
                          </span>
                          {/* DTA badge */}
                          {item.hasDTA === true && (
                            <span className="text-xs px-1.5 py-0.5 text-ink">Tax Treaty</span>
                          )}
                          {item.hasDTA === false && (
                            <span className="text-xs px-1.5 py-0.5 text-ink">No Treaty</span>
                          )}
                        </div>
                        <span className={`ml-2 shrink-0 ${item.isTaxable ? 'text-ink' : 'text-ink'}`}>
                          {item.isTaxable ? 'Taxable' : 'Exempt'}
                        </span>
                      </div>
                      <p className="text-xs text-ink-mute mt-1">{item.reason}</p>
                      {item.isTaxable && (
                        <div className="text-xs mt-1 space-y-0.5">
                          <p className="text-ink-soft">
                            Taxable amount: {formatThb(item.taxableAmount)}
                          </p>
                          {item.entry.foreignTaxPaid > 0 && (
                            <>
                              {item.dtaCreditAllowed ? (
                                <p className="text-ink">
                                  Foreign tax credit: {formatThb(item.foreignTaxCredit)}
                                </p>
                              ) : (
                                <p className="text-ink">
                                  Foreign tax credit blocked: {formatThb(item.dtaCreditDisallowed)} (no tax treaty with {item.entry.country})
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tax Bracket Breakdown */}
            <div>
              <h4 className="field-label mb-1 text-ink-mute">Tax Calculation</h4>
              <div>
                {/* LTR Flat Rate Tax (if applicable) */}
                {result.ltrFlatRateTax !== undefined && result.ltrFlatRateTax > 0 && (
                  <div className="flex justify-between text-ink-soft p-2 mb-2 border border-ink/25">
                    <span>Employment Income (LTR 17% flat rate)</span>
                    <span>{formatThb(result.ltrFlatRateTax)}</span>
                  </div>
                )}

                {/* Progressive Tax Brackets */}
                {taxBrackets.length > 0 && (
                  <>
                    {result.ltrFlatRateTax !== undefined && result.ltrFlatRateTax > 0 && (
                      <p className="text-xs text-ink-mute mb-1">Other income (progressive rates):</p>
                    )}
                    {taxBrackets.map((bracket) => (
                      <div key={bracket.label} className="flex justify-between">
                        <span className="text-ink-soft">
                          {bracket.label} ({bracket.rate}%)
                        </span>
                        <span>{formatThb(bracket.tax)}</span>
                      </div>
                    ))}
                  </>
                )}

                <div className="form-total mt-1">
                  <span>Total Tax</span>
                  <span>{formatThb(result.grossTaxBeforeCredits)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="note-strong mb-6">
        <div className="flex items-start gap-3">
          <div>
            <h4 className="note-title">Important Disclaimer</h4>
            <p className="text-sm text-ink mt-1">
              This calculator provides an estimate for freelance/self-employment income. Tax laws
              for business income are complex and your actual tax liability may differ. Please
              consult with a qualified tax professional or the{' '}
              <a
                href="https://www.rd.go.th"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-ink"
              >
                Thai Revenue Department
              </a>
              {' '}for official guidance.
            </p>
            {result.expenseMethod !== 'force_flat' && (
              <p className="text-sm text-ink mt-2">
                <strong>Note:</strong> If using actual expenses, you must keep proper documentation
                (receipts, invoices) to support your deductions.
              </p>
            )}
          </div>
        </div>
      </div>

      <LeadCTA context={leadContext} />
      <div className="mt-6" />

      {/* Download PDF Button */}
      <button
        onClick={handleDownloadPDF}
        disabled={isGeneratingPDF}
        className="btn-primary mb-3 w-full"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {isGeneratingPDF ? 'Generating PDF…' : 'Download Tax Filing Packet'}
      </button>

      {/* Start Over Button */}
      <button
        onClick={onStartOver}
        className="btn-secondary w-full"
      >
        Start Over
      </button>
    </div>
  );
};

export default FreelancerResultsStep;
