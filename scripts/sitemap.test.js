import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildSitemap, fetchArticles, ROUTES } from '../api/sitemap.js';

test('sitemap lists the fixed pages and each article with its date', () => {
    const xml = buildSitemap([{ id: 12, title: 'A & B', publish_date: '2026-10-20T09:00:00Z' }, { id: 13, created_at: '2026-10-01T00:00:00Z' }]);
    assert.match(xml, /<loc>https:\/\/molekschools\.com\/<\/loc>/);
    assert.match(xml, /<loc>https:\/\/molekschools\.com\/about<\/loc>/);
    assert.match(xml, /<loc>https:\/\/molekschools\.com\/news\/12<\/loc><lastmod>2026-10-20<\/lastmod>/);
    assert.match(xml, /news\/13<\/loc><lastmod>2026-10-01/);
    assert.doesNotMatch(xml, /\/student\/results|\/student\/details/);
    assert.equal((xml.match(/<url>/g) || []).length, 11 + 2);
});

test('articles are read page by page until there is no next page', async () => {
    const calls = [];
    const fake = async (url) => {
        calls.push(url);
        const page = Number(new URL(url).searchParams.get('page'));
        return { ok: true, status: 200, json: async () => ({ results: [{ id: page, content_type: 'news' }], next: page < 3 ? 'x' : null }) };
    };
    const items = await fetchArticles({ api: 'https://api.test', fetchImpl: fake });
    assert.deepEqual(items.map((i) => i.id), [1, 2, 3]);
    assert.equal(calls.length, 3);
});

test('a failing API still gives a valid sitemap of the fixed pages', async () => {
    const broken = async () => ({ ok: false, status: 503, json: async () => ({}) });
    await assert.rejects(fetchArticles({ api: 'https://api.test', fetchImpl: broken }));
    assert.equal((buildSitemap([]).match(/<url>/g) || []).length, 11);
});

test('the sitemap page list matches the site pages (src/seo/pages.json)', () => {
    const pages = JSON.parse(readFileSync(new URL('../src/seo/pages.json', import.meta.url), 'utf8'));
    assert.deepEqual(ROUTES, Object.keys(pages));
});

test('the function answers with XML even when the API fails', async () => {
    const { default: handler } = await import('../api/sitemap.js');
    const realFetch = globalThis.fetch;
    globalThis.fetch = async () => { throw new Error('down'); };
    const out = { headers: {}, body: '' };
    const res = { statusCode: 0, setHeader: (k, v) => { out.headers[k] = v; }, end: (b) => { out.body = b; } };
    try { await handler({}, res); } finally { globalThis.fetch = realFetch; }
    assert.equal(res.statusCode, 200);
    assert.match(out.headers['Content-Type'], /xml/);
    assert.equal((out.body.match(/<url>/g) || []).length, 11);
});
