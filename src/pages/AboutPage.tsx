import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.mythaitaxes.com';
const CONTACT_EMAIL = 'info@mythaitaxes.com';

const AboutPage: React.FC = () => {
  const title = 'About | My Thai Taxes';
  const description =
    'My Thai Taxes is a free Thai personal income tax calculator and resource for expats, freelancers, and residents living and working in Thailand.';

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

        <p>
          My Thai Taxes is a free online calculator and information resource designed to help individuals
          understand and estimate their Thai personal income tax obligations. Whether you are a salaried
          employee, freelancer, sole proprietor, or company director, the tools here are built to walk
          you through Thailand's tax system in plain language — without requiring an accounting background.
        </p>

        <p>
          Thailand's personal income tax rules can be confusing, especially for expats and digital nomads
          navigating the 180-day residency rule, foreign income remittance requirements, and the range
          of allowances available to reduce taxable income. This site exists to make that process clearer
          and more accessible.
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

        <h2 className="text-xl font-semibold text-gray-900 pt-2">Important disclaimer</h2>

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
