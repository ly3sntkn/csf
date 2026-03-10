import { Handler } from '@netlify/functions';
import mailjet from 'node-mailjet';

// Initialize Mailjet with environment variables
const mj = new mailjet.Client({
    apiKey: process.env.MAILJET_API_KEY || '',
    apiSecret: process.env.MAILJET_SECRET_KEY || ''
});

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

export const handler: Handler = async (event) => {
    // Handle CORS Preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const data = JSON.parse(event.body || '{}');

        if (!data.email || !data.firstName) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Missing required email fields' })
            };
        }

        const recipientEmail = data.email;
        const recipientName = `${data.firstName} ${data.lastName || ''}`.trim();
        const dossierNumber = data.dossierNumber || 'N/A';
        const weight = data.weight || '0';
        const length = data.length || '0';
        const width = data.width || '0';
        const height = data.height || '0';
        const category = data.type === 'parts' ? 'Pièces détachées' : 'Effets personnels';
        const insurance = data.insurance ? 'Oui' : 'Non';
        const receiverName = data.receiverName || 'N/A';
        const receiverAddress = data.receiverAddress || 'N/A';

        const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { color: #2563eb; font-weight: bold; font-size: 20px; margin-bottom: 20px; }
      h3 { color: #2563eb; }
      .box { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #cc0000; margin-bottom: 20px; color: #cc0000; }
      .box strong { color: #cc0000; }
      .footer { margin-top: 30px; font-size: 13px; color: #555; border-top: 1px solid #ddd; padding-top: 15px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
      .alert { color: #d9534f; font-weight: bold; }
      .logo { max-width: 150px; margin-top: 15px; }
      a { color: #2563eb; text-decoration: none; }
    </style>
    </head>
    <body>
    <div class='container'>
      <div class='header'>
        Votre expédition est confirmée – Réf. ${dossierNumber}
      </div>

      <p>Bonjour <strong>${recipientName}</strong>,</p>

      <p>Nous avons bien reçu votre paiement. Votre demande d’expédition est désormais prise en charge par l’équipe CSF.</p>
      
      <p>Vos documents d’expédition vous seront transmis par e-mail dans un délai de <strong>24h à 48h ouvrées</strong>.</p>

      <h3>Comment ça se passe ensuite ?</h3>
      <p>Une fois vos documents reçus, il vous suffira de les imprimer et de les scotcher sur le côté de votre colis. Vous pourrez ensuite le déposer gratuitement dans n’importe quel bureau de poste. Comptez en moyenne une semaine à partir du dépôt pour que votre colis arrive au domicile de votre destinataire.</p>

      <div class='box'>
        <strong>Récapitulatif de votre envoi :</strong><br><br>
        • Référence : ${dossierNumber}<br>
        • Colis : 1 colis – ${weight} kg – ${length} x ${width} x ${height} cm<br>
        • Catégorie : ${category}<br>
        • Garantie CSF : ${insurance}<br>
        • Destinataire : ${receiverName}<br>
        • Adresse de livraison : ${receiverAddress}
      </div>

      <p class='alert'>Une erreur dans ce récapitulatif ?</p>
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
    `;

        const request = mj.post("send", { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: "service@csfgroupe.fr",
                        Name: "CSF Transport"
                    },
                    To: [
                        {
                            Email: recipientEmail,
                            Name: recipientName
                        }
                    ],
                    Subject: `Votre expédition est confirmée – Réf. ${dossierNumber}`,
                    HTMLPart: htmlContent
                }
            ]
        });

        await request;

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        console.error('Mailjet Email Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal Server Error', details: (error as Error).message })
        };
    }
};
