'use client';

import { useEffect } from 'react';

export default function VideoLightbox({ video, onClose }) {
  useEffect(() => {
    if (!video) return undefined;

    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-paper/80 hover:text-accent text-3xl leading-none"
        aria-label="Close video"
      >
        ×
      </button>

      <div
        className="w-full max-w-3xl aspect-video bg-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {video.embedUrl ? (
          <iframe
            src={video.embedUrl}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-sm font-sans px-6 text-center">
            Add a YouTube/Vimeo embed URL for &ldquo;{video.title}&rdquo; in
            components/WorkGallery.js
          </div>
        )}
      </div>
    </div>
  );
}
