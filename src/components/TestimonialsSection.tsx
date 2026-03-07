import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, BadgeCheck } from 'lucide-react';

const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            id: 101,
            name: 'Fatima Meziane',
            time: 'il y a 2 mois',
            rating: 5,
            text: "Je recommande vivement CSF ! Ils ont géré mon déménagement avec un soin particulier. Tous mes biens sont arrivés intacts."
        },
        {
            id: 102,
            name: 'Ykrzorl',
            time: 'il y a 1 mois',
            rating: 5,
            text: "J'ai fais appel à cette entreprise après être tombé sur leur vidéos sur tiktok pour envoyer un colis à ma famille, donc j'ai décidé de tester leur service et jai absolument rien a dire a part bravo, ça fait plaisir d'avoir un service comme ça vers l'Algerie. Le colis est arrivé au domicile de mes proches à Oran en moins d'une semaine, merci à vous, désormais tout mes envoi passeront par vous 🙏"
        },
        {
            id: 103,
            name: 'Lounis Benakli',
            time: 'il y a 5 mois',
            rating: 5,
            text: "Service très professionnel et rapide ! Mon colis envoyé de France vers l'Algérie est arrivé sans problème et dans les délais. Je recommande vivement cette agence pour leur sérieux et leur efficacité."
        },
        {
            id: 104,
            name: 'J D',
            time: 'il y a 11 mois',
            rating: 5,
            text: "Je me permet de mettre cet avis pour dire que je conseille fortement cet entreprise tres sérieuse. N'hesitez pas. je les recommande fortement c'est le number 1."
        },
        {
            id: 1,
            name: 'Wiss Quattro',
            time: 'il y a 3 mois',
            rating: 5,
            text: "Merci énormément, mes pièces de voitures viennent d'arriver à l'instant à Oran, entreprise très efficace (connaissant la difficulté du transport vers l'Algérie ...) Bravo à vous , je n'hésiterai pas à faire appel à vous en cas de besoin inchallah 👌"
        },
        {
            id: 2,
            name: 'Y17 TRAVAUX',
            time: 'il y a 4 mois',
            rating: 5,
            text: "Bonsoir à tous, Je tenais à partager mon expérience avec la société CSF ORLY, que je recommande les yeux fermés, je leurs ai confié deux cartons au mois d'août, après m'y être rendu dans leur entrepôt, l'accueil était digne d'une société européenne de haut niveau, puis les deux cartons sont arrivés deux deux wilayas différentes en moins d'une semaine, intactes, les livreurs très aimables. J'encourage cette société aux services à l'américaine, je leurs souhaite beaucoup de réussites, notre pays a besoin de ce genre de société. Merci à toute l'équipe, un Grand Bravo."
        },
        {
            id: 3,
            name: 'Nadjia Kolla',
            time: 'il y a un mois',
            rating: 5,
            text: "Je remercie chaleureusement l'équipe CSF . Un personnel professionnel , compétent et reste à l'écoute pour n'importe quelle question. Deux envois déjà partis et arrivés sans aucun problème. 👏👏"
        },
        {
            id: 4,
            name: 'Ponix92 Ponix92',
            time: 'il y a 3 mois',
            rating: 5,
            text: "J'ai fait appel à la société CSF pour l'expédition d'un colis vers l'Algérie et je suis absolument ravie de mon expérience. Leur service est tout simplement exceptionnel. Rapidité : La rapidité d'expédition a dépassé toutes mes attentes, le colis est arrivé beaucoup plus vite que prévu. Sérieux : L'organisation et le sérieux de l'équipe dans la gestion du transport sont irréprochables. On se sent en confiance. Service Client : Je tiens également à souligner la gentillesse et l'amabilité de mon interlocuteur au téléphone. C'est très appréciable d'être aussi bien accompagné tout au long du processus. Je recommande CSF à 100% pour la qualité de leur service et leur professionnalisme."
        },
        {
            id: 5,
            name: 'Sonia Makrerougrass',
            time: 'il y a 5 mois',
            rating: 5,
            text: "Service vraiment sérieux et professionnel. Mon colis est arrivé rapidement, bien protégé, avec même des médicaments inclus, sans aucun souci au niveau du transport. Le suivi était clair et l'équipe a été disponible pour répondre à mes questions. Je recommande fortement ce transporteur pour les envois entre la France et l'Algérie. Merci encore"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
            );
        }, 10000); // 10 seconds per slide

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
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-normal mb-6">
                        Ce que nos clients pensent de notre sérieux et notre fiabilité
                    </p>

                    {/* Google Badge */}
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                        <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span className="font-bold text-gray-700 text-sm">Avis Google Certifiés</span>
                        <div className="flex items-center text-blue-600">
                            <BadgeCheck size={20} className="fill-blue-600 text-white" />
                        </div>
                    </div>
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
