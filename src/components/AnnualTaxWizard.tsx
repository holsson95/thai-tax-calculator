import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaxFormData } from '../types/taxForm';
import { FreelancerFormData, createDefaultFreelancerFormData } from '../types/freelancerForm';
import { SoleProprietorFormData, createDefaultSoleProprietorFormData } from '../types/soleProprietorForm';
import { CompanyOwnerFormData, createDefaultCompanyOwnerFormData } from '../types/companyOwnerForm';
import EmploymentTypeStep from './steps/EmploymentTypeStep';
import AnnualIncomeStep from './steps/AnnualIncomeStep';
import MaritalStatusStepAnnual from './steps/MaritalStatusStepAnnual';
import DependentsStepAnnual from './steps/DependentsStepAnnual';
import DeductionsStepAnnual from './steps/DeductionsStepAnnual';
import WithholdingStep from './steps/WithholdingStep';
import ReviewStep from './steps/ReviewStep';
import AnnualResultsStep from './steps/AnnualResultsStep';
// Freelancer-specific steps
import ResidencyStep from './steps/ResidencyStep';
import ForeignIncomeStep from './steps/ForeignIncomeStep';
import ThaiIncomeStep from './steps/ThaiIncomeStep';
import ExpenseMethodStep from './steps/ExpenseMethodStep';
import ActualExpensesStep from './steps/ActualExpensesStep';
import FreelancerReviewStep from './steps/FreelancerReviewStep';
import FreelancerResultsStep from './steps/FreelancerResultsStep';
// Sole proprietor-specific steps
import BusinessProfileStep from './steps/BusinessProfileStep';
// Company owner-specific steps
import CompanyIncomeStep from './steps/CompanyIncomeStep';

const STORAGE_KEY = 'thai_tax_annual_wizard_data';
const STORAGE_STEP_KEY = 'thai_tax_annual_wizard_step';

// Salaried employee flow (8 steps)
const SALARIED_STEP_LABELS = [
  'Employment',
  'Income',
  'Marital Status',
  'Dependents',
  'Deductions',
  'Withholding',
  'Review',
  'Results',
];

// Freelancer flow (12 steps) - full freelancer journey
const FREELANCER_STEP_LABELS = [
  'Employment',      // 0
  'Residency',       // 1
  'Foreign Income',  // 2
  'Thai Income',     // 3
  'Expense Method',  // 4
  'Actual Expenses', // 5 (conditional - skipped if force_flat)
  'Marital Status',  // 6
  'Dependents',      // 7
  'Deductions',      // 8
  'Withholding',     // 9
  'Review',          // 10
  'Results',         // 11
];

// Sole Proprietor flow (13 steps) - freelancer flow + business profile
const SOLE_PROPRIETOR_STEP_LABELS = [
  'Employment',      // 0
  'Business',        // 1 - Business profile step
  'Residency',       // 2
  'Foreign Income',  // 3
  'Thai Income',     // 4
  'Expense Method',  // 5
  'Actual Expenses', // 6 (conditional - skipped if force_flat)
  'Marital Status',  // 7
  'Dependents',      // 8
  'Deductions',      // 9
  'Withholding',     // 10
  'Review',          // 11
  'Results',         // 12
];

// Company Owner flow (9 steps) - similar to salaried but with company income step
const COMPANY_OWNER_STEP_LABELS = [
  'Employment',      // 0
  'Company Income',  // 1 - Salary, dividends, company info
  'Marital Status',  // 2
  'Dependents',      // 3
  'Deductions',      // 4
  'Withholding',     // 5
  'Review',          // 6
  'Results',         // 7
];

// Union type for form data that can be salaried, freelancer, sole proprietor, or company owner
type WizardFormData = TaxFormData | FreelancerFormData | SoleProprietorFormData | CompanyOwnerFormData;

// Type guard to check if form data is freelancer type
function isFreelancerEmployment(employmentType: string): boolean {
  return employmentType === 'self-employed' || employmentType === 'freelancer';
}

// Type guard to check if form data is sole proprietor type
function isSoleProprietorEmployment(employmentType: string): boolean {
  return employmentType === 'sole_proprietor' || employmentType === 'business';
}

// Type guard to check if form data is company owner type
function isCompanyOwnerEmployment(employmentType: string): boolean {
  return employmentType === 'company_owner';
}

function getInitialFormData(): TaxFormData {
  return {
    employmentType: '',
    annualIncome: 0,
    includeSocialSecurity: false,
    socialSecurityContribution: 0,
    maritalStatus: '',
    spouseHasNoIncome: false,
    isAge65OrOlder: false,
    children: [],
    childrenEligibilityConfirmed: false,
    numberOfParents: 0,
    parentsEligibilityConfirmed: false,
    hasLifeInsurance: false,
    lifeInsurance: 0,
    hasHealthInsurance: false,
    healthInsurance: 0,
    hasPensionFund: false,
    pensionFund: 0,
    hasProvidentFund: false,
    providentFund: 0,
    hasRMF: false,
    rmf: 0,
    hasSSF: false,
    ssf: 0,
    hasDonations: false,
    donations: 0,
    taxWithheld: 0,
  };
}

const AnnualTaxWizard: React.FC = () => {
  const navigate = useNavigate();
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // Initialize from sessionStorage if available
  const [currentStep, setCurrentStep] = useState<number>(() => {
    const saved = sessionStorage.getItem(STORAGE_STEP_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });

  const [formData, setFormData] = useState<WizardFormData>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        // Check if it's company owner data and merge appropriately
        if (isCompanyOwnerEmployment(parsedData.employmentType)) {
          return { ...createDefaultCompanyOwnerFormData(), ...parsedData };
        }
        // Check if it's sole proprietor data and merge appropriately
        if (isSoleProprietorEmployment(parsedData.employmentType)) {
          return { ...createDefaultSoleProprietorFormData(), ...parsedData };
        }
        // Check if it's freelancer data and merge appropriately
        if (isFreelancerEmployment(parsedData.employmentType)) {
          return { ...createDefaultFreelancerFormData(), ...parsedData };
        }
        return { ...getInitialFormData(), ...parsedData };
      } catch (error) {
        console.error('Failed to parse saved form data:', error);
        return getInitialFormData();
      }
    }
    return getInitialFormData();
  });

  // Determine flow type
  const isFreelancerFlow = isFreelancerEmployment(formData.employmentType);
  const isSoleProprietorFlow = isSoleProprietorEmployment(formData.employmentType);
  const isCompanyOwnerFlow = isCompanyOwnerEmployment(formData.employmentType);

  // Get appropriate step labels and count based on flow type
  const stepLabels = useMemo(() => {
    if (isCompanyOwnerFlow) return COMPANY_OWNER_STEP_LABELS;
    if (isSoleProprietorFlow) return SOLE_PROPRIETOR_STEP_LABELS;
    if (isFreelancerFlow) return FREELANCER_STEP_LABELS;
    return SALARIED_STEP_LABELS;
  }, [isFreelancerFlow, isSoleProprietorFlow, isCompanyOwnerFlow]);
  const totalSteps = stepLabels.length;

  // Auto-save to sessionStorage whenever formData changes
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  // Auto-save current step
  useEffect(() => {
    sessionStorage.setItem(STORAGE_STEP_KEY, currentStep.toString());
  }, [currentStep]);

  // Handle switching flows when employment type changes
  const handleSetFormData = (newData: WizardFormData) => {
    // Check if switching to company owner flow
    if (isCompanyOwnerEmployment(newData.employmentType) && !isCompanyOwnerEmployment(formData.employmentType)) {
      // Merge existing data with company owner defaults
      const companyOwnerData = {
        ...createDefaultCompanyOwnerFormData(),
        ...newData,
        employmentType: newData.employmentType,
      };
      setFormData(companyOwnerData as CompanyOwnerFormData);
    }
    // Check if switching to sole proprietor flow
    else if (isSoleProprietorEmployment(newData.employmentType) && !isSoleProprietorEmployment(formData.employmentType)) {
      // Merge existing data with sole proprietor defaults
      const soleProprietorData = {
        ...createDefaultSoleProprietorFormData(),
        ...newData,
        employmentType: newData.employmentType,
      };
      setFormData(soleProprietorData as SoleProprietorFormData);
    }
    // Check if switching to freelancer flow
    else if (isFreelancerEmployment(newData.employmentType) && !isFreelancerEmployment(formData.employmentType)) {
      // Merge existing data with freelancer defaults
      const freelancerData = {
        ...createDefaultFreelancerFormData(),
        ...newData,
        employmentType: newData.employmentType,
      };
      setFormData(freelancerData as FreelancerFormData);
    } else {
      setFormData(newData);
    }
  };

  // Navigation handlers
  const handleNextStep = (updatedFormData?: WizardFormData) => {
    const dataToValidate = updatedFormData || formData;
    if (updatedFormData) {
      handleSetFormData(updatedFormData);
    }
    if (isStepValid(dataToValidate)) {
      setShowValidationErrors(false);
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setShowValidationErrors(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setShowValidationErrors(false);
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  };

  const handleStartOver = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_STEP_KEY);
    setFormData(getInitialFormData());
    setCurrentStep(0);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // Render current step component based on flow type
  const renderStep = () => {
    const baseStepProps = {
      formData: formData as TaxFormData,
      setFormData: handleSetFormData as (data: TaxFormData) => void,
      nextStep: handleNextStep as (data?: TaxFormData) => void,
      showValidationErrors,
    };

    const freelancerStepProps = {
      formData: formData as FreelancerFormData,
      setFormData: handleSetFormData as (data: FreelancerFormData) => void,
      nextStep: handleNextStep as (data?: FreelancerFormData) => void,
      prevStep: handlePreviousStep,
      showValidationErrors,
    };

    const soleProprietorStepProps = {
      formData: formData as SoleProprietorFormData,
      setFormData: handleSetFormData as (data: SoleProprietorFormData) => void,
      nextStep: handleNextStep as (data?: SoleProprietorFormData) => void,
      prevStep: handlePreviousStep,
      showValidationErrors,
    };

    const companyOwnerStepProps = {
      formData: formData as CompanyOwnerFormData,
      setFormData: handleSetFormData as (data: CompanyOwnerFormData) => void,
      nextStep: handleNextStep as (data?: CompanyOwnerFormData) => void,
      prevStep: handlePreviousStep,
      showValidationErrors,
    };

    if (isCompanyOwnerFlow) {
      // Company Owner flow (8 steps)
      switch (currentStep) {
        case 0: // Employment
          return <EmploymentTypeStep {...baseStepProps} />;
        case 1: // Company Income (salary, dividends, company info)
          return <CompanyIncomeStep {...companyOwnerStepProps} />;
        case 2: // Marital Status
          return <MaritalStatusStepAnnual {...baseStepProps} />;
        case 3: // Dependents
          return <DependentsStepAnnual {...baseStepProps} />;
        case 4: // Deductions
          return <DeductionsStepAnnual {...baseStepProps} />;
        case 5: // Withholding
          return <WithholdingStep {...baseStepProps} />;
        case 6: // Review
          return <ReviewStep {...baseStepProps} goToStep={goToStep} />;
        case 7: // Results
          return <AnnualResultsStep formData={formData as TaxFormData} onStartOver={handleStartOver} />;
        default:
          return <EmploymentTypeStep {...baseStepProps} />;
      }
    } else if (isSoleProprietorFlow) {
      // Sole Proprietor flow (13 steps) - freelancer flow + business profile
      switch (currentStep) {
        case 0: // Employment
          return <EmploymentTypeStep {...baseStepProps} />;
        case 1: // Business Profile
          return <BusinessProfileStep {...soleProprietorStepProps} />;
        case 2: // Residency
          return <ResidencyStep {...freelancerStepProps} />;
        case 3: // Foreign Income
          return <ForeignIncomeStep {...freelancerStepProps} />;
        case 4: // Thai Income
          return <ThaiIncomeStep {...freelancerStepProps} />;
        case 5: // Expense Method
          return <ExpenseMethodStep {...freelancerStepProps} />;
        case 6: // Actual Expenses
          return <ActualExpensesStep {...freelancerStepProps} />;
        case 7: // Marital Status
          return <MaritalStatusStepAnnual {...baseStepProps} />;
        case 8: // Dependents
          return <DependentsStepAnnual {...baseStepProps} />;
        case 9: // Deductions
          return <DeductionsStepAnnual {...baseStepProps} />;
        case 10: // Withholding
          return <WithholdingStep {...baseStepProps} />;
        case 11: // Review
          return <FreelancerReviewStep {...freelancerStepProps} goToStep={goToStep} />;
        case 12: // Results
          return <FreelancerResultsStep formData={formData as FreelancerFormData} onStartOver={handleStartOver} />;
        default:
          return <EmploymentTypeStep {...baseStepProps} />;
      }
    } else if (isFreelancerFlow) {
      // Freelancer flow (12 steps)
      switch (currentStep) {
        case 0: // Employment
          return <EmploymentTypeStep {...baseStepProps} />;
        case 1: // Residency
          return <ResidencyStep {...freelancerStepProps} />;
        case 2: // Foreign Income
          return <ForeignIncomeStep {...freelancerStepProps} />;
        case 3: // Thai Income
          return <ThaiIncomeStep {...freelancerStepProps} />;
        case 4: // Expense Method
          return <ExpenseMethodStep {...freelancerStepProps} />;
        case 5: // Actual Expenses
          return <ActualExpensesStep {...freelancerStepProps} />;
        case 6: // Marital Status
          return <MaritalStatusStepAnnual {...baseStepProps} />;
        case 7: // Dependents
          return <DependentsStepAnnual {...baseStepProps} />;
        case 8: // Deductions
          return <DeductionsStepAnnual {...baseStepProps} />;
        case 9: // Withholding
          return <WithholdingStep {...baseStepProps} />;
        case 10: // Review
          return <FreelancerReviewStep {...freelancerStepProps} goToStep={goToStep} />;
        case 11: // Results
          return <FreelancerResultsStep formData={formData as FreelancerFormData} onStartOver={handleStartOver} />;
        default:
          return <EmploymentTypeStep {...baseStepProps} />;
      }
    } else {
      // Salaried flow (8 steps)
      switch (currentStep) {
        case 0:
          return <EmploymentTypeStep {...baseStepProps} />;
        case 1:
          return <AnnualIncomeStep {...baseStepProps} />;
        case 2:
          return <MaritalStatusStepAnnual {...baseStepProps} />;
        case 3:
          return <DependentsStepAnnual {...baseStepProps} />;
        case 4:
          return <DeductionsStepAnnual {...baseStepProps} />;
        case 5:
          return <WithholdingStep {...baseStepProps} />;
        case 6:
          return <ReviewStep {...baseStepProps} goToStep={goToStep} />;
        case 7:
          return <AnnualResultsStep formData={formData as TaxFormData} onStartOver={handleStartOver} />;
        default:
          return <EmploymentTypeStep {...baseStepProps} />;
      }
    }
  };

  // Determine step type for navigation
  const isFirstStep = currentStep === 0;
  const isResultsStep = currentStep === totalSteps - 1;
  const isReviewStep = currentStep === totalSteps - 2;
  const showNavigation = currentStep < totalSteps - 1;

  // Validate current step to enable/disable Next button
  const isStepValid = (dataToValidate: WizardFormData = formData): boolean => {
    // Helper for deduction validation
    const validateDeductions = () => {
      const deductionChecks = [
        { has: dataToValidate.hasLifeInsurance, amount: dataToValidate.lifeInsurance },
        { has: dataToValidate.hasHealthInsurance, amount: dataToValidate.healthInsurance },
        { has: dataToValidate.hasPensionFund, amount: dataToValidate.pensionFund },
        { has: dataToValidate.hasProvidentFund, amount: dataToValidate.providentFund },
        { has: dataToValidate.hasRMF, amount: dataToValidate.rmf },
        { has: dataToValidate.hasSSF, amount: dataToValidate.ssf },
        { has: dataToValidate.hasDonations, amount: dataToValidate.donations },
      ];
      return deductionChecks.every(d => !d.has || d.amount > 0);
    };

    // Helper for dependents validation
    const validateDependents = () => {
      const childrenValid = dataToValidate.children.length === 0 || dataToValidate.childrenEligibilityConfirmed;
      const parentsValid = dataToValidate.numberOfParents === 0 || dataToValidate.parentsEligibilityConfirmed;
      return childrenValid && parentsValid;
    };

    if (isCompanyOwnerFlow) {
      const coData = dataToValidate as CompanyOwnerFormData;
      // Company Owner flow validation (8 steps)
      switch (currentStep) {
        case 0: // Employment
          return dataToValidate.employmentType !== '';
        case 1: // Company Income
          return coData.companyInfo?.companyName?.trim().length > 0 &&
            coData.salaryFromCompany > 0;
        case 2: // Marital Status
          return dataToValidate.maritalStatus !== '';
        case 3: // Dependents
          return validateDependents();
        case 4: // Deductions
          return validateDeductions();
        case 5: // Withholding
          return true;
        case 6: // Review
          return true;
        default:
          return true;
      }
    } else if (isSoleProprietorFlow) {
      const spData = dataToValidate as SoleProprietorFormData;
      // Sole Proprietor flow validation (13 steps)
      switch (currentStep) {
        case 0: // Employment
          return dataToValidate.employmentType !== '';
        case 1: // Business Profile
          return spData.businessProfile?.businessName?.trim().length > 0 &&
            spData.businessProfile?.businessCategory !== undefined;
        case 2: // Residency
          return spData.daysInThailand > 0 && spData.daysInThailand <= 365;
        case 3: // Foreign Income
          return true;
        case 4: // Thai Income
          return spData.thaiIncomeEntries.length > 0 ||
            (spData.hasForeignIncome && spData.foreignIncomeEntries.length > 0);
        case 5: // Expense Method
          return spData.expenseMethod !== undefined;
        case 6: // Actual Expenses
          return true;
        case 7: // Marital Status
          return dataToValidate.maritalStatus !== '';
        case 8: // Dependents
          return validateDependents();
        case 9: // Deductions
          return validateDeductions();
        case 10: // Withholding
          return true;
        case 11: // Review
          return true;
        default:
          return true;
      }
    } else if (isFreelancerFlow) {
      const freelancerData = dataToValidate as FreelancerFormData;
      // Freelancer flow validation (12 steps)
      switch (currentStep) {
        case 0: // Employment
          return dataToValidate.employmentType !== '';
        case 1: // Residency
          return freelancerData.daysInThailand > 0 && freelancerData.daysInThailand <= 365;
        case 2: // Foreign Income
          return true;
        case 3: // Thai Income
          return freelancerData.thaiIncomeEntries.length > 0 ||
            (freelancerData.hasForeignIncome && freelancerData.foreignIncomeEntries.length > 0);
        case 4: // Expense Method
          return freelancerData.expenseMethod !== undefined;
        case 5: // Actual Expenses
          return true;
        case 6: // Marital Status
          return dataToValidate.maritalStatus !== '';
        case 7: // Dependents
          return validateDependents();
        case 8: // Deductions
          return validateDeductions();
        case 9: // Withholding
          return true;
        case 10: // Review
          return true;
        default:
          return true;
      }
    } else {
      // Salaried flow validation
      switch (currentStep) {
        case 0: // Employment
          return dataToValidate.employmentType !== '';
        case 1: // Income
          return (dataToValidate as TaxFormData).annualIncome > 0;
        case 2: // Marital Status
          return dataToValidate.maritalStatus !== '';
        case 3: // Dependents
          return validateDependents();
        case 4: // Deductions
          return validateDeductions();
        case 5: // Withholding
          return true;
        default:
          return true;
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-2xl w-full">
        {/* Header with Home button */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleGoHome}
            className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm"
            aria-label="Go to home page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Home
          </button>
          {!isResultsStep && (
            <button
              onClick={handleStartOver}
              className="text-red-500 hover:text-red-700 text-sm"
              aria-label="Start over"
            >
              Start Over
            </button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {totalSteps}: {stepLabels[currentStep]}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / totalSteps) * 100)}%
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              role="progressbar"
              aria-valuenow={currentStep + 1}
              aria-valuemin={1}
              aria-valuemax={totalSteps}
            />
          </div>
          {/* Step Dots - Sliding Window */}
          <div className="flex justify-center items-center gap-2 mt-3">
            {(() => {
              const windowSize = 2; // Show current ± 2 steps
              const showStart = currentStep > windowSize;
              const showEnd = currentStep < totalSteps - 1 - windowSize;

              // Calculate visible range
              let startIndex = Math.max(0, currentStep - windowSize);
              let endIndex = Math.min(totalSteps - 1, currentStep + windowSize);

              // Adjust range to always show at least 5 items when possible
              if (endIndex - startIndex < windowSize * 2 && totalSteps > windowSize * 2) {
                if (startIndex === 0) {
                  endIndex = Math.min(totalSteps - 1, windowSize * 2);
                } else if (endIndex === totalSteps - 1) {
                  startIndex = Math.max(0, totalSteps - 1 - windowSize * 2);
                }
              }

              const visibleSteps = stepLabels.slice(startIndex, endIndex + 1);

              return (
                <>
                  {/* First step + ellipsis if needed */}
                  {showStart && (
                    <>
                      <button
                        onClick={() => goToStep(0)}
                        className="flex flex-col items-center group cursor-pointer"
                        aria-label={`Go to Step 1: ${stepLabels[0]}`}
                      >
                        <div className="w-3 h-3 rounded-full bg-blue-500 group-hover:bg-blue-600 transition-all" />
                        <span className="text-xs mt-1 text-gray-400 hidden md:block">{stepLabels[0]}</span>
                      </button>
                      <span className="text-gray-400 text-sm px-1">...</span>
                    </>
                  )}

                  {/* Visible steps in window */}
                  {visibleSteps.map((label: string, i: number) => {
                    const index = startIndex + i;
                    return (
                      <button
                        key={`${label}-${index}`}
                        onClick={() => index < currentStep && goToStep(index)}
                        disabled={index >= currentStep}
                        className={`flex flex-col items-center group ${
                          index < currentStep ? 'cursor-pointer' : 'cursor-default'
                        }`}
                        aria-label={`${index < currentStep ? 'Go to ' : ''}Step ${index + 1}: ${label}`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full transition-all ${
                            index < currentStep
                              ? 'bg-blue-500 group-hover:bg-blue-600'
                              : index === currentStep
                              ? 'bg-blue-500 ring-2 ring-blue-200'
                              : 'bg-gray-300'
                          }`}
                        />
                        <span
                          className={`text-xs mt-1 hidden md:block whitespace-nowrap ${
                            index === currentStep ? 'text-blue-600 font-medium' : 'text-gray-400'
                          }`}
                        >
                          {label}
                        </span>
                      </button>
                    );
                  })}

                  {/* Ellipsis + last step if needed */}
                  {showEnd && (
                    <>
                      <span className="text-gray-400 text-sm px-1">...</span>
                      <button
                        onClick={() => {}}
                        disabled
                        className="flex flex-col items-center group cursor-default"
                        aria-label={`Step ${totalSteps}: ${stepLabels[totalSteps - 1]}`}
                      >
                        <div className="w-3 h-3 rounded-full bg-gray-300 transition-all" />
                        <span className="text-xs mt-1 text-gray-400 hidden md:block">{stepLabels[totalSteps - 1]}</span>
                      </button>
                    </>
                  )}
                </>
              );
            })()}
          </div>
        </div>

        {/* Resume indicator for returning users */}
        {currentStep > 0 && !isResultsStep && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <span className="text-sm text-blue-700">
              Your progress has been saved. You can continue where you left off.
            </span>
          </div>
        )}

        {/* Step Content */}
        <div className="min-h-[300px]">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        {showNavigation && !isFirstStep && (
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePreviousStep}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              aria-label="Go to previous step"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Previous
            </button>
            {!isReviewStep && (
              <button
                onClick={() => handleNextStep()}
                disabled={!isStepValid()}
                className={`px-6 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  isStepValid()
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                aria-label="Go to next step"
              >
                Next
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnualTaxWizard;
