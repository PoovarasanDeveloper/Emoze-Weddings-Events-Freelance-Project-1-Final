import React, { useState } from "react";
import { Header } from "./components/Header";
import { SidebarDrawer } from "./components/SidebarDrawer";
import { HeroSlideshow } from "./components/HeroSlideshow";
import { WeddingGallery } from "./components/WeddingGallery";
import { WeddingFilms } from "./components/WeddingFilms";
import { AboutSection } from "./components/AboutSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { VideoModal } from "./components/VideoModal";
import { StoryModal } from "./components/StoryModal";
import { WeddingGalleryItem } from "./types";
import { Search, X, Sparkles } from "lucide-react";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Video Modal State
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({ url: "", title: "" });

  // Story Modal State
  const [selectedStoryItem, setSelectedStoryItem] =
    useState<WeddingGalleryItem | null>(null);

  const handlePlayVideo = (videoUrl: string, title: string) => {
    setCurrentVideo({ url: videoUrl, title });
    setVideoModalOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
 const targetId = (sectionId === 'contact' || sectionId === 'footer') ? 'footer' : sectionId;
    const element = document.getElementById(targetId) || document.getElementById(sectionId);
        if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-amber-400 selection:text-zinc-950">
      {/* Header */}
      <Header
        onOpenSidebar={() => setSidebarOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenEnquiry={() => setEnquiryOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Sidebar Drawer (Normal Size, max-w-sm / ~360px, doesn't cover full screen!) */}
      <SidebarDrawer
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={handleNavigate}
        onOpenEnquiry={() => setEnquiryOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home">
          <HeroSlideshow
            onPlayVideo={handlePlayVideo}
            onExploreGallery={() => handleNavigate("gallery")}
            onOpenEnquiry={() => setEnquiryOpen(true)}
          />
        </section>

        {/* Wedding Gallery Section (With Dynamic Scroll Motion) */}
        <WeddingGallery
          onSelectItem={(item) => setSelectedStoryItem(item)}
          onPlayVideo={handlePlayVideo}
          searchQuery={searchQuery}
        />

        {/* Wedding Films Section */}
        <WeddingFilms onPlayVideo={handlePlayVideo} />

        {/* About Section */}
        <AboutSection onOpenEnquiry={() => setEnquiryOpen(true)} />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Contact / Tell Your Story Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEnquiry={() => setEnquiryOpen(true)}
      />

      {/* Video Modal Player */}
      <VideoModal
        isOpen={videoModalOpen}
        videoUrl={currentVideo.url}
        title={currentVideo.title}
        onClose={() => setVideoModalOpen(false)}
      />

      {/* Wedding Story Modal */}
      <StoryModal
        item={selectedStoryItem}
        onClose={() => setSelectedStoryItem(null)}
        onPlayVideo={handlePlayVideo}
        onOpenEnquiry={() => setEnquiryOpen(true)}
      />

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative z-10 w-full max-w-2xl glass-card-dark p-6 rounded-3xl border border-white/20 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-2 text-[#BD9C7A] text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>Search Wedding Stories</span>
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-2 rounded-full glass-button text-white hover:text-[#BD9C7A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-4" />
              <input
                type="text"
                autoFocus
                placeholder="Search by venue, couple name, location (e.g. Kovalam, Taj, Chennai)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#BD9C7A] text-sm"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-zinc-400 font-mono">
                Showing matching stories in gallery below
              </span>
              <button
                onClick={() => {
                  setSearchOpen(false);
                  handleNavigate("gallery");
                }}
                className="px-5 py-2 rounded-full bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-[#BD9C7A] transition-all cursor-pointer"
              >
                View Gallery
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tell Your Story Enquiry Modal */}
      <ContactSection
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />
    </div>
  );
}
