import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ANNUAL_TAX_META, ANNUAL_TAX_SCHEMA } from '../data/calculatorMeta';
import { TaxFormData } from '../types/taxForm';
import { FreelancerFormData, createDefaultFreelancerFormData } from '../types/freelancerForm';
import { SoleProprietorFormData, createDefaultSoleProprietorFormData } from '../types/soleProprietorForm';
import { CompanyOwnerFormData, createDefaultCompanyOwnerFormData } from '../types/companyOwnerForm';
import { calculateCompanyOwnerTax } from '../utils/taxCalculations';
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
import CalculatorFrame from './calculator/CalculatorFrame';
import { StepTrack, WizardNav } from './calculator/StepTrack';
import { AnnualReference, ANNUAL_INTRO } from './calculator/reference';
import { RULES_TAX_YEAR } from '../config/taxRules';
import { PAGE_LAST_UPDATED } from '../config/contentDates';

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

// Freelancer flow (11 steps) - full freelancer journey
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
  'Review',          // 9
  'Results',         // 10
];

// Sole Proprietor flow (12 steps) - freelancer flow + business profile
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
  'Review',          // 10
  'Results',         // 11
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
  return employmentType === 'self-employed' || employmentType === 'freelancer' || employmentType === 'retired';
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

  // Move focus into the new step's content on step transitions (Next/Previous/
  // step-dot navigation), so keyboard and screen-reader users are announced
  // into the new step instead of staying on the now-stale Next/Previous
  // button position. Skipped on initial mount so the page doesn't steal focus
  // away from the browser default on first load.
  const stepContentRef = useRef<HTMLDivElement>(null);
  const isFirstRenderRef = useRef(true);
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    stepContentRef.current?.focus();
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
          return <AnnualResultsStep formData={formData as TaxFormData} result={calculateCompanyOwnerTax(formData as CompanyOwnerFormData)} onStartOver={handleStartOver} />;
        default:
          return <EmploymentTypeStep {...baseStepProps} />;
      }
    } else if (isSoleProprietorFlow) {
      // Sole Proprietor flow (12 steps) - freelancer flow + business profile
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
        case 10: // Review
          return <FreelancerReviewStep {...freelancerStepProps} goToStep={goToStep} />;
        case 11: // Results
          return <FreelancerResultsStep formData={formData as FreelancerFormData} onStartOver={handleStartOver} />;
        default:
          return <EmploymentTypeStep {...baseStepProps} />;
      }
    } else if (isFreelancerFlow) {
      // Freelancer flow (11 steps)
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
        case 9: // Review
          return <FreelancerReviewStep {...freelancerStepProps} goToStep={goToStep} />;
        case 10: // Results
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
      // Sole Proprietor flow validation (12 steps)
      switch (currentStep) {
        case 0: // Employment
          return dataToValidate.employmentType !== '';
        case 1: // Business Profile
          return spData.businessProfile?.businessName?.trim().length > 0 &&
            spData.businessProfile?.businessCategory !== undefined;
        case 2: // Residency
          return spData.daysInThailand > 0;
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
        case 10: // Review
          return true;
        default:
          return true;
      }
    } else if (isFreelancerFlow) {
      const freelancerData = dataToValidate as FreelancerFormData;
      // Freelancer flow validation (11 steps)
      switch (currentStep) {
        case 0: // Employment
          return dataToValidate.employmentType !== '';
        case 1: // Residency
          return freelancerData.daysInThailand > 0;
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
        case 9: // Review
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
    <>
      <Helmet>
        <title>{ANNUAL_TAX_META.title}</title>
        <meta name="description" content={ANNUAL_TAX_META.description} />
        <link rel="canonical" href={ANNUAL_TAX_META.canonicalUrl} />
        <meta property="og:title" content={ANNUAL_TAX_META.title} />
        <meta property="og:description" content={ANNUAL_TAX_META.description} />
        <meta property="og:url" content={ANNUAL_TAX_META.canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(ANNUAL_TAX_SCHEMA)}</script>
      </Helmet>
      <CalculatorFrame
        title="Annual Tax Calculator"
        crumb="Annual tax"
        updated={PAGE_LAST_UPDATED.annualTax}
        intro={ANNUAL_INTRO}
        paper="canary"
        tab={`Annual return · tax year ${RULES_TAX_YEAR}`}
        homeLink={
          <button type="button" onClick={handleGoHome} className="hover:text-white" aria-label="Go to home page">
            Home
          </button>
        }
        reference={<AnnualReference />}
      >
        <StepTrack
          labels={stepLabels}
          current={currentStep}
          onGoTo={goToStep}
          onStartOver={isResultsStep ? undefined : handleStartOver}
        >
          {currentStep > 0 && !isResultsStep && (
            <p className="mt-2 text-xs text-ink-mute">
              Your progress has been saved. You can continue where you left off.
            </p>
          )}
        </StepTrack>

        <div className="px-5 pb-7 pt-7 sm:px-8 sm:pb-8">
          <div className="min-h-[300px] outline-none" ref={stepContentRef} tabIndex={-1}>
            {renderStep()}
          </div>

          {showNavigation && !isFirstStep && (
            <WizardNav
              onPrevious={handlePreviousStep}
              onNext={isReviewStep ? undefined : () => handleNextStep()}
              nextDisabled={!isStepValid()}
            />
          )}
        </div>
      </CalculatorFrame>
    </>
  );
};

export default AnnualTaxWizard;
