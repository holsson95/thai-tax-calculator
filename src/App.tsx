import React, { Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import MonthlyWithholding from './components/MonthlyWithholding';
import HomePage from './pages/HomePage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import FAQPage from './pages/FAQPage';
import SearchPage from './pages/SearchPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AboutPage from './pages/AboutPage';

const AnnualTaxWizard = React.lazy(() => import('./components/AnnualTaxWizard'));

const annualTaxCalculatorSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Thai Annual Tax Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://mythaitaxes.com/annual-tax/',
  description: 'Free calculator that estimates annual Thai personal income tax liability for salaried employees, freelancers, sole proprietors, and company owners, including deductions and allowances.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Supports salaried employees, freelancers, sole proprietors, and company owners',
    'Covers standard allowances, deductions, and progressive tax brackets',
    'Downloadable PDF summary of results',
  ],
};

// Main App component with routing
const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/monthly-withholding" element={<MonthlyWithholding />} />
        <Route path="/annual-tax" element={
          <Suspense fallback={
            <div className="bg-gray-100 min-h-screen py-8 px-4">
              <Helmet>
                <title>Annual Tax Calculator | Thai Tax Calculator</title>
                <meta name="description" content="Calculate your annual Thai income tax liability. Free calculator for salaried employees, freelancers, sole proprietors, and company owners in Thailand." />
                <link rel="canonical" href="https://mythaitaxes.com/annual-tax/" />
                <script type="application/ld+json">{JSON.stringify(annualTaxCalculatorSchema)}</script>
              </Helmet>
              <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-2xl w-full mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <Link to="/" className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm">Home</Link>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">Annual Tax Calculator</h1>
                <p className="text-gray-600 mb-4">
                  Estimate your annual Thai personal income tax liability for free. Walk through a
                  guided form covering income, deductions, and allowances, and get a full breakdown
                  of your tax owed — plus a downloadable PDF summary.
                </p>
                <ul className="text-gray-600 text-sm space-y-1.5 mb-6 list-disc list-inside">
                  <li>Supports salaried employees, freelancers, sole proprietors, and company owners</li>
                  <li>Covers standard allowances, deductions, and progressive tax brackets</li>
                  <li>Free, no signup required, runs entirely in your browser</li>
                </ul>
                <p className="text-center text-gray-500">Loading calculator…</p>
              </div>
            </div>
          }>
            <AnnualTaxWizard />
          </Suspense>
        } />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticleDetailPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
