import { useState } from 'react';
import {
  FreelancerStepProps,
  ForeignIncomeEntry,
  generateEntryId,
} from '../../types/freelancerForm';
import { COMMON_CURRENCIES, TAX_THRESHOLDS } from '../../config/taxConfig';

const ForeignIncomeStep: React.FC<FreelancerStepProps> = ({
  formData,
  setFormData,
  nextStep,
  showValidationErrors
}) => {
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Create a new empty entry
  const createNewEntry = (): ForeignIncomeEntry => ({
    id: generateEntryId(),
    amount: 0,
    currency: 'USD',
    amountThb: 0,
    dateEarned: '',
    dateRemitted: null,
    foreignTaxPaid: 0,
    description: '',
    country: '',
  });

  // Add new entry
  const handleAddEntry = () => {
    const newEntry = createNewEntry();
    setFormData({
      ...formData,
      foreignIncomeEntries: [...formData.foreignIncomeEntries, newEntry],
    });
    setExpandedEntry(newEntry.id);
  };

  // Remove entry
  const handleRemoveEntry = (id: string) => {
    setFormData({
      ...formData,
      foreignIncomeEntries: formData.foreignIncomeEntries.filter(e => e.id !== id),
    });
    // Clear errors for this entry
    const newErrors = { ...errors };
    delete newErrors[id];
    setErrors(newErrors);
  };

  // Update entry field
  const handleUpdateEntry = (id: string, field: keyof ForeignIncomeEntry, value: string | number | null) => {
    setFormData({
      ...formData,
      foreignIncomeEntries: formData.foreignIncomeEntries.map(entry =>
        entry.id === id ? { ...entry, [field]: value } : entry
      ),
    });
  };

  // Check if entry is taxable under 2024+ rules
  const isEntryTaxable = (entry: ForeignIncomeEntry): { taxable: boolean; reason: string } => {
    if (!entry.dateEarned) {
      return { taxable: false, reason: 'Date earned not specified' };
    }

    const earnedDate = new Date(entry.dateEarned);
    const taxYearStart = new Date(TAX_THRESHOLDS.FOREIGN_INCOME_TAX_YEAR_START);

    if (earnedDate < taxYearStart) {
      return { taxable: false, reason: 'Earned before 2024 - not taxable under new rules' };
    }

    if (!entry.dateRemitted) {
      return { taxable: false, reason: 'Not remitted to Thailand - not taxable' };
    }

    return { taxable: true, reason: 'Earned in 2024+ and remitted to Thailand' };
  };

  // Validate all entries
  const validateEntries = (): boolean => {
    const newErrors: Record<string, string[]> = {};
    let isValid = true;

    formData.foreignIncomeEntries.forEach(entry => {
      const entryErrors: string[] = [];

      if (entry.amount <= 0) {
        entryErrors.push('Amount must be greater than 0');
      }
      if (entry.amountThb <= 0) {
        entryErrors.push('THB amount must be greater than 0');
      }
      if (!entry.dateEarned) {
        entryErrors.push('Date earned is required');
      }
      if (!entry.country.trim()) {
        entryErrors.push('Country is required');
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
  const totalForeignIncome = formData.foreignIncomeEntries.reduce(
    (sum, entry) => sum + entry.amountThb,
    0
  );
  const taxableForeignIncome = formData.foreignIncomeEntries.reduce(
    (sum, entry) => sum + (isEntryTaxable(entry).taxable ? entry.amountThb : 0),
    0
  );
  const totalForeignTaxPaid = formData.foreignIncomeEntries.reduce(
    (sum, entry) => sum + entry.foreignTaxPaid,
    0
  );

  // Handle continue
  const handleContinue = () => {
    // If no foreign income checkbox was unchecked or no entries, skip validation
    if (!formData.hasForeignIncome || formData.foreignIncomeEntries.length === 0) {
      nextStep(formData);
      return;
    }

    if (validateEntries()) {
      nextStep(formData);
    }
  };

  // Skip this step if no foreign income
  if (!formData.hasForeignIncome) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Foreign Income</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
          <p className="text-gray-600">
            You indicated that you don't have foreign income remitted to Thailand.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Click continue to proceed to the next step.
          </p>
        </div>
        <button
          onClick={() => nextStep(formData)}
          className="w-full py-3 px-6 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Foreign Income Details</h2>
      <p className="text-gray-600 mb-6">
        Add all foreign income that was remitted to Thailand during this tax year.
      </p>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <svg className="h-5 w-5 text-blue-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Foreign Income Tax Rules (2024+)</p>
            <ul className="list-disc list-inside space-y-1 text-blue-600">
              <li>Income earned on/after January 1, 2024 is taxable if remitted to Thailand</li>
              <li>Foreign tax paid may be credited against Thai tax (limited to Thai tax rate)</li>
              <li>Income earned before 2024 is not taxable even if remitted in 2024+</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Income Entries List */}
      <div className="space-y-4 mb-6">
        {formData.foreignIncomeEntries.map((entry, index) => {
          const taxability = isEntryTaxable(entry);
          const entryErrors = errors[entry.id] || [];
          const isExpanded = expandedEntry === entry.id;

          return (
            <div
              key={entry.id}
              className={`border-2 rounded-lg overflow-hidden transition-all ${
                entryErrors.length > 0 && showValidationErrors
                  ? 'border-red-300'
                  : 'border-gray-200'
              }`}
            >
              {/* Entry Header */}
              <div
                className={`p-4 cursor-pointer flex justify-between items-center ${
                  isExpanded ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => setExpandedEntry(isExpanded ? null : entry.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                  <div>
                    <p className="font-medium text-gray-800">
                      {entry.country || 'New Entry'} - {entry.currency} {entry.amount.toLocaleString() || '0'}
                    </p>
                    <p className="text-sm text-gray-500">
                      THB {entry.amountThb.toLocaleString()}
                      {taxability.taxable && (
                        <span className="ml-2 text-green-600 font-medium">Taxable</span>
                      )}
                      {!taxability.taxable && entry.dateEarned && (
                        <span className="ml-2 text-gray-400">Not Taxable</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveEntry(entry.id);
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
                  {entryErrors.length > 0 && showValidationErrors && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <ul className="text-sm text-red-600 list-disc list-inside">
                        {entryErrors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country of Income Source *
                    </label>
                    <input
                      type="text"
                      value={entry.country}
                      onChange={(e) => handleUpdateEntry(entry.id, 'country', e.target.value)}
                      placeholder="e.g., United States"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Amount and Currency */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Currency
                      </label>
                      <select
                        value={entry.currency}
                        onChange={(e) => handleUpdateEntry(entry.id, 'currency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {COMMON_CURRENCIES.map(curr => (
                          <option key={curr.code} value={curr.code}>
                            {curr.code} - {curr.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount *
                      </label>
                      <input
                        type="number"
                        value={entry.amount || ''}
                        onChange={(e) => handleUpdateEntry(entry.id, 'amount', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* THB Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount in Thai Baht (THB) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
                      <input
                        type="number"
                        value={entry.amountThb || ''}
                        onChange={(e) => handleUpdateEntry(entry.id, 'amountThb', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        min="0"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Use the exchange rate on the date the income was received
                    </p>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date Earned *
                      </label>
                      <input
                        type="date"
                        value={entry.dateEarned}
                        onChange={(e) => handleUpdateEntry(entry.id, 'dateEarned', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date Remitted to Thailand
                      </label>
                      <input
                        type="date"
                        value={entry.dateRemitted || ''}
                        onChange={(e) => handleUpdateEntry(entry.id, 'dateRemitted', e.target.value || null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Foreign Tax Paid */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Foreign Tax Already Paid (THB)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
                      <input
                        type="number"
                        value={entry.foreignTaxPaid || ''}
                        onChange={(e) => handleUpdateEntry(entry.id, 'foreignTaxPaid', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        min="0"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Tax paid in the source country (may be used as a foreign tax credit)
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (Optional)
                    </label>
                    <input
                      type="text"
                      value={entry.description}
                      onChange={(e) => handleUpdateEntry(entry.id, 'description', e.target.value)}
                      placeholder="e.g., Freelance project payment"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Taxability Status */}
                  <div className={`p-3 rounded-lg ${
                    taxability.taxable ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <p className={`text-sm font-medium ${taxability.taxable ? 'text-green-700' : 'text-gray-600'}`}>
                      {taxability.taxable ? 'This income is taxable in Thailand' : 'Not taxable'}
                    </p>
                    <p className={`text-xs ${taxability.taxable ? 'text-green-600' : 'text-gray-500'}`}>
                      {taxability.reason}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Entry Button */}
      <button
        onClick={handleAddEntry}
        className="w-full py-3 px-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors mb-6 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Foreign Income Entry
      </button>

      {/* Summary */}
      {formData.foreignIncomeEntries.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Total Foreign Income</p>
              <p className="text-lg font-semibold text-gray-800">
                {totalForeignIncome.toLocaleString()} THB
              </p>
            </div>
            <div>
              <p className="text-gray-500">Taxable Amount</p>
              <p className="text-lg font-semibold text-green-600">
                {taxableForeignIncome.toLocaleString()} THB
              </p>
            </div>
            <div>
              <p className="text-gray-500">Foreign Tax Paid</p>
              <p className="text-lg font-semibold text-gray-800">
                {totalForeignTaxPaid.toLocaleString()} THB
              </p>
            </div>
            <div>
              <p className="text-gray-500">Number of Entries</p>
              <p className="text-lg font-semibold text-gray-800">
                {formData.foreignIncomeEntries.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="w-full py-3 px-6 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        Continue
      </button>
    </div>
  );
};

export default ForeignIncomeStep;
