import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Ship, Calendar, Box, MapPin, User, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import VideoPlaceholder from '../components/VideoPlaceholder';
import bannerDemenagement from '../assets/banner-demenagement-final.png';
import { wilayas } from '../data/wilayas';

const commonCountries = [
  "Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne", "Andorre", "Angola", "Antigua-et-Barbuda", "Arabie saoudite", "Argentine", "Arménie", "Australie", "Autriche", "Azerbaïdjan", "Bahamas", "Bahreïn", "Bangladesh", "Barbade", "Belgique", "Belize", "Bénin", "Bhoutan", "Biélorussie", "Birmanie", "Bolivie", "Bosnie-Herzégovine", "Botswana", "Brésil", "Brunei", "Bulgarie", "Burkina Faso", "Burundi", "Cambodge", "Cameroun", "Canada", "Cap-Vert", "Chili", "Chine", "Chypre", "Colombie", "Comores", "Congo (Brazzaville)", "Congo (Kinshasa)", "Corée du Nord", "Corée du Sud", "Costa Rica", "Côte d’Ivoire", "Croatie", "Cuba", "Danemark", "Djibouti", "Dominique", "Égypte", "Émirats arabes unis", "Équateur", "Érythrée", "Espagne", "Estonie", "Eswatini", "États-Unis", "Éthiopie", "Fidji", "Finlande", "France", "Gabon", "Gambie", "Géorgie", "Ghana", "Grèce", "Grenade", "Guatemala", "Guinée", "Guinée équatoriale", "Guinée-Bissau", "Guyana", "Haïti", "Honduras", "Hongrie", "Îles Marshall", "Inde", "Indonésie", "Irak", "Iran", "Irlande", "Islande", "Israël", "Italie", "Jamaïque", "Japon", "Jordanie", "Kazakhstan", "Kenya", "Kirghizistan", "Kiribati", "Kosovo", "Koweït", "Laos", "Lesotho", "Lettonie", "Liban", "Liberia", "Libye", "Liechtenstein", "Lituanie", "Luxembourg", "Macédoine du Nord", "Madagascar", "Malaisie", "Malawi", "Maldives", "Mali", "Malte", "Maroc", "Maurice", "Mauritanie", "Mexique", "Micronésie", "Moldavie", "Monaco", "Mongolie", "Monténégro", "Mozambique", "Namibie", "Nauru", "Népal", "Nicaragua", "Niger", "Nigeria", "Norvège", "Nouvelle-Zélande", "Oman", "Ouganda", "Ouzbékistan", "Pakistan", "Palaos", "Palestine", "Panama", "Papouasie-Nouvelle-Guinée", "Paraguay", "Pays-Bas", "Pérou", "Philippines", "Pologne", "Portugal", "Qatar", "République centrafricaine", "République dominicaine", "République tchèque", "Roumanie", "Royaume-Uni", "Russie", "Rwanda", "Saint-Christophe-et-Niévès", "Sainte-Lucie", "Saint-Marin", "Saint-Vincent-et-les-Grenadines", "Salomon", "Salvador", "Samoa", "Sao Tomé-et-Principe", "Sénégal", "Serbie", "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovénie", "Somalie", "Soudan", "Soudan du Sud", "Sri Lanka", "Suède", "Suisse", "Suriname", "Syrie", "Tadjikistan", "Tanzanie", "Tchad", "Thaïlande", "Timor oriental", "Togo", "Tonga", "Trinité-et-Tobago", "Tunisie", "Turkménistan", "Turquie", "Tuvalu", "Ukraine", "Uruguay", "Vanuatu", "Vatican", "Venezuela", "Vietnam", "Yémen", "Zambie", "Zimbabwe"
];

const DemenagementPage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    moveThisYear: '', // 'oui', 'non', 'jsp'
    knowsVolume: '', // 'oui', 'non'
    volume: '',
  });

  // Detailed Address State
  const [sender, setSender] = useState({ firstName: '', lastName: '', email: '', phone: '+33', address: '', complement: '', zip: '', city: '', country: 'France' });
  const [receiver, setReceiver] = useState({ firstName: '', lastName: '', phone: '+213', address: '', complement: '', zip: '', city: '', country: '' });

  // Suggestions State
  const [senderSuggestions, setSenderSuggestions] = useState<string[]>([]);
  const [showSenderSuggestions, setShowSenderSuggestions] = useState(false);

  // Country Suggestions State
  const [countrySuggestions, setCountrySuggestions] = useState<string[]>([]);
  const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);

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

  const handleCountryChange = (value: string) => {
    const sanitizedVal = sanitize(value);
    setReceiver(prev => ({ ...prev, country: sanitizedVal }));

    if (sanitizedVal.length >= 2) {
      // Normalize input: remove accents and convert to lowercase
      const normalizedInput = sanitizedVal
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      const filtered = commonCountries.filter(c => {
        // Normalize country name: remove accents and convert to lowercase
        const normalizedCountry = c
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        // Use startsWith for prefix matching
        return normalizedCountry.startsWith(normalizedInput);
      });

      setCountrySuggestions(filtered);
      setShowCountrySuggestions(filtered.length > 0);
    } else {
      setCountrySuggestions([]);
      setShowCountrySuggestions(false);
    }
  };

  const selectCountry = (country: string) => {
    setReceiver(prev => ({ ...prev, country }));
    setShowCountrySuggestions(false);
  };



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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Prêt à déménager&nbsp;?</h2>
        <p className="text-gray-600">Regardez notre courte vidéo explicative ci-dessus pour en savoir plus.</p>

        <VideoPlaceholder className="mt-6 mb-8" title="Tout savoir sur le déménagement" />

        <div className="flex items-center gap-3 mb-8">
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
            <Ship className="text-blue-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Informations Déménagement</h3>
        </div>
      </div>

      <div className="space-y-8">
        {/* Question 1 */}
        <div>
          <label className="block text-lg font-medium text-gray-800 mb-4 flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              <Calendar className="text-blue-600" size={24} />
            </div>
            <span>Souhaitez-vous déménager cette année ?</span>
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
              <Box className="text-blue-600" size={24} />
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
                    placeholder="ex : 20"
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
    // Validation for Step 2
    const isSenderValid = sender.firstName && sender.lastName && sender.email && sender.phone && sender.address && sender.zip && sender.city;
    const isReceiverValid = receiver.country && receiver.address && receiver.zip && receiver.city;

    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Validez votre demande de devis</h2>
        <p className="text-gray-600 mb-8">Remplissez le formulaire ci-dessous pour finaliser votre demande</p>

        <div className="space-y-8">
          {/* Sender Form */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <User className="text-blue-600" /> Informations Départ (France)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Prénom*" className="p-3 border rounded-lg" value={sender.firstName} onChange={e => setSender({ ...sender, firstName: sanitize(e.target.value) })} />
              <input type="text" placeholder="Nom*" className="p-3 border rounded-lg" value={sender.lastName} onChange={e => setSender({ ...sender, lastName: sanitize(e.target.value) })} />
              <input type="email" placeholder="Email*" className="p-3 border rounded-lg" value={sender.email} onChange={e => setSender({ ...sender, email: sanitize(e.target.value) })} />
              <div className="relative">
                <input type="tel" placeholder="Téléphone (+33)*" className="p-3 border rounded-lg w-full" value={sender.phone} onChange={e => setSender({ ...sender, phone: sanitize(e.target.value) })} />
              </div>
              <input type="text" placeholder="Adresse*" className="md:col-span-2 p-3 border rounded-lg" value={sender.address} onChange={e => setSender({ ...sender, address: sanitize(e.target.value) })} />
              <input type="text" placeholder="Complément d'adresse" className="md:col-span-2 p-3 border rounded-lg" value={sender.complement} onChange={e => setSender({ ...sender, complement: sanitize(e.target.value) })} />
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
              <input type="text" placeholder="Ville" className="p-3 border rounded-lg" value={sender.city} onChange={e => setSender({ ...sender, city: sanitize(e.target.value) })} />
              <input type="text" value="France" disabled className="p-3 border rounded-lg bg-gray-100 text-gray-500" />
            </div>
          </section>

          {/* Receiver Form */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="text-blue-600" /> Informations Arrivée (Destination)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pays de destination</label>
                <input
                  type="text"
                  placeholder="Entrez le pays de destination"
                  className="w-full p-3 border rounded-lg"
                  value={receiver.country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                />
                {showCountrySuggestions && countrySuggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                    {countrySuggestions.map((country, idx) => (
                      <li
                        key={idx}
                        className="p-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700"
                        onClick={() => selectCountry(country)}
                      >
                        {country}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <input type="text" placeholder="Adresse de destination*" className="md:col-span-2 p-3 border rounded-lg" value={receiver.address} onChange={e => setReceiver({ ...receiver, address: sanitize(e.target.value) })} />
              <input type="text" placeholder="Complément d'adresse" className="md:col-span-2 p-3 border rounded-lg" value={receiver.complement} onChange={e => setReceiver({ ...receiver, complement: sanitize(e.target.value) })} />
              <input type="text" placeholder="Code postal*" className="p-3 border rounded-lg" value={receiver.zip} onChange={e => handleZipChange('receiver', sanitize(e.target.value))} />
              <input type="text" placeholder="Ville*" className="p-3 border rounded-lg" value={receiver.city} onChange={e => setReceiver({ ...receiver, city: sanitize(e.target.value) })} />
            </div>
          </section>

          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-6 border-t">
            <button
              onClick={prevStep}
              className="w-full md:w-auto py-3 text-gray-500 font-medium flex items-center justify-center gap-2 hover:text-gray-800"
            >
              <ArrowLeft size={18} /> Retour
            </button>

            <button
              onClick={handleSubmit}
              disabled={!isSenderValid || !isReceiverValid}
              className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold custom-shadow transition-all whitespace-normal h-auto min-h-[48px] ${isSenderValid && isReceiverValid ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-300 cursor-not-allowed text-gray-500'}`}
            >
              Confirmer ma demande
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
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Bonjour {sender.firstName}, Félicitations !</h2>
      <div className="bg-gray-50 rounded-xl p-6 text-center mb-8 space-y-4">
        <p className="text-gray-600">
          Vous vous rapprochez de votre nouvelle vie. Un commercial va vous contacter sous <strong>24 à 48h</strong> afin d’établir avec vous votre devis.
        </p>
      </div>

      <button
        onClick={() => {
          setStep(1);
          setFormData({ ...formData, moveThisYear: '', knowsVolume: '', volume: '' });
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
            className="w-full h-full object-cover object-center blur-sm scale-105"
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