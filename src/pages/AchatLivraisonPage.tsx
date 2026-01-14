import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Car, Search, FileCheck, Truck, CheckCircle, Globe, Shield, Clock, ArrowRight, Star, AlertTriangle, Phone, Mail } from 'lucide-react';

const AchatLivraisonPage: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: "1. Recherche & Sélection",
      description: "Nous trouvons le véhicule de vos rêves selon vos critères et budget",
      color: "bg-blue-100 text-blue-600",
      details: [
        "Recherche personnalisée selon vos critères",
        "Vérification de l'historique du véhicule",
        "Négociation du meilleur prix",
        "Photos et rapport détaillé"
      ]
    },
    {
      icon: FileCheck,
      title: "2. Achat & Paperasse",
      description: "Nous nous occupons de tout l'achat et des formalités administratives",
      color: "bg-green-100 text-green-600",
      details: [
        "Achat sécurisé du véhicule",
        "Gestion de tous les documents",
        "Contrôle technique si nécessaire",
        "Préparation des papiers d'export"
      ]
    },
    {
      icon: Truck,
      title: "3. Transport & Export",
      description: "Expédition sécurisée de votre véhicule vers l'Algérie",
      color: "bg-red-100 text-red-600",
      details: [
        "Transport vers le port d'embarquement",
        "Formalités douanières d'export",
        "Chargement sécurisé sur le navire",
        "Suivi en temps réel"
      ]
    },
    {
      icon: CheckCircle,
      title: "4. Réception en Algérie",
      description: "Récupérez votre véhicule au port d'Alger",
      color: "bg-purple-100 text-purple-600",
      details: [
        "Arrivée au port d'Alger",
        "Assistance pour les formalités",
        "Contrôle de l'état du véhicule",
        "Remise des clés et documents"
      ]
    }
  ];

  const advantages = [
    {
      icon: Globe,
      title: "Réseau Européen",
      description: "Accès à tous les marchés automobiles européens"
    },
    {
      icon: Shield,
      title: "Achat Sécurisé",
      description: "Vérifications complètes et garanties incluses"
    },
    {
      icon: Clock,
      title: "Service Clé en Main",
      description: "De la recherche à la livraison, nous gérons tout"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-24">
      <Helmet>
        <title>Achat & Export Véhicules Europe-Algérie - CSF Transport</title>
        <meta name="description" content="Importation de véhicules depuis l'Europe vers l'Algérie. Recherche, achat, transport et formalités douanières. Service clé en main sécurisé." />
        <link rel="canonical" href="https://csf-transport.com/achat-livraison" />
      </Helmet>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Achat & Export de Véhicules
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Trouvez et importez le véhicule de vos rêves depuis l'Europe vers l'Algérie
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-blue-800 max-w-2xl mx-auto">
            <p className="text-sm">
              ⚠️ <strong>Information importante :</strong> Service disponible uniquement de l'Europe vers l'Algérie
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Comment ça Marche ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un processus simple en 4 étapes pour importer votre véhicule
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 p-4 rounded-full ${step.color}`}>
                      <IconComponent size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Pourquoi Choisir CSF ?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl shadow-lg p-8 text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600">
                    {advantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="text-yellow-600 mr-4" size={32} />
                <h2 className="text-2xl font-bold text-gray-800">Informations Importantes</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-bold text-blue-800 mb-2">Formalités Douanières</h3>
                  <p className="text-blue-700 text-sm">
                    À l'arrivée en Algérie, vous devrez vous acquitter des droits de douane selon la réglementation algérienne en vigueur.
                    Nous vous assistons dans toutes les démarches.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-green-800 mb-2">Documents Requis</h3>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Passeport algérien ou carte consulaire</li>
                    <li>• Justificatif de résidence en Europe</li>
                    <li>• Permis de conduire valide</li>
                    <li>• Attestation d'assurance</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-bold text-red-800 mb-2">Délais Moyens</h3>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Recherche et achat: 7-15 jours</li>
                    <li>• Préparation export: 3-5 jours</li>
                    <li>• Transport maritime: 1-3 jours</li>
                    <li>• Formalités douanières: 2-7 jours</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Importer Votre Véhicule ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contactez nos experts pour un devis personnalisé et commencer votre projet d'import
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="tel:+33149753001"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Phone size={20} />
              <span>+33 1 49 75 30 01</span>
            </a>
            <a
              href="mailto:yanis.yataghene@csfgroupe.fr"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
            >
              <Mail size={20} />
              <span>Demander un Devis</span>
            </a>
          </div>
          <p className="text-blue-200 text-sm">
            Réponse garantie sous 24h • Devis gratuit et sans engagement
          </p>
        </div>
      </section>
    </div>
  );
};

export default AchatLivraisonPage;