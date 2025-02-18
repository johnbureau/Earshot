import { useState, useEffect } from 'react';

function BackgroundGallery({ onSelectImage, onDeleteImage }) {
  const [savedImages, setSavedImages] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);

  useEffect(() => {
    // Load saved images from localStorage
    const loadSavedImages = () => {
      const images = JSON.parse(localStorage.getItem('backgroundGallery') || '[]');
      setSavedImages(images);
    };
    loadSavedImages();
  }, []);

  const handleImageSelect = (image) => {
    // Pass both URL and dimensions to parent
    onSelectImage(image.url, image.dimensions);
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Saved Backgrounds</h3>
      {savedImages.length === 0 ? (
        <p className="text-sm text-gray-500">No saved backgrounds yet</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {savedImages.map((image, index) => (
            <div 
              key={index} 
              className="relative group"
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <img
                src={image.url}
                alt={`Background ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                onClick={() => handleImageSelect(image)}
              />
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const newImages = savedImages.filter((_, i) => i !== index);
                    localStorage.setItem('backgroundGallery', JSON.stringify(newImages));
                    setSavedImages(newImages);
                    onDeleteImage?.(image.url);
                  }}
                  className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className={`absolute bottom-1 left-1 right-1 text-xs text-white bg-black bg-opacity-50 rounded px-1 transition-opacity ${
                hoveredImage === index ? 'opacity-100' : 'opacity-0'
              }`}>
                {image.dimensions}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BackgroundGallery; 