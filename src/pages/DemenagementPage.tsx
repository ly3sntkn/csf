import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Ship, Calendar, Box, MapPin, User, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import VideoPlaceholder from '../components/VideoPlaceholder';

const DemenagementPage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    moveThisYear: '', // 'oui', 'non', 'jsp'
    knowsVolume: '', // 'oui', 'non'
    volume: '',
    departure: 'France',
    destination: 'Algérie',
    firstName: '',
    lastName: '',
    phone: '+33',
    email: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const renderStep1 = () => (
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
          <Ship size={24} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Informations Déménagement</h2>
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

  const renderStep2 = () => (
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <User className="text-blue-600" /> Vos Coordonnées
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pays de départ</label>
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-500 cursor-not-allowed">
              <MapPin size={18} className="mr-2" />
              France
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pays de destination</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Nom"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="tel"
            placeholder="Téléphone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={prevStep}
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 flex items-center gap-2"
          >
            <ArrowLeft size={18} /> Retour
          </button>
          <button
            onClick={handleSubmit}
            disabled={!formData.firstName || !formData.lastName || !formData.phone}
            className={`flex-1 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${!formData.firstName || !formData.lastName || !formData.phone
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

  const renderSuccess = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-12 text-center animate-scale-in">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check size={48} className="text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Bonjour {formData.firstName}, Félicitations !
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
      <section className="pt-32 pb-16 bg-white text-gray-900 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Vous souhaitez déménager vers un autre pays ?
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Nous vous accompagnons vers votre nouvelle vie
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-3xl pb-24">
        {/* Intro & Video */}
        {step !== 3 && (
          <div className="text-center mb-12">
            <p className="text-gray-600 mb-6">
              Tout savoir sur le déménagement international ? Regardez notre courte vidéo explicative ci-dessus pour en savoir plus.
            </p>
            <VideoPlaceholder className="max-w-3xl mx-auto mb-12" title="Tout savoir sur le déménagement" />
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

        {/* Steps Content */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderSuccess()}
      </div>
    </div>
  );
};

export default DemenagementPage;