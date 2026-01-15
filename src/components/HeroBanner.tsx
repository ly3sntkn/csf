import { Package, Ship, Car, ArrowRight } from 'lucide-react';

const HeroBanner = () => {
  const handleServiceClick = (service: string) => {
    const event = new CustomEvent('navigate', { detail: service });
    window.dispatchEvent(event);
  };

  return (
    <section className="relative text-white py-24 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Desktop Image */}
        <img
          src="/csf/hero-desktop.webp"
          alt="Transport CSF"
          fetchPriority="high"
          loading="eager"
          className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-100"
        />
        {/* Mobile Image */}
        <img
          src="/csf/hero-mobile.webp"
          alt="Transport CSF Mobile"
          fetchPriority="high"
          loading="eager"
          className="block md:hidden absolute inset-0 w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white pt-10">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight drop-shadow-2xl text-white">
          TRANSPORT INTERNATIONAL<br />
          EUROPE - AFRIQUE
        </h1>
        <p className="text-xl md:text-2xl font-light mb-16 max-w-3xl text-white">
          Ce qui compte pour vous, voyage avec nous
        </p>

        {/* Service buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
          <button onClick={() => handleServiceClick('envoi-colis')} className="group bg-white/10 backdrop-blur-md border border-white/20 text-white p-8 rounded-xl shadow-2xl hover:bg-white/20 transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center">
            <div className="flex flex-col items-center space-y-4 flex-grow">
              <div className="p-4 rounded-full bg-red-600 group-hover:bg-red-500 transition-colors">
                <Package size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold uppercase min-h-[3.5rem] flex items-center justify-center">ENVOYER UN COLIS</h3>
              <p className="text-blue-100 text-sm text-center mb-4 flex-grow">
                Envoyez vos colis en un clic
              </p>
              <div className="flex items-center space-x-2 text-white border-2 border-red-600 px-4 py-2 rounded-lg group-hover:bg-red-600 group-hover:border-red-600 transition-all mt-auto">
                <span className="text-sm font-medium">Découvrir</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          <button onClick={() => handleServiceClick('demenagement')} className="group bg-white/10 backdrop-blur-md border border-white/20 text-white p-8 rounded-xl shadow-2xl hover:bg-white/20 transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center">
            <div className="flex flex-col items-center space-y-4 flex-grow">
              <div className="p-4 rounded-full bg-red-600 group-hover:bg-red-500 transition-colors">
                <Ship size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold uppercase min-h-[3.5rem] flex items-center justify-center">DEMENAGEMENT INTERNATIONAL</h3>
              <p className="text-blue-100 text-sm text-center mb-4 flex-grow">
                Déménager vers un autre pays n'a jamais été aussi simple
              </p>
              <div className="flex items-center space-x-2 text-white border-2 border-blue-600 px-4 py-2 rounded-lg group-hover:bg-blue-600 group-hover:border-blue-600 transition-all mt-auto">
                <span className="text-sm font-medium">Découvrir</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>

          <button onClick={() => handleServiceClick('achat-livraison')} className="group bg-white/10 backdrop-blur-md border border-white/20 text-white p-8 rounded-xl shadow-2xl hover:bg-white/20 transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center">
            <div className="flex flex-col items-center space-y-4 flex-grow">
              <div className="p-4 rounded-full bg-red-600 group-hover:bg-red-500 transition-colors">
                <Car size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold uppercase min-h-[3.5rem] flex items-center justify-center">ACHAT & EXPORT DE VÉHICULES</h3>
              <p className="text-blue-100 text-sm text-center mb-4 flex-grow">
                Achetez ou expédiez votre véhicule en toute tranquillité
              </p>
              <div className="flex items-center space-x-2 text-white border-2 border-blue-600 px-4 py-2 rounded-lg group-hover:bg-blue-600 group-hover:border-blue-600 transition-all mt-auto">
                <span className="text-sm font-medium">Découvrir</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;