import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'envoi-colis', label: 'Envoyer un colis' },
    { id: 'demenagement', label: 'Déménagement international' },
    { id: 'achat-livraison', label: 'Achat & Export de Véhicules' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLogoClick = () => {
    onNavigate('accueil');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHomePage = currentPage === 'accueil';
  const headerBgClass = isHomePage && !isScrolled ? 'bg-transparent py-6' : 'bg-white shadow-md py-4';
  const textColorClass = isHomePage && !isScrolled ? 'text-white hover:text-red-500' : 'text-gray-800 hover:text-red-600';

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${headerBgClass}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleLogoClick}
        >
          <img
            src="/csf/logo-csf.webp"
            alt="CSF Transport"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-sm font-bold transition-colors duration-300 uppercase tracking-wide ${textColorClass} ${currentPage === item.id ? 'underline decoration-2 underline-offset-4' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`xl:hidden ${isHomePage && !isScrolled ? 'text-white' : 'text-gray-800'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 xl:hidden flex flex-col h-screen shadow-xl animate-fade-in">
          <div className="flex flex-col">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left py-4 px-6 border-b border-gray-100 text-base font-bold transition-all duration-200 uppercase tracking-wide flex justify-between items-center ${currentPage === item.id
                  ? 'text-red-600 bg-gray-50'
                  : 'text-gray-800 hover:bg-gray-50 hover:text-red-600'
                  }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;