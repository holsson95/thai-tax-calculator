import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { captureAttribution } from '../../utils/attribution';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    // First-touch UTM/referrer, kept in sessionStorage and only ever sent with a lead the visitor submits.
    captureAttribution(location, document.referrer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-paper-ground">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
