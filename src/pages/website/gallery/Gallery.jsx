// pages/website/gallery/Gallery.jsx
import { useState } from 'react';
import { Camera, Video, Calendar, Filter } from 'lucide-react';
import ImageGallery from '../../../components/ui/ImageGallery';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Mock gallery data
  const galleryItems = [
    {
      id: 1,
      title: "Inter-House Sports Competition",
      url: "/api/placeholder/400/300",
      thumbnail: "/api/placeholder/400/300",
      type: "photo",
      category: "sports",
      date: "2024-12-15",
      description: "Annual inter-house sports competition featuring track and field events"
    },
    {
      id: 2,
      title: "Science Laboratory Practical",
      url: "/api/placeholder/400/300",
      thumbnail: "/api/placeholder/400/300",
      type: "photo",
      category: "academics",
      date: "2024-12-10",
      description: "Students conducting chemistry experiments in our modern laboratory"
    },
    {
      id: 3,
      title: "Cultural Day Celebration",
      url: "/api/placeholder/400/300",
      thumbnail: "/api/placeholder/400/300",
      type: "video",
      category: "events",
      date: "2024-12-08",
      description: "Students showcasing Nigerian cultural heritage through dance and music"
    },
    {
      id: 4,
      title: "New Computer Laboratory",
      url: "/api/placeholder/400/300",
      thumbnail: "/api/placeholder/400/300",
      type: "photo",
      category: "facilities",
      date: "2024-12-05",
      description: "State-of-the-art computer laboratory with modern equipment"
    },
    {
      id: 5,
      title: "Prize Giving Ceremony",
      url: "/api/placeholder/400/300",
      thumbnail: "/api/placeholder/400/300",
      type: "video",
      category: "events",
      date: "2024-12-01",
      description: "Awards ceremony recognizing outstanding student achievements"
    },
    {
      id: 6,
      title: "Mathematics Class Session",
      url: "/api/placeholder/400/300",
      thumbnail: "/api/placeholder/400/300",
      type: "photo",
      category: "academics",
      date: "2024-11-28",
      description: "Interactive mathematics lesson in our modern classroom"
    },
    {
      id: 7,
      title: "School Library Reading Hour",
      url: "/api/placeholder/400/300",
      thumbnail: "/api/placeholder/400/300",
      type: "photo",
      category: "academics",
      date: "2024-11-25",
      description: "Students enjoying quiet study time in our well-equipped library"
    },
    {
      id: 8,
      title: "Football Match Highlights",
      url: "/api/placeholder/400/300",
      thumbnail: "/api/placeholder/400/300",
      type: "video",
      category: "sports",
      date: "2024-11-22",
      description: "Exciting highlights from our school football championship match"
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

  const getMediaIcon = (type) => {
    return type === 'video' ? <Video size={16} /> : <Camera size={16} />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      academics: 'text-primary-600',
      sports: 'text-secondary-600',
      events: 'text-accent-600',
      facilities: 'text-purple-600'
    };
    return colors[category] || 'text-neutral-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      {/* Header */}
      <div className="bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">School Gallery</h1>
            <p className="text-xl text-primary-200 max-w-3xl mx-auto">
              Explore our vibrant school life through photos and videos capturing memorable moments, achievements, and daily activities
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Category Filter */}
            <div className="flex-1">
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
            <div className="lg:w-64">
              <div className="flex items-center space-x-2 mb-3">
                <span className="font-medium text-neutral-700">Media Type</span>
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                {types.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
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

            {/* Gallery Component */}
            <ImageGallery items={filteredItems} />
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
              className="mt-4 btn-primary px-6 py-2 rounded-lg"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

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

export default Gallery;