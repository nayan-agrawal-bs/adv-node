// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  ASSETS_URL: process.env.NX_PUBLIC_ASSETS_URL || '',
  API_URL: process.env.NX_PUBLIC_API_URL || 'http://localhost:3001',
};

export default environment;
