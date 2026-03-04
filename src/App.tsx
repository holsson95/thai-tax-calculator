import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
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
          <Suspense fallback={<div className="py-16 text-center text-gray-500">Loading calculator…</div>}>
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
