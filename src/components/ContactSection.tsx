import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Paperclip, User, MessageSquare } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    attachment: null as File | null
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Handle form submission logic here
  };

  return (
    <section id="achat-livraison" className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Contactez-Nous
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Nos Coordonnées</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Téléphones</h4>
                    <p className="text-gray-600">Fixe: +33 1 49 75 30 01</p>
                    <p className="text-gray-600">Mobile: +33 7 85 76 20 55</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <Mail size={20} className="text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Email</h4>
                    <p className="text-gray-600">yanis.yataghene@csfgroupe.fr</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <MapPin size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Adresse</h4>
                    <p className="text-gray-600">
                      123 Avenue de la République<br />
                      75011 Paris, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Clock size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Horaires</h4>
                    <p className="text-gray-600">Lundi - Vendredi: 9h - 18h</p>
                    <p className="text-gray-600">Support 7j/7 pour urgences</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Achat & Livraison */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Service Achat & Livraison</h3>
              <p className="mb-6 text-green-100">
                Vous souhaitez acheter en Europe et faire livrer en Afrique ?
                Notre service d'achat et livraison vous facilite la vie !
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-300 rounded-full"></div>
                  <span>Achat pour votre compte en Europe</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-300 rounded-full"></div>
                  <span>Vérification et conditionnement</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-300 rounded-full"></div>
                  <span>Expédition sécurisée vers l'Afrique</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-300 rounded-full"></div>
                  <span>Suivi complet de votre commande</span>
                </div>
              </div>
              <button className="mt-6 bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors border-2 border-green-600">
                En Savoir Plus
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <MessageSquare className="text-blue-600 mr-3" size={24} />
              <h3 className="text-2xl font-bold text-gray-800">Formulaire de Contact</h3>
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

              <div>
                <label className="block text-gray-700 font-medium mb-2">Adresse e-mail *</label>
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
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold text-lg flex items-center justify-center space-x-2 shadow-lg"
              >
                <Send size={20} />
                <span>Envoyer le Message</span>
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm text-center">
                <strong>Réponse garantie sous 24h</strong> - Nous nous engageons à vous répondre rapidement
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;