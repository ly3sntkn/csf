import React from 'react';

const PartnersSection = () => {


  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos partenaires</h2>
          <p className="text-xl text-gray-600 italic">
            « Des collaborations qui témoignent de notre savoir-faire »
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <div className="w-32 h-32 md:w-40 md:h-40 p-4 bg-gray-50 rounded-xl flex items-center justify-center hover:shadow-lg transition-all duration-300 border border-gray-100 group">
            <img src="/csf/logo-air-algerie.webp" alt="Air Algérie" className="max-w-full max-h-full object-contain transition-all duration-300" />
          </div>
          <div className="w-32 h-32 md:w-40 md:h-40 p-4 bg-gray-50 rounded-xl flex items-center justify-center hover:shadow-lg transition-all duration-300 border border-gray-100 group">
            <img src="/csf/logo-la-poste.webp" alt="La Poste" className="max-w-full max-h-full object-contain transition-all duration-300" />
          </div>
          <div className="w-32 h-32 md:w-40 md:h-40 p-4 bg-gray-50 rounded-xl flex items-center justify-center hover:shadow-lg transition-all duration-300 border border-gray-100 group">
            <img src="/csf/logo-ems.webp" alt="EMS Algérie" className="max-w-full max-h-full object-contain transition-all duration-300" />
          </div>
          <div className="w-32 h-32 md:w-40 md:h-40 p-4 bg-gray-50 rounded-xl flex items-center justify-center hover:shadow-lg transition-all duration-300 border border-gray-100 group">
            <img src="/csf/logo-faf.webp" alt="FAF" className="max-w-full max-h-full object-contain transition-all duration-300" />
          </div>
          <div className="w-32 h-32 md:w-40 md:h-40 p-4 bg-gray-50 rounded-xl flex items-center justify-center hover:shadow-lg transition-all duration-300 border border-gray-100 group">
            <img src="/csf/logo-stellantis.webp" alt="STELLANTIS" className="max-w-full max-h-full object-contain transition-all duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;