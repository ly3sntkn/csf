import React from 'react';
import VideoPlaceholder from '../components/VideoPlaceholder';

const DemenagementPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Vous souhaitez déménager vers l'Algérie ?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Regardez notre courte vidéo explicative ci-dessus pour en savoir plus.
          </p>

          <VideoPlaceholder className="max-w-3xl mx-auto mb-12" title="Tout savoir sur le déménagement" />

          <div className="max-w-2xl mx-auto bg-amber-50 border-l-4 border-amber-500 p-4 text-left">
            <p className="text-amber-800 font-medium">
              ⚠️ Information importante : Les déménagements sont actuellement disponibles uniquement de France vers l'Algérie.
            </p>
          </div>
        </div>

        {/* Placeholder content for contact/quote form if needed later */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Demander un devis déménagement</h2>
          <p className="text-gray-600 mb-6">Contactez-nous directement pour une offre personnalisée.</p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  );
};

export default DemenagementPage;