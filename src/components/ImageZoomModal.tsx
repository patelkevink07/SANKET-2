import React, { useState } from 'react';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  caption?: string;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  caption
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Preview"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white border border-[#001e40] shadow-2xl rounded overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#001e40] text-white px-4 py-2.5 flex items-center justify-between border-b border-[#fe6500]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fe6500] text-lg">image</span>
            <span className="text-xs font-bold uppercase tracking-wider">{imageAlt}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
              className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded transition-colors"
              title="Zoom Out"
            >
              -
            </button>
            <span className="text-[11px] font-mono">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
              className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded transition-colors"
              title="Zoom In"
            >
              +
            </button>
            <button
              onClick={onClose}
              className="ml-2 text-white/80 hover:text-white p-1 hover:bg-white/10 rounded transition-colors"
              title="Close Preview"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Modal Image Area */}
        <div className="p-4 md:p-8 bg-[#f5f5f5] flex items-center justify-center overflow-auto max-h-[75vh]">
          <img
            src={imageSrc}
            alt={imageAlt}
            style={{ transform: `scale(${zoomLevel})` }}
            className="max-h-[60vh] w-auto object-contain transition-transform duration-200 shadow-md rounded border border-[#e2e2e2]"
          />
        </div>

        {/* Modal Footer / Caption */}
        {caption && (
          <div className="bg-[#f9f9f9] border-t border-[#e2e2e2] px-4 py-2.5 text-xs text-[#43474f] flex items-center justify-between">
            <span>{caption}</span>
            <span className="text-[10px] text-[#737780] font-mono">SANKET High-Resolution Intelligence Asset</span>
          </div>
        )}
      </div>
    </div>
  );
};
