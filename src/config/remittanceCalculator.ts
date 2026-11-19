/**
 * Settings for the foreign income / remittance calculator that are NOT tax law.
 * Tax rules (residency days, 2024 start date, brackets, allowances, the
 * proposed grace period's legal status) come from src/config/taxRules.ts.
 */
export const REMITTANCE_CALCULATOR_CONFIG = {
  /**
   * Whether Thai flat-rate expense deductions are applied to remitted foreign
   * employment/freelance income. The RD Q&A on Por. 161/162 does not address
   * this, and the existing annual calculator applies none, so the default is
   * false (higher, more cautious estimate). Shown to users as an assumption.
   */
  applyThaiExpenseDeductionsToForeignIncome: false,

  /** Total remitted in the year above which the "large remittance" flag fires. Business threshold, not tax law. */
  largeRemittanceFlagThb: 1_000_000,

  /** Years offered in the "year the money was earned" picker, besides "before 2024". */
  earliestIncomeYearOffered: 2024,
} as const;
