// File: src/components/website/GalleryGrid.jsx

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const GalleryGrid = ({ items = [], gridCols = 3 }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (item, index) => {
    setSelectedItem(item);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  const navigateGallery = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % items.length
      : currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    
    setCurrentIndex(newIndex);
    setSelectedItem(items[newIndex]);
  };

  const gridClassName = `grid gap-4 ${
    gridCols === 2 ? 'grid-cols-1 md:grid-cols-2' :
    gridCols === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
    'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }`;

  return (
    <>
      {/* Gallery Grid */}
      <div className={gridClassName}>
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="relative group cursor-pointer overflow-hidden rounded-lg"
            onClick={() => openLightbox(item, index)}
          >
            {/* Media Container */}
            <div className="aspect-square w-full bg-gray-100">
              {item.type === 'video' ? (
                <div className="relative w-full h-full">
                  <img
                    src={item.thumbnail || item.url}
                    alt={item.alt || item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Video Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-12 h-12 text-white" fill="white" />
                  </div>
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={item.alt || item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              )}
            </div>

            {/* Overlay with Title */}
            {item.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-white text-sm font-medium">{item.title}</h4>
                {item.date && (
                  <p className="text-gray-300 text-xs mt-1">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          {items.length > 1 && (
            <>
              <button
                onClick={() => navigateGallery('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigateGallery('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Media Display */}
          <div className="max-w-4xl max-h-full w-full h-full flex items-center justify-center">
            {selectedItem.type === 'video' ? (
              <video
                src={selectedItem.url}
                controls
                className="max-w-full max-h-full rounded-lg"
                autoPlay
              />
            ) : (
              <img
                src={selectedItem.url}
                alt={selectedItem.alt || selectedItem.title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            )}
          </div>

          {/* Caption */}
          {(selectedItem.title || selectedItem.description) && (
            <div className="absolute bottom-4 left-4 right-4 text-center text-white">
              {selectedItem.title && (
                <h3 className="text-lg font-semibold mb-2">{selectedItem.title}</h3>
              )}
              {selectedItem.description && (
                <p className="text-sm text-gray-300">{selectedItem.description}</p>
              )}
            </div>
          )}

          {/* Counter */}
          {items.length > 1 && (
            <div className="absolute top-4 left-4 text-white text-sm">
              {currentIndex + 1} of {items.length}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GalleryGrid;