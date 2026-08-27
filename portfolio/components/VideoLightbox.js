'use client';

import { useEffect, useRef, useState } from 'react';

function embedUrl(youtubeId) {
  const params = new URLSearchParams({
    autoplay: '1',
    controls: '0',
    rel: '0',
    playsinline: '1',
    enablejsapi: '1',
    fs: '0',
    iv_load_policy: '3',
    disablekb: '1',
    modestbranding: '1',
  });

  return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`;
}

export default function VideoLightbox({ video, videos, onClose, onNavigate }) {
  const iframeRef = useRef(null);
  const playerFrameRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!video) return undefined;

    setIsPlaying(true);
    setIsMuted(false);

    function handleKey(event) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onNavigate(-1);
      if (event.key === 'ArrowRight') onNavigate(1);
      if (event.key === ' ') {
        event.preventDefault();
        setIsPlaying((current) => {
          sendCommand(current ? 'pauseVideo' : 'playVideo');
          return !current;
        });
      }
    }

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
    // togglePlayback always sends its command to the current iframe ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video, onClose, onNavigate]);

  if (!video) return null;

  const currentIndex = videos.findIndex((item) => item.id === video.id);
  const isPortrait = video.orientation === 'portrait';

  function sendCommand(command) {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: command, args: [] }),
      '*'
    );
  }

  function togglePlayback() {
    setIsPlaying((current) => {
      sendCommand(current ? 'pauseVideo' : 'playVideo');
      return !current;
    });
  }

  function toggleMute() {
    if (isMuted) {
      sendCommand('unMute');
      setIsMuted(false);
    } else {
      sendCommand('mute');
      setIsMuted(true);
    }
  }

  async function enterFullscreen() {
    try {
      await playerFrameRef.current?.requestFullscreen?.();
    } catch {
      // Some mobile browsers do not support element fullscreen.
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
      onContextMenu={(event) => event.preventDefault()}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio video player"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 w-10 h-10 rounded-full bg-black/70 border border-paper/20 text-paper/80 hover:text-paper hover:border-paper/50 text-2xl leading-none"
        aria-label="Close video"
      >
        ×
      </button>

      {videos.length > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate(-1);
            }}
            className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 border border-paper/20 text-paper hover:text-accent hover:border-accent transition-colors"
            aria-label="Previous video"
          >
            ←
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate(1);
            }}
            className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 border border-paper/20 text-paper hover:text-accent hover:border-accent transition-colors"
            aria-label="Next video"
          >
            →
          </button>
        </>
      )}

      <div
        className="flex flex-col items-center gap-3 max-w-full max-h-full"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          ref={playerFrameRef}
          className={`relative bg-black overflow-hidden shadow-2xl ${
            isPortrait
              ? 'h-[78vh] max-h-[780px] aspect-[9/16] max-w-[82vw]'
              : 'w-[min(88vw,1100px)] aspect-video max-h-[78vh]'
          }`}
        >
          <iframe
            key={video.id}
            ref={iframeRef}
            src={embedUrl(video.youtubeId)}
            title="Portfolio video player"
            className="absolute inset-0 w-full h-full pointer-events-none"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            onLoad={() => sendCommand('playVideo')}
          />

          {/* Pointer interaction is disabled on the YouTube iframe so viewers
              cannot click through to YouTube from the portfolio player. */}
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-paper/10" />
        </div>

        <div className="flex items-center justify-center gap-2" aria-label="Video controls">
          <button
            type="button"
            onClick={togglePlayback}
            className="min-w-[88px] px-4 py-2 rounded-full border border-paper/20 bg-black/55 text-paper/80 text-xs hover:border-paper/50 hover:text-paper transition-colors"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className="min-w-[88px] px-4 py-2 rounded-full border border-paper/20 bg-black/55 text-paper/80 text-xs hover:border-paper/50 hover:text-paper transition-colors"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
          <button
            type="button"
            onClick={enterFullscreen}
            className="hidden sm:block min-w-[88px] px-4 py-2 rounded-full border border-paper/20 bg-black/55 text-paper/80 text-xs hover:border-paper/50 hover:text-paper transition-colors"
            aria-label="View video fullscreen"
          >
            Fullscreen
          </button>
        </div>

        <span className="text-[10px] text-paper/35 tabular-nums">
          {currentIndex + 1} / {videos.length}
        </span>
      </div>
    </div>
  );
}
