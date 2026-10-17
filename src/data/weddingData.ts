import { WeddingGalleryItem, HeroSlide, Testimonial, FilmItem } from "../types";

export interface SlideItem {
  id: string;
  bgImage: string;
  title: string;
  subtitle: string;
  tag?: string;
  videoUrl?: string;
  position?: string; 
}


export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-1",
    title: "Pure Love! Premium Tamil Wedding Photography",
    subtitle:
      "Archive your day with the best candid wedding photographers in Tamilnadu & beyond",
    category: "Christian & Destination Wedding",

    bgImage: "https://ik.imagekit.io/p00v/images/gallery/destination/cover-1.jpg?updatedAt=1792098889807?tr=w-1200,q-80,f-auto,f-auto",
    // use tis after every images
    // ?tr=w-1200,q-80,f-auto
    position: '80%',
    videoUrl: "https://youtu.be/ZEJztHkwi_k?si=mq54IatpZmDAbJUo",
    hasVideo: true,
  },
  {
    id: "hero-2",
    title: "Best Wedding Videography Experience | Authentic Life Stories",
    subtitle:
      "Enjoy the services of best cinematic wedding filmers in South India",
    category: "Cinematic Wedding Films",
    bgImage: "https://ik.imagekit.io/p00v/images/hero/hero-2.jpeg?tr=w-1200,q-80,f-auto",
    position: '68%',
    videoUrl: "https://youtu.be/XWdzp2oz5QA?si=jlZxjArY_sN2xqAx",
    hasVideo: true,
  },
  {
    id: "hero-3",
    title: "Classic Chennai & Royal Destination Wedding Stories",
    subtitle:
      "Register for our creative wedding photography services in Chennai & Abroad",
    category: "Tamil & Royal Wedding",
    bgImage: "https://ik.imagekit.io/p00v/images/hero/hero-3.jpeg?tr=w-1200,q-80,f-auto",
    position: '75%',
    videoUrl: "https://youtu.be/oZGAT1t2rcg?si=jSunxv3oPSAxz6T7",
    hasVideo: true,
  },
  {
    id: "hero-4",
    title: "Engagement & Pre-Wedding Visuals | True Love in Bloom",
    subtitle: "Reach out to us for the most soul-stirring pre-wedding shoots",
    category: "Pre-Wedding & Outdoor",
    bgImage: "https://ik.imagekit.io/p00v/images/hero/hero-4.jpeg?tr=w-1200,q-80,f-auto",
    hasVideo: false,
  },
];


export const ABOUT_DATA: AboutSectionData = {

  image1: 'https://ik.imagekit.io/p00v/images/about/Founder_karthisubramani.jpeg?updatedAt=1792098036884?tr=w-1200,q-80,f-auto',
  image1Alt: 'Wedding story emotion candid photography',

  image2: 'https://ik.imagekit.io/p00v/images/about/co-founder_Irfan.jpg?updatedAt=1792098033624?tr=w-1200,q-80,f-auto',
  image2Alt: 'Wedding couple portrait photoshoot',

  founder: 'Karthick Subramani',
  founderLabel: 'Founder',
  Cofounder: 'Irfan',
  CofounderLabel: 'Co-founder',

  // Narrative Text
  badgeText: 'About Emoze Weddings',
  heading: 'Lifetime Memories, Unfiltered Emotions & Timeless Art',
  description1: "Founded on the belief that every couple has an unrepeatable life story, Emoze Weddings brings together South India's top candid photographers, cinematographers, and event storytellers.",
  description2: 'From traditional Tamil rituals to grand destination celebrations in Dubai, Kovalam, and Chennai, our team blends subtle, non-intrusive shooting techniques with high-end editorial color tones.',
  highlights: [
    'Story-driven candid photography with natural light styling',
    'Custom 4K cinematic wedding feature films & drone coverage',
    'Dedicated production managers & rapid delivery of albums'
  ],
  ctaButtonText: 'Tell Your Story With Us'
};

export const ABOUT_SECTION_DATA = ABOUT_DATA;

/**
 * ========================================================
 * WHATSAPP & ENQUIRY CONTACT CONFIGURATION (SAFE & SECURE)
 * ========================================================
 */
export const CONTACT_CONFIG: ContactConfig = {
  //WhatsApp Number-ai inga change pannalam:
  whatsappNumber: '916380664332',
  displayPhone: '+91 63806 64332',
  email: 'emozeWeddings@gmail.com',
  studioName: 'Emoze Weddings ',
};


export const GALLERY_ITEMS: WeddingGalleryItem[] = [
  {
    id: "gal-1",
    title: "Destination Wedding at Taj Green Cove Resort",
    subtitle: "A Garden Brew Wedding Diary of Kevin & Karishma",
    category: "destination",
    categoryLabel: "Destination Wedding",
    location: "Kovalam, Kerala",
    coverImage: "https://ik.imagekit.io/p00v/images/gallery/destination/cover-1_related-image-2.jpg?updatedAt=1792098916734?tr=w-1200,q-80,f-auto",
    images: [
      "https://ik.imagekit.io/p00v/images/gallery/destination/cover-1.jpg?updatedAt=1792098889807?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/p00v/images/gallery/destination/cover-1_related-image-2.jpg?updatedAt=1792098916734?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/p00v/images/gallery/destination/cover-1_related-image-1.jpg?updatedAt=1792098033321?tr=w-1200,q-80,f-auto",
      "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
    ],
    featured: true,
    hasVideo: true,
    videoUrl: "https://youtu.be/ZEJztHkwi_k?si=y600nffX732ZKYsn",
    storyDate: "October 2025",
    photographerNotes:
      "Set amidst the lush coastal slopes of Kovalam, Kevin & Karishma exchange vows in a serene cliffside ceremony surrounded by ocean breeze and sunset hues.",
    vendors: {
      venue: "Taj Green Cove Resort & Spa, Kovalam",
      decor: "Rainmaker Events",
      outfits: "Sabyasachi",
      planner: "Emoze Event Curators",
    },
  },
  {
    id: "gal-2",
    title: "Vibrant Desi Celebration at The Leela Raviz Kovalam",
    subtitle: "Aishwarya & Vikram’s Grand Coastal Nuptials",
    category: "destination",
    categoryLabel: "Destination Wedding",
    location: "Kovalam, Trivandrum",
    coverImage:       "https://ik.imagekit.io/p00v/images/gallery/destination/cover-2.jpeg?tr=w-1200,q-80,f-auto",

    images: [
      "https://ik.imagekit.io/p00v/images/gallery/destination/cover-2.jpeg?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/p00v/images/hero/hero-4.jpeg?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/p00v/images/gallery/destination/cover-1_related-image-1.jpg?updatedAt=1792098033321?tr=w-1200,q-80,f-auto",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=1200",
    ],
    featured: true,
    hasVideo: true,
    videoUrl: "https://youtu.be/oZGAT1t2rcg?si=ajdBvvRMPd8XwoO8",
    storyDate: "December 2025",
    photographerNotes:
      "A extravaganza of marigold yellows, traditional South Indian rituals, and sunset beach pheras at the iconic Leela Kovalam.",
    vendors: {
      venue: "The Leela Kovalam A Raviz Hotel",
      decor: "Aangana Wedding Decor",
      makeup: "Janas Artisans",
    },
  },
  {
    id: "gal-3",
    title: "The Trinket Box: Nature-Inspired Pre-Wedding Shoot",
    subtitle: "Athirappally Waterfalls, Alleppey Backwaters & Munnar Hills",
    category: "pre-wedding",
    categoryLabel: "Pre-Wedding Shoot",
    location: "Kerala Landscapes",
    coverImage: "https://ik.imagekit.io/p00v/images/gallery/prewedding/cover-3.jpg?updatedAt=1792098033214?tr=w-1200,q-80,f-auto",
    images: [
      "https://ik.imagekit.io/p00v/images/gallery/prewedding/cover-3.jpg?updatedAt=1792098033214?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/p00v/images/gallery/prewedding/cover-3_related-image.jpg?updatedAt=1792098033409?tr=w-1200,q-80,f-jpg",
       "https://ik.imagekit.io/p00v/images/gallery/prewedding/cover-3.jpg?updatedAt=1792098033214?tr=w-1200,q-80,f-auto",
      "https://ik.imagekit.io/p00v/images/hero/hero-2.jpeg?tr=w-1200,q-80,f-auto"
    ],
    featured: false,
    hasVideo: false,
    storyDate: "January 2026",
    photographerNotes:
      "Journeying through misty tea gardens in Munnar and golden sunsets on houseboats in Alleppey, capturing deep candid moments.",
    vendors: {
      venue: "Munnar & Alleppey, Kerala",
      outfits: "Custom Linen & Silk",
    },
  },
  {
    id: "gal-4",
    title: "Al Habtoor Polo Resort Dubai: Beenish & Saad",
    subtitle: "The Moonflower Pre-Wedding Visuals",
    category: "destination",
    categoryLabel: "Dubai Destination",
    location: "Dubai, UAE",
    coverImage:
      "https://ik.imagekit.io/p00v/images/gallery/prewedding/cover-4.jpg?updatedAt=1792100562301?tr=w-1200,q-80,f-auto",
    images: [
      "https://ik.imagekit.io/p00v/images/gallery/prewedding/cover-4.jpg?updatedAt=1792100562301?tr=w-1200,q-80,f-auto",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=1200",
    ],
    featured: true,
    hasVideo: true,
    videoUrl: "https://youtu.be/BFNrUJsoPjc?si=BE6ZaBsjXCPbcvh4",
    storyDate: "February 2026",
    photographerNotes:
      "Regal equestrian vibes combined with desert twilight shots at Al Habtoor Polo Resort in Dubai.",
    vendors: {
      venue: "Al Habtoor Polo Resort Dubai",
      planner: "Luxurious Weddings Dubai",
    },
  },
  {
    id: "gal-5",
    title: "Royal Cathedral Christian Wedding of Tesa & Alexander",
    subtitle: "Timeless Elegance & St. Andrews Cathedral Nuptials",
    category: "christian",
    categoryLabel: "Christian Wedding",
    location: "Kochi, Kerala",
    coverImage: "https://ik.imagekit.io/p00v/Emoze%20Weddings/cover-5.jpg?tr=w-1200,q-80,f-jpg",

    images: [
      "https://ik.imagekit.io/p00v/Emoze%20Weddings/cover-5.jpg?tr=w-1200,q-80,f-jpg",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1200",
    ],
    featured: false,
    hasVideo: false,
    storyDate: "November 2025",
    photographerNotes:
      "Sacred choral choir tones, white lace veil trailing down cathedral steps, and a grand ballroom reception in Kochi.",
    vendors: {
      venue: "St. Francis Cathedral & Bolgatty Palace",
      decor: "Dream Wedding Kochi",
    },
  },
  {
    id: "gal-6",
    title: "Traditional Tamilnadu Hindu Wedding: Gaya & Ragav",
    subtitle: "Golden Kanjivaram Silks & Jasmine Flower Splendor",
    category: "hindu",
    categoryLabel: "Hindu Wedding",
    location: "Guruvayur",
    coverImage: "https://ik.imagekit.io/p00v/Emoze%20Weddings/cover-5.jpg?tr=w-1200,q-80,f-jpg",
    // namma images a jpg a upload panni jpg avae use pannikalam f-jpg itha mattum use pannanum ithae webp a irruntha f-auto nu use pannanum munnadi use panna mathri
    images: [
"https://ik.imagekit.io/p00v/images/gallery/destination/cover-8.jpg?updatedAt=1792098033579?tr=w-1200,q-80,f-auto",
"https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=1200",
    ],
    featured: true,
    hasVideo: false,
    storyDate: "August 2025",
    photographerNotes:
      "Nadaswaram melodies fill the traditional tharavadu courtyard as Gaya and Ragav exchange garlands in auspicious morning light.",
    vendors: {
      venue: "Heritage Tharavadu, Thrissur",
      outfits: "Kanchipuram Heritage Weaver",
    },
  },
  {
    id: "gal-7",
    title: "Grand Nikah Ceremony: Reema & Faizal",
    subtitle: "Opulent Muslim Wedding at Grand Hyatt Kochi",
    category: "muslim",
    categoryLabel: "Muslim Wedding",
    location: "Bolgatty, Kochi",
    coverImage:
      "https://ik.imagekit.io/p00v/images/gallery/prewedding/cover-6_related-image.jpg?updatedAt=1792098033560?tr=w-1200,q-80,f-auto",
    images: [
      "https://ik.imagekit.io/p00v/images/gallery/prewedding/cover-6_related-image.jpg?updatedAt=1792098033560?tr=w-1200,q-80,f-auto",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    ],
    featured: false,
    hasVideo: true,
    videoUrl: "https://youtu.be/L0SXJ0-WLLk?si=3gz1PHRlOYlIvx3v",
    storyDate: "September 2025",
    photographerNotes:
      "Shimmering emerald lehengas, intricate mehendi artwork, and heartfelt family moments by the backwaters.",
    vendors: {
      venue: "Grand Hyatt Kochi Bolgatty",
      decor: "Classy Events",
    },
  },
  {
    id: "gal-8",
    title: "Chennai Heritage Temple Wedding: Priyamvada & Karthik",
    subtitle: "A Royal Tamil Kalyanam in Mylapore",
    category: "hindu",
    categoryLabel: "Tamil Wedding",
    location: "Chennai, Tamil Nadu",
    coverImage: "https://ik.imagekit.io/p00v/images/gallery/royal-tamil/Tamil_wedding.jpg?updatedAt=1792099976598?tr=w-1200,q-80,f-auto",
    images: [
"https://ik.imagekit.io/p00v/images/gallery/royal-tamil/Tamil_wedding.jpg?updatedAt=1792099976598?tr=w-1200,q-80,f-auto",      "/images/gallery/prewedding/cover-6.jpeg",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
    ],
    featured: false,
    hasVideo: false,
    storyDate: "March 2026",
    photographerNotes:
      "Deep red Kanchipuram sarees, temple pillars drenched in morning sunlight, and classic South Indian rituals.",
    vendors: {
      venue: "Mylapore Heritage Mandapam, Chennai",
      makeup: "Chennai Bridal Couture",
    },
  },
];


/**
 * Thumbnails-ku ImageKit link kudukkumpothu, '?tr=w-800,q-80,f-jpg' nu use pannunga.
 */
export const FILMS: FilmItem[] = [
  {
    id: 'film-1',
    title: 'A Symphony of Ocean Hues',
    couple: 'Kevin & Karishma',
    location: 'Taj Green Cove Resort, Kovalam',
    duration: '4:15 min',
    thumbnail: 'https://ik.imagekit.io/p00v/images/gallery/prewedding/cover-6_related-image.jpg?updatedAt=1792098033560?tr=w-800,q-80,f-auto',
    videoUrl: 'https://youtu.be/rwAxzxpJTxE?si=Z2vfUDzAva1nt2J7',
    description: 'A cinematic wedding trailer capturing ocean cliffside vows and intimate sunset moments in Kerala.'
  },
  {
    id: 'film-2',
    title: 'Whispers of Kovalam Waves',
    couple: 'Aishwarya & Vikram',
    location: 'The Leela Kovalam',
    duration: '5:40 min',
    thumbnail: 'https://ik.imagekit.io/p00v/images/gallery/prewedding/cover-3.jpg?updatedAt=1792098033214?tr=w-800,q-80,f-auto',
    videoUrl: 'https://youtu.be/BFNrUJsoPjc?si=BE6ZaBsjXCPbcvh4',
    description: 'Vibrant marigold celebrations, joyous Baraat dances and heartfelt traditional promises.'
  },
  {
    id: 'film-3',
    title: 'Desert Mirage & Royal Horses',
    couple: 'Beenish & Saad',
    location: 'Al Habtoor Polo Resort, Dubai',
    duration: '3:50 min',
    thumbnail: 'https://ik.imagekit.io/p00v/images/gallery/royal-tamil/Tamil_wedding.jpg?updatedAt=1792099976598?tr=w-1200,q-80,f-auto',
    videoUrl: 'https://youtu.be/oZGAT1t2rcg?si=ajdBvvRMPd8XwoO8',
    description: 'Opulent Dubai pre-wedding film set against golden dunes and twilight architectural grandeur.'
  }
];


export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    reviewby: "Sathiskumar",
    names: "Navya Meriam & Joseph",
    location: "Kochi, Kerala",
    review:
      "An excellent photography service! The whole team are extremely professional. They made our special day even more special and memorable. Down to the initial phone call, their knowledge, to the photography and post production, their customer service was outstanding. I would highly recommend them to all.",
    rating: 5,
    avatar: "https://ik.imagekit.io/p00v/images/testimonials/sathiskumar.jpg?updatedAt=1792098033151?tr=w-1200,q-80,f-jpg",
    weddingDate: "December 2025",
  },
  {
    id: "test-2",
    reviewby: "Haripriya",
    names: "Aishwarya & Vikram",
    location: "Chennai",
    review:
      "Emoze weddings are truly amazing and the outputs really awesome.... Great Team.... Wishing you all the very best for upcoming events",
    rating: 5,
    avatar: "https://ik.imagekit.io/p00v/images/testimonials/Haripriya.jpg?updatedAt=1792098032691?tr=w-1200,q-80,f-jpg",
    weddingDate: "November 2025",
  },
  {
    id: "test-3",
    reviewby: "Ben",
    names: "Rhea & Dev",
    location: "Coimbatore",
    review:
      "First things is Atomsphere of this office almost Makes You a vibe..great choice for wedding and all events!",
    rating: 5,
    avatar: "https://ik.imagekit.io/p00v/images/testimonials/Ben_Human.jpg?updatedAt=1792098032901?tr=w-1200,q-80,f-jpg",
    weddingDate: "January 2026",
  },
];
