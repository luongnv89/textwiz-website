export function useTurnstileSiteKey() {
  return import.meta.env.VITE_TURNSTILE_SITE_KEY || '';
}
