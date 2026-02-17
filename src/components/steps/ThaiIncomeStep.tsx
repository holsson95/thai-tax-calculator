import { useState } from 'react';
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
  nextStep,
  prevStep,
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

  // Handle continue
  const handleContinue = () => {
    if (formData.thaiIncomeEntries.length === 0) {
      // Allow continuing with no Thai income if they only have foreign income
      if (formData.hasForeignIncome && formData.foreignIncomeEntries.length > 0) {
        nextStep(formData);
        return;
      }
      setErrors({ _general: ['Please add at least one income source'] });
      return;
    }

    if (validateEntries()) {
      nextStep(formData);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Thai Income Sources</h2>
      <p className="text-gray-600 mb-6">
        Add all your income sources from Thailand for this tax year.
      </p>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <svg className="h-5 w-5 text-blue-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Track Each Income Source Separately</p>
            <ul className="list-disc list-inside space-y-1 text-blue-600">
              <li>Different income types have different flat-rate deduction percentages</li>
              <li>Recording the month received helps calculate PND94 obligations</li>
              <li>Withholding tax will be credited against your final tax liability</li>
            </ul>
          </div>
        </div>
      </div>

      {/* General Error */}
      {errors._general && showValidationErrors && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-600">{errors._general[0]}</p>
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
        className="w-full py-3 px-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors mb-6 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Income Source
      </button>

      {/* Summary */}
      {formData.thaiIncomeEntries.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Income Summary</h3>

          {/* Totals */}
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-500">Total Gross Income</p>
              <p className="text-xl font-semibold text-gray-800">
                ฿{totalGrossIncome.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Total Withholding</p>
              <p className="text-xl font-semibold text-green-600">
                ฿{totalWithholding.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Income by Type Breakdown */}
          {Object.keys(incomeByType).length > 0 && (
            <div className="border-t border-gray-200 pt-3 mt-3">
              <p className="text-sm font-medium text-gray-600 mb-2">By Income Type</p>
              <div className="space-y-2">
                {Object.entries(incomeByType).map(([type, data]) => {
                  const typeInfo = INCOME_TYPE_INFO[type as IncomeType];
                  return (
                    <div key={type} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">
                          {typeInfo?.shortLabel || type}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({data.count} {data.count === 1 ? 'entry' : 'entries'})
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-gray-800">
                          ฿{data.total.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
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
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-amber-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div className="text-sm">
                  <p className="text-amber-700 font-medium">
                    Jan-Jun Income: ฿{firstHalfIncome.toLocaleString()}
                  </p>
                  <p className="text-amber-600 text-xs">
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
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
          </svg>
          <p className="text-gray-600 mb-2">No Thai income sources added yet</p>
          <p className="text-sm text-gray-500">
            Click "Add Income Source" above to add your freelance or business income
          </p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        {prevStep && (
          <button
            onClick={prevStep}
            className="flex-1 py-3 px-6 rounded-lg font-medium border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
        )}
        <button
          onClick={handleContinue}
          className="flex-1 py-3 px-6 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ThaiIncomeStep;
