import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from '../Footer.jsx';

/** One header and footer for every public page, news articles included. */
const PublicLayout = () => (
    <>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-[#1F3B6B]">
            Skip to content
        </a>
        <Header />
        <main id="main">
            {/* Header and footer stay put while a page's code loads */}
            <Suspense fallback={<p role="status" className="py-24 text-center text-[17px] text-[#2D2D2D]">Loading…</p>}>
                <Outlet />
            </Suspense>
        </main>
        <Footer />
    </>
);

export default PublicLayout;
