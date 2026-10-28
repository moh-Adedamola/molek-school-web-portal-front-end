import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applySeo, SEO_PAGES } from '../lib/seo';

/**
 * Sets the browser tab title ("<page> | MOLEK Schools") and keeps the page's
 * search and link-preview tags (description, canonical address, robots) in
 * step. Fixed pages take their wording from src/seo/pages.json.
 *
 *   usePageTitle('Gallery')
 *   usePageTitle(article.title, { description: excerpt(article.description) })
 *   usePageTitle('Page not found', { noindex: true })
 */
export default function usePageTitle(title, { description, noindex = false } = {}) {
    const { pathname } = useLocation();
    useEffect(() => {
        // The signed-in portal (/student/...) manages its own robots tag; only its sign-in page is public.
        if (pathname.startsWith('/student/') && pathname.replace(/\/$/, '') !== '/student/login') return;
        const page = SEO_PAGES[pathname.replace(/(.)\/$/, '$1')];
        applySeo({
            title: page && !noindex ? page.title : title ? `${title} | MOLEK Schools` : undefined,
            description: description || page?.description,
            path: pathname,
            noindex,
        });
    }, [title, description, noindex, pathname]);
}
