import { useEffect } from 'react';
import Header from '../Landingpage/Header.jsx';
import Footer from '../Footer.jsx';

/**
 * Shared layout for the Privacy, Terms and Accessibility pages.
 * `sections` is a list of { heading, paragraphs?, bullets?, after? }.
 */
const PolicyPage = ({ title, updated, intro, sections, contact = true }) => {
    useEffect(() => {
        document.title = `${title} | MOLEK Schools`;
    }, [title]);

    return (
        <>
            <Header />
            <main className="bg-white">
                <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-[17px] leading-relaxed text-gray-800">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#1F3B6B]">{title}</h1>
                    <p className="mt-2 text-sm text-gray-600">Last updated: {updated}</p>
                    {intro.map((p) => (
                        <p key={p} className="mt-6">{p}</p>
                    ))}
                    {sections.map((s) => (
                        <section key={s.heading} className="mt-10">
                            <h2 className="text-xl sm:text-2xl font-bold text-[#1F3B6B]">{s.heading}</h2>
                            {(s.paragraphs || []).map((p) => (
                                <p key={p} className="mt-3">{p}</p>
                            ))}
                            {s.bullets && (
                                <ul className="mt-3 list-disc pl-6 space-y-2">
                                    {s.bullets.map((b) => (
                                        <li key={b}>{b}</li>
                                    ))}
                                </ul>
                            )}
                            {(s.after || []).map((p) => (
                                <p key={p} className="mt-3">{p}</p>
                            ))}
                        </section>
                    ))}
                    {contact && (
                        <section className="mt-10">
                            <h2 className="text-xl sm:text-2xl font-bold text-[#1F3B6B]">Contact us</h2>
                            <address className="mt-3 not-italic">
                                MOLEK Schools, 10 Haliru Muhammed Street, Off Old Osogbo-Ede Road, Ofatedo, Osun State
                                <br />
                                P.O. Box 3302, Osogbo
                                <br />
                                <a className="underline text-[#1F3B6B]" href="tel:+2347066277945">+234 706 627 7945</a>
                                {' · '}
                                <a className="underline text-[#1F3B6B]" href="mailto:info@molekschools.com">info@molekschools.com</a>
                            </address>
                        </section>
                    )}
                </article>
            </main>
            <Footer />
        </>
    );
};

export default PolicyPage;
