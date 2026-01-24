import React, { useEffect, useState } from 'react';
import { Package, Ship, Car, Award } from 'lucide-react';

const KeyMetrics = () => {
  const [counters, setCounters] = useState({
    packages: 0,
    moving: 0,
    vehicles: 0
  });

  useEffect(() => {
    const targets = {
      packages: 500,
      moving: 300,
      vehicles: 800
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        packages: Math.floor(targets.packages * progress),
        moving: Math.floor(targets.moving * progress),
        vehicles: Math.floor(targets.vehicles * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const metrics = [
    {
      icon: Award,
      value: "98%",
      label: "Taux de Satisfaction",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Package,
      value: `+${counters.packages}`,
      label: 'Colis Expédiés Chaque Semaine',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: Ship,
      value: `+${counters.moving}`,
      label: 'Déménagements Internationaux Chaque Année',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Car,
      value: `+${counters.vehicles}`,
      label: 'Véhicules Transportés Par An',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Nos Chiffres Clés
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Des résultats qui témoignent de notre engagement envers l'excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center transform hover:-translate-y-1"
              >
                <div className={`inline-flex p-4 rounded-full ${metric.bgColor} mb-4`}>
                  <IconComponent size={32} className={metric.color} />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {metric.value}
                </div>
                <div className="text-gray-700 text-sm tracking-wider first-letter:uppercase">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeyMetrics;