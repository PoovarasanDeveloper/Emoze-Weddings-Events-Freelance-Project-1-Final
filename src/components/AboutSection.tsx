import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { ABOUT_DATA } from '../data/weddingData';
import { AboutSectionData } from '../types';

const FALLBACK_IMAGE_1 = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800';
const FALLBACK_IMAGE_2 = 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800';

interface AboutSectionProps {
  onOpenEnquiry: () => void;
  data?: AboutSectionData;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenEnquiry, data = ABOUT_DATA }) => {
  const content = data || ABOUT_DATA;

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#F3F0DD] text-[#2C251E] relative scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl 2xl:max-w-[1700px] 3xl:max-w-[2200px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Image Mosaic */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#EBDEBE] shadow-xl border border-[#EBDEBE]">
                  <img
                    src={content.image1 || FALLBACK_IMAGE_1}
                    alt={content.image1Alt || "Wedding story"}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = FALLBACK_IMAGE_1;
                      }
                    }}
                  />
                </div>
                <div className="w-full max-w-full min-w-0 p-3.5 xs:p-4 sm:p-5 md:p-6 rounded-2xl glass-mild-card border border-[#B8C19C] text-center flex flex-col justify-center items-center shadow-sm overflow-hidden box-border">
                  <span className="font-4 text-[#546135] font-bold block text-2xl xs:text-3xl sm:text-4xl 2xl:text-5xl leading-none mb-1.5 break-words max-w-full">
                    {content.founder || 'Karthi Subramani'}
                  </span>
                  <span className="font-10 uppercase tracking-wider text-[gray] font-semibold block text-[11px] xs:text-xs sm:text-sm leading-snug whitespace-normal break-words max-w-full text-center">
                    {content.founderLabel || 'Founder'}
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="w-full max-w-full min-w-0 p-3.5 xs:p-4 sm:p-5 md:p-6 rounded-2xl glass-mild border border-[#BD9C7A]/40 text-center flex flex-col justify-center items-center shadow-sm overflow-hidden box-border">
                  <span className="font-4 text-[#546135] font-bold block text-2xl xs:text-3xl sm:text-4xl 2xl:text-5xl leading-none mb-1.5 break-words max-w-full">
                    {content.Cofounder || 'Irfan'}
                  </span>
                  <span className="font-10 uppercase tracking-wider text-[gray] font-semibold block text-[11px] xs:text-xs sm:text-sm leading-snug whitespace-normal break-words max-w-full text-center">
                    {content.CofounderLabel || 'Co-founder'}
                  </span>
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#EBDEBE] shadow-xl border border-[#EBDEBE]">
                  <img
                    src={content.image2 || FALLBACK_IMAGE_2}
                    alt={content.image2Alt || "Wedding couple"}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = FALLBACK_IMAGE_2;
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-1.5 xs:space-x-2 px-3 xs:px-4 py-1 xs:py-1.5 rounded-full glass-mild-pill text-[#546135] font-10 tracking-[0.16em] sm:tracking-[0.22em] uppercase font-semibold text-[11px] xs:text-xs sm:text-sm max-w-full whitespace-normal break-words">
              <Sparkles className="w-3.5 h-3.5 text-[#546135] shrink-0" />
              <span>{content.badgeText || 'Emoze Weddings'}</span>
            </div>

            <h2 className="font-2 font-light text-[#2C251E] leading-tight">
              {content.heading || 'Lifetime Memories, Unfiltered Emotions & Timeless Art'}
            </h2>

            <p className="font-7 text-[#54483C] font-light leading-relaxed">
              {content.description1 || "Founded on the belief that every couple has an unrepeatable life story, Congratulations Weddings brings together South India's top candid photographers, cinematographers, and event storytellers."}
            </p>

            <p className="font-8 text-[gray] font-light leading-relaxed">
              {content.description2 || 'From traditional Kerala rituals to grand destination celebrations in Dubai, Kovalam, and Chennai, our team blends subtle, non-intrusive shooting techniques with high-end editorial color tones.'}
            </p>

            {/* Feature Bullet Highlights */}
            {content.highlights && content.highlights.length > 0 && (
              <div className="space-y-3 pt-2 font-9 text-[#2C251E]">
                {content.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-[#546135] shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={onOpenEnquiry}
                className="px-5 xs:px-6 sm:px-7 md:px-8 py-2.5 xs:py-3 sm:py-3.5 rounded-full bg-[#BD9C7A] text-[#2C251E] font-bold font-10 tracking-[0.14em] sm:tracking-[0.18em] uppercase text-xs xs:text-sm md:text-sm 2xl:text-base hover:bg-[#A38362] transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95 inline-flex items-center justify-center text-center"
              >
                {content.ctaButtonText || 'Tell Your Story With Us'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

