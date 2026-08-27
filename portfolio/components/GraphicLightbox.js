'use client';

import { useEffect } from 'react';

export default function GraphicLightbox({ item, items, onClose, onNavigate }) {
  useEffect(() => {
    if (!item) return undefined;

    function handleKey(event) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onNavigate(-1);
      if (event.key === 'ArrowRight') onNavigate(1);
    }

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose, onNavigate]);

  if (!item) return null;

  const currentIndex = items.findIndex((graphic) => graphic.id === item.id);
  const hasMultiple = items.length > 1;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
      onClick={onClose}
      onContextMenu={(event) => event.preventDefault()}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="shrink-0 flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-paper/10">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-accent font-medium">
          {item.category}
        </p>

        <div className="flex items-center gap-4 shrink-0">
          <span className="hidden sm:block text-xs text-paper/45 tabular-nums">
            {currentIndex + 1} / {items.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-paper/20 text-paper/80 hover:text-paper hover:border-paper/50 transition-colors text-2xl leading-none"
            aria-label="Close graphic"
          >
            ×
          </button>
        </div>
      </div>

      <div
        className="relative flex-1 min-h-0 overflow-y-auto px-4 sm:px-8 lg:px-14 py-6 sm:py-8"
        onClick={(event) => event.stopPropagation()}
        onContextMenu={(event) => event.preventDefault()}
      >
        {hasMultiple && (
          <button
            type="button"
            onClick={() => onNavigate(-1)}
            className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/65 border border-paper/20 text-paper text-xl hover:border-accent hover:text-accent transition-colors"
            aria-label="Previous graphic"
          >
            ←
          </button>
        )}

        <div className="min-h-full flex items-start justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt={item.title}
            draggable={false}
            className="protected-media pointer-events-none block max-w-full sm:max-w-[88%] lg:max-w-[78%] h-auto shadow-2xl"
          />
        </div>

        {hasMultiple && (
          <button
            type="button"
            onClick={() => onNavigate(1)}
            className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/65 border border-paper/20 text-paper text-xl hover:border-accent hover:text-accent transition-colors"
            aria-label="Next graphic"
          >
            →
          </button>
        )}
      </div>

      <div className="sm:hidden shrink-0 text-center text-[11px] text-paper/45 pb-4 tabular-nums">
        {currentIndex + 1} / {items.length}
      </div>
    </div>
  );
}
