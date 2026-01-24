import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const Footer = () => {
  const [showContact, setShowContact] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [showServices, setShowServices] = useState(false);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <img
              src="/csf/logo-csf.webp"
              alt="CSF Logo"
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/csfgroupe/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/csfgroupe/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://x.com/csfgroupe/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                {/* X (Twitter) Icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/csfgroupe/?originalSubdomain=fr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.tiktok.com/@csfgroupe/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
                {/* TikTok Icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <button
              onClick={() => setShowServices(!showServices)}
              className="flex items-center justify-between w-full text-lg font-bold mb-4 hover:text-blue-400 transition-colors"
            >
              <span>Nos Services</span>
              {showServices ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {showServices && (
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      const event = new CustomEvent('navigate', { detail: 'envoi-colis' });
                      window.dispatchEvent(event);
                    }}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    Envoi de Colis
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const event = new CustomEvent('navigate', { detail: 'demenagement' });
                      window.dispatchEvent(event);
                    }}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    Déménagement
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const event = new CustomEvent('navigate', { detail: 'achat-livraison' });
                      window.dispatchEvent(event);
                    }}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    Achat & Export de Véhicules
                  </button>
                </li>
              </ul>
            )}
          </div>

          {/* Contact */}
          <div>
            <button
              onClick={() => setShowContact(!showContact)}
              className="flex items-center justify-between w-full text-lg font-bold mb-4 hover:text-blue-400 transition-colors"
            >
              <span>Contact</span>
              {showContact ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {showContact && (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-blue-400" />
                  <a href="tel:+33149753001" className="text-gray-300 hover:text-white transition-colors">+33 1 49 75 30 01</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-blue-400" />
                  <a href="tel:+33785762055" className="text-gray-300 hover:text-white transition-colors">+33 7 85 76 20 55</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-blue-400" />
                  <a href="mailto:yanis.yataghene@csfgroupe.fr" className="text-gray-300 hover:text-white transition-colors">yanis.yataghene@csfgroupe.fr</a>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin size={16} className="text-blue-400 mt-1" />
                  <a href="https://maps.google.com/?q=123+Avenue+de+la+République,+75011+Paris,+France" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    123 Avenue de la République<br />
                    75011 Paris, France
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock size={16} className="text-blue-400" />
                  <span className="text-gray-300">Lun-Ven: 9h-18h</span>
                </div>
              </div>
            )}
          </div>

          {/* Legal */}
          <div>
            <button
              onClick={() => setShowLegal(!showLegal)}
              className="flex items-center justify-between w-full text-lg font-bold mb-4 hover:text-blue-400 transition-colors"
            >
              <span>Informations Légales</span>
              {showLegal ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {showLegal && (
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      const event = new CustomEvent('navigate', { detail: 'contact' });
                      window.dispatchEvent(event);
                    }}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    Mentions Légales
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const event = new CustomEvent('navigate', { detail: 'contact' });
                      window.dispatchEvent(event);
                    }}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    CGV
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const event = new CustomEvent('navigate', { detail: 'contact' });
                      window.dispatchEvent(event);
                    }}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    Politique de Confidentialité
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const event = new CustomEvent('navigate', { detail: 'contact' });
                      window.dispatchEvent(event);
                    }}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    Cookies
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const event = new CustomEvent('navigate', { detail: 'contact' });
                      window.dispatchEvent(event);
                    }}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    RGPD
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} CSF. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;