import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2026-02-25.clover',
});

// Les grilles de tarification (doivent correspondre EXACTEMENT au front-end)
const pricingGrid = {
    personal: [
        { max: 0.5, price: 36.90 },
        { max: 1, price: 39.90 },
        { max: 2, price: 44.90 },
        { max: 3, price: 49.90 },
        { max: 4, price: 54.90 },
        { max: 5, price: 59.90 },
        { max: 6, price: 64.90 },
        { max: 7, price: 69.90 },
        { max: 8, price: 74.90 },
        { max: 10, price: 79.90 },
        { max: 15, price: 89.90 },
        { max: 20, price: 119.90 },
        { max: 25, price: 129.90 },
        { max: 30, price: 139.90 },
    ],
    parts: [
        { max: 0.5, price: 69.90 },
        { max: 1, price: 79.90 },
        { max: 2, price: 84.90 },
        { max: 3, price: 89.90 },
        { max: 4, price: 94.90 },
        { max: 5, price: 99.90 },
        { max: 6, price: 109.90 },
        { max: 7, price: 119.90 },
        { max: 8, price: 129.90 },
        { max: 10, price: 139.90 },
        { max: 15, price: 149.90 },
        { max: 20, price: 169.90 },
        { max: 25, price: 179.90 },
        { max: 30, price: 189.90 },
    ]
};

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

        const type = data.type === 'parts' ? 'parts' : 'personal';
        const weight = Number(data.weight) || 0;
        const length = Number(data.length) || 0;
        const width = Number(data.width) || 0;
        const height = Number(data.height) || 0;
        const insurance = !!data.insurance;

        // Calcul du Poids Volumétrique et Poids Facturable
        const volWeight = (length * width * height) / 5000;
        const chargeableWeight = Math.max(weight, volWeight);

        // Trouver le prix dans la grille
        const grid = pricingGrid[type];
        let basePrice = 0;

        for (const tier of grid) {
            if (chargeableWeight <= tier.max) {
                basePrice = tier.price;
                break;
            }
        }

        if (basePrice === 0) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Weight out of bounds or invalid parameters' })
            };
        }

        let totalPrice = basePrice;

        // Ajouter l'assurance si demandée
        const insurancePrice = 15.00;
        if (insurance) {
            totalPrice += insurancePrice;
        }

        const amountInCents = Math.round(totalPrice * 100);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: `Envoi de Colis CSF - ${type === 'parts' ? 'Pièces détachées' : 'Effets personnels'}`,
                        },
                        unit_amount: amountInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.URL || 'https://csf-transport.com'}/envoi-colis?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.URL || 'https://csf-transport.com'}/envoi-colis`,
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ id: session.id, url: session.url })
        };
    } catch (error) {
        console.error('Stripe Checkout Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal Server Error', details: (error as Error).message })
        };
    }
};
