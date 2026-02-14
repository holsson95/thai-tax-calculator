import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MonthlyWithholding from './components/MonthlyWithholding';
import AnnualTaxWizard from './components/AnnualTaxWizard';
import HomePage from './pages/HomePage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import FAQPage from './pages/FAQPage';

// Main App component with routing
const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/monthly-withholding" element={<MonthlyWithholding />} />
        <Route path="/annual-tax" element={<AnnualTaxWizard />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticleDetailPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
