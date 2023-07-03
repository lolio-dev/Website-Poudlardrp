export const azure_aad_client = () => process.env.AAD_CLIENT;
export const azure_aad_redirect = 'https://api.poudlardrp.fr/auth/callback';
export const azure_aad_secret = () => process.env.AAD_SECRET;
export const azure_aad_scopes = ['openid', 'email', 'XboxLive.signin'];

export const bearer_secret = () => process.env.BEARER_SECRET;
export const bearer_email_secret = () => process.env.BEARER_EMAIL_SECRET;

export const website_url = process.env.WEBSITE_URL || 'https://poudlardrp.fr';
export const api_url = 'https://api.poudlardrp.fr';
