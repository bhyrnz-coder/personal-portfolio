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

const META_ADS = Array.from({ length: 55 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0');
  return {
    id: `meta-${number}`,
    title: `Meta ad design ${index + 1}`,
    category: 'Meta Ads',
    src: `/graphics/meta-ad-${number}.webp`,
    type: 'meta',
  };
});

const AMAZON_LISTING_IMAGES = Array.from({ length: 8 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0');
  return {
    id: `amazon-listing-${number}`,
    title: `Amazon listing image ${index + 1}`,
    category: 'Amazon Listing Images',
    src: `/graphics/amazon-listing-${number}.webp`,
    type: 'amazon-listing',
  };
});

const AMAZON_APLUS = Array.from({ length: 2 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0');
  return {
    id: `amazon-aplus-${number}`,
    title: `Amazon listing design ${index + 1}`,
    category: 'Amazon Listing Images',
    src: `/graphics/amazon-aplus-${number}.webp`,
    type: 'amazon-aplus',
  };
});

const ALL_GRAPHICS = [...META_ADS, ...AMAZON_LISTING_IMAGES, ...AMAZON_APLUS];
const GRAPHIC_CATEGORIES = ['All', 'Meta Ads', 'Amazon Listing Images'];

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

function MetaTile({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group relative block w-full mb-3 break-inside-avoid overflow-hidden bg-panel"
      aria-label={`View ${item.title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.title}
        loading="lazy"
        className="block w-full h-auto transition-transform duration-500 group-hover:scale-[1.015]"
      />
      <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/55 border border-paper/15 text-paper/80 flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
        ↗
      </span>
    </button>
  );
}

function AmazonPreviewTile({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group relative block w-full overflow-hidden bg-panel"
      aria-label={`View ${item.title}`}
    >
      <div className="aspect-[4/5] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
        />
      </div>
      <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/55 border border-paper/15 text-paper/80 flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
        ↗
      </span>
    </button>
  );
}

function AmazonListingCarousel({ items, onOpen }) {
  const [index, setIndex] = useState(0);
  const item = items[index];

  function previous(event) {
    event.stopPropagation();
    setIndex((current) => (current - 1 + items.length) % items.length);
  }

  function next(event) {
    event.stopPropagation();
    setIndex((current) => (current + 1) % items.length);
  }

  return (
    <div className="relative w-full bg-panel overflow-hidden">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="group block w-full"
        aria-label={`View ${item.title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.title}
          loading="lazy"
          className="block w-full h-auto"
        />
        <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/55 border border-paper/15 text-paper/80 flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
          ↗
        </span>
      </button>

      <button
        type="button"
        onClick={previous}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 border border-paper/20 text-paper hover:border-accent hover:text-accent transition-colors"
        aria-label="Previous Amazon listing image"
      >
        ←
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 border border-paper/20 text-paper hover:border-accent hover:text-accent transition-colors"
        aria-label="Next Amazon listing image"
      >
        →
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-2">
        {items.map((slide, slideIndex) => (
          <button
            type="button"
            key={slide.id}
            onClick={(event) => {
              event.stopPropagation();
              setIndex(slideIndex);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              index === slideIndex ? 'bg-paper scale-125' : 'bg-paper/35 hover:bg-paper/65'
            }`}
            aria-label={`Show Amazon listing image ${slideIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function WorkGallery() {
  const [view, setView] = useState('videos');
  const [activeVideo, setActiveVideo] = useState(null);
  const [graphicCategory, setGraphicCategory] = useState('All');
  const [activeGraphic, setActiveGraphic] = useState(null);

  const lightboxItems = useMemo(() => {
    if (graphicCategory === 'Meta Ads') return META_ADS;
    if (graphicCategory === 'Amazon Listing Images') {
      return [...AMAZON_LISTING_IMAGES, ...AMAZON_APLUS];
    }
    return ALL_GRAPHICS;
  }, [graphicCategory]);

  const navigateGraphic = useCallback(
    (direction) => {
      if (!activeGraphic || lightboxItems.length < 2) return;
      const currentIndex = lightboxItems.findIndex(
        (item) => item.id === activeGraphic.id
      );
      const nextIndex =
        (currentIndex + direction + lightboxItems.length) % lightboxItems.length;
      setActiveGraphic(lightboxItems[nextIndex]);
    },
    [activeGraphic, lightboxItems]
  );

  function changeGraphicCategory(category) {
    setGraphicCategory(category);
    setActiveGraphic(null);
  }

  const showMeta = graphicCategory === 'All' || graphicCategory === 'Meta Ads';
  const showAmazon = graphicCategory === 'All' || graphicCategory === 'Amazon Listing Images';

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

          {showMeta && (
            <div className="columns-1 sm:columns-2 xl:columns-3 gap-3">
              {META_ADS.map((item) => (
                <MetaTile key={item.id} item={item} onOpen={setActiveGraphic} />
              ))}
            </div>
          )}

          {showAmazon && (
            <div className={showMeta ? 'mt-8' : ''}>
              <AmazonListingCarousel
                items={AMAZON_LISTING_IMAGES}
                onOpen={setActiveGraphic}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {AMAZON_APLUS.map((item) => (
                  <AmazonPreviewTile
                    key={item.id}
                    item={item}
                    onOpen={setActiveGraphic}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
      <GraphicLightbox
        item={activeGraphic}
        items={lightboxItems}
        onClose={() => setActiveGraphic(null)}
        onNavigate={navigateGraphic}
      />
    </section>
  );
}
