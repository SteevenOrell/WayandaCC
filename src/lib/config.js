// Public, build-time configuration. These values end up in the client bundle;
// never place real secrets (private API keys, tokens) here.
export const emailjsConfig = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || '',
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '',
};

export const isEmailConfigured = () =>
  Boolean(emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey);
