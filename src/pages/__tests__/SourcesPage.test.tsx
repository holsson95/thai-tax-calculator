import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SourcesPage from '../SourcesPage';
import { TAX_SOURCES } from '../../data/sources';

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <SourcesPage />
      </MemoryRouter>
    </HelmetProvider>
  );

describe('SourcesPage', () => {
  it('renders the page heading and intro', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1, name: /Tax Sources & References/i })).toBeInTheDocument();
    expect(screen.getByText(/independent website and calculator/i)).toBeInTheDocument();
  });

  it('renders the verification process steps', () => {
    renderPage();
    expect(screen.getByText(/How we verify tax information/i)).toBeInTheDocument();
    expect(screen.getByText(/Identify the specific tax rule/i)).toBeInTheDocument();
  });

  it('links every official source out to its real URL', () => {
    renderPage();
    const officialSources = TAX_SOURCES.filter((s) => s.type === 'official');
    for (const source of officialSources) {
      const link = screen.getAllByRole('link', { name: source.title })[0];
      expect(link).toHaveAttribute('href', source.url);
    }
  });

  it('does not invent a Revenue Department rate page as a relied-upon source', () => {
    renderPage();
    expect(screen.queryByText(/rd\.go\.th\/english\/6045\.html/)).not.toBeInTheDocument();
    expect(screen.getByText(/has not been updated since before the current bracket structure/i)).toBeInTheDocument();
  });

  it('links to related resources that exist in the app', () => {
    renderPage();
    expect(screen.getByRole('link', { name: 'Thailand Tax Calculator' })).toHaveAttribute('href', '/annual-tax/');
    expect(screen.getByRole('link', { name: 'How Thai Income Tax Is Calculated' })).toHaveAttribute('href', '/methodology/');
  });

  it('provides a way to report incorrect information', () => {
    renderPage();
    expect(screen.getByText('info@mythaitaxes.com')).toHaveAttribute('href', 'mailto:info@mythaitaxes.com');
  });

  it('links a source back to the article(s) that cite the same URL', () => {
    renderPage();
    // rd-section-41 is cited (exact URL match) by understanding-thai-tax-residency
    // and foreign-income-thailand-tax — both should render a "Cited in" link.
    const links = screen.getAllByRole('link', { name: 'Am I a Thai Tax Resident? The 180-Day Rule, Explained With Examples' });
    expect(links.some((l) => l.getAttribute('href') === '/articles/understanding-thai-tax-residency/')).toBe(true);
  });
});
