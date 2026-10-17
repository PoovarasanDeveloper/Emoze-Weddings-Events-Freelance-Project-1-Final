import React, { useState, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Sparkles, ArrowRight, Video } from 'lucide-react';
import { HERO_SLIDES } from '../data/weddingData';

interface HeroSlideshowProps {
  onPlayVideo: (videoUrl: string, title: string) => void;
  onExploreGallery: () => void;
  onOpenEnquiry: () => void;
}

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({
  onPlayVideo,
  onExploreGallery,
  onOpenEnquiry,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isAutoplay) {
      setProgress(0);
      return;
    }

    const DURATION = 6000;
    const INTERVAL = 50;
    const startTime = Date.now();

    setProgress(0);

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentPct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(currentPct);

      if (elapsed >= DURATION) {
        clearInterval(timer);
        setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
        setProgress(0);
      }
    }, INTERVAL);

    return () => clearInterval(timer);
  }, [currentIndex, isAutoplay]);

  const currentSlide = HERO_SLIDES[currentIndex];

  const handleSelectSlide = (idx: number) => {
    setProgress(0);
    setCurrentIndex(idx);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const toggleAutoplay = () => {
    setIsAutoplay((prev) => !prev);
    if (!isAutoplay) setProgress(0);
  };

  return (
    <section className="relative w-full h-[100dvh] max-h-[100dvh] overflow-hidden bg-black flex flex-col justify-between pt-16 sm:pt-20 lg:pt-22 2xl:pt-28 pb-2 xs:pb-3 sm:pb-4 2xl:pb-6">
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <img
            src={slide.bgImage}
            alt={slide.title}
            onError={(e) => {
              const target = e.currentTarget;
              const tried = target.dataset.tried || '0';
              if (tried === '0') {
                target.dataset.tried = '1';
                if (slide.bgImage.endsWith('.jpg')) {
                  target.src = slide.bgImage.replace(/\.jpg\$/, '.jpeg');
                  return;
                }
                if (slide.bgImage.endsWith('.jpeg')) {
                  target.src = slide.bgImage.replace(/\.jpeg\$/, '.jpg');
                  return;
                }
              }
              if (tried === '1') {
                target.dataset.tried = '2';
                const fallbacks = [
                  'https://unsplash.com',
                  'https://unsplash.com',
                  'https://unsplash.com',
                  'https://unsplash.com',
                ];
                target.src = fallbacks[idx % fallbacks.length];
              }
            }}
            /* 
              🛠️ CHANGES MADE HERE:
              1. `object-center` ah absolute inline custom dynamic values oda override panni irukken style string valiya.
              2. Slide model structure kula `position` optional entry configuration add panni call panrom.
            */
            className="w-full h-full object-cover transform scale-105 transition-transform duration-10000"
            style={{
              objectPosition: slide.position || 'center'
            }}
            loading={idx === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={idx === 0 ? 'high' : 'auto'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C251E] via-[#2C251E]/50 to-black/40" />
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
        </div>
      ))}

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center text-white">
        <div className="max-w-3xl space-y-4 md:space-y-6">
          <div className="max-w-4xl space-y-1.5 xs:space-y-2 md:space-y-2.5 flex flex-col items-start justify-center text-left">
            <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-2.5 py-0.5 xs:px-3 xs:py-1 sm:px-4 sm:py-1.5 2xl:px-6 2xl:py-2.5 rounded-full glass-card text-[#EBDEBE] font-10 tracking-[0.16em] sm:tracking-[0.25em] uppercase font-semibold text-[9px] xs:text-[10px] sm:text-xs md:text-sm 2xl:text-base">
              <Sparkles className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 2xl:w-5 2xl:h-5 text-[#B8C19C] shrink-0" />
              <span className="truncate">{currentSlide.category}</span>
            </div>

            <h1 className="font-0 text-white text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-normal leading-tight sm:leading-[1.15] tracking-normal drop-shadow-md max-w-xs xs:max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl whitespace-normal break-words text-left">
              {currentSlide.title}
            </h1>

            <p className="font-7 text-[#EBDEBE]/90 font-light text-[12px] xs:text-xs sm:text-sm md:text-base 2xl:text-2xl 3xl:text-3xl max-w-sm xs:max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-2xl 2xl:max-w-3xl leading-snug sm:leading-relaxed tracking-wide whitespace-normal break-words text-left">
              {currentSlide.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2 text-left">
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center gap-2 glass-mild-pill hover:bg-[#A38362] text-[#2C251E] font-medium px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer font-10 uppercase tracking-wider text-xs sm:text-sm"
            >
              Book Your Date
              <ArrowRight className="w-4 h-4" />
            </button>

            {currentSlide?.videoUrl && (
              <button
                onClick={() => onPlayVideo(currentSlide.videoUrl!, currentSlide.title)}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium px-5 py-3 rounded-full transition-all duration-300 cursor-pointer font-10 uppercase tracking-wider text-xs sm:text-sm"
              >
                <Video className="w-4 h-4" />
                Watch Film
              </button>
            )}

            <button
              onClick={onExploreGallery}
              className="inline-flex items-center gap-2 bg-neutral-900/40 hover:bg-neutral-900/60 backdrop-blur-md border border-white/10 text-white font-medium px-5 py-3 rounded-full transition-all duration-300 cursor-pointer font-10 uppercase tracking-wider text-xs sm:text-sm"
            >
              <span>Explore Gallery</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 2xl:w-4 2xl:h-4 text-white group-hover:translate-x-1.5 transition-transform shrink-0" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-30 w-full px-2 sm:px-4 md:px-6 2xl:px-12 flex justify-center shrink-0">
        <div className="w-[88%] xs:w-[84%] sm:w-[80%] max-w-[80%] mx-auto backdrop-blur-2xl bg-black/75 sm:bg-black/65 border border-[#BD9C7A]/40 rounded-full p-1 xs:p-1.5 sm:p-2 2xl:p-3.5 shadow-2xl flex items-center justify-between gap-1 sm:gap-3 md:gap-4 ring-1 ring-white/10 pointer-events-auto">
          <div className="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2 pl-1 sm:pl-2 shrink-0">
            <button
              onClick={toggleAutoplay}
              className={`w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 2xl:w-11 2xl:h-11 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
                isAutoplay
                  ? 'bg-[#BD9C7A]/20 border-[#BD9C7A] text-[#BD9C7A] hover:bg-[#BD9C7A] hover:text-[#2C251E]'
                  : 'bg-white/10 border-white/20 text-[#EBDEBE] hover:bg-white/20'
              }`}
              title={isAutoplay ? 'Pause slideshow' : 'Resume auto-play'}
              aria-label={isAutoplay ? 'Pause auto-play' : 'Resume auto-play'}
            >
              {isAutoplay ? (
                <Pause className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 2xl:w-4 2xl:h-4 fill-current" />
              ) : (
                <Play className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 2xl:w-4 2xl:h-4 fill-current translate-x-0.5" />
              )}
            </button>

            <div className="flex items-baseline space-x-0.5 sm:space-x-1 font-10">
              <span className="text-[#BD9C7A] font-bold text-[10px] xs:text-xs sm:text-base 2xl:text-xl">0{currentIndex + 1}</span>
              <span className="text-[#EBDEBE]/40 text-[9px] xs:text-[10px] sm:text-xs 2xl:text-base">/</span>
              <span className="text-[#EBDEBE]/60 text-[9px] xs:text-[10px] sm:text-xs 2xl:text-base">0{HERO_SLIDES.length}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 flex-1 overflow-x-auto no-scrollbar py-0.5 px-0.5">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleSelectSlide(idx)}
                  className={`group relative transition-all duration-300 ease-out cursor-pointer flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'w-7 h-7 xs:w-8 xs:h-8 rounded-full md:w-auto md:h-auto md:rounded-full bg-[#BD9C7A]/20 md:bg-[#BD9C7A] text-[#BD9C7A] md:text-[#2C251E] md:px-3.5 md:py-1.5 2xl:px-5 2xl:py-2.5 shadow-lg'
                      : 'w-7 h-7 xs:w-8 xs:h-8 rounded-full md:w-auto md:h-auto md:rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#BD9C7A]/50 text-[#EBDEBE]/80 hover:text-white md:px-3 md:py-1.5'
                  }`}
                  title={slide.title}
                >
                  {isActive && (
                    <svg
                      className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none md:hidden"
                      viewBox="0 0 36 36"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="none"
                        stroke="rgba(189,156,122,0.25)"
                        strokeWidth="2.5"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="none"
                        stroke="#BD9C7A"
                        strokeWidth="2.5"
                        strokeDasharray={94.25}
                        strokeDashoffset={94.25 - (94.25 * progress) / 100}
                        strokeLinecap="round"
                        className="transition-[stroke-dashoffset] duration-75 ease-linear"
                      />
                    </svg>
                  )}

                  <span
                    className={`font-10 tracking-wider font-bold text-[9px] xs:text-[10px] sm:text-xs md:text-xs lg:text-sm 2xl:text-base z-10 ${
                      isActive ? 'text-[#BD9C7A] md:text-[#2C251E]' : 'group-hover:text-[#BD9C7A] text-[#EBDEBE]/90'
                    }`}
                  >
                    0{idx + 1}
                  </span>

                  {isActive && (
                    <div className="hidden md:flex items-center">
                      <span className="font-10 font-semibold text-[11px] lg:text-xs 2xl:text-sm tracking-wider uppercase ml-1.5 mr-2 truncate max-w-[100px] lg:max-w-[150px] text-[#2C251E]">
                        {slide.category.split('&')[0]}
                      </span>
                      <div className="w-6 lg:w-9 h-1 bg-[#2C251E]/25 rounded-full overflow-hidden shrink-0">
                        <div
                          className="h-full bg-[#2C251E] rounded-full transition-all duration-75 ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-1 sm:space-x-1.5 pr-1 sm:pr-2 shrink-0">
            <button
              onClick={handlePrev}
              className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 2xl:w-11 2xl:h-11 rounded-full bg-white/5 hover:bg-[#BD9C7A] text-[#EBDEBE] hover:text-[#2C251E] border border-[#BD9C7A]/30 flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
              aria-label="Previous Slide"
              title="Previous Slide"
            >
              <ChevronLeft className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 2xl:w-11 2xl:h-11 rounded-full bg-white/5 hover:bg-[#BD9C7A] text-[#EBDEBE] hover:text-[#2C251E] border border-[#BD9C7A]/30 flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
              aria-label="Next Slide"
              title="Next Slide"
            >
              <ChevronRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
