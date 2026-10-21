import React, { useState, useEffect } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onOpenSidebar: () => void;
  onOpenSearch?: () => void;
  onOpenEnquiry: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSidebar,
  onOpenEnquiry,
  activeSection,
  onNavigate,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 xs:py-3.5 sm:py-4 lg:py-5 xl:py-6 2xl:py-7 px-3 xs:px-4 sm:px-6 lg:px-8 2xl:px-12 ${
    // xl,2xl la than periya screens oda sizes elam increase panna mudiyum

        scrolled
          ? ' border-b border-[#BD9C7A]/30 shadow-xl text-[#F3F0DD]'
          : ' border-b border-[#BD9C7A]/20 text-[#F3F0DD]'
      }`}
    >
      <div className="w-full max-w-7xl 2xl:max-w-[1700px] 3xl:max-w-[2200px] mx-auto flex items-center justify-between gap-1.5 xs:gap-2 sm:gap-4 lg:gap-6">
        
        <div className="flex items-center justify-start flex-shrink-0">
          <button
            onClick={onOpenSidebar}
            className="md:hidden flex items-center justify-center space-x-1.5 h-10 px-3 xs:px-3.5 rounded-full glass-button border border-[#BD9C7A]/30 text-[#F3F0DD] hover:bg-[#BD9C7A]/30 transition-all cursor-pointer shrink-0 shadow-sm active:scale-95 min-w-[76px] xs:min-w-[82px]"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#BD9C7A] shrink-0" />
            <span className="font-10 text-[11px] xs:text-xs font-bold tracking-wider uppercase text-[#EBDEBE]">
              MENU
            </span>
          </button>

          <div className="hidden md:flex items-center p-0 m-0">
  
<BrandLogo
  size="lg" 
  variant="light"
  showSubtitle={true}
  onClick={() => onNavigate('home')}
/>

          </div>
        </div>

        <div className="md:hidden flex-1 flex items-center justify-center text-center px-1 min-w-0">
          <BrandLogo
            size="header"
            variant="light"
            isSquare={true}
            showSubtitle={false}
            onClick={() => onNavigate('home')}
          />
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center px-2">
          <nav className="flex items-center space-x-3 lg:space-x-6 xl:space-x-8 2xl:space-x-12 font-1 tracking-[0.14em] lg:tracking-[0.18em] 2xl:tracking-[0.24em] uppercase font-medium text-[#EBDEBE] whitespace-nowrap text-xs lg:text-sm xl:text-base 2xl:text-lg">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-[#BD9C7A] transition-colors cursor-pointer relative py-1 ${
                activeSection === 'home' ? 'text-[#BD9C7A] font-semibold' : ''
              }`}
            >
              Home
              {activeSection === 'home' && (
                <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#BD9C7A] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onNavigate('gallery')}
              className={`hover:text-[#BD9C7A] transition-colors cursor-pointer relative py-1 ${
                activeSection === 'gallery' ? 'text-[#BD9C7A] font-semibold' : ''
              }`}
            >
              Gallery
              {activeSection === 'gallery' && (
                <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#BD9C7A] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onNavigate('films')}
              className={`hover:text-[#BD9C7A] transition-colors cursor-pointer relative py-1 ${
                activeSection === 'films' ? 'text-[#BD9C7A] font-semibold' : ''
              }`}
            >
              Films
              {activeSection === 'films' && (
                <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#BD9C7A] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onNavigate('about')}
              className={`hover:text-[#BD9C7A] transition-colors cursor-pointer relative py-1 ${
                activeSection === 'about' ? 'text-[#BD9C7A] font-semibold' : ''
              }`}
            >
              About Us
              {activeSection === 'about' && (
                <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#BD9C7A] rounded-full" />
              )}
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className={`hover:text-[#BD9C7A] transition-colors cursor-pointer relative py-1 ${
                activeSection === 'contact' ? 'text-[#BD9C7A] font-semibold' : ''
              }`}
            >
              Contact
              {activeSection === 'contact' && (
                <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#BD9C7A] rounded-full" />
              )}
            </button>
          </nav>
        </div>

        <div className="flex items-center justify-end flex-shrink-0">
          <button
            onClick={onOpenEnquiry}
            className="flex items-center justify-center space-x-1.5 h-10 px-3 xs:px-3.5 sm:px-4.5 2xl:px-6 rounded-full glass-mild-pill text-[#2C251E] font-bold font-10 tracking-[0.1em] xs:tracking-[0.14em] uppercase cursor-pointer hover:bg-[#A38362] hover:scale-105 transition-all shadow-md active:scale-95 whitespace-nowrap text-xs shrink-0 min-w-[76px] xs:min-w-[82px] md:min-w-0"
            title="Book Consultation - Tell Your Story"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2C251E] fill-[#2C251E] shrink-0" />
            <span className="font-10 font-bold whitespace-nowrap tracking-wider">
              <span className="md:hidden">BOOK</span>
              <span className="hidden md:inline">Tell Your Story</span>
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
