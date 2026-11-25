import { ExternalLink, Play, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { REELS, type ReelItem } from '../data/content';
import { EASE_EDITORIAL, Reveal } from './MotionPrimitives';

interface ReelsSectionProps {
  onOpenInquiry: (defaultPackage?: string) => void;
}

export function ReelsSection({ onOpenInquiry }: ReelsSectionProps) {
  const [reels, setReels] = useState<ReelItem[]>(REELS);
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  useEffect(() => {
    // GitHub Pages is static; retain the existing local reel data there.
    if (import.meta.env.PROD && window.location.hostname.endsWith('.github.io')) return;
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
    <section
      id="reels"
      className="py-22 sm:py-28 bg-white border-t border-[#0D0F14]/[0.05] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <Reveal className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.16em] uppercase text-[#8E1222]">
              <span className="w-7 h-px bg-[#E11D35]" aria-hidden="true" />
              <span>Selected Showreel</span>
            </div>
            <h2 className="mt-3 font-display text-[clamp(2.1rem,3.8vw,3.1rem)] font-extrabold tracking-[-0.03em] text-[#0D0F14] leading-none">
              Our{' '}
              <span className="font-editorial italic font-semibold text-[#E11D35]">reels.</span>
            </h2>
          </div>

          <p className="text-[13.5px] text-[#666D7A]">
            Hover any reel to pause · Click to play
          </p>
        </Reveal>
      </div>

      {/* Continuous Seamless Auto-Scrolling Carousel (pauses cleanly when hovering any reel card) */}
      <Reveal delay={0.08} y={20} className="relative w-full">
        {/* Soft horizontal edge fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none hidden sm:block absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white via-white/75 to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none hidden sm:block absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white via-white/75 to-transparent z-10"
        />

        <div
          style={{
            animationPlayState: shouldPause ? 'paused' : 'running',
          }}
          className="flex gap-6 w-max animate-reel-marquee py-4 px-5"
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
                className={`group/card relative flex-none w-[246px] sm:w-[272px] aspect-[9/16] rounded-[24px] overflow-hidden bg-[#14171F] text-left ring-1 ring-black/10 shadow-[0_18px_42px_-20px_rgba(13,15,20,0.42)] cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E11D35] ${
                  isHovered
                    ? '-translate-y-2.5 scale-[1.015] shadow-[0_28px_58px_-18px_rgba(225,29,53,0.36)] ring-[#E11D35]/45'
                    : ''
                }`}
              >
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover/card:scale-[1.05] transition-transform duration-500 ease-out"
                />

                {/* Subtle cinema bottom vignette */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/30 to-transparent"
                />

                {/* Views Badge Top-Right */}
                <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#A3152A] text-[12px] font-bold shadow-[0_6px_18px_rgba(0,0,0,0.2)] tabular-nums">
                  {reel.metricBadge}
                </span>

                {/* Sculpted Play Button Bottom-Left */}
                <span className="absolute bottom-4 left-4 w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/80 flex items-center justify-center text-white group-hover/card:bg-[#E11D35] group-hover/card:border-[#E11D35] group-hover/card:scale-110 transition-all duration-200">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Interactive Instagram Reel Player Modal with Smooth Spring AnimatePresence */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reel-modal-title"
            onClick={() => setSelectedReel(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 14 }}
              transition={{ duration: 0.32, ease: EASE_EDITORIAL }}
              className="bg-[#FCFBF9] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[92vh]"
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
              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
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
                    <div className="rounded-2xl bg-white border border-[#0D0F14]/[0.08] p-4">
                      <p className="text-xs text-[#666D7A]">Views</p>
                      <p className="mt-1 font-editorial italic text-xl font-semibold text-[#C4162C] tabular-nums">
                        {selectedReel.metricBadge}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white border border-[#0D0F14]/[0.08] p-4">
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
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedReel(null);
                      onOpenInquiry('Complete Momentum');
                    }}
                    className="btn-sheen w-full py-3.5 px-5 rounded-full bg-[#E11D35] hover:bg-[#C4162C] text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Build Reels Like This
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
