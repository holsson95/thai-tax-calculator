// MonthlyWithholding.tsx
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { MONTHLY_WITHHOLDING_META, MONTHLY_WITHHOLDING_SCHEMA } from '../data/calculatorMeta';
import { MonthlyFormData, MonthlyIncomeEntry } from '../types/taxForm';
import EstimateTypeStep from './steps/EstimateTypeStep';
import IncomeTypeStep from './steps/IncomeTypeStep';
import MonthlyIncomeStep from './steps/MonthlyIncomeStep';
import VariableIncomeStep from './steps/VariableIncomeStep';
import MaritalStatusStep from './MaritalStatusStep';
import DependentsStepMonthly from './steps/DependentsStepMonthly';
import DeductionsStepMonthly from './steps/DeductionsStepMonthly';
import MonthlyResultsStep from './steps/MonthlyResultsStep';
import CalculatorFrame from './calculator/CalculatorFrame';
import { StepTrack, WizardNav } from './calculator/StepTrack';
import { MonthlyReference, MONTHLY_INTRO } from './calculator/reference';
import { RULES_TAX_YEAR } from '../config/taxRules';
import { PAGE_LAST_UPDATED } from '../config/contentDates';

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
    // Note: currentStep is kept in the dependency list even though the step
    // list itself doesn't branch on it — advanceStep/handleNextStep close
    // over currentStep, and each step element is created holding a reference
    // to whichever closure was current at the last recompute. Dropping
    // currentStep here would leave step components holding a stale
    // nextStep/prevStep closure after a step transition, breaking
    // navigation. showValidationErrors is included because DeductionsStepMonthly
    // and DependentsStepMonthly read it directly to decide whether to show
    // inline validation errors; without it, clicking Next on an invalid step
    // does not re-render those steps with the error now visible.
  }, [formData, currentStep, showValidationErrors]);

  const totalSteps = steps.length;
  const isResultStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;


  return (
    <>
      <Helmet>
        <title>{MONTHLY_WITHHOLDING_META.title}</title>
        <meta name="description" content={MONTHLY_WITHHOLDING_META.description} />
        <link rel="canonical" href={MONTHLY_WITHHOLDING_META.canonicalUrl} />
        <meta property="og:title" content={MONTHLY_WITHHOLDING_META.title} />
        <meta property="og:description" content={MONTHLY_WITHHOLDING_META.description} />
        <meta property="og:url" content={MONTHLY_WITHHOLDING_META.canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(MONTHLY_WITHHOLDING_SCHEMA)}</script>
      </Helmet>
      <CalculatorFrame
        title="Monthly Withholding Estimator"
        crumb="Monthly withholding"
        updated={PAGE_LAST_UPDATED.monthlyWithholding}
        intro={MONTHLY_INTRO}
        paper="pink"
        tab={`Monthly withholding · tax year ${RULES_TAX_YEAR}`}
        reference={<MonthlyReference />}
      >
        <StepTrack
          labels={steps.map(s => s.title)}
          current={currentStep}
          onGoTo={goToStep}
          onStartOver={isResultStep ? undefined : handleStartOver}
        >
          <p className="mt-2 text-xs text-ink-mute">
            This estimate is based on Thai tax rules for Fiscal Year {RULES_TAX_YEAR}.
          </p>
        </StepTrack>

        <div className="px-5 pb-7 pt-7 sm:px-8 sm:pb-8">
          <div className="min-h-[300px]">{steps[currentStep]?.component}</div>

          {!isResultStep && !isFirstStep && (
            <WizardNav onPrevious={handlePreviousStep} onNext={handleNextStep} nextDisabled={!isStepValid()} />
          )}
        </div>
      </CalculatorFrame>
    </>
  );
};

export default MonthlyWithholding;
