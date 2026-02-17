import { useState, useEffect } from 'react';
import {
  CompanyOwnerStepProps,
  CompanyType,
  DividendEntry,
  DividendType,
  createDefaultCompanyInfo,
  generateDividendEntryId,
} from '../../types/companyOwnerForm';

const COMPANY_TYPES: { value: CompanyType; label: string; description: string }[] = [
  {
    value: 'limited_company',
    label: 'Private Limited Company',
    description: 'Thai limited company (บริษัทจำกัด)',
  },
  {
    value: 'public_company',
    label: 'Public Limited Company',
    description: 'Listed or public company (บริษัทมหาชน)',
  },
  {
    value: 'partnership_limited',
    label: 'Limited Partnership',
    description: 'Limited partnership (ห้างหุ้นส่วนจำกัด)',
  },
  {
    value: 'other',
    label: 'Other',
    description: 'Other corporate structure',
  },
];

const DIVIDEND_TYPES: { value: DividendType; label: string; description: string }[] = [
  {
    value: 'thai_listed',
    label: 'Thai Listed Company',
    description: 'Dividends from SET-listed companies',
  },
  {
    value: 'thai_unlisted',
    label: 'Thai Unlisted Company',
    description: 'Dividends from private Thai companies',
  },
  {
    value: 'foreign',
    label: 'Foreign Company',
    description: 'Dividends from non-Thai companies',
  },
];

const formatNumber = (value: number): string => {
  return value.toLocaleString('en-US');
};

const parseNumber = (value: string): number => {
  const cleaned = value.replace(/,/g, '').replace(/[^\d.]/g, '');
  return parseFloat(cleaned) || 0;
};

const CompanyIncomeStep: React.FC<CompanyOwnerStepProps> = ({
  formData,
  setFormData,
  showValidationErrors,
}) => {
  const [touched, setTouched] = useState({
    companyName: false,
    companyType: false,
    salaryFromCompany: false,
    ownership: false,
  });

  // Local state for formatted inputs
  const [localSalary, setLocalSalary] = useState<string>(
    formData.salaryFromCompany > 0 ? formatNumber(formData.salaryFromCompany) : ''
  );
  const [localDirectorFees, setLocalDirectorFees] = useState<string>(
    formData.directorFees > 0 ? formatNumber(formData.directorFees) : ''
  );
  const [localOtherBenefits, setLocalOtherBenefits] = useState<string>(
    formData.otherCompanyBenefits > 0 ? formatNumber(formData.otherCompanyBenefits) : ''
  );
  const [localOwnership, setLocalOwnership] = useState<string>(
    formData.companyInfo?.ownershipPercentage > 0
      ? formData.companyInfo.ownershipPercentage.toString()
      : '100'
  );
  const [localCompanyProfit, setLocalCompanyProfit] = useState<string>(
    formData.companyProfitAfterTax > 0 ? formatNumber(formData.companyProfitAfterTax) : ''
  );

  // Initialize company info if not present
  const companyInfo = formData.companyInfo || createDefaultCompanyInfo();

  // Update company info helper
  const updateCompanyInfo = (updates: Partial<typeof companyInfo>) => {
    setFormData({
      ...formData,
      companyInfo: {
        ...companyInfo,
        ...updates,
      },
    });
  };

  // Sync local values to form data
  useEffect(() => {
    const salary = parseNumber(localSalary);
    if (salary !== formData.salaryFromCompany) {
      setFormData({ ...formData, salaryFromCompany: salary });
    }
  }, [localSalary]);

  useEffect(() => {
    const fees = parseNumber(localDirectorFees);
    if (fees !== formData.directorFees) {
      setFormData({ ...formData, directorFees: fees });
    }
  }, [localDirectorFees]);

  useEffect(() => {
    const benefits = parseNumber(localOtherBenefits);
    if (benefits !== formData.otherCompanyBenefits) {
      setFormData({ ...formData, otherCompanyBenefits: benefits });
    }
  }, [localOtherBenefits]);

  useEffect(() => {
    const ownership = parseInt(localOwnership, 10) || 0;
    const clampedOwnership = Math.min(100, Math.max(0, ownership));
    if (clampedOwnership !== companyInfo.ownershipPercentage) {
      updateCompanyInfo({ ownershipPercentage: clampedOwnership });
    }
  }, [localOwnership]);

  useEffect(() => {
    const profit = parseNumber(localCompanyProfit);
    if (profit !== formData.companyProfitAfterTax) {
      setFormData({ ...formData, companyProfitAfterTax: profit });
    }
  }, [localCompanyProfit]);

  // Dividend entry management
  const addDividendEntry = () => {
    const newEntry: DividendEntry = {
      id: generateDividendEntryId(),
      amount: 0,
      dividendType: 'thai_unlisted',
      withholdingTax: 0,
      companyName: companyInfo.companyName,
      dateReceived: '',
      includeInPIT: false, // Default to exclude (use final withholding)
    };
    setFormData({
      ...formData,
      dividendEntries: [...formData.dividendEntries, newEntry],
    });
  };

  const updateDividendEntry = (id: string, updates: Partial<DividendEntry>) => {
    setFormData({
      ...formData,
      dividendEntries: formData.dividendEntries.map((entry) =>
        entry.id === id ? { ...entry, ...updates } : entry
      ),
    });
  };

  const removeDividendEntry = (id: string) => {
    setFormData({
      ...formData,
      dividendEntries: formData.dividendEntries.filter((entry) => entry.id !== id),
    });
  };

  // Auto-calculate withholding tax for dividends (10%) when entries change
  useEffect(() => {
    if (formData.dividendEntries.length > 0) {
      const needsUpdate = formData.dividendEntries.some(
        (entry) => entry.withholdingTax !== entry.amount * 0.1
      );
      if (needsUpdate) {
        const updatedEntries = formData.dividendEntries.map((entry) => ({
          ...entry,
          withholdingTax: entry.amount * 0.1,
        }));
        setFormData({
          ...formData,
          dividendEntries: updatedEntries,
        });
      }
    }
  }, [formData.dividendEntries]);

  // Calculate totals
  const totalEmploymentIncome =
    formData.salaryFromCompany + formData.directorFees + formData.otherCompanyBenefits;
  const totalDividends = formData.dividendEntries.reduce((sum, entry) => sum + entry.amount, 0);
  const totalIncome = totalEmploymentIncome + totalDividends;

  // Validation
  const showCompanyNameError =
    (touched.companyName || showValidationErrors) &&
    companyInfo.companyName.trim().length === 0;

  const showSalaryError =
    (touched.salaryFromCompany || showValidationErrors) && formData.salaryFromCompany <= 0;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Company Owner Income</h2>
      <p className="text-gray-600 mb-6">
        Enter your income from the company you own, including salary and dividends.
      </p>

      {/* Thai Company Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
        <div className="flex items-start gap-2">
          <svg className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-amber-700">
            <p className="font-medium">For Thai Companies</p>
            <p>
              This section is for income from Thai registered companies. If you receive
              salary or dividends from a foreign company, please use the
              "Self-Employed / Freelancer" option which handles foreign income reporting.
            </p>
          </div>
        </div>
      </div>

      {/* Company Information Section */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Company Information</h3>

        {/* Company Name */}
        <div className="mb-4">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
            Company Name *
          </label>
          <input
            id="companyName"
            type="text"
            value={companyInfo.companyName}
            onChange={(e) => updateCompanyInfo({ companyName: e.target.value })}
            onBlur={() => setTouched({ ...touched, companyName: true })}
            placeholder="e.g., ABC Company Ltd."
            className={`w-full px-4 py-3 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              showCompanyNameError
                ? 'border-red-300 focus:border-red-500'
                : 'border-gray-200 focus:border-blue-500'
            }`}
          />
          {showCompanyNameError && (
            <p className="mt-1 text-sm text-red-600">Please enter the company name</p>
          )}
        </div>

        {/* Company Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {COMPANY_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => updateCompanyInfo({ companyType: type.value })}
                className={`p-3 border-2 rounded-lg text-left transition-all ${
                  companyInfo.companyType === type.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-white'
                }`}
              >
                <div className="font-medium text-gray-800 text-sm">{type.label}</div>
                <div className="text-xs text-gray-500">{type.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Ownership & Director Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ownership" className="block text-sm font-medium text-gray-700 mb-2">
              Ownership %
            </label>
            <div className="relative">
              <input
                id="ownership"
                type="text"
                inputMode="numeric"
                value={localOwnership}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^\d]/g, '');
                  setLocalOwnership(val);
                }}
                onBlur={() => setTouched({ ...touched, ownership: true })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pr-10"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
          </div>
          <div className="flex items-end pb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={companyInfo.isDirector}
                onChange={(e) => updateCompanyInfo({ isDirector: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-gray-800">I am a director</span>
            </label>
          </div>
        </div>
      </div>

      {/* Employment Income Section */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Employment Income from Company</h3>

        {/* Salary */}
        <div className="mb-4">
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
            Annual Salary *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
            <input
              id="salary"
              type="text"
              inputMode="numeric"
              value={localSalary}
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, '');
                if (raw === '' || /^\d+$/.test(raw)) {
                  setLocalSalary(raw ? formatNumber(parseInt(raw, 10)) : '');
                }
              }}
              onBlur={() => setTouched({ ...touched, salaryFromCompany: true })}
              placeholder="0"
              className={`w-full px-4 py-3 pl-8 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                showSalaryError
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-500'
              }`}
            />
          </div>
          {showSalaryError && (
            <p className="mt-1 text-sm text-red-600">Please enter your annual salary</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Total salary received from your company in the tax year
          </p>
        </div>

        {/* Director Fees */}
        {companyInfo.isDirector && (
          <div className="mb-4">
            <label htmlFor="directorFees" className="block text-sm font-medium text-gray-700 mb-2">
              Director Fees & Bonuses
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
              <input
                id="directorFees"
                type="text"
                inputMode="numeric"
                value={localDirectorFees}
                onChange={(e) => {
                  const raw = e.target.value.replace(/,/g, '');
                  if (raw === '' || /^\d+$/.test(raw)) {
                    setLocalDirectorFees(raw ? formatNumber(parseInt(raw, 10)) : '');
                  }
                }}
                placeholder="0"
                className="w-full px-4 py-3 pl-8 border-2 border-gray-200 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Meeting fees, performance bonuses, and other director compensation
            </p>
          </div>
        )}

        {/* Other Benefits */}
        <div className="mb-4">
          <label htmlFor="otherBenefits" className="block text-sm font-medium text-gray-700 mb-2">
            Other Taxable Benefits
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
            <input
              id="otherBenefits"
              type="text"
              inputMode="numeric"
              value={localOtherBenefits}
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, '');
                if (raw === '' || /^\d+$/.test(raw)) {
                  setLocalOtherBenefits(raw ? formatNumber(parseInt(raw, 10)) : '');
                }
              }}
              placeholder="0"
              className="w-full px-4 py-3 pl-8 border-2 border-gray-200 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Car allowance, housing benefit, or other taxable perks
          </p>
        </div>

        {/* Employment Income Total */}
        {totalEmploymentIncome > 0 && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Total Employment Income</span>
              <span className="text-lg font-bold text-gray-800">
                ฿{formatNumber(totalEmploymentIncome)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Dividend Income Section */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Dividend Income</h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasDividends}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hasDividends: e.target.checked,
                  dividendEntries: e.target.checked ? formData.dividendEntries : [],
                })
              }
              className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-700">I received dividends</span>
          </label>
        </div>

        {formData.hasDividends && (
          <>
            {/* Dividend Tax Explanation */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <svg className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">Thai Dividend Tax Options</p>
                  <p>
                    Thai company dividends have 10% withholding tax. You can either:
                    (1) Use this as final tax (don't include in PIT), or
                    (2) Include in PIT and claim the withholding as a credit.
                    Option 1 is usually better if your marginal tax rate is above 10%.
                  </p>
                </div>
              </div>
            </div>

            {/* Dividend Entries */}
            {formData.dividendEntries.map((entry, index) => (
              <div key={entry.id} className="bg-white rounded-lg p-4 mb-3 border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-gray-700">Dividend #{index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeDividendEntry(entry.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  {/* Amount */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Amount (THB)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">฿</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={entry.amount > 0 ? formatNumber(entry.amount) : ''}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/,/g, '');
                          if (raw === '' || /^\d+$/.test(raw)) {
                            updateDividendEntry(entry.id, {
                              amount: parseInt(raw, 10) || 0,
                            });
                          }
                        }}
                        placeholder="0"
                        className="w-full px-3 py-2 pl-7 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Dividend Type */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                    <select
                      value={entry.dividendType}
                      onChange={(e) =>
                        updateDividendEntry(entry.id, {
                          dividendType: e.target.value as DividendType,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {DIVIDEND_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Company Name */}
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Paying Company
                  </label>
                  <input
                    type="text"
                    value={entry.companyName}
                    onChange={(e) =>
                      updateDividendEntry(entry.id, { companyName: e.target.value })
                    }
                    placeholder="Company name"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Include in PIT Toggle */}
                {entry.dividendType !== 'foreign' && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Include in PIT?</span>
                      <p className="text-xs text-gray-500">
                        If no, 10% withholding tax is your final tax on this dividend
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={entry.includeInPIT}
                        onChange={(e) =>
                          updateDividendEntry(entry.id, { includeInPIT: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                )}

                {/* Show withholding for included dividends */}
                {entry.amount > 0 && (
                  <div className="mt-3 text-xs text-gray-500">
                    Withholding tax (10%): ฿{formatNumber(entry.amount * 0.1)}
                    {entry.includeInPIT
                      ? ' - Will be credited against your tax'
                      : ' - Final tax (not included in PIT)'}
                  </div>
                )}
              </div>
            ))}

            {/* Add Dividend Button */}
            <button
              type="button"
              onClick={addDividendEntry}
              className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Dividend Entry
            </button>

            {/* Dividend Total */}
            {totalDividends > 0 && (
              <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Total Dividends</span>
                  <span className="text-lg font-bold text-gray-800">
                    ฿{formatNumber(totalDividends)}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Company Profit Section (Informational) */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">Company Financial Info (Optional)</h3>
        <p className="text-xs text-gray-500 mb-4">
          This information helps us provide advice but doesn't affect your personal tax calculation.
        </p>

        <div>
          <label htmlFor="companyProfit" className="block text-sm font-medium text-gray-700 mb-2">
            Company Profit After Tax (Last Year)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
            <input
              id="companyProfit"
              type="text"
              inputMode="numeric"
              value={localCompanyProfit}
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, '');
                if (raw === '' || /^\d+$/.test(raw)) {
                  setLocalCompanyProfit(raw ? formatNumber(parseInt(raw, 10)) : '');
                }
              }}
              placeholder="0"
              className="w-full px-4 py-3 pl-8 border-2 border-gray-200 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Income Summary */}
      {totalIncome > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-3">Income Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700">Employment Income</span>
              <span className="font-medium text-blue-800">฿{formatNumber(totalEmploymentIncome)}</span>
            </div>
            {totalDividends > 0 && (
              <div className="flex justify-between">
                <span className="text-blue-700">Dividend Income</span>
                <span className="font-medium text-blue-800">฿{formatNumber(totalDividends)}</span>
              </div>
            )}
            <div className="border-t border-blue-200 pt-2 flex justify-between">
              <span className="text-blue-800 font-medium">Total Income</span>
              <span className="font-bold text-blue-800">฿{formatNumber(totalIncome)}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CompanyIncomeStep;
