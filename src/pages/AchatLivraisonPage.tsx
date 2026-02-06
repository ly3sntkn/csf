import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, User, ArrowRight, CheckCircle, Info, Check } from 'lucide-react';
import bannerVoiture from '../assets/banner-voiture-final.jpg';

const AchatLivraisonPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [serviceType, setServiceType] = useState<'buy_export' | 'export_only' | null>(null);

  // Criteria State
  const [vehicleCriteria, setVehicleCriteria] = useState({
    age: '', // 'neuf', 'less_3', 'less_5'
    hasModel: '', // 'oui', 'non'
    modelName: '',
  });

  // Detailed Address State
  const [sender, setSender] = useState({ firstName: '', lastName: '', email: '', phone: '+33', address: '', zip: '', city: '', country: 'France' });

  // Suggestions State
  const [senderSuggestions, setSenderSuggestions] = useState<string[]>([]);
  const [showSenderSuggestions, setShowSenderSuggestions] = useState(false);

  // Utility to sanitize text inputs
  const sanitize = (val: string) => val.replace(/[<>]/g, '');

  // Auto-fill City Logic
  const handleZipChange = async (value: string) => {
    setSender(prev => ({ ...prev, zip: value }));

    // France Logic (Code Postal -> Ville)
    if (value.length >= 2) {
      try {
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${value}&type=municipality&limit=5`);
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const cities = data.features.map((f: any) => f.properties.city);
          // Remove duplicates
          const uniqueCities = [...new Set(cities)] as string[];

          setSenderSuggestions(uniqueCities);
          setShowSenderSuggestions(true);

          // Auto-select if perfect match
          if (uniqueCities.length === 1) {
            if (value.length === 5) {
              setSender(prev => ({ ...prev, city: uniqueCities[0] }));
              setShowSenderSuggestions(false);
            }
          }
        } else {
          setSenderSuggestions([]);
          setShowSenderSuggestions(false);
        }
      } catch (error) {
        // Failure suppressed
      }
    } else {
      setSenderSuggestions([]);
      setShowSenderSuggestions(false);
    }
  };

  const selectSenderCity = (city: string) => {
    setSender(prev => ({ ...prev, city }));
    setShowSenderSuggestions(false);
  };

  const nextStep = () => {
    window.scrollTo(0, 0);
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    window.scrollTo(0, 0);
    setStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    window.scrollTo(0, 0);
    setStep(3); // Success state
  };

  const renderStep1 = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Option 1: Buy & Export */}
        <div
          onClick={() => setServiceType('buy_export')}
          className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${serviceType === 'buy_export'
            ? 'border-blue-600 bg-blue-50 shadow-lg'
            : 'border-gray-100 bg-white hover:border-blue-200 shadow-md'
            }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-full ${serviceType === 'buy_export' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
              <CheckCircle size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Acheter et exporter un véhicule</h3>
          </div>
          <p className="text-gray-600">Nous trouvons et exportons le véhicule de vos rêves pour vous.</p>
        </div>

        {/* Option 2: Export Only */}
        <div
          onClick={() => setServiceType('export_only')}
          className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${serviceType === 'export_only'
            ? 'border-blue-600 bg-blue-50 shadow-lg'
            : 'border-gray-100 bg-white hover:border-blue-200 shadow-md'
            }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-full ${serviceType === 'export_only' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
              <ArrowRight size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Exporter un véhicule</h3>
          </div>
          <p className="text-gray-600">Vous avez déjà le véhicule ? Nous nous occupons de l'export.</p>
        </div>
      </div>

      {serviceType === 'buy_export' && (
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Précisez votre recherche</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Que recherchez-vous ?</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { id: 'neuf', label: 'Véhicule neuf' },
                  { id: 'less_3', label: '- de 3 ans' },
                  { id: 'less_5', label: '- de 5 ans' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setVehicleCriteria({ ...vehicleCriteria, age: opt.id })}
                    className={`p-3 rounded-lg border text-center transition-all ${vehicleCriteria.age === opt.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-200 hover:border-blue-300 text-gray-600'
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Avez-vous un modèle précis en tête ?</label>
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setVehicleCriteria({ ...vehicleCriteria, hasModel: 'oui' })}
                  className={`px-6 py-2 rounded-lg border transition-all ${vehicleCriteria.hasModel === 'oui'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-200 hover:border-blue-300 text-gray-600'
                    }`}
                >
                  Oui
                </button>
                <button
                  onClick={() => setVehicleCriteria({ ...vehicleCriteria, hasModel: 'non' })}
                  className={`px-6 py-2 rounded-lg border transition-all ${vehicleCriteria.hasModel === 'non'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-200 hover:border-blue-300 text-gray-600'
                    }`}
                >
                  Non
                </button>
              </div>

              {vehicleCriteria.hasModel === 'oui' && (
                <div className="animate-fade-in">
                  <input
                    type="text"
                    placeholder="Ex: Renault Clio 5 RS Line..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={vehicleCriteria.modelName}
                    onChange={(e) => setVehicleCriteria({ ...vehicleCriteria, modelName: e.target.value })}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {serviceType && (
        <div className="flex justify-end pt-4">
          <button
            onClick={nextStep}
            disabled={serviceType === 'buy_export' && (!vehicleCriteria.age || !vehicleCriteria.hasModel || (vehicleCriteria.hasModel === 'oui' && !vehicleCriteria.modelName))}
            className={`px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${serviceType === 'buy_export' && (!vehicleCriteria.age || !vehicleCriteria.hasModel || (vehicleCriteria.hasModel === 'oui' && !vehicleCriteria.modelName))
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
          >
            <span>Continuer</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => {
    const isSenderValid = sender.firstName && sender.lastName && sender.email && sender.phone && sender.address && sender.zip && sender.city;

    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Laissez vos coordonnées</h2>
        <p className="text-gray-600 mb-8">Remplissez ce formulaire et un expert vous recontactera rapidement pour discuter de votre projet.</p>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Prénom*" className="p-3 border rounded-lg" value={sender.firstName} onChange={e => setSender({ ...sender, firstName: sanitize(e.target.value) })} />
            <input type="text" placeholder="Nom*" className="p-3 border rounded-lg" value={sender.lastName} onChange={e => setSender({ ...sender, lastName: sanitize(e.target.value) })} />
            <input type="email" placeholder="Email*" className="p-3 border rounded-lg" value={sender.email} onChange={e => setSender({ ...sender, email: sanitize(e.target.value) })} />
            <div className="relative">
              <input type="tel" placeholder="Téléphone (+33)*" className="p-3 border rounded-lg w-full" value={sender.phone} onChange={e => setSender({ ...sender, phone: sanitize(e.target.value) })} />
            </div>
            <input type="text" placeholder="Adresse complète*" className="md:col-span-2 p-3 border rounded-lg" value={sender.address} onChange={e => setSender({ ...sender, address: sanitize(e.target.value) })} />

            <div className="relative">
              <input type="text" placeholder="Code postal*" className="p-3 border rounded-lg w-full" value={sender.zip} onChange={e => handleZipChange(sanitize(e.target.value))} />
              {showSenderSuggestions && senderSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                  {senderSuggestions.map((city, idx) => (
                    <li
                      key={idx}
                      className="p-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700"
                      onClick={() => selectSenderCity(city)}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <input type="text" placeholder="Ville*" className="p-3 border rounded-lg" value={sender.city} onChange={e => setSender({ ...sender, city: sanitize(e.target.value) })} />
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-500 cursor-not-allowed">
              <MapPin size={18} className="mr-2" />
              France
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-6 border-t">
            <button
              onClick={prevStep}
              className="w-full md:w-auto py-3 text-gray-500 font-medium flex items-center justify-center gap-2 hover:text-gray-800"
            >
              <ArrowRight size={18} className="rotate-180" /> Retour
            </button>

            <button
              onClick={handleSubmit}
              disabled={!isSenderValid}
              className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold transition-all whitespace-normal h-auto min-h-[48px] ${isSenderValid ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' : 'bg-gray-300 cursor-not-allowed text-gray-500'
                }`}
            >
              Être recontacté
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSuccess = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 animate-fade-in text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check size={40} className="text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Demande reçue !</h2>
      <div className="bg-gray-50 rounded-xl p-6 text-center mb-8 space-y-4">
        <p className="text-gray-600">
          Merci <strong>{sender.firstName}</strong>. Notre équipe spécialisée dans l'export de véhicules a bien reçu votre demande.
        </p>
        <p className="text-gray-600">
          Vous recevrez une estimation sous <strong>24h</strong>.
        </p>
      </div>

      <button
        onClick={() => {
          setStep(1);
          setServiceType(null);
          setVehicleCriteria({ age: '', hasModel: '', modelName: '' });
          window.scrollTo(0, 0);
        }}
        className="text-blue-600 font-medium hover:underline"
      >
        Retour à l'accueil
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-0">
      <Helmet>
        <title>Achat & Export Véhicules Europe-Algérie - CSF Transport</title>
        <meta name="description" content="Importation de véhicules depuis l'Europe vers l'Algérie. Catalogue 2026 bientôt disponible. Nous acceptons toutes vos demandes personnalisées." />
        <link rel="canonical" href="https://csf-transport.com/achat-livraison" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 mb-12 flex items-center justify-center min-h-[400px] lg:min-h-[500px] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={bannerVoiture}
            alt="Export Voiture"
            className="w-full h-full object-cover object-center blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Achat & Export de Véhicules
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto drop-shadow-md">
            Importez votre véhicule en toute sérénité
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-3xl pb-24">
        {/* Catalog Coming Soon Banner - Gray */}
        {step !== 3 && (
          <div className="max-w-2xl mx-auto mb-10 animate-fade-in">
            <div className="p-4 border border-blue-100 rounded-xl bg-blue-50">
              <div className="flex flex-col items-center gap-2">
                <div className="flex-shrink-0">
                  <Info size={28} className="text-blue-600" />
                </div>
                <div className="text-sm text-blue-800 text-center">
                  <p className="font-bold text-lg mb-2">Note Importante :</p>
                  <p className="mb-2">
                    Le catalogue <strong>2026</strong> sera bientôt disponible.
                  </p>
                  <p>
                    <strong>Nous acceptons dès maintenant toutes les demandes personnalisées.</strong> Utilisez le formulaire ci-dessous pour nous transmettre votre besoin, quelle que soit votre recherche.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stepper */}
        {step !== 3 && (
          <div className="flex items-center justify-center mb-10 space-x-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all ${step >= 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className={`w-16 h-1 rounded transition-all ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all ${step >= 2 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>2</div>
          </div>
        )}

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderSuccess()}
      </div>
    </div>
  );
};

export default AchatLivraisonPage;