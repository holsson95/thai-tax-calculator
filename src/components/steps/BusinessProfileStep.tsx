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
      <h2 className="display text-2xl leading-tight text-ink sm:text-[28px] mb-2">Business Profile</h2>
      <p className="text-ink-soft mb-6">
        Tell us about your business to determine the applicable tax deductions.
      </p>

      {/* Business Name */}
      <div className="mb-6">
        <label htmlFor="businessName" className="block text-sm font-medium text-ink-soft mb-2">
          Business Name
        </label>
        <input
          id="businessName"
          type="text"
          value={businessProfile.businessName}
          onChange={(e) => updateBusinessProfile({ businessName: e.target.value })}
          onBlur={() => setTouched({ ...touched, businessName: true })}
          placeholder="e.g., My Consulting Services"
          className="field-input h-12 text-lg"
            aria-invalid={!!(showNameError)}
          aria-describedby="name-error"
        />
        {showNameError && (
          <p id="name-error" className="field-error">
            Please enter your business name
          </p>
        )}
      </div>

      {/* Business Category */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-ink-soft mb-2">
          Business Category
        </label>
        <p className="text-sm text-ink-mute mb-3">
          Select the category that best describes your business activities. This determines your
          flat-rate expense deduction.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(BUSINESS_CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleCategorySelect(key as BusinessCategory)}
              className={`p-3 border-2 text-left transition-all ${
                businessProfile.businessCategory === key
                  ? 'border-desk'
                  : 'border-paper-rule hover:border-ink/25 hover:bg-desk/[0.05]'
              }`}
            >
              <div className="font-medium text-ink">{label}</div>
              <div className="text-xs text-ink-mute mt-1">
                {BUSINESS_CATEGORY_DESCRIPTIONS[key as BusinessCategory]}
              </div>
            </button>
          ))}
        </div>
        {showCategoryError && (
          <p className="field-error">Please select a business category</p>
        )}
      </div>

      {/* Registration Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-ink-soft mb-2">
          Business Registration
        </label>
        <div className="space-y-2">
          {REGISTRATION_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => handleRegistrationTypeSelect(type.value)}
              className={`w-full p-3 border-2 text-left transition-all ${
                businessProfile.registrationType === type.value
                  ? 'border-desk'
                  : 'border-paper-rule hover:border-ink/25 hover:bg-desk/[0.05]'
              }`}
            >
              <div className="font-medium text-ink">{type.label}</div>
              <div className="text-xs text-ink-mute">{type.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Years in Operation */}
      <div className="mb-6">
        <label htmlFor="yearsInOperation" className="block text-sm font-medium text-ink-soft mb-2">
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
            className="field-input h-12 text-lg"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-mute">years</span>
        </div>
      </div>

      {/* Additional Options */}
      <div className="mb-6 space-y-3">
        <label className="flex items-center gap-3 cursor-pointer p-3 border hover:border-ink/25 transition-colors border-ink/25">
          <input
            type="checkbox"
            checked={businessProfile.hasPhysicalLocation}
            onChange={(e) => updateBusinessProfile({ hasPhysicalLocation: e.target.checked })}
           
          />
          <div>
            <span className="text-ink font-medium">Physical business location</span>
            <p className="text-xs text-ink-mute">
              Do you have a shop, office, or other physical business premises?
            </p>
          </div>
        </label>

        <label className="flex items-center gap-3 cursor-pointer p-3 border hover:border-ink/25 transition-colors border-ink/25">
          <input
            type="checkbox"
            checked={formData.hasInventory}
            onChange={(e) => setFormData({ ...formData, hasInventory: e.target.checked })}
           
          />
          <div>
            <span className="text-ink font-medium">Hold inventory</span>
            <p className="text-xs text-ink-mute">
              Do you purchase and hold goods for resale?
            </p>
          </div>
        </label>
      </div>

      {/* Info Box */}
      <div className="border border-ink/25 p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="text-sm text-ink-soft">
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
