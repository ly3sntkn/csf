import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: 'Ykrzorl',
            time: 'il y a une heure',
            rating: 5,
            text: "J'ai fais appel à cette entreprise après être tombé sur leur vidéos sur tiktok pour envoyer un colis à ma famille, donc j'ai décidé de tester leur service et jai absolument rien a dire a part bravo, ça fait plaisir d'avoir un service comme ça vers l'Algerie. Le colis est arrivé au domicile de mes proches à Oran en moins d'une semaine, merci à vous, désormais tout mes envoi passeront par vous 🙏"
        },
        {
            id: 2,
            name: 'Le Consigliere',
            time: 'il y a 3 jours',
            rating: 5,
            text: "Je tiens à remercier chaleureusement l'équipe CSF pour m'avoir accompagné durant mon déménagement de Toulouse à Tlemcen, ils se sont occupé de tout, ils ont su répondre à toutes mes questions et ont été professionnel du début à la fin, mes effets sont bien arrivé jusqu'à mon domicile en Algérie très rapidement, merci Yanis et l'équipe pour ce que vous faites pour la communauté, heureusement qu'il y a des entreprise comme la vôtre en qui ont peu avec pleinement confiance, je vous recommande 🙏🙏"
        },
        {
            id: 3,
            name: 'lounis benakli',
            time: 'il y a 5 mois',
            rating: 5,
            text: "Service très professionnel et rapide ! Mon colis envoyé de France vers l'Algérie est arrivé sans problème et dans les délais. Je recommande vivement cette agence pour leur sérieux et leur efficacité."
        },
        {
            id: 4,
            name: 'J D',
            time: 'il y a 11 mois',
            rating: 5,
            text: "Je me permet de mettre cet avis pour dire que je conseil fortement cet entreprise tres sérieuse. N'hesitez pas. je les recommande fortement c'est le number 1."
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
