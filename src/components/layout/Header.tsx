import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchValue('');
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [searchOpen]);

  // Don't show header on wizard pages (they have their own navigation)
  const path = location.pathname.replace(/\/$/, '');
  const isWizardPage = path === '/annual-tax' || path === '/monthly-withholding';

  if (isWizardPage) {
    return null;
  }

  const navLinks = [
    { path: '/', label: 'Calculator' },
    { path: '/foreign-income-tax-calculator/', label: 'Foreign Income' },
    { path: '/articles/', label: 'Articles' },
    { path: '/tax-examples/', label: 'Examples' },
    { path: '/faq/', label: 'FAQ' },
    { path: '/methodology/', label: 'Methodology' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path.replace(/\/$/, ''));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchValue.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
      setSearchOpen(false);
      setSearchValue('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-desk text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="MyThaiTaxes home">
            <svg viewBox="0 0 28 28" className="h-7 w-7" aria-hidden="true">
              <rect x="7" y="3" width="17" height="21" fill="#AFC7E8" transform="rotate(8 15 14)" />
              <rect x="5.5" y="4" width="17" height="21" fill="#F0E4BF" transform="rotate(3 14 14)" />
              <rect x="4" y="5" width="17" height="21" fill="#FFFDF5" />
              <path d="M7.5 11h10M7.5 15h10M7.5 19h6" stroke="#344A9B" strokeWidth="1.6" />
            </svg>
            <span className="text-xl font-extrabold tracking-[-0.02em]">MyThaiTaxes</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {searchOpen ? (
              /* Expanded search form */
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search articles and FAQs..."
                  className="w-72 border-2 border-paper-white bg-paper-white px-3 py-1.5 text-sm text-ink placeholder:text-ink-mute focus:outline-none"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap text-sm font-semibold text-white hover:text-paper-canary"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchValue(''); }}
                  aria-label="Close search"
                  className="text-white/70 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </form>
            ) : (
              /* Nav links + search icon */
              <>
                <nav className="flex items-center gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      aria-current={isActive(link.path) ? 'page' : undefined}
                      className={`border-b-2 py-1 text-[15px] font-medium transition-colors ${
                        isActive(link.path)
                          ? 'border-paper-canary text-white'
                          : 'border-transparent text-white/75 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search"
                  className="text-white/75 transition-colors hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white/85 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-white/20 py-4">
            <div className="flex flex-col gap-2">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="px-4 mb-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search articles and FAQs..."
                    className="w-full border-2 border-paper-white bg-paper-white px-4 py-2 pl-9 text-sm text-ink placeholder:text-ink-mute focus:outline-none"
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-mute"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </form>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                  className={`px-4 py-2 font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-paper-canary text-ink'
                      : 'text-white/85 hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
