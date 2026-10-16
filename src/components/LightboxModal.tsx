import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  images: string[];
  initialIndex?: number;
  title: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  images,
  initialIndex = 0,
  title,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen || !images || images.length === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/95 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Main Lightbox Container */}
      <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-8 z-10 pointer-events-none">
        
        {/* Top Header Bar */}
        <div className="pointer-events-auto flex items-center justify-between glass-card px-6 py-3 rounded-2xl max-w-7xl mx-auto w-full">
          <div className="text-white text-xs sm:text-sm font-serif tracking-wider truncate">
            {title}
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono text-amber-200 tracking-widest px-3 py-1 rounded-full glass-card">
              {currentIndex + 1} / {images.length}
            </span>

            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 rounded-full glass-button text-white hover:text-[#BD9C7A] transition-colors cursor-pointer"
              title={isZoomed ? 'Zoom Out' : 'Zoom In'}
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full glass-button text-white hover:text-rose-400 transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Image Display */}
        <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden pointer-events-auto">
          <img
            src={images[currentIndex]}
            alt={`${title} - Photo ${currentIndex + 1}`}
            className={`max-h-[82vh] max-w-[92vw] object-contain rounded-xl shadow-2xl transition-all duration-300 ${
              isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-pointer'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          />

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 p-4 rounded-full glass-play-btn text-white hover:text-[#BD9C7A] cursor-pointer transition-transform hover:scale-110"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 p-4 rounded-full glass-play-btn text-white hover:text-[#BD9C7A] cursor-pointer transition-transform hover:scale-110"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Thumbnail Strip */}
        <div className="pointer-events-auto max-w-3xl mx-auto w-full overflow-x-auto no-scrollbar py-2">
          <div className="flex items-center justify-center space-x-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 transition-all cursor-pointer border-2 ${
                  idx === currentIndex
                    ? 'border-[#BD9C7A] scale-105 opacity-100'
                    : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
