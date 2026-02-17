import { useState } from 'react';
import { IncomeType, ThaiIncomeEntry } from '../../types/freelancerForm';
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
      className={`border-2 rounded-lg overflow-hidden transition-all ${
        errors.length > 0 && showError
          ? 'border-red-300'
          : 'border-gray-200'
      }`}
    >
      {/* Entry Header */}
      <div
        className={`p-4 cursor-pointer flex justify-between items-center ${
          isExpanded ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
        }`}
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
            {index + 1}
          </span>
          <div>
            <p className="font-medium text-gray-800">
              {incomeTypeInfo?.shortLabel || 'New Income Source'}
              {entry.payerName && ` - ${entry.payerName}`}
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>฿{entry.grossAmount.toLocaleString()}</span>
              {entry.withholdingAmount > 0 && (
                <span className="text-green-600">
                  WHT: ฿{entry.withholdingAmount.toLocaleString()}
                </span>
              )}
              {entry.monthReceived > 0 && (
                <span>
                  {months.find(m => m.value === entry.monthReceived)?.label}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Remove entry"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Entry Details (Expanded) */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-200 bg-white space-y-4">
          {/* Error Messages */}
          {errors.length > 0 && showError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <ul className="text-sm text-red-600 list-disc list-inside">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Income Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Income Type *
            </label>
            <select
              value={entry.incomeType}
              onChange={(e) => onUpdate('incomeType', e.target.value as IncomeType)}
              onBlur={() => handleBlur('incomeType')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {incomeTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {incomeTypeInfo && (
              <p className="text-xs text-gray-500 mt-1">
                {incomeTypeInfo.description}
              </p>
            )}
          </div>

          {/* Income Type Info Box */}
          {incomeTypeInfo && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="text-sm">
                  <p className="text-blue-700">
                    <strong>Flat Rate Deduction:</strong> {(incomeTypeInfo.flatRate * 100).toFixed(0)}%
                    {incomeTypeInfo.flatRateCap && ` (capped at ฿${incomeTypeInfo.flatRateCap.toLocaleString()})`}
                  </p>
                  {incomeTypeInfo.notes && (
                    <p className="text-blue-600 mt-1">{incomeTypeInfo.notes}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Gross Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gross Amount (THB) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
              <input
                type="number"
                value={entry.grossAmount || ''}
                onChange={(e) => onUpdate('grossAmount', parseFloat(e.target.value) || 0)}
                onBlur={() => handleBlur('grossAmount')}
                placeholder="0"
                min="0"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Total income before any deductions or withholding
            </p>
          </div>

          {/* Withholding Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Withholding Tax Deducted (THB)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
              <input
                type="number"
                value={entry.withholdingAmount || ''}
                onChange={(e) => onUpdate('withholdingAmount', parseFloat(e.target.value) || 0)}
                onBlur={() => handleBlur('withholdingAmount')}
                placeholder="0"
                min="0"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Tax already withheld by the payer (shown on withholding certificate)
            </p>
          </div>

          {/* Month Received */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Month Received *
            </label>
            <select
              value={entry.monthReceived}
              onChange={(e) => onUpdate('monthReceived', parseInt(e.target.value, 10))}
              onBlur={() => handleBlur('monthReceived')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>Select month...</option>
              {months.map(month => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Used for PND94 mid-year filing requirement (Jan-Jun income)
            </p>
          </div>

          {/* Payer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payer/Client Name
            </label>
            <input
              type="text"
              value={entry.payerName}
              onChange={(e) => onUpdate('payerName', e.target.value)}
              onBlur={() => handleBlur('payerName')}
              placeholder="e.g., ABC Company Ltd."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <input
              type="text"
              value={entry.description}
              onChange={(e) => onUpdate('description', e.target.value)}
              onBlur={() => handleBlur('description')}
              placeholder="e.g., Consulting project, Software development"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Calculated Flat Rate Deduction Preview */}
          {entry.grossAmount > 0 && incomeTypeInfo && incomeTypeInfo.flatRate > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-700">
                <strong>Flat Rate Deduction Preview:</strong>{' '}
                ฿{Math.min(
                  entry.grossAmount * incomeTypeInfo.flatRate,
                  incomeTypeInfo.flatRateCap || Infinity
                ).toLocaleString()}
                {' '}({(incomeTypeInfo.flatRate * 100).toFixed(0)}% of ฿{entry.grossAmount.toLocaleString()})
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IncomeEntryCard;
