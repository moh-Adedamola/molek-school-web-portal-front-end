// components/ui/ImageGallery.jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react';

const ImageGallery = ({ items = [], type = 'mixed' }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);
  
  const nextImage = () => {
    setSelectedIndex((prev) => 
      prev === items.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setSelectedIndex((prev) => 
      prev === 0 ? items.length - 1 : prev - 1
    );
  };

  const renderGridItem = (item, index) => (
    <div 
      key={index}
      className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden cursor-pointer group"
      onClick={() => openModal(index)}
    >
      <img 
        src={item.thumbnail || item.url} 
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      
      {item.type === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all">
          <Play className="text-white" size={32} />
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-2 left-2 right-2">
          <p className="text-white text-sm font-medium truncate">
            {item.title}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(renderGridItem)}
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-primary-400 z-10"
            >
              <X size={32} />
            </button>

            {/* Navigation Buttons */}
            {items.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary-400 bg-black bg-opacity-50 rounded-full p-2"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary-400 bg-black bg-opacity-50 rounded-full p-2"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image/Video Display */}
            <div className="bg-white rounded-lg overflow-hidden">
              {items[selectedIndex]?.type === 'video' ? (
                <video 
                  src={items[selectedIndex].url}
                  controls
                  className="max-w-full max-h-[70vh] object-contain"
                />
              ) : (
                <img 
                  src={items[selectedIndex]?.url}
                  alt={items[selectedIndex]?.title}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              )}
              
              {/* Caption */}
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-neutral-800 mb-1">
                  {items[selectedIndex]?.title}
                </h3>
                <p className="text-sm text-neutral-600">
                  {items[selectedIndex]?.description}
                </p>
              </div>
            </div>

            {/* Counter */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white text-sm">
              {selectedIndex + 1} of {items.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;