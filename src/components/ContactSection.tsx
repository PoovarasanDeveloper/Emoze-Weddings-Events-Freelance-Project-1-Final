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
  if (isOpen === false) {
    return null;
  }

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

  const getCleanWhatsAppNumber = (num: string): string => {
    let cleaned = num.replace(/\D/g, '');
    if (cleaned.length === 10 && /^[6-9]/.test(cleaned)) {
      cleaned = '91' + cleaned;
    }
    return cleaned || '916380664332';
  };

  const buildWhatsAppMessage = (data: typeof formData): string => {
    const lines = [
      `💍 *NEW WEDDING PHOTOGRAPHY ENQUIRY*`,
      `*${CONTACT_CONFIG.studioName || 'Congratulations Weddings & Events'}*`,
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
      `*Sent securely from Emoze Weddings webapplication*`
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
    <div className="w-[92%] sm:w-[94%] md:w-full max-w-4xl mx-auto p-3 xs:p-3.5 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border border-[#BD9C7A]/40 glass-mild-card shadow-2xl backdrop-blur-2xl text-[#2C251E] box-border relative overflow-hidden">
      <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-[#BD9C7A]/30 mb-3 sm:mb-3.5 relative z-10 w-full">
        <div className="w-1/2 relative flex items-center justify-center min-w-0 px-1 sm:px-2">

          <div className="absolute w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-[#BD9C7A]/40 blur-3xl pointer-events-none" />
          <div className="absolute w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-r from-[#BD9C7A]/25 via-[#F3E7C4]/50 to-[#BD9C7A]/25 blur-2xl pointer-events-none animate-pulse" />
          <div className="relative z-10 flex items-center justify-center">
            <BrandLogo
              size="square-177"
              isSquare={true}
              width={102}
              height={102}
              variant="dark"
              showSubtitle={false}
              className="aspect-square object-contain sm:w-[77px] sm:h-[77px] md:w-24 md:h-24 drop-shadow-[0_0_16px_rgba(189,156,122,0.65)]"
            />
          </div>
        </div>

        

        <div className="w-1/2 relative flex items-center justify-center min-w-0 px-1 sm:px-2">
          <div className="flex flex-col items-center justify-center min-w-0 text-center w-full px-5 xs:px-6 sm:px-8">
            <div className="inline-flex items-center space-x-1.5 px-2 xs:px-2.5 py-0.5 rounded-full glass-mild-pill text-[#546135] font-10 backdrop-blur-md border border-[#9CAE74]/60 font-bold uppercase tracking-wider text-[8px] xs:text-[9px] sm:text-[11px] mb-0.5 shadow-sm w-fit whitespace-nowrap flex-nowrap shrink-0 mx-auto">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#546135] shrink-0 animate-pulse" />
              <span className="whitespace-nowrap">Tell Your Story</span>
            </div>

            <h2 className="font-3 text-[#2C251E] font-bold text-[10px] xs:text-[11px] sm:text-base md:text-lg lg:text-xl leading-tight truncate max-w-full text-center">
              Book Your Wedding Dates
            </h2>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-0 top-1/2 -translate-y-1/2 shrink-0 flex items-center justify-center w-7.5 h-7.5 xs:w-8 xs:h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-[#BD9C7A] text-[#2C251E] hover:bg-[#A38362] active:scale-95 transition-all cursor-pointer border border-[#8C7152]/30 shadow-md"
              aria-label="Close booking form"
              title="Close Form"
            >
              <X className="w-3.5 h-3.5 xs:w-4 xs:h-4 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>

      {submitted ? (
        <div className="py-3 sm:py-5 space-y-4 relative z-10">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-600 shadow-md mx-auto">
              <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 animate-bounce" />
            </div>
            <h3 className="font-4 text-lg sm:text-xl text-[#2C251E]">
              Enquiry Submitted Successfully!
            </h3>
            <p className="font-8 text-xs sm:text-sm text-[#2C251E]/80 max-w-md mx-auto font-light leading-relaxed">
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
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-full bg-[#BD9C7A]/25 border border-[#BD9C7A]/50 text-[#2C251E] font-semibold font-10 uppercase text-xs hover:bg-[#BD9C7A]/40 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Message Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#BD9C7A]" />
                  <span>Copy Message Text</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center pt-1">
            <button
              onClick={handleReset}
              className="px-5 py-2 rounded-full bg-[#BD9C7A] text-[#2C251E] font-bold font-10 tracking-widest uppercase hover:bg-[#A38362] transition-all cursor-pointer shadow-md text-xs active:scale-95"
            >
              Send Another Enquiry / Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-2.5 relative z-10">
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3">
            <div className="col-span-1">
              <label className="block font-10 uppercase tracking-wider text-[#2C251E] mb-1 font-semibold text-[10px] sm:text-xs truncate h-4 sm:h-4.5 flex items-center">
                Your Name *
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-[#BD9C7A] absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="Ananya & Rahul"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-7.5 sm:pl-8 pr-2.5 py-1.5 sm:py-2 h-8.5 sm:h-9.5 rounded-xl glass-mild border border-[#BD9C7A]/40 text-[#2C251E] placeholder-[#8C7152]/60 focus:outline-none focus:border-[#BD9C7A] font-8 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="col-span-1">
              <label className="block font-10 uppercase tracking-wider text-[#2C251E] mb-1 font-semibold text-[10px] sm:text-xs truncate h-4 sm:h-4.5 flex items-center">
                Phone / WhatsApp *
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-[#BD9C7A] absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-7.5 sm:pl-8 pr-2.5 py-1.5 sm:py-2 h-8.5 sm:h-9.5 rounded-xl glass-mild border border-[#BD9C7A]/40 text-[#2C251E] placeholder-[#8C7152]/60 focus:outline-none focus:border-[#BD9C7A] font-8 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="col-span-1">
              <label className="block font-10 uppercase tracking-wider text-[#2C251E] mb-1 font-semibold text-[10px] sm:text-xs truncate h-4 sm:h-4.5 flex items-center">
                Wedding Date *
              </label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-[#BD9C7A] absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="date"
                  required
                  value={formData.weddingDate}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  className="w-full pl-7.5 sm:pl-8 pr-2 py-1.5 sm:py-2 h-8.5 sm:h-9.5 rounded-xl glass-mild border border-[#BD9C7A]/40 text-[#2C251E] placeholder-[#8C7152]/60 focus:outline-none focus:border-[#BD9C7A] font-8 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="col-span-1">
              <label className="block font-10 uppercase tracking-wider text-[#2C251E] mb-1 font-semibold text-[10px] sm:text-xs truncate h-4 sm:h-4.5 flex items-center">
                Location / Venue *
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-[#BD9C7A] absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Kochi, Chennai"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-7.5 sm:pl-8 pr-2.5 py-1.5 sm:py-2 h-8.5 sm:h-9.5 rounded-xl glass-mild border border-[#BD9C7A]/40 text-[#2C251E] placeholder-[#8C7152]/60 focus:outline-none focus:border-[#BD9C7A] font-8 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="col-span-1">
              <label className="block font-10 uppercase tracking-wider text-[#2C251E] mb-1 font-semibold text-[10px] sm:text-xs truncate h-4 sm:h-4.5 flex items-center">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-[#BD9C7A] absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-7.5 sm:pl-8 pr-2.5 py-1.5 sm:py-2 h-8.5 sm:h-9.5 rounded-xl glass-mild border border-[#BD9C7A]/40 text-[#2C251E] placeholder-[#8C7152]/60 focus:outline-none focus:border-[#BD9C7A] font-8 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="col-span-1">
              <label className="block font-10 uppercase tracking-wider text-[#2C251E] mb-1 font-semibold text-[10px] sm:text-xs truncate h-4 sm:h-4.5 flex items-center">
                Coverage Type
              </label>
              <div className="relative">
                <Tag className="w-3.5 h-3.5 text-[#BD9C7A] absolute left-2.5 top-2.5 pointer-events-none" />
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full pl-7.5 sm:pl-8 pr-2 py-1.5 sm:py-2 h-8.5 sm:h-9.5 rounded-xl glass-mild border border-[#BD9C7A]/40 text-[#2C251E] focus:outline-none focus:border-[#BD9C7A] font-8 text-xs sm:text-sm"
                >
                  <option value="Full Wedding & Reception">Full Wedding & Reception</option>
                  <option value="Pre-Wedding / Outdoor Shoot">Pre-Wedding / Outdoor Shoot</option>
                  <option value="Destination Luxury Wedding">Destination Luxury Wedding</option>
                  <option value="Engagement & Sangeet">Engagement & Sangeet</option>
                  <option value="Cinematic Feature Film Only">Cinematic Feature Film Only</option>
                </select>
              </div>
            </div>

            <div className="col-span-1">
              <label className="block font-10 uppercase tracking-wider text-[#2C251E] mb-1 font-semibold text-[10px] sm:text-xs truncate h-4 sm:h-4.5 flex items-center">
                Estimated Budget *
              </label>
              <div className="relative">
                <Tag className="w-3.5 h-3.5 text-[#BD9C7A] absolute left-2.5 top-2.5 pointer-events-none" />
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full pl-7.5 sm:pl-8 pr-2 py-1.5 sm:py-2 h-8.5 sm:h-9.5 rounded-xl glass-mild border border-[#BD9C7A]/40 text-[#2C251E] focus:outline-none focus:border-[#BD9C7A] font-8 text-xs sm:text-sm"
                >
                  <option value="₹50,000 - ₹1 Lakh">₹50,000 - ₹1 Lakh (Intimate)</option>
                  <option value="₹1.5 Lakhs - ₹2.5 Lakhs">₹1.5L - ₹2.5 Lakhs</option>
                  <option value="₹2.5 Lakhs - ₹4 Lakhs">₹2.5L - ₹4 Lakhs (Popular)</option>
                  <option value="₹4 Lakhs - ₹7 Lakhs">₹4L - ₹7 Lakhs (Signature)</option>
                  <option value="₹7 Lakhs+ (Luxury Destination)">₹7 Lakhs+ (Destination)</option>
                </select>
              </div>
            </div>

            <div className="col-span-1">
              <label className="block font-10 uppercase tracking-wider text-[#2C251E] mb-1 font-semibold text-[10px] sm:text-xs truncate h-4 sm:h-4.5 flex items-center">
                Vision & Event Notes
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Outdoor, candid rituals..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full pl-3 pr-2.5 py-1.5 sm:py-2 h-8.5 sm:h-9.5 rounded-xl glass-mild border border-[#BD9C7A]/40 text-[#2C251E] placeholder-[#8C7152]/60 focus:outline-none focus:border-[#BD9C7A] font-8 text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-1 sm:pt-1.5">
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 px-6 rounded-full bg-[#BD9C7A] text-[#2C251E] font-bold font-10 hover:bg-[#A38362] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-xs sm:text-sm transition-all shadow-xl cursor-pointer flex items-center justify-center space-x-2 active:scale-[0.99]"
            >
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Submit Enquiry & Send to WhatsApp</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );

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

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#F3F0DD] px-3 sm:px-6 scroll-mt-20 md:scroll-mt-24">
      {formCard}
    </section>
  );
};
