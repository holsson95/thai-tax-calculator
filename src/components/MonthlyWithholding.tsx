// MonthlyWithholding.tsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MonthlyFormData, MonthlyIncomeEntry } from '../types/taxForm';
import EstimateTypeStep from './steps/EstimateTypeStep';
import IncomeTypeStep from './steps/IncomeTypeStep';
import MonthlyIncomeStep from './steps/MonthlyIncomeStep';
import VariableIncomeStep from './steps/VariableIncomeStep';
import MaritalStatusStep from './MaritalStatusStep';
import DependentsStepMonthly from './steps/DependentsStepMonthly';
import DeductionsStepMonthly from './steps/DeductionsStepMonthly';
import MonthlyResultsStep from './steps/MonthlyResultsStep';

interface Step {
  id: string;
  title: string;
  component: React.ReactNode;
}

const createEmptyMonthEntry = (): MonthlyIncomeEntry => ({
  salary: 0,
  bonus: 0,
  housingAllowance: 0,
  otherIncome: 0,
});

function getInitialFormData(): MonthlyFormData {
  return {
    estimateType: '',
    incomeType: '',
    monthlySalary: 0,
    annualBonus: 0,
    annualOtherIncome: 0,
    variableIncome: Array(12).fill(null).map(() => createEmptyMonthEntry()),
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
  };
}

const MonthlyWithholding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<MonthlyFormData>(getInitialFormData);
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // Auto-advance function for card-selection steps (no validation needed)
  const advanceStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Validated next step for form input steps
  const handleNextStep = () => {
    if (isStepValid()) {
      setShowValidationErrors(false);
      setCurrentStep(currentStep + 1);
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

  // Validate current step to enable/disable Next button
  const isStepValid = (): boolean => {
    const stepId = steps[currentStep]?.id;
    switch (stepId) {
      case 'estimate-type':
        return formData.estimateType !== '';
      case 'income-type':
        return formData.incomeType !== '';
      case 'monthly-income':
        return formData.monthlySalary > 0;
      case 'variable-income':
        if (formData.variableIncome?.length === 12) {
          const total = formData.variableIncome.reduce((sum, entry) =>
            sum + entry.salary + entry.bonus + entry.housingAllowance + entry.otherIncome, 0);
          return total > 0;
        }
        return false;
      case 'marital-status':
        return formData.maritalStatus !== '';
      case 'dependents':
        const childrenValid = !formData.childrenEligibilityConfirmed || formData.children.length > 0;
        const parentsValid = !formData.parentsEligibilityConfirmed || formData.numberOfParents > 0;
        return childrenValid && parentsValid;
      case 'deductions':
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
      default:
        return true;
    }
  };

  const handleStartOver = () => {
    setFormData(getInitialFormData());
    setCurrentStep(0);
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  // Build steps dynamically based on estimate type and income type selection
  const steps: Step[] = useMemo(() => {
    const stepList: Step[] = [];

    // Step 1: Always show estimate type selection (card selection, auto-advances)
    stepList.push({
      id: 'estimate-type',
      title: 'Estimate Type',
      component: <EstimateTypeStep formData={formData} setFormData={setFormData} nextStep={advanceStep} />,
    });

    // Step 2: Income type selection (card selection, auto-advances)
    stepList.push({
      id: 'income-type',
      title: 'Income Type',
      component: <IncomeTypeStep formData={formData} setFormData={setFormData} nextStep={advanceStep} />,
    });

    // Step 3: Income entry (depends on income type)
    if (formData.incomeType === 'variable') {
      stepList.push({
        id: 'variable-income',
        title: 'Monthly Income',
        component: <VariableIncomeStep formData={formData} setFormData={setFormData} nextStep={handleNextStep} showValidationErrors={showValidationErrors} />,
      });
    } else {
      stepList.push({
        id: 'monthly-income',
        title: 'Assessable Income',
        component: <MonthlyIncomeStep formData={formData} setFormData={setFormData} nextStep={handleNextStep} showValidationErrors={showValidationErrors} />,
      });
    }

    // For detailed estimate, add additional steps
    if (formData.estimateType === 'detailed') {
      // Marital Status (card selection for single, auto-advances)
      stepList.push({
        id: 'marital-status',
        title: 'Marital Status',
        component: <MaritalStatusStep formData={formData} setFormData={setFormData} nextStep={advanceStep} showValidationErrors={showValidationErrors} />,
      });

      // Dependents & Allowances
      stepList.push({
        id: 'dependents',
        title: 'Dependents',
        component: <DependentsStepMonthly formData={formData} setFormData={setFormData} nextStep={handleNextStep} showValidationErrors={showValidationErrors} />,
      });

      // Deductions
      stepList.push({
        id: 'deductions',
        title: 'Deductions',
        component: <DeductionsStepMonthly formData={formData} setFormData={setFormData} nextStep={handleNextStep} showValidationErrors={showValidationErrors} />,
      });
    }

    // Results step (always last)
    stepList.push({
      id: 'results',
      title: 'Results',
      component: (
        <MonthlyResultsStep
          formData={formData}
          setFormData={setFormData}
          onStartOver={handleStartOver}
        />
      ),
    });

    return stepList;
  }, [formData, currentStep]);

  const totalSteps = steps.length;
  const isResultStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  // Progress percentage
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-2xl w-full">
        {/* Header with Home button */}
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm"
            aria-label="Go to home page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Home
          </Link>
          {!isResultStep && (
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
              Step {currentStep + 1} of {totalSteps}: {steps[currentStep]?.title}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progressPercent)}%
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={currentStep + 1}
              aria-valuemin={1}
              aria-valuemax={totalSteps}
            />
          </div>
          {/* Step Dots */}
          <div className="flex justify-between mt-3">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => index < currentStep && goToStep(index)}
                disabled={index >= currentStep}
                className={`flex flex-col items-center group ${
                  index < currentStep ? 'cursor-pointer' : 'cursor-default'
                }`}
                aria-label={`${index < currentStep ? 'Go to ' : ''}Step ${index + 1}: ${step.title}`}
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
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Fiscal Year Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-blue-700">
            This estimate is based on Thai tax rules for Fiscal Year 2026.
          </p>
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">
          {steps[currentStep]?.component}
        </div>

        {/* Navigation Buttons */}
        {!isResultStep && !isFirstStep && (
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
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyWithholding;
