import React, { useState } from 'react';
import { Menu, X, MessageCircle, Phone } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '33785762055';
    const message = encodeURIComponent('Bonjour, je souhaite obtenir des informations sur vos services de transport CSF.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setIsMenuOpen(false);
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+33785762055';
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    onNavigate('accueil');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled
      ? 'fixed bg-white shadow-lg'
      : 'absolute bg-transparent'
      }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/csf/logo-csf.webp"
              alt="CSF Logo"
              className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center space-x-12 flex-1">
            <button
              onClick={() => handleNavClick('accueil')}
              className={`font-medium text-lg transition-colors duration-300 ${currentPage === 'accueil'
                ? 'text-black'
                : 'text-black hover:text-gray-700'
                }`}
            >
              Accueil
            </button>
            <button
              onClick={() => handleNavClick('envoi-colis')}
              className={`font-medium text-lg transition-colors duration-300 ${currentPage === 'envoi-colis'
                ? 'text-black'
                : 'text-black hover:text-gray-700'
                }`}
            >
              Envoi de Colis
            </button>
            <button
              onClick={() => handleNavClick('demenagement')}
              className={`font-medium text-lg transition-colors duration-300 ${currentPage === 'demenagement'
                ? 'text-black'
                : 'text-black hover:text-gray-700'
                }`}
            >
              Déménagement
            </button>
            <button
              onClick={() => handleNavClick('achat-livraison')}
              className={`font-medium text-lg transition-colors duration-300 ${currentPage === 'achat-livraison'
                ? 'text-black'
                : 'text-black hover:text-gray-700'
                }`}
            >
              Achat & Export de Véhicules
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`font-medium text-lg transition-colors duration-300 ${currentPage === 'contact'
                ? 'text-black'
                : 'text-black hover:text-gray-700'
                }`}
            >
              Contact
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className={`lg:hidden transition-colors duration-300 ${isScrolled ? 'text-gray-700 [text-shadow:_1px_1px_0_#000,_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000]' : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
              }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)}></div>

            {/* Menu Panel */}
            <nav className="absolute top-0 left-0 right-0 bottom-0 bg-white">
              <div className="flex flex-col h-full">
                {/* Header with logo and close button */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <img
                    src="/csf/logo-csf.webp"
                    alt="CSF Logo"
                    className="h-10 w-auto"
                  />
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Menu items */}
                <div className="flex flex-col space-y-6 text-center py-8 px-4 flex-1">
                  {/* Close button */}

                  <button
                    onClick={() => handleNavClick('accueil')}
                    className={`text-center font-bold text-xl transition-colors duration-300 py-3 uppercase tracking-wide ${currentPage === 'accueil'
                      ? 'text-blue-800'
                      : 'text-blue-800 hover:text-blue-600'
                      }`}
                  >
                    Accueil
                  </button>
                  <button
                    onClick={() => handleNavClick('envoi-colis')}
                    className={`text-center font-bold text-xl transition-colors duration-300 py-3 uppercase tracking-wide ${currentPage === 'envoi-colis'
                      ? 'text-blue-800'
                      : 'text-blue-800 hover:text-blue-600'
                      }`}
                  >
                    Envoi de Colis
                  </button>
                  <button
                    onClick={() => handleNavClick('demenagement')}
                    className={`text-center font-bold text-xl transition-colors duration-300 py-3 uppercase tracking-wide ${currentPage === 'demenagement'
                      ? 'text-blue-800'
                      : 'text-blue-800 hover:text-blue-600'
                      }`}
                  >
                    Déménagement
                  </button>
                  <button
                    onClick={() => handleNavClick('achat-livraison')}
                    className={`text-center font-bold text-xl transition-colors duration-300 py-3 uppercase tracking-wide ${currentPage === 'achat-livraison'
                      ? 'text-blue-800'
                      : 'text-blue-800 hover:text-blue-600'
                      }`}
                  >
                    Achat & Export de Véhicules
                  </button>
                  <button
                    onClick={() => handleNavClick('contact')}
                    className={`text-center font-bold text-xl transition-colors duration-300 py-3 uppercase tracking-wide ${currentPage === 'contact'
                      ? 'text-blue-800'
                      : 'text-blue-800 hover:text-blue-600'
                      }`}
                  >
                    Contact
                  </button>

                  {/* Separator */}
                  <div className="border-t border-gray-200 my-4"></div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 justify-center">
                    {/* Chat Button */}
                    <button
                      onClick={handleWhatsAppClick}
                      className="flex items-center justify-center space-x-1 text-center font-bold text-xs transition-colors duration-300 py-2 px-3 rounded-lg text-white bg-teal-500 hover:bg-teal-600"
                    >
                      <MessageCircle size={14} />
                      <span>CHAT</span>
                    </button>

                    {/* Call Button */}
                    <button
                      onClick={handleCallClick}
                      className="flex items-center justify-center space-x-1 text-center font-bold text-xs transition-colors duration-300 py-2 px-3 rounded-lg text-white bg-pink-500 hover:bg-pink-600"
                    >
                      <Phone size={14} />
                      <span>APPEL</span>
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;