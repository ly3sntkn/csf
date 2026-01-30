import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Ship, Calendar, Box, MapPin, User, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import VideoPlaceholder from '../components/VideoPlaceholder';
import bannerDemenagement from '../assets/banner-colis-v4.png';
import { wilayas } from '../data/wilayas';

const DemenagementPage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    moveThisYear: '', // 'oui', 'non', 'jsp'
    knowsVolume: '', // 'oui', 'non'
    volume: '',
  });

  // Detailed Address State
  const [sender, setSender] = useState({ firstName: '', lastName: '', email: '', phone: '+33', address: '', zip: '', city: '', country: 'France' });
  const [receiver, setReceiver] = useState({ firstName: '', lastName: '', phone: '+213', address: '', zip: '', city: '', country: 'Algérie' });

  // Suggestions State
  const [senderSuggestions, setSenderSuggestions] = useState<string[]>([]);
  const [showSenderSuggestions, setShowSenderSuggestions] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Auto-fill City Logic
  const handleZipChange = async (type: 'sender' | 'receiver', value: string) => {
    if (type === 'sender') {
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

    } else {
      setReceiver(prev => ({ ...prev, zip: value }));

      // Only attempt auto-fill for Algérie
      if (receiver.country === 'Algérie') {
        // Check first 2 digits for Wilaya
        if (value.length >= 2) {
          const wilayaCode = value.substring(0, 2);
          const wilaya = wilayas.find(w => w.code === wilayaCode);

          if (wilaya) {
            setReceiver(prev => ({ ...prev, city: wilaya.name }));
          }
        }
      }
    }
  };

  const selectSenderCity = (city: string) => {
    setSender(prev => ({ ...prev, city }));
    setShowSenderSuggestions(false);
  };

  // Common countries for dropdown
  const commonCountries = [
    "Algérie", "Maroc", "Tunisie", "Espagne", "Italie", "Belgique", "Allemagne", "Canada", "États-Unis", "Autre"
  ];

  const nextStep = () => {
    window.scrollTo(0, 0);
    setStep(prev => (prev < 3 ? prev + 1 : prev) as 1 | 2 | 3);
  };

  const prevStep = () => {
    window.scrollTo(0, 0);
    setStep(prev => (prev > 1 ? prev - 1 : prev) as 1 | 2 | 3);
  };

  const handleSubmit = () => {
    window.scrollTo(0, 0);
    setStep(3);
  };

  // Utility to sanitize text inputs
  const sanitize = (val: string) => val.replace(/[<>]/g, '');

  const renderStep1 = () => (
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
      <div className="mb-8 border-b pb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tout savoir sur le déménagement international</h2>

        <VideoPlaceholder className="mt-6 mb-8" title="Tout savoir sur le déménagement" />

        <div className="flex items-center gap-2">
          <Ship className="text-blue-600" size={24} />
          <h3 className="text-xl font-bold text-gray-800">Informations Déménagement</h3>
        </div>
      </div>

      <div className="space-y-8">
        {/* Question 1 */}
        <div>
          <label className="block text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="text-blue-600" size={20} />
            Souhaitez-vous déménager cette année ?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Oui', 'Non, juste me renseigner', 'Je ne sais pas encore'].map((option) => (
              <button
                key={option}
                onClick={() => handleInputChange('moveThisYear', option)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${formData.moveThisYear === option
                  ? 'border-blue-600 bg-blue-50 text-blue-800'
                  : 'border-gray-200 hover:border-blue-300'
                  }`}
              >
                <span className="font-medium">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Question 2 */}
        {formData.moveThisYear === 'Oui' && (
          <div className="animate-fade-in">
            <label className="block text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <Box className="text-blue-600" size={20} />
              Connaissez-vous approximativement le volume total ?
            </label>
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={() => handleInputChange('knowsVolume', 'oui')}
                  className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${formData.knowsVolume === 'oui'
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-blue-300'
                    }`}
                >
                  Oui
                </button>
                <button
                  onClick={() => handleInputChange('knowsVolume', 'non')}
                  className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${formData.knowsVolume === 'non'
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-blue-300'
                    }`}
                >
                  Non
                </button>
              </div>

              {formData.knowsVolume === 'oui' && (
                <div className="animate-fade-in max-w-xs">
                  <label className="block text-sm text-gray-600 mb-1">Volume estimé (m³)</label>
                  <input
                    type="number"
                    value={formData.volume}
                    onChange={(e) => handleInputChange('volume', e.target.value)}
                    placeholder="ex : 20 m3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <button
          onClick={nextStep}
          disabled={!formData.moveThisYear}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all ${!formData.moveThisYear
            ? 'bg-gray-300 cursor-not-allowed text-gray-500'
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
            }`}
        >
          <span>Continuer</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => {
    const isSenderValid = sender.firstName && sender.lastName && sender.email && sender.phone && sender.address && sender.zip && sender.city;
    const isReceiverValid = receiver.address && receiver.zip && receiver.city && receiver.country;

    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <User className="text-blue-600" /> Vos Coordonnées
        </h2>

        <div className="space-y-8">
          {/* Sender Form (Departure) */}
          <section>
            <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Pays de départ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400"><User size={18} /></span>
                <input type="text" placeholder="Prénom*" className="pl-10 p-3 border rounded-lg w-full" value={sender.firstName} onChange={e => setSender({ ...sender, firstName: sanitize(e.target.value) })} />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400"><User size={18} /></span>
                <input type="text" placeholder="Nom*" className="pl-10 p-3 border rounded-lg w-full" value={sender.lastName} onChange={e => setSender({ ...sender, lastName: sanitize(e.target.value) })} />
              </div>
              <input type="email" placeholder="Email*" className="p-3 border rounded-lg" value={sender.email} onChange={e => setSender({ ...sender, email: sanitize(e.target.value) })} />
              <input type="tel" placeholder="Téléphone (+33)*" className="p-3 border rounded-lg" value={sender.phone} onChange={e => setSender({ ...sender, phone: sanitize(e.target.value) })} />

              <input type="text" placeholder="Adresse complète*" className="md:col-span-2 p-3 border rounded-lg" value={sender.address} onChange={e => setSender({ ...sender, address: sanitize(e.target.value) })} />

              <div className="relative">
                <input type="text" placeholder="Code postal*" className="p-3 border rounded-lg w-full" value={sender.zip} onChange={e => handleZipChange('sender', sanitize(e.target.value))} />
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
          </section>

          {/* Receiver Form (Destination) */}
          <section>
            <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Pays de destination</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Optional Recipient Name fields if needed, but keeping it simple as per request to just focus on address mostly, but usually you need a contact there too. 
                  Start with address as requested. */}

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pays de destination</label>
                <select
                  value={receiver.country}
                  onChange={(e) => setReceiver({ ...receiver, country: e.target.value })}
                  className="w-full p-3 border rounded-lg bg-white"
                >
                  {commonCountries.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <input type="text" placeholder="Adresse destination*" className="md:col-span-2 p-3 border rounded-lg" value={receiver.address} onChange={e => setReceiver({ ...receiver, address: sanitize(e.target.value) })} />

              <input type="text" placeholder="Code postal*" className="p-3 border rounded-lg" value={receiver.zip} onChange={e => handleZipChange('receiver', sanitize(e.target.value))} />
              <input type="text" placeholder="Ville*" className="p-3 border rounded-lg" value={receiver.city} onChange={e => setReceiver({ ...receiver, city: sanitize(e.target.value) })} />
            </div>
          </section>

          <div className="flex gap-4 pt-4">
            <button
              onClick={prevStep}
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 flex items-center gap-2"
            >
              <ArrowLeft size={18} /> Retour
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isSenderValid || !isReceiverValid}
              className={`flex-1 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${!isSenderValid || !isReceiverValid
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
                }`}
            >
              Confirmer ma demande
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSuccess = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-12 text-center animate-scale-in">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check size={48} className="text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Bonjour {sender.firstName}, Félicitations !
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
        Vous vous rapprochez de votre nouvelle vie. Un commercial va vous contacter sous 24 à 48h afin d’établir avec vous votre devis.
      </p>

      <button
        onClick={() => {
          setStep(1);
          setFormData({ ...formData, moveThisYear: '', knowsVolume: '', volume: '' });
          window.scrollTo(0, 0);
        }}
        className="text-blue-600 font-bold hover:underline"
      >
        Retour à l'accueil
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-0">
      <Helmet>
        <title>Déménagement International - CSF Transport</title>
        <meta name="description" content="Nous vous accompagnons vers votre nouvelle vie. Service complet de déménagement international." />
        <link rel="canonical" href="https://csf-transport.com/demenagement" />
      </Helmet>

      {/* Hero Section */}
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 mb-12 flex items-center justify-center min-h-[400px] lg:min-h-[500px] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={bannerDemenagement}
            alt="Déménagement Cargo"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Vous souhaitez déménager vers un autre pays ?
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto drop-shadow-md">
            Nous vous accompagnons vers votre nouvelle vie
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-3xl pb-24">
        {/* Stepper */}
        {step !== 3 && (
          <div className="flex items-center justify-center mb-10 space-x-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all ${step >= 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className={`w-16 h-1 rounded transition-all ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all ${step >= 2 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>2</div>
          </div>
        )}

        {/* Steps Content */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderSuccess()}
      </div>
    </div>
  );
};

export default DemenagementPage;