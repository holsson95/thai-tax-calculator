import React from 'react';
import { PND94Result, VATResult } from '../types/freelancerForm';
import { ObligationCheckResult } from '../utils/obligationChecks';

interface PND94AlertProps {
  result: PND94Result;
}

/**
 * Alert component for PND94 mid-year filing obligation
 */
export const PND94Alert: React.FC<PND94AlertProps> = ({ result }) => {
  if (!result.required) {
    return (
      <div className="p-4 border-2 border-desk">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-desk"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-ink">
              PND94 Not Required
            </h4>
            <p className="text-sm text-ink mt-1">
              Your Jan-Jun qualifying income (
              <span className="font-medium">
                ฿{result.halfYearIncome.toLocaleString()}
              </span>
              ) does not exceed the threshold of ฿{result.threshold.toLocaleString()}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-desk p-4 border-2">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 text-desk"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-ink">
            PND94 Mid-Year Filing Required
          </h4>
          <p className="text-sm text-ink mt-1">
            Your Jan-Jun qualifying income (
            <span className="font-medium">
              ฿{result.halfYearIncome.toLocaleString()}
            </span>
            ) exceeds ฿{result.threshold.toLocaleString()}.
          </p>
          <div className="mt-3 bg-white/50 p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-ink">Estimated Provisional Tax:</span>
              <span className="font-medium text-ink">
                ฿{result.provisionalTax.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ink">Filing Deadline:</span>
              <span className="font-medium text-ink">{result.dueDate}</span>
            </div>
          </div>
          <p className="text-xs text-ink mt-2">
            PND94 requires filing for income types under Sections 40(5)-(8) of the
            Revenue Code, including rental, freelance, contractor, and business
            income.
          </p>
          <p className="text-xs text-ink-soft mt-1">
            Estimate: Jan–Jun income less flat-rate expenses and half your annual
            allowances, taxed at the normal rates (at least 0.5% of that income once it
            reaches ฿120,000). Insurance, fund and donation payments made in Jan–Jun
            are not included, so your actual PND94 tax may be lower.
          </p>
        </div>
      </div>
    </div>
  );
};

interface VATAlertProps {
  result: VATResult;
}

/**
 * Alert component for VAT registration obligation
 */
export const VATAlert: React.FC<VATAlertProps> = ({ result }) => {
  if (!result.required) {
    return (
      <div className="p-4 border-2 border-desk">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-desk"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-ink">
              VAT Registration Not Required
            </h4>
            <p className="text-sm text-ink mt-1">
              Your annual turnover (
              <span className="font-medium">
                ฿{result.turnover.toLocaleString()}
              </span>
              ) is below the ฿{result.threshold.toLocaleString()} threshold.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-desk p-4 border-2">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 text-desk"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-ink">
            VAT Registration Required
          </h4>
          <p className="text-sm text-ink mt-1">
            Your annual turnover (
            <span className="font-medium">
              ฿{result.turnover.toLocaleString()}
            </span>
            ) exceeds the ฿{result.threshold.toLocaleString()} threshold.
          </p>
          <div className="mt-3 bg-white/50 p-3">
            <div className="flex items-center gap-2 text-sm text-ink">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                You must register within{' '}
                <span className="font-medium">
                  {result.mustRegisterWithinDays} days
                </span>{' '}
                of exceeding the threshold
              </span>
            </div>
          </div>
          <p className="text-xs text-ink mt-2">
            Once registered, you must charge 7% VAT on all qualifying sales and
            file VAT returns monthly (PP.30).
          </p>
        </div>
      </div>
    </div>
  );
};

interface ObligationAlertsProps {
  result: ObligationCheckResult;
  showAll?: boolean;
}

/**
 * Combined component showing all obligation alerts
 */
export const ObligationAlerts: React.FC<ObligationAlertsProps> = ({
  result,
  showAll = false,
}) => {
  const { pnd94, vat, hasAnyObligation } = result;

  // If no obligations and not showing all, just show a summary
  if (!hasAnyObligation && !showAll) {
    return (
      <div className="p-4 border-2 border-desk">
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-desk"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-ink">
              No Additional Tax Obligations
            </h4>
            <p className="text-sm text-ink">
              Based on your income, you don't have PND94 or VAT registration
              requirements.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="field-label mb-3 block border-b-2 border-desk pb-1.5 text-ink">Tax Obligations</h3>

      {hasAnyObligation && (
        <div className="border border-ink/25 p-3 mb-4">
          <p className="text-sm text-ink">
            <span className="font-medium">Important:</span> Based on your income,
            you have the following tax obligations to fulfill.
          </p>
        </div>
      )}

      <div className="space-y-3">
        <PND94Alert result={pnd94} />
        <VATAlert result={vat} />
      </div>

      {hasAnyObligation && (
        <div className="mt-4 p-3 border border-ink/25">
          <p className="text-xs text-ink-soft">
            <span className="font-medium">Disclaimer:</span> This is an estimate
            based on the information provided. Consult with a tax professional
            for accurate assessment of your obligations.
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * Compact obligation summary for use in results steps
 */
interface ObligationSummaryProps {
  result: ObligationCheckResult;
}

export const ObligationSummary: React.FC<ObligationSummaryProps> = ({
  result,
}) => {
  const { pnd94, vat, hasAnyObligation, urgentItems } = result;

  if (!hasAnyObligation) {
    return null;
  }

  return (
    <div className="border-t border-paper-rule pt-4 mt-4">
      <h4 className="note-title">
        Additional Obligations
      </h4>
      <ul className="space-y-2">
        {pnd94.required && (
          <li className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-desk" />
            <span className="text-ink-soft">
              PND94 filing required - Est. tax:{' '}
              <span className="font-medium">
                ฿{pnd94.provisionalTax.toLocaleString()}
              </span>{' '}
              by {pnd94.dueDate}
            </span>
          </li>
        )}
        {vat.required && (
          <li className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-desk" />
            <span className="text-ink-soft">
              VAT registration required (turnover: ฿{vat.turnover.toLocaleString()}
              )
            </span>
          </li>
        )}
      </ul>
      {urgentItems.length > 0 && (
        <p className="text-xs text-ink-mute mt-2">
          Action items: {urgentItems.join(', ')}
        </p>
      )}
    </div>
  );
};

export default ObligationAlerts;
