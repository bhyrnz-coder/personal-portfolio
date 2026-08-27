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
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="shrink-0 flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-paper/10">
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-accent font-medium">
            {item.category}
          </p>
          <h2 className="mt-1 text-sm sm:text-base font-medium text-paper truncate">
            {item.title}
          </h2>
        </div>

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
        className="relative flex-1 min-h-0 flex items-center justify-center p-4 sm:p-8 lg:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        {hasMultiple && (
          <button
            type="button"
            onClick={() => onNavigate(-1)}
            className="absolute left-3 sm:left-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/65 border border-paper/20 text-paper text-xl hover:border-accent hover:text-accent transition-colors"
            aria-label="Previous graphic"
          >
            ←
          </button>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.title}
          className="max-w-full max-h-full object-contain shadow-2xl"
        />

        {hasMultiple && (
          <button
            type="button"
            onClick={() => onNavigate(1)}
            className="absolute right-3 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/65 border border-paper/20 text-paper text-xl hover:border-accent hover:text-accent transition-colors"
            aria-label="Next graphic"
          >
            →
          </button>
        )}
      </div>

      <div className="sm:hidden shrink-0 text-center text-[11px] text-paper/45 pb-4 tabular-nums">
        {currentIndex + 1} / {items.length} · Swipe with arrows
      </div>
    </div>
  );
}
