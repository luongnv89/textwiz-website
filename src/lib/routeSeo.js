import { SEO_ROUTES, DEFAULT_DESCRIPTION } from '../../shared/seo-routes.mjs';

/** Per-path title (null = homepage default) and meta description */
export const ROUTE_SEO = Object.fromEntries(
  SEO_ROUTES.map(({ path, title, description }) => [path, { title, description }]),
);

export { DEFAULT_DESCRIPTION };