import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: 'Sofiane Cherifi',
            time: 'il y a 2 semaines',
            rating: 5,
            text: "Je remercie l'équipe CSF GROUPE pour leur professionnalisme et leur serieux et savoir faire, j'ai envoyé un fauteuil roulant électrique et franchement j'ai beaucoup apprécié leur présence en vous tien au courant du suivi de france jusqu'à Alger, rapidité transparente et serieux avec YANIS et toute l'équipe.\nBonne continuation et je précise les fauteuils roulant pour les personnes a mobilités réduites cest GRATUIT à recommander.\nSofiane."
        },
        {
            id: 2,
            name: 'Wafa Bouchouata',
            time: 'il y a 2 mois',
            rating: 5,
            text: "Service plus que parfait, je remercie toute l’équipe pour leur professionnalisme, ponctualité parfaite, et leur disponibilité, j’ai déposé mon colis à la poste le 12 novembre et ma sœur à reçu le colis aujourd’hui livraison à domicile, je vous dis juste à très bientôt"
        },
        {
            id: 3,
            name: 'souad layaida',
            time: 'il y a 3 mois',
            rating: 5,
            text: "Très bon service, j’ai envoyé un colis vers l’Algérie qui est arrivé en 10 jours. Ils sont à l’écoute, répondent aux questions, suivi au top. Je vous le recommande les yeux fermés"
        },
        {
            id: 4,
            name: 'Nadjia Kolla',
            time: 'il y a 2 mois',
            rating: 5,
            text: "Je remercie chaleureusement l’équipe CSF . Un personnel professionnel , compétent et reste à l’écoute pour n’importe quelle question. Deux envois déjà partis et arrivés sans aucun problème. 👏👏"
        },
        {
            id: 5,
            name: 'Glovel',
            time: 'il y a 8 mois',
            rating: 5,
            text: "Explications claires et nettes. Service rapide Franchement, j’ai apprécié\nÇa fait plaisir de voir une entreprise algérienne sérieuse et fiable.\nIl faut soutenir ce genre d’initiatives 💪\nJe repasserais par vous sans hésitation ! 🇩🇿"
        },
        {
            id: 6,
            name: 'Sana P',
            time: 'il y a 6 mois',
            rating: 5,
            text: "Bonne expérience, colis arrivé rapidement chez ma famille, je recommande."
        },
        {
            id: 7,
            name: 'Lyes Nait Ikene',
            time: 'Récemment',
            rating: 5,
            text: "Je recommande, communication claire. J'éspère bientot réutiliser le service"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 6000); // 6 seconds for slightly longer text reading

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
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-normal">
                        Ce que nos clients pensent de notre sérieux et notre fiabilité
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 min-h-[300px] flex flex-col justify-center">
                        <div className="flex items-center justify-center mb-6">
                            <Quote size={48} className="text-blue-200" />
                        </div>

                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                    <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>

                            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed italic whitespace-pre-line">
                                "{testimonials[currentIndex].text}"
                            </p>

                            <div className="flex flex-col items-center justify-center">
                                <h4 className="font-bold text-gray-900 text-lg">
                                    {testimonials[currentIndex].name}
                                </h4>
                                <p className="text-gray-500 font-medium text-sm mt-1">
                                    {testimonials[currentIndex].time}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation buttons - Visible on Mobile now */}
                    <button
                        onClick={goToPrevious}
                        className="absolute -left-2 md:-left-6 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 z-10"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={24} className="text-gray-600" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute -right-2 md:-right-6 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 z-10"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={24} className="text-gray-600" />
                    </button>

                    {/* Dots indicator */}
                    <div className="flex justify-center mt-8 space-x-2 overflow-x-auto py-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors flex-shrink-0 ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
