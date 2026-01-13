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
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
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