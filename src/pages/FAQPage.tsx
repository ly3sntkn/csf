import React from 'react';
import { Helmet } from 'react-helmet-async';

const FAQPage = () => {
    const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

    const faqs = [
        {
            category: "Envoi de Colis",
            items: [
                {
                    question: "Quels sont vos délais de livraison ?",
                    answer: "En moyenne, nos délais de livraison sont de 7 à 10 jours ouvrés pour l'Algérie, selon la ville de destination. Pour l'Île-de-France, les enlèvements se font sous 48h."
                },
                {
                    question: "Proposez-vous une assurance ?",
                    answer: "Oui, nous proposons une assurance optionnelle CSF Garantie qui couvre la perte, le vol ou les dommages à hauteur de 70% de la valeur déclarée. Le coût est de 10% de la valeur déclarée."
                },
                {
                    question: "Quels sont les produits interdits ?",
                    answer: "Sont strictement interdits : armes, munitions, stupéfiants, contrefaçons, produits inflammables ou explosifs, animaux vivants, or, argent et devises. Les appareils électroniques neufs en quantité commerciale sont également réglementés."
                },
                {
                    question: "Proposez-vous l'enlèvement à domicile ?",
                    answer: "Oui, nous proposons un service d'enlèvement à domicile gratuit en Île-de-France pour tout envoi. Pour les autres régions, contactez-nous pour connaître les conditions."
                }
            ]
        },
        {
            category: "Déménagement",
            items: [
                {
                    question: "Fournissez-vous les cartons et emballages ?",
                    answer: "Oui, nous proposons une gamme complète de matériel d'emballage professionnel (cartons, bulles, adhésifs) que vous pouvez commander lors de votre devis."
                },
                {
                    question: "Vous occupez-vous des démarches douanières ?",
                    answer: "Nous vous accompagnons dans toutes les formalités administratives et douanières pour votre déménagement en tant que CCR (Certificat de Changement de Résidence)."
                }
            ]
        },
        {
            category: "Véhicules",
            items: [
                {
                    question: "Quels documents pour exporter un véhicule ?",
                    answer: "Pour l'exportation, vous aurez besoin de la carte grise originale, d'un certificat de non-gage récent, d'une copie de votre pièce d'identité et du certificat de cession si le véhicule vient d'être acheté."
                },
                {
                    question: "Le véhicule doit-il être vide ?",
                    answer: "Les véhicules doivent être vides d'effets personnels pour le transport maritime, sauf accord spécifique pour le transport en conteneur sécurisé."
                }
            ]
        },
        {
            category: "Paiement & Divers",
            items: [
                {
                    question: "Quels sont les moyens de paiement acceptés ?",
                    answer: "Nous acceptons les paiements par carte bancaire (en ligne ou TPE), virement bancaire et espèces (dans la limite légale)."
                }
            ]
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
                        <div className="space-y-8">
                            {faqs.map((category, catIndex) => (
                                <div key={catIndex}>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <div className="w-2 h-8 bg-blue-600 rounded"></div>
                                        {category.category}
                                    </h2>
                                    <div className="space-y-4">
                                        {category.items.map((faq, itemIndex) => {
                                            const globalIndex = catIndex * 100 + itemIndex; // detailed index unique
                                            return (
                                                <div key={itemIndex} className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-200 transition-colors">
                                                    <button
                                                        className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                                                        onClick={() => setOpenFaqIndex(openFaqIndex === globalIndex ? null : globalIndex)}
                                                    >
                                                        <span className="font-medium text-gray-800 pr-4">{faq.question}</span>
                                                        {openFaqIndex === globalIndex ? (
                                                            <span className="text-blue-600 text-xl font-bold flex-shrink-0">-</span>
                                                        ) : (
                                                            <span className="text-gray-400 text-xl font-bold flex-shrink-0">+</span>
                                                        )}
                                                    </button>
                                                    {openFaqIndex === globalIndex && (
                                                        <div className="p-4 bg-white border-t border-gray-200 animate-fade-in">
                                                            <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
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
