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
export const submitLeadToCRM = async (data: LeadData, status: LeadStatus): Promise<void> => {
    try {
        await fetch('/.netlify/functions/submit-crm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, status })
        });
    } catch (_e) {
        // Deliberately empty to meet the user's requirement:
        // "il faut quil ny'ait aucune traces dans la console etc rien qui puisse etre visible"
    }
};
