import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from './components/layout/Layout';
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
import NotFoundPage from './pages/NotFoundPage';
import ForeignIncomeCalculatorPage from './pages/ForeignIncomeCalculatorPage';
import FundingPage from './pages/FundingPage';
import ThankYouPage from './pages/ThankYouPage';
import AdminLeadsPage from './pages/AdminLeadsPage';
import CalculatorFrame, { SheetLoading } from './components/calculator/CalculatorFrame';
import { AnnualReference, MonthlyReference, ANNUAL_INTRO, MONTHLY_INTRO } from './components/calculator/reference';
import { RULES_TAX_YEAR } from './config/taxRules';
import { PAGE_LAST_UPDATED } from './config/contentDates';
import {
  ANNUAL_TAX_META,
  ANNUAL_TAX_SCHEMA,
  MONTHLY_WITHHOLDING_META,
  MONTHLY_WITHHOLDING_SCHEMA,
} from './data/calculatorMeta';

const AnnualTaxWizard = React.lazy(() => import('./components/AnnualTaxWizard'));
const MonthlyWithholding = React.lazy(() => import('./components/MonthlyWithholding'));

// Static fallback/pre-load content for /annual-tax/. Shared between the pre-hydration render
// (server AND initial client render, so they match) and the Suspense fallback shown while the
// lazy AnnualTaxWizard chunk is loading after hydration.
const AnnualTaxFallback: React.FC = () => (
  <>
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
    <CalculatorFrame
      title="Annual Tax Calculator"
      crumb="Annual tax"
      updated={PAGE_LAST_UPDATED.annualTax}
      intro={ANNUAL_INTRO}
      paper="canary"
      tab={`Annual return · tax year ${RULES_TAX_YEAR}`}
      reference={<AnnualReference />}
    >
      <SheetLoading>
        Supports salaried employees, freelancers, sole proprietors, and company owners. Covers standard allowances,
        deductions, and progressive tax brackets. Free, no signup required, runs entirely in your browser.
      </SheetLoading>
    </CalculatorFrame>
  </>
);

// Static fallback/pre-load content for /monthly-withholding/. Same role as
// AnnualTaxFallback above — shared between the pre-hydration render (server AND
// initial client render, so they match) and the Suspense fallback shown while the
// lazy MonthlyWithholding chunk is loading after hydration.
const MonthlyWithholdingFallback: React.FC = () => (
  <>
    <Helmet>
      <title>{MONTHLY_WITHHOLDING_META.title}</title>
      <meta name="description" content={MONTHLY_WITHHOLDING_META.description} />
      <link rel="canonical" href={MONTHLY_WITHHOLDING_META.canonicalUrl} />
      <meta property="og:title" content={MONTHLY_WITHHOLDING_META.title} />
      <meta property="og:description" content={MONTHLY_WITHHOLDING_META.description} />
      <meta property="og:url" content={MONTHLY_WITHHOLDING_META.canonicalUrl} />
      <meta property="og:type" content="website" />
      <script type="application/ld+json">{JSON.stringify(MONTHLY_WITHHOLDING_SCHEMA)}</script>
    </Helmet>
    <CalculatorFrame
      title="Monthly Withholding Estimator"
      crumb="Monthly withholding"
      updated={PAGE_LAST_UPDATED.monthlyWithholding}
      intro={MONTHLY_INTRO}
      paper="pink"
      tab={`Monthly withholding · tax year ${RULES_TAX_YEAR}`}
      reference={<MonthlyReference />}
    >
      <SheetLoading />
    </CalculatorFrame>
  </>
);

// Renders the plain fallback (no Suspense boundary at all) until the first client-side effect
// has run, then switches to the real Suspense + React.lazy boundary. Because renderToString()
// (used by scripts/prerender.mjs via src/entry-server.tsx) cannot resolve Suspense boundaries, it
// would otherwise inject a diagnostic <template data-msg="The server did not finish this
// Suspense boundary..."> comment into the static HTML (see TECHNICAL_SEO_022.md Issue T-01). By
// never rendering a <Suspense> element during SSR — and matching that exact same fallback-only
// output on the client's first render, before hydration — there is no Suspense boundary for
// renderToString to fail to resolve, and no hydration mismatch. The lazy chunk still only loads
// once the browser is on this route and has mounted (via the useEffect below), so the calculator
// bundle remains fully lazy-loaded for normal client-side navigation.
const AnnualTaxRoute: React.FC = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <AnnualTaxFallback />;
  }

  return (
    <Suspense fallback={<AnnualTaxFallback />}>
      <AnnualTaxWizard />
    </Suspense>
  );
};

// Same hydration-gate pattern as AnnualTaxRoute above, for the same reason:
// avoids a renderToString()/Suspense mismatch for /monthly-withholding/.
const MonthlyWithholdingRoute: React.FC = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <MonthlyWithholdingFallback />;
  }

  return (
    <Suspense fallback={<MonthlyWithholdingFallback />}>
      <MonthlyWithholding />
    </Suspense>
  );
};

// Main App component with routing
const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/monthly-withholding" element={<MonthlyWithholdingRoute />} />
        <Route path="/annual-tax" element={<AnnualTaxRoute />} />
        <Route path="/foreign-income-tax-calculator" element={<ForeignIncomeCalculatorPage />} />
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
        <Route path="/how-this-site-is-funded" element={<FundingPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/admin/leads" element={<AdminLeadsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
