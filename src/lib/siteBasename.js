/** React Router basename; must match Vite `base` (no trailing slash). */
export const siteBasename = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '') || '';