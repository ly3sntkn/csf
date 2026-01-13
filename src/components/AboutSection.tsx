import React from 'react';
import { Shield, Globe, Heart, CheckCircle, Package, Truck, ShoppingCart, ArrowRight, Users, Clock, Award } from 'lucide-react';

const AboutSection = () => {
  const values = [
    {
      icon: Shield,
      title: 'Fiabilité',
      description: 'Sécurité garantie pour tous vos envois'
    },
    {
      icon: Globe,
      title: 'Connexion',
      description: 'Pont entre l\'Europe et l\'Afrique'
    },
    {
      icon: Heart,
      title: 'Confiance',
      description: 'Relation de confiance avec nos clients'
    }
  ];

  const handleServiceClick = (service: string) => {
    const event = new CustomEvent('navigate', { detail: service });
    window.dispatchEvent(event);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Titre principal centré */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            CSF : Votre Partenaire de Confiance
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            CSF facilite les échanges entre l'Europe et l'Afrique. 
            Notre mission est de connecter les familles, les entreprises et les communautés à travers 
            un service de transport fiable, sécurisé et accessible.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          
          {/* LEFT SECTION - Values */}
          <div className="flex flex-col space-y-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="flex items-center space-x-4 text-left">
                  <div className="flex-shrink-0 p-3 bg-blue-100 rounded-full">
                    <IconComponent size={32} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CENTER SECTION - Image */}
          <div className="space-y-8">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-64 flex items-center justify-center">
              <img 
                src="/livreurcontent.png"
                alt="Service CSF"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* RIGHT SECTION - Notre Engagement */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white h-64 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-6">Notre Engagement</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Livraison dans les délais convenus</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Suivi transparent de vos envois</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Support client disponible 7j/7</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Assurance complète de vos biens</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;