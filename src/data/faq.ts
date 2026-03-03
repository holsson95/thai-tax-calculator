export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  items: FAQItem[];
}

export const faqData: FAQCategory[] = [
  {
    name: 'Pensioners & Retirees',
    items: [
      {
        question: 'Do retirees get a special tax exemption in Thailand?',
        answer: 'Yes. If you are aged 65 or over at the end of the tax year, the first 190,000 THB of your assessable income is completely exempt from personal income tax under Section 42(17) of the Revenue Code. Combined with the standard personal allowance (60,000 THB) and the 0% first tax bracket (150,000 THB), a retiree aged 65+ can receive up to approximately 400,000 THB before paying any Thai income tax.'
      },
      {
        question: 'Is my foreign pension taxable in Thailand?',
        answer: 'If you are a Thai tax resident (180+ days in Thailand) and you transfer your foreign pension to Thailand, it is assessable income since the 2024 rule change. Tax treaties between Thailand and your home country may allow you to claim a credit for tax already paid abroad, reducing or eliminating double taxation. If you leave pension money in an overseas account without remitting it to Thailand, it is not taxable here.'
      },
      {
        question: 'Is UK State Pension taxable in Thailand?',
        answer: 'For Thai tax residents, the UK State Pension is generally taxable in Thailand as your country of residence under the UK-Thailand Double Tax Agreement. UK private pensions are also taxable in Thailand. However, UK government service pensions (for civil servants, military, some teachers) are taxable only in the UK, not Thailand. You can claim a foreign tax credit for any UK tax withheld. Many retirees consider applying to HMRC for gross payment of their pension if they are Thai tax residents, to avoid UK withholding tax that then requires claiming back.'
      },
      {
        question: 'Is US Social Security taxable in Thailand?',
        answer: 'This is complex. Under the US-Thailand DTA, Social Security may be taxable in Thailand as your country of residence. However, the US also taxes its own citizens on worldwide income regardless of where they live, creating a risk of double taxation. US citizens should use the Foreign Tax Credit on their US return to offset US tax with Thai tax paid, and vice versa. Given the complexity, US citizen retirees in Thailand should consult a specialist in US expat taxation.'
      },
      {
        question: 'Do retirees need to file a Thai tax return?',
        answer: 'Yes, if you are a Thai tax resident (180+ days) and your assessable income exceeds the filing threshold. For pension or salary income, the threshold is 120,000 THB for single individuals or 220,000 THB for married couples. For investment or rental income, it is 60,000 THB (single) or 120,000 THB (married). Note that the 65+ exemption reduces your assessable income by 190,000 THB before the thresholds apply, meaning many retirees with modest income will owe no tax but may still need to file.'
      },
      {
        question: 'What is the LTR Wealthy Pensioner visa and how does it affect tax?',
        answer: 'The Long-Term Resident (LTR) Wealthy Pensioner visa is a 10-year visa for retirees aged 50+ with USD 80,000 or more in annual pension/passive income (or USD 40,000+ with USD 250,000 in Thai assets). Unlike the standard Non-OA retirement visa, LTR Wealthy Pensioner holders receive a complete exemption from Thai tax on all foreign-sourced income — pensions, investments, rental income from abroad. There is no need to track remittances or claim foreign tax credits. The application fee is 50,000 THB.'
      },
      {
        question: 'Does holding a Thai retirement visa (Non-OA) reduce my tax?',
        answer: 'No. The Non-Immigrant OA retirement visa provides no tax benefits whatsoever. Your tax obligations are based entirely on how many days you spend in Thailand (the 180-day rule), not on your visa type. If you spend 180+ days in Thailand on a Non-OA visa, you have the same tax obligations as any other Thai tax resident. Only the LTR visa categories provide genuine tax benefits.'
      },
      {
        question: 'How is Thai bank interest taxed for retirees?',
        answer: 'Interest on Thai bank accounts is subject to 15% withholding tax deducted automatically by the bank. You can treat this withholding as your final tax on the interest (simpler), or include the interest on your annual return and claim the 15% as a credit — which may result in a partial refund if your effective tax rate is lower. For retirees aged 65+ with modest income, your effective rate on the first taxable income after allowances is 5%, making a refund possible if you include bank interest in your return.'
      },
      {
        question: 'Can I claim my parents as dependants on my Thai tax return?',
        answer: 'Yes. You can claim a 30,000 THB allowance per parent who is aged 60 or over, is a Thai resident, and has their own income of no more than 30,000 THB per year. You can also claim up to 15,000 THB per parent for health insurance premiums you pay on their behalf. These deductions are in addition to your personal allowance and any other deductions you claim.'
      },
      {
        question: 'Are capital gains from selling shares in Thailand taxable for retirees?',
        answer: 'Capital gains from selling shares listed on the Stock Exchange of Thailand (SET) are exempt from personal income tax for individuals — there is no capital gains tax on Thai listed shares. Capital gains on foreign shares, however, are assessable income if the proceeds are remitted to Thailand.'
      }
    ]
  },
  {
    name: 'Tax Residency',
    items: [
      {
        question: 'How is tax residency determined in Thailand?',
        answer: 'You are considered a Thai tax resident if you spend 180 days or more in Thailand during a calendar year. The days do not need to be consecutive. Partial days are generally counted as full days.'
      },
      {
        question: 'What happens if I stay less than 180 days?',
        answer: 'If you stay less than 180 days in a calendar year, you are a non-resident for tax purposes. Non-residents are only taxed on income earned within Thailand, typically at flat rates or through withholding tax.'
      },
      {
        question: 'Can I be a tax resident of both Thailand and another country?',
        answer: 'Yes, dual tax residency is possible. In such cases, tax treaties between countries determine which country has primary taxing rights. You may need to claim foreign tax credits to avoid double taxation.'
      },
      {
        question: 'Does my visa type affect my tax residency status?',
        answer: 'No. Tax residency is determined solely by the number of days you spend in Thailand, not by your visa type. Whether you hold a retirement visa (Non-OA), Thailand Privilege (Elite) visa, tourist visa, or work permit, you become a tax resident after 180 days in a calendar year. Only the LTR visa provides any tax benefit, and that is through a specific income exemption — not a change to residency rules.'
      }
    ]
  },
  {
    name: 'Deductions & Allowances',
    items: [
      {
        question: 'What is the personal allowance in Thailand?',
        answer: 'Every taxpayer receives a personal allowance of 60,000 THB. This amount is deducted from your assessable income before calculating tax. If your spouse has no income, you can also claim an additional 60,000 THB spouse allowance.'
      },
      {
        question: 'Can I deduct insurance premiums?',
        answer: 'Yes. Life insurance premiums are deductible up to 100,000 THB annually. Health insurance premiums are deductible up to 25,000 THB. Parent health insurance premiums have a separate limit of 15,000 THB.'
      },
      {
        question: 'What are SSF and RMF funds?',
        answer: 'SSF (Super Savings Fund) and RMF (Retirement Mutual Fund) are tax-advantaged investment funds. SSF contributions are deductible up to 30% of income (max 200,000 THB). RMF contributions are deductible up to 30% of income (max 500,000 THB). Combined limits apply.'
      },
      {
        question: 'How much can I deduct for children?',
        answer: 'You can deduct 30,000 THB per legitimate child. An additional 2,000 THB per child is available if the child is studying in Thailand. There is no limit on the number of children you can claim.'
      }
    ]
  },
  {
    name: 'Filing & Deadlines',
    items: [
      {
        question: 'When is the tax filing deadline in Thailand?',
        answer: 'The annual tax return (PND 90/91) must be filed by March 31 of the following year. For example, income earned in 2024 must be filed by March 31, 2025. Online filing may extend this deadline by 8 days.'
      },
      {
        question: 'Do I need to file if my employer withholds tax?',
        answer: 'Yes, you should still file an annual return even if your employer withholds tax. Filing allows you to claim additional deductions and potentially receive a refund. It also ensures compliance with Thai tax law.'
      },
      {
        question: 'How do I file my tax return?',
        answer: 'You can file online through the RD Smart Tax app or the Revenue Department website (rd.go.th), or in person at your local Revenue Department office. Online filing is recommended for faster processing.'
      },
      {
        question: 'What documents do I need to file?',
        answer: 'You need your withholding tax certificates (Form 50 Tawi) from employers and banks, personal identification (Thai ID or passport), Tax ID number, and supporting documents for any deductions you claim (receipts, certificates).'
      }
    ]
  },
  {
    name: 'Income & Withholding',
    items: [
      {
        question: 'How is monthly withholding tax calculated?',
        answer: 'Employers estimate your annual income and calculate the annual tax liability. This amount is divided by 12 and withheld monthly. The calculation considers your allowances and deductions you have declared to your employer.'
      },
      {
        question: 'Is foreign income taxable in Thailand?',
        answer: 'For Thai tax residents, foreign income brought into Thailand is taxable. Recent changes require foreign income remitted to Thailand to be declared regardless of when it was earned. Tax treaties may provide exemptions or credits.'
      },
      {
        question: 'What income is exempt from tax?',
        answer: 'The first 150,000 THB of taxable income is exempt. Other exemptions include certain government payments, inheritance (subject to separate rules), and specific investment returns like those from certain government bonds.'
      },
      {
        question: 'How are dividends from Thai companies taxed?',
        answer: 'Dividends from Thai companies are subject to 10% withholding tax deducted at source by the paying company. You can either treat this withholding as your final tax obligation (simpler), or include dividends in your annual return and claim the 10% withholding as a tax credit — which may result in a refund if your overall effective tax rate is lower.'
      },
      {
        question: 'Is rental income from property in Thailand taxable?',
        answer: 'Yes. Rental income from Thai property is assessable income and must be declared on your annual return. You can deduct 30% of gross rental income as a flat-rate expense (no documentation needed), or claim actual rental-related expenses if they are higher and you can document them. Net rental income is then subject to progressive income tax rates.'
      }
    ]
  },
  {
    name: 'Refunds & Payments',
    items: [
      {
        question: 'How do I get a tax refund?',
        answer: 'If you have overpaid tax (common if you have additional deductions not considered in withholding), you will receive a refund after filing your annual return. Refunds are typically processed within 3 months and deposited to your bank account.'
      },
      {
        question: 'What if I owe additional tax?',
        answer: 'If your total tax liability exceeds the amount withheld, you must pay the difference when filing. Payment can be made at the Revenue Department office, through designated banks, or online through the RD Smart Tax app.'
      },
      {
        question: 'Are there penalties for late filing or payment?',
        answer: 'Yes. Late filing incurs a penalty of up to 2,000 THB. Late payment incurs a surcharge of 1.5% per month on the outstanding amount. Interest also accrues on unpaid tax.'
      }
    ]
  }
];

export function searchFAQ(query: string): FAQItem[] {
  const lowerQuery = query.toLowerCase();
  const results: FAQItem[] = [];

  faqData.forEach(category => {
    category.items.forEach(item => {
      if (
        item.question.toLowerCase().includes(lowerQuery) ||
        item.answer.toLowerCase().includes(lowerQuery)
      ) {
        results.push(item);
      }
    });
  });

  return results;
}
