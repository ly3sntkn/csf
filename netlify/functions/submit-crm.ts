import { Handler } from '@netlify/functions';

const SCRIPT_URL_VALIDATED = 'https://script.google.com/macros/s/AKfycbzlgF_WIKYYTaxYylp-ltGHsoYYPmu-YHYEahZEkEhVjiLVRphkqvtl-kZzLX48ECK6/exec';
const SCRIPT_URL_WISHED = 'https://script.google.com/macros/s/AKfycbzFui4Z5Px9IX1mXKThvvH0VcbXcsCx4rF4t4Th3cJftfYsFLymH2G-1H-ZLBfcsB8U7w/exec';
const SECRET_TOKEN = process.env.CRM_SECRET_TOKEN || 'CSF_CRM_LEAD_SECRET_2026';

const ALLOWED_ORIGINS = [
    'https://csf-transport.com',
    'https://csf-transport.netlify.app',
    'http://localhost:5173'
];

export const handler: Handler = async (event) => {
    const origin = event.headers.origin || '';
    const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin);

    const headers = {
        'Access-Control-Allow-Origin': isAllowedOrigin ? origin : ALLOWED_ORIGINS[0],
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // Handle CORS Preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const data = JSON.parse(event.body || '{}');

        // Déterminer l'URL cible en fonction du statut
        const targetUrl = data.status === 'validated' ? SCRIPT_URL_VALIDATED : SCRIPT_URL_WISHED;

        // Construire le payload en injectant dynamiquement le jeton secret côté serveur
        const payload = {
            token: SECRET_TOKEN,
            status: data.status,
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            numero: data.numero,
            service: data.service,
            details: data.details,
        };

        // Envoi silencieux au script Google
        await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload)
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true })
        };
    } catch (e) {
        // Silencieux selon les spécifications requises
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal Error' })
        };
    }
};
