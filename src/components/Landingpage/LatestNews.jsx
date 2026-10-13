import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard } from 'swiper/modules';
import 'swiper/css';
import { ArrowRight, ChevronLeft, ChevronRight, Newspaper } from 'lucide-react';
import { fetchAllNews } from '../../service/auth';

const FALLBACK_TITLE = 'MOLEK Schools - Updates Coming Soon';
const CACHE_MS = 1000 * 60 * 60; // the homepage keeps the latest headlines for up to an hour

/*
 * Latest news headlines. Swiper (already installed) with autoplay OFF:
 * nothing moves unless the reader presses Previous/Next, swipes, or uses
 * the arrow keys. Each headline is a real link to its article.
 */
const LatestNews = () => {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [swiper, setSwiper] = useState(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const cached = localStorage.getItem('latestNews');
                const stamp = Number.parseInt(localStorage.getItem('latestNewsTimestamp') || '0', 10);
                if (cached && Date.now() - stamp < CACHE_MS) {
                    const parsed = JSON.parse(cached);
                    setNewsList(Array.isArray(parsed) ? parsed : [parsed]);
                    return;
                }
                const latest = await fetchAllNews();
                const list = Array.isArray(latest) ? latest : [latest];
                setNewsList(list);
                // Don't cache the "coming soon" placeholder: real news should show as soon as it exists.
                if (!(list.length === 1 && list[0]?.title === FALLBACK_TITLE)) {
                    localStorage.setItem('latestNews', JSON.stringify(list));
                    localStorage.setItem('latestNewsTimestamp', Date.now().toString());
                }
            } catch {
                const cached = localStorage.getItem('latestNews');
                if (cached) {
                    const parsed = JSON.parse(cached);
                    setNewsList(Array.isArray(parsed) ? parsed : [parsed]);
                }
            } finally {
                setLoading(false);
            }
        };
        loadNews();
    }, []);

    if (loading || newsList.length === 0) return null;

    const hrefFor = (item) => (item.title === FALLBACK_TITLE || !item.id ? '/news' : `/news/${item.id}`);
    const navBtn = 'inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1F3B6B] text-white disabled:opacity-40 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1F3B6B]';

    return (
        <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-[#FAFAFA]" aria-labelledby="latest-updates-heading">
            <div className="max-w-6xl mx-auto rounded-3xl bg-white shadow-xl border border-gray-100 overflow-hidden">
                <div className="flex items-center gap-2 bg-[#1F3B6B] px-6 py-3">
                    <Newspaper aria-hidden="true" className="w-5 h-5 text-white" />
                    <h2 id="latest-updates-heading" className="text-white font-bold text-sm sm:text-base uppercase tracking-wider">Latest Updates</h2>
                    {newsList.length > 1 && (
                        <span className="ml-auto text-sm text-white/90" aria-live="polite">{index + 1} of {newsList.length}</span>
                    )}
                </div>

                <div className="flex items-center gap-3 sm:gap-6 px-4 sm:px-8 py-8">
                    {newsList.length > 1 && (
                        <button type="button" className={`${navBtn} hidden sm:inline-flex`} aria-label="Previous update"
                            onClick={() => swiper?.slidePrev()} disabled={index === 0}>
                            <ChevronLeft aria-hidden="true" className="w-6 h-6" />
                        </button>
                    )}
                    <Swiper className="flex-1 min-w-0" modules={[A11y, Keyboard]} keyboard={{ enabled: true }}
                        a11y={{ prevSlideMessage: 'Previous update', nextSlideMessage: 'Next update', slideLabelMessage: 'Update {{index}} of {{slidesLength}}' }}
                        spaceBetween={24} slidesPerView={1} onSwiper={setSwiper} onSlideChange={(s) => setIndex(s.activeIndex)}>
                        {newsList.map((item, i) => (
                            <SwiperSlide key={item.id ?? i}>
                                <Link to={hrefFor(item)} className="block text-center rounded-xl p-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#1F3B6B]">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1F3B6B] leading-tight">{item.title}</h3>
                                    <span className="mt-3 inline-flex items-center gap-2 font-semibold text-[#2563EB] underline underline-offset-2">
                                        Read more <ArrowRight aria-hidden="true" className="w-4 h-4" />
                                    </span>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {newsList.length > 1 && (
                        <button type="button" className={`${navBtn} hidden sm:inline-flex`} aria-label="Next update"
                            onClick={() => swiper?.slideNext()} disabled={index === newsList.length - 1}>
                            <ChevronRight aria-hidden="true" className="w-6 h-6" />
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 border-t border-gray-100 px-4 py-4">
                    {newsList.length > 1 && (
                        <span className="flex gap-3 sm:hidden">
                            <button type="button" className={navBtn} aria-label="Previous update" onClick={() => swiper?.slidePrev()} disabled={index === 0}>
                                <ChevronLeft aria-hidden="true" className="w-6 h-6" />
                            </button>
                            <button type="button" className={navBtn} aria-label="Next update" onClick={() => swiper?.slideNext()} disabled={index === newsList.length - 1}>
                                <ChevronRight aria-hidden="true" className="w-6 h-6" />
                            </button>
                        </span>
                    )}
                    <Link to="/news" className="inline-flex items-center gap-2 rounded-full border-2 border-[#1F3B6B] px-6 py-3 min-h-12 font-semibold text-[#1F3B6B] hover:bg-[#FAFAFA] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1F3B6B]">
                        View All News <ArrowRight aria-hidden="true" className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestNews;
