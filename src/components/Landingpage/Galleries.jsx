import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchAllGalleries } from '../../service/auth';

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

const Galleries = () => {
  const [galleries, setGalleries] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGalleries = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAllGalleries();
        // Handle both: { results: [...] } and plain array
        const galleriesList = data.results || data;
        setGalleries(Array.isArray(galleriesList) ? galleriesList : []);
      } catch (err) {
        console.error('Error fetching all galleries:', err);
        setError('Failed to load galleries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadGalleries();
  }, []);

  const toggleExpanded = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Loading state
  if (loading) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Loading Galleries...</h2>
          <div className="inline-block animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      </motion.section>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-2xl mx-auto text-center">
          <img src="/excel.webp" alt="Error" className="w-24 h-24 mx-auto mb-4 object-contain" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </motion.section>
    );
  }

  // Empty state
  if (galleries.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-2xl mx-auto text-center">
          <img src="/excel.webp" alt="No galleries" className="w-32 h-32 mx-auto mb-4 opacity-60" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Galleries Available</h2>
          <p className="text-gray-600">
            Check back soon for photos from school events, sports day, and more!
          </p>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          School Galleries
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <div
              key={gallery.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="mb-4">
                {gallery.image_urls?.length > 0 ? (
                  <img
                    src={gallery.image_urls[0]}
                    alt={gallery.title || `Gallery ${gallery.id}`}
                    className="w-full h-48 object-cover rounded-md"
                    loading="lazy"
                    onError={(e) => (e.target.src = '/excel.webp')}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
                    <img
                      src="/excel.webp"
                      alt="No image"
                      className="h-16 w-16 object-contain opacity-50"
                    />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  {gallery.title || `Gallery ${gallery.id}`}
                </h3>
                <p className="text-xs text-gray-500 mt-2">
                  🖼️ {gallery.image_count || 0} image{gallery.image_count !== 1 ? 's' : ''}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  🕒 {formatDate(gallery.created_at)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  By: {gallery.created_by?.username || 'Admin'}
                </p>
              </div>

              {/* Expand Button */}
              <button
                onClick={() => toggleExpanded(gallery.id)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
                disabled={!gallery.image_urls?.length}
              >
                {expanded[gallery.id] ? 'Show Less' : `View ${gallery.image_count || 0} Images`}
              </button>

              {/* Expanded Image Grid */}
              {expanded[gallery.id] && gallery.image_urls?.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                  {gallery.image_urls.map((url, index) => (
                    <img
                      key={`${gallery.id}-${index}`}
                      src={url}
                      alt={`Gallery ${gallery.id} - Image ${index + 1}`}
                      className="w-full h-20 object-cover rounded-md"
                      loading="lazy"
                      onError={(e) => (e.target.src = '/excel.webp')}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Galleries;