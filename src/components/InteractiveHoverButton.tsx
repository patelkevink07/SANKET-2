import React, { useState } from 'react';

interface InteractiveHoverButtonProps {
  id?: string;
  label?: string;
  sublabel?: string;
  icon?: string;
  variant?: 'primary' | 'saffron' | 'emerald' | 'amber';
  onClick?: () => void;
  className?: string;
}

export const InteractiveHoverButton: React.FC<InteractiveHoverButtonProps> = ({
  id,
  label = 'Interactive Intelligence Sandbox',
  sublabel,
  icon = 'auto_fix_high',
  variant = 'primary',
  onClick,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [clickEffect, setClickEffect] = useState(false);

  const handleClick = () => {
    setClickEffect(true);
    setTimeout(() => setClickEffect(false), 400);
    if (onClick) {
      onClick();
    }
  };

  // Color transitions on hover
  // Default: Sovereign Navy -> Vibrant Saffron/Orange with scale and opacity
  const getStyleClasses = () => {
    switch (variant) {
      case 'saffron':
        return 'bg-saffron hover:bg-brand text-white border-saffron hover:border-brand shadow-sm hover:shadow-md';
      case 'emerald':
        return 'bg-green hover:bg-navy text-white border-green hover:border-navy shadow-sm hover:shadow-md';
      case 'amber':
        return 'bg-[#d97706] hover:bg-headline text-white border-[#d97706] hover:border-headline shadow-sm hover:shadow-md';
      case 'primary':
      default:
        return 'bg-brand hover:bg-saffron text-white border-navy hover:border-saffron-hover shadow-sm hover:shadow-lg';
    }
  };

  return (
    <button
      id={id}
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group overflow-hidden px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 border cursor-pointer ${getStyleClasses()} ${
        clickEffect ? 'ring-4 ring-saffron/40' : ''
      } ${className}`}
      title={label}
    >
      {/* Background color morph glow layer */}
      <span
        className={`absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      />

      {/* Icon with micro-rotation/scale on hover */}
      <span
        className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${
          isHovered ? 'scale-125 rotate-12' : 'scale-100 rotate-0'
        }`}
      >
        {icon}
      </span>

      <span className="relative z-10 font-bold whitespace-nowrap">{label}</span>

      {sublabel && (
        <span className="text-[10px] font-normal lowercase opacity-80 pl-1 border-l border-white/30 hidden sm:inline">
          {sublabel}
        </span>
      )}
    </button>
  );
};
