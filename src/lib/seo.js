/**
 * Keeps each page's search-engine and link-preview tags in step with the
 * page being shown: title, description, canonical address, Open Graph /
 * Twitter tags and robots. The same values are written into static HTML at
 * build time (scripts/seo-pages.mjs) for crawlers and link previews that
 * don't run JavaScript.
 */
import PAGES from '../seo/pages.json';

export const SITE = 'https://molekschools.com';
export const SEO_PAGES = PAGES;
const HOME = PAGES['/'];

/** "/about/" -> "https://molekschools.com/about"; "/" -> "https://molekschools.com/" */
export function canonicalUrl(path = '/') {
    const clean = ('/' + String(path).split(/[?#]/)[0]).replace(/\/+/g, '/').replace(/(.)\/$/, '$1');
    return clean === '/' ? `${SITE}/` : SITE + clean;
}

/** Shorten text to a search-snippet length on a word boundary. */
export function excerpt(text, max = 155) {
    const t = String(text || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (t.length <= max) return t;
    const cut = t.slice(0, max - 1);
    return cut.slice(0, Math.max(cut.lastIndexOf(' '), 60)).replace(/[,.;:\s]+$/, '') + '…';
}

function setMeta(attr, key, value) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', value);
}

export function applySeo({ title, description, path, noindex = false } = {}) {
    if (typeof document === 'undefined') return;
    const fullTitle = title || HOME.title;
    const desc = description || HOME.description;
    const url = canonicalUrl(path);
    document.title = fullTitle;
    setMeta('name', 'description', desc);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);
    let link = document.head.querySelector('link[rel="canonical"]');
    if (noindex) {
        link?.remove();
    } else {
        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
        }
        link.setAttribute('href', url);
    }
}

/** Signed-in portal pages: never index, never follow. */
export function markNoIndex() {
    if (typeof document === 'undefined') return;
    setMeta('name', 'robots', 'noindex, nofollow');
    document.head.querySelector('link[rel="canonical"]')?.remove();
}
