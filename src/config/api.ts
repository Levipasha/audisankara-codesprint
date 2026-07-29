/**
 * Central API configuration.
 * All API calls should import `API_URL` from here instead of
 * repeating `process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'`
 * throughout the codebase.
 *
 * Set NEXT_PUBLIC_API_URL in your .env file for local dev or production.
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
