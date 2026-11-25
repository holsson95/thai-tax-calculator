import { MonthlyFormData, TaxFormData } from '../types/taxForm';

/**
 * Map the monthly wizard's answers onto the annual engine's input, so both
 * calculators share one implementation of every allowance, cap and rule.
 * The basic estimate only asks for income and social security; the
 * family/deduction answers are used only for a detailed estimate.
 *
 * Before 2026-11-25 this component had its own copy of the calculation, which
 * ignored the 65+ exemption, capped donations at 10% of GROSS income, did not
 * apply the combined retirement-fund cap, and gave the child bonus by entry order.
 */
export function monthlyToAnnualInput(formData: MonthlyFormData, annualIncome: number): TaxFormData {
  const detailed = formData.estimateType === 'detailed';
  const ifDetailed = (ticked: boolean | undefined) => detailed && !!ticked;
  return {
    employmentType: 'salaried',
    annualIncome,
    includeSocialSecurity: !!formData.includeSocialSecurity,
    socialSecurityContribution: formData.socialSecurityContribution || 0,
    maritalStatus: detailed ? formData.maritalStatus : '',
    spouseHasNoIncome: ifDetailed(formData.spouseHasNoIncome),
    isAge65OrOlder: ifDetailed(formData.isAge65OrOlder),
    children: detailed ? formData.children || [] : [],
    childrenEligibilityConfirmed: ifDetailed(formData.childrenEligibilityConfirmed),
    numberOfParents: detailed ? formData.numberOfParents || 0 : 0,
    parentsEligibilityConfirmed: ifDetailed(formData.parentsEligibilityConfirmed),
    hasLifeInsurance: ifDetailed(formData.hasLifeInsurance),
    lifeInsurance: formData.lifeInsurance || 0,
    hasHealthInsurance: ifDetailed(formData.hasHealthInsurance),
    healthInsurance: formData.healthInsurance || 0,
    hasPensionFund: ifDetailed(formData.hasPensionFund),
    pensionFund: formData.pensionFund || 0,
    hasProvidentFund: ifDetailed(formData.hasProvidentFund),
    providentFund: formData.providentFund || 0,
    hasRMF: ifDetailed(formData.hasRMF),
    rmf: formData.rmf || 0,
    hasSSF: ifDetailed(formData.hasSSF),
    ssf: formData.ssf || 0,
    hasDonations: ifDetailed(formData.hasDonations),
    donations: formData.donations || 0,
    taxWithheld: 0,
  };
}
