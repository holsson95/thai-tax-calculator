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
            <div className="bg-gray-100 min-h-screen flex items-center justify-center py-8 px-4">
              <Helmet>
                <title>Annual Tax Calculator | Thai Tax Calculator</title>
                <meta name="description" content="Calculate your annual Thai income tax liability. Free calculator for salaried employees, freelancers, sole proprietors, and company owners in Thailand." />
                <link rel="canonical" href="https://mythaitaxes.com/annual-tax/" />
              </Helmet>
              <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-2xl w-full">
                <div className="flex justify-between items-center mb-6">
                  <Link to="/" className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm">Home</Link>
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
      </Routes>
    </Layout>
  );
};

export default App;
