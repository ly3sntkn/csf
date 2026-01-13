import React, { useState, useEffect } from 'react';
import { X, Settings } from 'lucide-react';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    setCookiePreferences({
      necessary: true,
      analytics: true,
      marketing: true
    });
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  const acceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      ...cookiePreferences,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
    setShowSettings(false);
  };

  const rejectAll = () => {
    setCookiePreferences({
      necessary: true,
      analytics: false,
      marketing: false
    });
    localStorage.setItem('cookieConsent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        {!showSettings ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-2">Gestion des Cookies</h3>
              <p className="text-gray-600 text-sm">
                Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                Vous pouvez accepter tous les cookies ou personnaliser vos préférences.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <Settings size={16} />
                <span>Paramètres</span>
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Refuser
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Accepter Tout
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Paramètres des Cookies</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">Cookies Nécessaires</h4>
                  <p className="text-sm text-gray-600">Requis pour le fonctionnement du site</p>
                </div>
                <input
                  type="checkbox"
                  checked={cookiePreferences.necessary}
                  disabled
                  className="w-4 h-4"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">Cookies Analytiques</h4>
                  <p className="text-sm text-gray-600">Nous aident à améliorer notre site</p>
                </div>
                <input
                  type="checkbox"
                  checked={cookiePreferences.analytics}
                  onChange={(e) => setCookiePreferences(prev => ({
                    ...prev,
                    analytics: e.target.checked
                  }))}
                  className="w-4 h-4"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">Cookies Marketing</h4>
                  <p className="text-sm text-gray-600">Pour personnaliser les publicités</p>
                </div>
                <input
                  type="checkbox"
                  checked={cookiePreferences.marketing}
                  onChange={(e) => setCookiePreferences(prev => ({
                    ...prev,
                    marketing: e.target.checked
                  }))}
                  className="w-4 h-4"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={acceptSelected}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Sauvegarder les Préférences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;