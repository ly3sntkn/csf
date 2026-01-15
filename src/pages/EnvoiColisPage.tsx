import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Package, Ruler, Scale, User, MapPin, Plus, Trash2,
  CreditCard, Check, AlertTriangle, ArrowRight, ArrowLeft, X
} from 'lucide-react';
import VideoPlaceholder from '../components/VideoPlaceholder';

// Types
type ShippingType = 'personal' | 'parts';

interface InventoryItem {
  id: string;
  description: string;
  quantity: number;
  value: number;
}

interface QuoteData {
  type: ShippingType;
  weight: number;
  length: number;
  width: number;
  height: number;
  price: number;
}

const EnvoiColisPage = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 'success'>(1);
  const [showSwornStatement, setShowSwornStatement] = useState(false);
  const [showProhibitedPopup, setShowProhibitedPopup] = useState(false);

  // Quote State
  const [quote, setQuote] = useState<QuoteData>({
    type: 'personal',
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    price: 0
  });

  // Details State
  const [sender, setSender] = useState({ firstName: '', lastName: '', email: '', phone: '+33', address: '', complement: '', zip: '', city: '', country: 'France' });
  const [receiver, setReceiver] = useState({ firstName: '', lastName: '', phone: '+213', address: '', complement: '', zip: '', city: '', country: 'Algérie' });
  const [inventory, setInventory] = useState<InventoryItem[]>([{ id: '1', description: '', quantity: 1, value: 0 }]);
  const [insurance, setInsurance] = useState(false);
  const [swornChecks, setSwornChecks] = useState<Record<string, boolean>>({});

  // Constants
  const MAX_WEIGHT = 30;

  // Calculate Price functionality
  // Pricing Grid Configuration
  const PRICING_GRID = {
    personal: [
      { max: 0.5, price: 39.90 },
      { max: 1, price: 41.90 },
      { max: 2, price: 47.90 },
      { max: 3, price: 52.90 },
      { max: 4, price: 56.90 },
      { max: 5, price: 62.90 },
      { max: 6, price: 69.90 },
      { max: 7, price: 72.90 },
      { max: 8, price: 76.90 },
      { max: 9, price: 79.90 },
      { max: 10, price: 84.90 },
      { max: 15, price: 99.90 },
      { max: 20, price: 119.90 },
      { max: 25, price: 129.90 },
      { max: 30, price: 139.90 },
    ],
    parts: [
      { max: 0.5, price: 89.90 },
      { max: 1, price: 91.90 },
      { max: 2, price: 97.90 },
      { max: 3, price: 102.90 },
      { max: 4, price: 126.90 },
      { max: 5, price: 132.90 },
      { max: 6, price: 139.90 },
      { max: 7, price: 142.90 },
      { max: 8, price: 146.90 },
      { max: 9, price: 179.90 },
      { max: 10, price: 184.90 },
      { max: 15, price: 199.90 },
      { max: 20, price: 269.90 },
      { max: 25, price: 279.90 },
      { max: 30, price: 289.90 },
    ]
  };

  // Calculate Price functionality
  useEffect(() => {
    if (quote.weight > 0 && quote.length > 0 && quote.width > 0 && quote.height > 0) {
      // 1. Calculate Volumetric Weight (L x l x H / 5000)
      const volWeight = (quote.length * quote.width * quote.height) / 5000;

      // 2. Determine Chargeable Weight (Max of Real vs Volumetric)
      const chargeableWeight = Math.max(quote.weight, volWeight);

      // 3. Find Price in Grid
      const grid = PRICING_GRID[quote.type];
      const tier = grid.find(t => chargeableWeight <= t.max);

      // If weight exceeds 30kg (largest tier), price is 0 (or handle as error/custom quote)
      // For now, if it exceeds, we fallback to the highest tier or 0.
      // But the UI shows an error if > 30kg anyway.
      const finalPrice = tier ? tier.price : 0;

      setQuote(prev => ({ ...prev, price: finalPrice }));
    } else {
      setQuote(prev => ({ ...prev, price: 0 }));
    }
  }, [quote.weight, quote.length, quote.width, quote.height, quote.type]);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuote({ ...quote, weight: parseFloat(e.target.value) || 0 });
  };

  const isOverweight = quote.weight > MAX_WEIGHT;
  const isQuoteValid = quote.weight > 0 && quote.weight <= MAX_WEIGHT && quote.length > 0 && quote.width > 0 && quote.height > 0;

  // Inventory Management
  const addInventoryItem = () => {
    setInventory([...inventory, { id: Math.random().toString(), description: '', quantity: 1, value: 0 }]);
  };

  const removeInventoryItem = (id: string) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const updateInventoryItem = (id: string, field: keyof InventoryItem, value: any) => {
    setInventory(inventory.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const totalValue = inventory.reduce((sum, item) => sum + (item.value * item.quantity), 0);
  const insuranceCost = totalValue * 0.10;

  // Auto-fill City Logic (Simplistic mock)
  const handleZipChange = (type: 'sender' | 'receiver', value: string) => {
    if (type === 'sender') {
      setSender(prev => ({ ...prev, zip: value }));
      if (value.startsWith('75')) setSender(prev => ({ ...prev, city: 'Paris' }));
    } else {
      setReceiver(prev => ({ ...prev, zip: value }));
      if (value.startsWith('16')) setReceiver(prev => ({ ...prev, city: 'Alger' }));
    }
  };

  // Sworn Statement Logic
  const swornStatements = [
    "Je déclare que le colis ne contient aucun produit interdit, illicite ou réglementé, selon la législation du pays d'exportation, du pays d'importation et de tout pays de transit, et que je suis seul responsable de la conformité du contenu du colis aux réglementations en vigueur.",
    "Je certifie que les informations fournies concernant le poids, les dimensions, le contenu et la valeur du colis sont exactes et complètes.",
    "Je reconnais que toute fausse déclaration engage ma seule responsabilité, y compris en cas de contrôle, saisie, amende, retard ou poursuites par les autorités compétentes.",
    "En cas d'écart constaté (poids, dimensions, contenu), j'accepte que des frais supplémentaires, des ajustements tarifaires ou le refus d'expédition puissent être appliqués sans possibilité de remboursement.",
    "Je reconnais que les délais de livraison sont donnés à titre indicatif et peuvent être impactés par des facteurs indépendants de CSF (douanes, contrôles, grèves, météo, décisions administratives, sécurité aérienne).",
    "Je reconnais que CSF ne pourra être tenu responsable des retards, saisies ou dommages résultant de ces facteurs externes.",
    "J'ai pris connaissance et j'accepte les Conditions Générales de Vente."
  ];

  const allSwornChecked = swornStatements.every((_, idx) => swornChecks[idx]);

  const handlePayment = () => {
    if (allSwornChecked) {
      setShowSwornStatement(false);
      setStep('success');
      window.scrollTo(0, 0);
    }
  };

  // RENDER STEPS
  const renderStep1 = () => (
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Prêt à envoyer votre colis ?</h2>
        <p className="text-gray-600">Regardez notre courte vidéo explicative ci-dessus pour en savoir plus.</p>

        <VideoPlaceholder className="mt-6 mb-8" title="Comment envoyer votre colis" />



        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Package className="text-blue-600" />
          Informations Colis
        </h3>

        {/* Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div
            className={`cursor-pointer border-2 rounded-xl p-4 flex items-center space-x-3 transition-all ${quote.type === 'personal' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
            onClick={() => setQuote({ ...quote, type: 'personal' })}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${quote.type === 'personal' ? 'border-blue-600' : 'border-gray-400'}`}>
              {quote.type === 'personal' && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
            </div>
            <span className="font-medium">Effets personnels</span>
          </div>

          <div
            className={`cursor-pointer border-2 rounded-xl p-4 flex items-center space-x-3 transition-all ${quote.type === 'parts' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
            onClick={() => setQuote({ ...quote, type: 'parts' })}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${quote.type === 'parts' ? 'border-blue-600' : 'border-gray-400'}`}>
              {quote.type === 'parts' && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
            </div>
            <span className="font-medium">Pièces détachées de voiture</span>
          </div>
        </div>

        {quote.type === 'parts' && (
          <p className="text-amber-600 text-sm mb-6 flex items-center gap-2">
            <AlertTriangle size={16} />
            Seules les pièces pour voitures sont acceptées
          </p>
        )}

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Poids (kg)</label>
            <div className="relative">
              <Scale className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="number"
                value={quote.weight || ''}
                onChange={handleWeightChange}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg outline-none focus:border-blue-500 transition-colors ${isOverweight ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                placeholder="Ex: 5"
              />
            </div>
            {isOverweight && (
              <div className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded border border-red-200">
                ⚠️ Le poids réel ou volumétrique ne doit pas dépasser 30 kg. Surcoût applicable.
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Long. (cm)</label>
              <input
                type="number"
                value={quote.length || ''}
                onChange={(e) => setQuote({ ...quote, length: parseFloat(e.target.value) })}
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-blue-500"
                placeholder="L"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Larg. (cm)</label>
              <input
                type="number"
                value={quote.width || ''}
                onChange={(e) => setQuote({ ...quote, width: parseFloat(e.target.value) })}
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-blue-500"
                placeholder="l"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Haut. (cm)</label>
              <input
                type="number"
                value={quote.height || ''}
                onChange={(e) => setQuote({ ...quote, height: parseFloat(e.target.value) })}
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-blue-500"
                placeholder="H"
              />
            </div>
          </div>
        </div>

        {/* Pricing Display */}
        {isQuoteValid && !isOverweight && (
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8 flex justify-between items-center animate-fade-in">
            <div>
              <span className="text-gray-500 text-sm">Votre Tarif</span>
              <div className="text-3xl font-bold text-gray-900">{quote.price.toFixed(2)} €</div>
              <div className="text-sm text-blue-600 font-medium mt-1 italic">
                Basé sur le poids volumétrique
              </div>
              {(quote.length * quote.width * quote.height) / 5000 > quote.weight && (
                <span className="text-xs text-orange-600 block mt-1">
                  Basé sur le poids volumétrique ({((quote.length * quote.width * quote.height) / 5000).toFixed(2)} Kg)
                </span>
              )}
            </div>
          </div>
        )}

        <button
          onClick={() => { window.scrollTo(0, 0); setStep(2); }}
          disabled={!isQuoteValid || isOverweight}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all ${!isQuoteValid || isOverweight ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'}`}
        >
          <span>Continuer avec ce devis</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Validez votre devis</h2>
      <p className="text-gray-600 mb-8">Remplissez le formulaire ci-dessous pour finaliser l'expédition</p>

      {/* Recap */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
          <Check size={20} /> Récapitulatif
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="block text-green-600">Type</span>
            <span className="font-medium text-green-900">{quote.type === 'personal' ? 'Effets personnels' : 'Pièces auto'}</span>
          </div>
          <div>
            <span className="block text-green-600">Poids</span>
            <span className="font-medium text-green-900">{quote.weight} kg</span>
          </div>
          <div>
            <span className="block text-green-600">Dimensions</span>
            <span className="font-medium text-green-900">{quote.length}x{quote.width}x{quote.height} cm</span>
          </div>
          <div>
            <span className="block text-green-600">Prix</span>
            <span className="font-bold text-green-900 text-lg">{quote.price.toFixed(2)} €</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Sender Form */}
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <User className="text-blue-600" /> Informations Expéditeur (France)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Prénom*" className="p-3 border rounded-lg" value={sender.firstName} onChange={e => setSender({ ...sender, firstName: e.target.value })} />
            <input type="text" placeholder="Nom*" className="p-3 border rounded-lg" value={sender.lastName} onChange={e => setSender({ ...sender, lastName: e.target.value })} />
            <input type="email" placeholder="Email*" className="p-3 border rounded-lg" value={sender.email} onChange={e => setSender({ ...sender, email: e.target.value })} />
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 text-sm"></span>
              <input type="tel" placeholder="Téléphone (+33)" className="p-3 border rounded-lg w-full" value={sender.phone} onChange={e => setSender({ ...sender, phone: e.target.value })} />
            </div>
            <input type="text" placeholder="Adresse*" className="md:col-span-2 p-3 border rounded-lg" value={sender.address} onChange={e => setSender({ ...sender, address: e.target.value })} />
            <input type="text" placeholder="Complément d'adresse" className="md:col-span-2 p-3 border rounded-lg" value={sender.complement} onChange={e => setSender({ ...sender, complement: e.target.value })} />
            <input type="text" placeholder="Code postal*" className="p-3 border rounded-lg" value={sender.zip} onChange={e => handleZipChange('sender', e.target.value)} />
            <input type="text" placeholder="Ville" className="p-3 border rounded-lg" value={sender.city} onChange={e => setSender({ ...sender, city: e.target.value })} />
            <input type="text" value="France" disabled className="p-3 border rounded-lg bg-gray-100 text-gray-500" />
          </div>
        </section>

        {/* Receiver Form */}
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="text-blue-600" /> Informations Destinataire (Algérie)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Prénom*" className="p-3 border rounded-lg" value={receiver.firstName} onChange={e => setReceiver({ ...receiver, firstName: e.target.value })} />
            <input type="text" placeholder="Nom*" className="p-3 border rounded-lg" value={receiver.lastName} onChange={e => setReceiver({ ...receiver, lastName: e.target.value })} />
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 text-sm"></span>
              <input type="tel" placeholder="Téléphone (+213)" className="p-3 border rounded-lg w-full" value={receiver.phone} onChange={e => setReceiver({ ...receiver, phone: e.target.value })} />
            </div>
            <input type="text" placeholder="Adresse*" className="md:col-span-2 p-3 border rounded-lg" value={receiver.address} onChange={e => setReceiver({ ...receiver, address: e.target.value })} />
            <input type="text" placeholder="Complément d'adresse" className="md:col-span-2 p-3 border rounded-lg" value={receiver.complement} onChange={e => setReceiver({ ...receiver, complement: e.target.value })} />
            <input type="text" placeholder="Code postal*" className="p-3 border rounded-lg" value={receiver.zip} onChange={e => handleZipChange('receiver', e.target.value)} />
            <input type="text" placeholder="Ville" className="p-3 border rounded-lg" value={receiver.city} onChange={e => setReceiver({ ...receiver, city: e.target.value })} />
            <input type="text" value="Algérie" disabled className="p-3 border rounded-lg bg-gray-100 text-gray-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">⚠️ Si nous ne parvenons pas à joindre le destinataire, le colis sera déposé au point relais le plus proche.</p>
        </section>

        {/* Inventory */}
        <section>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Inventaire du colis</h3>
          <p className="text-sm text-gray-600 mb-2">Déclarez précisément le contenu. Les objets de valeur (consoles, or, argent...) sont interdits.</p>

          <button
            onClick={() => setShowProhibitedPopup(true)}
            className="text-red-600 text-sm font-medium hover:underline mb-4 flex items-center gap-1 bg-red-50 p-2 rounded"
          >
            <AlertTriangle size={16} /> Voir la liste des produits interdits
          </button>

          <div className="bg-gray-50 p-4 rounded-xl space-y-3">
            {inventory.map((item, idx) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                <input
                  type="text"
                  placeholder={idx === 0 ? "Ex: Pantalon femme" : "Description"}
                  className="col-span-6 p-2 border rounded"
                  value={item.description}
                  onChange={e => updateInventoryItem(item.id, 'description', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Qte"
                  className="col-span-2 p-2 border rounded"
                  value={item.quantity}
                  onChange={e => updateInventoryItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                />
                <div className="col-span-3 relative">
                  <input
                    type="number"
                    placeholder="€"
                    className="w-full p-2 pr-6 border rounded"
                    value={item.value || ''}
                    onChange={e => updateInventoryItem(item.id, 'value', parseFloat(e.target.value) || 0)}
                  />
                  <span className="absolute right-2 top-2 text-gray-400">€</span>
                </div>
                <button
                  onClick={() => removeInventoryItem(item.id)}
                  disabled={inventory.length === 1}
                  className={`col-span-1 flex justify-center ${inventory.length === 1 ? 'text-gray-300' : 'text-red-500 hover:text-red-700'}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button onClick={addInventoryItem} className="text-blue-600 font-medium text-sm flex items-center gap-1 mt-2">
              <Plus size={16} /> Ajouter un objet
            </button>
          </div>

          <div className="mt-4 p-4 border border-blue-100 rounded-xl bg-blue-50">
            <div className="flex items-start gap-3">
              <div className="mt-1"><AlertTriangle size={18} className="text-blue-500" /></div>
              <div className="text-sm text-blue-800">
                <p className="font-bold">Information douanière :</p>
                <p>Dans de rares situations, la douane algérienne peut demander au destinataire de récupérer le colis à Alger et régler une taxe éventuelle.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance */}
        <section className="border rounded-xl p-6 hover:border-blue-300 transition-colors cursor-pointer" onClick={() => setInsurance(!insurance)}>
          <div className="flex items-start gap-3">
            <div className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ${insurance ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
              {insurance && <Check size={16} className="text-white" />}
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Optez pour la Garantie CSF (Facultative)</h4>
              <p className="text-gray-600 text-sm mt-1">Protégez vos colis contre la perte, le vol ou les dommages.</p>
              <div className="mt-3 text-sm text-gray-500">
                <p>• Coût : 10% de la valeur déclarée ({insuranceCost.toFixed(2)} €)</p>
                <p>• Remboursement max : 70% de la valeur.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between pt-6 border-t">
          <button
            onClick={() => { window.scrollTo(0, 0); setStep(1); }}
            className="text-gray-500 font-medium flex items-center gap-2 hover:text-gray-800"
          >
            <ArrowLeft size={18} /> Retour
          </button>

          <button
            onClick={() => setShowSwornStatement(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold custom-shadow transition-all"
          >
            Procéder au paiement
          </button>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 animate-fade-in text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check size={40} className="text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirmation de votre expédition</h2>
      <p className="text-gray-500 mb-8">N° de dossier : CSF-2026-0001</p>

      <div className="bg-gray-50 rounded-xl p-6 text-left mb-8 space-y-4">
        <p className="font-medium text-gray-800">Bonjour {sender.firstName},</p>
        <p className="text-gray-600">Merci pour votre confiance !</p>
        <p className="text-gray-600">
          Vos documents d'expédition (bordereau d'expédition et documents douaniers) vous seront envoyés par email sous <strong>24 à 48h</strong>.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-blue-800 text-sm font-medium mb-1">⚠️ Message important :</p>
          <p className="text-blue-800 text-sm">Une fois reçus, scotchez les documents sur votre colis et déposez-le dans n'importe quel bureau de Poste en France.</p>
        </div>
      </div>

      <button
        onClick={() => {
          setStep(1);
          setQuote({ ...quote, weight: 0 }); // Reset logic could be fuller
          window.scrollTo(0, 0);
        }}
        className="text-blue-600 font-medium hover:underline"
      >
        Retour à l'accueil
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-0">
      <Helmet>
        <title>Envoi de Colis France-Algérie - CSF Transport</title>
        <meta name="description" content="Expédiez vos colis vers l'Algérie en toute sécurité. Devis immédiat pour effets personnels et pièces détachées. Transport rapide et fiable." />
        <link rel="canonical" href="https://csf-transport.com/envoi-colis" />
      </Helmet>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-white text-gray-900 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Envoi de Colis vers l'Algérie
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            Expédiez vos colis en toute simplicité et sécurité
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-blue-800 max-w-2xl mx-auto">
            <p className="text-sm">
              ⚠️ <strong>Information importante :</strong> Expéditions disponibles uniquement de la France vers l'Algérie
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-3xl pb-24">
        {step !== 'success' && (
          <div className="flex items-center justify-center mb-10 space-x-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all ${step >= 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className={`w-16 h-1 rounded transition-all ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all ${step >= 2 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>2</div>
            <div className={`w-16 h-1 rounded transition-all ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all ${step >= 3 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>3</div>
          </div>
        )}

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 'success' && renderSuccess()}

        {/* Prohibited Items Modal */}
        {showProhibitedPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl relative animate-scale-in">
              <button
                onClick={() => setShowProhibitedPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl font-bold text-red-600 mb-6 flex items-center gap-2">
                <AlertTriangle /> Produits Interdits
              </h3>
              <ul className="space-y-3 text-gray-700 list-disc pl-5">
                <li>Armes à feu, munitions, explosifs</li>
                <li>Stupéfiants et psychotropes</li>
                <li>Contrefaçons</li>
                <li>Produits inflammables, radioactifs ou corrosifs</li>
                <li>Animaux vivants</li>
                <li>Objets de valeur (Bijoux, Or, Argent, Devises)</li>
                <li>Appareils électroniques neufs destinés à la revente (téléphones, PC, consoles en quantité commerciale)</li>
                <li>Drones et équipements de surveillance</li>
              </ul>
              <button
                onClick={() => setShowProhibitedPopup(false)}
                className="mt-8 w-full py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors"
              >
                J'ai compris
              </button>
            </div>
          </div>
        )}

        {/* Sworn Statement Modal */}
        {showSwornStatement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-scale-in">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Attestation sur l'honneur – Obligatoire</h3>

              <div className="space-y-4 mb-8">
                {swornStatements.map((statement, idx) => (
                  <label key={idx} className="flex items-start gap-3 cursor-pointer p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={!!swornChecks[idx]}
                      onChange={(e) => setSwornChecks({ ...swornChecks, [idx]: e.target.checked })}
                    />
                    <span className="text-sm text-gray-700 leading-relaxed text-left">{statement}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowSwornStatement(false)}
                  className="flex-1 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handlePayment}
                  disabled={!allSwornChecked}
                  className={`flex-1 py-3 rounded-xl font-bold text-white transition-all ${allSwornChecked ? 'bg-green-600 hover:bg-green-700 shadow-lg' : 'bg-gray-300 cursor-not-allowed'}`}
                >
                  Confirmer et payer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnvoiColisPage;