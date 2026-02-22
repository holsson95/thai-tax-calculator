import { useState, useEffect } from 'react';
import {
  FreelancerStepProps,
  ForeignIncomeEntry,
  generateEntryId,
} from '../../types/freelancerForm';
import { COMMON_CURRENCIES, TAX_THRESHOLDS } from '../../config/taxConfig';
import { searchCountries, hasDTAWithThailand, type DTACountry } from '../../data/dtaCountries';
import { getExchangeRate, type ExchangeRateResult } from '../../services/exchangeRateService';

const ForeignIncomeStep: React.FC<FreelancerStepProps> = ({
  formData,
  setFormData,
  showValidationErrors
}) => {
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  // Country search query per entry
  const [countrySearch, setCountrySearch] = useState<Record<string, string>>({});
  const [showCountryDropdown, setShowCountryDropdown] = useState<Record<string, boolean>>({});
  // Exchange rate fetch state per entry
  const [rateLoading, setRateLoading] = useState<Record<string, boolean>>({});
  const [rateInfo, setRateInfo] = useState<Record<string, ExchangeRateResult | null>>({});
  const [rateError, setRateError] = useState<Record<string, string | null>>({});

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

  // Handle country selection from DTA dropdown
  const handleCountrySelect = (entryId: string, country: DTACountry) => {
    handleUpdateEntry(entryId, 'country', country.name);
    setCountrySearch(prev => ({ ...prev, [entryId]: country.name }));
    setShowCountryDropdown(prev => ({ ...prev, [entryId]: false }));
  };

  // Fetch BOT exchange rate for an entry and auto-fill THB amount
  const handleFetchRate = async (entry: ForeignIncomeEntry) => {
    const rateDate = entry.dateRemitted || entry.dateEarned;
    if (!rateDate) {
      setRateError(prev => ({
        ...prev,
        [entry.id]: 'Please enter a date earned or date remitted first.',
      }));
      return;
    }
    if (entry.currency === 'THB') {
      setRateError(prev => ({ ...prev, [entry.id]: 'Currency is already THB.' }));
      return;
    }

    setRateLoading(prev => ({ ...prev, [entry.id]: true }));
    setRateError(prev => ({ ...prev, [entry.id]: null }));
    setRateInfo(prev => ({ ...prev, [entry.id]: null }));

    const result = await getExchangeRate(entry.currency, rateDate);

    setRateLoading(prev => ({ ...prev, [entry.id]: false }));

    if (result.ok) {
      setRateInfo(prev => ({ ...prev, [entry.id]: result.data }));
      // Auto-fill THB amount
      if (entry.amount > 0) {
        const thbAmount = Math.round(entry.amount * result.data.rate * 100) / 100;
        handleUpdateEntry(entry.id, 'amountThb', thbAmount);
      }
    } else {
      setRateError(prev => ({ ...prev, [entry.id]: result.error.message }));
    }
  };

  // Get DTA status for an entry's country
  const getEntryDTAStatus = (entry: ForeignIncomeEntry): boolean | null => {
    if (!entry.country.trim()) return null;
    return hasDTAWithThailand(entry.country);
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

  // Validate entries when showValidationErrors becomes true
  useEffect(() => {
    if (showValidationErrors && formData.hasForeignIncome && formData.foreignIncomeEntries.length > 0) {
      validateEntries();
    }
  }, [showValidationErrors]);

  // Skip this step if no foreign income
  if (!formData.hasForeignIncome) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Foreign Income</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
          <p className="text-gray-600">
            You indicated that you don't have foreign income remitted to Thailand.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Click Next to proceed to the next step.
          </p>
        </div>
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
              <li><strong>Tax treaty required</strong> to claim foreign tax credits — Thailand has treaties with 61 countries</li>
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
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-gray-800">
                        {entry.country || 'New Entry'} - {entry.currency} {entry.amount.toLocaleString() || '0'}
                      </p>
                      {entry.country && (() => {
                        const dtaStatus = getEntryDTAStatus(entry);
                        if (dtaStatus === true) return (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700 whitespace-nowrap">Tax Treaty</span>
                        );
                        if (dtaStatus === false) return (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 whitespace-nowrap">No Treaty</span>
                        );
                        return null;
                      })()}
                    </div>
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

                  {/* Country - searchable dropdown with DTA status */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country of Income Source *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={countrySearch[entry.id] ?? entry.country}
                        onChange={(e) => {
                          setCountrySearch(prev => ({ ...prev, [entry.id]: e.target.value }));
                          setShowCountryDropdown(prev => ({ ...prev, [entry.id]: true }));
                          // Update entry country too for free-text entries
                          handleUpdateEntry(entry.id, 'country', e.target.value);
                        }}
                        onFocus={() => setShowCountryDropdown(prev => ({ ...prev, [entry.id]: true }))}
                        onBlur={() => setTimeout(() => setShowCountryDropdown(prev => ({ ...prev, [entry.id]: false })), 150)}
                        placeholder="Type to search countries..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {/* DTA status indicator */}
                      {entry.country && (() => {
                        const dtaStatus = getEntryDTAStatus(entry);
                        if (dtaStatus === true) return (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                            Tax treaty ✓
                          </span>
                        );
                        if (dtaStatus === false) return (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                            No treaty ⚠
                          </span>
                        );
                        return null;
                      })()}
                    </div>

                    {/* Country dropdown list */}
                    {showCountryDropdown[entry.id] && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {searchCountries(countrySearch[entry.id] ?? '').slice(0, 20).map(country => (
                          <button
                            key={country.code}
                            type="button"
                            onMouseDown={() => handleCountrySelect(entry.id, country)}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between"
                          >
                            <span className="text-gray-800">{country.name}</span>
                            {country.hasDTA ? (
                              <span className="text-xs text-green-600">Tax treaty</span>
                            ) : (
                              <span className="text-xs text-amber-600">No treaty</span>
                            )}
                          </button>
                        ))}
                        {searchCountries(countrySearch[entry.id] ?? '').length === 0 && (
                          <p className="px-3 py-2 text-sm text-gray-500">No countries found</p>
                        )}
                      </div>
                    )}

                    {/* DTA guidance message */}
                    {entry.country && (() => {
                      const dtaStatus = getEntryDTAStatus(entry);
                      if (dtaStatus === true) return (
                        <p className="mt-1 text-xs text-green-600">
                          Thailand has a tax treaty with {entry.country}. Foreign taxes paid may be credited against Thai tax.
                        </p>
                      );
                      if (dtaStatus === false) return (
                        <p className="mt-1 text-xs text-amber-600">
                          No tax treaty with {entry.country}. Foreign tax credit may not be available — double taxation risk.
                        </p>
                      );
                      return (
                        <p className="mt-1 text-xs text-gray-500">
                          Country not in our database. Check rd.go.th for DTA status.
                        </p>
                      );
                    })()}
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

                  {/* THB Amount with BOT rate fetch */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount in Thai Baht (THB) *
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
                        <input
                          type="number"
                          value={entry.amountThb || ''}
                          onChange={(e) => {
                            handleUpdateEntry(entry.id, 'amountThb', parseFloat(e.target.value) || 0);
                            // Clear rate info when user manually edits
                            setRateInfo(prev => ({ ...prev, [entry.id]: null }));
                          }}
                          placeholder="0"
                          min="0"
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      {entry.currency !== 'THB' && (
                        <button
                          type="button"
                          onClick={() => handleFetchRate(entry)}
                          disabled={rateLoading[entry.id]}
                          title="Fetch official BOT exchange rate"
                          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap transition-colors"
                        >
                          {rateLoading[entry.id] ? (
                            <>
                              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                              </svg>
                              Fetching…
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              Fetch BOT rate
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Rate fetch result */}
                    {rateInfo[entry.id] && (
                      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg text-xs text-green-700">
                        <span className="font-medium">BOT rate on {rateInfo[entry.id]!.date}:</span>{' '}
                        1 {entry.currency} = {rateInfo[entry.id]!.rate.toFixed(4)} THB
                        {entry.amount > 0 && (
                          <span className="ml-1">
                            → {(entry.amount * rateInfo[entry.id]!.rate).toLocaleString('en-US', { maximumFractionDigits: 2 })} THB
                          </span>
                        )}
                      </div>
                    )}
                    {rateError[entry.id] && (
                      <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
                        {rateError[entry.id]}
                      </div>
                    )}

                    <p className="text-xs text-gray-500 mt-1">
                      {rateInfo[entry.id]
                        ? 'Rate auto-filled from Bank of Thailand — verify at bot.or.th before filing.'
                        : 'Enter manually or use "Fetch BOT rate" to auto-convert using the official Bank of Thailand rate.'}
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
                    {(() => {
                      const dtaStatus = getEntryDTAStatus(entry);
                      if (dtaStatus === false) return (
                        <p className="text-xs text-amber-600 mt-1">
                          No tax treaty with {entry.country} — foreign tax credit may not be available.
                        </p>
                      );
                      if (dtaStatus === null && entry.country) return (
                        <p className="text-xs text-gray-500 mt-1">
                          Tax paid in the source country (verify DTA status at rd.go.th before claiming credit)
                        </p>
                      );
                      return (
                        <p className="text-xs text-gray-500 mt-1">
                          Tax paid in the source country (may be credited against Thai tax under the tax treaty)
                        </p>
                      );
                    })()}
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
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
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
    </div>
  );
};

export default ForeignIncomeStep;
