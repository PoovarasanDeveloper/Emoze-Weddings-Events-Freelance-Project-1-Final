import React, { useState, useEffect, useRef } from 'react';
import { WeddingGalleryItem } from '../types';
import { getEmbedVideoUrl } from '../utils/videoUtils';
import {
  X,
  Play,
  MapPin,
  Calendar,
  Heart,
  Camera,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Film,
  Image as ImageIcon,
  CheckCircle2,
} from 'lucide-react';

interface StoryModalProps {
  item: WeddingGalleryItem | null;
  onClose: () => void;
  onPlayVideo: (videoUrl: string, title: string) => void;
  onOpenEnquiry: () => void;
  onNextStory?: () => void;
  onPrevStory?: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  item,
  onClose,
  onPlayVideo,
  onOpenEnquiry,
  onNextStory,
  onPrevStory,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const topFeaturedRef = useRef<HTMLDivElement | null>(null);

  // Reset state when story item changes
  useEffect(() => {
    setActiveImageIndex(0);
    setIsVideoActive(false);
  }, [item?.id]);

  // Handle ESC key and arrow keys for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (item && item.images.length > 1 && !isVideoActive) {
        if (e.key === 'ArrowLeft') handlePrevImage();
        if (e.key === 'ArrowRight') handleNextImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, isVideoActive, activeImageIndex]);

  if (!item) return null;

  const allImages = item.images && item.images.length > 0 ? item.images : [item.coverImage];
  const activeImage = allImages[activeImageIndex] || item.coverImage;

  const handlePrevImage = () => {
    setIsVideoActive(false);
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleNextImage = () => {
    setIsVideoActive(false);
    setActiveImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  const handleSelectThumbnail = (idx: number) => {
    setIsVideoActive(false);
    setActiveImageIndex(idx);
    topFeaturedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-3 md:p-6 bg-black/90 backdrop-blur-md transition-all">
      <div className="fixed inset-0" onClick={onClose} />
     <div className="relative z-10 w-full sm:max-w-5xl md:max-w-6xl 2xl:max-w-7xl h-full sm:h-auto sm:max-h-[96vh] flex flex-col rounded-none sm:rounded-3xl overflow-hidden glass-mild-card-dark border-0 sm:border border-[#BD9C7A]/40 shadow-2xl animate-scale-up text-[#F3F0DD]">
         <div className="flex items-center justify-between px-3 xs:px-4 sm:px-6 py-2.5 sm:py-3.5 border-b border-[#BD9C7A]/25 glass-mild-dark shrink-0 gap-2 z-20">
          <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0 flex-1">
            <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-[#BD9C7A] shrink-0" />
            <div className="min-w-0 flex-1">
              <h3 className="font-6 text-xs xs:text-sm sm:text-base md:text-lg text-[#F3F0DD] truncate leading-tight font-medium">
                {item.title}
              </h3>
              <div className="flex items-center gap-1.5 xs:gap-2 font-10 text-[#EBDEBE]/70 text-[9px] xs:text-[10px] sm:text-xs truncate">
                <span className="truncate">{item.categoryLabel}</span>
                <span>•</span>
                <span className="truncate">{item.location}</span>
                {item.storyDate && (
                  <>
                    <span>•</span>
                    <span className="truncate">{item.storyDate}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {onPrevStory && onNextStory && (
              <div className="hidden md:flex items-center space-x-1 p-1 rounded-full glass-mild-dark border border-[#BD9C7A]/30">
                <button
                  onClick={onPrevStory}
                  className="px-2.5 py-1 rounded-full text-xs font-10 uppercase tracking-wider text-[#EBDEBE] hover:text-[#2C251E] hover:bg-[#BD9C7A] transition-all flex items-center space-x-1 cursor-pointer"
                  title="Previous Wedding Story"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>
                <button
                  onClick={onNextStory}
                  className="px-2.5 py-1 rounded-full text-xs font-10 uppercase tracking-wider text-[#EBDEBE] hover:text-[#2C251E] hover:bg-[#BD9C7A] transition-all flex items-center space-x-1 cursor-pointer"
                  title="Next Wedding Story"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {item.hasVideo && item.videoUrl && (
              <button
                onClick={() => setIsVideoActive(!isVideoActive)}
                className={`px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full font-10 font-bold uppercase tracking-wider flex items-center space-x-1 xs:space-x-1.5 cursor-pointer shadow-md transition-all text-[10px] xs:text-xs sm:text-xs shrink-0 ${
                  isVideoActive
                    ? 'bg-[#E2E7BD] text-[#2C251E]'
                    : 'bg-[#BD9C7A] text-[#2C251E] hover:bg-[#A38362]'
                }`}
                title={isVideoActive ? 'Switch to Photos' : 'Watch Film'}
              >
                {isVideoActive ? (
                  <>
                    <ImageIcon className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                    <span>Photos</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 xs:w-3.5 xs:h-3.5 fill-current" />
                    <span>Film</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 xs:p-2 sm:p-2.5 rounded-full glass-mild-btn text-[#EBDEBE] hover:text-[#BD9C7A] hover:bg-[#BD9C7A]/20 transition-all cursor-pointer shrink-0"
              aria-label="Close story"
              title="Close Story (ESC)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-2.5 xs:p-3 sm:p-5 md:p-6 space-y-3 sm:space-y-5 no-scrollbar flex-1">

          <div ref={topFeaturedRef} className="space-y-2">
            <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black/80 border border-[#BD9C7A]/30 shadow-2xl aspect-[4/3] xs:aspect-[16/10] sm:aspect-[16/9] min-h-[260px] max-h-[55vh] sm:max-h-[65vh] md:max-h-[70vh] flex items-center justify-center">
              
              {isVideoActive && item.videoUrl ? (
                <iframe
                  src={getEmbedVideoUrl(item.videoUrl, true)}
                  title={item.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={activeImage}
                    alt={`${item.title} - Photo ${activeImageIndex + 1}`}
                    className="w-full h-full object-contain sm:object-cover object-center transition-all duration-300"
                    decoding="async"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                  <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:top-3.5 left-2.5 sm:left-3.5 flex items-center gap-1.5 xs:gap-2 z-10">
                    <span className="px-2.5 xs:px-3 py-0.5 sm:py-1 rounded-full glass-mild-dark text-[#EBDEBE]/95 border border-[#BD9C7A]/30 font-10 uppercase tracking-[0.14em] font-semibold text-[9px] xs:text-[10px] sm:text-xs shadow-md whitespace-nowrap inline-flex items-center">
                      {item.categoryLabel}
                    </span>
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full glass-mild-dark text-[#EBDEBE] border border-[#BD9C7A]/40 font-10 tracking-wider text-[9px] xs:text-[10px] sm:text-xs">
                      Photo {activeImageIndex + 1} of {allImages.length}
                    </span>
                  </div>

                  {item.hasVideo && item.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center gap-2 z-20 pointer-events-none">
                      <button
                        onClick={() => setIsVideoActive(!isVideoActive)}
                        className="pointer-events-auto px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#BD9C7A] text-[#2C251E] hover:bg-[#A38362] active:scale-95 transition-all shadow-2xl flex items-center space-x-2 font-10 font-bold uppercase tracking-wider text-xs sm:text-sm cursor-pointer border border-[#EBDEBE]/40"
                      >
                        {isVideoActive ? (
                          <>
                            <ImageIcon className="w-4 h-4" />
                            <span>View Photos ({allImages.length})</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current translate-x-0.5" />
                            <span>Watch Wedding Film</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 sm:left-3.5 top-1/2 -translate-y-1/2 p-2 sm:px-3.5 sm:py-2.5 rounded-full bg-black/75 hover:bg-[#BD9C7A] text-[#F3F0DD] hover:text-[#2C251E] transition-all cursor-pointer shadow-2xl border border-[#BD9C7A]/50 flex items-center space-x-1 group z-20 text-xs"
                        title="Previous photo (Left Arrow ←)"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
                        <span className="hidden sm:inline font-10 font-bold uppercase tracking-wider text-xs">Prev</span>
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 sm:right-3.5 top-1/2 -translate-y-1/2 p-2 sm:px-3.5 sm:py-2.5 rounded-full bg-black/75 hover:bg-[#BD9C7A] text-[#F3F0DD] hover:text-[#2C251E] transition-all cursor-pointer shadow-2xl border border-[#BD9C7A]/50 flex items-center space-x-1 group z-20 text-xs"
                        title="Next photo (Right Arrow →)"
                        aria-label="Next photo"
                      >
                        <span className="hidden sm:inline font-10 font-bold uppercase tracking-wider text-xs">Next</span>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-2.5 sm:bottom-3.5 left-2.5 sm:left-3.5 right-2.5 sm:right-3.5 flex items-center justify-between text-[#F3F0DD] z-10 pointer-events-none">
                    <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#BD9C7A]" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="p-3 xs:p-3.5 sm:p-4.5 rounded-2xl glass-mild-card-dark border border-[#BD9C7A]/25 space-y-1.5">
            <h2 className="font-4 text-[#BD9C7A] text-xs xs:text-sm sm:text-base md:text-lg leading-snug">
              {item.subtitle}
            </h2>
            <p className="font-1 text-[#EBDEBE]/85 font-light text-xs sm:text-sm leading-relaxed">
              {item.photographerNotes ||
                'Captured with authentic emotion, delicate lighting, and timeless framing. Each photograph holds an indelible memory of love, heritage, and joy.'}
            </p>

            {item.vendors && (
              <div className="pt-2 border-t border-[#BD9C7A]/20 flex flex-wrap gap-3 font-8 text-[11px] sm:text-xs">
                {item.vendors.venue && (
                  <div>
                    <span className="text-[#EBDEBE]/60 uppercase tracking-wider block text-[9px]">Venue</span>
                    <span className="text-[#F3F0DD] font-medium">{item.vendors.venue}</span>
                  </div>
                )}
                {item.vendors.decor && (
                  <div>
                    <span className="text-[#EBDEBE]/60 uppercase tracking-wider block text-[9px]">Decor</span>
                    <span className="text-[#F3F0DD] font-medium">{item.vendors.decor}</span>
                  </div>
                )}
                {item.vendors.outfits && (
                  <div>
                    <span className="text-[#EBDEBE]/60 uppercase tracking-wider block text-[9px]">Outfits</span>
                    <span className="text-[#F3F0DD] font-medium">{item.vendors.outfits}</span>
                  </div>
                )}
              </div>
            )}
          </div>


          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#BD9C7A]/20">
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-4 h-4 text-[#BD9C7A]" />
                <h3 className="font-6 text-[#F3F0DD] text-sm sm:text-base font-normal">
                  Story Album Photos ({allImages.length})
                </h3>
              </div>
              <span className="font-10 text-[#EBDEBE]/70 text-[10px] sm:text-xs">
                Tap photo to view
              </span>
            </div>

            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
              {allImages.map((img, idx) => {
                const isCurrent = idx === activeImageIndex && !isVideoActive;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectThumbnail(idx)}
                    className={`group relative aspect-[4/3] rounded-xl overflow-hidden glass-mild-card-dark cursor-pointer transition-all duration-300 shadow-md ${
                      isCurrent
                        ? 'ring-2 ring-[#BD9C7A] ring-offset-2 ring-offset-[#2C251E] scale-[1.02] shadow-xl'
                        : 'border border-[#BD9C7A]/20 hover:border-[#BD9C7A] hover:scale-[1.01]'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${item.title} - ${idx + 1}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                    {isCurrent ? (
                      <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-[#BD9C7A] text-[#2C251E] font-10 font-bold uppercase tracking-wider text-[8px] xs:text-[9px] flex items-center space-x-1 shadow-md">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>Viewing</span>
                      </div>
                    ) : (
                      <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-black/60 text-[#EBDEBE] font-10 text-[8px] xs:text-[9px]">
                        #{idx + 1}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {onPrevStory && onNextStory && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 p-3 sm:p-4 rounded-2xl glass-mild-dark border border-[#BD9C7A]/30">
              <button
                onClick={onPrevStory}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2 rounded-full glass-mild text-[#EBDEBE] hover:bg-[#BD9C7A] hover:text-[#2C251E] border border-[#BD9C7A]/40 transition-all font-10 font-bold uppercase tracking-wider text-xs cursor-pointer shadow-md"
                title="Go to previous wedding story album"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>← Previous Wedding</span>
              </button>

              <span className="font-10 text-[10px] sm:text-xs text-[#BD9C7A] uppercase tracking-widest text-center">
                Browse Full Wedding Stories
              </span>

              <button
                onClick={onNextStory}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2 rounded-full glass-mild text-[#EBDEBE] hover:bg-[#BD9C7A] hover:text-[#2C251E] border border-[#BD9C7A]/40 transition-all font-10 font-bold uppercase tracking-wider text-xs cursor-pointer shadow-md"
                title="Go to next wedding story album"
              >
                <span>Next Wedding →</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="p-4 sm:p-6 rounded-2xl glass-mild-card-dark border border-[#BD9C7A]/30 text-center space-y-2.5 shadow-xl">
            <Heart className="w-5 h-5 text-[#BD9C7A] mx-auto" />
            <h3 className="font-4 text-[#F3F0DD] text-base sm:text-lg font-light">
              Capture Your Own Timeless Celebration
            </h3>
            <p className="font-8 text-[#EBDEBE]/80 max-w-md mx-auto font-light text-xs sm:text-sm leading-relaxed">
              Reserve your wedding dates with our premier photography & cinema crew.
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenEnquiry();
              }}
              className="px-6 py-2.5 rounded-full bg-[#BD9C7A] text-[#2C251E] font-bold font-10 tracking-[0.16em] uppercase hover:bg-[#A38362] transition-all shadow-xl hover:scale-105 cursor-pointer text-xs sm:text-sm"
            >
              Request Date Availability
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
