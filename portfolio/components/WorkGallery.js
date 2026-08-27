'use client';

import { useCallback, useMemo, useState } from 'react';
import VideoLightbox from './VideoLightbox';
import GraphicLightbox from './GraphicLightbox';

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

const GRAPHICS = [
  {
    id: 'g1',
    title: 'Show Hair Loss Who\'s Boss',
    category: 'Meta Ads',
    src: '/graphics/meta-hair-loss-boss.webp',
  },
  {
    id: 'g2',
    title: 'A Gift They Will Love to Wear',
    category: 'Meta Ads',
    src: '/graphics/meta-yodeyma-gift.webp',
  },
  {
    id: 'g3',
    title: 'Conquer Easy Mode',
    category: 'Amazon / E-commerce',
    src: '/graphics/amazon-conquer-easy-mode.webp',
  },
  {
    id: 'g4',
    title: 'Bank Holiday Glow Up',
    category: 'Meta Ads',
    src: '/graphics/meta-bank-holiday-glow.webp',
  },
  {
    id: 'g5',
    title: 'The Daily Routine',
    category: 'Amazon / E-commerce',
    src: '/graphics/amazon-daily-routine.webp',
  },
  {
    id: 'g6',
    title: 'Same Genes. Different Hairline.',
    category: 'Meta Ads',
    src: '/graphics/meta-same-genes-hairline.webp',
  },
  {
    id: 'g7',
    title: 'Before Collagen: Undead',
    category: 'Meta Ads',
    src: '/graphics/meta-collagen-undead.webp',
  },
  {
    id: 'g8',
    title: 'Full Transparency',
    category: 'Amazon / E-commerce',
    src: '/graphics/amazon-full-transparency.webp',
  },
  {
    id: 'g9',
    title: 'The Retainer Cleaner Editors Actually Use',
    category: 'Meta Ads',
    src: '/graphics/meta-retainer-cleaner.webp',
  },
  {
    id: 'g10',
    title: 'The Countdown to Calm Has Begun',
    category: 'Meta Ads',
    src: '/graphics/meta-comshep-countdown.webp',
  },
  {
    id: 'g11',
    title: 'Become Self Obsessed',
    category: 'Amazon / E-commerce',
    src: '/graphics/amazon-become-self-obsessed.webp',
  },
  {
    id: 'g12',
    title: 'Compliments Without Breaking the Bank',
    category: 'Meta Ads',
    src: '/graphics/meta-compliments-bank.webp',
  },
  {
    id: 'g13',
    title: 'This Is What 8 Hours Feels Like',
    category: 'Meta Ads',
    src: '/graphics/meta-sleep-eight-hours.webp',
  },
  {
    id: 'g14',
    title: 'Best Tasting Mushroom & Adaptogen Blend',
    category: 'Meta Ads',
    src: '/graphics/meta-adaptogen-blend.webp',
  },
  {
    id: 'g15',
    title: 'Every Dose. Built to Get Used.',
    category: 'Meta Ads',
    src: '/graphics/meta-every-dose.webp',
  },
  {
    id: 'g16',
    title: 'The Race Is Won at Station Five',
    category: 'Meta Ads',
    src: '/graphics/meta-race-station-five.webp',
  },
];

const GRAPHIC_CATEGORIES = ['All', 'Meta Ads', 'Amazon / E-commerce'];

function VideoTile({ video, onPlay }) {
  return (
    <button
      type="button"
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

function GraphicTile({ item, index, onOpen }) {
  const featured = index === 0 || index === 5;

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={`group relative overflow-hidden bg-panel text-left w-full ${
        featured ? 'sm:col-span-2' : ''
      }`}
      aria-label={`View ${item.title}`}
    >
      <div className={featured ? 'aspect-[16/9]' : 'aspect-[4/5]'}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 pt-16 pb-4 px-4 bg-gradient-to-t from-black/90 via-black/45 to-transparent">
        <span className="block text-[10px] uppercase tracking-[0.16em] text-accent font-medium mb-1">
          {item.category}
        </span>
        <span className="block text-sm font-medium text-paper line-clamp-2">
          {item.title}
        </span>
      </div>

      <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/55 border border-paper/15 text-paper/80 flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
        ↗
      </span>
    </button>
  );
}

export default function WorkGallery() {
  const [view, setView] = useState('videos');
  const [activeVideo, setActiveVideo] = useState(null);
  const [graphicCategory, setGraphicCategory] = useState('All');
  const [activeGraphic, setActiveGraphic] = useState(null);

  const filteredGraphics = useMemo(() => {
    if (graphicCategory === 'All') return GRAPHICS;
    return GRAPHICS.filter((item) => item.category === graphicCategory);
  }, [graphicCategory]);

  const navigateGraphic = useCallback(
    (direction) => {
      if (!activeGraphic || filteredGraphics.length < 2) return;
      const currentIndex = filteredGraphics.findIndex(
        (item) => item.id === activeGraphic.id
      );
      const nextIndex =
        (currentIndex + direction + filteredGraphics.length) %
        filteredGraphics.length;
      setActiveGraphic(filteredGraphics[nextIndex]);
    },
    [activeGraphic, filteredGraphics]
  );

  function changeGraphicCategory(category) {
    setGraphicCategory(category);
    setActiveGraphic(null);
  }

  return (
    <section id="work" className="flex-1 px-6 py-12 lg:py-16 lg:pr-10 min-w-0">
      <div className="flex items-center gap-3 mb-8">
        <button
          type="button"
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
          type="button"
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
        <div className="animate-fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <p className="font-hand text-accent text-xl leading-none mb-2">
                Selected graphic work
              </p>
              <p className="text-xs sm:text-sm text-paper/50 max-w-xl leading-relaxed">
                A curated mix of paid-social advertising and e-commerce design.
                Click any piece to view it in full.
              </p>
            </div>
            <span className="text-xs text-paper/35 tabular-nums shrink-0">
              {filteredGraphics.length} pieces
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-5" aria-label="Graphic categories">
            {GRAPHIC_CATEGORIES.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => changeGraphicCategory(category)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                  graphicCategory === category
                    ? 'bg-paper text-ink border-paper'
                    : 'border-paper/15 text-paper/50 hover:text-paper hover:border-paper/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {filteredGraphics.map((item, index) => (
              <GraphicTile
                key={item.id}
                item={item}
                index={index}
                onOpen={setActiveGraphic}
              />
            ))}
          </div>
        </div>
      )}

      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
      <GraphicLightbox
        item={activeGraphic}
        items={filteredGraphics}
        onClose={() => setActiveGraphic(null)}
        onNavigate={navigateGraphic}
      />
    </section>
  );
}
