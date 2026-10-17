import React, { useEffect } from 'react';
import { X, Phone, Mail, MapPin, Instagram, Youtube, Facebook, ArrowRight, Heart } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
  onOpenEnquiry: () => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenEnquiry,
}) => {
  // Lock body scroll when drawer is open so scrolling happens STRICTLY inside the menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNavClick = (section: string) => {
    onNavigate(section);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Semi-transparent Backdrop - clicking backdrop closes drawer */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Responsive Sidebar Drawer - Scrolls top to bottom smoothly */}
      <div className="fixed inset-y-0 right-0 max-w-full flex w-full sm:w-auto">
        <div className="w-full sm:w-[380px] max-w-full sm:max-w-sm h-full max-h-[100dvh] glass-mild-card-dark text-[#F3F0DD] shadow-2xl border-l border-[#BD9C7A]/30 flex flex-col justify-between p-5 sm:p-7 overflow-y-auto overscroll-contain">
          
          {/* Top Section */}
          <div className="space-y-6">
            {/* Header with 177x177 Square Brand Logo and clear Exit Button */}
            <div className="flex items-center justify-between pb-5 border-b border-[#BD9C7A]/20">
              <div className="flex flex-col items-start justify-center pr-2">
                <BrandLogo
                  size="square-177"
                  isSquare={true}
                  width={140}
                  height={140}
                  variant="light"
                  showSubtitle={true}
                  onClick={() => handleNavClick('home')}
                  className="items-start"
                />
              </div>
              <button
                onClick={onClose}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-[#BD9C7A] text-[#2C251E] font-bold font-10 text-xs uppercase tracking-wider hover:bg-[#A38362] active:scale-95 transition-all cursor-pointer shadow-md shrink-0"
                aria-label="Close Sidebar Menu"
                title="Exit Menu"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
                <span>EXIT</span>
              </button>
            </div>

            {/* Menu Navigation Links */}
            <nav className="space-y-2.5 font-1 tracking-[0.22em] uppercase font-medium">
              <button
                onClick={() => handleNavClick('home')}
                className="w-full text-left py-2.5 px-4 rounded-xl text-[#EBDEBE] hover:bg-[#BD9C7A]/20 hover:text-[#BD9C7A] transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>Home</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#BD9C7A]" />
              </button>

              <button
                onClick={() => handleNavClick('gallery')}
                className="w-full text-left py-2.5 px-4 rounded-xl text-[#EBDEBE] hover:bg-[#BD9C7A]/20 hover:text-[#BD9C7A] transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>Wedding Gallery</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#BD9C7A]" />
              </button>

              <button
                onClick={() => handleNavClick('films')}
                className="w-full text-left py-2.5 px-4 rounded-xl text-[#EBDEBE] hover:bg-[#BD9C7A]/20 hover:text-[#BD9C7A] transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>Wedding Films</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#BD9C7A]" />
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className="w-full text-left py-2.5 px-4 rounded-xl text-[#EBDEBE] hover:bg-[#BD9C7A]/20 hover:text-[#BD9C7A] transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>About Us</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#BD9C7A]" />
              </button>

              <button
                onClick={() => handleNavClick('testimonials')}
                className="w-full text-left py-2.5 px-4 rounded-xl text-[#EBDEBE] hover:bg-[#BD9C7A]/20 hover:text-[#BD9C7A] transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>Love Stories</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#BD9C7A]" />
              </button>

              {/* 🎯 Contact Studio routes directly to the Footer section as requested */}
              <button
                onClick={() => handleNavClick('footer')}
                className="w-full text-left py-2.5 px-4 rounded-xl text-[#EBDEBE] hover:bg-[#BD9C7A]/20 hover:text-[#BD9C7A] transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>Contact Studio</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#BD9C7A]" />
              </button>
            </nav>

            {/* Quick Tell Your Story CTA Box */}
            <div className="p-4 sm:p-5 rounded-2xl glass-button border border-[#BD9C7A]/40 text-center">
              <Heart className="w-5 h-5 text-[#BD9C7A] mx-auto mb-2 animate-bounce" />
              <h4 className="font-6 text-[#F3F0DD] text-base mb-1">
                Planning Your Wedding?
              </h4>
              <p className="font-8 text-xs text-[#EBDEBE]/80 leading-relaxed mb-3.5">
                Let’s create everlasting visual art for your special day.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenEnquiry();
                }}
                className="w-full py-2.5 px-4 rounded-full bg-[#BD9C7A] text-[#2C251E] font-bold font-10 tracking-wider uppercase hover:bg-[#A38362] transition-all shadow-lg cursor-pointer text-xs"
              >
                Tell Your Story
              </button>
            </div>
          </div>

          {/* Bottom Info & Socials (Scrolls with the content, never gets trapped) */}
          <div className="pt-6 mt-6 border-t border-[#BD9C7A]/20 space-y-4">
            <div className="space-y-2 font-8 text-xs text-[#EBDEBE]/80">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#BD9C7A] shrink-0 mt-0.5" />
                <span>64/A,Indra Nagar, Swarnapuri Annexe, Salem, Tamil Nadu 636004</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#BD9C7A] shrink-0" />
                <a href="tel:+919061040472" className="hover:text-[#BD9C7A] transition-colors">
                  +91 90610 40472
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-[#BD9C7A] shrink-0" />
                <a href="mailto:emozeweddings@gmail.com" className="hover:text-[#BD9C7A] transition-colors">
                  emozeweddings@gmail.com
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center space-x-3 pt-1">
              <a
                href="https://www.instagram.com/emozeweddings/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full glass-mild-btn text-[#EBDEBE] hover:text-[#BD9C7A] hover:bg-[#BD9C7A]/30 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@emozeweddings?si=3MppQL5ngzwI0RR8"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full glass-mild-btn text-[#EBDEBE] hover:text-[#BD9C7A] hover:bg-[#BD9C7A]/30 transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/emozeweddings/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full glass-mild-btn text-[#EBDEBE] hover:text-[#BD9C7A] hover:bg-[#BD9C7A]/30 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            {/* Bottom Exit Button for effortless mobile navigation */}
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-full border border-[#BD9C7A]/30 text-[#EBDEBE] font-10 uppercase tracking-widest text-[11px] font-semibold hover:bg-[#BD9C7A]/20 transition-all cursor-pointer text-center"
            >
              ← Close Navigation Menu
            </button>

            <p className="font-10 text-center text-[#EBDEBE]/50 uppercase tracking-widest text-[10px] pt-1">
              © Emozeweddings
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
