import { useEffect, useMemo, useState } from 'react';
import LeadCTA from '../leads/LeadCTA';
import { leadContextFromSalary } from '../../utils/leadContext';
import { track, taxBand } from '../../utils/analytics';
import { TaxFormData, TaxCalculationResult } from '../../types/taxForm';
import { calculateAnnualTax, formatThb, formatPercent } from '../../utils/taxCalculations';
import { getTaxByBracket } from '../../utils/tax';
import { generatePdfFilename } from '../../utils/pdfFilename';
import TaxFlowDiagram, { TaxFlowStep } from '../TaxFlowDiagram';
import TakeHomeIncomeCard from '../TakeHomeIncomeCard';
import { FieldLabel, ResultCell, SourceTicket, Stamp, StepHeading } from '../ui/form';
import { RULES_TAX_YEAR } from '../../config/taxRules';

interface AnnualResultsStepProps {
  formData: TaxFormData;
  onStartOver: () => void;
  result?: TaxCalculationResult;
}

const AnnualResultsStep: React.FC<AnnualResultsStepProps> = ({ formData, onStartOver, result: resultProp }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const result = resultProp ?? calculateAnnualTax(formData);
  const leadContext = useMemo(
    () => leadContextFromSalary('annual', result.taxOwed, result.taxableIncome),
    [result.taxOwed, result.taxableIncome]
  );

  useEffect(() => {
    track('calculator_completed', { calculator: 'annual', tax_band: taxBand(result.taxOwed) });
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

  const isRefund = result.refundOrOwed > 0;
  const refundOrOwedLabel = isRefund ? 'Tax Refund' : 'Additional Tax Owed';
  const isOwed = result.refundOrOwed < 0;
  const stampText = isRefund ? 'Refund' : isOwed ? 'Balance due' : result.taxOwed === 0 ? 'No tax due' : 'Estimate';

  // Calculate tax by bracket for breakdown
  const taxBrackets = getTaxByBracket(result.taxableIncome).map((b) => ({
    label: b.label,
    rate: b.rate * 100,
    taxableAmount: b.taxableAmount,
    tax: b.tax,
  }));

  const otherDeductions = result.totalDeductions - result.breakdown.standardDeduction;
  const takeHomeIncome = result.grossIncome - result.taxOwed;

  const flowSteps: TaxFlowStep[] = [
    { kind: 'start', label: 'Gross Income', amount: result.grossIncome },
    {
      kind: 'subtract',
      label: 'Employment Deduction',
      amount: result.breakdown.standardDeduction,
      sublabel: '50% of income, capped at ฿100,000',
    },
    {
      kind: 'subtract',
      label: 'Personal Allowance',
      amount: result.totalAllowances,
      sublabel: 'Personal, spouse, senior, child & parent allowances',
    },
    { kind: 'subtract', label: 'Other Deductions', amount: otherDeductions, sublabel: 'Insurance, retirement funds, donations & social security' },
    { kind: 'result', label: 'Taxable Income', amount: result.taxableIncome },
    { kind: 'brackets', label: 'Progressive Tax Calculation', brackets: taxBrackets },
    { kind: 'result', label: 'Estimated Tax', amount: result.taxOwed },
  ];

  return (
    <div>
      <StepHeading title="Your Tax Calculation Results">Based on the information you provided</StepHeading>

      {/* Result box */}
      <FieldLabel>Estimated Thai income tax, tax year {RULES_TAX_YEAR}</FieldLabel>
      <div className="relative border-2 border-desk" aria-live="polite">
        <div className="grid grid-cols-1 divide-y-2 divide-desk sm:grid-cols-2 sm:divide-x-2 sm:divide-y-0">
          <ResultCell label="Tax for the year" value={formatThb(result.taxOwed)} />
          <ResultCell
            label={refundOrOwedLabel}
            value={formatThb(Math.abs(result.refundOrOwed))}
            testId="refund-or-owed"
          />
        </div>
        <div className="border-t-2 border-desk pb-7 pl-4 pr-4 pt-2 text-xs text-ink-soft sm:py-2 sm:pr-40">
          {isRefund ? (
            <p data-outcome="refund">You've overpaid your taxes and may claim a refund</p>
          ) : isOwed ? (
            <p data-outcome="owed">You owe additional tax beyond what was withheld</p>
          ) : (
            <p data-outcome="settled">Your withholding matches your tax liability</p>
          )}
        </div>
        <Stamp className="absolute -bottom-4 right-3 sm:-top-5 sm:bottom-auto">{stampText}</Stamp>
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
          <li className="form-line"><span>Gross Income</span><span>{formatThb(result.grossIncome)}</span></li>
          <li className="form-line"><span>Total Allowances</span><span>−{formatThb(result.totalAllowances)}</span></li>
          <li className="form-line"><span>Total Deductions</span><span>−{formatThb(result.totalDeductions)}</span></li>
          <li className="form-line font-semibold"><span>Taxable Income</span><span>{formatThb(result.taxableIncome)}</span></li>
          <li className="form-line"><span>Tax Owed</span><span>{formatThb(result.taxOwed)}</span></li>
          <li className="form-line"><span>Tax Withheld</span><span>{formatThb(result.taxWithheld)}</span></li>
          <li className="form-total"><span>Effective Tax Rate</span><span>{formatPercent(result.effectiveRate)}</span></li>
        </ul>
      </div>

      {/* How Your Tax Was Calculated */}
      <div className="mb-6">
        <h3 className="field-label mb-3 block border-b-2 border-desk pb-1.5 text-ink">How Your Tax Was Calculated</h3>
        <TaxFlowDiagram steps={flowSteps} />
      </div>

      {/* Collapsible Breakdown */}
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
            {/* Allowances Breakdown */}
            <div className="mb-4">
              <h4 className="field-label mb-1 text-ink-mute">Allowances</h4>
              <div>
                <div className="form-line">
                  <span className="text-ink-soft">Personal</span>
                  <span>{formatThb(result.breakdown.personalAllowance)}</span>
                </div>
                {result.breakdown.spouseAllowance > 0 && (
                  <div className="form-line">
                    <span className="text-ink-soft">Spouse</span>
                    <span>{formatThb(result.breakdown.spouseAllowance)}</span>
                  </div>
                )}
                {result.breakdown.seniorAllowance > 0 && (
                  <div className="form-line">
                    <span className="text-ink-soft">Senior (65+)</span>
                    <span>{formatThb(result.breakdown.seniorAllowance)}</span>
                  </div>
                )}
                {result.breakdown.childAllowance > 0 && (
                  <div className="form-line">
                    <span className="text-ink-soft">Children</span>
                    <span>{formatThb(result.breakdown.childAllowance)}</span>
                  </div>
                )}
                {result.breakdown.parentAllowance > 0 && (
                  <div className="form-line">
                    <span className="text-ink-soft">Parents</span>
                    <span>{formatThb(result.breakdown.parentAllowance)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Deductions Breakdown */}
            {result.totalDeductions > 0 && (
              <div className="mb-4">
                <h4 className="field-label mb-1 text-ink-mute">Deductions</h4>
                <div>
                  {result.breakdown.standardDeduction > 0 && (
                    <div className="form-line">
                      <span className="text-ink-soft">Expense Deduction (50%)</span>
                      <span>{formatThb(result.breakdown.standardDeduction)}</span>
                    </div>
                  )}
                  {result.breakdown.socialSecurity > 0 && (
                    <div className="form-line">
                      <span className="text-ink-soft">Social Security</span>
                      <span>{formatThb(result.breakdown.socialSecurity)}</span>
                    </div>
                  )}
                  {result.breakdown.lifeInsurance > 0 && (
                    <div className="form-line">
                      <span className="text-ink-soft">Life Insurance</span>
                      <span>{formatThb(result.breakdown.lifeInsurance)}</span>
                    </div>
                  )}
                  {result.breakdown.healthInsurance > 0 && (
                    <div className="form-line">
                      <span className="text-ink-soft">Health Insurance</span>
                      <span>{formatThb(result.breakdown.healthInsurance)}</span>
                    </div>
                  )}
                  {result.breakdown.pensionFund > 0 && (
                    <div className="form-line">
                      <span className="text-ink-soft">Pension Fund</span>
                      <span>{formatThb(result.breakdown.pensionFund)}</span>
                    </div>
                  )}
                  {result.breakdown.providentFund > 0 && (
                    <div className="form-line">
                      <span className="text-ink-soft">Provident Fund</span>
                      <span>{formatThb(result.breakdown.providentFund)}</span>
                    </div>
                  )}
                  {result.breakdown.rmf > 0 && (
                    <div className="form-line">
                      <span className="text-ink-soft">RMF</span>
                      <span>{formatThb(result.breakdown.rmf)}</span>
                    </div>
                  )}
                  {result.breakdown.ssf > 0 && (
                    <div className="form-line">
                      <span className="text-ink-soft">SSF</span>
                      <span>{formatThb(result.breakdown.ssf)}</span>
                    </div>
                  )}
                  {result.breakdown.donations > 0 && (
                    <div className="form-line">
                      <span className="text-ink-soft">Donations</span>
                      <span>{formatThb(result.breakdown.donations)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tax Bracket Breakdown */}
            <div>
              <h4 className="field-label mb-1 text-ink-mute">Tax by Bracket</h4>
              <div>
                {taxBrackets.map((bracket) => (
                  <div key={bracket.label} className="flex justify-between">
                    <span className="text-ink-soft">
                      {bracket.label} ({bracket.rate}%)
                    </span>
                    <span>{formatThb(bracket.tax)}</span>
                  </div>
                ))}
                <div className="form-total mt-1">
                  <span>Total Tax</span>
                  <span>{formatThb(result.taxOwed)}</span>
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
            <h4 className="note-title">Disclaimer</h4>
            <p className="text-sm text-ink mt-1">
              This calculator provides an estimate only. Tax laws are complex and your actual tax
              liability may differ. Please consult with a qualified tax professional or the{' '}
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

export default AnnualResultsStep;
