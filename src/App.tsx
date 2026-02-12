import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MonthlyWithholding from './components/MonthlyWithholding';
import AnnualTaxWizard from './components/AnnualTaxWizard';

// Home page component (extracted from old App)
const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-500 mb-2">
            Thai Tax Calculator
          </h1>
          <p className="text-gray-600 text-lg">
            Select the option that best fits your needs:
          </p>
        </div>

        <div className="space-y-4">
          {/* Link replaces window.location.href - no page reload! */}
          <Link to="/monthly-withholding" className="block">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-6 rounded-lg transition-colors w-full text-left">
              <h2 className="text-xl">Estimate my monthly tax withholding</h2>
              <p className="text-gray-300 text-sm mt-1">
                Find out how much tax should be deducted from your monthly salary.
              </p>
            </button>
          </Link>

          <Link to="/annual-tax" className="block">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-6 rounded-lg transition-colors w-full text-left">
              <h2 className="text-xl">Calculate my annual tax liability</h2>
              <p className="text-gray-300 text-sm mt-1">
                Get a detailed breakdown of your annual tax and potential refund.
              </p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main App component with routing
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/monthly-withholding" element={<MonthlyWithholding />} />
      <Route path="/annual-tax" element={<AnnualTaxWizard />} />
    </Routes>
  );
};

export default App;