import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-white text-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Testez nos services dès maintenant
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Ne perdez pas de temps et essayez nos services dès aujourd'hui, en toute confiance
        </p>
        <button
          onClick={scrollToTop}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 mx-auto"
        >
          <span>Commencer maintenant</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default CTASection;