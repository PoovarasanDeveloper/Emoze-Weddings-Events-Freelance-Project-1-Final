import React from "react";
import {
  Camera,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Youtube,
  Facebook,
  ArrowUp,
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenEnquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-[#2C251E] text-[#F3F0DD] border-t border-[#BD9C7A]/20 pt-16 pb-12 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl 2xl:max-w-[1700px] 3xl:max-w-[2200px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-16">
        {/* Top Callout & Locations */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex flex-col">
              <div className="hidden md:flex items-start items-center">
                <BrandLogo
                    size="square-177"
                isSquare={true}
                width={177}
                height={177}
                  variant="light"
                  showSubtitle={true}
                  onClick={() => onNavigate("home")}
                />
              </div>
            </div>
            <p className="text-md text-[#EBDEBE]/70  leading-relaxed">
              Premier story-based wedding photographers and event storytellers
              capturing love stories across Salem, Chennai, TamilNadu.
            </p>
            <button
              onClick={onOpenEnquiry}
              className="px-5 py-2.5 rounded-full glass-button text-xs font-semibold tracking-widest uppercase text-[#BD9C7A] hover:text-white cursor-pointer"
            >
              Book Dates
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-mono font-bold tracking-[0.2em] uppercase text-[#BD9C7A]">
              CONTACT
            </h4>
            <div className="space-y-1.5 text-[#EBDEBE]/70 font-light leading-relaxed">
              <p className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#BD9C7A] shrink-0 mt-0.5" />
                <span>
                  64/A,Indra Nagar, Swarnapuri Annexe, Salem, Tamil Nadu 636004
                </span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#BD9C7A] shrink-0" />
                <a
                  href="tel:+919061040472"
                  className="hover:text-[#BD9C7A] transition-colors"
                >
                  +91 9487021503
                </a>
              </p>
            </div>
          </div>

          {/* Location 2: Chennai & Dubai */}
          <div className="space-y-3 text-xs">
            <h4 className="font-mono font-bold tracking-[0.2em] uppercase text-[#BD9C7A]">
              EMAIL
            </h4>
            <div className="space-y-1.5 text-[#EBDEBE]/70 font-light leading-relaxed">
              <p className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#BD9C7A] shrink-0" />
                <a
                  href="mailto:mail@emozeweddings@gmail.com"
                  className="hover:text-[#BD9C7A] transition-colors"
                >
                  emozeweddings@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-mono font-bold tracking-[0.2em] uppercase text-[#BD9C7A]">
              Quick Links
            </h4>
            <div className="flex flex-col space-y-2 text-[#EBDEBE]/70 font-light">
              <button
                onClick={() => onNavigate("home")}
                className="text-left hover:text-[#BD9C7A] transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate("gallery")}
                className="text-left hover:text-[#BD9C7A] transition-colors cursor-pointer"
              >
                Wedding Gallery
              </button>
              <button
                onClick={() => onNavigate("films")}
                className="text-left hover:text-[#BD9C7A] transition-colors cursor-pointer"
              >
                Wedding Films
              </button>
              <button
                onClick={() => onNavigate("testimonials")}
                className="text-left hover:text-[#BD9C7A] transition-colors cursor-pointer"
              >
                Client Testimonials
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & To Top Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EBDEBE]/50 font-light">
          <p>© 2026 EMOZE Weddings . All Rights Reserved.</p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com/emozeweddings?igsh=Z3VxZTdieTN0Ym5x"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full glass-button text-[#EBDEBE] hover:text-[#BD9C7A] hover:bg-[#BD9C7A]/30 transition-colors"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com/@emozeweddings?si=3MppQL5ngzwI0RR8"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full glass-button text-[#EBDEBE] hover:text-[#BD9C7A] hover:bg-[#BD9C7A]/30 transition-colors"
              title="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/emozeweddings"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full glass-button text-[#EBDEBE] hover:text-[#BD9C7A] hover:bg-[#BD9C7A]/30 transition-colors"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#BD9C7A] hover:text-[#F3F0DD] transition-colors cursor-pointer"
          >
            <span>Back To Top</span>
            <div className="p-2 rounded-full glass-button">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
