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

  // Reset when item changes
  useEffect(() => {
    setActiveImageIndex(0);
    setIsVideoActive(false);
  }, [item?.id]);

  // Handle ESC key to close
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/80 backdrop-blur-md transition-all">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Luxury Modal Dialog - Framed, responsive, NOT occupying full edge-to-edge */}
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden glass-mild-card-dark border border-[#BD9C7A]/40 shadow-2xl animate-scale-up text-[#F3F0DD]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#BD9C7A]/25 glass-mild-dark shrink-0">
          <div className="flex items-center space-x-2.5 min-w-0 pr-3">
            <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-[#BD9C7A] shrink-0" />
            <div className="min-w-0">
              <h3 className="font-6 text-sm sm:text-base md:text-lg text-[#F3F0DD] truncate">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 font-10 text-[#EBDEBE]/70 text-[10px] sm:text-xs">
                <span>{item.categoryLabel}</span>
                <span>•</span>
                <span>{item.location}</span>
                {item.storyDate && (
                  <>
                    <span>•</span>
                    <span>{item.storyDate}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {onPrevStory && onNextStory && (
              <div className="hidden sm:flex items-center space-x-1 p-1 rounded-full glass-mild-dark border border-[#BD9C7A]/30">
                <button
                  onClick={onPrevStory}
                  className="px-2.5 py-1 rounded-full text-xs font-10 uppercase tracking-wider text-[#EBDEBE] hover:text-[#2C251E] hover:bg-[#BD9C7A] transition-all flex items-center space-x-1 cursor-pointer"
                  title="Previous Wedding Story"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev Story</span>
                </button>
                <span className="text-[#BD9C7A]/40 text-xs">•</span>
                <button
                  onClick={onNextStory}
                  className="px-2.5 py-1 rounded-full text-xs font-10 uppercase tracking-wider text-[#EBDEBE] hover:text-[#2C251E] hover:bg-[#BD9C7A] transition-all flex items-center space-x-1 cursor-pointer"
                  title="Next Wedding Story"
                >
                  <span>Next Story</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {item.hasVideo && item.videoUrl && (
              <button
                onClick={() => setIsVideoActive(!isVideoActive)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-10 font-bold uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer shadow-md transition-all ${
                  isVideoActive
                    ? 'bg-[#E2E7BD] text-[#2C251E]'
                    : 'bg-[#BD9C7A] text-[#2C251E] hover:bg-[#A38362]'
                }`}
              >
                {isVideoActive ? (
                  <>
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline">View Photos</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Film</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full glass-mild-btn text-[#EBDEBE] hover:text-[#BD9C7A] hover:bg-[#BD9C7A]/20 transition-all cursor-pointer"
              aria-label="Close story"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 no-scrollbar">
          
          {/* Featured Media Showcase (Cover / Active Image / Video prominently displayed) */}
          <div ref={topFeaturedRef} className="space-y-2">
            <div className="relative w-full rounded-2xl overflow-hidden bg-black/60 border border-[#BD9C7A]/30 shadow-2xl aspect-[16/10] sm:aspect-[16/9] max-h-[460px] flex items-center justify-center">
              
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

                  {/* Gradient vignettes */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Overlay Badges */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-2 z-10">
                    <span className="px-2.5 xs:px-3 py-1 rounded-full glass-mild-dark text-[#EBDEBE]/90 border border-[#BD9C7A]/30 font-10 uppercase tracking-[0.14em] sm:tracking-widest font-semibold text-[10px] sm:text-xs shadow-md whitespace-nowrap inline-flex items-center">
                      {item.categoryLabel}
                    </span>
                    <span className="px-3 py-1 rounded-full glass-mild-dark text-[#EBDEBE] border border-[#BD9C7A]/40 font-10 tracking-wider text-[10px] sm:text-xs">
                      Photo {activeImageIndex + 1} of {allImages.length}
                    </span>
                  </div>

                  {/* Prev / Next navigation arrows - High visibility pills */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-black/75 hover:bg-[#BD9C7A] text-[#F3F0DD] hover:text-[#2C251E] transition-all cursor-pointer shadow-2xl border border-[#BD9C7A]/50 flex items-center space-x-1.5 group z-20"
                        title="Previous photo (or press Left Arrow ←)"
                      >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                        <span className="hidden sm:inline font-10 font-bold uppercase tracking-wider text-xs">Prev</span>
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-black/75 hover:bg-[#BD9C7A] text-[#F3F0DD] hover:text-[#2C251E] transition-all cursor-pointer shadow-2xl border border-[#BD9C7A]/50 flex items-center space-x-1.5 group z-20"
                        title="Next photo (or press Right Arrow →)"
                      >
                        <span className="hidden sm:inline font-10 font-bold uppercase tracking-wider text-xs">Next</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </>
                  )}

                  {/* Bottom Caption Bar */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between text-[#F3F0DD] z-10">
                    <div className="flex items-center space-x-2 text-xs sm:text-sm font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#BD9C7A]" />
                      <span>{item.location}</span>
                    </div>
                    {item.hasVideo && item.videoUrl && (
                      <button
                        onClick={() => setIsVideoActive(true)}
                        className="px-3 py-1 rounded-full glass-mild-pill text-[#2C251E] font-10 uppercase tracking-wider font-semibold text-[10px] flex items-center space-x-1 cursor-pointer hover:bg-[#BD9C7A]"
                      >
                        <Film className="w-3 h-3" />
                        <span>Play Video</span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Dedicated Photo Navigation Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl glass-mild-dark border border-[#BD9C7A]/25">
              <button
                onClick={handlePrevImage}
                disabled={allImages.length <= 1}
                className="flex items-center space-x-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#2C251E] text-[#F3F0DD] hover:bg-[#BD9C7A] hover:text-[#2C251E] border border-[#BD9C7A]/40 transition-all font-10 font-bold uppercase tracking-wider text-xs sm:text-sm cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                title="Go to previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>← Previous Photo</span>
              </button>

              <div className="flex items-center space-x-2 font-10 text-xs sm:text-sm">
                <span className="text-[#BD9C7A] font-bold">Photo {activeImageIndex + 1}</span>
                <span className="text-[#EBDEBE]/60">of</span>
                <span className="text-[#F3F0DD] font-semibold">{allImages.length}</span>
                <span className="hidden md:inline text-[#EBDEBE]/40">•</span>
                <span className="hidden md:inline text-[#EBDEBE]/60 text-[11px]">(Keyboard: ← / → keys)</span>
              </div>

              <button
                onClick={handleNextImage}
                disabled={allImages.length <= 1}
                className="flex items-center space-x-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#2C251E] text-[#F3F0DD] hover:bg-[#BD9C7A] hover:text-[#2C251E] border border-[#BD9C7A]/40 transition-all font-10 font-bold uppercase tracking-wider text-xs sm:text-sm cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                title="Go to next photo"
              >
                <span>Next Photo →</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Story Narrative & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 p-5 sm:p-6 rounded-2xl glass-mild-card-dark border border-[#BD9C7A]/25">
            <div className="md:col-span-2 space-y-2.5">
              <h2 className="font-4 text-[#BD9C7A] text-lg sm:text-xl md:text-2xl leading-snug">
                {item.subtitle}
              </h2>
              <p className="font-1 text-[#EBDEBE]/90 font-light text-sm sm:text-base leading-relaxed">
                {item.photographerNotes ||
                  'Captured with authentic emotion, delicate lighting, and timeless framing. Each photograph holds an indelible memory of love, heritage, and joy.'}
              </p>
            </div>

            {/* Vendors Box */}
            {item.vendors && (
              <div className="p-4 rounded-xl glass-mild border border-[#BD9C7A]/30 space-y-2.5 font-8 text-xs sm:text-sm">
                <h3 className="font-10 font-bold tracking-[0.2em] uppercase text-[#BD9C7A] pb-1.5 border-b border-[#BD9C7A]/20">
                  Creative Team & Vendors
                </h3>
                {item.vendors.venue && (
                  <div>
                    <span className="text-[#EBDEBE]/60 uppercase tracking-wider block text-[10px]">Venue</span>
                    <span className="text-[#F3F0DD] font-medium">{item.vendors.venue}</span>
                  </div>
                )}
                {item.vendors.decor && (
                  <div>
                    <span className="text-[#EBDEBE]/60 uppercase tracking-wider block text-[10px]">Decor</span>
                    <span className="text-[#F3F0DD] font-medium">{item.vendors.decor}</span>
                  </div>
                )}
                {item.vendors.outfits && (
                  <div>
                    <span className="text-[#EBDEBE]/60 uppercase tracking-wider block text-[10px]">Outfits</span>
                    <span className="text-[#F3F0DD] font-medium">{item.vendors.outfits}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Remaining Images Arranged Dynamically in Order */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#BD9C7A]/20">
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-4 h-4 text-[#BD9C7A]" />
                <h3 className="font-6 text-[#F3F0DD] text-base sm:text-lg">
                  Story Album Photos ({allImages.length})
                </h3>
              </div>
              <span className="font-10 text-[#EBDEBE]/70 text-[10px] sm:text-xs">
                Click photo to display in main view
              </span>
            </div>

            {/* Dynamic Responsive Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {allImages.map((img, idx) => {
                const isCurrent = idx === activeImageIndex && !isVideoActive;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectThumbnail(idx)}
                    className={`group relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden glass-mild-card-dark cursor-pointer transition-all duration-300 shadow-md ${
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

                    {/* Dark gradient */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                    {/* Active photo indicator badge */}
                    {isCurrent ? (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#BD9C7A] text-[#2C251E] font-10 font-bold uppercase tracking-wider text-[9px] sm:text-[10px] flex items-center space-x-1 shadow-md">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Viewing</span>
                      </div>
                    ) : (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-[#EBDEBE] font-10 text-[9px] sm:text-[10px]">
                        #{idx + 1}
                      </div>
                    )}

                    {/* Hover text */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="px-3 py-1 rounded-full bg-[#BD9C7A] text-[#2C251E] font-10 font-bold uppercase tracking-wider text-[10px] shadow-lg">
                        View Photo
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Previous / Next Wedding Story Switcher */}
          {onPrevStory && onNextStory && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl glass-mild-dark border border-[#BD9C7A]/30">
              <button
                onClick={onPrevStory}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full glass-mild text-[#EBDEBE] hover:bg-[#BD9C7A] hover:text-[#2C251E] border border-[#BD9C7A]/40 transition-all font-10 font-bold uppercase tracking-wider text-xs cursor-pointer shadow-md"
                title="Go to previous wedding story album"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>← Previous Couple Story</span>
              </button>

              <span className="font-10 text-[11px] sm:text-xs text-[#BD9C7A] uppercase tracking-widest text-center">
                Browse Full Wedding Stories
              </span>

              <button
                onClick={onNextStory}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full glass-mild text-[#EBDEBE] hover:bg-[#BD9C7A] hover:text-[#2C251E] border border-[#BD9C7A]/40 transition-all font-10 font-bold uppercase tracking-wider text-xs cursor-pointer shadow-md"
                title="Go to next wedding story album"
              >
                <span>Next Couple Story →</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Bottom Booking Callout */}
          <div className="p-6 sm:p-8 rounded-2xl glass-mild-card-dark border border-[#BD9C7A]/30 text-center space-y-3 shadow-xl">
            <Heart className="w-6 h-6 text-[#BD9C7A] mx-auto" />
            <h3 className="font-4 text-[#F3F0DD] text-lg sm:text-xl font-light">
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
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#BD9C7A] text-[#2C251E] font-bold font-10 tracking-[0.2em] uppercase hover:bg-[#A38362] transition-all shadow-xl hover:scale-105 cursor-pointer text-xs sm:text-sm"
            >
              Request Date Availability
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

