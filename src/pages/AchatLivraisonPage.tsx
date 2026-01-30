import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Car, MapPin, User, ArrowRight, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { wilayas } from '../data/wilayas';

const AchatLivraisonPage: React.FC = () => {
  const [step, setStep] = useState<number>(1); // Keep simplified step logic if we want a success state later

  // Detailed Address State
  const [sender, setSender] = useState({ firstName: '', lastName: '', email: '', phone: '+33', address: '', zip: '', city: '', country: 'France' });
  const [receiver, setReceiver] = useState({ firstName: '', lastName: '', phone: '+213', address: '', zip: '', city: '', country: 'Algérie' });

  // Suggestions State
  const [senderSuggestions, setSenderSuggestions] = useState<string[]>([]);
  const [showSenderSuggestions, setShowSenderSuggestions] = useState(false);

  // Common countries for dropdown
  const commonCountries = [
    "Algérie", "Maroc", "Tunisie", "Espagne", "Italie", "Belgique", "Allemagne", "Canada", "États-Unis", "Autre"
  ];

  // Utility to sanitize text inputs
  const sanitize = (val: string) => val.replace(/[<>]/g, '');

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

  const handleSubmit = () => {
    window.scrollTo(0, 0);
    setStep(2); // Success state
  };

  const isSenderValid = sender.firstName && sender.lastName && sender.email && sender.phone && sender.address && sender.zip && sender.city;
  const isReceiverValid = receiver.address && receiver.zip && receiver.city && receiver.country;

  const renderSuccess = () => (
    <div className="bg-white rounded-2xl shadow-xl p-12 text-center animate-scale-in">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="text-green-600" size={48} />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Demande reçue !</h2>
      <p className="text-xl text-gray-600 mb-8">
        Merci {sender.firstName}. Notre équipe spécialisée dans l'export de véhicules a bien reçu votre demande.
        <br />
        Vous recevrez une estimation sous 24h.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
      >
        Nouvelle demande
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-0">
      <Helmet>
        <title>Achat & Export Véhicules Europe-Algérie - CSF Transport</title>
        <meta name="description" content="Importation de véhicules depuis l'Europe vers l'Algérie. Catalogue bientôt disponible. Contactez-nous pour un devis." />
        <link rel="canonical" href="https://csf-transport.com/achat-livraison" />
      </Helmet>

      {/* Hero Section Simplified */}
      <section className="bg-blue-900 text-white pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Achat & Export de Véhicules
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            L'excellence de l'import automobile
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-3xl py-12">
        {/* Catalog Coming Soon Banner */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 mb-10 shadow-lg text-white flex items-center gap-4 animate-fade-in">
          <div className="bg-white/20 p-3 rounded-full">
            <Info size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold">Catalogue en ligne bientôt disponible</h3>
            <p className="text-amber-50">
              Nous finalisons actuellement notre catalogue de véhicules. En attendant, utilisez le formulaire ci-dessous pour une recherche personnalisée ou une demande de transport.
            </p>
          </div>
        </div>

        {step === 1 ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Car className="text-blue-600" /> Vos Coordonnées & Projet
            </h2>

            <div className="space-y-8">
              {/* Sender Form (Departure / Client Info) */}
              <section>
                <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Vos informations (Départ)</h3>
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

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                <p className="text-sm text-blue-800">
                  Vous serez recontacté(e) pour préciser le type de véhicule (Marque, Modèle, Année) ou les détails de votre projet d'export.
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!isSenderValid || !isReceiverValid}
                className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${!isSenderValid || !isReceiverValid
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                <span>Envoyer ma demande</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        ) : (
          renderSuccess()
        )}
      </div>
    </div>
  );
};

export default AchatLivraisonPage;