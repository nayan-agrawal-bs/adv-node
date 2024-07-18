export const environment = {
  production: true,
  ASSETS_URL: process.env.NX_PUBLIC_ASSETS_URL || '',
  API_URL: process.env.NX_PUBLIC_API_URL || 'http://localhost:3001',
};

export default environment;
