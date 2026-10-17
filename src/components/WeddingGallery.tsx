import React, { useState, useRef } from 'react';
import { CategoryType, WeddingGalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/weddingData';
import { Sparkles, Play, Eye, Maximize2, MapPin, Film, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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
    <section id="gallery" className="py-20 sm:py-28 bg-[#F3F0DD] text-[#2C251E] relative overflow-hidden scroll-mt-20 md:scroll-mt-24">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#BD9C7A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#B8C19C]/15 rounded-full blur-3xl pointer-events-none" />

     <div className="max-w-7xl 2xl:max-w-[1700px] 3xl:max-w-[2200px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-mild-pill text-[#546135] font-10 tracking-[0.25em] uppercase font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#546135]" />
            <span>Curated Portfolio</span>
          </div>
          <h2 className="text-5xl font-2 font-light text-[#2C251E] tracking-wide">
            Wedding Gallery
          </h2>
          <p className="font-7 text-[#615546] font-light leading-relaxed">
            Every couple has a unique story to tell. Experience our signature candid storytelling as you scroll through our timeless wedding portfolios.
          </p>
        </div>
        <div className="flex items-center justify-center w-full pb-8 sm:pb-12 border-b border-[#EBDEBE] mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 w-full max-w-5xl mx-auto">
            <button
              onClick={() => scrollCategories('left')}
              className="flex p-1.5 sm:p-2 rounded-full glass-mild text-[#5E5344] hover:bg-[#BD9C7A] hover:text-[#2C251E] border border-[#BD9C7A]/30 transition-all cursor-pointer shrink-0 shadow-sm active:scale-95"
              title="Scroll categories left"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <div
              ref={categoryScrollRef}
              className="overflow-x-auto py-2 sm:py-3 px-1 scroll-smooth no-scrollbar max-w-full"
            >
              <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 p-1 min-w-max mx-auto">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-10 tracking-[0.14em] sm:tracking-[0.16em] uppercase font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#BD9C7A] text-[#2C251E] shadow-md ring-2 ring-[#BD9C7A] ring-offset-2 ring-offset-[#F3F0DD]'
                          : 'glass-mild text-[#5E5344] hover:bg-[#E2E7BD] hover:text-[#2C251E] border border-[#BD9C7A]/30'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => scrollCategories('right')}
              className="flex p-1.5 sm:p-2 rounded-full glass-mild text-[#5E5344] hover:bg-[#BD9C7A] hover:text-[#2C251E] border border-[#BD9C7A]/30 transition-all cursor-pointer shrink-0 shadow-sm active:scale-95"
              title="Scroll categories right"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

        </div>
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 glass-mild-card border border-[#EBDEBE] rounded-2xl">
            <p className="font-7 text-[#615546]">No stories found matching your filter.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#BD9C7A] text-[#2C251E] font-10 uppercase tracking-wider font-semibold cursor-pointer shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 sm:gap-10 2xl:gap-12 items-stretch">
             {filteredItems.map((item) => {
              const activeImgIdx = cardPhotoIndices[item.id] || 0;
              const currentCardImg =
                item.images && item.images.length > 0
                  ? item.images[activeImgIdx] || item.coverImage
                  : item.coverImage;

              return (
                <div
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden glass-mild-card border border-[#EBDEBE] shadow-lg transition-all duration-500 hover:border-[#BD9C7A] hover:shadow-2xl cursor-pointer flex flex-col h-full justify-between"
                >
                  <div
                    className="relative aspect-[4/3] overflow-hidden bg-[#EBDEBE]"
                    onClick={() => onSelectItem(item)}
                  >
                    <img
                      src={currentCardImg}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C251E]/90 via-[#2C251E]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                    <div className="absolute top-3 xs:top-4 left-3 xs:left-4 right-3 xs:right-4 flex items-center justify-between gap-2 z-10 pointer-events-none">
                      <span className="px-2.5 xs:px-3 py-0.5 xs:py-1 rounded-full font-10 font-semibold tracking-[0.12em] xs:tracking-[0.16em] sm:tracking-[0.2em] uppercase glass-mild-dark text-[#EBDEBE]/90 border border-[#BD9C7A]/30 text-[10px] xs:text-[11px] sm:text-xs whitespace-nowrap shadow-md inline-flex items-center pointer-events-auto">
                        {item.categoryLabel}
                      </span>

                      {item.hasVideo && (
                        <span className="p-1.5 xs:p-2 rounded-full bg-[#2c251ed1] text-[#EBDEBE]/90 shadow-md shrink-0 flex items-center justify-center pointer-events-auto" title="Has Film">
                          <Film className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
   
                        </span>
                      )}
                    </div>
                    {item.images && item.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => handleCardPrevPhoto(e, item.id, item.images.length)}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-[#BD9C7A] text-[#F3F0DD] hover:text-[#2C251E] flex items-center justify-center z-30 transition-all opacity-0 group-hover:opacity-100 shadow-md cursor-pointer border border-[#BD9C7A]/40"
                          title="Previous photo in this wedding"
                          aria-label="Previous photo"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleCardNextPhoto(e, item.id, item.images.length)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/70 hover:bg-[#BD9C7A] text-[#F3F0DD] hover:text-[#2C251E] flex items-center justify-center z-30 transition-all opacity-0 group-hover:opacity-100 shadow-md cursor-pointer border border-[#BD9C7A]/40"
                          title="Next photo in this wedding"
                          aria-label="Next photo"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-3 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      {item.hasVideo && item.videoUrl && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlayVideo(item.videoUrl!, item.title);
                          }}
                                                   className="px-3 xs:px-4 py-2 xs:py-2.5 rounded-full bg-[#BD9C7A] text-[#2C251E] hover:bg-[#A38362] cursor-pointer flex items-center space-x-1.5 xs:space-x-2 shadow-lg transition-transform hover:scale-105 active:scale-95 text-xs sm:text-sm font-10 font-bold uppercase tracking-wider shrink-0"
                          title="Play Film"
                        >
                          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current translate-x-0.5" />
                          <span className="font-10 font-bold uppercase tracking-wider pr-0.5">
   Film
                          </span>
                        </button>
                      )}

                      <button
                        onClick={() => onSelectItem(item)}
                                                className="px-3 xs:px-4 py-2 xs:py-2.5 rounded-full bg-[#FAF7ED] text-[#2C251E] hover:bg-[#EBDEBE] cursor-pointer flex items-center space-x-1.5 xs:space-x-2 shadow-lg transition-transform hover:scale-105 active:scale-95 text-xs sm:text-sm font-10 font-bold uppercase tracking-wider shrink-0"
                        title="View Gallery"
                      >
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8C7152]" />
                        <span className="font-10 font-bold uppercase tracking-wider pr-0.5">
                          Photos ({item.images.length})
                        </span>
                      </button>
                    </div>
                    <div className="absolute bottom-4 right-4 z-10 px-2.5 py-1 rounded-md glass-mild-dark font-10 text-[#EBDEBE] text-[11px]">
                      Photo {activeImgIdx + 1} of {item.images.length}
                    </div>
                  </div>
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between" onClick={() => onSelectItem(item)}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 font-10 text-[#8C7152] uppercase tracking-wider">
                        <MapPin className="w-3.5 h-3.5 text-[#BD9C7A]" />
                        <span>{item.location}</span>
                        {item.storyDate && <span>• {item.storyDate}</span>}
                      </div>

                      <h3 className="font-6 font-normal text-[#2C251E] group-hover:text-[#8C7152] transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="font-9 text-[#615546] font-light line-clamp-2 leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 flex items-center justify-between font-10 text-[#8C7152] font-semibold tracking-widest uppercase border-t border-[#EBDEBE]">
                      <span className="group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1.5">
                        <span>Read Full Story</span>
                        <span>→</span>
                      </span>
                      <Heart className="w-3.5 h-3.5 text-[#BD9C7A] group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
        <div className="mt-14 pt-8 border-t border-[#EBDEBE] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-10 text-xs uppercase tracking-widest text-[#615546]">
            Showing <span className="font-bold text-[#2C251E]">{filteredItems.length}</span> curated wedding {filteredItems.length === 1 ? 'story' : 'stories'}
          </p>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                const currentIndex = categories.findIndex((c) => c.id === selectedCategory);
                const prevIndex = (currentIndex - 1 + categories.length) % categories.length;
                setSelectedCategory(categories[prevIndex].id);
              }}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full glass-mild text-[#5E5344] hover:bg-[#BD9C7A] hover:text-[#2C251E] border border-[#BD9C7A]/30 transition-all font-10 font-bold uppercase tracking-wider text-xs cursor-pointer shadow-sm"
              title="Previous Category"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev Category</span>
            </button>

            <button
              onClick={() => {
                const currentIndex = categories.findIndex((c) => c.id === selectedCategory);
                const nextIndex = (currentIndex + 1) % categories.length;
                setSelectedCategory(categories[nextIndex].id);
              }}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full glass-mild text-[#5E5344] hover:bg-[#BD9C7A] hover:text-[#2C251E] border border-[#BD9C7A]/30 transition-all font-10 font-bold uppercase tracking-wider text-xs cursor-pointer shadow-sm"
              title="Next Category"
            >
              <span>Next Category</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
