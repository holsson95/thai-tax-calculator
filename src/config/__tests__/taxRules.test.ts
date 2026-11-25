import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';
import * as taxForm from '../../types/taxForm';
import * as taxConfig from '../../config/taxConfig';
import { INCOME_TYPE_INFO } from '../../data/incomeTypes';
import { TAX_RULES, BRACKET_RULES, RULES_TAX_YEAR } from '../taxRules';

/**
 * Values of every derived tax constant captured on 2026-11-19, BEFORE they were
 * re-pointed at src/config/taxRules.ts. The consolidation must not change a
 * single number. If you intentionally change a tax value, update taxRules.ts,
 * tax-data/, AND this snapshot in the same reviewed commit.
 */
const PINNED = {
  "TAX_BRACKETS": [
    {
      "upTo": 150000,
      "rate": 0,
      "label": "0-150k"
    },
    {
      "upTo": 300000,
      "rate": 0.05,
      "label": "150k-300k"
    },
    {
      "upTo": 500000,
      "rate": 0.1,
      "label": "300k-500k"
    },
    {
      "upTo": 750000,
      "rate": 0.15,
      "label": "500k-750k"
    },
    {
      "upTo": 1000000,
      "rate": 0.2,
      "label": "750k-1M"
    },
    {
      "upTo": 2000000,
      "rate": 0.25,
      "label": "1M-2M"
    },
    {
      "upTo": 5000000,
      "rate": 0.3,
      "label": "2M-5M"
    },
    {
      "upTo": Infinity,
      "rate": 0.35,
      "label": "5M+"
    }
  ],
  "TAX_CONSTANTS": {
    "STANDARD_DEDUCTION_RATE": 0.5,
    "MAX_STANDARD_DEDUCTION": 100000,
    "MAX_SOCIAL_SECURITY": 10500,
    "PERSONAL_ALLOWANCE": 60000,
    "SPOUSE_ALLOWANCE": 60000,
    "SENIOR_ALLOWANCE": 190000,
    "CHILD_ALLOWANCE_BASE": 30000,
    "CHILD_ALLOWANCE_BONUS": 30000,
    "PARENT_ALLOWANCE": 30000,
    "MAX_PARENTS": 4,
    "MAX_LIFE_INSURANCE": 100000,
    "MAX_HEALTH_INSURANCE": 25000,
    "MAX_PENSION_FUND": 500000,
    "MAX_PROVIDENT_FUND": 500000,
    "MAX_RMF": 500000,
    "MAX_SSF": 200000,
    "MAX_DONATION_PERCENT": 0.1,
    "CHILD_BONUS_BIRTH_YEAR": 2018
  },
  "MONTHLY_TAX_CONSTANTS": {
    "STANDARD_DEDUCTION_RATE": 0.5,
    "MAX_STANDARD_DEDUCTION": 100000,
    "MAX_SOCIAL_SECURITY": 10500,
    "PERSONAL_ALLOWANCE": 60000,
    "SPOUSE_ALLOWANCE": 60000,
    "SENIOR_ALLOWANCE": 190000,
    "CHILD_ALLOWANCE_BASE": 30000,
    "CHILD_ALLOWANCE_BONUS": 30000,
    "CHILD_BONUS_BIRTH_YEAR": 2018,
    "PARENT_ALLOWANCE": 30000,
    "MAX_PARENTS": 4,
    "MAX_LIFE_INSURANCE": 100000,
    "MAX_HEALTH_INSURANCE": 25000,
    "MAX_PENSION_FUND": 500000,
    "MAX_PROVIDENT_FUND": 500000,
    "MAX_RMF": 500000,
    "MAX_SSF": 200000,
    "MAX_DONATION_PERCENT": 0.1
  },
  "FLAT_RATE_DEDUCTIONS": {
    "salary_40_1": 0.5,
    "liberal_profession_40_6": 0.3,
    "contractor_40_7": 0.6,
    "business_sales_40_8": 0.6,
    "rental_40_5": 0.3,
    "dividend": 0,
    "other": 0
  },
  "LIBERAL_PROFESSION_RATES": {
    "medical_practice": 0.6,
    "legal": 0.3,
    "engineering": 0.3,
    "architecture": 0.3,
    "accounting": 0.3,
    "fine_arts": 0.3,
    "consulting": 0.3,
    "other_liberal": 0.3
  },
  "TAX_THRESHOLDS": {
    "VAT_REGISTRATION": 1800000,
    "PND94_SINGLE": 60000,
    "PND94_MARRIED_SPOUSE_NO_INCOME": 120000,
    "THAI_RESIDENCY_DAYS": 180,
    "FOREIGN_INCOME_TAX_YEAR_START": "2024-01-01"
  },
  "PND94_QUALIFYING_INCOME_TYPES": [
    "rental_40_5",
    "liberal_profession_40_6",
    "contractor_40_7",
    "business_sales_40_8"
  ],
  "VAT_CONFIG": {
    "STANDARD_RATE": 0.07,
    "REGISTRATION_DEADLINE_DAYS": 30
  },
  "TAX_YEAR_CONFIG": {
    "CURRENT_TAX_YEAR": 2026,
    "TAX_YEAR_START": "2026-01-01",
    "TAX_YEAR_END": "2026-12-31",
    "PND94_DUE_DATE": "2026-09-30",
    "PND90_91_DUE_DATE": "2027-03-31"
  },
  "DEDUCTION_CAPS": {
    "SALARY_EXPENSE_CAP": 100000,
    "COMBINED_RETIREMENT_CAP": 500000,
    "MAX_LIFE_INSURANCE": 100000,
    "MAX_HEALTH_INSURANCE": 25000,
    "MAX_PENSION_FUND": 500000,
    "MAX_PROVIDENT_FUND": 500000,
    "MAX_RMF": 500000,
    "MAX_SSF": 200000
  },
  "BUSINESS_FLAT_RATE_DEDUCTIONS": {
    "retail_trade": 0.6,
    "manufacturing": 0.6,
    "service_business": 0.6,
    "restaurant_food": 0.6,
    "transportation": 0.6,
    "construction": 0.6,
    "professional_service": 0.3,
    "rental_property": 0.3,
    "agriculture": 0.6,
    "other_business": 0.6
  },
  "INCOME_TYPE_INFO_RATES": {
    "salary_40_1": {
      "flatRateCap": 100000,
      "flatRate": 0.5
    },
    "liberal_profession_40_6": {
      "withholdingRate": 0.03,
      "flatRate": 0.3
    },
    "contractor_40_7": {
      "withholdingRate": 0.03,
      "flatRate": 0.6
    },
    "business_sales_40_8": {
      "withholdingRate": 0.03,
      "flatRate": 0.6
    },
    "rental_40_5": {
      "withholdingRate": 0.05,
      "flatRate": 0.3
    },
    "dividend": {
      "withholdingRate": 0.1,
      "flatRate": 0
    },
    "other": {
      "flatRate": 0
    }
  }
};

describe('consolidated tax rules: values unchanged by the refactor', () => {
  it('TAX_BRACKETS', () => expect(taxForm.TAX_BRACKETS).toEqual(PINNED.TAX_BRACKETS));
  it('TAX_CONSTANTS', () => expect(taxForm.TAX_CONSTANTS).toEqual(PINNED.TAX_CONSTANTS));
  it('MONTHLY_TAX_CONSTANTS', () => expect(taxForm.MONTHLY_TAX_CONSTANTS).toEqual(PINNED.MONTHLY_TAX_CONSTANTS));
  it('FLAT_RATE_DEDUCTIONS', () => expect(taxConfig.FLAT_RATE_DEDUCTIONS).toEqual(PINNED.FLAT_RATE_DEDUCTIONS));
  it('LIBERAL_PROFESSION_RATES', () => expect(taxConfig.LIBERAL_PROFESSION_RATES).toEqual(PINNED.LIBERAL_PROFESSION_RATES));
  it('TAX_THRESHOLDS', () => expect(taxConfig.TAX_THRESHOLDS).toEqual(PINNED.TAX_THRESHOLDS));
  it('PND94_QUALIFYING_INCOME_TYPES', () =>
    expect(taxConfig.PND94_QUALIFYING_INCOME_TYPES).toEqual(PINNED.PND94_QUALIFYING_INCOME_TYPES));
  it('VAT_CONFIG', () => expect(taxConfig.VAT_CONFIG).toEqual(PINNED.VAT_CONFIG));
  it('TAX_YEAR_CONFIG', () => expect(taxConfig.TAX_YEAR_CONFIG).toEqual(PINNED.TAX_YEAR_CONFIG));
  it('DEDUCTION_CAPS', () => expect(taxConfig.DEDUCTION_CAPS).toEqual(PINNED.DEDUCTION_CAPS));
  it('BUSINESS_FLAT_RATE_DEDUCTIONS', () =>
    expect(taxConfig.BUSINESS_FLAT_RATE_DEDUCTIONS).toEqual(PINNED.BUSINESS_FLAT_RATE_DEDUCTIONS));
  it('INCOME_TYPE_INFO rates', () => {
    const pinnedRates = PINNED.INCOME_TYPE_INFO_RATES as Record<
      string,
      { withholdingRate?: number; flatRateCap?: number; flatRate?: number }
    >;
    for (const [type, info] of Object.entries(INCOME_TYPE_INFO)) {
      const pinned = pinnedRates[type];
      expect(info.withholdingRate, type).toEqual(pinned.withholdingRate);
      expect(info.flatRateCap, type).toEqual(pinned.flatRateCap);
      expect(info.flatRate, type).toEqual(pinned.flatRate);
    }
  });
});

type RegistryRule = { id: string; value: unknown };
const registry = new Map<string, unknown>();
const registryDir = resolve(__dirname, `../../../tax-data/${RULES_TAX_YEAR}`);
for (const file of readdirSync(registryDir).filter((f) => f.endsWith('.json'))) {
  const data = JSON.parse(readFileSync(resolve(registryDir, file), 'utf-8')) as { rules: RegistryRule[] };
  for (const rule of data.rules) registry.set(rule.id, rule.value);
}

describe('TAX_RULES: provenance and agreement with the tax-data registry', () => {
  for (const [key, rule] of Object.entries(TAX_RULES)) {
    it(`${key} has a source URL, label and ISO last-verified date`, () => {
      expect(rule.source.url).toMatch(/^https:\/\//);
      expect(rule.source.label.length).toBeGreaterThan(3);
      expect(rule.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(registry.has(rule.id), `registry id ${rule.id}`).toBe(true);
    });
  }

  it('bracket values match the registry', () => {
    BRACKET_RULES.forEach((rule) => {
      const reg = registry.get(rule.id) as { upTo: number | null; rate: number };
      expect(rule.value.rate).toBe(reg.rate);
      expect(rule.value.upTo).toBe(reg.upTo ?? Infinity);
    });
  });

  it('scalar and list values match the registry', () => {
    const special = new Set([
      'child-allowance-bonus',
      'liberal-profession-subrates',
      'exempt-family-support-and-inheritance',
      'proposed-remittance-grace-period',
    ]);
    for (const rule of Object.values(TAX_RULES)) {
      if (rule.id.startsWith('bracket-') || special.has(rule.id)) continue;
      expect(rule.value, rule.id).toEqual(registry.get(rule.id));
    }
    expect(TAX_RULES.childAllowanceBonus.value).toBe(registry.get('child-allowance-bonus'));
    expect(TAX_RULES.familySupportExemptionCap.value).toBe(
      (registry.get('exempt-family-support-and-inheritance') as { family_support_cap_thb_per_year: number })
        .family_support_cap_thb_per_year
    );
    expect(TAX_RULES.proposedRemittanceGracePeriod.value).toBe(
      (registry.get('proposed-remittance-grace-period') as { is_law: boolean }).is_law
    );
  });

  it('the proposed remittance grace period is not treated as law', () => {
    expect(TAX_RULES.proposedRemittanceGracePeriod.value).toBe(false);
  });
});

describe('other constants re-pointed at TAX_RULES keep their values', () => {
  it('LTR foreign-income-exempt visa list and highly-skilled flat rate', async () => {
    const { hasLTRForeignIncomeExemption, hasLTRFlatRateBenefit } = await import('../../utils/foreignIncomeCalculations');
    for (const v of ['ltr_wealthy_global', 'ltr_wealthy_pensioner', 'ltr_work_from_thailand'] as const) {
      expect(hasLTRForeignIncomeExemption(v), v).toBe(true);
    }
    for (const v of ['regular', 'ltr_highly_skilled', 'thailand_privilege', 'other'] as const) {
      expect(hasLTRForeignIncomeExemption(v), v).toBe(false);
    }
    expect(hasLTRFlatRateBenefit('ltr_highly_skilled')).toBe(true);
    expect(TAX_RULES.ltrHighlySkilledFlatRate.value).toBe(0.17);
  });

  it('estimateTaxBracketRate gives the same rates as the old hand-typed ladder', async () => {
    const { estimateTaxBracketRate } = await import('../../utils/expenseCalculations');
    const oldLadder = (x: number) =>
      x <= 150000 ? 0 : x <= 300000 ? 0.05 : x <= 500000 ? 0.1 : x <= 750000 ? 0.15
        : x <= 1000000 ? 0.2 : x <= 2000000 ? 0.25 : x <= 5000000 ? 0.3 : 0.35;
    const probes = [-1, 0, 1, 150000, 150001, 300000, 300001, 500000, 500001, 750000, 750001,
      1000000, 1000001, 2000000, 2000001, 5000000, 5000001, 1e9];
    for (const x of probes) expect(estimateTaxBracketRate(x), String(x)).toBe(oldLadder(x));
  });

  it('PND94 half-year personal allowance is half the annual 60,000', async () => {
    const { calculatePND94Estimate } = await import('../../utils/obligationChecks');
    const { createDefaultFreelancerFormData } = await import('../../types/freelancerForm');
    const e = calculatePND94Estimate({ ...createDefaultFreelancerFormData(), maritalStatus: 'single' });
    expect(e.allowances).toBe(TAX_RULES.personalAllowance.value * TAX_RULES.pnd94HalfYearAllowanceFraction.value);
    expect(e.allowances).toBe(30000);
  });
});
