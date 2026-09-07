import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://mythaitaxes.com';
const CONTACT_EMAIL = 'info@mythaitaxes.com';
const TAX_RULES_URL = 'https://github.com/holsson95/thai-tax-calculator/blob/main/TAX_RULES.md';

const AboutPage: React.FC = () => {
  const title = 'About | My Thai Taxes';
  const description =
    'What My Thai Taxes is, why it was built, how the tax calculations work, how figures are sourced and reviewed, and who maintains the site.';

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/about/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/about/`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">About My Thai Taxes</h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">

        <h2 className="text-xl font-semibold text-gray-900 pt-2">What is My Thai Taxes?</h2>

        <p>
          My Thai Taxes is a free online calculator and information resource designed to help individuals
          understand and estimate their Thai personal income tax obligations. Whether you are a salaried
          employee, freelancer, sole proprietor, or company director, the tools here are built to walk
          you through Thailand's tax system in plain language — without requiring an accounting background.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 pt-2">Why we built it</h2>

        <p>
          Thailand's personal income tax rules can be confusing, especially for expats and digital nomads
          navigating the 180-day residency rule, foreign income remittance requirements, and the range
          of allowances available to reduce taxable income. Good information exists, but it's scattered
          across Revenue Department PDFs, accounting-firm blog posts, and forum threads that often
          disagree with each other — and most calculators online don't show their work. My Thai Taxes
          was built to bring that into one place: a calculator that shows every step of the math, and
          plain-language guides that explain the reasoning behind it, so you can understand your own
          tax position rather than just trusting a number.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 pt-2">How the calculations work</h2>

        <p>
          The <Link to="/annual-tax/" className="text-blue-600 hover:underline">annual tax calculator</Link>{' '}
          follows the same structure the Revenue Department uses for a PND90/91 return: it takes your
          income by type, applies the relevant flat-rate or actual-expense deduction, subtracts your
          allowances (personal, spouse, children, parents, insurance, retirement funds, donations, and
          so on), and runs the resulting taxable income through Thailand's progressive tax brackets
          (0% to 35%). The{' '}
          <Link to="/monthly-withholding/" className="text-blue-600 hover:underline">monthly withholding
          estimator</Link>{' '}
          uses the same underlying logic to check whether the right amount of tax is being deducted from
          a salary each month. Every step is shown in the results, not hidden behind a single output
          number — you can see exactly which deduction, allowance, or bracket produced your result.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 pt-2">How information is sourced</h2>

        <p>
          Every tax rule, rate, and threshold used in the calculator is tracked in a public sources
          registry — the{' '}
          <a
            href={TAX_RULES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Thai Tax Rules Registry
          </a>{' '}
          in this site's open-source repository. For each figure, the registry records where it came
          from (ideally a primary Thai Revenue Department document, otherwise reputable secondary
          sources such as major accounting firms or Thai law firms), what conditions or limitations
          apply, and whether that figure has been independently verified. Where a value could not be
          confirmed against a primary source, or where sources disagree, that is flagged openly rather
          than presented as settled fact. This is a deliberate choice: we'd rather show you where our
          confidence is lower than quietly guess.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 pt-2">Who maintains the site</h2>

        <p>
          My Thai Taxes is built and maintained independently by a single developer. It is not run by a
          law firm, accounting firm, or the Thai government, and nothing on this site should be taken as
          advice from a licensed tax professional — see the disclaimer below. The site is a personal
          project aimed at making Thai tax information more transparent and accessible.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 pt-2">How often information is reviewed</h2>

        <p>
          Tax rules and figures are reviewed periodically, and whenever a change to Thai tax law is
          identified. Each figure in the calculator is tracked in the sources registry above along with
          its source and verification status, so outdated or disputed values can be caught and corrected
          rather than sitting unnoticed. If you spot something that looks wrong or out of date, please{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">let us know</a> —
          see Contact below.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 pt-2">What the site offers</h2>

        <ul className="space-y-3">
          {[
            {
              title: 'Annual Tax Calculator',
              desc: 'A step-by-step calculator covering income, deductions, allowances, withholding, and a full tax breakdown — with a downloadable PDF filing reference at the end.',
              to: '/annual-tax/',
            },
            {
              title: 'Monthly Withholding Estimator',
              desc: 'A quick tool to check whether the correct amount of tax is being deducted from your monthly salary.',
              to: '/monthly-withholding/',
            },
            {
              title: 'Articles',
              desc: 'In-depth guides on Thai tax topics including residency rules, freelancer obligations, double tax agreements, retirement income, and more.',
              to: '/articles/',
            },
            {
              title: 'FAQ',
              desc: 'Answers to the most common questions from expats, digital nomads, and Thai residents about filing, deductions, and staying compliant.',
              to: '/faq/',
            },
          ].map(({ title, desc, to }) => (
            <li key={to} className="flex gap-3">
              <span className="text-blue-500 mt-1 flex-shrink-0">→</span>
              <span>
                <Link to={to} className="font-medium text-gray-900 hover:text-blue-500 transition-colors">
                  {title}
                </Link>
                {' — '}{desc}
              </span>
            </li>
          ))}
        </ul>

        <h2 id="for-developers" className="text-xl font-semibold text-gray-900 pt-2">
          For developers &amp; AI agents
        </h2>

        <p>
          The annual tax calculation is also available as a free, open API — useful for embedding a Thai
          tax estimate elsewhere, or for AI agents that need to compute a live number rather than guess
          one. No API key or account required.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg px-5 py-4 text-sm text-gray-800 space-y-3">
          <div>
            <span className="font-medium text-gray-900">MCP endpoint</span>{' '}
            (Streamable HTTP, tool name <code className="text-xs bg-white px-1 py-0.5 rounded border border-blue-200">calculate_thai_annual_income_tax</code>):
            <pre className="mt-2 bg-white border border-blue-200 rounded p-3 text-xs overflow-x-auto">
              https://mythaitaxes-mcp.hannwill999.workers.dev/mcp
            </pre>
          </div>
          <div>
            <span className="font-medium text-gray-900">REST endpoint</span> (plain <code className="text-xs bg-white px-1 py-0.5 rounded border border-blue-200">POST</code> JSON, same calculation):
            <pre className="mt-2 bg-white border border-blue-200 rounded p-3 text-xs overflow-x-auto">
{`curl -X POST https://mythaitaxes-mcp.hannwill999.workers.dev/api/calculate-annual-tax \\
  -H "Content-Type: application/json" \\
  -d '{"annualIncome": 800000, "maritalStatus": "married"}'`}
            </pre>
          </div>
          <p className="text-xs text-gray-600">
            Covers salaried-employee income tax for now. Results are estimates — see the disclaimer below.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 pt-2">Disclaimer</h2>

        <div className="bg-amber-50 border border-amber-200 rounded-lg px-5 py-4 text-sm text-amber-800">
          The calculators and articles on this site are for informational and estimation purposes only.
          They do not constitute professional tax advice and should not be relied upon as a substitute
          for guidance from a qualified Thai tax advisor or accountant. Tax rules can change — always
          verify current regulations with the{' '}
          <a
            href="https://www.rd.go.th/english/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-amber-900 font-medium"
          >
            Thai Revenue Department
          </a>{' '}
          or a licensed professional before filing.
        </div>

        <h2 className="text-xl font-semibold text-gray-900 pt-2">Contact</h2>

        <p>
          For questions, feedback, or corrections, reach out at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">
            {CONTACT_EMAIL}
          </a>
          . If you spot an error in any article or calculator, please get in touch — accuracy matters
          and updates are made as Thai tax rules change.
        </p>

      </div>
    </div>
  );
};

export default AboutPage;
