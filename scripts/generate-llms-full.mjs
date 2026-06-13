/**
 * Regenerate FAQ + site map sections in public/llms-full.txt from faqData + SEO_ROUTES.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { faqData } from '../src/lib/faqData.js';
import { SEO_ROUTES, SITE_URL } from '../shared/seo-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const llmsPath = path.join(__dirname, '..', 'public', 'llms-full.txt');

const faqBlock = faqData.map(({ q, a }) => `### ${q}\n${a}`).join('\n\n');

const siteMapBlock = SEO_ROUTES.map((r) => {
  const url = r.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${r.path}`;
  return `- ${url}`;
}).join('\n');

let text = fs.readFileSync(llmsPath, 'utf8');

const faqStart = text.indexOf('## FAQ');
const siteMapStart = text.indexOf('## Site map');
if (faqStart === -1 || siteMapStart === -1 || siteMapStart <= faqStart) {
  console.error('generate-llms-full: expected ## FAQ and ## Site map sections');
  process.exit(1);
}

const beforeFaq = text.slice(0, faqStart);
const afterSiteMap = text.slice(siteMapStart);
const siteMapEnd = afterSiteMap.indexOf('\n## Links');
if (siteMapEnd === -1) {
  console.error('generate-llms-full: expected ## Links after site map');
  process.exit(1);
}
const linksSection = afterSiteMap.slice(siteMapEnd);

text = `${beforeFaq}## FAQ\n\n${faqBlock}\n\n## Site map\n\n${siteMapBlock}${linksSection}`;

fs.writeFileSync(llmsPath, text);
console.log('generate-llms-full: updated public/llms-full.txt (FAQ + site map)');