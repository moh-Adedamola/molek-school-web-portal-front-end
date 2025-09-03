// File: src/pages/website/gallery/PhotoVideoGallery.jsx

import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Tag, Share2, Download, Heart } from 'lucide-react';
import GalleryGrid from '../../../components/website/GalleryGrid';

const PhotoVideoGallery = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albums, setAlbums] = useState([]);

  // Mock albums data
  useEffect(() => {
    setAlbums([
      {
        id: 1,
        title: 'Annual Sports Day 2024',
        description: 'Complete coverage of our biggest sporting event',
        date: '2024-03-15',
        category: 'sports',
        coverImage: '/images/albums/sports-day-cover.jpg',
        itemCount: 45,
        items: [
          {
            id: 1,
            url: '/images/gallery/sports/track-race-1.jpg',
            title: '100m Sprint Final',
            description: 'Exciting finish in the 100m sprint competition',
            type: 'image',
            date: '2024-03-15',
            tags: ['athletics', 'competition']
          },
          {
            id: 2,
            url: '/images/gallery/sports/relay-race.mp4',
            thumbnail: '/images/gallery/sports/relay-thumb.jpg',
            title: '4x100m Relay Race',
            description: 'Inter-house relay competition highlights',
            type: 'video',
            date: '2024-03-15',
            tags: ['relay', 'teamwork']
          },
          {
            id: 3,
            url: '/images/gallery/sports/high-jump.jpg',
            title: 'High Jump Competition',
            description: 'Students showcasing their jumping skills',
            type: 'image',
            date: '2024-03-15',
            tags: ['field-events', 'athletics']
          }
        ]
      },
      {
        id: 2,
        title: 'Science Exhibition 2024',
        description: 'Student innovations and discoveries on display',
        date: '2024-03-10',
        category: 'academics',
        coverImage: '/images/albums/science-fair-cover.jpg',
        itemCount: 32,
        items: [
          {
            id: 4,
            url: '/images/gallery/science/robot-demo.mp4',
            thumbnail: '/images/gallery/science/robot-thumb.jpg',
            title: 'Robotics Project Demo',
            description: 'Student demonstrating autonomous robot',
            type: 'video',
            date: '2024-03-10',
            tags: ['robotics', 'innovation']
          },
          {
            id: 5,
            url: '/images/gallery/science/chemistry-experiment.jpg',
            title: 'Chemistry Lab Experiment',
            description: 'Students conducting chemical reactions',
            type: 'image',
            date: '2024-03-10',
            tags: ['chemistry', 'laboratory']
          }
        ]
      },
      {
        id: 3,
        title: 'Cultural Heritage Day',
        description: 'Celebrating Nigerian culture and traditions',
        date: '2024-02-28',
        category: 'cultural',
        coverImage: '/images/albums/cultural-day-cover.jpg',
        itemCount: 28,
        items: [
          {
            id: 6,
            url: '/images/gallery/cultural/traditional-dance.mp4',
            thumbnail: '/images/gallery/cultural/dance-thumb.jpg',
            title: 'Traditional Dance Performance',
            description: 'Beautiful display of Nigerian traditional dances',
            type: 'video',
            date: '2024-02-28',
            tags: ['dance', 'culture', 'tradition']
          },
          {
            id: 7,
            url: '/images/gallery/cultural/costumes.jpg',
            title: 'Traditional Costumes Display',
            description: 'Students in colorful traditional attire',
            type: 'image',
            date: '2024-02-28',
            tags: ['costumes', 'heritage']
          }
        ]
      }
    ]);
  }, []);

  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
  };

  const handleShareAlbum = (album) => {
    // In a real app, this would implement sharing functionality
    console.log('Sharing album:', album.title);
  };

  const handleDownloadAlbum = (album) => {
    // In a real app, this would implement download functionality
    console.log('Downloading album:', album.title);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'sports':
        return 'bg-orange-100 text-orange-700';
      case 'academics':
        return 'bg-blue-100 text-blue-700';
      case 'cultural':
        return 'bg-green-100 text-green-700';
      case 'ceremony':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (selectedAlbum) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Album Header */}
        <div className="hero-gradient text-white py-12">
          <div className="container-max">
            <button
              onClick={handleBackToAlbums}
              className="flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Albums
            </button>
            
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {selectedAlbum.title}
                </h1>
                <p className="text-xl text-blue-100 mb-4">
                  {selectedAlbum.description}
                </p>
                
                <div className="flex items-center gap-4 text-blue-200">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(selectedAlbum.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <span>•</span>
                  <span>{selectedAlbum.items.length} items</span>
                  <span>•</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(selectedAlbum.category)}`}>
                    {selectedAlbum.category}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleShareAlbum(selectedAlbum)}
                  className="btn-outline bg-white bg-opacity-20 border-white border-opacity-30 text-white hover:bg-opacity-30 flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={() => handleDownloadAlbum(selectedAlbum)}
                  className="btn-primary bg-white text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Album Gallery */}
        <div className="container-max py-8">
          <GalleryGrid items={selectedAlbum.items} gridCols={4} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="hero-gradient text-white py-16">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Photo & Video Albums</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Browse through our curated collections of memorable moments from school events and activities.
          </p>
        </div>
      </div>

      <div className="container-max py-8">
        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <div 
              key={album.id} 
              className="card-base group cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedAlbum(album)}
            >
              {/* Cover Image */}
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <img
                  src={album.coverImage}
                  alt={album.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Album Info */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {album.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(album.category)} flex-shrink-0 ml-2`}>
                    {album.category}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {album.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(album.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <span>{album.itemCount} items</span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <button className="text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
                  View Album
                </button>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShareAlbum(album);
                    }}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Toggle favorite functionality
                    }}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {albums.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Tag className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No albums available
            </h3>
            <p className="text-gray-500">
              Check back soon for new photo and video collections.
            </p>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-base text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {albums.length}
            </div>
            <p className="text-gray-600">Total Albums</p>
          </div>
          <div className="card-base text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {albums.reduce((sum, album) => sum + album.itemCount, 0)}
            </div>
            <p className="text-gray-600">Media Files</p>
          </div>
          <div className="card-base text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {new Set(albums.map(album => album.category)).size}
            </div>
            <p className="text-gray-600">Categories</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoVideoGallery;