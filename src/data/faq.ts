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
