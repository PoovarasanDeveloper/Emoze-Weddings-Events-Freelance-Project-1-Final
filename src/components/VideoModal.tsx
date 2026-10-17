import React, { useState, useEffect } from 'react';
import { X, Sparkles, Film, Play, MapPin, Clock, CheckCircle2, ExternalLink } from 'lucide-react';
import { FILMS } from '../data/weddingData';
import { FilmItem } from '../types';
import { getEmbedVideoUrl, useBatchYouTubeDurations, useYouTubeDuration, getYouTubeThumbnail } from '../utils/videoUtils';

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  title: string;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  videoUrl,
  title,
  onClose,
}) => {
  const [activeUrl, setActiveUrl] = useState(videoUrl);
  const [activeTitle, setActiveTitle] = useState(title);

  const calculatedDurations = useBatchYouTubeDurations(FILMS);
  const activeCalculatedDuration = useYouTubeDuration(activeUrl);

  useEffect(() => {
    setActiveUrl(videoUrl);
    setActiveTitle(title);
  }, [videoUrl, title]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen || !activeUrl) return null;

  const currentFilm = FILMS.find((f) => f.videoUrl === activeUrl) || {
    id: 'custom',
    title: activeTitle,
    couple: 'Celebration Couple',
    location: 'Tamilnadu & South India',
    duration: 'Cinematic Film',
    thumbnail: '',
    videoUrl: activeUrl,
    description: 'A poetic wedding cinema capturing genuine emotion, laughter, and timeless celebrations.',
  };

  const currentDuration = activeCalculatedDuration || calculatedDurations[currentFilm.id] || currentFilm.duration || 'Cinematic Film';

  const handleSelectFilm = (film: FilmItem) => {
    setActiveUrl(film.videoUrl);
    setActiveTitle(film.title);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/80 backdrop-blur-md transition-all">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col glass-mild-card-dark rounded-3xl overflow-hidden shadow-2xl border border-[#BD9C7A]/40 animate-scale-up text-[#F3F0DD]">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#BD9C7A]/20 glass-mild-dark shrink-0">
          <div className="flex items-center space-x-2.5 min-w-0 pr-3">
            <Film className="w-4 h-4 sm:w-5 sm:h-5 text-[#BD9C7A] shrink-0" />
            <div className="min-w-0">
              <h3 className="font-6 text-sm sm:text-base md:text-lg text-[#F3F0DD] truncate">
                {currentFilm.title}
              </h3>
              <p className="font-10 text-[#BD9C7A] text-[10px] sm:text-xs tracking-wider uppercase">
                {currentFilm.couple} • {currentFilm.location}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full glass-mild-btn text-[#EBDEBE] hover:text-[#BD9C7A] hover:bg-[#BD9C7A]/20 transition-all cursor-pointer shrink-0"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 no-scrollbar">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-[#BD9C7A]/30 shadow-2xl">
            <iframe
              src={getEmbedVideoUrl(activeUrl, true)}
              title={currentFilm.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="p-4 sm:p-5 rounded-2xl glass-mild-dark border border-[#BD9C7A]/20 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-4 text-base sm:text-lg text-[#F3F0DD]">
                {currentFilm.title}
              </h4>
              <div className="flex items-center space-x-3 text-xs text-[#EBDEBE]/80">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-[#BD9C7A]" />
                  <span>{currentFilm.location}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-[#BD9C7A]" />
                  <span>{currentDuration}</span>
                </span>
                {activeUrl && (
                  <a
                    href={activeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-[#BD9C7A] hover:underline"
                    title="Watch directly on YouTube"
                  >
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
            <p className="font-8 text-xs sm:text-sm text-[#EBDEBE]/80 font-light leading-relaxed">
              {currentFilm.description}
            </p>
          </div>
          <div className="space-y-3.5">
            <div className="flex items-center justify-between pb-1 border-b border-[#BD9C7A]/20">
              <div className="flex items-center space-x-2">
                <Film className="w-4 h-4 text-[#BD9C7A]" />
                <h4 className="font-6 text-[#F3F0DD] text-sm sm:text-base">
                  More Wedding Films ({FILMS.length})
                </h4>
              </div>
              <span className="font-10 text-[#EBDEBE]/70 text-[10px] sm:text-xs">
                Click film to play in player above
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {FILMS.map((film) => {
                const isCurrent = film.videoUrl === activeUrl;
                const filmDuration = calculatedDurations[film.id] || film.duration || 'Cinematic Film';
                const filmThumb = film.thumbnail || getYouTubeThumbnail(film.videoUrl);

                return (
                  <div
                    key={film.id}
                    onClick={() => handleSelectFilm(film)}
                    className={`group relative rounded-xl sm:rounded-2xl overflow-hidden glass-mild-card-dark cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                      isCurrent
                        ? 'ring-2 ring-[#BD9C7A] ring-offset-2 ring-offset-[#2C251E] shadow-xl'
                        : 'border border-[#BD9C7A]/25 hover:border-[#BD9C7A] hover:scale-[1.01]'
                    }`}
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                      <img
                        src={filmThumb}
                        alt={film.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const ytFallback = getYouTubeThumbnail(film.videoUrl);
                          if (ytFallback && e.currentTarget.src !== ytFallback) {
                            e.currentTarget.src = ytFallback;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/70 text-[#EBDEBE] font-10 text-[9px] flex items-center space-x-1">
                        <Clock className="w-2.5 h-2.5 text-[#BD9C7A]" />
                        <span>{filmDuration}</span>
                      </div>

                      {isCurrent ? (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#BD9C7A] text-[#2C251E] font-10 font-bold uppercase tracking-wider text-[9px] flex items-center space-x-1 shadow-md">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Now Playing</span>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-9 h-9 rounded-full bg-[#BD9C7A] text-[#2C251E] flex items-center justify-center shadow-lg">
                            <Play className="w-4 h-4 fill-current translate-x-0.5" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-3 space-y-1">
                      <h5 className="font-6 text-xs sm:text-sm text-[#F3F0DD] line-clamp-1 group-hover:text-[#BD9C7A] transition-colors">
                        {film.title}
                      </h5>
                      <p className="font-10 text-[10px] text-[#EBDEBE]/70 truncate">
                        {film.couple}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
        <div className="px-4 sm:px-6 py-3 glass-mild-dark flex items-center justify-between font-10 text-[#EBDEBE]/70 border-t border-[#BD9C7A]/20 shrink-0 text-xs">
          <span className="flex items-center space-x-1.5 text-[#BD9C7A] uppercase tracking-widest text-[10px] sm:text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#BD9C7A]" />
            <span>Cinematic 4K Wedding Storytelling</span>
          </span>
          <button
            onClick={onClose}
            className="font-10 uppercase tracking-wider hover:text-[#F3F0DD] transition-colors cursor-pointer text-[10px] sm:text-xs"
          >
            Close Player
          </button>
        </div>

      </div>
    </div>
  );
};

