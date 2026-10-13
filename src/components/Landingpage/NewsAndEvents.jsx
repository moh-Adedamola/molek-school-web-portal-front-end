import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchContentPage } from '../../service/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Newspaper, Play, ArrowRight } from 'lucide-react';

const formatDate = (isoString) => {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return isoString;
  }
};

// Plain-text snippet from rich HTML or legacy text.
const stripHtml = (html) => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
};

const NewsAndEvents = () => {
  const [content, setContent] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const cardColors = ['#1F3B6B', '#3B82F6', '#E85D5D', '#F9D89C'];

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const { items, hasMore: more } = await fetchContentPage(1);
        setContent(items);
        setHasMore(more);
      } catch {
        setContent([]);
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const next = page + 1;
      const { items, hasMore: more } = await fetchContentPage(next);
      setContent((prev) => [...prev, ...items.filter((i) => !prev.some((p) => p.id === i.id))]);
      setPage(next);
      setHasMore(more);
    } catch {
      setLoadError(true);
    } finally {
      setLoadingMore(false);
    }
  };

  // Cloudinary videos have a matching .jpg still; other videos show their first frame.
  const videoPoster = (url) => (/res\.cloudinary\.com\/.+\/video\/upload\//.test(url || '')
    ? url.replace(/\.(mp4|mov|webm|m4v)(\?.*)?$/i, '.jpg') : undefined);

  const filteredContent = selectedFilter === 'all'
    ? content
    : content.filter((item) => item.content_type === selectedFilter);

  if (loading) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="max-w-7xl mx-auto">
          <div className="h-12 bg-gradient-to-r from-[#3B82F6]/20 to-transparent rounded-xl mb-12 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="h-56 bg-gradient-to-br from-gray-200 to-gray-300" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded-lg w-3/4" />
                  <div className="h-4 bg-gray-200 rounded-lg w-full" />
                  <div className="h-4 bg-gray-200 rounded-lg w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-[#3B82F6]/10 px-6 py-2 rounded-full mb-4">
            <Newspaper className="w-5 h-5 text-[#2563EB]" />
            <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-wider">Updates</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F3B6B] mb-4">
            News &amp; Events
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with the latest happenings and announcements from MOLEK Schools
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap justify-center gap-1 bg-white rounded-3xl sm:rounded-full p-1.5 shadow-lg max-w-full" role="group" aria-label="Show">
            {[
              { value: 'all', label: 'All' },
              { value: 'news', label: 'News' },
              { value: 'image', label: 'Photos' },
              { value: 'video', label: 'Videos' },
            ].map((filter) => (
              <button
                key={filter.value}
                type="button"
                aria-pressed={selectedFilter === filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 sm:px-6 py-2.5 min-h-11 rounded-full font-semibold transition-colors focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#1F3B6B] ${
                  selectedFilter === filter.value
                    ? 'bg-[#1F3B6B] text-white shadow-md'
                    : 'text-[#1F3B6B] hover:bg-[#FAFAFA]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredContent.map((item, idx) => {
              const accentColor = cardColors[idx % cardColors.length];
              const snippet = stripHtml(item.description);

              return (
                <article
                  key={item.id}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden flex flex-col"
                >
                  {/* Media Section (image / video / news placeholder) */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {item.media_url && item.content_type === 'image' ? (
                      <>
                        <img
                          src={item.media_url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => (e.target.src = '/excel.webp')}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </>
                    ) : item.media_url && item.content_type === 'video' ? (
                      <div className="relative w-full h-full">
                        <video
                          className="w-full h-full object-cover"
                          preload="metadata"
                          muted
                          playsInline
                          aria-hidden="true"
                          tabIndex={-1}
                          poster={videoPoster(item.media_url)}
                          src={`${item.media_url}#t=0.1`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Placeholder for items with no media (news articles) */
                      <div
                        className="w-full h-full flex flex-col items-center justify-center gap-2"
                        style={{ background: `linear-gradient(135deg, ${accentColor}14, ${accentColor}2e)` }}
                      >
                        <div
                          className="flex items-center justify-center w-20 h-20 rounded-2xl shadow-sm"
                          style={{ backgroundColor: '#ffffff' }}
                        >
                          <Newspaper className="w-10 h-10" style={{ color: accentColor }} />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest text-[#1F3B6B]">
                          News
                        </span>
                      </div>
                    )}

                    {/* Accent Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: accentColor }} />

                    {/* Content Type Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white text-[#1F3B6B] text-sm font-bold uppercase shadow-lg">
                      {item.content_type}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-[#1F3B6B] mb-3 line-clamp-2 min-h-[3.5rem]">
                      {item.title}
                    </h3>

                    <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                      {snippet ? `${snippet.substring(0, 160)}${snippet.length > 160 ? '…' : ''}` : ''}
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4 mt-auto">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(item.publish_date || item.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span>{item.created_by?.full_name || 'Admin'}</span>
                      </div>
                    </div>

                    {/* A real link; its ::after covers the card so the whole card is clickable */}
                    <Link
                      to={`/news/${item.id}`}
                      state={{ item }}
                      className="w-full py-3 rounded-xl font-semibold text-white bg-[#1F3B6B] shadow-md flex items-center justify-center gap-2 after:absolute after:inset-0 after:content-[''] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1F3B6B]"
                    >
                      Read Full Story
                      <ArrowRight aria-hidden="true" className="w-4 h-4" />
                      <span className="sr-only">: {item.title}</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {loadError && (
          <p role="alert" className="mt-8 text-center font-semibold text-red-700">
            We couldn't load more news. Check your internet connection and try again.
          </p>
        )}
        {hasMore && (
          <div className="mt-10 text-center">
            <button type="button" onClick={loadMore} disabled={loadingMore}
              className="inline-flex items-center gap-2 rounded-full bg-[#1F3B6B] px-8 py-3 min-h-12 font-semibold text-white disabled:opacity-60 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1F3B6B]">
              {loadingMore ? 'Loading…' : 'Load more'}
            </button>
          </div>
        )}

        {filteredContent.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-8xl mb-6">📰</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Content Available</h3>
            <p className="text-gray-600">
              {selectedFilter === 'all'
                ? 'Check back soon for exciting updates!'
                : `No ${selectedFilter} content available at the moment.`}
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default NewsAndEvents;
