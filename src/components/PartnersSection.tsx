import React from 'react';

const PartnersSection = () => {
  const partners = [
    { name: 'Air Algérie', logo: '/csf/logo-air-algerie.webp', size: 'w-32 md:w-40' },
    { name: 'Fédération Algérienne de Football', logo: '/csf/logo-faf.webp', size: 'w-24 md:w-32' }, // Reduced size
    { name: 'La Poste', logo: '/csf/logo-la-poste.webp', size: 'w-32 md:w-40' },
    { name: 'EMS Algérie', logo: '/csf/logo-ems.webp', size: 'w-32 md:w-40', className: 'mix-blend-multiply' }, // Remove white bg effect
    { name: 'STELLANTIS', logo: '/csf/logo-stellantis.webp', size: 'w-32 md:w-40' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Partenaires</h2>
          <p className="text-xl text-gray-600">
            Des collaborations qui témoignent de notre savoir-faire
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`${partner.size} aspect-square p-4 bg-gray-50 rounded-xl flex items-center justify-center hover:shadow-lg transition-all duration-300 border border-gray-100 group`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className={`max-w-full max-h-full object-contain transition-all duration-300 grayscale group-hover:grayscale-0 ${partner.className || ''}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;