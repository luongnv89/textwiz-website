import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import Seo from './Seo';
import StructuredData from './StructuredData';
import { ROUTE_SEO } from '../lib/routeSeo';

export default function Layout({ children }) {
  const { pathname, hash } = useLocation();
  const seo = ROUTE_SEO[pathname] ?? {
    title: 'Page',
    description: ROUTE_SEO['/'].description,
  };

  useEffect(() => {
    if (hash) {
      const sectionId = hash.slice(1);
      requestAnimationFrame(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      <Seo title={seo.title} description={seo.description} path={pathname} />
      <StructuredData path={pathname} />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
