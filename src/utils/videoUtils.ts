import { useState, useEffect } from 'react';

/**
 * Video Utilities for YouTube & Vimeo Integration
 * 
 * - Automatically converts ANY YouTube URL format into an embeddable iframe URL
 * - Automatically calculates and displays YouTube video duration from any URL
 * - Supports watch URLs, youtu.be short links, Shorts, embed URLs, and raw IDs
 */

export const extractYouTubeId = (url: string): string | null => {
  if (!url) return null;
  const trimmed = url.trim();

  // If it's already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Matches:
  // - youtube.com/watch?v=VIDEO_ID
  // - youtube.com/embed/VIDEO_ID
  // - youtube.com/v/VIDEO_ID
  // - youtube.com/shorts/VIDEO_ID
  // - youtu.be/VIDEO_ID
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = trimmed.match(regExp);

  return match && match[1] ? match[1] : null;
};

export const getEmbedVideoUrl = (url: string, autoplay: boolean = true): string => {
  if (!url) return '';
  const trimmed = url.trim();

  // 1. Check YouTube
  const youtubeId = extractYouTubeId(trimmed);
  if (youtubeId) {
    const autoplayParam = autoplay ? 'autoplay=1&mute=0' : 'autoplay=0';
    return `https://www.youtube.com/embed/${youtubeId}?${autoplayParam}&enablejsapi=1&rel=0&modestbranding=1`;
  }

  // 2. Check Vimeo
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/);
  if (vimeoMatch && vimeoMatch[3]) {
    return `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=${autoplay ? 1 : 0}&title=0&byline=0`;
  }

  // If already an embed link (e.g. cloudfront or external player)
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  return trimmed;
};

/**
 * Gets high-quality thumbnail automatically from YouTube if available
 */
export const getYouTubeThumbnail = (url: string): string => {
  const videoId = extractYouTubeId(url);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  return '';
};

// Client memory cache for calculated video durations
const clientDurationCache = new Map<string, string>();

/**
 * Automatically fetches YouTube video metadata and calculated duration
 */
export const fetchYouTubeDuration = async (urlOrId: string): Promise<string | null> => {
  const videoId = extractYouTubeId(urlOrId);
  if (!videoId) return null;

  // 1. Check in-memory cache
  if (clientDurationCache.has(videoId)) {
    return clientDurationCache.get(videoId)!;
  }

  // 2. Check browser sessionStorage
  try {
    const stored = sessionStorage.getItem(`yt_dur_${videoId}`);
    if (stored) {
      clientDurationCache.set(videoId, stored);
      return stored;
    }
  } catch {
    // sessionStorage unavailable
  }

  // 3. Call backend endpoint to fetch & calculate duration
  try {
    const res = await fetch(`/api/youtube-info?id=${encodeURIComponent(videoId)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.duration && data.duration !== 'Cinematic Film') {
        clientDurationCache.set(videoId, data.duration);
        try {
          sessionStorage.setItem(`yt_dur_${videoId}`, data.duration);
        } catch {
          // ignore storage error
        }
        return data.duration;
      }
    }
  } catch {
    // backend network issue
  }

  return null;
};

/**
 * React Hook to automatically get and update YouTube video duration
 */
export const useYouTubeDuration = (videoUrl?: string, defaultDuration?: string): string => {
  const [duration, setDuration] = useState<string>(() => {
    if (!videoUrl) return defaultDuration || 'Cinematic Film';
    const id = extractYouTubeId(videoUrl);
    if (id && clientDurationCache.has(id)) {
      return clientDurationCache.get(id)!;
    }
    return defaultDuration || 'Cinematic Film';
  });

  useEffect(() => {
    if (!videoUrl) return;
    const id = extractYouTubeId(videoUrl);
    if (!id) return;

    if (clientDurationCache.has(id)) {
      setDuration(clientDurationCache.get(id)!);
      return;
    }

    let isMounted = true;
    fetchYouTubeDuration(videoUrl).then((fetchedDuration) => {
      if (isMounted && fetchedDuration) {
        setDuration(fetchedDuration);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [videoUrl]);

  return duration;
};

/**
 * React Hook to batch resolve calculated durations for a list of films
 */
export const useBatchYouTubeDurations = (
  items: Array<{ id: string; videoUrl: string; duration?: string }>
): Record<string, string> => {
  const [durationsMap, setDurationsMap] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const item of items) {
      const id = extractYouTubeId(item.videoUrl);
      if (id && clientDurationCache.has(id)) {
        initial[item.id] = clientDurationCache.get(id)!;
      } else if (item.duration) {
        initial[item.id] = item.duration;
      }
    }
    return initial;
  });

  useEffect(() => {
    let isMounted = true;

    items.forEach((item) => {
      if (!item.videoUrl) return;
      fetchYouTubeDuration(item.videoUrl).then((calculatedDuration) => {
        if (isMounted && calculatedDuration) {
          setDurationsMap((prev) => {
            if (prev[item.id] === calculatedDuration) return prev;
            return {
              ...prev,
              [item.id]: calculatedDuration,
            };
          });
        }
      });
    });

    return () => {
      isMounted = false;
    };
  }, [items]);

  return durationsMap;
};
