import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import Seo from './Seo';
import { ROUTE_SEO } from '../lib/routeSeo';

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const seo = ROUTE_SEO[pathname] ?? {
    title: 'Page',
    description: ROUTE_SEO['/'].description,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      <Seo title={seo.title} description={seo.description} path={pathname} />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
