import { describe, it, expect } from 'vitest';
import { calculatePacketResult, isFreelancerFlow } from '../packetResult';
import { calculateCompanyOwnerTax, calculateFreelancerTax } from '../../utils/taxCalculations';
import { createDefaultFreelancerFormData, FreelancerFormData } from '../../types/freelancerForm';
import { createDefaultCompanyOwnerFormData, createDefaultCompanyInfo, CompanyOwnerFormData } from '../../types/companyOwnerForm';
import { createDefaultSoleProprietorFormData } from '../../types/soleProprietorForm';

const allFinite = (o: Record<string, unknown>) =>
  Object.entries(o).filter(([, v]) => typeof v === 'number').every(([, v]) => Number.isFinite(v as number));

function retiree(): FreelancerFormData {
  return {
    ...createDefaultFreelancerFormData(),
    employmentType: 'retired',
    isThaiResident: true,
    daysInThailand: 300,
    maritalStatus: 'single',
    isAge65OrOlder: true,
    thaiIncomeEntries: [{ id: 'p', grossAmount: 600_000, incomeType: 'other', withholdingAmount: 0, monthReceived: 1, payerName: '', description: '' }],
  } as FreelancerFormData;
}

function owner(): CompanyOwnerFormData {
  return {
    ...createDefaultCompanyOwnerFormData(),
    companyInfo: createDefaultCompanyInfo(),
    maritalStatus: 'single',
    salaryFromCompany: 2_000_000,
    salaryWithholdingTax: 300_000,
  };
}

describe('calculatePacketResult — the PDF uses the same engine as the results screen', () => {
  // Regression: before 2026-11-25 retirees and company owners fell through to
  // calculateAnnualTax, which reads `annualIncome` (absent on their form data),
  // so their PDF packet printed NaN for every figure.

  it('retirees get the freelancer engine and finite figures', () => {
    const data = retiree();
    const { isFreelancer, result } = calculatePacketResult(data);
    expect(isFreelancer).toBe(true);
    expect(result).toEqual(calculateFreelancerTax(data));
    expect(allFinite(result as unknown as Record<string, unknown>)).toBe(true);
  });

  it('company owners get the company-owner engine and the figure shown on screen', () => {
    const data = owner();
    const { isFreelancer, result, breakdown } = calculatePacketResult(data);
    const onScreen = calculateCompanyOwnerTax(data);
    expect(isFreelancer).toBe(false);
    expect(result).toEqual(onScreen);
    expect(breakdown).toEqual(onScreen.breakdown);
    expect(allFinite(result as unknown as Record<string, unknown>)).toBe(true);
  });

  it.each(['freelancer', 'self-employed', 'retired', 'sole_proprietor', 'business'] as const)(
    '%s is routed to the freelancer engine', (employmentType) => {
      expect(isFreelancerFlow({ ...createDefaultFreelancerFormData(), employmentType } as FreelancerFormData)).toBe(true);
    }
  );

  it('sole proprietor default form data produces finite figures', () => {
    const { result } = calculatePacketResult(createDefaultSoleProprietorFormData());
    expect(allFinite(result as unknown as Record<string, unknown>)).toBe(true);
  });

  it('salaried users still get the annual engine with a breakdown', () => {
    const { isFreelancer, result, breakdown } = calculatePacketResult({
      employmentType: 'salaried', annualIncome: 1_000_000, includeSocialSecurity: false, socialSecurityContribution: 0,
      maritalStatus: 'single', spouseHasNoIncome: false, isAge65OrOlder: false, children: [],
      childrenEligibilityConfirmed: false, parentsEligibilityConfirmed: false, numberOfParents: 0,
      hasLifeInsurance: false, lifeInsurance: 0, hasHealthInsurance: false, healthInsurance: 0,
      hasPensionFund: false, pensionFund: 0, hasProvidentFund: false, providentFund: 0,
      hasRMF: false, rmf: 0, hasSSF: false, ssf: 0, hasDonations: false, donations: 0, taxWithheld: 0,
    });
    expect(isFreelancer).toBe(false);
    expect(breakdown?.standardDeduction).toBe(100_000);
    // 1,000,000 − 100,000 − 60,000 = 840,000 taxable → 65,000 + 90,000 × 20% = 83,000
    expect((result as { taxOwed: number }).taxOwed).toBeCloseTo(83_000, 6);
  });
});
