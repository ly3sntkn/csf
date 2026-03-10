import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import mailjet from 'node-mailjet';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2026-02-25.clover',
});

// Initialisation sécurisée de Mailjet côté serveur uniquement
const mj = new mailjet.Client({
    apiKey: process.env.MAILJET_API_KEY || '',
    apiSecret: process.env.MAILJET_SECRET_KEY || ''
});

export const handler: Handler = async (event) => {
    const sig = event.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !webhookSecret) {
        console.error('Webhook Error: Missing Stripe signature or webhook secret in ENV');
        return { statusCode: 400, body: 'Missing Stripe signature or Webhook Secret' };
    }

    let stripeEvent;
    try {
        // Netlify Functions (v1) fournit event.body en base64 pour les webhooks binaires/raw s'il n'est pas déjà décodé
        const body = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString('utf8') : event.body || '';
        stripeEvent = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return { statusCode: 400, body: `Webhook Error: ${err.message}` };
    }

    // Gestion exclusive de l'événement de paiement réussi
    if (stripeEvent.type === 'checkout.session.completed') {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;

        // Sécurisation : récupération des détails injectés lors de la création de la session (stripe-checkout.ts)
        const meta = session.metadata || {};

        const dossierNumber = meta.dossierNumber || 'N/A';
        const recipientName = `${meta.firstName || ''} ${meta.lastName || ''}`.trim();
        const recipientEmail = meta.email || '';
        const weight = meta.weight || '0';
        const length = meta.length || '0';
        const width = meta.width || '0';
        const height = meta.height || '0';
        const category = meta.type === 'parts' ? 'Pièces détachées' : 'Effets personnels';
        const insurance = meta.insurance === 'true' ? 'Oui' : 'Non';
        const receiverName = meta.receiverName || 'N/A';
        const receiverAddress = meta.receiverAddress || 'N/A';

        // Envoi de l'email automatique Uniquement si Stripe valide le paiement réel
        if (recipientEmail) {
            const htmlContent = `
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
              <div class='header'>Votre expédition est confirmée – Réf. ${dossierNumber}</div>
              <p>Bonjour <strong>${recipientName}</strong>,</p>
              <p>Nous avons bien reçu votre paiement Stripe sécurisé. Votre demande d’expédition est désormais prise en charge par l’équipe CSF.</p>
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
              <p class='alert'>⚠️ Une erreur dans ce récapitulatif ?</p>
              <p>Contactez-nous sans attendre à <a href='mailto:contact@csfgroupe.fr'>contact@csfgroupe.fr</a> afin que nous puissions corriger votre dossier avant traitement.</p>
              <p>Merci de votre confiance. Nous traitons votre expédition avec le plus grand soin.</p>
              <div class='footer'>
                Cordialement,<br><br>
                <strong>L'Équipe CSF</strong><br>
                <em>« Ce qui compte pour vous, voyage avec nous »</em><br><br>
                Email : <a href='mailto:contact@csfgroupe.fr'>contact@csfgroupe.fr</a><br>
                Site : <a href='https://csf-transport.com'>csf-transport.com</a><br>
              </div>
            </div>
            </body>
            </html>`;

            try {
                await mj.post("send", { version: 'v3.1' }).request({
                    Messages: [{
                        From: { Email: "service@csfgroupe.fr", Name: "CSF Transport" },
                        To: [{ Email: recipientEmail, Name: recipientName }],
                        Subject: `Votre expédition est confirmée – Réf. ${dossierNumber}`,
                        HTMLPart: htmlContent
                    }]
                });
                console.log(`✅ Webhook Stripe: Email successfully sent to ${recipientEmail} for session ${session.id}`);
            } catch (e) {
                console.error('❌ Webhook Stripe: Mailjet sending error:', e);
            }
        }
    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
