import { describe, it, expect } from 'vitest';
import {
  FLAT_RATE_DEDUCTIONS,
  LIBERAL_PROFESSION_RATES,
  BUSINESS_FLAT_RATE_DEDUCTIONS,
} from '../taxConfig';

// Regression tests for tax-rule corrections made 2026-09-07 after sourcing
// against the Thai Revenue Department's "Guide to Personal Income Tax
// Return 2021 (PND90)" and independent secondary sources.
// See TAX_RULES.md and tax-data/2026/deductions.json for full sourcing detail.
describe('FLAT_RATE_DEDUCTIONS', () => {
  it('uses 60% for contractor income (40(7)), not the previously incorrect 40%', () => {
    expect(FLAT_RATE_DEDUCTIONS.contractor_40_7).toBe(0.60);
  });
});

describe('LIBERAL_PROFESSION_RATES', () => {
  it('does not classify entertainment, sports, or author royalties as Section 40(6) liberal profession income', () => {
    expect(LIBERAL_PROFESSION_RATES.entertainment).toBeUndefined();
    expect(LIBERAL_PROFESSION_RATES.sports).toBeUndefined();
    expect(LIBERAL_PROFESSION_RATES.author_royalties).toBeUndefined();
  });

  it('still classifies the six official Section 40(6) professions correctly', () => {
    expect(LIBERAL_PROFESSION_RATES.medical_practice).toBe(0.60);
    expect(LIBERAL_PROFESSION_RATES.legal).toBe(0.30);
    expect(LIBERAL_PROFESSION_RATES.engineering).toBe(0.30);
    expect(LIBERAL_PROFESSION_RATES.architecture).toBe(0.30);
    expect(LIBERAL_PROFESSION_RATES.accounting).toBe(0.30);
    expect(LIBERAL_PROFESSION_RATES.fine_arts).toBe(0.30);
  });
});

describe('BUSINESS_FLAT_RATE_DEDUCTIONS', () => {
  it('uses 60% for service, transportation, construction, and other business categories, not the previously incorrect 40%', () => {
    expect(BUSINESS_FLAT_RATE_DEDUCTIONS.service_business).toBe(0.60);
    expect(BUSINESS_FLAT_RATE_DEDUCTIONS.transportation).toBe(0.60);
    expect(BUSINESS_FLAT_RATE_DEDUCTIONS.construction).toBe(0.60);
    expect(BUSINESS_FLAT_RATE_DEDUCTIONS.other_business).toBe(0.60);
  });

  it('leaves the already-correct categories unchanged', () => {
    expect(BUSINESS_FLAT_RATE_DEDUCTIONS.retail_trade).toBe(0.60);
    expect(BUSINESS_FLAT_RATE_DEDUCTIONS.manufacturing).toBe(0.60);
    expect(BUSINESS_FLAT_RATE_DEDUCTIONS.restaurant_food).toBe(0.60);
    expect(BUSINESS_FLAT_RATE_DEDUCTIONS.agriculture).toBe(0.60);
    expect(BUSINESS_FLAT_RATE_DEDUCTIONS.professional_service).toBe(0.30);
    expect(BUSINESS_FLAT_RATE_DEDUCTIONS.rental_property).toBe(0.30);
  });
});
