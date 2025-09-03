// File: src/pages/website/gallery/Gallery.jsx

import { useState } from 'react';
import { Camera, Play, Filter, Search, Grid, List } from 'lucide-react';
import GalleryGrid from '../../../components/website/GalleryGrid';

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedYear, setSelectedYear] = useState('2024');

  // Mock gallery data
  const galleryItems = [
    {
      id: 1,
      url: '/images/gallery/sports-day-1.jpg',
      title: 'Annual Sports Day 2024',
      description: 'Students competing in various athletic events',
      type: 'image',
      category: 'sports',
      date: '2024-03-15',
      alt: 'Students running track race'
    },
    {
      id: 2,
      url: '/images/gallery/science-fair-video.mp4',
      thumbnail: '/images/gallery/science-fair-thumb.jpg',
      title: 'Science Fair Presentation',
      description: 'Student presenting innovative project',
      type: 'video',
      category: 'academics',
      date: '2024-03-10',
      alt: 'Science fair presentation video'
    },
    {
      id: 3,
      url: '/images/gallery/cultural-day-1.jpg',
      title: 'Cultural Day Celebration',
      description: 'Traditional dance performance',
      type: 'image',
      category: 'cultural',
      date: '2024-02-28',
      alt: 'Students in traditional costumes dancing'
    },
    {
      id: 4,
      url: '/images/gallery/graduation-2024.jpg',
      title: 'Graduation Ceremony 2024',
      description: 'SSS3 students receiving certificates',
      type: 'image',
      category: 'ceremony',
      date: '2024-07-20',
      alt: 'Graduation ceremony with students in caps and gowns'
    },
    {
      id: 5,
      url: '/images/gallery/library-opening.jpg',
      title: 'New Library Opening',
      description: 'Modern library facility inauguration',
      type: 'image',
      category: 'infrastructure',
      date: '2024-01-15',
      alt: 'New library interior with students reading'
    },
    {
      id: 6,
      url: '/images/gallery/inter-house-sports-video.mp4',
      thumbnail: '/images/gallery/inter-house-sports-thumb.jpg',
      title: 'Inter-House Sports Competition',
      description: 'Highlights from the annual competition',
      type: 'video',
      category: 'sports',
      date: '2024-02-15',
      alt: 'Inter-house sports competition highlights'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: Grid },
    { value: 'academics', label: 'Academic Events', icon: null },
    { value: 'sports', label: 'Sports & Games', icon: null },
    { value: 'cultural', label: 'Cultural Activities', icon: null },
    { value: 'ceremony', label: 'Ceremonies', icon: null },
    { value: 'infrastructure', label: 'Facilities', icon: null }
  ];

  const availableYears = ['2024', '2023', '2022'];

  // Filter gallery items
  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesYear = item.date.startsWith(selectedYear);
    return matchesSearch && matchesCategory && matchesYear;
  });

  const getItemCount = (category) => {
    if (category === 'all') return galleryItems.length;
    return galleryItems.filter(item => item.category === category).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="hero-gradient text-white py-16">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Photo & Video Gallery</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Explore memorable moments from school events, activities, achievements, and daily life at our institution.
          </p>
        </div>
      </div>

      <div className="container-max py-8">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search photos and videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-base pl-10 w-full"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-base pl-10 pr-8 min-w-48"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label} ({getItemCount(category.value)})
                  </option>
                ))}
              </select>
            </div>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="input-base min-w-32"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex bg-white rounded-lg border overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-600">
          <span>Showing {filteredItems.length} items</span>
          <span>•</span>
          <span>{filteredItems.filter(item => item.type === 'image').length} Photos</span>
          <span>•</span>
          <span>{filteredItems.filter(item => item.type === 'video').length} Videos</span>
        </div>

        {/* Gallery Content */}
        {viewMode === 'grid' ? (
          <GalleryGrid items={filteredItems} gridCols={3} />
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="card-base">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Thumbnail */}
                  <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <div className="relative w-full h-full">
                      <img
                        src={item.type === 'video' ? item.thumbnail || item.url : item.url}
                        alt={item.alt || item.title}
                        className="w-full h-full object-cover"
                      />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <Play className="w-8 h-8 text-white" fill="white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {item.type === 'video' ? (
                          <Play className="w-4 h-4" />
                        ) : (
                          <Camera className="w-4 h-4" />
                        )}
                        <span className="capitalize">{item.type}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>
                        {new Date(item.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="capitalize badge-info text-xs">
                        {item.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No media found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}

        {/* Featured Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`card-base text-center hover:shadow-lg transition-all duration-300 ${
                  selectedCategory === category.value ? 'border-blue-300 bg-blue-50' : ''
                }`}
              >
                <div className="text-blue-600 mb-2">
                  <Camera className="w-8 h-8 mx-auto" />
                </div>
                <h3 className="font-medium text-sm mb-1">{category.label}</h3>
                <p className="text-xs text-gray-500">
                  {getItemCount(category.value)} items
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;