import { useState, useEffect } from 'react';
import {
  SoleProprietorStepProps,
  BusinessCategory,
  BusinessRegistrationType,
  createDefaultBusinessProfile,
} from '../../types/soleProprietorForm';
import { BUSINESS_CATEGORY_LABELS, BUSINESS_CATEGORY_DESCRIPTIONS } from '../../config/taxConfig';

const REGISTRATION_TYPES: { value: BusinessRegistrationType; label: string; description: string }[] = [
  {
    value: 'unregistered',
    label: 'Not Registered',
    description: 'Operating without formal business registration',
  },
  {
    value: 'sole_proprietorship',
    label: 'Registered Sole Proprietorship',
    description: 'Registered with DBD as a sole proprietorship',
  },
  {
    value: 'partnership',
    label: 'Ordinary Partnership',
    description: 'Unincorporated partnership (ห้างหุ้นส่วนสามัญ)',
  },
  {
    value: 'other',
    label: 'Other',
    description: 'Other business structure',
  },
];

const BusinessProfileStep: React.FC<SoleProprietorStepProps> = ({
  formData,
  setFormData,
  showValidationErrors,
}) => {
  const [touched, setTouched] = useState({
    businessName: false,
    businessCategory: false,
    registrationType: false,
    yearsInOperation: false,
  });

  // Initialize with existing data or defaults
  const businessProfile = formData.businessProfile || createDefaultBusinessProfile();

  const [localYears, setLocalYears] = useState<string>(
    businessProfile.yearsInOperation > 0 ? businessProfile.yearsInOperation.toString() : ''
  );

  // Update form data helper
  const updateBusinessProfile = (updates: Partial<typeof businessProfile>) => {
    setFormData({
      ...formData,
      businessProfile: {
        ...businessProfile,
        ...updates,
      },
    });
  };

  // Sync years to form data
  useEffect(() => {
    const yearsNum = parseInt(localYears, 10) || 0;
    if (yearsNum !== businessProfile.yearsInOperation) {
      updateBusinessProfile({ yearsInOperation: yearsNum });
    }
  }, [localYears]);

  const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setLocalYears(value);
    }
  };

  const handleCategorySelect = (category: BusinessCategory) => {
    updateBusinessProfile({ businessCategory: category });
    setTouched({ ...touched, businessCategory: true });
  };

  const handleRegistrationTypeSelect = (type: BusinessRegistrationType) => {
    updateBusinessProfile({ registrationType: type });
    setTouched({ ...touched, registrationType: true });
  };

  // Validation states
  const showNameError =
    (touched.businessName || showValidationErrors) &&
    businessProfile.businessName.trim().length === 0;

  const showCategoryError =
    (touched.businessCategory || showValidationErrors) &&
    !businessProfile.businessCategory;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Business Profile</h2>
      <p className="text-gray-600 mb-6">
        Tell us about your business to determine the applicable tax deductions.
      </p>

      {/* Business Name */}
      <div className="mb-6">
        <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
          Business Name
        </label>
        <input
          id="businessName"
          type="text"
          value={businessProfile.businessName}
          onChange={(e) => updateBusinessProfile({ businessName: e.target.value })}
          onBlur={() => setTouched({ ...touched, businessName: true })}
          placeholder="e.g., My Consulting Services"
          className={`w-full px-4 py-3 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            showNameError
              ? 'border-red-300 focus:border-red-500'
              : 'border-gray-200 focus:border-blue-500'
          }`}
          aria-describedby="name-error"
        />
        {showNameError && (
          <p id="name-error" className="mt-1 text-sm text-red-600">
            Please enter your business name
          </p>
        )}
      </div>

      {/* Business Category */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Category
        </label>
        <p className="text-sm text-gray-500 mb-3">
          Select the category that best describes your business activities. This determines your
          flat-rate expense deduction.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(BUSINESS_CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleCategorySelect(key as BusinessCategory)}
              className={`p-3 border-2 rounded-lg text-left transition-all ${
                businessProfile.businessCategory === key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium text-gray-800">{label}</div>
              <div className="text-xs text-gray-500 mt-1">
                {BUSINESS_CATEGORY_DESCRIPTIONS[key as BusinessCategory]}
              </div>
            </button>
          ))}
        </div>
        {showCategoryError && (
          <p className="mt-2 text-sm text-red-600">Please select a business category</p>
        )}
      </div>

      {/* Registration Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Registration
        </label>
        <div className="space-y-2">
          {REGISTRATION_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => handleRegistrationTypeSelect(type.value)}
              className={`w-full p-3 border-2 rounded-lg text-left transition-all ${
                businessProfile.registrationType === type.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium text-gray-800">{type.label}</div>
              <div className="text-xs text-gray-500">{type.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Years in Operation */}
      <div className="mb-6">
        <label htmlFor="yearsInOperation" className="block text-sm font-medium text-gray-700 mb-2">
          Years in Operation (optional)
        </label>
        <div className="relative max-w-xs">
          <input
            id="yearsInOperation"
            type="text"
            inputMode="numeric"
            value={localYears}
            onChange={handleYearsChange}
            onBlur={() => setTouched({ ...touched, yearsInOperation: true })}
            placeholder="e.g., 3"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">years</span>
        </div>
      </div>

      {/* Additional Options */}
      <div className="mb-6 space-y-3">
        <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
          <input
            type="checkbox"
            checked={businessProfile.hasPhysicalLocation}
            onChange={(e) => updateBusinessProfile({ hasPhysicalLocation: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <div>
            <span className="text-gray-800 font-medium">Physical business location</span>
            <p className="text-xs text-gray-500">
              Do you have a shop, office, or other physical business premises?
            </p>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
          <input
            type="checkbox"
            checked={formData.hasInventory}
            onChange={(e) => setFormData({ ...formData, hasInventory: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <div>
            <span className="text-gray-800 font-medium">Hold inventory</span>
            <p className="text-xs text-gray-500">
              Do you purchase and hold goods for resale?
            </p>
          </div>
        </label>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Flat-rate vs. Actual Expenses</p>
            <p>
              Based on your business category, you may be eligible for flat-rate expense deductions.
              We'll compare this with your actual expenses in the next steps to find the best option
              for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileStep;
