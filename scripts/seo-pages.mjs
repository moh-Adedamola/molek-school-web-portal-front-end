/**
 * Vite plugin: after the build, write one HTML file per public page with that
 * page's own title, description, canonical address and link-preview tags, so
 * search engines and WhatsApp/Facebook previews see the right details without
 * running JavaScript. Also writes spa.html: the fallback for every other
 * address (news articles, unknown pages), with no fixed canonical address.
 * Runs inside `vite build`, so it can't be skipped by a different build command.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const PAGES = createRequire(import.meta.url)('../src/seo/pages.json');
const SITE = 'https://molekschools.com';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setTag(html, re, replacement, label) {
    if (!re.test(html)) throw new Error(`seo-pages: ${label} not found in index.html`);
    return html.replace(re, replacement);
}

export function pageHtml(base, route, { title, description }) {
    const url = route === '/' ? `${SITE}/` : SITE + route;
    let h = base;
    h = setTag(h, /<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`, 'title');
    h = setTag(h, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(description)}" />`, 'description');
    h = setTag(h, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`, 'canonical');
    h = setTag(h, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(title)}" />`, 'og:title');
    h = setTag(h, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(description)}" />`, 'og:description');
    h = setTag(h, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`, 'og:url');
    h = setTag(h, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${esc(title)}" />`, 'twitter:title');
    h = setTag(h, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${esc(description)}" />`, 'twitter:description');
    return h;
}

export function spaHtml(base) {
    return base.replace(/\s*<link rel="canonical" href="[^"]*"\s*\/?>/, '').replace(/\s*<meta property="og:url" content="[^"]*"\s*\/?>/, '');
}

export default function seoPages() {
    let outDir = 'dist';
    return {
        name: 'molek-seo-pages',
        apply: 'build',
        configResolved(config) { outDir = path.resolve(config.root, config.build.outDir); },
        closeBundle() {
            const base = readFileSync(path.join(outDir, 'index.html'), 'utf8');
            writeFileSync(path.join(outDir, 'spa.html'), spaHtml(base));
            for (const [route, meta] of Object.entries(PAGES)) {
                const file = route === '/' ? path.join(outDir, 'index.html') : path.join(outDir, route.slice(1), 'index.html');
                mkdirSync(path.dirname(file), { recursive: true });
                writeFileSync(file, pageHtml(base, route, meta));
            }
        },
    };
}
