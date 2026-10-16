import React from 'react';
import defaultBrandLogo from './Brandlogo.png';

export type BrandLogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'header' | 'footer' | 'square-177';

interface BrandLogoProps {
  size?: BrandLogoSize;
  variant?: 'light' | 'dark' | 'gold' | 'white';
  showSubtitle?: boolean;
  className?: string;
  imageSrc?: string;
  isSquare?: boolean;
  width?: number | string;
  height?: number | string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'light',
  className = '',
  imageSrc,
  isSquare = false,
  width,
  height,
  onClick,
}) => {
  // Comprehensive responsive size mappings across ALL devices:
  // Mobile phones (<640px), Tablets (640-1024px), Laptops (1024-1440px),
  // Computer Monitors (1440-1920px), and Large TV / 4K Displays (>1920px).
  // Zero artificial margins/paddings, maximizing visibility and clarity on mobile screens.
  const sizeClasses: Record<BrandLogoSize, { imgH: string; maxW: string; isSquarePreset?: boolean }> = {
    // Specifically tailored for square logo dimensions (like 177x177 px)
    'square-177': {
      imgH: 'w-[150px] h-[150px] xs:w-[165px] xs:h-[165px] sm:w-[177px] sm:h-[177px] aspect-square',
      maxW: 'max-w-[177px] max-h-[177px]',
      isSquarePreset: true,
    },
    // Specifically tailored for Header: maximum prominence on mobile phones while fitting cleanly between CTA buttons,
    // scaling smoothly through tablets, laptops, computer monitors, and large TVs
    header: {
      imgH: 'h-8.5 min-[360px]:h-9 min-[400px]:h-10 sm:h-10 md:h-10 lg:h-11 xl:h-12 2xl:h-14 min-[1920px]:h-16 min-[2560px]:h-20',
      maxW: 'max-w-[130px] min-[360px]:max-w-[145px] min-[400px]:max-w-[165px] sm:max-w-[180px] md:max-w-[195px] lg:max-w-[220px] xl:max-w-[245px] 2xl:max-w-[280px] min-[1920px]:max-w-[340px] min-[2560px]:max-w-[420px]',
    },
    // Specifically tailored for Footer: large, bold & readable on mobile, expanding gracefully to wide monitors & TVs
    footer: {
      imgH: 'h-10 min-[380px]:h-11 min-[480px]:h-12 sm:h-12 md:h-13 lg:h-14 xl:h-16 2xl:h-18 min-[1920px]:h-22 min-[2560px]:h-28',
      maxW: 'max-w-[170px] min-[380px]:max-w-[195px] min-[480px]:max-w-[220px] sm:max-w-[230px] md:max-w-[250px] lg:max-w-[280px] xl:max-w-[310px] 2xl:max-w-[360px] min-[1920px]:max-w-[440px] min-[2560px]:max-w-[540px]',
    },
    xs: {
      imgH: 'h-5 min-[380px]:h-5.5 sm:h-6 md:h-7 lg:h-7.5 2xl:h-8 min-[1920px]:h-9',
      maxW: 'max-w-[80px] min-[380px]:max-w-[95px] sm:max-w-[110px] md:max-w-[125px] 2xl:max-w-[150px] min-[1920px]:max-w-[175px]',
    },
    sm: {
      imgH: 'h-7.5 min-[360px]:h-8 min-[420px]:h-8.5 sm:h-9 md:h-9.5 lg:h-10 2xl:h-11 min-[1920px]:h-13',
      maxW: 'max-w-[115px] min-[360px]:max-w-[130px] min-[420px]:max-w-[145px] sm:max-w-[160px] md:max-w-[175px] lg:max-w-[190px] 2xl:max-w-[220px] min-[1920px]:max-w-[260px]',
    },
    md: {
      imgH: 'h-8.5 min-[360px]:h-9 min-[400px]:h-10 sm:h-10 md:h-11 lg:h-12 xl:h-13 2xl:h-15 min-[1920px]:h-18 min-[2560px]:h-22',
      maxW: 'max-w-[130px] min-[360px]:max-w-[150px] min-[400px]:max-w-[170px] sm:max-w-[185px] md:max-w-[205px] lg:max-w-[230px] xl:max-w-[255px] 2xl:max-w-[290px] min-[1920px]:max-w-[360px] min-[2560px]:max-w-[440px]',
    },
    lg: {
      imgH: 'h-10 min-[380px]:h-11 sm:h-12 md:h-13 lg:h-14 xl:h-16 2xl:h-18 min-[1920px]:h-22 min-[2560px]:h-26',
      maxW: 'max-w-[165px] min-[380px]:max-w-[190px] sm:max-w-[215px] md:max-w-[245px] lg:max-w-[275px] xl:max-w-[310px] 2xl:max-w-[360px] min-[1920px]:max-w-[440px] min-[2560px]:max-w-[520px]',
    },
    xl: {
      imgH: 'h-12 min-[380px]:h-14 sm:h-16 md:h-18 lg:h-20 xl:h-24 2xl:h-28 min-[1920px]:h-32 min-[2560px]:h-36',
      maxW: 'max-w-[200px] min-[380px]:max-w-[240px] sm:max-w-[275px] md:max-w-[320px] lg:max-w-[370px] xl:max-w-[420px] 2xl:max-w-[480px] min-[1920px]:max-w-[560px] min-[2560px]:max-w-[640px]',
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const isSquareMode = isSquare || size === 'square-177' || currentSize.isSquarePreset;

  const colorStyles = {
    light: {
      filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.35))',
    },
    white: {
      filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.45))',
    },
    dark: {
      filter: 'none',
    },
    gold: {
      filter: 'drop-shadow(0 2px 8px rgba(189,156,122,0.25))',
    },
  };

  const currentColor = colorStyles[variant] || colorStyles.light;
  const activeLogo = imageSrc || defaultBrandLogo;

  const targetWidth = width;
  const targetHeight = height;

  let logoDimensionsClass = `${currentSize.imgH} ${currentSize.maxW} w-auto`;

  if (isSquareMode) {
    if (size === 'header') {
      logoDimensionsClass = 'h-10 w-10 xs:h-11 xs:w-11 sm:h-12 sm:w-12 md:h-13 md:w-13 aspect-square max-h-full max-w-full';
    } else if (size === 'footer') {
      logoDimensionsClass = 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 aspect-square max-h-full max-w-full';
    } else {
      logoDimensionsClass = 'w-[130px] h-[130px] xs:w-[150px] xs:h-[150px] sm:w-[177px] sm:h-[177px] max-w-[177px] max-h-[177px] aspect-square';
    }
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center p-0 m-0 select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
      style={{ filter: currentColor.filter }}
    >
      <div className="relative flex items-center justify-center p-0 m-0">
        <img
          src={activeLogo}
          alt="Brand Logo"
          width={typeof targetWidth === 'number' ? targetWidth : undefined}
          height={typeof targetHeight === 'number' ? targetHeight : undefined}
          className={`${logoDimensionsClass} object-contain p-0 m-0 transition-transform duration-300 ${
            onClick ? 'group-hover:scale-105' : ''
          }`}
        />
      </div>
    </div>
  );
};
