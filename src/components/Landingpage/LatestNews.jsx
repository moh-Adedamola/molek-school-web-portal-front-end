import { useEffect, useState } from 'react';
import { fetchAllNews } from '../../service/auth';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LatestNews = () => {
    const [newsList, setNewsList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadNews = async () => {
            try {
                // Try to load from cache first
                const cachedNews = localStorage.getItem('latestNews');
                const cachedTimestamp = localStorage.getItem('latestNewsTimestamp');
                const cacheExpiry = 1000 * 60 * 60; // 1 hour cache

                // Check if cache is valid
                if (cachedNews && cachedTimestamp) {
                    const age = Date.now() - parseInt(cachedTimestamp);
                    if (age < cacheExpiry) {
                        const parsedNews = JSON.parse(cachedNews);
                        setNewsList(Array.isArray(parsedNews) ? parsedNews : [parsedNews]);
                        setLoading(false);
                        return; // Use cached data
                    }
                }

                // Fetch fresh data
                const latestNews = await fetchAllNews();
                const newsArray = Array.isArray(latestNews) ? latestNews : [latestNews];
                setNewsList(newsArray);

                // Cache the data
                localStorage.setItem('latestNews', JSON.stringify(newsArray));
                localStorage.setItem('latestNewsTimestamp', Date.now().toString());
            } catch (error) {
                console.error('Error fetching latest news:', error.message);

                // Fallback to cached data even if expired
                const cachedNews = localStorage.getItem('latestNews');
                if (cachedNews) {
                    const parsedNews = JSON.parse(cachedNews);
                    setNewsList(Array.isArray(parsedNews) ? parsedNews : [parsedNews]);
                }
            } finally {
                setLoading(false);
            }
        };
        loadNews();
    }, []);

    // Auto-scroll every 5 seconds
    useEffect(() => {
        if (newsList.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % newsList.length);
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [newsList.length]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + newsList.length) % newsList.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % newsList.length);
    };

    // Navigate to news page when news title is clicked
    const handleNewsClick = () => {
        navigate('/news');
    };

    if (loading) {
        return (
            <section className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-[#FAFAFA]">
                <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
                    <div className="animate-pulse">
                        <h2 className="text-2xl font-bold text-[#3B82F6] mb-6 text-center">
                            Latest News & Updates
                        </h2>
                        <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (!newsList || newsList.length === 0) {
        return null;
    }

    const currentNews = newsList[currentIndex];

    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-[#FAFAFA]">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
                {/* Section Header - Centered */}
                <h2 className="text-2xl font-bold text-[#3B82F6] mb-6 text-center">
                    Latest News & Updates
                </h2>

                <div className="relative flex items-center justify-center py-6">
                    {/* Previous Button */}
                    {newsList.length > 1 && (
                        <button
                            onClick={goToPrevious}
                            className="flex-shrink-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                            aria-label="Previous news"
                        >
                            <ChevronLeft className="w-6 h-6 text-[#3B82F6]" />
                        </button>
                    )}

                    {/* News Title - Centered and Clickable */}
                    <div className="flex-1 px-6 md:px-12">
                        <h3
                            className="text-lg md:text-xl lg:text-2xl font-bold text-[#2D2D2D] text-center cursor-pointer hover:text-[#3B82F6] transition-colors select-none"
                            onClick={handleNewsClick}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleNewsClick();
                                }
                            }}
                            aria-label={`Read more about: ${currentNews.title}`}
                        >
                            {currentNews.title}
                        </h3>
                    </div>

                    {/* Next Button */}
                    {newsList.length > 1 && (
                        <button
                            onClick={goToNext}
                            className="flex-shrink-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                            aria-label="Next news"
                        >
                            <ChevronRight className="w-6 h-6 text-[#3B82F6]" />
                        </button>
                    )}
                </div>

                {/* Dots Indicator */}
                {newsList.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                        {newsList.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentIndex
                                        ? 'bg-[#3B82F6] w-8'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                                aria-label={`Go to news ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default LatestNews;