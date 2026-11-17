// Centralized API configuration for ShoeStop
// In production/Docker, this is supplied via VITE_API_URL or defaults to localhost:5000
export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

export default API_BASE_URL;
