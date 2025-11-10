import { useEffect, useState } from 'react';
import { fetchAllNews } from '../../service/auth';
import { motion } from 'framer-motion';

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

const NewsAndEvents = () => {
    const [news, setNews] = useState([]);
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        const loadNews = async () => {
            try {
                const allNews = await fetchAllNews();
                setNews(allNews);
            } catch (error) {
                console.error('Error fetching all news:', error.message);
            }
        };
        loadNews();
    }, []);

    const toggleDescription = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Rotating colors for cards
    const cardColors = ['#1F3B6B', '#3B82F6', '#E85D5D', '#F9D89C'];

    return (
        <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="min-h-screen bg-[#FAFAFA] px-4 sm:px-6 lg:px-8 py-12"
        >
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold  text-[#3B82F6] mb-8 text-center">
                    📰 News & Events
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((item, idx) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
                        >
                            {/* Media */}
                            <div className="relative mb-4">
                                {item.content_type === 'image' ? (
                                    <img
                                        src={item.media_url || '/excel.webp'}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
                                        loading="lazy"
                                        onError={(e) => (e.target.src = '/excel.webp')}
                                    />
                                ) : (
                                    <video
                                        className="w-full h-48 object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        controls
                                        onError={(e) => (e.target.src = '/fallback.webm')}
                                    >
                                        <source src={item.media_url || '/fallback.webm'} />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                                {/* Color accent bar */}
                                <div 
                                    className="absolute top-0 left-0 w-full h-1"
                                    style={{ backgroundColor: cardColors[idx % cardColors.length] }}
                                />
                            </div>

                            {/* Content */}
                            <div className="px-6 pb-6">
                                <h3 className="text-lg font-semibold  text-[#3B82F6] mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-[#2D2D2D] text-sm">
                                    {expanded[item.id]
                                        ? item.description
                                        : `${item.description?.substring(0, 100)}...`}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    🕐{' '}
                                    {item.publish_date
                                        ? formatDate(item.publish_date)
                                        : item.timestamp || 'No date'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    By: {item.created_by?.full_name || 'Admin'}
                                </p>

                                {/* Read More Button */}
                                <button
                                    onClick={() => toggleDescription(item.id)}
                                    className="mt-4 w-full text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md"
                                    style={{ 
                                        backgroundColor: cardColors[idx % cardColors.length],
                                    }}
                                >
                                    {expanded[item.id] ? 'Show Less' : 'Read More'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default NewsAndEvents;