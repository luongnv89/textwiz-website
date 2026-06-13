/**
 * Public asset URL that respects Vite `base` (e.g. GitHub Pages project site).
 * @param {string} path Path under `public/`, with or without leading slash.
 */
export function publicUrl(path) {
  const base = import.meta.env.BASE_URL ?? '/';
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalized}`;
}