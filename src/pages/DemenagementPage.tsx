import React from 'react';
import VideoPlaceholder from '../components/VideoPlaceholder';

const DemenagementPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Déménagement vers l'Algérie
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Un accompagnement complet pour votre changement de vie
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-blue-800 max-w-2xl mx-auto">
            <p className="text-sm">
              ⚠️ <strong>Information importante :</strong> Service de déménagement disponible uniquement de la France vers l'Algérie
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl pb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tout savoir sur le déménagement</h2>
          <VideoPlaceholder className="max-w-3xl mx-auto mb-12" title="Tout savoir sur le déménagement" />
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Prêt à déménager ?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Chaque déménagement est unique. Contactez nos experts pour obtenir un devis sur mesure adapté à votre volume et vos besoins.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Demander mon devis gratuit
          </a>
        </div>
      </div>
    </div>
  );
};

export default DemenagementPage;