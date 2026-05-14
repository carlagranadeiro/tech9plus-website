import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/lib/i18n';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLang();

  const navLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.services, href: '/servicos' },
    { name: t.nav.portfolio, href: '/portfolio' },
    { name: t.nav.contact, href: '/contacto' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-black/50 backdrop-blur-sm py-5'
      }`}
    >
      <div className="container-padding max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={`${import.meta.env.BASE_URL}logo.jpg`}
              alt="Tech9+ Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`font-montserrat text-sm font-medium transition-all hover:text-tech-blue relative group ${
                  isScrolled ? 'text-tech-dark' : 'text-white'
                } ${location.pathname === link.href ? 'text-tech-blue' : ''}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tech-blue transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center rounded-lg overflow-hidden border border-white/30">
              <button
                onClick={() => setLang('pt')}
                className={`px-3 py-1.5 text-xs font-montserrat font-semibold transition-colors ${
                  lang === 'pt'
                    ? 'bg-tech-blue text-white'
                    : isScrolled
                    ? 'text-tech-dark hover:bg-gray-100'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                PT
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 text-xs font-montserrat font-semibold transition-colors ${
                  lang === 'en'
                    ? 'bg-tech-blue text-white'
                    : isScrolled
                    ? 'text-tech-dark hover:bg-gray-100'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                EN
              </button>
            </div>

            <Link to="/orcamento">
              <Button className="bg-tech-blue hover:bg-tech-blue-light text-white font-montserrat font-medium">
                {t.header.quoteBtn}
              </Button>
            </Link>
          </div>

          {/* Mobile: lang + menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="flex items-center rounded-lg overflow-hidden border border-white/30">
              <button
                onClick={() => setLang('pt')}
                className={`px-2 py-1 text-xs font-semibold transition-colors ${
                  lang === 'pt' ? 'bg-tech-blue text-white' : isScrolled ? 'text-tech-dark' : 'text-white'
                }`}
              >
                PT
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 text-xs font-semibold transition-colors ${
                  lang === 'en' ? 'bg-tech-blue text-white' : isScrolled ? 'text-tech-dark' : 'text-white'
                }`}
              >
                EN
              </button>
            </div>
            <button
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-tech-dark' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-tech-dark' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`py-3 px-4 font-montserrat text-sm font-medium text-tech-dark hover:bg-tech-light hover:text-tech-blue rounded-lg transition-colors ${
                  location.pathname === link.href ? 'text-tech-blue bg-tech-light' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
