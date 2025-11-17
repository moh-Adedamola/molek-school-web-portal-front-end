import { useEffect, useState } from 'react';
import { fetchLatestNews } from '../../service/auth';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LatestNews = () => {
    const [newsList, setNewsList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const latestNews = await fetchLatestNews();
                setNewsList(Array.isArray(latestNews) ? latestNews : [latestNews]);
            } catch (error) {
                console.error('Error fetching latest news:', error.message);
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

    if (loading) {
        return (
            <section className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-[#FAFAFA]">
                <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-2/3"></div>
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
                <h2 className="text-2xl font-bold text-[#3B82F6] mb-6">Latest News & Updates</h2>

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

                    {/* News Title - Centered */}
                    <div className="flex-1 px-6 md:px-12">
                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#2D2D2D] text-center">
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