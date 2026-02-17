export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: number;
  category: string;
}

export const articles: Article[] = [
  {
    slug: 'understanding-thai-tax-residency',
    title: 'Understanding Thai Tax Residency: The 180-Day Rule',
    excerpt: 'Learn how Thailand determines your tax residency status and what it means for your tax obligations.',
    content: `
## What is Tax Residency?

Tax residency determines which country has the right to tax your income. In Thailand, the rules are straightforward but important to understand.

## The 180-Day Rule

Thailand uses a simple test to determine tax residency: if you spend 180 days or more in Thailand during a calendar year, you are considered a Thai tax resident.

### Key Points:
- Days are counted per calendar year (January to December)
- Partial days typically count as full days
- The days don't need to be consecutive

## Tax Implications

**As a Thai Tax Resident:**
- You are taxed on income earned in Thailand
- You may be taxed on foreign-sourced income brought into Thailand
- You must file an annual tax return if your income exceeds the filing threshold

**As a Non-Resident:**
- You are only taxed on income earned within Thailand
- Different withholding rates may apply
- You may still need to file depending on your income type

## Planning Tips

1. Keep records of your travel in and out of Thailand
2. Understand the timing of your income remittances
3. Consider tax treaties between Thailand and your home country
4. Consult with a tax professional for complex situations
    `,
    publishedAt: '2024-01-15',
    readTime: 5,
    category: 'Tax Basics'
  },
  {
    slug: 'maximizing-tax-deductions-thailand',
    title: 'Maximizing Your Tax Deductions in Thailand',
    excerpt: 'A comprehensive guide to the allowances and deductions available to reduce your Thai tax liability.',
    content: `
## Personal Allowances

Thailand offers several personal allowances that reduce your taxable income:

### Standard Allowances:
- **Personal Allowance:** 60,000 THB
- **Spouse Allowance:** 60,000 THB (if spouse has no income)
- **Child Allowance:** 30,000 THB per child (legitimate children only)

## Common Deductions

### Social Security
Contributions to Thai social security are deductible up to the maximum contribution amount.

### Life Insurance
Life insurance premiums are deductible up to 100,000 THB annually.

### Health Insurance
Health insurance premiums are deductible up to 25,000 THB annually, increased from previous years.

### Retirement Funds
- **SSF (Super Savings Fund):** Up to 30% of income, max 200,000 THB
- **RMF (Retirement Mutual Fund):** Up to 30% of income, max 500,000 THB
- **Provident Fund:** Up to 15% of salary

### Housing Loan Interest
Interest on housing loans is deductible up to 100,000 THB annually.

## Tips for Maximizing Deductions

1. **Plan Early:** Many deductions require purchases before year-end
2. **Keep Documentation:** Maintain receipts and certificates
3. **Understand Limits:** Some deductions have combined caps
4. **Consider Timing:** Some investments have minimum holding periods
    `,
    publishedAt: '2024-02-01',
    readTime: 7,
    category: 'Deductions'
  },
  {
    slug: 'thai-tax-brackets-explained',
    title: 'Thai Tax Brackets Explained: 2024 Guide',
    excerpt: 'Understand how progressive tax rates work in Thailand and calculate your effective tax rate.',
    content: `
## Progressive Tax System

Thailand uses a progressive tax system where higher income is taxed at higher rates. Only the income within each bracket is taxed at that rate.

## 2024 Tax Brackets

| Taxable Income (THB) | Tax Rate |
|---------------------|----------|
| 0 - 150,000 | Exempt |
| 150,001 - 300,000 | 5% |
| 300,001 - 500,000 | 10% |
| 500,001 - 750,000 | 15% |
| 750,001 - 1,000,000 | 20% |
| 1,000,001 - 2,000,000 | 25% |
| 2,000,001 - 5,000,000 | 30% |
| Over 5,000,000 | 35% |

## How It Works

The first 150,000 THB of taxable income is always exempt. Then each subsequent bracket applies only to the income within that range.

### Example Calculation

For a taxable income of 600,000 THB:
- First 150,000: 0 THB (exempt)
- 150,001 - 300,000: 7,500 THB (150,000 × 5%)
- 300,001 - 500,000: 20,000 THB (200,000 × 10%)
- 500,001 - 600,000: 15,000 THB (100,000 × 15%)
- **Total Tax: 42,500 THB**
- **Effective Rate: 7.08%**

## Key Takeaways

1. Your marginal rate applies only to income in that bracket
2. The effective rate is always lower than your top bracket
3. Deductions reduce your taxable income before applying brackets
4. Use our calculator to see your exact breakdown
    `,
    publishedAt: '2024-02-15',
    readTime: 4,
    category: 'Tax Basics'
  },
  {
    slug: 'expat-guide-filing-thai-taxes',
    title: 'Expat Guide: Filing Your Thai Tax Return',
    excerpt: 'Step-by-step guide for expats on how to file annual tax returns in Thailand.',
    content: `
## Who Must File?

You must file a Thai tax return if:
- You are a Thai tax resident (180+ days in Thailand)
- Your annual income exceeds 120,000 THB (single) or 220,000 THB (married)
- You have Thai-sourced income subject to tax

## Filing Deadline

The deadline for filing your annual tax return is **March 31** of the following year. For example, 2024 income must be filed by March 31, 2025.

Online filing via the RD Smart Tax app may extend this deadline by 8 days.

## Required Documents

1. **Tax Certificates (Withholding Tax Certificates)**
   - From your employer (Form 50 Tawi)
   - From banks (interest income)
   - From other payers

2. **Personal Documents**
   - Thai ID or passport
   - Tax ID number

3. **Supporting Documents**
   - Marriage certificate (for spouse allowance)
   - Birth certificates (for child allowance)
   - Insurance premium receipts
   - Donation receipts

## Filing Methods

### Online (Recommended)
- RD Smart Tax app
- E-filing via rd.go.th
- Faster processing and longer deadline

### In Person
- Visit your local Revenue Department office
- Bring all original documents
- Submit before March 31

## Common Mistakes to Avoid

1. Missing the deadline
2. Forgetting to claim allowances
3. Not reporting all income sources
4. Incorrect calculations
5. Missing required attachments
    `,
    publishedAt: '2024-03-01',
    readTime: 6,
    category: 'Filing'
  },
  {
    slug: 'foreign-income-thailand-tax',
    title: 'Foreign Income and Thailand Tax: What You Need to Know',
    excerpt: 'Understanding when and how foreign-sourced income is taxed in Thailand.',
    content: `
## The Remittance Rule

Thailand historically taxed foreign-sourced income only if:
1. You are a Thai tax resident
2. The income is remitted (brought) into Thailand
3. The income is remitted in the same year it was earned

## Recent Changes

The Revenue Department has announced changes to foreign income taxation. Starting from 2024, foreign-sourced income brought into Thailand may be taxable regardless of when it was earned.

### Key Changes:
- Income earned in prior years may now be taxable when remitted
- Stricter enforcement expected
- Some exemptions still apply

## Types of Foreign Income

### Employment Income
Income from work performed outside Thailand while employed by a foreign company.

### Investment Income
Dividends, interest, and capital gains from foreign investments.

### Rental Income
Income from properties located outside Thailand.

### Business Income
Profits from businesses operated outside Thailand.

## Tax Treaties

Thailand has tax treaties with many countries that may:
- Reduce withholding rates
- Provide exemptions for certain income types
- Allow foreign tax credits

### Common Treaty Partners:
- United States
- United Kingdom
- Australia
- Singapore
- Japan
- Germany

## Planning Strategies

1. **Timing:** Consider when to remit foreign income
2. **Documentation:** Keep records of income sources and dates
3. **Tax Credits:** Claim credits for taxes paid abroad
4. **Professional Advice:** Complex situations require expert guidance
    `,
    publishedAt: '2024-03-15',
    readTime: 8,
    category: 'International'
  },
  {
    slug: 'social-security-contributions-thailand',
    title: 'Social Security Contributions in Thailand Explained',
    excerpt: 'Everything you need to know about Thai social security contributions and benefits.',
    content: `
## Overview

Thailand's social security system provides coverage for employees in companies with one or more employees. Contributions are shared between employer and employee.

## Contribution Rates

| Party | Contribution Rate | Maximum Monthly Contribution |
|-------|------------------|------------------------------|
| Employee | 5% | 750 THB |
| Employer | 5% | 750 THB |
| Government | 2.75% | - |

The maximum wage base for contributions is 15,000 THB per month.

## Coverage Benefits

### Medical Care
- Outpatient and inpatient treatment
- Dental care (limited)
- Maternity benefits

### Disability
- Monthly payments for work-related disabilities
- Non-work related disability coverage

### Death Benefits
- Funeral grant
- Survivor benefits

### Unemployment
- 30-50% of salary for up to 6 months
- Requires minimum contribution period

### Retirement
- Monthly pension after age 55
- Requires minimum 180 months of contributions

## Tax Treatment

Social security contributions are:
- Deductible from your taxable income
- Limited to actual contributions (max 9,000 THB annually)

## For Expats

- Mandatory for employees of Thai companies
- Exemptions may apply under bilateral agreements
- Benefits continue after leaving employment (subject to conditions)
    `,
    publishedAt: '2024-04-01',
    readTime: 5,
    category: 'Employment'
  },
  {
    slug: 'freelancer-tax-guide-thailand',
    title: 'Freelancer Tax Guide: Navigating Thai Taxes as a Self-Employed Professional',
    excerpt: 'Complete guide to understanding your tax obligations as a freelancer or independent contractor in Thailand.',
    content: `
## Freelancing in Thailand

Whether you're a digital nomad, consultant, or independent professional, understanding your tax obligations is essential for compliance and financial planning.

## Income Categories for Freelancers

Thai tax law classifies income into categories under Section 40 of the Revenue Code. As a freelancer, your income likely falls under one of these:

### Section 40(2) - Employment-like Services
- Contract work resembling employment
- Fees for services with specific deliverables

### Section 40(6) - Liberal Professions
- Doctors, lawyers, accountants, engineers
- Architects, artists, and performers
- Flat-rate deduction: 30% (up to 60% for certain professions)

### Section 40(7) - Contractors
- Construction and installation work
- Project-based technical services
- Flat-rate deduction: 40%

### Section 40(8) - Business Income
- Trading, selling goods
- General services and consulting
- Flat-rate deduction: 60%

## Expense Deductions

You have two options for expense deductions:

### Flat-Rate Method
- Simple, no documentation required
- Fixed percentage based on income type
- Best for those with low actual expenses

### Actual Expense Method
- Requires detailed records and receipts
- Better if actual expenses exceed flat rate
- Must maintain proper accounting

## Filing Requirements

### PND90 (Annual Return)
- Due by March 31 (or April 8 online)
- Required if income exceeds 60,000 THB (single) or 120,000 THB (married)

### PND94 (Mid-Year Return)
- Due by September 30
- Required for income received January-June exceeding thresholds
- Acts as prepayment toward annual tax

## Tips for Freelancers

1. **Track Everything:** Keep receipts and records for all business expenses
2. **Set Aside Tax Money:** Reserve 10-20% of income for taxes
3. **Understand Withholding:** Clients may withhold 3% tax at source
4. **Consider Registration:** Formal business registration may offer benefits
    `,
    publishedAt: '2024-04-15',
    readTime: 8,
    category: 'Freelance'
  },
  {
    slug: 'flat-rate-vs-actual-expenses',
    title: 'Flat-Rate vs Actual Expenses: Which Deduction Method is Right for You?',
    excerpt: 'Learn how to choose between flat-rate and actual expense deductions to minimize your Thai tax liability.',
    content: `
## Understanding Your Options

Thai tax law allows self-employed individuals and freelancers to choose between two expense deduction methods. Choosing wisely can significantly reduce your tax bill.

## Flat-Rate Deduction

### How It Works
The government allows a fixed percentage deduction based on your income type, no questions asked.

### Flat-Rate Percentages by Income Type

| Income Type | Section | Flat Rate |
|------------|---------|-----------|
| Liberal Professions (medical, legal) | 40(6) | 60% |
| Liberal Professions (other) | 40(6) | 30% |
| Contractors | 40(7) | 40% |
| Business/Trading | 40(8) | 60% |
| Rental Income | 40(5) | 30% |

### Pros:
- Simple, no documentation needed
- Guaranteed deduction percentage
- Less administrative burden

### Cons:
- May be lower than actual expenses
- One-size-fits-all approach
- Can't claim specific high expenses

## Actual Expense Deduction

### How It Works
Deduct your real business expenses with proper documentation.

### Eligible Expenses:
- Office rent and utilities
- Equipment and supplies
- Professional services (accounting, legal)
- Travel for business purposes
- Marketing and advertising
- Software and subscriptions
- Internet and phone (business portion)

### Pros:
- Potentially higher deductions
- Reflects true business costs
- Fair for high-expense businesses

### Cons:
- Requires meticulous record-keeping
- Subject to audit scrutiny
- More time-consuming

## How to Choose

### Use Flat-Rate When:
- Your actual expenses are below the flat rate
- You have poor expense documentation
- You want simplicity over optimization
- You're just starting out

### Use Actual Expenses When:
- Your expenses exceed the flat rate
- You have good accounting systems
- You have significant equipment costs
- You rent expensive office space

## Example Comparison

**Scenario:** Consultant earning 1,000,000 THB with 450,000 THB actual expenses

| Method | Deduction | Taxable Income |
|--------|-----------|----------------|
| Flat-Rate (40%) | 400,000 THB | 600,000 THB |
| Actual Expenses | 450,000 THB | 550,000 THB |

**Winner:** Actual expenses saves approximately 7,500 THB in tax.

## Our Calculator's Auto-Compare Feature

Our calculator automatically computes both methods and shows you which option results in lower taxes, taking the guesswork out of the decision.
    `,
    publishedAt: '2024-05-01',
    readTime: 7,
    category: 'Freelance'
  },
  {
    slug: 'pnd94-mid-year-tax-filing',
    title: 'PND94 Explained: Mid-Year Tax Filing for Freelancers',
    excerpt: 'Understanding when and how to file your PND94 mid-year tax return as a self-employed individual in Thailand.',
    content: `
## What is PND94?

PND94 is a mid-year tax return required for individuals with income from certain categories, primarily self-employed and business income (Sections 40(5) through 40(8)).

## Who Must File PND94?

You must file PND94 if:
- You received income under Sections 40(5), 40(6), 40(7), or 40(8)
- Your income from January to June exceeds:
  - **60,000 THB** if single
  - **120,000 THB** if married filing jointly

## Filing Deadline

**September 30** of the same tax year.

For income received January-June 2024, file by September 30, 2024.

Online filing via RD Smart Tax may extend this by 8 days.

## How PND94 Works

### Step 1: Calculate Mid-Year Income
Total all qualifying income received from January 1 to June 30.

### Step 2: Estimate Annual Income
Project your full-year income (you can estimate the July-December portion).

### Step 3: Calculate Tax on Annual Estimate
Apply standard deductions and tax brackets to estimated annual income.

### Step 4: Pay Half the Estimated Tax
PND94 requires payment of 50% of your estimated annual tax liability.

## Example Calculation

**Mid-year income:** 400,000 THB
**Estimated annual income:** 800,000 THB
**Estimated annual tax:** 52,500 THB
**PND94 payment due:** 26,250 THB

## What Happens at Year-End?

When you file PND90 (annual return):
- Your actual annual income is calculated
- PND94 payment is credited against your total tax
- You either pay the difference or receive a refund

## Common Mistakes to Avoid

1. **Missing the deadline:** Penalties apply for late filing
2. **Underestimating income:** May result in penalty for underpayment
3. **Forgetting to file:** PND94 is separate from your annual return
4. **Not claiming deductions:** You can estimate deductions for mid-year filing

## Tips for Freelancers

- Set calendar reminders for September 30
- Keep running totals of income throughout the year
- Save money monthly for tax payments
- Consider quarterly estimated taxes if income is irregular
    `,
    publishedAt: '2024-05-15',
    readTime: 6,
    category: 'Freelance'
  },
  {
    slug: 'withholding-tax-freelancers-thailand',
    title: 'Withholding Tax for Freelancers: Getting Credit for Tax Already Paid',
    excerpt: 'How to track, document, and claim credit for withholding tax deducted by your Thai clients.',
    content: `
## Understanding Withholding Tax

When Thai companies pay freelancers, they're often required to withhold tax at source and remit it to the Revenue Department on your behalf.

## Standard Withholding Rates

| Income Type | Withholding Rate |
|-------------|------------------|
| Service fees (40(2)) | 3% |
| Professional fees (40(6)) | 3% |
| Contractor payments (40(7)) | 3% |
| Advertising services | 2% |
| Transport services | 1% |
| Rental payments | 5% |

## How It Works

### Example:
You invoice a Thai company 100,000 THB for consulting services.

| Item | Amount |
|------|--------|
| Invoice total | 100,000 THB |
| Withholding tax (3%) | 3,000 THB |
| Amount received | 97,000 THB |

The company sends the 3,000 THB to the Revenue Department under your tax ID.

## Withholding Tax Certificates

### What to Collect
Request a **Withholding Tax Certificate (50 Tawi)** from every client who withholds tax.

### Information on the Certificate:
- Your name and tax ID
- Payer's name and tax ID
- Income amount
- Tax withheld
- Date of payment

### Why It Matters
Without certificates, you cannot claim credit for tax already paid!

## Claiming Your Credit

When filing your annual return:

1. **Total all withholding certificates**
2. **Enter total on PND90** in the withholding tax section
3. **Attach certificates** to your filing (or keep for records if filing online)
4. **Receive credit** against your calculated tax liability

## Refund Scenarios

If withholding tax exceeds your actual tax liability, you're entitled to a refund.

### Example:
- Annual income: 500,000 THB
- Tax withheld: 15,000 THB
- Actual tax owed: 12,500 THB
- **Refund due: 2,500 THB**

## Best Practices

1. **Request certificates immediately** after payment
2. **Verify tax ID** is correct on certificates
3. **Keep copies** of all certificates
4. **Track monthly** in a spreadsheet
5. **Reconcile annually** before filing

## What If a Client Won't Withhold?

Some clients, especially individuals or small businesses, may not withhold tax. In these cases:
- You're responsible for reporting full income
- No withholding credit available
- You'll pay full tax at filing time

## International Clients

Foreign clients typically don't withhold Thai tax. You must:
- Report full income received
- Pay tax at filing time
- No withholding credit applies
    `,
    publishedAt: '2024-06-01',
    readTime: 7,
    category: 'Freelance'
  },
  {
    slug: 'vat-registration-freelancers',
    title: 'VAT Registration for Freelancers: When 1.8 Million THB Changes Everything',
    excerpt: 'Understanding VAT registration requirements, thresholds, and implications for high-earning freelancers in Thailand.',
    content: `
## VAT Basics

Value Added Tax (VAT) in Thailand is 7% and applies to the sale of goods and services. Most freelancers start exempt but must register once they exceed certain thresholds.

## The 1.8 Million THB Threshold

You **must register for VAT** if your annual turnover exceeds **1,800,000 THB**.

### What Counts as Turnover?
- Gross income from services
- Sales of goods
- Before any expense deductions

### Timeline:
Register within 30 days of exceeding the threshold.

## Voluntary Registration

You can register for VAT even below the threshold if:
- Your clients prefer working with VAT-registered suppliers
- You want to claim input VAT credits
- You're building toward the threshold

## How VAT Works for Freelancers

### Collecting VAT (Output Tax)
Add 7% VAT to your invoices:
- Service fee: 100,000 THB
- VAT (7%): 7,000 THB
- **Invoice total: 107,000 THB**

### Claiming VAT (Input Tax)
Recover VAT paid on business expenses:
- Office supplies: 10,700 THB (including 700 THB VAT)
- You can claim back the 700 THB

### Net VAT Payment
| Item | Amount |
|------|--------|
| VAT collected | 7,000 THB |
| VAT paid on expenses | 700 THB |
| **Net VAT due** | **6,300 THB** |

## Filing Requirements

### PP30 Monthly Return
- Due by the 15th of the following month
- Report all sales and purchases
- Pay net VAT due

### Record Keeping
- Maintain purchase and sales journals
- Keep tax invoices for 5 years
- Issue proper tax invoices to clients

## Implications of VAT Registration

### Pros:
- Claim input VAT on business purchases
- Professional image with corporate clients
- Required for government contracts

### Cons:
- Administrative burden
- Monthly filing requirements
- Cash flow impact (collect then remit)
- Penalties for non-compliance

## Avoiding Common Pitfalls

1. **Monitor your income** monthly to anticipate threshold
2. **Register on time** - late registration has penalties
3. **Issue proper invoices** with all required information
4. **File monthly** even if no transactions
5. **Keep immaculate records** for audits

## When to Get Help

Consider hiring an accountant if:
- You're approaching the threshold
- VAT calculations confuse you
- You have complex expense claims
- You want to focus on your work, not paperwork
    `,
    publishedAt: '2024-06-15',
    readTime: 8,
    category: 'Freelance'
  },
  {
    slug: 'digital-nomad-taxes-thailand',
    title: 'Digital Nomad Taxes in Thailand: Working Remotely for Foreign Clients',
    excerpt: 'Tax considerations for digital nomads and remote workers earning foreign income while living in Thailand.',
    content: `
## The Digital Nomad Reality

Many remote workers live in Thailand while earning from foreign clients or employers. The tax implications can be complex.

## Key Questions to Answer

1. Are you a Thai tax resident? (180+ days)
2. Where is your income sourced?
3. Do you bring money into Thailand?
4. Do you have a valid work permit?

## Tax Residency Impact

### If You're a Thai Tax Resident (180+ Days):

**Pre-2024 Rule:**
Foreign income was taxable only if:
- Earned abroad AND
- Remitted to Thailand in the same year

**2024 Onwards:**
Foreign income remitted to Thailand is taxable regardless of when earned.

### If You're a Non-Resident (<180 Days):
- Only Thai-sourced income is taxable
- Foreign income generally not taxable in Thailand

## Common Scenarios

### Scenario 1: Remote Employee of Foreign Company
- Working from Thailand for a US company
- Paid into a US bank account
- **Thai tax:** Potentially taxable if remitted to Thailand as a resident

### Scenario 2: Freelancer with International Clients
- Multiple clients from various countries
- Paid via PayPal/Wise to Thai account
- **Thai tax:** Likely taxable as income brought into Thailand

### Scenario 3: Digital Nomad, <180 Days
- Moves between countries
- Not a Thai tax resident
- **Thai tax:** Generally no obligation for foreign income

## Practical Considerations

### Banking and Remittances
- Money transferred to Thai accounts = remittance
- ATM withdrawals from foreign cards = remittance
- Credit card payments in Thailand = grey area

### Documentation
- Track days in Thailand carefully
- Keep records of income sources
- Document when income was earned vs. remitted

## Tax Planning Strategies

### Legal Approaches:
1. **Stay under 180 days** if your situation allows
2. **Time remittances** strategically (pre-2024 income may be exempt)
3. **Use tax treaties** if your home country has one with Thailand
4. **Claim foreign tax credits** for taxes paid elsewhere

### What NOT to Do:
- Don't assume "no one checks" - enforcement is increasing
- Don't ignore filing requirements
- Don't mix earned years if you can document separately

## Work Permit Considerations

Technically, working remotely in Thailand requires a work permit. This is a legal grey area that many digital nomads navigate, but it's separate from tax obligations.

Tax obligations exist regardless of work permit status.

## Getting Professional Help

Given the complexity, consider consulting:
- A Thai tax accountant familiar with expat issues
- An international tax advisor
- Your home country's tax authority for treaty benefits

## The Bottom Line

Digital nomad taxation is evolving. Thailand is increasing enforcement on foreign income. Plan carefully, document thoroughly, and consider professional advice for your specific situation.
    `,
    publishedAt: '2024-07-01',
    readTime: 9,
    category: 'Freelance'
  },
  {
    slug: 'freelancer-record-keeping-thailand',
    title: 'Record Keeping for Thai Freelancers: Stay Organized, Stay Compliant',
    excerpt: 'Essential record-keeping practices for freelancers to maximize deductions and survive a tax audit.',
    content: `
## Why Records Matter

Good record keeping helps you:
- Claim maximum legitimate deductions
- File accurate tax returns
- Survive a Revenue Department audit
- Make informed business decisions

## What to Keep

### Income Records
- Invoices issued to all clients
- Payment receipts and bank statements
- Withholding tax certificates (50 Tawi)
- Contracts and agreements

### Expense Records
- Receipts for all business purchases
- Tax invoices (for VAT purposes)
- Bank and credit card statements
- Utility bills (business portion)

### Supporting Documents
- Travel records and itineraries
- Meeting notes and project records
- Time tracking logs
- Mileage logs for vehicle expenses

## How Long to Keep Records

| Record Type | Retention Period |
|-------------|------------------|
| General tax records | 5 years |
| VAT records | 5 years |
| Asset purchase records | Life of asset + 5 years |
| Contracts | Duration + 5 years |

## Organizing Your Records

### Digital System (Recommended)
1. **Cloud storage** - Google Drive, Dropbox, or similar
2. **Folder structure:**
   \`\`\`
   2024/
   ├── Income/
   │   ├── Invoices/
   │   └── Withholding_Certificates/
   ├── Expenses/
   │   ├── Office/
   │   ├── Equipment/
   │   ├── Travel/
   │   └── Services/
   └── Banking/
   \`\`\`
3. **Scan receipts** immediately (use phone apps)
4. **Name files consistently** (YYYY-MM-DD_Vendor_Amount)

### Physical Records
- Keep originals in labeled folders
- Store in a safe, dry location
- Consider a fireproof safe for critical documents

## Monthly Routine

### Week 1: Collect
- Gather all receipts from the previous month
- Download bank statements
- Collect withholding certificates

### Week 2: Organize
- Scan and file physical receipts
- Categorize expenses
- Update your tracking spreadsheet

### Week 3: Reconcile
- Match bank transactions to receipts
- Identify missing documentation
- Follow up on outstanding invoices

### Week 4: Review
- Check income vs. expenses
- Estimate tax liability
- Adjust pricing or spending if needed

## Tools for Freelancers

### Accounting Software
- Wave (free)
- QuickBooks
- Xero
- Zoho Books

### Receipt Scanning
- Expensify
- Receipt Bank
- Adobe Scan (free)

### Spreadsheets
A simple Google Sheet can work:
| Date | Description | Category | Amount | VAT | Receipt |
|------|-------------|----------|--------|-----|---------|
| 2024-01-15 | Office supplies | Office | 500 | 33 | Yes |

## Audit Survival Tips

If the Revenue Department requests documentation:
1. **Stay calm** - audits are routine
2. **Respond promptly** to requests
3. **Provide organized records** - good organization shows professionalism
4. **Be honest** - never fabricate or alter documents
5. **Get help** - consider hiring an accountant for audit support

## Common Record-Keeping Mistakes

1. **Mixing personal and business** expenses
2. **Throwing away receipts** too soon
3. **Not backing up** digital records
4. **Waiting until tax time** to organize
5. **Keeping incomplete records** (missing dates, amounts, or purposes)
    `,
    publishedAt: '2024-07-15',
    readTime: 8,
    category: 'Freelance'
  },
  {
    slug: 'ltr-visa-tax-benefits',
    title: 'LTR Visa Tax Benefits: Thailand\'s Tax-Advantaged Residency for Expats',
    excerpt: 'Discover how Thailand\'s Long-Term Resident visa offers significant tax benefits including foreign income exemptions and reduced tax rates.',
    content: `
## What is the LTR Visa?

The Long-Term Resident (LTR) visa is Thailand's premium residency program designed to attract wealthy individuals, skilled professionals, and remote workers. Launched by the Board of Investment (BOI), the LTR visa offers substantial tax benefits that can significantly reduce your tax burden compared to standard visa holders.

## The Four LTR Visa Categories

### 1. Wealthy Global Citizens
- **Requirements:** USD 1 million+ in assets (including USD 500,000 in Thai assets)
- **Tax Benefit:** Complete exemption from Thai tax on foreign income

### 2. Wealthy Pensioners
- **Requirements:** Age 50+, annual pension/passive income of USD 80,000+ (or USD 40,000+ with USD 250,000 in Thai assets)
- **Tax Benefit:** Complete exemption from Thai tax on foreign income

### 3. Work-from-Thailand Professionals
- **Requirements:** Work for established overseas company, USD 80,000+ annual income for past 2 years
- **Tax Benefit:** Complete exemption from Thai tax on foreign income

### 4. Highly Skilled Professionals
- **Requirements:** Work in BOI-targeted industries, 5+ years experience or PhD
- **Tax Benefit:** 17% flat tax rate on Thai employment income (vs. progressive rates up to 35%)

## How LTR Tax Benefits Compare

| Visa Type | Foreign Income | Thai Income | Effective Benefit |
|-----------|---------------|-------------|-------------------|
| Regular Visa | Taxable if remitted (up to 35%) | Progressive (up to 35%) | Standard treatment |
| Thailand Privilege | Taxable if remitted (up to 35%) | Progressive (up to 35%) | No tax benefit |
| LTR (3 categories) | **Tax Exempt** | Progressive (up to 35%) | Major savings on foreign income |
| LTR Highly Skilled | Taxable if remitted | **17% flat rate** | Lower tax on high Thai earnings |

## Understanding the 2024 Foreign Income Rule Change

Prior to 2024, foreign income was only taxable if remitted to Thailand in the same year it was earned. Starting January 1, 2024, all foreign income remitted to Thailand is taxable regardless of when earned.

**This makes the LTR visa exemption even more valuable.**

For regular visa holders, any money brought into Thailand from overseas is now potentially taxable. LTR visa holders (except Highly Skilled) are completely exempt from this rule.

## Example Tax Savings

**Scenario:** A remote worker earning USD 100,000 annually from a US company, living in Thailand

**Without LTR Visa:**
- If remitting full income: approximately 1.5-2.5 million THB in Thai tax
- Must carefully plan remittances to minimize tax exposure

**With LTR Work-from-Thailand Visa:**
- Thai tax on foreign income: 0 THB
- Complete freedom to remit funds without tax consequences

## Eligibility Requirements Overview

### Documentation Typically Required:
1. Proof of income/assets (bank statements, tax returns)
2. Health insurance coverage
3. Criminal background check
4. Passport validity

### Application Process:
1. Apply through BOI website (ltr.boi.go.th)
2. Pay application fee (50,000 THB)
3. Processing time: typically 20 working days
4. Visa valid for 10 years (renewable)

## Important Compliance Notes

To maintain LTR tax benefits:
- Must hold valid LTR visa throughout the tax year
- Must comply with BOI reporting requirements
- Benefits apply only while meeting category qualifications
- Must file Thai tax returns (even if tax-exempt income)

## LTR vs. Tax Treaties (DTAs)

Some expats wonder whether tax treaties provide similar benefits to the LTR visa. Here's the key difference:

- **Tax Treaties:** Prevent double taxation by allowing credits, but don't eliminate Thai tax
- **LTR Visa:** Actually exempts foreign income from Thai tax entirely (for qualifying categories)

## Who Should Consider LTR?

The LTR visa is particularly valuable for:
- Digital nomads and remote workers with substantial income
- Retirees with significant overseas pensions or investments
- Wealthy individuals planning to move assets to Thailand
- Skilled professionals offered positions in BOI-promoted industries

## Key Takeaways

1. **Three LTR categories offer complete foreign income tax exemption** - a unique benefit not available with any other Thai visa
2. **LTR Highly Skilled offers 17% flat rate** on Thai employment income - significant savings for high earners
3. **Post-2024 rules make LTR more valuable** - standard visa holders now face tax on all remitted foreign income
4. **Thailand Privilege/Elite visas don't offer tax benefits** - only LTR provides preferential tax treatment
5. **Proper compliance is essential** - maintain eligibility to keep your tax benefits

## Resources

- BOI LTR Visa Portal: ltr.boi.go.th
- Thai Revenue Department: rd.go.th
- Use our tax calculator to compare scenarios with and without LTR benefits
    `,
    publishedAt: '2026-02-17',
    readTime: 10,
    category: 'International'
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

export function getRelatedArticles(currentSlug: string, limit: number = 3): Article[] {
  return articles
    .filter(article => article.slug !== currentSlug)
    .slice(0, limit);
}
