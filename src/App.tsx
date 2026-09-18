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
import MethodologyPage from './pages/MethodologyPage';
import SourcesPage from './pages/SourcesPage';
import ContactPage from './pages/ContactPage';
import TaxExamplesPage from './pages/TaxExamplesPage';
import ThailandTax2026Page from './pages/ThailandTax2026Page';
import { ANNUAL_TAX_META, ANNUAL_TAX_SCHEMA } from './data/calculatorMeta';

const AnnualTaxWizard = React.lazy(() => import('./components/AnnualTaxWizard'));

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
                <title>{ANNUAL_TAX_META.title}</title>
                <meta name="description" content={ANNUAL_TAX_META.description} />
                <link rel="canonical" href={ANNUAL_TAX_META.canonicalUrl} />
                <meta property="og:title" content={ANNUAL_TAX_META.title} />
                <meta property="og:description" content={ANNUAL_TAX_META.description} />
                <meta property="og:url" content={ANNUAL_TAX_META.canonicalUrl} />
                <meta property="og:type" content="website" />
                <script type="application/ld+json">{JSON.stringify(ANNUAL_TAX_SCHEMA)}</script>
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
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Thailand's progressive tax brackets</h2>
                <p className="text-gray-600 text-sm mb-6">
                  Thailand taxes income progressively: the first 150,000 THB of taxable income is
                  exempt, and income above that is taxed in increasing bands from 5% up to 35% for
                  taxable income over 5,000,000 THB. Your effective tax rate is always lower than
                  your top marginal rate, since only the income within each bracket is taxed at
                  that bracket's rate.
                </p>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Frequently asked questions</h2>
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Who should use this calculator?</p>
                    <p className="text-sm text-gray-600">
                      Anyone filing a Thai PND 90/91 return — salaried employees, freelancers, sole
                      proprietors, and company owners — including expats with foreign income
                      remitted to Thailand.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Is my data saved anywhere?</p>
                    <p className="text-sm text-gray-600">
                      No. Your answers are kept only in your browser's session storage and nothing
                      is transmitted to a server.
                    </p>
                  </div>
                </div>
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
        <Route path="/methodology" element={<MethodologyPage />} />
        <Route path="/sources" element={<SourcesPage />} />
        <Route path="/tax-examples" element={<TaxExamplesPage />} />
        <Route path="/thailand-tax-2026" element={<ThailandTax2026Page />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
