import { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ Hardcoded fallback
const fallbackNews = {
    id: 1,
    title: 'MOLEK Schools Resumes for 2025/2026 Academic Session',
    description:
        'Alhamdulillah! MOLEK Schools officially resumes for the new academic session on Monday, September 22, 2025. All students from Nursery to Senior Secondary are expected to report to the school on this day. We look forward to another year of academic excellence and character development.',
    image_url: '/excel.webp',
    timestamp: 'September 15, 2025',
};

const formatDate = (isoString) => {
    try {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return isoString;
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch (e) {
        return isoString;
    }
};

const LatestNews = () => {
    const [news, setNews] = useState(() => {
        // ✅ First: Try to load from localStorage
        const saved = localStorage.getItem('latestNews');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Validate essential fields
                if (parsed.title && parsed.description) {
                    return parsed;
                }
            } catch {}
        }
        // ✅ If nothing valid, return hardcoded fallback
        return fallbackNews;
    });

    useEffect(() => {
        const fetchLatestNews = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/molek/content/public/`);
                console.log(response)
                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const data = await response.json();

                let latestNews;
                if (Array.isArray(data.results) && data.results.length > 0) {
                    latestNews = data.results[0];
                } else {
                    throw new Error("No news items available");
                }

                // ✅ Save & update only valid data
                localStorage.setItem('latestNews', JSON.stringify(latestNews));
                setNews(latestNews);

            } catch (error) {
                console.warn('Using fallback news due to:', error.message);
                // ✅ Important: Don't override local state unless we *have* to
                // But if there's NO valid news yet, force fallback
                if (!news || !news.id) {
                    setNews(fallbackNews);
                }
            }
        };

        fetchLatestNews();
    }, []);

    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Latest News & Updates</h2>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Image */}
                    <div className="w-full md:w-1/2">
                        <img
                            src={news.image_url || '/excel.webp'}
                            alt={news.title}
                            className="w-full h-64 object-cover rounded-md"
                            loading="lazy"
                            onError={(e) => {
                                e.target.src = '/excel.webp';
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <h3 className="text-xl font-semibold text-green-700">{news.title}</h3>
                        <p className="text-gray-700 mt-2">{news.description}</p>
                        <p className="text-sm text-gray-500 mt-4">
                            🕒 {news.publish_date ? formatDate(news.publish_date) : news.timestamp}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestNews;