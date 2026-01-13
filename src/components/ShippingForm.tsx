import React, { useState } from 'react';
import { Package, Play, X, CheckCircle, AlertTriangle } from 'lucide-react';

const ShippingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showProhibitedItems, setShowProhibitedItems] = useState(false);
  const [showAttestation, setShowAttestation] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1
    shipmentType: 'personal', // 'personal' or 'car-parts'
    weight: '',
    length: '',
    width: '',
    height: '',
    // Step 2
    senderFirstName: '',
    senderLastName: '',
    senderEmail: '',
    senderPhone: '+33',
    senderAddress: '',
    senderComplement: '',
    senderPostalCode: '',
    senderCity: '',
    senderCountry: 'France',
    recipientFirstName: '',
    recipientLastName: '',
    recipientPhone: '+213',
    recipientAddress: '',
    recipientComplement: '',
    recipientPostalCode: '',
    recipientCity: '',
    recipientCountry: 'Algérie',
    // Inventory
    inventory: [{ description: '', quantity: '', value: '' }],
    // Insurance
    insurance: false,
    // Attestations
    attestations: {
      noProhibited: false,
      accurateInfo: false,
      falseDeclaration: false,
      additionalFees: false,
      deliveryDelays: false,
      externalFactors: false,
      termsAccepted: false
    }
  });

  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [weightWarning, setWeightWarning] = useState(false);

  const prohibitedItems = [
    'Produits en série destinés à la vente',
    'Produits professionnels',
    'Consoles de jeux',
    'Téléphones',
    'Ordinateurs',
    'Argent liquide',
    'Bijoux de valeur',
    'Produits inflammables',
    'Liquides',
    'Batteries au lithium',
    'Médicaments',
    'Produits périssables',
    'Armes et munitions',
    'Produits chimiques'
  ];

  const inventoryExamples = [
    { description: 'Pantalon femme', quantity: '4', value: '25' },
    { description: 'Vestes homme', quantity: '2', value: '45' },
    { description: 'Chaussures', quantity: '3', value: '60' },
    { description: 'Accessoires', quantity: '5', value: '30' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Calculate price and check weight
    if (['weight', 'length', 'width', 'height'].includes(name)) {
      calculatePrice({ ...formData, [name]: newValue });
    }

    // Auto-fill city based on postal code (simplified)
    if (name === 'senderPostalCode' && value.length === 5) {
      setFormData(prev => ({ ...prev, senderCity: 'Paris' }));
    }
    if (name === 'recipientPostalCode' && value.length === 5) {
      setFormData(prev => ({ ...prev, recipientCity: 'Alger' }));
    }
  };

  const handleAttestationChange = (key: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      attestations: {
        ...prev.attestations,
        [key]: checked
      }
    }));
  };

  const calculatePrice = (data: typeof formData) => {
    if (!data.weight || !data.length || !data.width || !data.height) {
      setCalculatedPrice(0);
      setWeightWarning(false);
      return;
    }

    const weight = parseFloat(data.weight);
    const length = parseFloat(data.length);
    const width = parseFloat(data.width);
    const height = parseFloat(data.height);

    // Calculate volumetric weight (L x W x H / 5000)
    const volumetricWeight = (length * width * height) / 5000;
    const chargeableWeight = Math.max(weight, volumetricWeight);

    // Check if weight exceeds 30kg
    if (chargeableWeight > 30) {
      setWeightWarning(true);
    } else {
      setWeightWarning(false);
    }

    // Base price calculation (simplified)
    let basePrice = 25; // Base price for Algeria
    if (chargeableWeight > 1) {
      basePrice += (chargeableWeight - 1) * 8;
    }

    setCalculatedPrice(Math.round(basePrice));
  };

  const addInventoryItem = () => {
    setFormData(prev => ({
      ...prev,
      inventory: [...prev.inventory, { description: '', quantity: '', value: '' }]
    }));
  };

  const updateInventoryItem = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      inventory: prev.inventory.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const getTotalValue = () => {
    return formData.inventory.reduce((total, item) => {
      const value = parseFloat(item.value) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + (value * quantity);
    }, 0);
  };

  const getInsurancePrice = () => {
    return getTotalValue() * 0.1;
  };

  const allAttestationsChecked = () => {
    return Object.values(formData.attestations).every(checked => checked);
  };

  const nextStep = () => {
    if (currentStep === 1 && calculatedPrice > 0) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (allAttestationsChecked()) {
      // Redirect to payment
      console.log('Redirecting to payment...', formData);
      alert('Redirection vers le paiement sécurisé...');
    }
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      {/* Video Section */}
      <div className="bg-gray-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Prêt à envoyer votre colis ?
        </h2>
        <p className="text-gray-600 mb-6">
          Regardez notre courte vidéo explicative ci-dessus pour en savoir plus.
        </p>
        <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-6">
          <div className="text-center">
            <Play size={48} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Vidéo explicative (60-90 secondes)</p>
            <p className="text-sm text-gray-400 mt-2">
              "Bonjour, je suis Yanis, fondateur de CSF..."
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <p className="text-center text-gray-600 mb-6">
          Remplissez le formulaire ci-dessous pour obtenir votre devis gratuit.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            ⚠️ <strong>Information importante :</strong> pour le moment, les expéditions sont disponibles uniquement de la France vers l'Algérie.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Informations Colis *
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            « Les champs marqués d'un astérisque sont obligatoires. »
          </p>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-3">Type d'envoi :</label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="shipmentType"
                  value="personal"
                  checked={formData.shipmentType === 'personal'}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <span>Effets personnels</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="shipmentType"
                  value="car-parts"
                  checked={formData.shipmentType === 'car-parts'}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <span>Pièces détachées de voiture</span>
              </label>
            </div>
            {formData.shipmentType === 'car-parts' && (
              <p className="text-blue-600 text-sm mt-2">
                Seules les pièces pour voitures sont acceptées
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Poids (kg) *</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Longueur (cm) *</label>
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Largeur (cm) *</label>
              <input
                type="number"
                name="width"
                value={formData.width}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Hauteur (cm) *</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {weightWarning && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-yellow-800 text-sm">
                ⚠️ <strong>Information importante</strong><br />
                Le poids réel ou le poids volumétrique de chaque colis ne doit pas dépasser 30 kg.
                En cas de dépassement, un surcoût sera appliqué.
              </p>
            </div>
          )}

          {calculatedPrice > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
              <h4 className="font-bold text-green-800 mb-2">Tarif calculé</h4>
              <div className="text-2xl font-bold text-green-800">{calculatedPrice}€</div>
            </div>
          )}

          <button
            onClick={nextStep}
            disabled={!calculatedPrice}
            className={`w-full mt-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
              calculatedPrice 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
          >
            Continuer avec ce devis
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Validez votre devis
        </h2>
        <p className="text-gray-600 mb-6">
          Remplissez le formulaire ci-dessous pour finaliser l'expédition de votre colis
        </p>

        {/* Quote Summary */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-green-800 mb-4">Récapitulatif de votre devis</h3>
          <div className="space-y-2 text-green-700">
            <p>• Type d'envoi : {formData.shipmentType === 'personal' ? 'Effets personnels' : 'Pièces détachées de voiture'}</p>
            <p>• Poids : {formData.weight} kg</p>
            <p>• Dimensions : {formData.length} x {formData.width} x {formData.height} cm</p>
            <p className="text-lg font-bold">• Prix total : {calculatedPrice + (formData.insurance ? getInsurancePrice() : 0)}€</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-blue-800 text-sm">
            ⚠️ <strong>Information importante :</strong> pour le moment, les expéditions sont disponibles uniquement de la France vers l'Algérie.
          </p>
        </div>

        {/* Sender Information */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Informations Expéditeur (France)
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            « Les champs marqués d'un astérisque sont obligatoires. »
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Prénom *</label>
              <input
                type="text"
                name="senderFirstName"
                value={formData.senderFirstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Nom *</label>
              <input
                type="text"
                name="senderLastName"
                value={formData.senderLastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email *</label>
              <input
                type="email"
                name="senderEmail"
                value={formData.senderEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Téléphone *</label>
              <input
                type="tel"
                name="senderPhone"
                value={formData.senderPhone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Adresse (numéro + rue) *</label>
              <input
                type="text"
                name="senderAddress"
                value={formData.senderAddress}
                onChange={handleInputChange}
                placeholder="Ex : 12 rue de la République"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Complément d'adresse</label>
              <input
                type="text"
                name="senderComplement"
                value={formData.senderComplement}
                onChange={handleInputChange}
                placeholder="Appartement 3B, étage 2, bâtiment A"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Code postal *</label>
              <input
                type="text"
                name="senderPostalCode"
                value={formData.senderPostalCode}
                onChange={handleInputChange}
                placeholder="75001"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Ville *</label>
              <input
                type="text"
                name="senderCity"
                value={formData.senderCity}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Pays</label>
              <input
                type="text"
                name="senderCountry"
                value={formData.senderCountry}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Recipient Information */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Informations Destinataire (Algérie)
          </h3>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Prénom *</label>
              <input
                type="text"
                name="recipientFirstName"
                value={formData.recipientFirstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Nom *</label>
              <input
                type="text"
                name="recipientLastName"
                value={formData.recipientLastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Téléphone *</label>
              <input
                type="tel"
                name="recipientPhone"
                value={formData.recipientPhone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Adresse (numéro + rue) *</label>
              <input
                type="text"
                name="recipientAddress"
                value={formData.recipientAddress}
                onChange={handleInputChange}
                placeholder="Ex : 12 rue de la République"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-yellow-800 text-sm">
              ⚠️ <strong>Information importante :</strong><br />
              Si nous ne parvenons pas à joindre le destinataire ou si l'adresse est introuvable, votre colis sera déposé au point relais postal le plus proche de l\'adresse indiquée en Algérie. Merci de vous assurer que les informations fournies sont exactes pour éviter tout retard.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Complément d'adresse</label>
              <input
                type="text"
                name="recipientComplement"
                value={formData.recipientComplement}
                onChange={handleInputChange}
                placeholder="Appartement 3B, étage 2, bâtiment A"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Code postal *</label>
              <input
                type="text"
                name="recipientPostalCode"
                value={formData.recipientPostalCode}
                onChange={handleInputChange}
                placeholder="16000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Ville *</label>
              <input
                type="text"
                name="recipientCity"
                value={formData.recipientCity}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Pays</label>
              <input
                type="text"
                name="recipientCountry"
                value={formData.recipientCountry}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Inventaire du colis
          </h3>
          <p className="text-gray-600 mb-4">
            Déclarez précisément le contenu de votre colis pour garantir un transport sécurisé.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 text-sm mb-3">
              ⚠️ Les produits en série destinés à la vente ou les produits professionnels, ainsi que les objets de valeur (consoles de jeux, téléphones, ordinateurs, argent liquide, etc.) ne sont pas autorisés.
            </p>
            <p className="text-red-800 text-sm mb-3">
              N'hésitez pas à cliquer sur le bouton ci-dessous pour consulter la liste précise des produits interdits.
            </p>
            <button
              onClick={() => setShowProhibitedItems(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
            >
              Voir les produits interdits
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 font-medium">
              <div>Description des objets</div>
              <div>Quantité</div>
              <div>Valeur totale estimée (€)</div>
            </div>
            {formData.inventory.map((item, index) => (
              <div key={index} className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder={inventoryExamples[index % inventoryExamples.length].description}
                  value={item.description}
                  onChange={(e) => updateInventoryItem(index, 'description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder={inventoryExamples[index % inventoryExamples.length].quantity}
                  value={item.quantity}
                  onChange={(e) => updateInventoryItem(index, 'quantity', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder={inventoryExamples[index % inventoryExamples.length].value}
                  value={item.value}
                  onChange={(e) => updateInventoryItem(index, 'value', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              onClick={addInventoryItem}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2"
            >
              <span>➕</span>
              <span>Ajouter un objet</span>
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-blue-800 text-sm mb-2">
              ⚠️ Cet inventaire est requis pour les formalités douanières.
              Vérifiez que votre inventaire ne contient aucun produit interdit avant de finaliser.
            </p>
            <p className="text-blue-800 text-sm">
              ⚠️ <strong>Information douanière :</strong><br />
              Dans de rares situations, la douane algérienne peut demander au destinataire de récupérer le colis à leur bureau sur Alger et régler une taxe éventuelle basée sur la valeur du colis. Cela concerne principalement les colis de valeur élevée nécessitant une vérification supplémentaire.
            </p>
          </div>
        </div>

        {/* Insurance */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Optez pour la Garantie CSF (Facultative)
          </h3>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
            <p className="text-yellow-800 mb-4">
              Souscrire à la garantie CSF vous permet de protéger vos colis contre la perte, le vol ou les dommages.
            </p>
            <p className="text-yellow-800 mb-4">
              Cette garantie est facultative et son coût correspond à 10 % de la valeur totale du colis ou produit assuré.
            </p>
            <p className="text-yellow-800 mb-4">
              (Ex. : valeur du colis {getTotalValue()}€ → {getInsurancePrice().toFixed(2)}€ pour souscrire à la garantie)
            </p>
            <p className="text-yellow-800 mb-4">
              Le remboursement maximum est de 70 % de la valeur HT déclarée sur la facture ou bon d'achat fourni.
            </p>

            <div className="bg-white p-4 rounded border mb-4">
              <h4 className="font-bold text-yellow-800 mb-2">Conditions importantes :</h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• La garantie est optionnelle. Si vous choisissez de ne pas prendre la garantie, vous acceptez que CSF ne pourra être tenu responsable en cas de perte, vol ou dommage.</li>
                <li>• Pour toute réclamation, une facture ou bon d'achat doit être fournie pour justifier la valeur du colis ou produit assuré.</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded border mb-4">
              <h4 className="font-bold text-yellow-800 mb-2">La garantie ne couvre pas :</h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Les colis ou produits non déclarés</li>
                <li>• Les produits interdits (voir liste des produits interdits)</li>
                <li>• Les informations incorrectes ou incomplètes sur le poids, les dimensions ou le contenu du colis</li>
              </ul>
            </div>

            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="insurance"
                checked={formData.insurance}
                onChange={handleInputChange}
                className="mt-1"
              />
              <div className="text-yellow-800 text-sm">
                <p className="font-medium mb-1">Je souhaite souscrire à la garantie CSF pour mon colis.</p>
                <p>Je comprends que cette garantie est facultative et que son coût correspond à 10 % de la valeur totale du colis ou du produit assuré.</p>
                <p>Le remboursement est limité à 70 % de la valeur HT indiquée sur la facture ou le bon d'achat communiqué.</p>
                <p>Je reconnais que, en l'absence de souscription à cette garantie, CSF ne pourra être tenu responsable en cas de perte, vol ou dommage.</p>
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Retour
          </button>
          <button
            onClick={() => setShowAttestation(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Procéder au paiement
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {currentStep === 1 ? renderStep1() : renderStep2()}

        {/* Prohibited Items Modal */}
        {showProhibitedItems && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Produits Interdits</h3>
                  <button
                    onClick={() => setShowProhibitedItems(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
                <ul className="space-y-2">
                  {prohibitedItems.map((item, index) => (
                    <li key={index} className="flex items-center text-red-700">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Attestation Modal */}
        {showAttestation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Attestation sur l'honneur – Obligatoire avant paiement</h3>
                  <button
                    onClick={() => setShowAttestation(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-4 mb-6">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.attestations.noProhibited}
                      onChange={(e) => handleAttestationChange('noProhibited', e.target.checked)}
                      className="mt-1"
                    />
                    <span className="text-sm">Je déclare que le colis ne contient aucun produit interdit, illicite ou réglementé, selon la législation du pays d'exportation, du pays d'importation et de tout pays de transit, et que je suis seul responsable de la conformité du contenu du colis aux réglementations en vigueur.</span>
                  </label>

                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.attestations.accurateInfo}
                      onChange={(e) => handleAttestationChange('accurateInfo', e.target.checked)}
                      className="mt-1"
                    />
                    <span className="text-sm">Je certifie que les informations fournies concernant le poids, les dimensions, le contenu et la valeur du colis sont exactes et complètes.</span>
                  </label>

                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.attestations.falseDeclaration}
                      onChange={(e) => handleAttestationChange('falseDeclaration', e.target.checked)}
                      className="mt-1"
                    />
                    <span className="text-sm">Je reconnais que toute fausse déclaration engage ma seule responsabilité, y compris en cas de contrôle, saisie, amende, retard ou poursuites par les autorités compétentes.</span>
                  </label>

                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.attestations.additionalFees}
                      onChange={(e) => handleAttestationChange('additionalFees', e.target.checked)}
                      className="mt-1"
                    />
                    <span className="text-sm">En cas d'écart constaté (poids, dimensions, contenu), j'accepte que des frais supplémentaires, des ajustements tarifaires ou le refus d'expédition puissent être appliqués sans possibilité de remboursement.</span>
                  </label>

                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.attestations.deliveryDelays}
                      onChange={(e) => handleAttestationChange('deliveryDelays', e.target.checked)}
                      className="mt-1"
                    />
                    <span className="text-sm">Je reconnais que les délais de livraison sont donnés à titre indicatif et peuvent être impactés par des facteurs indépendants de CSF (douanes, contrôles, grèves, météo, décisions administratives, sécurité aérienne).</span>
                  </label>

                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.attestations.externalFactors}
                      onChange={(e) => handleAttestationChange('externalFactors', e.target.checked)}
                      className="mt-1"
                    />
                    <span className="text-sm">Je reconnais que CSF ne pourra être tenu responsable des retards, saisies ou dommages résultant de ces facteurs externes.</span>
                  </label>

                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.attestations.termsAccepted}
                      onChange={(e) => handleAttestationChange('termsAccepted', e.target.checked)}
                      className="mt-1"
                    />
                    <span className="text-sm">J'ai pris connaissance et j'accepte les Conditions Générales de Vente.</span>
                  </label>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowAttestation(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!allAttestationsChecked()}
                    className={`px-6 py-3 rounded-lg font-bold transition-colors ${
                      allAttestationsChecked()
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    Confirmer et payer
                  </button>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ Après paiement, vos documents d'expédition à scotcher sur votre colis vous seront envoyés par email sous 24 à 48h.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShippingForm;