import React, { useState, useRef } from 'react';
import { CategoryType, WeddingGalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/weddingData';
import { Sparkles, Play, Eye, Maximize2, MapPin, Film, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import ornateBannerImg from '../assets/banner_ornate_transparent.png';

interface WeddingGalleryProps {
  onSelectItem: (item: WeddingGalleryItem) => void;
  onPlayVideo: (videoUrl: string, title: string) => void;
  searchQuery?: string;
}

export const WeddingGallery: React.FC<WeddingGalleryProps> = ({
  onSelectItem,
  onPlayVideo,
  searchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [cardPhotoIndices, setCardPhotoIndices] = useState<Record<string, number>>({});
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const categoryBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleCategoryNav = (direction: 'left' | 'right') => {
    const currentIndex = categories.findIndex((c) => c.id === selectedCategory);
    if (currentIndex === -1) return;

    const newIndex =
      direction === 'left'
        ? (currentIndex - 1 + categories.length) % categories.length
        : (currentIndex + 1) % categories.length;

    const nextCategory = categories[newIndex];
    setSelectedCategory(nextCategory.id);

    // Scroll selected category into view
    const targetBtn = categoryBtnRefs.current[nextCategory.id];
    if (targetBtn && categoryScrollRef.current) {
      targetBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const handleCardPrevPhoto = (e: React.MouseEvent, itemId: string, total: number) => {
    e.stopPropagation();
    setCardPhotoIndices((prev) => ({
      ...prev,
      [itemId]: ((prev[itemId] || 0) - 1 + total) % total,
    }));
  };

  const handleCardNextPhoto = (e: React.MouseEvent, itemId: string, total: number) => {
    e.stopPropagation();
    setCardPhotoIndices((prev) => ({
      ...prev,
      [itemId]: ((prev[itemId] || 0) + 1) % total,
    }));
  };

  // Filter items by category and search query
  const filteredItems = GALLERY_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All Stories' },
    { id: 'destination', label: 'Destination Weddings' },
    { id: 'christian', label: 'Christian Weddings' },
    { id: 'hindu', label: 'Hindu & Tamil' },
    { id: 'muslim', label: 'Nikah Ceremonies' },
    { id: 'pre-wedding', label: 'Pre-Wedding & Outdoor' },
  ];

  return (
    <section id="gallery" className="py-10 sm:py-12 lg:py-14 bg-[#F3F0DD] text-[#2C251E] relative overflow-hidden scroll-mt-16 md:scroll-mt-20">

      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#BD9C7A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#B8C19C]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[96%] sm:max-w-7xl 2xl:max-w-[1850px] 3xl:max-w-[2200px] mx-auto px-2 xs:px-2.5 sm:px-4 lg:px-6 2xl:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-2.5 mb-4 sm:mb-6 px-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-mild-pill text-[#546135] font-10 tracking-[0.22em] uppercase font-semibold text-[10px] sm:text-xs">
            <Sparkles className="w-3 h-3 text-[#546135]" />
            <span>Curated Portfolio</span>
          </div>
          <h2 className="font-2 font-light text-[#2C251E] tracking-wide text-2xl sm:text-3xl md:text-3.5xl">
            Wedding Gallery
          </h2>
          <p className="font-7 text-[#615546] font-light leading-relaxed text-xs sm:text-sm max-w-2xl mx-auto">
            Every couple has a unique story to tell. Experience our signature candid storytelling through our timeless wedding portfolios.
          </p>
        </div>

        <div className="flex items-center justify-center w-full pb-3 sm:pb-4 border-b border-[#EBDEBE] mb-4 sm:mb-5">
          
          <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 w-full max-w-5xl mx-auto">
            <button
              onClick={() => handleCategoryNav('left')}
              className="flex p-1.5 sm:p-2 rounded-full glass-mild text-[#5E5344] hover:bg-[#BD9C7A] hover:text-[#2C251E] border border-[#BD9C7A]/30 transition-all cursor-pointer shrink-0 shadow-sm active:scale-95"
              title="Previous category"
              aria-label="Previous category"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <div
              ref={categoryScrollRef}
              className="overflow-x-auto py-1.5 sm:py-2 px-1 scroll-smooth no-scrollbar max-w-full"
            >
              <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 p-1 min-w-max mx-auto">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      ref={(el) => {
                        categoryBtnRefs.current[cat.id] = el;
                      }}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        const targetBtn = categoryBtnRefs.current[cat.id];
                        if (targetBtn && categoryScrollRef.current) {
                          targetBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        }
                      }}
                      className={`relative font-10 tracking-[0.14em] sm:tracking-[0.16em] uppercase text-xs whitespace-nowrap cursor-pointer select-none h-10 inline-flex items-center justify-center border-0 border-none outline-none ring-0 focus:outline-none focus:ring-0 shadow-none bg-transparent transition-colors duration-150 ${
                        isActive
                          ? 'text-[#2C251E] font-bold px-6 sm:px-7'
                          : 'text-[#615546] font-medium hover:text-[#2C251E] hover:bg-[#BD9C7A]/10 px-4 sm:px-5 rounded-md'
                      }`}
                    >
                      {isActive && (
                        <img
                          src={ornateBannerImg}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0"
                        />
                      )}
                      <span className="relative z-10 pointer-events-none">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => handleCategoryNav('right')}
              className="flex p-1.5 sm:p-2 rounded-full glass-mild text-[#5E5344] hover:bg-[#BD9C7A] hover:text-[#2C251E] border border-[#BD9C7A]/30 transition-all cursor-pointer shrink-0 shadow-sm active:scale-95"
              title="Next category"
              aria-label="Next category"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16 glass-mild-card border border-[#EBDEBE] rounded-2xl">
            <p className="font-7 text-[#615546]">No stories found matching your filter.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 px-6 py-2 rounded-full bg-[#BD9C7A] text-[#2C251E] font-10 uppercase tracking-wider font-semibold cursor-pointer shadow-md text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-4.5 lg:gap-5.5 2xl:gap-6 items-stretch">
            {filteredItems.map((item) => {
              const activeImgIdx = cardPhotoIndices[item.id] || 0;
              const currentCardImg =
                item.images && item.images.length > 0
                  ? item.images[activeImgIdx] || item.coverImage
                  : item.coverImage;

              return (
                <div
                  key={item.id}
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden glass-mild-card border border-[#EBDEBE] shadow-md transition-all duration-500 hover:border-[#BD9C7A] hover:shadow-2xl cursor-pointer flex flex-col h-full justify-between"
                >
                  <div
                    className="relative aspect-[16/11] overflow-hidden bg-[#2C251E]/10"
                    onClick={() => onSelectItem(item)}
                  >
                    <img
                      src={currentCardImg}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                      loading="lazy"
                      decoding="async"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C251E]/80 via-transparent to-[#2C251E]/20 opacity-70 group-hover:opacity-90 transition-opacity" />

                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1.5 z-10 pointer-events-none">
                      <span className="px-2 py-0.5 rounded-full font-10 font-semibold tracking-[0.12em] uppercase glass-mild-dark text-[#EBDEBE]/95 border border-[#BD9C7A]/30 text-[8px] xs:text-[9px] sm:text-[10px] whitespace-nowrap shadow-md inline-flex items-center pointer-events-auto">
                        {item.categoryLabel}
                      </span>

                      {item.hasVideo && (
                        <span className="p-1 rounded-full bg-[#BD9C7A] text-[#2C251E] shadow-md shrink-0 flex items-center justify-center pointer-events-auto" title="Has Film">
                          <Film className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    {item.images && item.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => handleCardPrevPhoto(e, item.id, item.images.length)}
                          className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-black/75 hover:bg-[#BD9C7A] text-[#F3F0DD] hover:text-[#2C251E] flex items-center justify-center z-30 transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-md cursor-pointer border border-[#BD9C7A]/40"
                          title="Previous photo in this wedding"
                          aria-label="Previous photo"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleCardNextPhoto(e, item.id, item.images.length)}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-black/75 hover:bg-[#BD9C7A] text-[#F3F0DD] hover:text-[#2C251E] flex items-center justify-center z-30 transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-md cursor-pointer border border-[#BD9C7A]/40"
                          title="Next photo in this wedding"
                          aria-label="Next photo"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}

                    <div className="absolute inset-x-0 bottom-1.5 sm:bottom-2 flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 z-20 pointer-events-auto opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0">
                      {item.hasVideo && item.videoUrl && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlayVideo(item.videoUrl!, item.title);
                          }}
                          className="px-2 xs:px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#BD9C7A] text-[#2C251E] hover:bg-[#A38362] active:scale-95 cursor-pointer flex items-center space-x-1 shadow-xl transition-all text-[9px] xs:text-[10px] font-10 font-bold uppercase tracking-wider shrink-0 border border-[#EBDEBE]/40"
                          title="Play Wedding Film"
                          aria-label="Play Film"
                        >
                          <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current translate-x-0.5" />
                          <span className="font-10 font-bold uppercase tracking-wider">
                            Film
                          </span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectItem(item);
                        }}
                        className="px-2 xs:px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#FAF7ED]/95 hover:bg-[#FAF7ED] text-[#2C251E] active:scale-95 cursor-pointer flex items-center space-x-1 shadow-xl transition-all text-[9px] xs:text-[10px] font-10 font-bold uppercase tracking-wider shrink-0 border border-[#BD9C7A]/40 backdrop-blur-sm"
                        title="View Full Story & Photos"
                        aria-label="View Photos"
                      >
                        <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#8C7152]" />
                        <span className="font-10 font-bold uppercase tracking-wider">
                          Photos ({item.images.length})
                        </span>
                      </button>
                    </div>

                    <div className="absolute bottom-2 right-2 sm:bottom-auto sm:top-2 sm:right-2 z-10 px-1.5 py-0.5 rounded-md glass-mild-dark font-10 text-[#EBDEBE] text-[8px] xs:text-[9px] pointer-events-none hidden sm:block">
                      Photo {activeImgIdx + 1} of {item.images.length}
                    </div>
                  </div>

                  <div className="p-2.5 xs:p-3 sm:p-3.5 lg:p-4 space-y-1 sm:space-y-1.5 flex-1 flex flex-col justify-between" onClick={() => onSelectItem(item)}>
                    <div className="space-y-0.5 sm:space-y-1">
                      <div className="flex items-center space-x-1 sm:space-x-1.5 font-10 text-[#8C7152] uppercase tracking-wider text-[9px] xs:text-[10px] sm:text-xs">
                        <MapPin className="w-3 h-3 text-[#BD9C7A] shrink-0" />
                        <span className="truncate">{item.location}</span>
                        {item.storyDate && <span className="opacity-70">• {item.storyDate}</span>}
                      </div>

                      <h3 className="font-6 text-xs xs:text-sm sm:text-base lg:text-[17px] font-normal text-[#2C251E] group-hover:text-[#8C7152] transition-colors leading-snug line-clamp-1">
                        {item.title}
                      </h3>

                      <p className="font-9 text-[10px] xs:text-[11px] sm:text-xs lg:text-[13px] text-[#615546] font-light line-clamp-1 leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="pt-1.5 sm:pt-2 flex items-center justify-between font-10 text-[#8C7152] font-semibold tracking-widest uppercase border-t border-[#EBDEBE]/70 text-[9px] xs:text-[10px] sm:text-xs">
                      <span className="group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1">
                        <span>Read Full Story</span>
                        <span>→</span>
                      </span>
                      <Heart className="w-3 h-3 text-[#BD9C7A] group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
