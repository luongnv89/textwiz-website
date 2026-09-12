/**
 * First-user testimonials for the landing page (issue #6).
 *
 * TextWiz does not ship fabricated reviews. This array starts empty and is
 * meant to be populated with real, permissioned quotes as early users share
 * them.
 *
 * Shape of each entry once a real quote is added:
 *   { quote: string, author: string, context: string }
 *   - quote:   the user's words (verbatim or lightly trimmed for length).
 *   - author:  a real name (or first name + last initial) with permission.
 *   - context: what TextWiz replaced for them, e.g. "Freelance copywriter".
 *
 * Example (do not ship without the named user's real permission):
 *   { quote: 'I stopped pasting client emails into ChatGPT.', author: 'Dana K.', context: 'Freelance copywriter' }
 */
export const testimonials = [];

/**
 * Return up to `max` featured testimonials, in order.
 * @param {Array<{quote: string, author: string, context: string}>} list
 * @param {number} max
 * @returns {Array<{quote: string, author: string, context: string}>}
 */
export function getFeaturedTestimonials(list = testimonials, max = 3) {
  if (!Array.isArray(list)) return [];
  const safeMax = Number.isFinite(max) && max > 0 ? Math.floor(max) : 0;
  return list.slice(0, safeMax);
}
