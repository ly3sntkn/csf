import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: 'Ahmed Boumediene',
            location: 'Toulouse → Tlemcen',
            rating: 5,
            text: "Excellent service client et suivi personnalisé. CSF facilite vraiment les envois vers l'Algérie avec professionnalisme.",
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
        },
        {
            id: 2,
            name: 'Sofia K.',
            location: 'Lyon → Alger',
            rating: 5,
            text: "J'ai envoyé des cartons pour ma famille, tout est arrivé intact et rapidement. Je repasserai par vous sans hésitation.",
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
        },
        {
            id: 3,
            name: 'Yacine B.',
            location: 'Marseille → Oran',
            rating: 5,
            text: "Déménagement complet réalisé avec succès. L'équipe a été très efficace et le tarif était compétitif. Merci !",
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
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
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Ils nous ont fait confiance
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-bold">
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
                                    <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
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
                                    <h4 className="font-bold text-gray-900">
                                        {testimonials[currentIndex].name}
                                    </h4>
                                    <p className="text-gray-600 font-medium">
                                        {testimonials[currentIndex].location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 md:-left-6 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 hidden md:block"
                    >
                        <ChevronLeft size={24} className="text-gray-600" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-0 md:-right-6 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 hidden md:block"
                    >
                        <ChevronRight size={24} className="text-gray-600" />
                    </button>

                    {/* Dots indicator */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
