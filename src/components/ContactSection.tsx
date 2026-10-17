import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  CheckCircle, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Copy, 
  Check, 
  ExternalLink,
  MessageCircle,
  Tag
} from 'lucide-react';
import { CONTACT_CONFIG } from '../data/weddingData';
import { BrandLogo } from './BrandLogo';

interface ContactSectionProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isOpen, onClose }) => {
  // If explicitly opened as a modal and isOpen is false, don't render anything
  if (isOpen === false) {
    return null;
  }

  // Lock background body scroll when the modal is open
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

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lastMessage, setLastMessage] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    weddingDate: '',
    eventType: 'Full Wedding & Reception',
    budget: '₹50,000 - ₹1 Lakh',
    notes: '',
  });

  // Safely format WhatsApp destination phone number with country code
  const getCleanWhatsAppNumber = (num: string): string => {
    let cleaned = num.replace(/\D/g, '');
    if (cleaned.length === 10 && /^[6-9]/.test(cleaned)) {
      cleaned = '91' + cleaned;
    }
    return cleaned || '919061040472';
  };

  // Build clean, professional WhatsApp message
  const buildWhatsAppMessage = (data: typeof formData): string => {
    const lines = [
      `💍 *NEW WEDDING PHOTOGRAPHY ENQUIRY*`,
      `*${CONTACT_CONFIG.studioName || 'Emoze Weddings'}*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Client Name:* ${data.name.trim() || 'Not provided'}`,
      `📱 *Client Phone:* ${data.phone.trim() || 'Not provided'}`,
      `✉️ *Email Address:* ${data.email.trim() || 'Not provided'}`,
      `📅 *Wedding / Event Date:* ${data.weddingDate || 'Not specified'}`,
      `📍 *Location / Venue:* ${data.location.trim() || 'Not specified'}`,
      `🎉 *Event Type:* ${data.eventType || 'Full Wedding & Reception'}`,
      `💰 *Estimated Budget:* ${data.budget || 'Custom'}`,
    ];

    if (data.notes && data.notes.trim()) {
      lines.push(
        `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `📝 *Event Vision & Details:*`,
        `${data.notes.trim()}`
      );
    }

    lines.push(
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `⚡ *Sent securely from Emoze Weddings webapplication*`
    );

    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      return;
    }

    const message = buildWhatsAppMessage(formData);
    const targetNumber = getCleanWhatsAppNumber(CONTACT_CONFIG.whatsappNumber);
    const directUrl = `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encodeURIComponent(message)}`;

    setLastMessage(message);
    setWhatsappLink(directUrl);
    setSubmitted(true);

    try {
      const win = window.open(directUrl, '_blank', 'noopener,noreferrer');
      if (!win) {
        window.location.href = directUrl;
      }
    } catch {
      // Fallback
    }
  };

  const handleCopyMessage = async () => {
    try {
      if (navigator.clipboard && lastMessage) {
        await navigator.clipboard.writeText(lastMessage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setCopied(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      weddingDate: '',
      eventType: 'Full Wedding & Reception',
      budget: '₹50,000 - ₹1 Lakh',
      notes: '',
    });
    if (onClose) {
      onClose();
    }
  };

  const formCard = (
    <div className="w-[92%] sm:w-[94%] md:w-full max-w-4xl mx-auto p-3 xs:p-3.5 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border border-[#8FA368]/60 glass-mild-card backdrop-blur-2xl text-[#FAF7ED] box-border relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full  blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl pointer-events-none" />
      <div className="flex items-start justify-between pb-2.5 sm:pb-3 border-b border-[#8FA368]/30 mb-3 sm:mb-3.5 gap-2.5 sm:gap-4 relative z-10">
        <div className="flex items-center space-x-2.5 sm:space-x-3.5 min-w-0 flex-1">
          <div className="shrink-0 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl flex items-center justify-center">
            <BrandLogo
              size="square-177"
              isSquare={true}
              width={44}
              height={44}
              variant="light"
              showSubtitle={false}
            />
          </div>
          <div className="min-w-0 flex-1 flex flex-col justify-center leading-none">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 sm:py-1 rounded-full glass-mild-pill text-[#546135] font-10 backdrop-blur-md border border-[#9CAE74]/60 font-bold uppercase tracking-wider text-[9px] xs:text-[10px] sm:text-xs mb-1 shadow-sm w-fit">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#546135] shrink-0 animate-pulse" />
              <span>Tell Your Story</span>
            </div>
            <h2 className="font-3 text-[black] text-sm xs:text-base sm:text-xl md:text-2xl leading-tight truncate sm:whitespace-normal">
              Book Your Wedding Dates
            </h2>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#BD9C7A] text-[#2C251E] font-10 font-bold text-xs uppercase tracking-wider hover:bg-[#A38362] active:scale-95 transition-all cursor-pointer border border-[#8C7152]/30 shadow-lg self-start ml-auto"
            aria-label="Close booking form"
            title="Close Form"
          >
            <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
          </button>
        )}
      </div>

      {submitted ? (
        <div className="py-3 sm:py-5 space-y-4 relative z-10">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 shadow-md mx-auto">
              <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 animate-bounce" />
            </div>
            <h3 className="font-4 text-lg sm:text-xl text-[#FAF7ED]">
              Enquiry Submitted Successfully!
            </h3>
            <p className="font-8 text-xs sm:text-sm text-[black]/80 max-w-md mx-auto font-light leading-relaxed">
              Your wedding enquiry is formatted and ready to send via WhatsApp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full bg-[#25D366] text-white font-bold font-10 tracking-wider uppercase text-xs hover:bg-[#20ba59] transition-all shadow-lg active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Open in WhatsApp (Send Now)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <button
              onClick={handleCopyMessage}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full bg-[#344829]/70 border border-[#8FA368]/50 text-[#FAF7ED] font-semibold font-10 uppercase text-xs hover:bg-[#344829] transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-bold">Message Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#B8C19C]" />
                  <span>Copy Message Text</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center pt-1">
            <button
              onClick={handleReset}
              className="px-5 py-2 rounded-full bg-[#B8C19C] text-[#1E2B16] font-bold font-10 tracking-widest uppercase hover:bg-[black] transition-all cursor-pointer shadow-md text-xs active:scale-95"
            >
              Send Another Enquiry / Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-2.5 relative z-10">
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3">
            <div className="col-span-1">
              <label className="block font-10 uppercase tracking-wider text-[black] mb-1 font-semibold text-[10px] sm:text-xs truncate h-4 sm:h-4.5 flex items-center">
                Your Name *
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-[#B8C19C] absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="Vanitha & Nirmal"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-mild border border-[#BD9C7A]/40 text-[#2C251E] placeholder-[#8C7152]/60 focus:outline-none focus:border-[#BD9C7A] font-8 text-xs sm:text-sm"
                />
              </div>
            </div>
            <div className="col-span-1">
              <label className="block font-10 uppercase tracking-wider text-[black] mb-1 font-semibold text-[10px] sm:text-xs truncate h-4 sm:h-4.5 flex items-center">
                Phone / WhatsApp
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-[#B8C19C] absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-mild border border-[#BD9C7A]/40 text-[#2C251E] placeholder-[#8C7152]/60 focus:outline-none focus:border-[#BD9C7A] font-8 text-xs sm:text-sm"
                />
              </div>
            </div>
            <div className="col-span-1">
              <label className="block font-10 uppercase tracking-wider text-[black] mb-1 font-semibold text-[10px] sm:text-xs truncate h-4 sm:h-4.5 flex items-center">
                Wedding Date
              </label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-[#B8C19C] absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="date"
                  required
                  value={formData.weddingDate}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-mild border border-[#BD9C7A]/40 text-[#2C251E] placeholder-[#8C7152]/60 focus:outline-none focus:border-[#BD9C7A] font-8 text-xs sm:text-sm"
                />
              </div>
            </div>
            <div className="col-span-1">
              <label className="block font-10 uppercase tracking-wider text-[black] mb-1 font-semibold text-[10px] sm:text-xs truncate h-4 sm:h-4.5 flex items-center">
                Location / Venue
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-[#B8C19C] absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Kochi, Chennai"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-mild border border-[#BD9C7A]/40 text-[#2C251E] placeholder-[#8C7152]/60 focus:outline-none focus:border-[#BD9C7A] font-8 text-xs sm:text-sm"
                />
              </div>
            </div>
            <div className="col-span-1">
              <label className="block font-10 uppercase tracking-wider text-[black] mb-1 font-semibold text-[10px] sm:text-xs truncate h-4 sm:h-4.5 flex items-center">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-[#B8C19C] absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-mild border border-[#BD9C7A]/40 text-[#2C251E] placeholder-[#8C7152]/60 focus:outline-none focus:border-[#BD9C7A] font-8 text-xs sm:text-sm"
                />
              </div>
            </div>
            <div className="col-span-1">
              <label className="block font-10 uppercase tracking-wider text-[black] mb-1 font-semibold text-[10px] sm:text-xs truncate h-4 sm:h-4.5 flex items-center">
                Coverage Type
              </label>
              <div className="relative">
                <Tag className="w-3.5 h-3.5 text-[#B8C19C] absolute left-2.5 top-2.5 pointer-events-none" />
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
className="w-full pl-7.5 sm:pl-8 pr-2 py-1.5 sm:py-2 rounded-xl glass-mild border border-[#BD9C7A]/40 text-[#2C251E] focus:outline-none focus:border-[#BD9C7A] font-8 text-xs sm:text-sm"                >
                  <option value="Full Wedding & Reception" >Full Wedding & Reception</option>
                  <option value="Pre-Wedding / Outdoor Shoot" >Pre-Wedding / Outdoor Shoot</option>
                  <option value="Destination Luxury Wedding" >Destination Luxury Wedding</option>
                  <option value="Engagement & Sangeet" >Engagement & Sangeet</option>
                  <option value="Cinematic Feature Film Only" >Cinematic Feature Film Only</option>
                </select>
              </div>
            </div>
            <div className="col-span-1">
              <label className="block font-10 uppercase tracking-wider text-[black] mb-1 font-semibold text-[10px] sm:text-xs truncate h-4 sm:h-4.5 flex items-center">
                Estimated Budget
              </label>
              <div className="relative">
                <Tag className="w-3.5 h-3.5 text-[#B8C19C] absolute left-2.5 top-2.5 pointer-events-none" />
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-mild border border-[#BD9C7A]/40 text-[#2C251E] placeholder-[#8C7152]/60 focus:outline-none focus:border-[#BD9C7A] font-8 text-xs sm:text-sm"
                >
                  <option value="₹50,000 - ₹1 Lakh" >₹50,000 - ₹1 Lakh (Intimate)</option>
                  <option value="₹1.5 Lakhs - ₹2.5 Lakhs" >₹1.5Lakhs - ₹2.5 Lakhs</option>
                  <option value="₹2.5 Lakhs - ₹4 Lakhs" >₹2.5Lakhs - ₹4 Lakhs (Popular)</option>
                  <option value="₹4 Lakhs - ₹7 Lakhs" >₹4Lakhs - ₹7 Lakhs (Signature)</option>
                  <option value="₹7 Lakhs+ (Luxury Destination)" >₹7 Lakhs+ (Destination)</option>
                </select>
              </div>
            </div>
            <div className="col-span-1">
              <label className="block font-10 uppercase tracking-wider text-[black] mb-1 font-semibold text-[10px] sm:text-xs truncate h-4 sm:h-4.5 flex items-center">
                Vision & Expectations
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Outdoor, candid rituals..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-mild border border-[#BD9C7A]/40 text-[#2C251E] placeholder-[#8C7152]/60 focus:outline-none focus:border-[#BD9C7A] font-8 text-xs sm:text-sm"
                />
              </div>
            </div>

          </div>
          <div className="pt-1 sm:pt-1.5">
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 px-6 rounded-full bg-[#BD9C7A] text-[#2C251E] font-bold font-10 hover:bg-[#A38362] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-xs sm:text-sm transition-all shadow-xl cursor-pointer flex items-center justify-center space-x-2 active:scale-[0.99] "
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Submit Enquiry & Send to WhatsApp</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );

  // If used as an interactive Modal
  if (isOpen === true) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-2.5 sm:p-4 md:p-6 overflow-y-auto overscroll-contain">
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
        <div className="relative z-10 w-full max-w-4xl my-auto max-h-[96dvh] overflow-y-auto no-scrollbar py-1">
          {formCard}
        </div>
      </div>
    );
  }

  // If used as standard page Section (<ContactSection /> in App.tsx)
  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#F3F0DD] px-3 sm:px-6 scroll-mt-20 md:scroll-mt-24">
      {formCard}
    </section>
  );
};


