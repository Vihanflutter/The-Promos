import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { REELS, type ReelItem } from '../data/content';
import { Reveal } from './MotionPrimitives';

interface ReelsSectionProps {
  onOpenInquiry?: (defaultPackage?: string) => void;
}

export function ReelsSection(_props: ReelsSectionProps) {
  const [reels, setReels] = useState<ReelItem[]>(REELS);
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // GitHub Pages is static; retain the existing local reel data there.
    if (import.meta.env.PROD && window.location.hostname.endsWith('.github.io')) return;
    let active = true;
    fetch('/api/reels')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { reels?: ReelItem[] } | null) => {
        if (active && Array.isArray(data?.reels) && data.reels.length > 0) {
          setReels(
            data.reels.map((item) => ({
              ...item,
              thumbnail: `${import.meta.env.BASE_URL}assets/reels/${item.shortcode}.jpg`,
            }))
          );
        }
      })
      .catch(() => {
        // Keep static verified defaults on offline/static preview
      });
    return () => {
      active = false;
    };
  }, []);

  // Ensure the active inline video starts playing immediately with sound on click
  useEffect(() => {
    const vid = videoRef.current;
    if (!playingKey || !vid) return;
    setProgress(0);
    vid.currentTime = 0;
    vid.muted = isMuted;
    const playPromise = vid.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Fallback to muted playback if browser autoplay policy blocks unmuted play
        vid.muted = true;
        setIsMuted(true);
        void vid.play();
      });
    }
  }, [playingKey]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Duplicate list once for seamless continuous marquee loop
  const trackItems = [...reels, ...reels];
  const shouldPause = hoveredKey !== null || playingKey !== null;

  const handleTogglePlay = (cardKey: string) => {
    if (playingKey === cardKey) {
      setPlayingKey(null);
      setProgress(0);
    } else {
      setPlayingKey(cardKey);
    }
  };

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

      {/* Continuous Seamless Auto-Scrolling Carousel (pauses cleanly when hovering or playing any reel) */}
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
            const isPlaying = playingKey === cardKey;
            const videoSrc = `${import.meta.env.BASE_URL}assets/reels/${reel.shortcode}.mp4`;

            return (
              <div
                key={cardKey}
                role="button"
                tabIndex={0}
                onClick={() => handleTogglePlay(cardKey)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleTogglePlay(cardKey);
                  }
                }}
                onMouseEnter={() => setHoveredKey(cardKey)}
                onMouseLeave={() => setHoveredKey(null)}
                onFocus={() => setHoveredKey(cardKey)}
                onBlur={() => setHoveredKey(null)}
                aria-label={
                  isPlaying
                    ? `Pause ${reel.title}`
                    : `Play ${reel.title} (${reel.metricBadge})`
                }
                className={`group/card relative flex-none w-[246px] sm:w-[272px] aspect-[9/16] rounded-[24px] overflow-hidden bg-[#0D0F14] text-left ring-1 ring-black/10 shadow-[0_18px_42px_-20px_rgba(13,15,20,0.42)] cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E11D35] ${
                  isPlaying
                    ? '-translate-y-2.5 scale-[1.03] shadow-[0_30px_64px_-16px_rgba(225,29,53,0.42)] ring-2 ring-[#E11D35]/70 z-20'
                    : isHovered
                      ? '-translate-y-2.5 scale-[1.015] shadow-[0_28px_58px_-18px_rgba(225,29,53,0.36)] ring-[#E11D35]/45'
                      : ''
                }`}
              >
                {isPlaying ? (
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    poster={reel.thumbnail}
                    playsInline
                    loop
                    muted={isMuted}
                    onTimeUpdate={(e) => {
                      const el = e.currentTarget;
                      if (el.duration > 0) {
                        setProgress((el.currentTime / el.duration) * 100);
                      }
                    }}
                    className="w-full h-full object-cover object-center bg-[#0D0F14]"
                  />
                ) : (
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover/card:scale-[1.05] transition-transform duration-500 ease-out"
                  />
                )}

                {/* Subtle bottom vignette (fades gently when video is playing) */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/30 to-transparent transition-opacity duration-300 ${
                    isPlaying ? 'opacity-60' : 'opacity-100'
                  }`}
                />

                {/* Views Badge Top-Right */}
                <span className="pointer-events-none absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#A3152A] text-[12px] font-bold shadow-[0_6px_18px_rgba(0,0,0,0.2)] tabular-nums">
                  {reel.metricBadge}
                </span>

                {/* Mute / Unmute Control Top-Left (only while playing) */}
                {isPlaying && (
                  <button
                    type="button"
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMuted((prev) => !prev);
                    }}
                    className="absolute top-3.5 left-3.5 w-8 h-8 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
                  >
                    {isMuted ? (
                      <VolumeX className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}

                {/* Sculpted Play / Pause Control Bottom-Left */}
                <span
                  className={`absolute bottom-4 left-4 w-11 h-11 rounded-full backdrop-blur-md border flex items-center justify-center text-white transition-all duration-200 ${
                    isPlaying
                      ? 'bg-[#E11D35]/90 border-[#E11D35] opacity-90 group-hover/card:opacity-100'
                      : 'bg-black/50 border-white/80 group-hover/card:bg-[#E11D35] group-hover/card:border-[#E11D35] group-hover/card:scale-110'
                  }`}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  )}
                </span>

                {/* Sleek Crimson Playback Progress Bar along bottom edge while playing */}
                {isPlaying && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-white/20"
                  >
                    <div
                      style={{ width: `${progress}%` }}
                      className="h-full bg-gradient-to-r from-[#E11D35] to-[#FF6B4A] transition-[width] duration-150 linear"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
