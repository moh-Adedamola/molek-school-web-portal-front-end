import { useState } from 'react';
import { 
  ImageIcon, 
  Play, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Share2,
  Calendar,
  Tag,
  ZoomIn,
  Heart,
  Eye
} from 'lucide-react';

const GalleryGrid = ({ 
  items = [],
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  showFilters = true,
  showSearch = true,
  enableLightbox = true,
  variant = "default" // "default", "masonry", "compact"
}) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedItems, setLikedItems] = useState(new Set());

  // Sample data if no items provided
  const sampleItems = [
    {
      id: 1,
      type: 'image',
      url: '/api/placeholder/400/300',
      thumbnail: '/api/placeholder/400/300',
      title: 'Inter-House Sports Competition',
      description: 'Students participating in the annual athletics competition',
      category: 'Sports',
      date: '2024-02-15',
      tags: ['sports', 'competition', 'athletics'],
      views: 245,
      likes: 12
    },
    {
      id: 2,
      type: 'video',
      url: '/api/placeholder/400/300',
      thumbnail: '/api/placeholder/400/300',
      title: 'Science Laboratory Session',
      description: 'SSS 2 students conducting chemistry experiments',
      category: 'Academic',
      date: '2024-02-10',
      tags: ['science', 'laboratory', 'chemistry'],
      duration: '3:45',
      views: 189,
      likes: 8
    },
    {
      id: 3,
      type: 'image',
      url: '/api/placeholder/400/300',
      thumbnail: '/api/placeholder/400/300',
      title: 'Cultural Day Celebration',
      description: 'Students showcasing traditional Nigerian dances',
      category: 'Cultural',
      date: '2024-01-25',
      tags: ['culture', 'dance', 'celebration'],
      views: 312,
      likes: 23
    },
    {
      id: 4,
      type: 'image',
      url: '/api/placeholder/400/300',
      thumbnail: '/api/placeholder/400/300',
      title: 'Graduation Ceremony',
      description: 'SSS 3 students at their graduation ceremony',
      category: 'Academic',
      date: '2024-01-20',
      tags: ['graduation', 'ceremony', 'achievement'],
      views: 456,
      likes: 34
    },
    {
      id: 5,
      type: 'video',
      url: '/api/placeholder/400/300',
      thumbnail: '/api/placeholder/400/300',
      title: 'School Choir Performance',
      description: 'Annual music festival performance by school choir',
      category: 'Arts',
      date: '2024-01-15',
      tags: ['music', 'choir', 'performance'],
      duration: '5:12',
      views: 178,
      likes: 15
    },
    {
      id: 6,
      type: 'image',
      url: '/api/placeholder/400/300',
      thumbnail: '/api/placeholder/400/300',
      title: 'Mathematics Competition',
      description: 'JSS students participating in math olympiad',
      category: 'Academic',
      date: '2024-01-10',
      tags: ['mathematics', 'competition', 'academics'],
      views: 234,
      likes: 18
    }
  ];

  const galleryItems = items.length > 0 ? items : sampleItems;
  
  // Get unique categories for filtering
  const categories = ['all', ...new Set(galleryItems.map(item => item.category))];
  
  // Filter items based on category and search
  const filteredItems = galleryItems.filter(item => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  // Handle lightbox navigation
  const openLightbox = (index) => {
    if (enableLightbox) {
      setCurrentIndex(index);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  // Handle like functionality
  const toggleLike = (itemId) => {
    setLikedItems(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(itemId)) {
        newLiked.delete(itemId);
      } else {
        newLiked.add(itemId);
      }
      return newLiked;
    });
  };

  // Get grid classes based on variant and columns
  const getGridClasses = () => {
    const baseClasses = "grid gap-4";
    
    if (variant === "masonry") {
      return `${baseClasses} columns-1 md:columns-2 lg:columns-3 xl:columns-4 space-y-4`;
    }
    
    if (variant === "compact") {
      return `${baseClasses} grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2`;
    }
    
    // Default grid
    return `${baseClasses} grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg} xl:grid-cols-${columns.xl}`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Header Controls */}
      <div className="mb-6 space-y-4">
        {showSearch && (
          <div className="relative">
            <input
              type="text"
              placeholder="Search gallery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <div className="absolute left-3 top-3.5 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        )}
        
        {showFilters && (
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === category
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="text-sm text-gray-500">
          Showing {filteredItems.length} of {galleryItems.length} items
        </div>
      </div>

      {/* Gallery Grid */}
      <div className={getGridClasses()}>
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className={`relative group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
              variant === "masonry" ? "break-inside-avoid mb-4" : ""
            }`}
          >
            {/* Media Container */}
            <div 
              className="relative aspect-video overflow-hidden cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={item.thumbnail || item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay for videos */}
              {item.type === 'video' && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="bg-white bg-opacity-90 rounded-full p-3">
                    <Play className="w-6 h-6 text-gray-800" fill="currentColor" />
                  </div>
                  {item.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {item.duration}
                    </div>
                  )}
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {item.title}
              </h3>
              
              {variant !== "compact" && (
                <>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag}
                        className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        <Tag className="w-2 h-2 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{item.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{item.likes + (likedItems.has(item.id) ? 1 : 0)}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(item.id);
                        }}
                        className={`p-1 rounded transition-colors ${
                          likedItems.has(item.id)
                            ? 'text-red-500 hover:text-red-600'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedItems.has(item.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && enableLightbox && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Media Content */}
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              <div className="aspect-video">
                {filteredItems[currentIndex].type === 'video' ? (
                  <video
                    src={filteredItems[currentIndex].url}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={filteredItems[currentIndex].url}
                    alt={filteredItems[currentIndex].title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              {/* Lightbox Info */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {filteredItems[currentIndex].title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {filteredItems[currentIndex].description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(filteredItems[currentIndex].date)}</span>
                    </div>
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {filteredItems[currentIndex].category}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} of {filteredItems.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;