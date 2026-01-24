import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: 'Fatima L.',
            location: 'Paris → Alger',
            rating: 5,
            text: "J'appréhendais un peu pour envoyer le fauteuil roulant électrique de mon père, mais l'équipe a été super rassurante. Ils m'ont tenu au courant de tout, du départ jusqu'à l'arrivée à Alger. C'est rare de voir un tel sérieux, et en plus c'était gratuit pour le matériel médical. Merci infiniment !",
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'
        },
        {
            id: 2,
            name: 'Mohamed D.',
            location: 'Lyon → Oran',
            rating: 5,
            text: "Pièces auto reçues à Oran en parfait état. Je pensais que ça allait galérer avec la douane comme d'habitude, mais là rien à dire, c'est passé crème. Efficacité redoutable, je repasserai par vous pour le prochain envoi.",
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
        },
        {
            id: 3,
            name: 'Laura S.',
            location: 'Marseille → Annaba',
            rating: 5,
            text: "Une équipe très pro, un grand merci à Yacine pour sa patience au téléphone. J'avais beaucoup de questions pour mon déménagement et il a pris le temps de tout m'expliquer. Tout est arrivé intact à Annaba. Je recommande les yeux fermés.",
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
        },
        {
            id: 4,
            name: 'Karim B.',
            location: 'Lille → Tizi Ouzou',
            rating: 5,
            text: "Service au top ! Colis livré directement devant la porte de ma famille à Tizi. Franchement, le suivi est transparent, on sait où est le colis. C'est carré, merci à toute l'équipe CSF.",
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
        },
        {
            id: 5,
            name: 'Samia Ben.',
            location: 'Bordeaux → Constantine',
            rating: 5,
            text: "Première expérience réussie avec CSF. J'ai envoyé des vêtements et des cadeaux pour l'Aïd, délai respecté et livreur très poli. Ça change des autres transporteurs que j'ai pu tester. À bientôt !",
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
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
