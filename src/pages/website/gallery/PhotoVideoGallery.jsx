// pages/website/gallery/PhotoVideoGallery.jsx
import { useState, useEffect } from 'react';
import { Camera, Video, Calendar, Filter, Play, Download, Share2, ZoomIn, X, ChevronLeft, ChevronRight, Grid3X3, Grid2X2 } from 'lucide-react';

const PhotoVideoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid, masonry
  const [gridSize, setGridSize] = useState('medium'); // small, medium, large
  const [selectedItem, setSelectedItem] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Enhanced mock gallery data with more details
  const galleryItems = [
    {
      id: 1,
      title: "Inter-House Sports Competition - Track Events",
      url: "/api/placeholder/800/600",
      thumbnail: "/api/placeholder/400/300",
      type: "photo",
      category: "sports",
      date: "2024-12-15",
      description: "Students competing in various track events during our annual inter-house sports competition. Red House emerged victorious in the 100m relay.",
      tags: ["sports", "competition", "athletics", "students"],
      photographer: "Mr. Adebayo James",
      downloadUrl: "/downloads/sports-competition-1.jpg"
    },
    {
      id: 2,
      title: "Chemistry Laboratory Practical Session",
      url: "/api/placeholder/800/600",
      thumbnail: "/api/placeholder/400/300",
      type: "photo",
      category: "academics",
      date: "2024-12-10",
      description: "SSS 2 students conducting titration experiments in our well-equipped chemistry laboratory under supervision.",
      tags: ["chemistry", "laboratory", "science", "practical"],
      photographer: "Mrs. Fatima Usman",
      downloadUrl: "/downloads/chemistry-lab-1.jpg"
    },
    {
      id: 3,
      title: "Cultural Day Celebration Highlights",
      url: "/api/placeholder/800/450",
      thumbnail: "/api/placeholder/400/225",
      type: "video",
      category: "events",
      date: "2024-12-08",
      duration: "5:32",
      description: "A vibrant showcase of Nigerian cultural heritage featuring traditional dances, music, and costume displays from different ethnic groups.",
      tags: ["culture", "dance", "music", "tradition", "nigeria"],
      videoUrl: "/videos/cultural-day-2024.mp4"
    },
    {
      id: 4,
      title: "New ICT Laboratory Opening",
      url: "/api/placeholder/800/600",
      thumbnail: "/api/placeholder/400/300",
      type: "photo",
      category: "facilities",
      date: "2024-12-05",
      description: "Our brand new ICT laboratory featuring 40 modern computers with high-speed internet connectivity and interactive whiteboards.",
      tags: ["technology", "computers", "facilities", "learning"],
      photographer: "Mr. Kola Ogundimu",
      downloadUrl: "/downloads/ict-lab-opening.jpg"
    },
    {
      id: 5,
      title: "Annual Prize Giving Ceremony",
      url: "/api/placeholder/800/450",
      thumbnail: "/api/placeholder/400/225",
      type: "video",
      category: "events",
      date: "2024-12-01",
      duration: "12:45",
      description: "Complete coverage of our annual prize giving ceremony where outstanding students received awards for academic excellence and exemplary conduct.",
      tags: ["awards", "ceremony", "achievement", "excellence"],
      videoUrl: "/videos/prize-giving-2024.mp4"
    },
    {
      id: 6,
      title: "Advanced Mathematics Class - Calculus",
      url: "/api/placeholder/800/600",
      thumbnail: "/api/placeholder/400/300",
      type: "photo",
      category: "academics",
      date: "2024-11-28",
      description: "SSS 3 students engaged in an interactive calculus lesson preparing for their WAEC examinations.",
      tags: ["mathematics", "calculus", "teaching", "waec"],
      photographer: "Mrs. Grace Okafor",
      downloadUrl: "/downloads/mathematics-class.jpg"
    },
    {
      id: 7,
      title: "Library Study Session",
      url: "/api/placeholder/800/600",
      thumbnail: "/api/placeholder/400/300",
      type: "photo",
      category: "academics",
      date: "2024-11-25",
      description: "Students making use of our quiet study areas and extensive book collection during afternoon study period.",
      tags: ["library", "study", "reading", "books"],
      photographer: "Mr. Ibrahim Mohammed",
      downloadUrl: "/downloads/library-session.jpg"
    },
    {
      id: 8,
      title: "Inter-School Football Championship",
      url: "/api/placeholder/800/450",
      thumbnail: "/api/placeholder/400/225",
      type: "video",
      category: "sports",
      date: "2024-11-22",
      duration: "8:15",
      description: "Exciting highlights from our victory in the inter-school football championship, featuring the winning goal and celebration.",
      tags: ["football", "championship", "victory", "teamwork"],
      videoUrl: "/videos/football-championship.mp4"
    },
    {
      id: 9,
      title: "Science Fair Exhibition",
      url: "/api/placeholder/800/600",
      thumbnail: "/api/placeholder/400/300",
      type: "photo",
      category: "academics",
      date: "2024-11-20",
      description: "Students presenting their innovative science projects at our annual science fair, demonstrating creativity and scientific knowledge.",
      tags: ["science", "innovation", "projects", "exhibition"],
      photographer: "Dr. Yemi Adebisi",
      downloadUrl: "/downloads/science-fair.jpg"
    },
    {
      id: 10,
      title: "School Choir Performance",
      url: "/api/placeholder/800/450",
      thumbnail: "/api/placeholder/400/225",
      type: "video",
      category: "events",
      date: "2024-11-18",
      duration: "4:28",
      description: "Beautiful performance by our school choir during the end-of-term assembly, featuring both English and local language songs.",
      tags: ["music", "choir", "performance", "assembly"],
      videoUrl: "/videos/choir-performance.mp4"
    },
    {
      id: 11,
      title: "Art and Craft Exhibition",
      url: "/api/placeholder/800/600",
      thumbnail: "/api/placeholder/400/300",
      type: "photo",
      category: "academics",
      date: "2024-11-15",
      description: "Display of creative artwork and handicrafts made by students in our art and craft classes.",
      tags: ["art", "creativity", "exhibition", "crafts"],
      photographer: "Ms. Blessing Okoro",
      downloadUrl: "/downloads/art-exhibition.jpg"
    },
    {
      id: 12,
      title: "Morning Assembly Routine",
      url: "/api/placeholder/800/600",
      thumbnail: "/api/placeholder/400/300",
      type: "photo",
      category: "events",
      date: "2024-11-12",
      description: "Students and staff during our daily morning assembly, fostering unity and school spirit.",
      tags: ["assembly", "unity", "morning", "routine"],
      photographer: "Mr. Daniel Okafor",
      downloadUrl: "/downloads/morning-assembly.jpg"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', count: galleryItems.length },
    { value: 'academics', label: 'Academics', count: galleryItems.filter(item => item.category === 'academics').length },
    { value: 'sports', label: 'Sports', count: galleryItems.filter(item => item.category === 'sports').length },
    { value: 'events', label: 'Events', count: galleryItems.filter(item => item.category === 'events').length },
    { value: 'facilities', label: 'Facilities', count: galleryItems.filter(item => item.category === 'facilities').length }
  ];

  const types = [
    { value: 'all', label: 'All Media' },
    { value: 'photo', label: 'Photos Only' },
    { value: 'video', label: 'Videos Only' }
  ];

  const filteredItems = galleryItems.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const typeMatch = selectedType === 'all' || item.type === selectedType;
    return categoryMatch && typeMatch;
  });

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isLightboxOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateLightbox('prev');
          break;
        case 'ArrowRight':
          navigateLightbox('next');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isLightboxOpen, lightboxIndex]);

  const openLightbox = (item, index) => {
    setSelectedItem(item);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (direction) => {
    const newIndex = direction === 'next' 
      ? (lightboxIndex + 1) % filteredItems.length
      : lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1;
    
    setLightboxIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
  };

  const getGridClasses = () => {
    const sizeClasses = {
      small: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      medium: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      large: 'grid-cols-1 md:grid-cols-2'
    };
    return sizeClasses[gridSize];
  };

  const getCategoryColor = (category) => {
    const colors = {
      academics: 'text-primary-600 bg-primary-100',
      sports: 'text-secondary-600 bg-secondary-100',
      events: 'text-accent-600 bg-accent-100',
      facilities: 'text-purple-600 bg-purple-100'
    };
    return colors[category] || 'text-neutral-600 bg-neutral-100';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleDownload = (item) => {
    // In a real app, this would trigger the actual download
    console.log(`Downloading: ${item.title}`);
    // window.open(item.downloadUrl, '_blank');
  };

  const handleShare = (item) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${item.title} - ${window.location.href}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      {/* Header */}
      <div className="bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Photo & Video Gallery</h1>
            <p className="text-xl text-primary-200 max-w-3xl mx-auto">
              Browse through our collection of memorable moments, achievements, and daily school life captured in photos and videos
            </p>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Filters */}
            <div className="flex-1 space-y-4">
              {/* Category Filter */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Filter size={20} className="text-neutral-500" />
                  <span className="font-medium text-neutral-700">Categories</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category.value
                          ? 'bg-primary-600 text-white'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {category.label} ({category.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Media Type Filter */}
              <div className="flex items-center space-x-4">
                <span className="font-medium text-neutral-700">Media Type:</span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
                >
                  {types.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right: View Controls */}
            <div className="flex items-center space-x-4">
              {/* Grid Size */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-neutral-700">Size:</span>
                <div className="flex bg-neutral-100 rounded-lg p-1">
                  {[
                    { value: 'small', icon: Grid3X3 },
                    { value: 'medium', icon: Grid2X2 },
                    { value: 'large', icon: Grid3X3 }
                  ].map(({ value, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setGridSize(value)}
                      className={`p-2 rounded ${gridSize === value 
                        ? 'bg-primary-600 text-white' 
                        : 'text-neutral-600 hover:text-neutral-800'
                      }`}
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredItems.length > 0 ? (
          <>
            {/* Results Info */}
            <div className="mb-8 text-center">
              <p className="text-neutral-600">
                Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
                {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
                {selectedType !== 'all' && ` (${selectedType}s only)`}
              </p>
            </div>

            {/* Gallery Grid */}
            <div className={`grid ${getGridClasses()} gap-6`}>
              {filteredItems.map((item, index) => (
                <div key={item.id} className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Image/Video Thumbnail */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Media Type Overlay */}
                    <div className="absolute top-3 right-3">
                      <div className={`p-2 rounded-full ${item.type === 'video' ? 'bg-red-500' : 'bg-blue-500'} text-white`}>
                        {item.type === 'video' ? <Video size={16} /> : <Camera size={16} />}
                      </div>
                    </div>

                    {/* Video Duration */}
                    {item.type === 'video' && item.duration && (
                      <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                        {item.duration}
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => openLightbox(item, index)}
                        className="bg-white text-neutral-800 px-4 py-2 rounded-lg font-medium hover:bg-neutral-100 transition-colors flex items-center space-x-2"
                      >
                        <ZoomIn size={16} />
                        <span>View</span>
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.category)}`}>
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </span>
                      <div className="flex items-center text-neutral-500 text-sm">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(item.date)}
                      </div>
                    </div>
                    <h3 className="font-semibold text-neutral-800 mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-neutral-600 line-clamp-3 mb-3">{item.description}</p>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openLightbox(item, index)}
                          className="p-2 text-neutral-600 hover:text-primary-600 rounded-full hover:bg-primary-50 transition-colors"
                          title="View full size"
                        >
                          <ZoomIn size={16} />
                        </button>
                        {item.type === 'photo' && (
                          <button
                            onClick={() => handleDownload(item)}
                            className="p-2 text-neutral-600 hover:text-secondary-600 rounded-full hover:bg-secondary-50 transition-colors"
                            title="Download"
                          >
                            <Download size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleShare(item)}
                          className="p-2 text-neutral-600 hover:text-accent-600 rounded-full hover:bg-accent-50 transition-colors"
                          title="Share"
                        >
                          <Share2 size={16} />
                        </button>
                      </div>
                      {item.photographer && (
                        <span className="text-xs text-neutral-500">by {item.photographer}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4">
              <Camera className="mx-auto text-neutral-400" size={64} />
            </div>
            <p className="text-neutral-600 text-lg">No items found matching your filters.</p>
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSelectedType('all');
              }}
              className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-60 text-white hover:text-gray-300 p-2"
          >
            <X size={24} />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 text-white hover:text-gray-300 p-2"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 text-white hover:text-gray-300 p-2"
          >
            <ChevronRight size={32} />
          </button>

          {/* Content */}
          <div className="max-w-6xl max-h-[90vh] mx-4 flex flex-col lg:flex-row bg-white rounded-lg overflow-hidden">
            {/* Media */}
            <div className="flex-1 relative bg-black flex items-center justify-center">
              {selectedItem.type === 'video' ? (
                <div className="relative w-full max-h-[60vh] lg:max-h-full">
                  <div className="aspect-video bg-black flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play size={64} className="mx-auto mb-4" />
                      <p className="text-lg">Video: {selectedItem.title}</p>
                      <p className="text-sm opacity-75">Duration: {selectedItem.duration}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="max-w-full max-h-[60vh] lg:max-h-full object-contain"
                />
              )}
            </div>

            {/* Info Panel */}
            <div className="lg:w-80 p-6 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(selectedItem.category)}`}>
                    {selectedItem.category.charAt(0).toUpperCase() + selectedItem.category.slice(1)}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-neutral-800">{selectedItem.title}</h2>
                <p className="text-neutral-600">{selectedItem.description}</p>
                
                {/* Metadata */}
                <div className="space-y-2 pt-4 border-t border-neutral-200">
                  <div className="flex items-center text-sm text-neutral-600">
                    <Calendar size={16} className="mr-2" />
                    {formatDate(selectedItem.date)}
                  </div>
                  {selectedItem.photographer && (
                    <div className="text-sm text-neutral-600">
                      <strong>Photographer:</strong> {selectedItem.photographer}
                    </div>
                  )}
                  {selectedItem.tags && (
                    <div className="pt-2">
                      <div className="text-sm font-medium text-neutral-700 mb-2">Tags:</div>
                      <div className="flex flex-wrap gap-1">
                        {selectedItem.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-4 border-t border-neutral-200">
                  {selectedItem.type === 'photo' && (
                    <button
                      onClick={() => handleDownload(selectedItem)}
                      className="flex-1 bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleShare(selectedItem)}
                    className="flex-1 bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Share2 size={16} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary-600">
                {galleryItems.filter(item => item.type === 'photo').length}
              </div>
              <div className="text-sm text-neutral-600 font-medium">Photos</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary-600">
                {galleryItems.filter(item => item.type === 'video').length}
              </div>
              <div className="text-sm text-neutral-600 font-medium">Videos</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent-600">
                {categories.length - 1}
              </div>
              <div className="text-sm text-neutral-600 font-medium">Categories</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">
                {galleryItems.length}
              </div>
              <div className="text-sm text-neutral-600 font-medium">Total Items</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoVideoGallery;