import React from 'react';

const PartnersSection = () => {
  const partners = [
    { name: 'Air Algérie', logo: '✈️' },
    { name: 'La Poste', logo: '📮' },
    { name: 'EMS Algérie', logo: '📦' },
    { name: 'FAF', logo: '⚽' },
    { name: 'STELLANTIS', logo: '🚗' },
    { name: 'Équipe de France de Gastronomie', logo: '👨‍🍳' },
  ];

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
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300 w-40 h-40 border border-gray-100"
            >
              <span className="text-4xl mb-3 grayscale group-hover:grayscale-0 transition-all duration-300">
                {partner.logo}
              </span>
              <span className="text-sm font-semibold text-gray-700 text-center">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;