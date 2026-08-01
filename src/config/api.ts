/**
 * Central API configuration.
 * All API calls should import `API_URL` from here instead of
 * repeating `process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'`
 * throughout the codebase.
 *
 * Set NEXT_PUBLIC_API_URL in your .env file for local dev or production.
 */
const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
export const API_URL = isLocal ? 'http://localhost:5000' : (process.env.NEXT_PUBLIC_API_URL || 'https://api.orderin.in');




