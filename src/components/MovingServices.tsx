import React from 'react';
import { Play, AlertTriangle } from 'lucide-react';

const MovingServices = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Vous souhaitez déménager vers l'Algérie ?
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Regardez notre courte vidéo explicative ci-dessus pour en savoir plus.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-blue-800">
              <p className="text-sm">
                ⚠️ <strong>Information importante :</strong> Les déménagements sont actuellement disponibles uniquement de France vers l'Algérie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-8">
              <div className="text-center">
                <Play size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Vidéo explicative déménagement</p>
                <p className="text-sm text-gray-400 mt-2">
                  Présentation du service de déménagement international
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-12">
              <AlertTriangle size={64} className="text-yellow-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Service en Développement
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Notre service de déménagement international est actuellement en cours de développement. 
                Nous travaillons pour vous offrir la meilleure expérience possible.
              </p>
              <div className="bg-white p-6 rounded-lg border border-yellow-200 mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Contactez-nous dès maintenant pour :
                </h3>
                <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
                  <li>• Obtenir un devis personnalisé</li>
                  <li>• Planifier votre déménagement</li>
                  <li>• Recevoir des conseils d'experts</li>
                  <li>• Être informé du lancement du service</li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+33149753001"
                    className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
                  >
                    📞 +33 1 49 75 30 01
                  </a>
                  <a
                    href="tel:+33785762055"
                    className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
                  >
                    📱 +33 7 85 76 20 55
                  </a>
                </div>
                <a
                  href="mailto:yanis.yataghene@csfgroupe.fr"
                  className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
                >
                  ✉️ yanis.yataghene@csfgroupe.fr
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovingServices;