<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Mettez l'URL exacte en prod, ex: https://csf-transport.com
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// === CONFIGURATION ===
$stripeSecretKey = 'VOTRE_CLÉ_SECRÈTE_STRIPE_ICI'; // <-- À remplacer par la VRAIE CLÉ (ne pas publier sur GitHub)
$frontendUrl = 'https://csf-transport.com'; // L'URL de votre site
// =====================

// Les grilles de tarification (doivent correspondre EXACTEMENT au front-end)
$pricingGrid = [
    'personal' => [
        ['max' => 0.5, 'price' => 39.90],
        ['max' => 1, 'price' => 41.90],
        ['max' => 2, 'price' => 47.90],
        ['max' => 3, 'price' => 52.90],
        ['max' => 4, 'price' => 56.90],
        ['max' => 5, 'price' => 62.90],
        ['max' => 6, 'price' => 69.90],
        ['max' => 7, 'price' => 72.90],
        ['max' => 8, 'price' => 76.90],
        ['max' => 9, 'price' => 79.90],
        ['max' => 10, 'price' => 84.90],
        ['max' => 15, 'price' => 99.90],
        ['max' => 20, 'price' => 119.90],
        ['max' => 25, 'price' => 129.90],
        ['max' => 30, 'price' => 139.90],
    ],
    'parts' => [
        ['max' => 0.5, 'price' => 89.90],
        ['max' => 1, 'price' => 91.90],
        ['max' => 2, 'price' => 97.90],
        ['max' => 3, 'price' => 102.90],
        ['max' => 4, 'price' => 126.90],
        ['max' => 5, 'price' => 132.90],
        ['max' => 6, 'price' => 139.90],
        ['max' => 7, 'price' => 142.90],
        ['max' => 8, 'price' => 146.90],
        ['max' => 9, 'price' => 179.90],
        ['max' => 10, 'price' => 184.90],
        ['max' => 15, 'price' => 199.90],
        ['max' => 20, 'price' => 269.90],
        ['max' => 25, 'price' => 279.90],
        ['max' => 30, 'price' => 289.90],
    ]
];

// 1. Lire les données envoyées par le front-end
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid Request']);
    exit();
}

$type = isset($data['type']) && $data['type'] === 'parts' ? 'parts' : 'personal';
$weight = floatval($data['weight'] ?? 0);
$length = floatval($data['length'] ?? 0);
$width = floatval($data['width'] ?? 0);
$height = floatval($data['height'] ?? 0);
$insurance = isset($data['insurance']) ? filter_var($data['insurance'], FILTER_VALIDATE_BOOLEAN) : false;

// 2. Calcul du Poids Volumétrique et Poids Facturable
$volWeight = ($length * $width * $height) / 5000;
$chargeableWeight = max($weight, $volWeight);

// 3. Trouver le prix dans la grille
$grid = $pricingGrid[$type];
$basePrice = 0;

foreach ($grid as $tier) {
    if ($chargeableWeight <= $tier['max']) {
        $basePrice = $tier['price'];
        break;
    }
}

if ($basePrice === 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Weight out of bounds or invalid parameters']);
    exit();
}

$totalPrice = $basePrice;

// 4. Ajouter l'assurance si demandée
$insurancePrice = 15.00;
if ($insurance) {
    $totalPrice += $insurancePrice;
}

// 5. Convertir en centimes pour Stripe
$amountInCents = round($totalPrice * 100);

// 6. Création de la Session Stripe Checkout en CURL (pas besoin d'installer le SDK PHP via composer)
$ch = curl_init();

$stripeData = [
    'payment_method_types[0]' => 'card',
    'line_items[0][price_data][currency]' => 'eur',
    'line_items[0][price_data][product_data][name]' => 'Envoi de Colis CSF - ' . ucfirst($type),
    'line_items[0][price_data][unit_amount]' => $amountInCents,
    'line_items[0][quantity]' => 1,
    'mode' => 'payment',
    'success_url' => $frontendUrl . '/envoi-colis?session_id={CHECKOUT_SESSION_ID}',
    'cancel_url' => $frontendUrl . '/envoi-colis',
];

curl_setopt_array($ch, [
    CURLOPT_URL => 'https://api.stripe.com/v1/checkout/sessions',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($stripeData),
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $stripeSecretKey,
        'Content-Type: application/x-www-form-urlencoded'
    ]
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    $session = json_decode($response, true);
    echo json_encode(['id' => $session['id']]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error creating Stripe session', 'details' => json_decode($response, true)]);
}
