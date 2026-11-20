import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();

  // Don't show footer on wizard pages
  const path = location.pathname.replace(/\/$/, '');
  const isWizardPage = path === '/annual-tax' || path === '/monthly-withholding';

  if (isWizardPage) {
    return null;
  }

  const columns: { heading: string; links: [string, string][] }[] = [
    {
      heading: 'Calculators',
      links: [
        ['/', 'Quick estimate'],
        ['/annual-tax/', 'Annual return'],
        ['/monthly-withholding/', 'Monthly withholding'],
        ['/foreign-income-tax-calculator/', 'Foreign income'],
      ],
    },
    {
      heading: 'Guides',
      links: [
        ['/thailand-tax-2026/', '2026 tax guide'],
        ['/tax-examples/', 'Worked examples'],
        ['/articles/', 'Articles'],
        ['/faq/', 'FAQ'],
      ],
    },
    {
      heading: 'How it works',
      links: [
        ['/methodology/', 'Methodology'],
        ['/sources/', 'Sources'],
        ['/about/#for-developers', 'API'],
        ['/how-this-site-is-funded/', 'How this site is funded'],
      ],
    },
    {
      heading: 'Site',
      links: [
        ['/about/', 'About'],
        ['/contact/', 'Contact'],
        ['/privacy/', 'Privacy'],
      ],
    },
  ];

  return (
    <footer className="bg-desk-night text-white">
      <div className="perforation text-white/25" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div>
            <p className="text-xl font-extrabold tracking-[-0.02em]">MyThaiTaxes</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              Free Thai personal income tax estimates, with every rule traced to its Revenue Department source.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map(col => (
              <div key={col.heading}>
                <p className="field-label text-paper-canary">{col.heading}</p>
                <ul className="mt-3 space-y-2">
                  {col.links.map(([to, label]) => (
                    <li key={to}>
                      <Link to={to} className="text-sm text-white/80 transition-colors hover:text-white hover:underline">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>{new Date().getFullYear()} MyThaiTaxes. For informational purposes only.</p>
          <p>This calculator provides estimates only. Consult a qualified tax professional for official advice.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
