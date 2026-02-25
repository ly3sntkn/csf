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
        const payload = {
            token: SECRET_TOKEN,
            status: status,
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            numero: data.numero,
            service: data.service,
            details: data.details,
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
