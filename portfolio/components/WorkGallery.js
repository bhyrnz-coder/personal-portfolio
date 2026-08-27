'use client';

import { useState } from 'react';
import VideoLightbox from './VideoLightbox';

// Replace embedUrl with your real YouTube/Vimeo embed links,
// e.g. 'https://www.youtube.com/embed/VIDEO_ID'
const VIDEOS = [
  {
    id: 'v1',
    title: 'Brand Story — Origin',
    span: 'md:col-span-2 md:row-span-2',
    embedUrl: '',
  },
  {
    id: 'v2',
    title: 'Client Testimonial',
    span: 'md:col-span-1 md:row-span-2',
    embedUrl: '',
  },
  {
    id: 'v3',
    title: 'Portrait Painting Reel',
    span: 'md:col-span-1 md:row-span-2',
    embedUrl: '',
  },
  {
    id: 'v4',
    title: 'Quick Tip: Just Practice',
    span: 'md:col-span-1 md:row-span-1',
    embedUrl: '',
  },
  {
    id: 'v5',
    title: 'Precision Color Grading',
    span: 'md:col-span-1 md:row-span-1',
    embedUrl: '',
  },
  {
    id: 'v6',
    title: 'Editing Takes Time',
    span: 'md:col-span-1 md:row-span-1',
    embedUrl: '',
  },
  {
    id: 'v7',
    title: 'Behind the Scenes',
    span: 'md:col-span-1 md:row-span-1',
    embedUrl: '',
  },
];

// Replace src with your real exported Figma frames/images in /public
const GRAPHICS = [
  { id: 'g1', title: 'App Onboarding Screens', src: '' },
  { id: 'g2', title: 'Social Media Kit', src: '' },
  { id: 'g3', title: 'Logo & Brand Marks', src: '' },
  { id: 'g4', title: 'Landing Page Design', src: '' },
  { id: 'g5', title: 'Poster Series', src: '' },
  { id: 'g6', title: 'UI Component Set', src: '' },
];

function VideoTile({ video, onPlay }) {
  return (
    <button
      onClick={() => onPlay(video)}
      className={`group relative overflow-hidden bg-panel text-left w-full h-full min-h-[160px] ${video.span}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 group-hover:opacity-80 transition-opacity" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="w-12 h-12 rounded-full bg-paper/90 flex items-center justify-center text-ink text-lg group-hover:bg-accent group-hover:text-paper transition-colors">
          ▶
        </span>
      </div>
      <span className="absolute bottom-3 left-3 right-3 text-xs font-medium text-paper/90 line-clamp-2">
        {video.title}
      </span>
    </button>
  );
}

function GraphicTile({ item }) {
  return (
    <div className="relative overflow-hidden bg-panel w-full aspect-[4/3] flex items-center justify-center">
      {item.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-muted text-xs font-sans px-4 text-center">
          Add image for &ldquo;{item.title}&rdquo;
        </span>
      )}
      <span className="absolute bottom-3 left-3 right-3 text-xs font-medium text-paper/90">
        {item.title}
      </span>
    </div>
  );
}

export default function WorkGallery() {
  const [view, setView] = useState('videos');
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="work" className="flex-1 px-6 py-12 lg:py-16 lg:pr-10">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setView('videos')}
          className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
            view === 'videos'
              ? 'bg-accent border-accent text-paper'
              : 'border-paper/20 text-paper/60 hover:text-paper hover:border-paper/50'
          }`}
        >
          Videos
        </button>
        <button
          onClick={() => setView('graphics')}
          className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
            view === 'graphics'
              ? 'bg-accent border-accent text-paper'
              : 'border-paper/20 text-paper/60 hover:text-paper hover:border-paper/50'
          }`}
        >
          Graphics
        </button>
      </div>

      {view === 'videos' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[160px] gap-3 animate-fade-up">
          {VIDEOS.map((video) => (
            <VideoTile key={video.id} video={video} onPlay={setActiveVideo} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 animate-fade-up">
          {GRAPHICS.map((item) => (
            <GraphicTile key={item.id} item={item} />
          ))}
        </div>
      )}

      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}
