/**
 * The backend address, from VITE_API_BASE_URL.
 *
 * If the setting is ever missing from a deploy, the site must still load:
 * pages render normally and only requests to the school server fail, which
 * the pages already show as "We couldn't load this. Try again."
 * (Before, a missing setting threw at start-up and showed a blank white page.)
 */
const configured = import.meta.env.VITE_API_BASE_URL;

export const API_BASE_URL = configured || 'https://api-address-not-configured.invalid';
