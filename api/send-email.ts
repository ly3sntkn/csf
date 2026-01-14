import type { VercelRequest, VercelResponse } from '@vercel/node';
import Mailjet from 'node-mailjet';

const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE
});

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    const { type, data } = request.body;
    const adminEmail = 'yanis.yataghene@csfgroupe.fr'; // Replace with actual admin email if different
    // Mailjet requires a verified sender identity. 
    // IMPORTANT: The 'From' address must be a verified sender in your Mailjet account.
    const verifiedSenderEmail = 'yanis.yataghene@csfgroupe.fr';

    try {
        if (type === 'contact') {
            // 1. Email to Admin (Contact Form)
            await mailjet.post('send', { version: 'v3.1' }).request({
                Messages: [
                    {
                        From: {
                            Email: verifiedSenderEmail,
                            Name: "CSF Contact Form"
                        },
                        To: [
                            {
                                Email: adminEmail,
                                Name: "Admin CSF"
                            }
                        ],
                        ReplyTo: {
                            Email: data.email,
                            Name: `${data.firstName} ${data.lastName}`
                        },
                        Subject: `Nouveau message de ${data.firstName} ${data.lastName} - ${data.subject}`,
                        HTMLPart: `
              <h1>Nouveau message reçu</h1>
              <p><strong>De:</strong> ${data.firstName} ${data.lastName} (${data.email})</p>
              <p><strong>Téléphone:</strong> ${data.phone}</p>
              <p><strong>Sujet:</strong> ${data.subject}</p>
              <p><strong>Message:</strong></p>
              <p>${data.message}</p>
            `,
                    }
                ]
            });

            // 2. Email to Client (Acknowledgement)
            await mailjet.post('send', { version: 'v3.1' }).request({
                Messages: [
                    {
                        From: {
                            Email: verifiedSenderEmail,
                            Name: "CSF Transport"
                        },
                        To: [
                            {
                                Email: data.email,
                                Name: `${data.firstName} ${data.lastName}`
                            }
                        ],
                        Subject: 'Nous avons bien reçu votre message',
                        HTMLPart: `
              <h1>Bonjour ${data.firstName},</h1>
              <p>Nous avons bien reçu votre message concernant "${data.subject}".</p>
              <p>Notre équipe va le traiter dans les plus brefs délais (généralement sous 24h).</p>
              <br>
              <p>Cordialement,</p>
              <p><strong>L'équipe CSF Transport</strong></p>
            `,
                    }
                ]
            });
        } else if (type === 'shipping') {
            // 1. Email to Admin (Shipping Quote)
            await mailjet.post('send', { version: 'v3.1' }).request({
                Messages: [
                    {
                        From: {
                            Email: verifiedSenderEmail,
                            Name: "CSF Devis"
                        },
                        To: [
                            {
                                Email: adminEmail,
                                Name: "Admin CSF"
                            }
                        ],
                        ReplyTo: {
                            Email: data.senderEmail,
                            Name: `${data.senderFirstName} ${data.senderLastName}`
                        },
                        Subject: `Nouvelle demande de devis - ${data.senderFirstName} ${data.senderLastName}`,
                        HTMLPart: `
              <h1>Nouvelle expédition saisie</h1>
              <h2>Expéditeur</h2>
              <p>${data.senderFirstName} ${data.senderLastName}</p>
              <p>${data.senderEmail} | ${data.senderPhone}</p>
              <p>${data.senderAddress}, ${data.senderPostalCode} ${data.senderCity}</p>
              
              <h2>Destinataire</h2>
              <p>${data.recipientFirstName} ${data.recipientLastName}</p>
              <p>${data.recipientPhone}</p>
              <p>${data.recipientAddress}, ${data.recipientPostalCode} ${data.recipientCity}</p>

              <h2>Colis</h2>
              <p><strong>Type:</strong> ${data.shipmentType}</p>
              <p><strong>Poids/Dimensions:</strong> ${data.weight}kg | ${data.length}x${data.width}x${data.height}cm</p>
              <p><strong>Prix estimé:</strong> ${data.price}€</p>
              
              <h2>Inventaire</h2>
              <pre>${JSON.stringify(data.inventory, null, 2)}</pre>
            `,
                    }
                ]
            });

            // 2. Email to Client (Recap)
            await mailjet.post('send', { version: 'v3.1' }).request({
                Messages: [
                    {
                        From: {
                            Email: verifiedSenderEmail,
                            Name: "CSF Transport"
                        },
                        To: [
                            {
                                Email: data.senderEmail,
                                Name: `${data.senderFirstName} ${data.senderLastName}`
                            }
                        ],
                        Subject: 'Récapitulatif de votre demande d\'expédition',
                        HTMLPart: `
              <h1>Bonjour ${data.senderFirstName},</h1>
              <p>Merci d'avoir choisi CSF Transport. Voici le récapitulatif de votre demande :</p>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
                <p><strong>Départ:</strong> ${data.senderCity}, France</p>
                <p><strong>Arrivée:</strong> ${data.recipientCity}, Algérie</p>
                <p><strong>Poids:</strong> ${data.weight} kg</p>
                <p><strong>Tarif estimé:</strong> ${data.price} €</p>
              </div>

              <p>Un membre de notre équipe va vérifier ces informations et vous contacter pour finaliser l'enlèvement.</p>
              <br>
              <p>Cordialement,</p>
              <p><strong>L'équipe CSF Transport</strong></p>
            `,
                    }
                ]
            });
        }

        return response.status(200).json({ success: true });
    } catch (error) {
        console.error('Mailjet Error:', error);
        return response.status(500).json({ error: 'Error sending email' });
    }
}
