import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Clock, Send, Paperclip, MessageSquare } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    attachment: null as File | null
  });

  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      attachment: file
    }));
  };

  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          data: formData,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          attachment: null
        });
        alert('Votre message a bien été envoyé !');
      } else {
        setStatus('error');
        alert("Une erreur est survenue lors de l'envoi du message.");
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      alert("Une erreur est survenue lors de l'envoi du message.");
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-0">
      <Helmet>
        <title>Contactez CSF Transport - Devis & Renseignements</title>
        <meta name="description" content="Contactez CSF Transport pour vos envois de colis, déménagements et export de véhicules vers l'Algérie. Devis gratuit et réponse sous 24h." />
        <link rel="canonical" href="https://csf-transport.com/contact" />
      </Helmet>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contactez-Nous
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
            et vous accompagner dans vos projets de transport
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone size={24} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Téléphones</h3>
              <p className="text-gray-600 text-sm mb-2">Fixe: +33 1 49 75 30 01</p>
              <p className="text-gray-600 text-sm">Mobile: +33 7 85 76 20 55</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail size={24} className="text-red-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 text-sm">yanis.yataghene@csfgroupe.fr</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin size={24} className="text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Adresse</h3>
              <p className="text-gray-600 text-sm">123 Avenue de la République<br />75011 Paris, France</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock size={24} className="text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Horaires</h3>
              <p className="text-gray-600 text-sm">Lun-Ven: 9h-18h<br />Support 7j/7</p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <MessageSquare className="text-blue-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">Envoyez-nous un Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Prénom *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Nom *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Objet du message *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Sélectionner un objet</option>
                    <option value="envoi-colis">Envoi de Colis</option>
                    <option value="demenagement">Déménagement</option>
                    <option value="achat-livraison">Achat & Livraison</option>
                    <option value="suivi-colis">Suivi de Colis</option>
                    <option value="reclamation">Réclamation</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Décrivez votre demande en détail..."
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Pièce jointe (optionnelle)</label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="attachment"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor="attachment"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                    >
                      <Paperclip size={20} className="text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        {formData.attachment ? formData.attachment.name : 'Cliquer pour joindre un fichier'}
                      </span>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Formats acceptés: PDF, DOC, DOCX, JPG, PNG (max 10MB)
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold text-lg flex items-center justify-center space-x-2 shadow-lg ${status === 'loading' ? 'opacity-70 cursor-wait' : ''}`}
                >
                  <Send size={20} />
                  <span>{status === 'loading' ? 'Envoi en cours...' : 'Envoyer le Message'}</span>
                </button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm text-center">
                  <strong>Réponse garantie sous 24h</strong> - Nous nous engageons à vous répondre rapidement
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Questions Fréquentes</h3>
              <div className="space-y-4">
                {[
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
                ].map((faq, index) => (
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

            {/* Emergency Contact */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Contact d'Urgence</h3>
              <p className="mb-4 text-red-100">
                Pour toute urgence concernant vos envois, notre équipe est disponible 7j/7.
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8">
                <p className="font-medium flex items-center gap-2">📞 +33 7 85 76 20 55</p>
                <p className="font-medium flex items-center gap-2">✉️ urgence@csfgroupe.fr</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;