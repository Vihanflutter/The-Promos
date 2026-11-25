import { ExternalLink, Play, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { REELS, type ReelItem } from '../data/content';

interface ReelsSectionProps {
  onOpenInquiry: (defaultPackage?: string) => void;
}

export function ReelsSection({ onOpenInquiry }: ReelsSectionProps) {
  const [reels, setReels] = useState<ReelItem[]>(REELS);
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/reels')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { reels?: ReelItem[] } | null) => {
        if (active && Array.isArray(data?.reels) && data.reels.length > 0) {
          setReels(data.reels);
        }
      })
      .catch(() => {
        // Keep static verified defaults on offline/static preview
      });
    return () => {
      active = false;
    };
  }, []);

  // Duplicate list once for seamless continuous marquee loop
  const trackItems = [...reels, ...reels];
  const shouldPause = hoveredKey !== null || selectedReel !== null;

  return (
    <section id="reels" className="py-20 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="mb-9">
          <h2 className="font-display text-[clamp(2rem,3.6vw,2.75rem)] font-extrabold tracking-tight text-[#0D0F14]">
            Our <span className="text-[#E11D35]">reels.</span>
          </h2>
        </div>
      </div>

      {/* Continuous Seamless Auto-Scrolling Carousel (pauses cleanly when hovering any reel card) */}
      <div className="relative w-full">
        {/* Soft horizontal edge fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none hidden sm:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none hidden sm:block absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10"
        />

        <div
          style={{
            animationPlayState: shouldPause ? 'paused' : 'running',
          }}
          className="flex gap-5 w-max animate-reel-marquee py-3 px-5"
        >
          {trackItems.map((reel, index) => {
            const cardKey = `${reel.id}-${index}`;
            const isHovered = hoveredKey === cardKey;
            return (
              <button
                key={cardKey}
                type="button"
                onClick={() => setSelectedReel(reel)}
                onMouseEnter={() => setHoveredKey(cardKey)}
                onMouseLeave={() => setHoveredKey(null)}
                onFocus={() => setHoveredKey(cardKey)}
                onBlur={() => setHoveredKey(null)}
                aria-label={`Play ${reel.title} (${reel.metricBadge})`}
                className={`group/card relative flex-none w-[244px] sm:w-[268px] aspect-[9/16] rounded-2xl overflow-hidden bg-[#14171F] text-left shadow-[0_14px_34px_-18px_rgba(13,15,20,0.45)] cursor-pointer transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E11D35] ${
                  isHovered ? '-translate-y-1.5 shadow-[0_22px_44px_-16px_rgba(225,29,53,0.3)]' : ''
                }`}
              >
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover/card:scale-[1.03] transition-transform duration-300 ease-out"
                />

                {/* Subtle bottom gradient for play button contrast */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
                />

                {/* Views Badge Top-Right */}
                <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/95 text-[#A3152A] text-[12px] font-bold shadow-sm tabular-nums">
                  {reel.metricBadge}
                </span>

                {/* Translucent Play Button Bottom-Left */}
                <span className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-black/55 backdrop-blur-sm border border-white/80 flex items-center justify-center text-white group-hover/card:bg-[#E11D35] group-hover/card:border-[#E11D35] transition-colors duration-200">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Instagram Reel Player Modal */}
      {selectedReel && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reel-modal-title"
          onClick={() => setSelectedReel(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Official Instagram Reel Embed */}
            <div className="md:col-span-6 bg-[#0D0F14] flex items-center justify-center min-h-[420px] md:min-h-[540px]">
              <iframe
                src={`https://www.instagram.com/p/${selectedReel.shortcode}/embed/`}
                title={selectedReel.title}
                className="w-full h-[460px] md:h-[560px] border-0 bg-white"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Right: Reel Metrics & CTA */}
            <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-semibold text-[#A3152A]">
                    {selectedReel.creatorHandle} · {selectedReel.niche}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedReel(null)}
                    aria-label="Close reel modal"
                    className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[#555B66] cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3
                  id="reel-modal-title"
                  className="mt-2 font-display text-xl font-extrabold text-[#0D0F14] leading-snug"
                >
                  {selectedReel.title}
                </h3>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#FFF6F7] border border-[#E11D35]/12 p-3.5">
                    <p className="text-xs text-[#666D7A]">Views</p>
                    <p className="mt-1 font-display text-base font-extrabold text-[#A3152A] tabular-nums">
                      {selectedReel.metricBadge}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#FFF6F7] border border-[#E11D35]/12 p-3.5">
                    <p className="text-xs text-[#666D7A]">Engagement</p>
                    <p className="mt-1 font-display text-sm font-bold text-[#0D0F14] tabular-nums">
                      {selectedReel.likesLabel} · {selectedReel.commentsLabel}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <a
                    href={selectedReel.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#E11D35] hover:text-[#B81429] transition-colors"
                  >
                    Open directly on Instagram
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-black/[0.07]">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedReel(null);
                    onOpenInquiry('Complete Momentum');
                  }}
                  className="w-full py-3 px-5 rounded-full bg-[#E11D35] hover:bg-[#C4162C] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Build Reels Like This
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
