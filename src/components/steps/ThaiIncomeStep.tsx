import { useState, useEffect } from 'react';
import {
  FreelancerStepProps,
  ThaiIncomeEntry,
  IncomeType,
  generateEntryId,
} from '../../types/freelancerForm';
import { INCOME_TYPE_INFO } from '../../data/incomeTypes';
import { isIncomeTypePND94Qualifying } from '../../config/taxConfig';
import IncomeEntryCard from '../common/IncomeEntryCard';

const ThaiIncomeStep: React.FC<FreelancerStepProps> = ({
  formData,
  setFormData,
  showValidationErrors,
}) => {
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Create a new empty entry
  const createNewEntry = (): ThaiIncomeEntry => ({
    id: generateEntryId(),
    grossAmount: 0,
    incomeType: 'business_sales_40_8' as IncomeType,
    withholdingAmount: 0,
    monthReceived: 0,
    payerName: '',
    description: '',
  });

  // Add new entry
  const handleAddEntry = () => {
    const newEntry = createNewEntry();
    setFormData({
      ...formData,
      thaiIncomeEntries: [...formData.thaiIncomeEntries, newEntry],
    });
    setExpandedEntry(newEntry.id);
  };

  // Remove entry
  const handleRemoveEntry = (id: string) => {
    setFormData({
      ...formData,
      thaiIncomeEntries: formData.thaiIncomeEntries.filter(e => e.id !== id),
    });
    const newErrors = { ...errors };
    delete newErrors[id];
    setErrors(newErrors);
  };

  // Update entry field
  const handleUpdateEntry = (id: string, field: keyof ThaiIncomeEntry, value: string | number) => {
    setFormData({
      ...formData,
      thaiIncomeEntries: formData.thaiIncomeEntries.map(entry =>
        entry.id === id ? { ...entry, [field]: value } : entry
      ),
    });
  };

  // Validate all entries
  const validateEntries = (): boolean => {
    const newErrors: Record<string, string[]> = {};
    let isValid = true;

    if (formData.thaiIncomeEntries.length === 0) {
      return false;
    }

    formData.thaiIncomeEntries.forEach(entry => {
      const entryErrors: string[] = [];

      if (entry.grossAmount <= 0) {
        entryErrors.push('Gross amount must be greater than 0');
      }
      if (entry.monthReceived === 0) {
        entryErrors.push('Month received is required');
      }
      if (entry.withholdingAmount < 0) {
        entryErrors.push('Withholding amount cannot be negative');
      }
      if (entry.withholdingAmount > entry.grossAmount) {
        entryErrors.push('Withholding cannot exceed gross amount');
      }

      if (entryErrors.length > 0) {
        newErrors[entry.id] = entryErrors;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Calculate totals
  const totalGrossIncome = formData.thaiIncomeEntries.reduce(
    (sum, entry) => sum + entry.grossAmount,
    0
  );
  const totalWithholding = formData.thaiIncomeEntries.reduce(
    (sum, entry) => sum + entry.withholdingAmount,
    0
  );

  // Calculate first half (Jan-Jun) income for PND94
  const firstHalfIncome = formData.thaiIncomeEntries
    .filter(entry => entry.monthReceived >= 1 && entry.monthReceived <= 6)
    .filter(entry => isIncomeTypePND94Qualifying(entry.incomeType))
    .reduce((sum, entry) => sum + entry.grossAmount, 0);

  // Group income by type
  const incomeByType = formData.thaiIncomeEntries.reduce((acc, entry) => {
    const type = entry.incomeType;
    if (!acc[type]) {
      acc[type] = { total: 0, withholding: 0, count: 0 };
    }
    acc[type].total += entry.grossAmount;
    acc[type].withholding += entry.withholdingAmount;
    acc[type].count += 1;
    return acc;
  }, {} as Record<IncomeType, { total: number; withholding: number; count: number }>);

  // Validate entries when showValidationErrors becomes true
  useEffect(() => {
    if (showValidationErrors) {
      if (formData.thaiIncomeEntries.length === 0) {
        if (!(formData.hasForeignIncome && formData.foreignIncomeEntries.length > 0)) {
          setErrors({ _general: ['Please add at least one income source'] });
        }
      } else {
        validateEntries();
      }
    }
  }, [showValidationErrors]);

  return (
    <div>
      <h2 className="display text-2xl leading-tight text-ink sm:text-[28px] mb-2">Thai Income Sources</h2>
      <p className="text-ink-soft mb-6">
        Add all your income sources from Thailand for this tax year.
      </p>

      {/* Info Box */}
      <div className="border border-ink/25 p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="text-sm text-ink-soft">
            <p className="font-medium mb-1">Track Each Income Source Separately</p>
            <ul className="list-disc list-inside space-y-1 text-ink-soft">
              <li>Different income types have different flat-rate deduction percentages</li>
              <li>Recording the month received helps calculate PND94 obligations</li>
              <li>Withholding tax will be credited against your final tax liability</li>
            </ul>
          </div>
        </div>
      </div>

      {/* General Error */}
      {errors._general && showValidationErrors && (
        <div className="border-desk p-4 mb-6 border-2">
          <p className="field-error">{errors._general[0]}</p>
        </div>
      )}

      {/* Income Entries List */}
      <div className="space-y-4 mb-6">
        {formData.thaiIncomeEntries.map((entry, index) => (
          <IncomeEntryCard
            key={entry.id}
            entry={entry}
            index={index}
            isExpanded={expandedEntry === entry.id}
            onToggle={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
            onUpdate={(field, value) => handleUpdateEntry(entry.id, field, value)}
            onRemove={() => handleRemoveEntry(entry.id)}
            errors={errors[entry.id]}
            showValidationErrors={showValidationErrors}
          />
        ))}
      </div>

      {/* Add Entry Button */}
      <button
        onClick={handleAddEntry}
        className="w-full py-3 px-6 border-2 border-dashed border-ink/25 text-ink-soft hover:border-desk hover:text-desk transition-colors mb-6 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Income Source
      </button>

      {/* Summary */}
      {formData.thaiIncomeEntries.length > 0 && (
        <div className="border p-4 mb-6 border-ink/25">
          <h3 className="field-label mb-3 block border-b-2 border-desk pb-1.5 text-ink">Income Summary</h3>

          {/* Totals */}
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-ink-mute">Total Gross Income</p>
              <p className="text-xl font-semibold text-ink">
                ฿{totalGrossIncome.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-ink-mute">Total Withholding</p>
              <p className="text-xl font-semibold text-ink">
                ฿{totalWithholding.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Income by Type Breakdown */}
          {Object.keys(incomeByType).length > 0 && (
            <div className="border-t border-paper-rule pt-3 mt-3">
              <p className="text-sm font-medium text-ink-soft mb-2">By Income Type</p>
              <div className="space-y-2">
                {Object.entries(incomeByType).map(([type, data]) => {
                  const typeInfo = INCOME_TYPE_INFO[type as IncomeType];
                  return (
                    <div key={type} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-ink-soft">
                          {typeInfo?.shortLabel || type}
                        </span>
                        <span className="text-xs text-ink-mute">
                          ({data.count} {data.count === 1 ? 'entry' : 'entries'})
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-ink">
                          ฿{data.total.toLocaleString()}
                        </span>
                        <span className="text-xs text-ink-mute ml-2">
                          ({(typeInfo?.flatRate * 100 || 0).toFixed(0)}% deduction)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PND94 Info */}
          {firstHalfIncome > 0 && (
            <div className="border-t border-paper-rule pt-3 mt-3">
              <div className="flex items-start gap-2">
                <div className="text-sm">
                  <p className="text-ink font-medium">
                    Jan-Jun Income: ฿{firstHalfIncome.toLocaleString()}
                  </p>
                  <p className="text-ink text-xs">
                    This may trigger PND94 mid-year filing requirement (threshold: ฿60,000 single / ฿120,000 married)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* No entries message */}
      {formData.thaiIncomeEntries.length === 0 && (
        <div className="border p-6 text-center border-ink/25">
          <svg className="w-12 h-12 text-ink-mute mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
          </svg>
          <p className="text-ink-soft mb-2">No Thai income sources added yet</p>
          <p className="text-sm text-ink-mute">
            Click "Add Income Source" above to add your freelance or business income
          </p>
        </div>
      )}
    </div>
  );
};

export default ThaiIncomeStep;
