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
        className="relative max-w-4xl w-full bg-surface border border-brand shadow-2xl rounded overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-navy text-white px-4 py-2.5 flex items-center justify-between border-b border-saffron">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-saffron text-lg">image</span>
            <span className="text-xs font-bold uppercase tracking-wider">{imageAlt}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
              className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded transition-colors cursor-pointer"
              title="Zoom Out"
            >
              -
            </button>
            <span className="text-[11px] font-mono">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
              className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded transition-colors cursor-pointer"
              title="Zoom In"
            >
              +
            </button>
            <button
              onClick={onClose}
              className="ml-2 text-white/80 hover:text-white p-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
              title="Close Preview"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Modal Image Area */}
        <div className="p-4 md:p-8 bg-subtle flex items-center justify-center overflow-auto max-h-[75vh]">
          <img
            src={imageSrc}
            alt={imageAlt}
            style={{ transform: `scale(${zoomLevel})` }}
            className="max-h-[60vh] w-auto object-contain transition-transform duration-200 shadow-md rounded border border-subtle"
          />
        </div>

        {/* Modal Footer / Caption */}
        {caption && (
          <div className="bg-surface border-t border-subtle px-4 py-2.5 text-xs text-secondary flex items-center justify-between">
            <span>{caption}</span>
          </div>
        )}
      </div>
    </div>
  );
};
