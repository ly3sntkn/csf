<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Sécuriser avec https://csf-transport.com en prod
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// === CONFIGURATION ===
$mailjetApiKey = '6054363564a531d20c1e29905a754983';
$mailjetApiSecret = 'c96a0ec2bece847ba1d9f0345e71acb5';
$senderEmail = 'service@csfgroupe.fr';
$senderName = 'CSF Transport';
// =====================

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data || !isset($data['email']) || !isset($data['firstName'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid Request']);
    exit();
}

$recipientEmail = $data['email'];
$recipientName = $data['firstName'] . ' ' . ($data['lastName'] ?? '');
$dossierNumber = $data['dossierNumber'] ?? 'N/A';
$weight = $data['weight'] ?? '0';
$length = $data['length'] ?? '0';
$width = $data['width'] ?? '0';
$height = $data['height'] ?? '0';
$category = isset($data['type']) && $data['type'] === 'parts' ? 'Pièces détachées' : 'Effets personnels';
$insurance = (isset($data['insurance']) && $data['insurance']) ? 'Oui' : 'Non';
$receiverName = $data['receiverName'] ?? 'N/A';
$receiverAddress = $data['receiverAddress'] ?? 'N/A';

$htmlContent = "
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  .header { color: #cc0000; font-weight: bold; font-size: 20px; margin-bottom: 20px; }
  .box { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #cc0000; margin-bottom: 20px; }
  .footer { margin-top: 30px; font-size: 13px; color: #555; border-top: 1px solid #ddd; padding-top: 15px; }
  .alert { color: #d9534f; font-weight: bold; }
  .logo { max-width: 150px; margin-top: 15px; }
</style>
</head>
<body>
<div class='container'>
  <div class='header'>
    Votre expédition est confirmée – Réf. {$dossierNumber}
  </div>

  <p>Bonjour <strong>{$recipientName}</strong>,</p>

  <p>Nous avons bien reçu votre paiement. Votre demande d’expédition est désormais prise en charge par l’équipe CSF.</p>
  
  <p>Vos documents d’expédition vous seront transmis par e-mail dans un délai de <strong>24h à 48h ouvrées</strong>.</p>

  <h3>Comment ça se passe ensuite ?</h3>
  <p>Une fois vos documents reçus, il vous suffira de les imprimer et de les scotcher sur le côté de votre colis. Vous pourrez ensuite le déposer gratuitement dans n’importe quel bureau de poste. Comptez en moyenne une semaine à partir du dépôt pour que votre colis arrive au domicile de votre destinataire.</p>

  <div class='box'>
    <strong>Récapitulatif de votre envoi :</strong><br><br>
    • Référence : {$dossierNumber}<br>
    • Colis : 1 colis – {$weight} kg – {$length} x {$width} x {$height} cm<br>
    • Catégorie : {$category}<br>
    • Garantie CSF : {$insurance}<br>
    • Destinataire : {$receiverName}<br>
    • Adresse de livraison : {$receiverAddress}
  </div>

  <p class='alert'>⚠️ Une erreur dans ce récapitulatif ?</p>
  <p>Contactez-nous sans attendre à <a href='mailto:contact@csfgroupe.fr'>contact@csfgroupe.fr</a> afin que nous puissions corriger votre dossier avant traitement.</p>

  <p>Merci de votre confiance. Nous traitons votre expédition avec le plus grand soin.</p>

  <div class='footer'>
    Cordialement, Best regards<br><br>
    <strong>L'Équipe CSF</strong><br>
    <em>« Ce qui compte pour vous, voyage avec nous »</em><br><br>
    
    <strong>Siège Social :</strong><br>
    25 rue Edmond Rostand<br>
    94310 Orly<br><br>
    
    Tel : +33 1 49 75 30 01<br>
    Port : +33 6 50 68 38 32<br><br>
    
    Email : <a href='mailto:contact@csfgroupe.fr'>contact@csfgroupe.fr</a><br>
    Site : <a href='https://www.csfgroupe.fr'>www.csfgroupe.fr</a><br>
    <br>
    <img class='logo' src='https://www.csfgroupe.fr/csf/logo-csf.webp' alt='Logo CSF' />
  </div>
</div>
</body>
</html>
";

$body = [
    'Messages' => [
        [
            'From' => [
                'Email' => $senderEmail,
                'Name' => $senderName
            ],
            'To' => [
                [
                    'Email' => $recipientEmail,
                    'Name' => $recipientName
                ]
            ],
            'Subject' => "Votre expédition est confirmée – Réf. " . $dossierNumber,
            'HTMLPart' => $htmlContent
        ]
    ]
];

$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL => 'https://api.mailjet.com/v3.1/send',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($body),
    CURLOPT_USERPWD => $mailjetApiKey . ':' . $mailjetApiSecret,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json'
    ]
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error sending email via Mailjet', 'details' => json_decode($response, true)]);
}
