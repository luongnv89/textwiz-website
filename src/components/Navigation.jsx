import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import MacAppStoreBadge from './MacAppStoreBadge';
import { publicUrl } from '../lib/publicUrl';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const navContentRef = useRef(null);
  const menuToggleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event) => {
      if (navContentRef.current && !navContentRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };
    const handleFocusOut = (event) => {
      if (!event.relatedTarget) return;
      if (navContentRef.current && !navContentRef.current.contains(event.relatedTarget)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusout', handleFocusOut);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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

  const handleMobileNavClick = (sectionId) => {
    scrollToSection(sectionId);
    closeMenu();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md dark:bg-slate-900/95 dark:shadow-slate-900/40'
          : 'bg-white/80 backdrop-blur-sm dark:bg-slate-900/70 dark:backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4" ref={navContentRef}>
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
              onClick={() => scrollToSection('pricing')}
              className="text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              Pricing
            </button>
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
              onClick={() => scrollToSection('pricing')}
              className="text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              FAQ
            </button>
            <Link
              to="/getting-started"
              className="hidden lg:inline-block text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              Setup & API keys
            </Link>
            <Link
              to="/changelog"
              className="hidden lg:inline-block text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              Changelog
            </Link>
            <Link
              to="/feedback"
              className="hidden lg:inline-block text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              Feedback
            </Link>
            <MacAppStoreBadge height={36} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <MacAppStoreBadge height={32} />
            <button
              ref={menuToggleRef}
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex items-center justify-center rounded-lg p-2.5 text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden mt-4 flex flex-col space-y-4 pb-2 max-h-[calc(100svh-4.5rem)] overflow-y-auto overscroll-contain"
          >
            <button
              onClick={() => handleMobileNavClick('pricing')}
              className="w-full py-2 text-left text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              Pricing
            </button>
            <button
              onClick={() => handleMobileNavClick('features')}
              className="w-full py-2 text-left text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              Features
            </button>
            <button
              onClick={() => handleMobileNavClick('wizards')}
              className="w-full py-2 text-left text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              Wizards
            </button>
            <button
              onClick={() => handleMobileNavClick('faq')}
              className="w-full py-2 text-left text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              FAQ
            </button>
            <Link
              to="/getting-started"
              onClick={closeMenu}
              className="block w-full py-2 text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              Setup & API keys
            </Link>
            <Link
              to="/changelog"
              onClick={closeMenu}
              className="block w-full py-2 text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              Changelog
            </Link>
            <Link
              to="/feedback"
              onClick={closeMenu}
              className="block w-full py-2 text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-300 font-medium transition"
            >
              Feedback
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
