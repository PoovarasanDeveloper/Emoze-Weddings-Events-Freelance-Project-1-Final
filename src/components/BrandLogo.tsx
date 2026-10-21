import React from 'react';
import defaultBrandLogo from './Emoze_logo.svg';

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
  width,
  height,
  onClick,
}) => {
 
  const sizeClasses: Record<BrandLogoSize, { imgH: string; maxW: string }> = {
    header: {
      imgH: 'h-8.5 min-[360px]:h-9 min-[400px]:h-10 sm:h-10 md:h-11 lg:h-12 xl:h-[52px]',
      maxW: 'max-w-[140px] min-[360px]:max-w-[155px] min-[400px]:max-w-[175px] sm:max-w-[190px] md:max-w-[210px] lg:max-w-[230px]',
    },
    footer: {
      imgH: 'h-10 min-[380px]:h-11 min-[480px]:h-12 sm:h-12 md:h-13 lg:h-14 xl:h-16',
      maxW: 'max-w-[180px] min-[380px]:max-w-[200px] min-[480px]:max-w-[220px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px]',
    },
    'square-177': {
      imgH: 'h-11 sm:h-12 md:h-13 lg:h-15',
      maxW: 'max-w-[220px]',
    },
    xs: {
      imgH: 'h-6 sm:h-7',
      maxW: 'max-w-[100px]',
    },
    sm: {
      imgH: 'h-8 sm:h-8.5 md:h-9',
      maxW: 'max-w-[130px]',
    },
    md: {
      imgH: 'h-9.5 min-[360px]:h-10 sm:h-10.5 md:h-11 lg:h-12',
      maxW: 'max-w-[180px]',
    },
    lg: {
      imgH: 'h-11 sm:h-12 md:h-13 lg:h-15',
      maxW: 'max-w-[220px]',
    },
    xl: {
      imgH: 'h-13 sm:h-15 md:h-17 lg:h-20',
      maxW: 'max-w-[280px]',
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

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

  const customStyle: React.CSSProperties = {
    ...(width ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
  };

  const hasExplicitDimensions = Boolean(width || height);

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
          style={customStyle}
          className={`${
            hasExplicitDimensions
              ? 'object-contain max-h-full max-w-full w-auto'
              : `${currentSize.imgH} ${currentSize.maxW} w-auto object-contain`
          } p-0 m-0 transition-transform duration-300 ${
            onClick ? 'group-hover:scale-105' : ''
          }`}
        />
      </div>
    </div>
  );
};
