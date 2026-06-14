import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MacAppStoreBadge from './MacAppStoreBadge';
import { publicUrl } from '../lib/publicUrl';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (!isHome) {
      navigate(`/#${sectionId}`);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md dark:bg-slate-900/95 dark:shadow-slate-900/40'
          : 'bg-white/80 backdrop-blur-sm dark:bg-slate-900/70 dark:backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 hover:opacity-80 transition"
            >
              <img src={publicUrl('/AppIcon.svg')} alt="TextWiz" className="h-10 w-10" />
              <span className="text-xl font-bold text-gray-900 dark:text-slate-100">TextWiz</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('wizards')}
              className="text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              Wizards
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              FAQ
            </button>
            <Link
              to="/getting-started"
              className="text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              Setup & API keys
            </Link>
            <Link
              to="/changelog"
              className="text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              Changelog
            </Link>
            <Link
              to="/feedback"
              className="text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              Feedback
            </Link>
            <MacAppStoreBadge height={36} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MacAppStoreBadge height={32} />
          </div>
        </div>
      </div>
    </nav>
  );
}
