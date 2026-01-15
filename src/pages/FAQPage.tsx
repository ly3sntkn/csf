import React from 'react';
import { Helmet } from 'react-helmet-async';

const FAQPage = () => {
    const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

    const faqs = [
        {
            question: "Quels sont vos délais de livraison ?",
            answer: "En moyenne 7 jours pour l'Algérie, selon la destination finale."
        },
        {
            question: "Proposez-vous une assurance ?",
            answer: "Oui, nous proposons une assurance complète pour tous vos envois."
        },
        {
            question: "Comment suivre mon colis ?",
            answer: "Vous recevez un numéro de suivi pour tracer votre envoi en temps réel."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-0">
            <Helmet>
                <title>FAQ - Questions Fréquentes - CSF Transport</title>
                <meta name="description" content="Toutes les réponses à vos questions sur l'envoi de colis, le déménagement et l'export de véhicules vers l'Algérie avec CSF Transport." />
                <link rel="canonical" href="https://csf-transport.com/faq" />
            </Helmet>

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Questions Fréquentes
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                        Retrouvez ici les réponses aux questions les plus posées
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <button
                                        className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                    >
                                        <span className="font-medium text-gray-800">{faq.question}</span>
                                        {openFaqIndex === index ? (
                                            <span className="text-blue-600 text-xl font-bold">-</span>
                                        ) : (
                                            <span className="text-gray-400 text-xl font-bold">+</span>
                                        )}
                                    </button>
                                    {openFaqIndex === index && (
                                        <div className="p-4 bg-white border-t border-gray-200">
                                            <p className="text-gray-600 text-sm">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQPage;
