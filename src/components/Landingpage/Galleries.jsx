import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';  // For modal anims
import { fetchAllGalleries } from '../../service/auth';

const formatDate = (isoString) => {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return isoString;
  }
};

// Reusable hook: Media carousel navigation (extensible)
const useMediaCarousel = (mediaUrls) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = mediaUrls?.length || 0;

  const goTo = (index) => setCurrentIndex(Math.max(0, Math.min(total - 1, index)));
  const next = () => goTo(currentIndex + 1);
  const prev = () => goTo(currentIndex - 1);
  const reset = () => setCurrentIndex(0);

  return { currentIndex, total, goTo, next, prev, reset };
};

// Reusable Modal Component (plug-and-play)
const GalleryModal = ({ isOpen, onClose, mediaUrls, title }) => {
  const { currentIndex, total, next, prev, reset } = useMediaCarousel(mediaUrls);
  if (!isOpen || !mediaUrls?.length) return null;

  const currentMedia = mediaUrls[currentIndex];
  const isVideo = currentMedia?.match(/\.(mp4|mov|avi)$/i);  // Infer type (no DB)
  const thumbnailUrl = isVideo 
    ? `${currentMedia}?w=800&h=600&c_fill,f_auto,q_auto:eco`  // Cloudinary thumb (optimized)
    : currentMedia;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={onClose}  // Close on backdrop
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}  // Prevent backdrop close
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              ✕
            </button>

            {/* Carousel Media */}
            <div className="relative w-full h-[70vh] flex items-center justify-center">
              {isVideo ? (
                <video
                  src={currentMedia}
                  controls
                  className="w-full h-full object-contain"
                  poster={thumbnailUrl}  // Preview thumb
                  preload="metadata"  // Efficient load
                >
                  Your browser doesn't support video.
                </video>
              ) : (
                <img
                  src={currentMedia}
                  alt={`${title} - Media ${currentIndex + 1}`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => { e.target.src = '/excel.webp'; }}  // Fallback
                />
              )}
            </div>

            {/* Navigation Dots + Arrows */}
            {total > 1 && (
              <>
                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {mediaUrls.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        i === currentIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                {/* Arrows */}
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors disabled:opacity-50"
                  disabled={currentIndex === 0}
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors disabled:opacity-50"
                  disabled={currentIndex === total - 1}
                >
                  ›
                </button>
              </>
            )}

            {/* Title & Counter */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
              <h3 className="text-lg font-semibold">{title || `Gallery ${currentIndex + 1}`}</h3>
              <p className="text-sm opacity-90">{currentIndex + 1} / {total}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Galleries = () => {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);  // For modal
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGalleries = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAllGalleries();
        setGalleries(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching galleries:', err);
        setError('Failed to load galleries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadGalleries();
  }, []);

  const openGallery = (gallery) => setSelectedGallery(gallery);
  const closeGallery = () => {
    setSelectedGallery(null);
  };

  // Loading/Error states (unchanged; concise)
  if (loading) {
    return (
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Loading Galleries...</h2>
          <div className="inline-block animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
        </div>
      </motion.section>
    );
  }

  if (error) {
    return (
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Galleries Unavailable</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
            Retry
          </button>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
        >
          📸 School Gallery Moments
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <motion.div
              key={gallery.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * gallery.id / 3 }}  // Staggered load
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Thumbnail: First media or fallback */}
              <div className="relative h-48 bg-gray-100">
                {gallery.media_urls?.[0] ? (
                  <img
                    src={`${gallery.media_urls[0]}?w=400&h=300&c_fill,f_auto,q_auto:eco`}  // Optimized thumb (Cloudinary)
                    alt={gallery.title || `Gallery ${gallery.id}`}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = '/excel.webp'; }}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <span className="text-gray-400">No Media</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  {gallery.title || `Gallery ${gallery.id}`}
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  🖼️ {gallery.media_count || 0} item{gallery.media_count !== 1 ? 's' : ''}
                </p>
                <p className="text-xs text-gray-500 mb-2">🕒 {formatDate(gallery.created_at)}</p>
                <p className="text-xs text-gray-500 mb-4">By: {gallery.created_by?.username || 'Admin'}</p>

                {/* 👈 Updated: Modal Trigger (no inline expand) */}
                <button
                  onClick={() => openGallery(gallery)}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                  disabled={!gallery.media_urls?.length}
                >
                  View Gallery ({gallery.media_count || 0} items) 👁️
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 👈 New: Reusable Modal */}
      <GalleryModal
        isOpen={!!selectedGallery}
        onClose={closeGallery}
        mediaUrls={selectedGallery?.media_urls || []}
        title={selectedGallery?.title}
      />
    </motion.section>
  );
};

export default Galleries;