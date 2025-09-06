import { useEffect, useState } from 'react';

// Fallback stale data
const fallbackNews = {
    id: 1,
    title: 'Molek Students Shine at National Science Olympiad',
    description:
        'Our senior students secured top positions in the 2025 National Science Olympiad held in Abuja.',
    image: '/excel.webp',
    timestamp: 'September 2, 2025',
};

const LatestNews = () => {
    const [news, setNews] = useState(() => {
        const cached = localStorage.getItem('latestNews');
        return cached ? JSON.parse(cached) : fallbackNews;
    });

    useEffect(() => {
        const fetchLatestNews = async () => {
            try {
                const response = await fetch('/api/news/latest');
                if (!response.ok) throw new Error('Network error');
                const data = await response.json();
                localStorage.setItem('latestNews', JSON.stringify(data));
                setNews(data);
            } catch (error) {
                console.warn('Using cached or fallback news due to error:', error.message);
            }
        };

        fetchLatestNews();
    }, []);

    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Latest News & Updates</h2>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                        <img
                            src={news.image}
                            alt={news.title}
                            className="w-full h-64 object-cover rounded-md"
                            loading="lazy"
                        />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <h3 className="text-xl font-semibold text-green-700">{news.title}</h3>
                        <p className="text-gray-700 mt-2">{news.description}</p>
                        <p className="text-sm text-gray-500 mt-4">🕒 {news.timestamp}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestNews;
