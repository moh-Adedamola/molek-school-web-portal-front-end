import { useEffect, useState } from 'react';
import { fetchLatestNews } from '../../service/auth';

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
    const [news, setNews] = useState(null);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const latestNews = await fetchLatestNews();
                setNews(latestNews);
            } catch (error) {
                console.error('Error fetching latest news:', error.message);
            }
        };
        loadNews();
    }, []);

    if (!news) {
        return <div>Loading...</div>;
    }

    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Latest News & Updates</h2>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Media */}
                    <div className="w-full md:w-1/2">
                        {news.content_type === 'image' ? (
                            <img
                                src={news.media_url || '/excel.webp'}
                                alt={news.title}
                                className="w-full h-64 object-cover rounded-md"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.src = '/excel.webp';
                                }}
                            />
                        ) : (
                            <video
                                className="w-full h-64 object-cover rounded-md"
                                autoPlay
                                muted
                                loop
                                controls
                                onError={(e) => {
                                    e.target.src = '/fallback.webm';
                                }}
                            >
                                <source src={news.media_url || '/fallback.webm'} />
                                Your browser does not support the video tag.
                            </video>
                        )}
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