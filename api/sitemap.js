/**
 * GET /sitemap.xml (rewritten here by vercel.json).
 * Lists the fixed public pages plus every published news article, read live
 * from the MOLEK API, so new articles appear without anyone editing a file.
 * If the API is slow or down, it still returns the fixed pages.
 */
// The fixed public pages. Kept here (not read from a file) so the function has
// nothing to load at start-up; scripts/sitemap.test.js fails if this list ever
// drifts from src/seo/pages.json.
export const ROUTES = ["/", "/about", "/academics", "/admissions", "/news", "/gallery", "/contact", "/privacy", "/terms", "/accessibility", "/student/login"];
const SITE = 'https://molekschools.com';
const API = (process.env.VITE_API_BASE_URL || 'https://molek-school-backend-production.up.railway.app').replace(/\/+$/, '');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const day = (v) => (v && !Number.isNaN(Date.parse(v)) ? new Date(v).toISOString().slice(0, 10) : null);

export function buildSitemap(articles = []) {
    const urls = ROUTES.map((route) => ({ loc: route === '/' ? `${SITE}/` : SITE + route }));
    for (const a of articles) {
        if (a && a.id != null) urls.push({ loc: `${SITE}/news/${encodeURIComponent(a.id)}`, lastmod: day(a.updated_at || a.publish_date || a.created_at) });
    }
    const body = urls.map((u) => `  <url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export async function fetchArticles({ api = API, fetchImpl = fetch, timeoutMs = 8000, maxPages = 20 } = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const out = [];
    try {
        for (let page = 1; page <= maxPages; page++) {
            const res = await fetchImpl(`${api}/api/content/public/?content_type=news&page=${page}`, { signal: controller.signal });
            if (res.status === 404) break; // past the last page
            if (!res.ok) throw new Error(`API ${res.status}`);
            const data = await res.json();
            const items = Array.isArray(data) ? data : data.results || [];
            out.push(...items.filter((i) => !i.content_type || i.content_type === 'news'));
            if (Array.isArray(data) || !data.next) break;
        }
        return out;
    } finally {
        clearTimeout(timer);
    }
}

export default async function handler(req, res) {
    let xml;
    try {
        let articles = [];
        try {
            articles = await fetchArticles();
        } catch {
            articles = []; // API unavailable: still serve the fixed pages
        }
        xml = buildSitemap(articles);
    } catch {
        xml = buildSitemap([]); // never fail: a sitemap of the fixed pages is always valid
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.end(xml);
}
