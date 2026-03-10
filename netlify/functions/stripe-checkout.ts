import { Handler } from "@netlify/functions";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-02-25.clover",
});

// Les grilles de tarification (doivent correspondre EXACTEMENT au front-end)
const pricingGrid = {
  personal: [
    { max: 0.5, price: 39.9 },
    { max: 1, price: 41.9 },
    { max: 2, price: 47.9 },
    { max: 3, price: 52.9 },
    { max: 4, price: 56.9 },
    { max: 5, price: 62.9 },
    { max: 6, price: 69.9 },
    { max: 7, price: 72.9 },
    { max: 8, price: 76.9 },
    { max: 9, price: 79.9 },
    { max: 10, price: 84.9 },
    { max: 15, price: 99.9 },
    { max: 20, price: 119.9 },
    { max: 25, price: 129.9 },
    { max: 30, price: 139.9 },
  ],
  parts: [
    { max: 0.5, price: 89.9 },
    { max: 1, price: 91.9 },
    { max: 2, price: 97.9 },
    { max: 3, price: 102.9 },
    { max: 4, price: 126.9 },
    { max: 5, price: 132.9 },
    { max: 6, price: 139.9 },
    { max: 7, price: 142.9 },
    { max: 8, price: 146.9 },
    { max: 9, price: 179.9 },
    { max: 10, price: 184.9 },
    { max: 15, price: 199.9 },
    { max: 20, price: 269.9 },
    { max: 25, price: 279.9 },
    { max: 30, price: 289.9 },
  ],
};

const ALLOWED_ORIGINS = [
  "https://csf-transport.com",
  "https://csf-transport.netlify.app",
  "http://localhost:5173",
];

export const handler: Handler = async (event) => {
  const origin = event.headers.origin || "";
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin);

  const headers = {
    "Access-Control-Allow-Origin": isAllowedOrigin
      ? origin
      : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle CORS Preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing body" }),
      };
    }

    const data = JSON.parse(event.body);

    const type = data.type === "parts" ? "parts" : "personal";
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
        body: JSON.stringify({
          error: "Weight out of bounds or invalid parameters",
        }),
      };
    }

    let totalPrice = basePrice;

    // Ajouter l'assurance si demandée
    const insurancePrice = 15.0;
    if (insurance) {
      totalPrice += insurancePrice;
    }

    const amountInCents = Math.round(totalPrice * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Envoi de Colis CSF - ${type === "parts" ? "Pièces détachées" : "Effets personnels"}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        dossierNumber: data.details?.dossierNumber || "", // Provided by frontend on submit
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        weight: weight.toString(),
        length: length.toString(),
        width: width.toString(),
        height: height.toString(),
        type: type,
        insurance: insurance ? "true" : "false",
        receiverName: data.details?.receiverName || "",
        receiverAddress: data.details?.receiverAddress || "",
      },
      success_url: `${process.env.URL || "https://csf-transport.com"}/envoi-colis?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL || "https://csf-transport.com"}/envoi-colis`,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ id: session.id, url: session.url }),
    };
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal Server Error",
        details: (error as Error).message,
      }),
    };
  }
};
