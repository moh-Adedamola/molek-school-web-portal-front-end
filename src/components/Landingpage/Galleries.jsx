import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, Calendar, User, Image as ImageIcon } from 'lucide-react';
import { fetchAllGalleries } from '../../service/auth';

const formatDate = (isoString) => {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return isoString;
  }
};

// Modern Gallery Modal with smooth animations
const GalleryModal = ({ isOpen, onClose, mediaUrls, title, description }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // ✅ ALWAYS call hooks - use conditions inside
  useEffect(() => {
    if (isOpen) {
      // Reset index when modal opens
      setCurrentIndex(0);
    }
  }, [isOpen]);

  // ✅ ALWAYS call keyboard navigation hook
  useEffect(() => {
    if (!isOpen) return; // Early return is OK, hook still called
    
    const handleKeyPress = (e) => {
      const total = mediaUrls?.length || 0;
      if (e.key === 'ArrowRight' && currentIndex < total - 1) {
        setCurrentIndex(prev => prev + 1);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, currentIndex, mediaUrls, onClose]);

  // Early return AFTER all hooks
  if (!isOpen || !mediaUrls?.length) return null;

  const total = mediaUrls.length;
  const currentMedia = mediaUrls[currentIndex];
  const isVideo = currentMedia?.match(/\.(mp4|mov|avi|webm)$/i);

  const goNext = () => setCurrentIndex((prev) => Math.min(prev + 1, total - 1));
  const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <AnimatePresence>
      <div>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-6xl w-full pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors z-10 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
            >
              <X className="w-5 h-5" />
              <span className="text-sm font-medium">Close (ESC)</span>
            </button>

            {/* Media Container */}
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-[16/10] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {isVideo ? (
                      <video
                        src={currentMedia}
                        controls
                        className="max-h-full max-w-full object-contain"
                        controlsList="nodownload"
                      >
                        Your browser doesn't support video.
                      </video>
                    ) : (
                      <img
                        src={currentMedia}
                        alt={`${title} - ${currentIndex + 1}`}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                        onError={(e) => { e.target.src = '/excel.webp'; }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              {total > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all shadow-lg group disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={goNext}
                    disabled={currentIndex === total - 1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all shadow-lg group disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </button>
                </>
              )}

              {/* Bottom Info Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-xl mb-1">{title}</h3>
                    {description && (
                      <p className="text-white/80 text-sm line-clamp-2">{description}</p>
                    )}
                  </div>
                  <div className="ml-4 text-white/90 text-sm font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    {currentIndex + 1} / {total}
                  </div>
                </div>
              </div>

              {/* Dot Indicators */}
              {total > 1 && total <= 10 && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
                  {mediaUrls.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`transition-all rounded-full ${
                        i === currentIndex
                          ? 'w-8 h-2 bg-white'
                          : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

const Galleries = () => {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cardColors = ['#1F3B6B', '#3B82F6', '#E85D5D', '#F9D89C'];

  useEffect(() => {
    const loadGalleries = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAllGalleries();
        console.log('Galleries loaded:', data);
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

  // Loading state
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
                <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded-lg w-3/4" />
                  <div className="h-4 bg-gray-200 rounded-lg w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-red-50 rounded-2xl p-12 border border-red-200">
            <div className="text-6xl mb-6">📷</div>
            <h2 className="text-3xl font-bold text-[#E85D5D] mb-4">Oops! Galleries Unavailable</h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#3B82F6] text-white px-8 py-3 rounded-full hover:bg-[#2563EB] transition-all shadow-lg hover:shadow-xl font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-[#3B82F6]/10 px-6 py-2 rounded-full mb-4">
            <ImageIcon className="w-5 h-5 text-[#3B82F6]" />
            <span className="text-[#3B82F6] font-semibold text-sm uppercase tracking-wider">Gallery</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F3B6B] mb-4">
            School Moments
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Capturing memories, celebrating achievements, and sharing the joy of learning
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleries.map((gallery, idx) => {
            const accentColor = cardColors[idx % cardColors.length];
            
            return (
              <motion.div
                key={gallery.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Thumbnail */}
                <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  {gallery.media_urls?.[0] ? (
                    <>
                      <img
                        src={gallery.media_urls[0]}
                        alt={gallery.title || `Gallery ${gallery.id}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => { e.target.src = '/excel.webp'; }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                            <ZoomIn className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <ImageIcon className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  
                  <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: accentColor }} />
                  
                  <div
                    className="absolute top-4 right-4 px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg backdrop-blur-sm"
                    style={{ backgroundColor: accentColor }}
                  >
                    {gallery.media_count || 0} {gallery.media_count === 1 ? 'photo' : 'photos'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1F3B6B] mb-3 line-clamp-2 min-h-[3.5rem]">
                    {gallery.title || `Gallery ${gallery.id}`}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(gallery.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{gallery.created_by?.username || 'Admin'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedGallery(gallery)}
                    disabled={!gallery.media_urls?.length}
                    className="w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    style={{ backgroundColor: accentColor }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <ZoomIn className="w-5 h-5" />
                      View Gallery
                    </span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {galleries.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-8xl mb-6">📸</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Galleries Yet</h3>
            <p className="text-gray-600">Check back soon for exciting school moments!</p>
          </motion.div>
        )}
      </div>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={!!selectedGallery}
        onClose={() => setSelectedGallery(null)}
        mediaUrls={selectedGallery?.media_urls || []}
        title={selectedGallery?.title}
        description={selectedGallery?.description}
      />
    </motion.section>
  );
};

export default Galleries;