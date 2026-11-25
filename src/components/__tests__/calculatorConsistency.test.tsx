/**
 * The Quick calculator (homepage) and the Monthly Withholding results step each
 * compute tax inside the component rather than calling calculateAnnualTax().
 * These tests check that, for the same person, they agree with the annual
 * engine, and probe their input edge cases.
 *
 * The "Regressions fixed 2026-11-25" block pins monthly-calculator bugs found
 * in the 2026-11-25 review; the calculator now delegates to calculateAnnualTax().
 */
import { describe, it, expect, vi } from 'vitest';
import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactElement } from 'react';
import QuickTaxCalculator, { QuickEstimate } from '../QuickTaxCalculator';
import MonthlyResultsStep from '../steps/MonthlyResultsStep';
import DependentsStepAnnual from '../steps/DependentsStepAnnual';
import ReviewStep from '../steps/ReviewStep';
import IncomeEntryCard from '../common/IncomeEntryCard';
import ForeignIncomeStep from '../steps/ForeignIncomeStep';
import { createDefaultFreelancerFormData } from '../../types/freelancerForm';
import { createDefaultCompanyOwnerFormData, createDefaultCompanyInfo } from '../../types/companyOwnerForm';
import { calculateAnnualTax } from '../../utils/taxCalculations';
import { MonthlyFormData, MonthlyIncomeEntry, TaxFormData, TAX_CONSTANTS } from '../../types/taxForm';

const render = (ui: ReactElement) => rtlRender(ui, { wrapper: MemoryRouter });

function salaried(overrides: Partial<TaxFormData> = {}): TaxFormData {
  return {
    employmentType: 'salaried', annualIncome: 0, includeSocialSecurity: false, socialSecurityContribution: 0,
    maritalStatus: 'single', spouseHasNoIncome: false, isAge65OrOlder: false, children: [],
    childrenEligibilityConfirmed: false, parentsEligibilityConfirmed: false, numberOfParents: 0,
    hasLifeInsurance: false, lifeInsurance: 0, hasHealthInsurance: false, healthInsurance: 0,
    hasPensionFund: false, pensionFund: 0, hasProvidentFund: false, providentFund: 0,
    hasRMF: false, rmf: 0, hasSSF: false, ssf: 0, hasDonations: false, donations: 0, taxWithheld: 0,
    ...overrides,
  };
}

// ─── Quick calculator ────────────────────────────────────────────────────────

function renderQuick() {
  const onResult = vi.fn<(e: QuickEstimate | null) => void>();
  render(<QuickTaxCalculator onResult={onResult} />);
  const input = screen.getByLabelText(/salary, in baht/i);
  const last = () => onResult.mock.calls[onResult.mock.calls.length - 1]?.[0] ?? null;
  return { input, last };
}

describe('QuickTaxCalculator', () => {
  it.each([10_000, 25_833, 50_000, 83_333, 150_000, 400_000, 999_999])(
    'monthly ฿%i with social security matches the annual engine', (monthly) => {
      const { input, last } = renderQuick();
      fireEvent.change(input, { target: { value: String(monthly) } });
      const expected = calculateAnnualTax(salaried({
        annualIncome: monthly * 12,
        includeSocialSecurity: true,
        socialSecurityContribution: TAX_CONSTANTS.MAX_SOCIAL_SECURITY,
      }));
      expect(last()?.annualIncome).toBe(monthly * 12);
      expect(last()?.annualTax).toBeCloseTo(expected.taxOwed, 6);
      expect(last()?.monthlyTax).toBeCloseTo(expected.taxOwed / 12, 6);
    }
  );

  it('yearly and weekly periods annualise correctly (×1 and ×52)', () => {
    const { input, last } = renderQuick();
    fireEvent.click(screen.getByLabelText('Yearly'));
    fireEvent.change(input, { target: { value: '1200000' } });
    expect(last()?.annualIncome).toBe(1_200_000);
    fireEvent.click(screen.getByLabelText('Weekly'));
    expect(last()?.annualIncome).toBe(1_200_000 * 52);
  });

  it('unticking social security matches the annual engine without SS', () => {
    const { input, last } = renderQuick();
    fireEvent.click(screen.getByLabelText(/I pay social security/));
    fireEvent.change(input, { target: { value: '80000' } });
    expect(last()?.annualTax).toBeCloseTo(calculateAnnualTax(salaried({ annualIncome: 960_000 })).taxOwed, 6);
  });

  it('strips commas, letters and currency symbols from typed input', () => {
    const { input, last } = renderQuick();
    fireEvent.change(input, { target: { value: '฿50,000abc' } });
    expect(last()?.annualIncome).toBe(600_000);
  });

  it.each(['', '0', '.', '0.0'])('input %j shows no result (not ฿0, not NaN)', (raw) => {
    const { input, last } = renderQuick();
    fireEvent.change(input, { target: { value: raw } });
    expect(last()).toBeNull();
    expect(screen.queryByText(/NaN/)).toBeNull();
  });

  it('input is limited to 9 characters so the figure cannot overflow', () => {
    const { input } = renderQuick();
    fireEvent.change(input, { target: { value: '12345678901234' } });
    expect((input as HTMLInputElement).value).toBe('123456789');
  });

  it('a malformed decimal ("1.2.3") is read as 1.2 rather than crashing', () => {
    const { input, last } = renderQuick();
    fireEvent.change(input, { target: { value: '1.2.3' } });
    expect(last()?.annualIncome).toBeCloseTo(14.4, 6);
    expect(screen.queryByText(/NaN/)).toBeNull();
  });
});

// ─── Monthly withholding results ─────────────────────────────────────────────

const emptyMonth = (): MonthlyIncomeEntry => ({ salary: 0, bonus: 0, housingAllowance: 0, otherIncome: 0 });

function monthly(overrides: Partial<MonthlyFormData> = {}): MonthlyFormData {
  return {
    estimateType: 'basic', incomeType: 'fixed', monthlySalary: 0, annualBonus: 0, annualOtherIncome: 0,
    variableIncome: Array.from({ length: 12 }, emptyMonth),
    includeSocialSecurity: false, socialSecurityContribution: 0,
    maritalStatus: '', spouseHasNoIncome: false, isAge65OrOlder: false,
    children: [], childrenEligibilityConfirmed: false, parentsEligibilityConfirmed: false, numberOfParents: 0,
    hasLifeInsurance: false, lifeInsurance: 0, hasHealthInsurance: false, healthInsurance: 0,
    hasPensionFund: false, pensionFund: 0, hasProvidentFund: false, providentFund: 0,
    hasRMF: false, rmf: 0, hasSSF: false, ssf: 0, hasDonations: false, donations: 0,
    ...overrides,
  };
}

/** Reads a "฿1,234" figure from the summary line with the given label. */
function lineValue(label: string): number {
  const li = screen.getByText(label, { selector: 'li > span' }).closest('li')!;
  const text = li.querySelectorAll('span')[1].textContent ?? '';
  return Number(text.replace(/[^0-9.]/g, ''));
}

function renderMonthly(data: MonthlyFormData) {
  render(<MonthlyResultsStep formData={data} setFormData={vi.fn()} onStartOver={vi.fn()} />);
  return { annualTax: lineValue('Annual Tax'), taxable: lineValue('Taxable Income'), deductions: lineValue('Total Deductions') };
}

describe('MonthlyResultsStep — agreement with the annual engine', () => {
  it.each([0, 15_000, 25_833, 25_834, 60_000, 200_000, 500_000])(
    'basic fixed salary ฿%i/month gives the same annual tax as the annual calculator', (salary) => {
      const r = renderMonthly(monthly({ monthlySalary: salary, includeSocialSecurity: true, socialSecurityContribution: 10_500 }));
      const a = calculateAnnualTax(salaried({ annualIncome: salary * 12, includeSocialSecurity: true, socialSecurityContribution: 10_500 }));
      expect(r.taxable).toBe(Math.round(a.taxableIncome));
      expect(r.annualTax).toBe(Math.round(a.taxOwed));
    }
  );

  it('bonus and other income are added once, not ×12', () => {
    const r = renderMonthly(monthly({ monthlySalary: 50_000, annualBonus: 100_000, annualOtherIncome: 20_000 }));
    const a = calculateAnnualTax(salaried({ annualIncome: 720_000 }));
    expect(r.annualTax).toBe(Math.round(a.taxOwed));
  });

  it('variable income sums all four columns across all 12 months', () => {
    const months = Array.from({ length: 12 }, (_, i) => ({ salary: 40_000 + i * 1_000, bonus: i === 11 ? 80_000 : 0, housingAllowance: 5_000, otherIncome: 1_000 }));
    const total = months.reduce((s, m) => s + m.salary + m.bonus + m.housingAllowance + m.otherIncome, 0);
    const r = renderMonthly(monthly({ incomeType: 'variable', variableIncome: months }));
    expect(r.annualTax).toBe(Math.round(calculateAnnualTax(salaried({ annualIncome: total })).taxOwed));
  });

  it('detailed estimate with spouse, children, parents and insurance matches the annual calculator', () => {
    const shared = {
      maritalStatus: 'married' as const, spouseHasNoIncome: true,
      children: [{ birthYear: 2012 }, { birthYear: 2019 }], numberOfParents: 2,
      hasLifeInsurance: true, lifeInsurance: 150_000, hasHealthInsurance: true, healthInsurance: 30_000,
      hasRMF: true, rmf: 100_000, includeSocialSecurity: true, socialSecurityContribution: 10_500,
    };
    const r = renderMonthly(monthly({ estimateType: 'detailed', monthlySalary: 150_000, ...shared }));
    const a = calculateAnnualTax(salaried({ annualIncome: 1_800_000, ...shared }));
    expect(r.taxable).toBe(Math.round(a.taxableIncome));
    expect(r.annualTax).toBe(Math.round(a.taxOwed));
  });

  it('detailed-only fields are ignored on a basic estimate', () => {
    const r = renderMonthly(monthly({ monthlySalary: 100_000, maritalStatus: 'married', spouseHasNoIncome: true, hasRMF: true, rmf: 200_000 }));
    expect(r.annualTax).toBe(Math.round(calculateAnnualTax(salaried({ annualIncome: 1_200_000 })).taxOwed));
  });

  it('a short variableIncome array falls back to the fixed fields instead of crashing', () => {
    const r = renderMonthly(monthly({ incomeType: 'variable', variableIncome: [emptyMonth()], monthlySalary: 30_000 }));
    expect(Number.isFinite(r.annualTax)).toBe(true);
    expect(screen.queryByText(/NaN/)).toBeNull();
  });
});

describe('Regressions fixed 2026-11-25 — MonthlyResultsStep', () => {
  it('applies the 65+ income exemption that its own dependents step asks for and displays', () => {
    // DependentsStepMonthly shows "65+ ฿190,000" in its summary; the results step used to
    // ignore it. ฿100,000/month: annual engine taxable = 1,200,000 − 100,000 − 60,000 − 190,000 = 850,000.
    const r = renderMonthly(monthly({ estimateType: 'detailed', monthlySalary: 100_000, isAge65OrOlder: true }));
    const a = calculateAnnualTax(salaried({ annualIncome: 1_200_000, isAge65OrOlder: true }));
    expect(r.taxable).toBe(a.taxableIncome);
  });

  it('caps donations the same way as the annual calculator (not 10% of gross income)', () => {
    // Monthly used to cap at 10% of GROSS income (120,000) instead of income after deductions.
    const r = renderMonthly(monthly({ estimateType: 'detailed', monthlySalary: 100_000, hasDonations: true, donations: 500_000 }));
    const a = calculateAnnualTax(salaried({ annualIncome: 1_200_000, hasDonations: true, donations: 500_000 }));
    expect(r.taxable).toBe(Math.round(a.taxableIncome));
  });

  it('child bonus does not depend on the order the children were entered', () => {
    const kids = (children: { birthYear: number }[]) =>
      monthly({ estimateType: 'detailed', monthlySalary: 100_000, children });
    const olderFirst = renderMonthly(kids([{ birthYear: 2015 }, { birthYear: 2020 }])).taxable;
    document.body.innerHTML = '';
    const youngerFirst = renderMonthly(kids([{ birthYear: 2020 }, { birthYear: 2015 }])).taxable;
    expect(youngerFirst).toBe(olderFirst);
  });
});

describe('Screens that show allowance figures use the engine', () => {
  it('monthly results list the 65+ exemption and cap the donation editor at the real limit', () => {
    render(<MonthlyResultsStep
      formData={monthly({ estimateType: 'detailed', monthlySalary: 100_000, isAge65OrOlder: true, hasDonations: true, donations: 500_000 })}
      setFormData={vi.fn()} onStartOver={vi.fn()} />);
    fireEvent.click(screen.getByText('Show All Values & Edit'));
    expect(screen.getByText('Age 65+ Exemption')).toBeInTheDocument();
    // 1,200,000 − 100,000 − 60,000 − 190,000 = 850,000 → donation cap 85,000
    expect(screen.getByText('Max: ฿85,000')).toBeInTheDocument();
  });

  it('dependents step shows the bonus on the younger child even when entered first', () => {
    render(<DependentsStepAnnual
      formData={salaried({ annualIncome: 500_000, children: [{ birthYear: 2020 }, { birthYear: 2015 }], childrenEligibilityConfirmed: true })}
      setFormData={vi.fn()} nextStep={vi.fn()} />);
    expect(screen.getAllByText('(+฿30k bonus)')).toHaveLength(1);
    expect(screen.getByText(/Total children allowance/).textContent).toContain('90,000');
  });

  it('company-owner review shows their real income and capped donations, not ฿0 or NaN', () => {
    const owner = {
      ...createDefaultCompanyOwnerFormData(),
      companyInfo: createDefaultCompanyInfo(),
      maritalStatus: 'single' as const,
      salaryFromCompany: 1_000_000,
      hasDonations: true,
      donations: 500_000,
    };
    render(<ReviewStep formData={owner as unknown as TaxFormData} setFormData={vi.fn()} nextStep={vi.fn()} goToStep={vi.fn()} />);
    expect(screen.queryByText(/NaN/)).toBeNull();
    expect(screen.getByText('฿1,000,000')).toBeInTheDocument();
    // 1,000,000 − 100,000 − 60,000 = 840,000 → cap 84,000
    expect(screen.getAllByText('฿84,000').length).toBeGreaterThan(0);
  });
});

describe('New inputs (2026-11-25 second pass)', () => {
  it('ticking "Adopted" on a 4th child shows it is not counted', () => {
    const setFormData = vi.fn();
    const children = [{ birthYear: 2010 }, { birthYear: 2012 }, { birthYear: 2014 }, { birthYear: 2016, isAdopted: true }];
    render(<DependentsStepAnnual
      formData={salaried({ annualIncome: 500_000, children, childrenEligibilityConfirmed: true })}
      setFormData={setFormData} nextStep={vi.fn()} />);
    expect(screen.getByText('(not counted: adopted-child limit)')).toBeInTheDocument();
    fireEvent.click(screen.getAllByLabelText('Adopted')[0]);
    expect(setFormData.mock.calls[0][0].children[0].isAdopted).toBe(true);
  });

  it('a rental entry offers the property kind and shows that kind\'s rate and VAT status', () => {
    const onUpdate = vi.fn();
    const entry = { id: 'r1', grossAmount: 100_000, incomeType: 'rental_40_5' as const, rentalPropertyKind: 'other_land' as const,
      withholdingAmount: 0, monthReceived: 1, payerName: 'Tenant', description: '' };
    render(<IncomeEntryCard entry={entry} index={0} isExpanded onToggle={vi.fn()} onUpdate={onUpdate} onRemove={vi.fn()} />);
    // Info box and deduction preview both use the land rate, not the 30% building rate
    expect(screen.getByText(/Flat Rate Deduction:/).closest('p')!.textContent).toContain('15%');
    expect(screen.getByText(/Flat Rate Deduction Preview:/).closest('p')!.textContent).toContain('(15% of');
    expect(screen.getByText(/฿15,000/)).toBeInTheDocument();
    expect(screen.getByText(/exempt from VAT/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('What are you renting out?'), { target: { value: 'vehicle' } });
    expect(onUpdate).toHaveBeenCalledWith('rentalPropertyKind', 'vehicle');
  });
});

describe('Foreign income step: residency in the year earned', () => {
  const entry = (dateEarned: string) => ({
    id: 'f1', amount: 10_000, currency: 'USD', amountThb: 350_000, dateEarned, dateRemitted: '2026-03-01',
    foreignTaxPaid: 0, description: 'Consulting', country: 'United States',
  });
  const renderStep = (dateEarned: string) => {
    const setFormData = vi.fn();
    render(<ForeignIncomeStep
      formData={{ ...createDefaultFreelancerFormData(), isThaiResident: true, daysInThailand: 200, hasForeignIncome: true, foreignIncomeEntries: [entry(dateEarned)] }}
      setFormData={setFormData} nextStep={vi.fn()} />);
    // Entries start collapsed; open the first one via its header.
    fireEvent.click(screen.getByText('#1').closest('.cursor-pointer')!);
    return setFormData;
  };

  it('asks about 2025 residency for income earned in 2025, and saves the answer', () => {
    const setFormData = renderStep('2025-06-01');
    expect(screen.getByText('Were you in Thailand 180 days or more in 2025?')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('No'));
    expect(setFormData.mock.calls[setFormData.mock.calls.length - 1][0].foreignIncomeEntries[0].residentInYearEarned).toBe('no');
  });

  it('does not ask for income earned this year', () => {
    renderStep('2026-01-15');
    expect(screen.queryByText(/Were you in Thailand 180 days or more/)).toBeNull();
  });
});
