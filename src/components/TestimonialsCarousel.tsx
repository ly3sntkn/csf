import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Amina Benali',
      location: 'Paris → Alger',
      rating: 5,
      text: 'Service exceptionnel ! Mon colis est arrivé en parfait état et dans les délais promis. L\'équipe CSF est très professionnelle et à l\'écoute.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 2,
      name: 'Karim Boudjelal',
      location: 'Lyon → Alger',
      rating: 5,
      text: 'Après plusieurs mauvaises expériences avec d\'autres transporteurs, CSF a restauré ma confiance. Suivi en temps réel et livraison impeccable.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 3,
      name: 'Fatima Meziane',
      location: 'Marseille → Oran',
      rating: 5,
      text: 'Je recommande vivement CSF ! Ils ont géré mon déménagement avec un soin particulier. Tous mes biens sont arrivés intacts.',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 4,
      name: 'Youcef Hamidi',
      location: 'Tours → Constantine',
      rating: 5,
      text: 'Prix compétitifs et service de qualité. L\'équipe CSF comprend vraiment les besoins de la diaspora algérienne en Europe.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 5,
      name: 'Samira Khelifi',
      location: 'Paris → Annaba',
      rating: 5,
      text: 'CSF m\'a aidée à envoyer des cadeaux à ma famille en Algérie. Service rapide et sécurisé, je les recommande sans hésitation.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 6,
      name: 'Ahmed Boumediene',
      location: 'Toulouse → Tlemcen',
      rating: 5,
      text: 'Excellent service client et suivi personnalisé. CSF facilite vraiment les envois vers l\'Algérie avec professionnalisme.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Ils nous ont fait confiance
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ce que nos clients pensent de notre sérieux et notre fiabilité
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center justify-center mb-6">
              <Quote size={48} className="text-blue-200" />
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-red-400 fill-current" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </p>

              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="font-bold text-gray-800">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[currentIndex].location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;