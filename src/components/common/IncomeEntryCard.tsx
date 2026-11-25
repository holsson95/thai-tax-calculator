import { useState } from 'react';
import { IncomeType, RentalPropertyKind, ThaiIncomeEntry } from '../../types/freelancerForm';
import { RENTAL_PROPERTY_KIND_LABELS, getEntryFlatRate, getRentalPropertyKind, isVatExemptRental } from '../../config/taxConfig';
import { INCOME_TYPE_INFO, getIncomeTypeOptions } from '../../data/incomeTypes';

interface IncomeEntryCardProps {
  entry: ThaiIncomeEntry;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (field: keyof ThaiIncomeEntry, value: string | number) => void;
  onRemove: () => void;
  errors?: string[];
  showValidationErrors?: boolean;
}

const IncomeEntryCard: React.FC<IncomeEntryCardProps> = ({
  entry,
  index,
  isExpanded,
  onToggle,
  onUpdate,
  onRemove,
  errors = [],
  showValidationErrors = false,
}) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const incomeTypeInfo = INCOME_TYPE_INFO[entry.incomeType];
  const incomeTypeOptions = getIncomeTypeOptions();
  // Rental rates depend on the property kind, so use the entry's own rate everywhere below.
  const entryFlatRate = getEntryFlatRate(entry);
  const isRental = entry.incomeType === 'rental_40_5';

  const fieldId = (field: string) => `income-entry-${entry.id}-${field}`;
  const headerLabel = `${incomeTypeInfo?.shortLabel || 'New Income Source'}${
    entry.payerName ? ` - ${entry.payerName}` : ''
  }, Income source ${index + 1}`;

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const showError = showValidationErrors || Object.values(touched).some(Boolean);

  // Month options for dropdown
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  return (
    <div
      className={`border-2 overflow-hidden transition-all ${
        errors.length > 0 && showError
          ? 'border-desk'
          : 'border-paper-rule'
      }`}
    >
      {/* Entry Header */}
      <div
        className={`p-4 flex justify-between items-center ${
          isExpanded ? '' : 'bg-paper-white hover:bg-desk/[0.05]'
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={isExpanded ? fieldId('details') : undefined}
          className="flex items-center gap-3 flex-1 text-left focus:outline-none focus:ring-2 focus:ring-desk"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-desk font-mono text-sm font-semibold text-ink" aria-hidden="true">
            {index + 1}
          </span>
          <span className="sr-only">
            {isExpanded ? 'Collapse' : 'Expand'} {headerLabel}
          </span>
          <span aria-hidden="true">
            <p className="font-medium text-ink">
              {incomeTypeInfo?.shortLabel || 'New Income Source'}
              {entry.payerName && ` - ${entry.payerName}`}
            </p>
            <div className="flex items-center gap-3 text-sm text-ink-mute">
              <span>฿{entry.grossAmount.toLocaleString()}</span>
              {entry.withholdingAmount > 0 && (
                <span className="text-ink">
                  WHT: ฿{entry.withholdingAmount.toLocaleString()}
                </span>
              )}
              {entry.monthReceived > 0 && (
                <span>
                  {months.find(m => m.value === entry.monthReceived)?.label}
                </span>
              )}
            </div>
          </span>
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-2 text-desk hover:text-ink hover:bg-desk/[0.05] transition-colors"
            aria-label="Remove entry"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <svg
            className={`w-5 h-5 text-ink-mute transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Entry Details (Expanded) */}
      {isExpanded && (
        <div id={fieldId('details')} className="p-4 border-t border-paper-rule bg-paper-white space-y-4">
          {/* Error Messages */}
          {errors.length > 0 && showError && (
            <div className="border-desk p-3 border-2">
              <ul className="text-sm text-ink list-disc list-inside">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Income Type */}
          <div>
            <label htmlFor={fieldId('incomeType')} className="block text-sm font-medium text-ink-soft mb-1">
              Income Type *
            </label>
            <select
              id={fieldId('incomeType')}
              value={entry.incomeType}
              onChange={(e) => onUpdate('incomeType', e.target.value as IncomeType)}
              onBlur={() => handleBlur('incomeType')}
              className="field-input"
            >
              {incomeTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {incomeTypeInfo && (
              <p className="text-xs text-ink-mute mt-1">
                {incomeTypeInfo.description}
              </p>
            )}
          </div>

          {/* Rental property kind: decides the flat rate and whether the rent is VAT-exempt */}
          {isRental && (
            <div>
              <label htmlFor={fieldId('rentalPropertyKind')} className="block text-sm font-medium text-ink-soft mb-1">
                What are you renting out?
              </label>
              <select
                id={fieldId('rentalPropertyKind')}
                value={getRentalPropertyKind(entry)}
                onChange={(e) => onUpdate('rentalPropertyKind', e.target.value as RentalPropertyKind)}
                className="field-input"
              >
                {(Object.keys(RENTAL_PROPERTY_KIND_LABELS) as RentalPropertyKind[]).map(kind => (
                  <option key={kind} value={kind}>{RENTAL_PROPERTY_KIND_LABELS[kind]}</option>
                ))}
              </select>
              <p className="text-xs text-ink-mute mt-1">
                {isVatExemptRental(entry)
                  ? 'Rent from buildings and land is exempt from VAT, so it does not count toward the VAT registration threshold.'
                  : 'Rent from vehicles and other movable property is not VAT-exempt, so it counts toward the VAT registration threshold.'}
              </p>
            </div>
          )}

          {/* Income Type Info Box */}
          {incomeTypeInfo && (
            <div className="border border-ink/25 p-3">
              <div className="flex items-start gap-2">
                <div className="text-sm">
                  <p className="text-desk">
                    <strong>Flat Rate Deduction:</strong> {(entryFlatRate * 100).toFixed(0)}%
                    {incomeTypeInfo.flatRateCap && ` (capped at ฿${incomeTypeInfo.flatRateCap.toLocaleString()})`}
                  </p>
                  {incomeTypeInfo.notes && (
                    <p className="text-desk mt-1">{incomeTypeInfo.notes}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Gross Amount */}
          <div>
            <label htmlFor={fieldId('grossAmount')} className="block text-sm font-medium text-ink-soft mb-1">
              Gross Amount (THB) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute">฿</span>
              <input
                id={fieldId('grossAmount')}
                type="number"
                inputMode="decimal"
                value={entry.grossAmount || ''}
                onChange={(e) => onUpdate('grossAmount', parseFloat(e.target.value) || 0)}
                onBlur={() => handleBlur('grossAmount')}
                placeholder="0"
                min="0"
                className="field-input pl-8 pr-3"
              />
            </div>
            <p className="text-xs text-ink-mute mt-1">
              Total income before any deductions or withholding
            </p>
          </div>

          {/* Withholding Amount */}
          <div>
            <label htmlFor={fieldId('withholdingAmount')} className="block text-sm font-medium text-ink-soft mb-1">
              Withholding Tax Deducted (THB)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute">฿</span>
              <input
                id={fieldId('withholdingAmount')}
                type="number"
                inputMode="decimal"
                value={entry.withholdingAmount || ''}
                onChange={(e) => onUpdate('withholdingAmount', parseFloat(e.target.value) || 0)}
                onBlur={() => handleBlur('withholdingAmount')}
                placeholder="0"
                min="0"
                className="field-input pl-8 pr-3"
              />
            </div>
            <p className="text-xs text-ink-mute mt-1">
              Tax already withheld by the payer (shown on withholding certificate)
            </p>
          </div>

          {/* Month Received */}
          <div>
            <label htmlFor={fieldId('monthReceived')} className="block text-sm font-medium text-ink-soft mb-1">
              Month Received *
            </label>
            <select
              id={fieldId('monthReceived')}
              value={entry.monthReceived}
              onChange={(e) => onUpdate('monthReceived', parseInt(e.target.value, 10))}
              onBlur={() => handleBlur('monthReceived')}
              className="field-input"
            >
              <option value={0}>Select month...</option>
              {months.map(month => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-ink-mute mt-1">
              Used for PND94 mid-year filing requirement (Jan-Jun income)
            </p>
          </div>

          {/* Payer Name */}
          <div>
            <label htmlFor={fieldId('payerName')} className="block text-sm font-medium text-ink-soft mb-1">
              Payer/Client Name
            </label>
            <input
              id={fieldId('payerName')}
              type="text"
              value={entry.payerName}
              onChange={(e) => onUpdate('payerName', e.target.value)}
              onBlur={() => handleBlur('payerName')}
              placeholder="e.g., ABC Company Ltd."
              className="field-input"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor={fieldId('description')} className="block text-sm font-medium text-ink-soft mb-1">
              Description (Optional)
            </label>
            <input
              id={fieldId('description')}
              type="text"
              value={entry.description}
              onChange={(e) => onUpdate('description', e.target.value)}
              onBlur={() => handleBlur('description')}
              placeholder="e.g., Consulting project, Software development"
              className="field-input"
            />
          </div>

          {/* Calculated Flat Rate Deduction Preview */}
          {entry.grossAmount > 0 && incomeTypeInfo && entryFlatRate > 0 && (
            <div className="p-3 border-2 border-desk">
              <p className="text-sm text-ink">
                <strong>Flat Rate Deduction Preview:</strong>{' '}
                ฿{(entry.grossAmount * entryFlatRate).toLocaleString()}
                {' '}({(entryFlatRate * 100).toFixed(0)}% of ฿{entry.grossAmount.toLocaleString()})
              </p>
              {incomeTypeInfo.flatRateCap && (
                <p className="text-xs text-ink mt-1">
                  Note: Total salary deduction is capped at ฿{incomeTypeInfo.flatRateCap.toLocaleString()} across all salary entries combined
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IncomeEntryCard;
