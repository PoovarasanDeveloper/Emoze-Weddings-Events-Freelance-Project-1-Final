import React from 'react';
import { FILMS } from '../data/weddingData';
import { Play, Film, Clock, MapPin, Sparkles } from 'lucide-react';
import { useBatchYouTubeDurations, getYouTubeThumbnail } from '../utils/videoUtils';

interface WeddingFilmsProps {
  onPlayVideo: (videoUrl: string, title: string) => void;
}

export const WeddingFilms: React.FC<WeddingFilmsProps> = ({ onPlayVideo }) => {
  const calculatedDurations = useBatchYouTubeDurations(FILMS);

  return (
    <section id="films" className="py-20 sm:py-28 bg-[#2C251E] text-[#F3F0DD] relative scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl 2xl:max-w-[1700px] 3xl:max-w-[2200px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-mild-pill-dark text-[#EBDEBE] font-10 tracking-[0.25em] uppercase font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#BD9C7A]" />
            <span>Cinematic Cinema</span>
          </div>
          <h2 className="font-2 font-light text-[#F3F0DD] tracking-wide">
            Wedding Films
          </h2>
          <p className="font-7 text-[#EBDEBE]/80 font-light leading-relaxed">
            Story-based wedding cinema crafted with soul, original soundtracks, and high-definition visual poetry.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FILMS.map((film) => {
            const filmDuration = calculatedDurations[film.id] || film.duration || 'Cinematic Film';
            const thumbnailSrc = film.thumbnail || getYouTubeThumbnail(film.videoUrl);

            return (
              <div
                key={film.id}
                onClick={() => onPlayVideo(film.videoUrl, film.title)}
                className="group relative rounded-3xl overflow-hidden glass-mild-card-dark border border-[#BD9C7A]/30 shadow-2xl transition-all duration-500 hover:border-[#BD9C7A] hover:shadow-2xl cursor-pointer flex flex-col justify-between"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#1D1814]">
                  <img
                    src={thumbnailSrc}
                    alt={film.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const ytThumb = getYouTubeThumbnail(film.videoUrl);
                      if (ytThumb && e.currentTarget.src !== ytThumb) {
                        e.currentTarget.src = ytThumb;
                      }
                    }}
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-[#BD9C7A] text-[#2C251E] flex items-center justify-center shadow-2xl group-hover:scale-110 active:scale-95 transition-transform">
                      <Play className="w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6 fill-current translate-x-0.5 text-[#2C251E]" />
                    </div>
                  </div>

                  {/* Auto-Calculated Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full glass-mild-dark border border-[#BD9C7A]/30 font-10 text-[#EBDEBE] flex items-center space-x-1.5 shadow-lg">
                    <Clock className="w-3 h-3 text-[#BD9C7A]" />
                    <span className="font-medium tracking-wide">{filmDuration}</span>
                  </div>
                </div>

              {/* Film Details */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 font-10 text-[#BD9C7A] uppercase tracking-wider mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#BD9C7A]" />
                    <span>{film.location}</span>
                  </div>
                  <h3 className="font-6 text-[#F3F0DD] group-hover:text-[#BD9C7A] transition-colors">
                    {film.title}
                  </h3>
                  <p className="font-10 text-[#B8C19C] font-medium tracking-wide mt-1">
                    Couple: {film.couple}
                  </p>
                </div>

                <p className="font-9 text-[#EBDEBE]/70 font-light line-clamp-2 leading-relaxed pt-3 border-t border-[#BD9C7A]/20">
                  {film.description}
                </p>
              </div>

            </div>
          );
        })}
        </div>

      </div>
    </section>
  );
};

