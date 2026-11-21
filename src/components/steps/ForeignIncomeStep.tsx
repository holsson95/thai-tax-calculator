import { useState, useEffect } from 'react';
import {
  FreelancerStepProps,
  ForeignIncomeEntry,
  PensionType,
  generateEntryId,
} from '../../types/freelancerForm';
import { COMMON_CURRENCIES, EXTENDED_CURRENCIES, TAX_THRESHOLDS } from '../../config/taxConfig';
import { searchCountries, hasDTAWithThailand, getPensionDTAExemption, type DTACountry } from '../../data/dtaCountries';
import { getExchangeRate, type ExchangeRateResult } from '../../services/exchangeRateService';

const PENSION_TYPE_OPTIONS: { value: PensionType; label: string; description: string }[] = [
  { value: 'government_service', label: 'Government / Military Service Pension', description: 'Pension paid for service to a government or armed forces (e.g. Australian Defence Force, UK civil service)' },
  { value: 'social_security', label: 'Social Security Payment', description: 'Government social security or national insurance benefit (e.g. US Social Security)' },
  { value: 'private_occupational', label: 'Private / Occupational Pension', description: 'Employer-sponsored pension or superannuation fund (e.g. Australian superannuation)' },
  { value: 'aged_state_pension', label: 'Age / State Pension', description: 'Government welfare pension based on age (e.g. Australian Age Pension, UK State Pension)' },
  { value: 'annuity', label: 'Annuity', description: 'Regular payments from a private annuity contract' },
  { value: 'other_pension', label: 'Other Pension', description: 'Other pension or retirement income not listed above' },
];

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
    foreignTaxPaidOriginal: 0,
    // foreignTaxPaidCurrency left undefined — defaults to entry.currency in UI
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
  const handleUpdateEntry = (id: string, field: keyof ForeignIncomeEntry, value: string | number | boolean | null) => {
    setFormData({
      ...formData,
      foreignIncomeEntries: formData.foreignIncomeEntries.map(entry =>
        entry.id === id ? { ...entry, [field]: value } : entry
      ),
    });
  };

  // Update foreign tax paid fields, auto-computing foreignTaxPaid (THB) when BOT rate is available
  const handleUpdateTaxPaid = (id: string, field: 'original' | 'currency', value: string | number) => {
    setFormData({
      ...formData,
      foreignIncomeEntries: formData.foreignIncomeEntries.map(entry => {
        if (entry.id !== id) return entry;

        const updated: ForeignIncomeEntry = {
          ...entry,
          ...(field === 'original'
            ? { foreignTaxPaidOriginal: value as number }
            : { foreignTaxPaidCurrency: value as string }),
        };

        const taxOriginal = field === 'original' ? (value as number) : (entry.foreignTaxPaidOriginal ?? 0);
        const taxCurrency = field === 'currency' ? (value as string) : (entry.foreignTaxPaidCurrency ?? entry.currency);
        const rate = rateInfo[id];

        if (taxCurrency === 'THB') {
          updated.foreignTaxPaid = taxOriginal;
        } else if (rate) {
          updated.foreignTaxPaid = Math.round(taxOriginal * rate.rate * 100) / 100;
        }

        return updated;
      }),
    });
  };

  // Handle country selection from DTA dropdown
  const handleCountrySelect = (entryId: string, country: DTACountry) => {
    handleUpdateEntry(entryId, 'country', country.name);
    setCountrySearch(prev => ({ ...prev, [entryId]: country.name }));
    setShowCountryDropdown(prev => ({ ...prev, [entryId]: false }));
  };

  // Fetch BOT exchange rate for an entry, auto-filling both amountThb and foreignTaxPaid
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

      // Build a single update for both income THB and tax THB
      const updates: Partial<ForeignIncomeEntry> = {};
      if (entry.amount > 0) {
        updates.amountThb = Math.round(entry.amount * result.data.rate * 100) / 100;
      }
      const taxOriginal = entry.foreignTaxPaidOriginal ?? 0;
      const taxCurrency = entry.foreignTaxPaidCurrency ?? entry.currency;
      if (taxOriginal > 0 && taxCurrency !== 'THB') {
        updates.foreignTaxPaid = Math.round(taxOriginal * result.data.rate * 100) / 100;
      }

      if (Object.keys(updates).length > 0) {
        setFormData({
          ...formData,
          foreignIncomeEntries: formData.foreignIncomeEntries.map(e =>
            e.id === entry.id ? { ...e, ...updates } : e
          ),
        });
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

  // Check if entry is taxable under 2024+ rules (including pension DTA exemptions)
  const isEntryTaxable = (entry: ForeignIncomeEntry): { taxable: boolean; reason: string; dtaPensionExempt?: boolean; dtaArticle?: string } => {
    // DTA pension exemption — fully exempt regardless of dates/remittance
    if (entry.isPension && entry.pensionType && entry.country) {
      const pensionExemption = getPensionDTAExemption(entry.country, entry.pensionType as PensionType);
      if (pensionExemption) {
        return {
          taxable: false,
          reason: `DTA ${pensionExemption.dtaArticle} — exempt from Thai tax`,
          dtaPensionExempt: true,
          dtaArticle: pensionExemption.dtaArticle,
        };
      }
    }

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
        <h2 className="display text-2xl leading-tight text-ink sm:text-[28px] mb-2">Foreign Income</h2>
        <div className="border p-6 text-center border-ink/25">
          <svg className="w-12 h-12 text-ink-mute mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
          <p className="text-ink-soft">
            You indicated that you don't have foreign income remitted to Thailand.
          </p>
          <p className="text-sm text-ink-mute mt-2">
            Click Next to proceed to the next step.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="display text-2xl leading-tight text-ink sm:text-[28px] mb-2">Foreign Income Details</h2>
      <p className="text-ink-soft mb-6">
        Add all foreign income that was remitted to Thailand during this tax year.
      </p>

      {/* Info Box */}
      <div className="border border-ink/25 p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="text-sm text-ink-soft">
            <p className="font-medium mb-1">Foreign Income Tax Rules (2024+)</p>
            <ul className="list-disc list-inside space-y-1 text-ink-soft">
              <li>Income earned on/after January 1, 2024 is taxable if remitted to Thailand</li>
              <li>Foreign tax paid may be credited against Thai tax (limited to Thai tax rate)</li>
              <li>Income earned before 2024 is not taxable even if remitted in 2024+</li>
              <li><strong>Tax treaty required</strong> to claim foreign tax credits — Thailand has treaties with 61 countries</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Non-income remittance info card */}
      <div className="p-4 mb-6 border-2 border-desk">
        <div className="flex items-start gap-3">
          <div className="text-sm text-ink">
            <p className="font-medium mb-1">Remitting savings or capital? That's not taxable.</p>
            <p className="text-ink">
              Thailand taxes <strong>income</strong>, not capital. If you're transferring money you
              already saved — whether pre-residency savings, return of investment principal, or funds
              accumulated before 1 January 2024 — that is not assessable income and does not need to
              be entered here. Only enter income such as employment pay, interest, dividends, or
              rental receipts that were earned in 2024 or later and remitted to Thailand.
            </p>
          </div>
        </div>
      </div>

      {/* Income Entries List */}
      <div className="space-y-4 mb-6">
        {formData.foreignIncomeEntries.map((entry, index) => {
          const taxability = isEntryTaxable(entry);
          const entryErrors = errors[entry.id] || [];
          const isExpanded = expandedEntry === entry.id;
          const effectiveTaxCurrency = entry.foreignTaxPaidCurrency ?? entry.currency;
          const rate = rateInfo[entry.id];

          return (
            <div
              key={entry.id}
              className={`border-2 overflow-hidden transition-all ${
                entryErrors.length > 0 && showValidationErrors
                  ? 'border-desk'
                  : 'border-paper-rule'
              }`}
            >
              {/* Entry Header */}
              <div
                className={`p-4 cursor-pointer flex justify-between items-center ${
                  isExpanded ? '' : 'bg-paper-white hover:bg-desk/[0.05]'
                }`}
                onClick={() => setExpandedEntry(isExpanded ? null : entry.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-ink-mute">#{index + 1}</span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-ink">
                        {entry.country || 'New Entry'} - {entry.currency} {entry.amount.toLocaleString() || '0'}
                      </p>
                      {entry.country && (() => {
                        const dtaStatus = getEntryDTAStatus(entry);
                        if (dtaStatus === true) return (
                          <span className="text-xs px-1.5 py-0.5 text-ink whitespace-nowrap">Tax Treaty</span>
                        );
                        if (dtaStatus === false) return (
                          <span className="text-xs px-1.5 py-0.5 text-ink whitespace-nowrap">No Treaty</span>
                        );
                        return null;
                      })()}
                    </div>
                    <p className="text-sm text-ink-mute">
                      THB {entry.amountThb.toLocaleString()}
                      {taxability.dtaPensionExempt && (
                        <span className="ml-2 text-ink-soft font-medium">DTA Exempt</span>
                      )}
                      {!taxability.dtaPensionExempt && taxability.taxable && (
                        <span className="ml-2 text-ink font-medium">Taxable</span>
                      )}
                      {!taxability.dtaPensionExempt && !taxability.taxable && entry.dateEarned && (
                        <span className="ml-2 text-ink-mute">Not Taxable</span>
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
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Entry Details (Expanded) */}
              {isExpanded && (
                <div className="p-4 border-t border-paper-rule bg-paper-white space-y-4">
                  {/* Error Messages */}
                  {entryErrors.length > 0 && showValidationErrors && (
                    <div className="border-desk p-3 border-2">
                      <ul className="text-sm text-ink list-disc list-inside">
                        {entryErrors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Country - searchable dropdown with DTA status */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-ink-soft mb-1">
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
                        className="field-input"
                      />
                      {/* DTA status indicator */}
                      {entry.country && (() => {
                        const dtaStatus = getEntryDTAStatus(entry);
                        if (dtaStatus === true) return (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 field-label border border-desk px-1.5 py-0.5 text-ink">
                            Tax treaty ✓
                          </span>
                        );
                        if (dtaStatus === false) return (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 field-label border border-desk px-1.5 py-0.5 text-ink">
                            No treaty ⚠
                          </span>
                        );
                        return null;
                      })()}
                    </div>

                    {/* Country dropdown list */}
                    {showCountryDropdown[entry.id] && (
                      <div className="absolute z-10 w-full mt-1 bg-paper-white border border-paper-rule max-h-48 overflow-y-auto">
                        {searchCountries(countrySearch[entry.id] ?? '').slice(0, 20).map(country => (
                          <button
                            key={country.code}
                            type="button"
                            onMouseDown={() => handleCountrySelect(entry.id, country)}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-desk/[0.05] flex items-center justify-between"
                          >
                            <span className="text-ink">{country.name}</span>
                            {country.hasDTA ? (
                              <span className="text-xs text-ink">Tax treaty</span>
                            ) : (
                              <span className="text-xs text-ink">No treaty</span>
                            )}
                          </button>
                        ))}
                        {searchCountries(countrySearch[entry.id] ?? '').length === 0 && (
                          <p className="px-3 py-2 text-sm text-ink-mute">No countries found</p>
                        )}
                      </div>
                    )}

                    {/* DTA guidance message */}
                    {entry.country && (() => {
                      const dtaStatus = getEntryDTAStatus(entry);
                      if (dtaStatus === true) return (
                        <p className="mt-1 text-xs text-ink">
                          Thailand has a tax treaty with {entry.country}. Foreign taxes paid may be credited against Thai tax.
                        </p>
                      );
                      if (dtaStatus === false) return (
                        <p className="mt-1 text-xs text-ink">
                          No tax treaty with {entry.country}. Foreign tax credit may not be available — double taxation risk.
                        </p>
                      );
                      return (
                        <p className="mt-1 text-xs text-ink-mute">
                          Country not in our database. Check rd.go.th for DTA status.
                        </p>
                      );
                    })()}
                  </div>

                  {/* Pension income toggle + type selector */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={entry.isPension ?? false}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setFormData({
                            ...formData,
                            foreignIncomeEntries: formData.foreignIncomeEntries.map(e =>
                              e.id === entry.id
                                ? { ...e, isPension: checked, pensionType: checked ? e.pensionType : undefined }
                                : e
                            ),
                          });
                        }}
                       
                      />
                      <span className="text-sm font-medium text-ink-soft">This is pension income</span>
                    </label>

                    {entry.isPension && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-ink-soft">
                          Pension Type
                        </label>
                        <select
                          value={entry.pensionType ?? ''}
                          onChange={(e) => handleUpdateEntry(entry.id, 'pensionType', e.target.value)}
                          className="field-input"
                        >
                          <option value="">Select pension type…</option>
                          {PENSION_TYPE_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        {entry.pensionType && (
                          <p className="text-xs text-ink-mute">
                            {PENSION_TYPE_OPTIONS.find(o => o.value === entry.pensionType)?.description}
                          </p>
                        )}

                        {/* DTA pension exemption notice */}
                        {entry.pensionType && entry.country && (() => {
                          const exemption = getPensionDTAExemption(entry.country, entry.pensionType as PensionType);
                          if (exemption) {
                            return (
                              <div className="p-3 border-2 border-desk">
                                <p className="text-sm font-medium text-ink">
                                  DTA Exempt — {exemption.dtaArticle}
                                </p>
                                <p className="text-xs text-ink mt-0.5">{exemption.note}</p>
                              </div>
                            );
                          }
                          if (entry.pensionType !== 'other_pension') {
                            return (
                              <div className="p-3 border border-ink/25">
                                <p className="text-sm text-ink-soft">
                                  This pension type is not DTA-exempt and is subject to Thai tax when remitted to Thailand. Foreign tax paid may be credited against Thai tax if a tax treaty applies.
                                </p>
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Dates — shown before currency/amount so BOT rate fetch has dates ready */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-ink-soft mb-1">
                        Date Earned *
                      </label>
                      <input
                        type="date"
                        value={entry.dateEarned}
                        onChange={(e) => handleUpdateEntry(entry.id, 'dateEarned', e.target.value)}
                        className="field-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-soft mb-1">
                        Date Remitted to Thailand
                      </label>
                      <input
                        type="date"
                        value={entry.dateRemitted || ''}
                        onChange={(e) => handleUpdateEntry(entry.id, 'dateRemitted', e.target.value || null)}
                        className="field-input"
                      />
                    </div>
                  </div>

                  {/* Amount and Currency */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-ink-soft mb-1">
                        Currency
                      </label>
                      <select
                        value={entry.currency}
                        onChange={(e) => handleUpdateEntry(entry.id, 'currency', e.target.value)}
                        className="field-input"
                      >
                        <optgroup label="Common">
                          {COMMON_CURRENCIES.map(curr => (
                            <option key={curr.code} value={curr.code}>
                              {curr.code} - {curr.name}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Other">
                          {EXTENDED_CURRENCIES.map(curr => (
                            <option key={curr.code} value={curr.code}>
                              {curr.code} - {curr.name}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-soft mb-1">
                        Amount *
                      </label>
                      <input
                        type="number"
                        value={entry.amount || ''}
                        onChange={(e) => handleUpdateEntry(entry.id, 'amount', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        min="0"
                        className="field-input"
                      />
                    </div>
                  </div>

                  {/* THB Amount with BOT rate fetch */}
                  <div>
                    <label className="block text-sm font-medium text-ink-soft mb-1">
                      Amount in Thai Baht (THB) *
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute">฿</span>
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
                          className="field-input pl-8 pr-3"
                        />
                      </div>
                      {entry.currency !== 'THB' && (
                        <button
                          type="button"
                          onClick={() => handleFetchRate(entry)}
                          disabled={rateLoading[entry.id]}
                          title="Fetch official BOT exchange rate"
                          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-desk border border-ink/25 hover:bg-desk/[0.05] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap transition-colors"
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
                    {rate && (
                      <div className="mt-2 p-2 text-xs text-ink border-2 border-desk">
                        <span className="font-medium">BOT rate on {rate.date}:</span>{' '}
                        1 {entry.currency} = {rate.rate.toFixed(4)} THB
                        {entry.amount > 0 && (
                          <span className="ml-1">
                            → {(entry.amount * rate.rate).toLocaleString('en-US', { maximumFractionDigits: 2 })} THB
                          </span>
                        )}
                      </div>
                    )}
                    {rateError[entry.id] && (
                      <div className="mt-2 p-2 border-desk text-xs text-ink border-2">
                        {rateError[entry.id]}
                      </div>
                    )}

                    <p className="text-xs text-ink-mute mt-1">
                      {rate
                        ? 'Rate auto-filled from Bank of Thailand — verify at bot.or.th before filing.'
                        : 'Enter manually or use "Fetch BOT rate" to auto-convert using the official Bank of Thailand rate.'}
                    </p>
                  </div>

                  {/* Foreign Tax Paid — currency selector with auto-conversion using same BOT rate */}
                  <div>
                    <label className="block text-sm font-medium text-ink-soft mb-1">
                      Foreign Tax Already Paid
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={effectiveTaxCurrency}
                        onChange={(e) => handleUpdateTaxPaid(entry.id, 'currency', e.target.value)}
                        className="field-input"
                      >
                        <optgroup label="Common">
                          {COMMON_CURRENCIES.map(curr => (
                            <option key={curr.code} value={curr.code}>
                              {curr.code} - {curr.name}
                            </option>
                          ))}
                        </optgroup>
                        <optgroup label="Other">
                          {EXTENDED_CURRENCIES.map(curr => (
                            <option key={curr.code} value={curr.code}>
                              {curr.code} - {curr.name}
                            </option>
                          ))}
                        </optgroup>
                      </select>
                      <input
                        type="number"
                        value={entry.foreignTaxPaidOriginal || ''}
                        onChange={(e) => handleUpdateTaxPaid(entry.id, 'original', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        min="0"
                        className="field-input"
                      />
                    </div>

                    {/* THB equivalent — shown when a non-THB tax amount is entered */}
                    {effectiveTaxCurrency !== 'THB' && (entry.foreignTaxPaidOriginal ?? 0) > 0 && (
                      <div className="mt-2">
                        {rate ? (
                          <p className="text-xs text-ink">
                            = {entry.foreignTaxPaid.toLocaleString('en-US', { maximumFractionDigits: 2 })} THB
                            (same BOT rate on {rate.date})
                          </p>
                        ) : (
                          <p className="text-xs text-ink">
                            Fetch BOT rate above to auto-convert to THB
                          </p>
                        )}
                      </div>
                    )}

                    {(() => {
                      const dtaStatus = getEntryDTAStatus(entry);
                      if (dtaStatus === false) return (
                        <p className="text-xs text-ink mt-1">
                          No tax treaty with {entry.country} — foreign tax credit may not be available.
                        </p>
                      );
                      if (dtaStatus === null && entry.country) return (
                        <p className="text-xs text-ink-mute mt-1">
                          Tax paid in the source country (verify DTA status at rd.go.th before claiming credit)
                        </p>
                      );
                      return (
                        <p className="text-xs text-ink-mute mt-1">
                          Tax paid in the source country (may be credited against Thai tax under the tax treaty)
                        </p>
                      );
                    })()}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-ink-soft mb-1">
                      Description (Optional)
                    </label>
                    <input
                      type="text"
                      value={entry.description}
                      onChange={(e) => handleUpdateEntry(entry.id, 'description', e.target.value)}
                      placeholder="e.g., Freelance project payment"
                      className="field-input"
                    />
                  </div>

                  {/* Taxability Status */}
                  <div className={`p-3 ${
                    taxability.dtaPensionExempt
                      ? 'border border-ink/25'
                      : taxability.taxable
                        ? 'border border-desk'
                        : 'border border-paper-rule'
                  }`}>
                    <p className={`text-sm font-medium ${
                      taxability.dtaPensionExempt
                        ? 'text-ink'
                        : taxability.taxable
                          ? 'text-ink'
                          : 'text-ink-soft'
                    }`}>
                      {taxability.dtaPensionExempt
                        ? `DTA Exempt (${taxability.dtaArticle})`
                        : taxability.taxable
                          ? 'This income is taxable in Thailand'
                          : 'Not taxable'}
                    </p>
                    <p className={`text-xs ${
                      taxability.dtaPensionExempt ? 'text-desk' : taxability.taxable ? 'text-ink' : 'text-ink-mute'
                    }`}>
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
        className="w-full py-3 px-6 border-2 border-dashed border-ink/25 text-ink-soft hover:border-desk hover:text-desk transition-colors mb-6 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Foreign Income Entry
      </button>

      {/* Summary */}
      {formData.foreignIncomeEntries.length > 0 && (
        <div className="border p-4 border-ink/25">
          <h3 className="field-label mb-3 block border-b-2 border-desk pb-1.5 text-ink">Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-ink-mute">Total Foreign Income</p>
              <p className="text-lg font-semibold text-ink">
                {totalForeignIncome.toLocaleString()} THB
              </p>
            </div>
            <div>
              <p className="text-ink-mute">Taxable Amount</p>
              <p className="text-lg font-semibold text-ink">
                {taxableForeignIncome.toLocaleString()} THB
              </p>
            </div>
            <div>
              <p className="text-ink-mute">Foreign Tax Paid</p>
              <p className="text-lg font-semibold text-ink">
                {totalForeignTaxPaid.toLocaleString()} THB
              </p>
            </div>
            <div>
              <p className="text-ink-mute">Number of Entries</p>
              <p className="text-lg font-semibold text-ink">
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
