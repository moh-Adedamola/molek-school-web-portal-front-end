import { useEffect, useState } from 'react';
import { fetchAllNews } from '../../service/auth';
import { ChevronLeft, ChevronRight, Newspaper, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const LatestNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadNews = async () => {
      try {
        const cachedNews = localStorage.getItem('latestNews');
        const cachedTimestamp = localStorage.getItem('latestNewsTimestamp');
        const cacheExpiry = 1000 * 60 * 60; // 1 hour

        if (cachedNews && cachedTimestamp) {
          const age = Date.now() - parseInt(cachedTimestamp);
          if (age < cacheExpiry) {
            const parsedNews = JSON.parse(cachedNews);
            setNewsList(Array.isArray(parsedNews) ? parsedNews : [parsedNews]);
            setLoading(false);
            return;
          }
        }

        const latestNews = await fetchAllNews();
        const newsArray = Array.isArray(latestNews) ? latestNews : [latestNews];
        setNewsList(newsArray);

        localStorage.setItem('latestNews', JSON.stringify(newsArray));
        localStorage.setItem('latestNewsTimestamp', Date.now().toString());
      } catch (error) {
        console.error('Error fetching latest news:', error.message);
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

  useEffect(() => {
    if (newsList.length > 1 && !isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % newsList.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [newsList.length, isHovered]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + newsList.length) % newsList.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % newsList.length);
  };

  if (loading) {
    return (
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 animate-pulse">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-32 h-8 bg-gray-200 rounded-full" />
            </div>
            <div className="h-12 bg-gray-200 rounded-xl w-3/4 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (!newsList || newsList.length === 0) return null;

  const currentNews = newsList[currentIndex];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] via-white to-[#FAFAFA] -z-10" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#3B82F6]/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#E85D5D]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
        >
          {/* Top Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#3B82F6] via-[#1F3B6B] to-[#E85D5D]" />

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Header Badge */}
            <motion.div 
              className="flex items-center justify-center mb-8"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#3B82F6] to-[#1F3B6B] px-6 py-3 rounded-full shadow-lg">
                <Newspaper className="w-5 h-5 text-white animate-pulse" />
                <span className="text-white font-bold text-sm sm:text-base uppercase tracking-wider">
                  Latest Updates
                </span>
              </div>
            </motion.div>

            {/* News Content */}
            <div className="relative flex items-center gap-4 sm:gap-6">
              {/* Previous Button */}
              {newsList.length > 1 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goToPrevious}
                  className="hidden sm:flex flex-shrink-0 items-center justify-center w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#1F3B6B] text-white rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2"
                  aria-label="Previous news"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
              )}

              {/* News Title Container */}
              <div className="flex-1 min-h-[5rem] flex items-center justify-center px-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => navigate('/news')}
                    className="group cursor-pointer text-center w-full"
                  >
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1F3B6B] group-hover:text-[#3B82F6] transition-colors duration-300 leading-tight">
                      {currentNews.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Click to read more</span>
                      <ArrowRight className="w-4 h-4" />
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Button */}
              {newsList.length > 1 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goToNext}
                  className="hidden sm:flex flex-shrink-0 items-center justify-center w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#1F3B6B] text-white rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2"
                  aria-label="Next news"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              )}
            </div>

            {/* Mobile Navigation Buttons */}
            {newsList.length > 1 && (
              <div className="flex sm:hidden justify-center gap-4 mt-6">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={goToPrevious}
                  className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#1F3B6B] text-white rounded-full shadow-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={goToNext}
                  className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#1F3B6B] text-white rounded-full shadow-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            )}

            {/* Progress Dots */}
            {newsList.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {newsList.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className="relative group"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'w-10 bg-gradient-to-r from-[#3B82F6] to-[#1F3B6B]'
                          : 'w-2 bg-gray-300 group-hover:bg-gray-400'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
            )}

            {/* View All Button */}
            <div className="flex justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/news')}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#3B82F6] to-[#1F3B6B] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <span>View All News</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Decorative Corners */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#3B82F6]/5 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#E85D5D]/5 to-transparent rounded-tr-full pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

export default LatestNews;