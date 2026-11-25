import { TaxFormData, TaxCalculationResult } from '../types/taxForm';
import { FreelancerFormData, FreelancerTaxResult } from '../types/freelancerForm';
import { SoleProprietorFormData } from '../types/soleProprietorForm';
import { CompanyOwnerFormData } from '../types/companyOwnerForm';
import { calculateAnnualTax, calculateCompanyOwnerTax, calculateFreelancerTax } from '../utils/taxCalculations';

export type PacketFormData = TaxFormData | FreelancerFormData | SoleProprietorFormData | CompanyOwnerFormData;

/**
 * Employment types whose wizard flow collects FreelancerFormData and shows
 * FreelancerResultsStep. Must match the routing in AnnualTaxWizard.tsx
 * (isFreelancerEmployment + isSoleProprietorEmployment).
 */
const FREELANCER_FLOW_TYPES = new Set(['freelancer', 'self-employed', 'retired', 'sole_proprietor', 'business']);

export function isFreelancerFlow(data: PacketFormData): data is FreelancerFormData {
  return FREELANCER_FLOW_TYPES.has(data.employmentType);
}

export interface PacketResult {
  isFreelancer: boolean;
  result: TaxCalculationResult | FreelancerTaxResult;
  breakdown?: TaxCalculationResult['breakdown'];
}

/**
 * Pick the same calculation engine the on-screen results step used, so the
 * PDF packet always shows the figures the user just saw.
 */
export function calculatePacketResult(formData: PacketFormData): PacketResult {
  if (isFreelancerFlow(formData)) {
    return { isFreelancer: true, result: calculateFreelancerTax(formData) };
  }
  if (formData.employmentType === 'company_owner') {
    const result = calculateCompanyOwnerTax(formData as CompanyOwnerFormData);
    return { isFreelancer: false, result, breakdown: result.breakdown };
  }
  const result = calculateAnnualTax(formData as TaxFormData);
  return { isFreelancer: false, result, breakdown: result.breakdown };
}
