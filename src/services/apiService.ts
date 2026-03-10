export type ServiceType = 'dem' | 'env' | 'auto';
export type LeadStatus = 'wished' | 'validated';

export interface LeadData {
    nom: string;
    prenom: string;
    email: string;
    numero: string;
    service: ServiceType;
    details?: any; // Additional info that can be stringified
}

// The final user URLs with correct "Anyone" permissions and openById logic
const SCRIPT_URL_VALIDATED = 'https://script.google.com/macros/s/AKfycbzlgF_WIKYYTaxYylp-ltGHsoYYPmu-YHYEahZEkEhVjiLVRphkqvtl-kZzLX48ECK6/exec';
const SCRIPT_URL_WISHED = 'https://script.google.com/macros/s/AKfycbzFui4Z5Px9IX1mXKThvvH0VcbXcsCx4rF4t4Th3cJftfYsFLymH2G-1H-ZLBfcsB8U7w/exec';
const SECRET_TOKEN = 'CSF_CRM_LEAD_SECRET_2026';

/**
 * Silently submits a lead to the Google Sheets integration.
 * No errors or success messages will be logged to avoid console traces.
 */
export const submitLeadToCRM = async (data: LeadData, status: LeadStatus): Promise<void> => {
    // Determine the correct URL based on the lead status
    const targetUrl = status === 'validated' ? SCRIPT_URL_VALIDATED : SCRIPT_URL_WISHED;

    try {
        const date = new Date();
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yy = String(date.getFullYear()).slice(-2);
        const dateStr = `${dd}/${mm}/${yy}`;
        const rawStatut = status === 'validated' ? "Validé" : "En attente";
        const d = data.details || {};

        let categoryParams = data.service === 'env' ? 'Colis' : data.service === 'dem' ? 'Déménagement' : 'Achat voiture';

        const isOui = (val: any) => (val === true || String(val).toUpperCase() === 'OUI' || val === 'OUI') ? 'Oui' : 'Non';

        const payload = {
            token: SECRET_TOKEN,
            status: status,
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            numero: data.numero,
            service: data.service,

            // EXACT COLUMNS EXPECTED BY NEW CRM (Automapping)
            "Date de commande": dateStr,
            "Référence client": d.dossierNumber || "",
            "Catégorie": d.category || categoryParams,
            "Nb d'envoi": d.nbEnvoi || "",
            "Nom & Prénom": `${data.nom} ${data.prenom}`,
            "Téléphone": data.numero,
            "E-mail": data.email,
            "Adresse de départ": d.departureAddress || d.address || "",
            "Nb colis": d.quantity || (d.weight ? "1" : ""),
            "Dimensions (cm)": d.dimensions || (d.length ? `${d.length} X ${d.width} X ${d.height}` : ""),
            "Poids (kg)": d.weight || d.poids || "",
            "Valeur (€)": d.inventoryValue || d.valeur || "",
            "Garantie CSF": isOui(d.insurance),
            "10% (€)": d.insuranceCost || "",
            "Nom du destinataire": d.receiverName || d.nomDestinataire || "",
            "Téléphone DZ": d.receiverPhone || d.telephoneDZ || "",
            "Ville de destination": d.destinationCity || d.villeDestination || "",
            "Documents envoyés ": isOui(d.documentsEnvoyes),
            "Statut du colis": rawStatut,
            "Date de livraison": "",
            "Délais ": "",
            "Prix payé (€)": d.price || d.prix || "",
            "Frais la Poste (€)": "",
            "Marge CSF": "",

            details: {
                ...d,
                dimensions: d.dimensions || (d.length ? `${d.length} X ${d.width} X ${d.height}` : ""),
                insurance: isOui(d.insurance),
                documentsEnvoyes: isOui(d.documentsEnvoyes)
            },
        };

        // Use fetch with no-cors to make it entirely silent and avoid CORS errors in console
        // We use text/plain so the browser doesn't send a preflight OPTIONS request.
        await fetch(targetUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload)
        });
    } catch (_e) {
        // Deliberately empty to meet the user's requirement:
        // "il faut quil ny'ait aucune traces dans la console etc rien qui puisse etre visible"
    }
};
