import { TaxFormData } from '../types/taxForm';
import { FreelancerFormData } from '../types/freelancerForm';
import { SoleProprietorFormData } from '../types/soleProprietorForm';
import { CompanyOwnerFormData } from '../types/companyOwnerForm';
import { DTA_COUNTRIES } from '../data/dtaCountries';

export interface ChecklistItem {
  label: string;
  required: boolean;
  section: string;
}

type AnyFormData =
  | TaxFormData
  | FreelancerFormData
  | SoleProprietorFormData
  | CompanyOwnerFormData;

function hasDTA(country: string): boolean {
  const found = DTA_COUNTRIES.find(
    c => c.name.toLowerCase() === country.toLowerCase() || c.code.toLowerCase() === country.toLowerCase()
  );
  return found?.hasDTA === true;
}

function getExpenseCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    office_supplies: 'Office Supplies',
    equipment: 'Equipment',
    software: 'Software',
    travel: 'Travel',
    communication: 'Communication',
    professional_services: 'Professional Services',
    rent: 'Rent',
    utilities: 'Utilities',
    marketing: 'Marketing',
    insurance: 'Insurance',
    other: 'Other',
  };
  return labels[category] ?? category;
}

export function generateChecklist(formData: AnyFormData): ChecklistItem[] {
  const items: ChecklistItem[] = [];

  const add = (label: string, section: string, required = true) =>
    items.push({ label, required, section });

  // ── Always required ───────────────────────────────────────────────────────
  add('Thai National ID card or Passport copy', 'Identity', true);

  // Refund indicator — for salaried check taxWithheld vs income
  // We just always include this as helpful
  add('Bank savings account book or account details (for refund, if applicable)', 'Identity', false);

  // ── Salaried income ───────────────────────────────────────────────────────
  if ('annualIncome' in formData && formData.annualIncome > 0) {
    add(
      'Withholding tax certificate (50 Thawi) from each employer',
      'Income'
    );
  }

  // ── Company owner income ──────────────────────────────────────────────────
  if ('companyInfo' in formData) {
    const co = formData as CompanyOwnerFormData;
    if (co.salaryFromCompany > 0 || co.directorFees > 0) {
      add(
        'Withholding tax certificate (50 Thawi) from company for salary / director fees',
        'Income'
      );
    }
    if (co.hasDividends && co.dividendEntries.length > 0) {
      const thaiListed = co.dividendEntries.filter(d => d.dividendType === 'thai_listed');
      const thaiUnlisted = co.dividendEntries.filter(d => d.dividendType === 'thai_unlisted');
      const foreign = co.dividendEntries.filter(d => d.dividendType === 'foreign');

      if (thaiListed.length > 0 || thaiUnlisted.length > 0) {
        add('Dividend warrants / dividend vouchers from Thai companies', 'Income');
        add('Withholding tax certificates (50 Thawi) for dividend payments', 'Income');
      }
      if (foreign.length > 0) {
        add('Foreign dividend statements from overseas companies', 'Income');
        add('Evidence of foreign withholding tax paid on dividends', 'Income');
      }
    }
  }

  // ── Freelancer / sole proprietor income ───────────────────────────────────
  if ('thaiIncomeEntries' in formData) {
    const fl = formData as FreelancerFormData;

    if (fl.thaiIncomeEntries.length > 0) {
      // 50 Thawi for entries with withholding
      const withWithholding = fl.thaiIncomeEntries.filter(e => e.withholdingAmount > 0);
      if (withWithholding.length > 0) {
        withWithholding.forEach(entry => {
          const payer = entry.payerName ? ` from ${entry.payerName}` : '';
          add(`Withholding tax certificate (50 Thawi)${payer}`, 'Income');
        });
      }
      // Contracts / invoices for freelance work
      const freelanceTypes = ['liberal_profession_40_6', 'contractor_40_7', 'business_sales_40_8'];
      const hasFreelanceIncome = fl.thaiIncomeEntries.some(e => freelanceTypes.includes(e.incomeType));
      if (hasFreelanceIncome) {
        add('Contracts, invoices, or receipts for freelance / service income', 'Income');
      }
    }

    // Expense documentation
    if (fl.actualExpenses.length > 0) {
      const categoriesWithReceipts = [
        ...new Set(
          fl.actualExpenses.filter(e => e.hasReceipt).map(e => e.category)
        ),
      ];
      const categoriesWithoutReceipts = [
        ...new Set(
          fl.actualExpenses.filter(e => !e.hasReceipt).map(e => e.category)
        ),
      ];

      categoriesWithReceipts.forEach(cat => {
        add(`Receipts for ${getExpenseCategoryLabel(cat).toLowerCase()} expenses`, 'Expenses');
      });
      categoriesWithoutReceipts.forEach(cat => {
        add(
          `Receipts for ${getExpenseCategoryLabel(cat).toLowerCase()} expenses (currently marked as no receipt — obtain if possible)`,
          'Expenses',
          false
        );
      });

      const hasTravel = fl.actualExpenses.some(e => e.category === 'travel');
      if (hasTravel) {
        add('Mileage log or travel expense records', 'Expenses', false);
      }
    }

    // Foreign income
    if (fl.hasForeignIncome && fl.foreignIncomeEntries.length > 0) {
      add('Foreign income statements, payslips, or invoices for each foreign income source', 'Foreign Income');

      const remitted = fl.foreignIncomeEntries.filter(e => e.dateRemitted);
      if (remitted.length > 0) {
        add('Bank statements showing remittance of foreign income to Thailand', 'Foreign Income');
      }

      const withForeignTax = fl.foreignIncomeEntries.filter(e => e.foreignTaxPaid > 0);
      if (withForeignTax.length > 0) {
        add('Foreign tax payment receipts or certificates for tax paid abroad', 'Foreign Income');

        const dtaEntries = withForeignTax.filter(e => hasDTA(e.country));
        const nonDtaEntries = withForeignTax.filter(e => !hasDTA(e.country));

        if (dtaEntries.length > 0) {
          add('Double Tax Agreement (DTA) claim documentation — proof of tax residency in source country', 'Foreign Income');
        }
        if (nonDtaEntries.length > 0) {
          add(
            `Note: No DTA exists for some income sources (${nonDtaEntries.map(e => e.country).join(', ')}) — foreign tax credit may not be available`,
            'Foreign Income',
            false
          );
        }
      }

      if (fl.isThaiResident) {
        add('Evidence of Thai residency: passport with entry/exit stamps or departure cards (to prove 180+ days in Thailand)', 'Foreign Income');
      }
    }

    // LTR visa
    if (fl.visaType && fl.visaType !== 'regular' && fl.visaType !== 'other') {
      add('Long-Term Resident (LTR) visa certificate from BOI', 'Special Situations');
      if (fl.visaType === 'ltr_work_from_thailand') {
        add('Thailand Digital Startup (TDSL) endorsement letter from BOI (for WFT visa)', 'Special Situations');
      }
    }
  }

  // ── Sole proprietor business docs ─────────────────────────────────────────
  if ('businessProfile' in formData) {
    const sp = formData as SoleProprietorFormData;
    add('Business registration certificate (ใบทะเบียนพาณิชย์) or relevant trade registration', 'Business');
    if (sp.businessProfile.registrationType !== 'unregistered') {
      add('Commercial / DBD registration documents', 'Business');
    }
    if (sp.usesSimplifiedBookkeeping) {
      add('Simplified bookkeeping records (income and expense ledger)', 'Business');
    } else {
      add('Full financial accounts / profit & loss statement for the tax year', 'Business');
    }
    if (sp.hasInventory) {
      add('Inventory records / stock-take as of 31 December', 'Business');
    }
  }

  // ── Family deductions ─────────────────────────────────────────────────────
  const base = formData as TaxFormData;

  if (base.children && base.children.length > 0) {
    add("Children's birth certificates or national ID cards", 'Family');
    const hasStudents = base.children.some(c => c.isStudent);
    if (hasStudents) {
      add('Current student enrollment certificate for children aged 20–25 claiming student allowance', 'Family');
    }
  }

  if (base.numberOfParents > 0) {
    add("Parents' Thai national ID cards (for each parent claimed)", 'Family');
  }

  // ── Insurance & fund deductions ───────────────────────────────────────────
  if (base.hasLifeInsurance && base.lifeInsurance > 0) {
    add('Life insurance premium payment certificate from insurer', 'Deductions');
  }
  if (base.hasHealthInsurance && base.healthInsurance > 0) {
    add('Health insurance premium payment certificate from insurer', 'Deductions');
  }
  if (base.hasProvidentFund && base.providentFund > 0) {
    add('Provident fund contribution statement from employer', 'Deductions');
  }
  if (base.hasPensionFund && base.pensionFund > 0) {
    add('Pension fund contribution statement', 'Deductions');
  }
  if (base.hasRMF && base.rmf > 0) {
    add('RMF (Retirement Mutual Fund) certificate from fund manager', 'Deductions');
  }
  if (base.hasSSF && base.ssf > 0) {
    add('SSF (Super Savings Fund) certificate from fund manager', 'Deductions');
  }
  if (base.hasDonations && base.donations > 0) {
    add('Official donation receipts from registered charities / government bodies', 'Deductions');
  }
  if (base.includeSocialSecurity && base.socialSecurityContribution > 0) {
    add('Social Security contribution statement (from Social Security Office or employer)', 'Deductions');
  }

  return items;
}

export function groupChecklistBySection(items: ChecklistItem[]): Record<string, ChecklistItem[]> {
  return items.reduce<Record<string, ChecklistItem[]>>((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});
}
