import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
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

// Photo viewer: Headless UI Dialog (focus stays inside, Escape closes,
// the page behind doesn't scroll). Arrow keys move between photos.
const GalleryModal = ({ isOpen, onClose, mediaUrls, title, description }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = mediaUrls?.length || 0;

  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  const goNext = () => setCurrentIndex((prev) => Math.min(prev + 1, total - 1));
  const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  };

  const currentMedia = mediaUrls?.[currentIndex];
  const isVideo = currentMedia?.match(/\.(mp4|mov|avi|webm)$/i);
  const navBtn = 'absolute top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1F3B6B] shadow-lg disabled:opacity-40 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white';

  return (
    <Dialog open={isOpen && total > 0} onClose={onClose} onKeyDown={onKeyDown} className="relative z-50">
      <div className="fixed inset-0 bg-black/90" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="relative w-full max-w-6xl">
          <button type="button" onClick={onClose}
            className="absolute -top-14 right-0 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 min-h-11 font-semibold text-[#1F3B6B] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white">
            <X aria-hidden="true" className="w-5 h-5" /> Close
          </button>

          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative aspect-[16/10] flex items-center justify-center">
              {isVideo ? (
                <video key={currentMedia} src={currentMedia} controls controlsList="nodownload" className="max-h-full max-w-full object-contain">
                  Your browser doesn't support video.
                </video>
              ) : (
                <img key={currentMedia} src={currentMedia} alt={`${title} - ${currentIndex + 1}`}
                  className="max-h-full max-w-full object-contain" onError={(e) => { e.target.src = '/excel.webp'; }} />
              )}
            </div>

            {total > 1 && (
              <>
                <button type="button" onClick={goPrev} disabled={currentIndex === 0} aria-label="Previous photo" className={`${navBtn} left-4`}>
                  <ChevronLeft aria-hidden="true" className="w-6 h-6" />
                </button>
                <button type="button" onClick={goNext} disabled={currentIndex === total - 1} aria-label="Next photo" className={`${navBtn} right-4`}>
                  <ChevronRight aria-hidden="true" className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="bg-black/85 p-5 sm:p-6 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-white font-bold text-xl mb-1">{title}</DialogTitle>
                {description && <p className="text-white/90 line-clamp-2">{description}</p>}
              </div>
              <p className="text-white font-medium bg-white/15 px-4 py-2 rounded-full whitespace-nowrap" aria-live="polite">
                {currentIndex + 1} / {total}
              </p>
            </div>
          </div>

          {total > 1 && total <= 10 && (
            <div className="mt-4 flex justify-center gap-2">
              {mediaUrls.map((_, i) => (
                <button key={i} type="button" onClick={() => setCurrentIndex(i)}
                  aria-label={`Photo ${i + 1} of ${total}`} aria-current={i === currentIndex ? 'true' : undefined}
                  className={`h-3 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${i === currentIndex ? 'w-8 bg-white' : 'w-3 bg-white/50'}`} />
              ))}
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
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
            <h2 className="text-3xl font-bold text-red-700 mb-4">Oops! Galleries Unavailable</h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#1F3B6B] text-white px-8 py-3 rounded-full hover:bg-[#2563EB] transition-all shadow-lg hover:shadow-xl font-medium"
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
            <ImageIcon className="w-5 h-5 text-[#2563EB]" />
            <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-wider">Gallery</span>
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
                    className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white text-[#1F3B6B] text-sm font-bold shadow-lg"
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
                    type="button"
                    onClick={() => setSelectedGallery(gallery)}
                    disabled={!gallery.media_urls?.length}
                    className="w-full py-3.5 min-h-12 rounded-xl font-semibold text-white bg-[#1F3B6B] shadow-md hover:bg-[#2D2D2D] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1F3B6B]"
                  >
                    <ZoomIn aria-hidden="true" className="w-5 h-5" />
                    View Gallery<span className="sr-only">: {gallery.title}</span>
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