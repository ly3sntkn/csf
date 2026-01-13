import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
    const testimonials = [
        {
            name: 'Sarah M.',
            rating: 5,
            date: 'Il y a 2 semaines',
            text: "Service impeccable ! Mon colis est arrivé à Alger en parfait état et dans les délais annoncés. Le suivi est très rassurant.",
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
        },
        {
            name: 'Karim B.',
            rating: 5,
            date: 'Il y a 1 mois',
            text: "J'ai déménagé tout mon appartement de Lyon vers Oran avec CSF. Une équipe pro, à l'écoute et très soigneuse. Je recommande !",
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
        },
        {
            name: 'Amel L.',
            rating: 5,
            date: 'Il y a 3 semaines',
            text: "Première fois que j'envoie des pièces auto. Tout s'est bien passé, douane incluse. Merci pour le professionnalisme.",
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Ils nous ont fait confiance</h2>
                    <p className="text-xl text-gray-600">
                        Ce que nos clients pensent de notre sérieux et notre fiabilité
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                                    <p className="text-sm text-gray-500">{testimonial.date}</p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                    />
                                ))}
                            </div>

                            <p className="text-gray-600 leading-relaxed">
                                "{testimonial.text}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
