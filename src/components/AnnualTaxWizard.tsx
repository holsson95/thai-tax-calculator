import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaxFormData } from '../types/taxForm';
import EmploymentTypeStep from './steps/EmploymentTypeStep';
import AnnualIncomeStep from './steps/AnnualIncomeStep';
import MaritalStatusStepAnnual from './steps/MaritalStatusStepAnnual';
import DependentsStepAnnual from './steps/DependentsStepAnnual';
import DeductionsStepAnnual from './steps/DeductionsStepAnnual';
import WithholdingStep from './steps/WithholdingStep';
import ReviewStep from './steps/ReviewStep';
import AnnualResultsStep from './steps/AnnualResultsStep';

const STORAGE_KEY = 'thai_tax_annual_wizard_data';
const STORAGE_STEP_KEY = 'thai_tax_annual_wizard_step';

const STEP_LABELS = [
  'Employment',
  'Income',
  'Marital Status',
  'Dependents',
  'Deductions',
  'Withholding',
  'Review',
  'Results',
];

const TOTAL_STEPS = STEP_LABELS.length;

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

  const [formData, setFormData] = useState<TaxFormData>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        // Merge with defaults to handle any missing fields from older saved data
        return { ...getInitialFormData(), ...parsedData };
      } catch (error) {
        console.error('Failed to parse saved form data:', error);
        return getInitialFormData();
      }
    }
    return getInitialFormData();
  });

  // Auto-save to sessionStorage whenever formData changes
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  // Auto-save current step
  useEffect(() => {
    sessionStorage.setItem(STORAGE_STEP_KEY, currentStep.toString());
  }, [currentStep]);

  // Navigation handlers
  const handleNextStep = () => {
    if (isStepValid()) {
      setShowValidationErrors(false);
      if (currentStep < TOTAL_STEPS - 1) {
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
    if (step >= 0 && step < TOTAL_STEPS) {
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

  // Render current step component
  const renderStep = () => {
    const stepProps = {
      formData,
      setFormData,
      nextStep: handleNextStep,
      showValidationErrors,
    };

    switch (currentStep) {
      case 0:
        return <EmploymentTypeStep {...stepProps} />;
      case 1:
        return <AnnualIncomeStep {...stepProps} />;
      case 2:
        return <MaritalStatusStepAnnual {...stepProps} />;
      case 3:
        return <DependentsStepAnnual {...stepProps} />;
      case 4:
        return <DeductionsStepAnnual {...stepProps} />;
      case 5:
        return <WithholdingStep {...stepProps} />;
      case 6:
        return <ReviewStep {...stepProps} goToStep={goToStep} />;
      case 7:
        return <AnnualResultsStep formData={formData} onStartOver={handleStartOver} />;
      default:
        return <EmploymentTypeStep {...stepProps} />;
    }
  };

  // Check if navigation buttons should be shown (not on results step)
  const showNavigation = currentStep < TOTAL_STEPS - 1;
  const isFirstStep = currentStep === 0;
  const isReviewStep = currentStep === 6;
  const isResultsStep = currentStep === 7;

  // Validate current step to enable/disable Next button
  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 0: // Employment - must select a type
        return formData.employmentType !== '';
      case 1: // Income - must enter positive income
        return formData.annualIncome > 0;
      case 2: // Marital Status - must select status
        return formData.maritalStatus !== '';
      case 3: // Dependents - if checkbox checked, must add at least one
        const childrenValid = !formData.childrenEligibilityConfirmed || formData.children.length > 0;
        const parentsValid = !formData.parentsEligibilityConfirmed || formData.numberOfParents > 0;
        return childrenValid && parentsValid;
      case 4: // Deductions - if checkbox checked, must enter amount > 0
        const deductionChecks = [
          { has: formData.hasLifeInsurance, amount: formData.lifeInsurance },
          { has: formData.hasHealthInsurance, amount: formData.healthInsurance },
          { has: formData.hasPensionFund, amount: formData.pensionFund },
          { has: formData.hasProvidentFund, amount: formData.providentFund },
          { has: formData.hasRMF, amount: formData.rmf },
          { has: formData.hasSSF, amount: formData.ssf },
          { has: formData.hasDonations, amount: formData.donations },
        ];
        return deductionChecks.every(d => !d.has || d.amount > 0);
      case 5: // Withholding - 0 is valid
        return true;
      default:
        return true;
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
              Step {currentStep + 1} of {TOTAL_STEPS}: {STEP_LABELS[currentStep]}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
              role="progressbar"
              aria-valuenow={currentStep + 1}
              aria-valuemin={1}
              aria-valuemax={TOTAL_STEPS}
            />
          </div>
          {/* Step Dots */}
          <div className="flex justify-between mt-3">
            {STEP_LABELS.map((label, index) => (
              <button
                key={label}
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
                  className={`text-xs mt-1 hidden md:block ${
                    index === currentStep ? 'text-blue-600 font-medium' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </button>
            ))}
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
                onClick={handleNextStep}
                className="px-6 py-2 rounded-lg transition-colors flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600"
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