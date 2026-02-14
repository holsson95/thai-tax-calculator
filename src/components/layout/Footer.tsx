import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();

  // Don't show footer on wizard pages
  const isWizardPage = location.pathname === '/annual-tax' || location.pathname === '/monthly-withholding';

  if (isWizardPage) {
    return null;
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 text-sm">
            {new Date().getFullYear()} Thai Tax Calculator. For informational purposes only.
          </div>
          <nav className="flex gap-6 text-sm">
            <Link to="/" className="text-gray-600 hover:text-blue-500 transition-colors">
              Calculator
            </Link>
            <Link to="/articles" className="text-gray-600 hover:text-blue-500 transition-colors">
              Articles
            </Link>
            <Link to="/faq" className="text-gray-600 hover:text-blue-500 transition-colors">
              FAQ
            </Link>
          </nav>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">
          This calculator provides estimates only. Consult a qualified tax professional for official advice.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
