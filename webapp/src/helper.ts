export const getEnv = (env: 'VITE_API_URL'): string => {
  return import.meta.env[env];
}