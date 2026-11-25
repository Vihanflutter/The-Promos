import { Eye, Instagram, Play, Star, TrendingUp } from 'lucide-react';
import { type TouchEvent, useCallback, useEffect, useRef, useState } from 'react';
import { FOUNDERS, LOGO_URL } from '../data/content';

interface HeroSectionProps {
  onOpenInquiry: (defaultPackage?: string) => void;
}

export function HeroSection({ onOpenInquiry }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const timerRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number>(0);

  const startAutoSlide = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FOUNDERS.length);
    }, 4500);
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [startAutoSlide]);

  const manualSwitch = (index: number) => {
    setActiveIndex(index);
    startAutoSlide();
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const touchEndX = e.changedTouches[0].screenX;
    const threshold = 50;
    if (touchEndX < touchStartXRef.current - threshold) {
      manualSwitch((activeIndex + 1) % FOUNDERS.length);
    } else if (touchEndX > touchStartXRef.current + threshold) {
      manualSwitch((activeIndex - 1 + FOUNDERS.length) % FOUNDERS.length);
    }
  };

  return (
    <section
      id="top"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseLeave={() => setCursorPos(null)}
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#FFFDFD] to-[#FFF6F7] pt-10 pb-16 sm:pt-14 sm:pb-24"
    >
      {/* Subtle mouse-follow blush ambient light (matches fobetmedia cursor-light) */}
      {cursorPos && (
        <div
          aria-hidden="true"
          style={{ left: cursorPos.x, top: cursorPos.y }}
          className="hidden md:block pointer-events-none absolute w-[320px] h-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(225,29,53,0.085),transparent_70%)] blur-[42px] transition-all duration-100 ease-out z-0"
        />
      )}

      {/* Subtle floating ambient particles */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[12%] top-[72%] w-1.5 h-1.5 rounded-full bg-[#E11D35]/25 animate-float-particle"
      />
      <span
        aria-hidden="true"
        style={{ animationDuration: '12s', animationDelay: '1.5s' }}
        className="pointer-events-none absolute left-[76%] top-[22%] w-1.5 h-1.5 rounded-full bg-[#E11D35]/25 animate-float-particle"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div
              className="hero-fade-in inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FFF2F4] border border-[#E11D35]/15"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="w-5 h-4 overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src={LOGO_URL}
                  alt=""
                  aria-hidden="true"
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 object-cover object-[50%_18%] mix-blend-multiply"
                />
              </span>
              <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#8E1222]">
                The Promos
              </span>
            </div>

            <h1
              className="hero-fade-in font-display text-[clamp(2.5rem,4.6vw,3.9rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#0D0F14] max-w-[14ch] [text-wrap:balance]"
              style={{ animationDelay: '0.2s' }}
            >
              Your expertise deserves an{' '}
              <span className="relative inline-block text-[#E11D35]">
                audience.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 220 14"
                  fill="none"
                  className="absolute -bottom-2 left-0 w-full h-3 overflow-visible"
                >
                  <path
                    d="M2 10.5C58 4.2 146 2.8 218 7.5"
                    stroke="#E11D35"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <div
              className="hero-fade-in space-y-2 text-[16px] sm:text-[17px] leading-[1.6] text-[#4C525E] max-w-[440px]"
              style={{ animationDelay: '0.3s' }}
            >
              <p>Personal branding for founders, educators and creators.</p>
              <p>
                Our team plans, shoots and publishes{' '}
                <span className="font-semibold text-[#0D0F14]">your next reel.</span>
              </p>
            </div>

            <div
              className="hero-fade-in flex flex-wrap items-center gap-3.5 pt-2"
              style={{ animationDelay: '0.4s' }}
            >
              <button
                type="button"
                onClick={() => onOpenInquiry()}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#E11D35] hover:bg-[#C4162C] active:scale-[0.98] text-white text-[15px] font-semibold transition-all duration-150 shadow-[0_10px_24px_-8px_rgba(225,29,53,0.55)] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E11D35]"
              >
                Start Growing Now
              </button>

              <a
                href="#results"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-[#FFF5F6] border border-black/12 text-[#0D0F14] text-[15px] font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E11D35]"
              >
                <Play className="w-3.5 h-3.5 fill-[#0D0F14] text-[#0D0F14]" />
                See Results
              </a>
            </div>
          </div>

          {/* Right Column: Exact Fobet-Style Animated Founder Stage */}
          <div
            className="hero-fade-in lg:col-span-6 flex flex-col items-center cursor-grab active:cursor-grabbing select-none"
            style={{ animationDelay: '0.3s' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Stage Container: Arch is 88% height so transparent founder head pops cleanly above the arch */}
            <div className="relative w-full max-w-[440px] h-[390px] sm:h-[455px] flex items-end justify-center">
              {/* Soft breathing crimson-blush radial glow behind arch */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[45%] left-1/2 w-[340px] h-[340px] rounded-full bg-[radial-gradient(circle,rgba(225,29,53,0.16),transparent_70%)] blur-[60px] animate-orb-pulse z-0"
              />

              {/* Arch Backdrop (88% height, bottom open) */}
              <div
                onClick={() => manualSwitch((activeIndex + 1) % FOUNDERS.length)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    manualSwitch((activeIndex + 1) % FOUNDERS.length);
                  }
                }}
                aria-label={`Switch featured founder. Currently showing ${FOUNDERS[activeIndex].name}`}
                className="absolute bottom-0 w-[300px] sm:w-[370px] h-[87%] rounded-t-[200px] bg-gradient-to-b from-[#FCECEF] via-[#FFF6F7] to-white border border-[#E11D35]/12 border-b-0 z-[1] cursor-pointer"
              />

              {/* Smooth Cross-Fade Founder Slides (exact 0.8s ease-in-out opacity + visibility transition) */}
              <div className="pointer-events-none absolute inset-0 z-[5]">
                {FOUNDERS.map((founder, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div
                      key={founder.id}
                      aria-hidden={!isActive}
                      className={`absolute inset-0 flex items-end justify-center transition-all duration-[800ms] ease-in-out ${
                        isActive ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                    >
                      <img
                        src={founder.image}
                        alt={`${founder.name}, Founder at The Promos`}
                        referrerPolicy="no-referrer"
                        className={`founder-cutout-mask object-contain object-bottom drop-shadow-[0_18px_28px_rgba(13,15,20,0.14)] ${
                          founder.id === 'dr-sapana'
                            ? 'h-[99%] w-auto max-w-[360px] sm:max-w-[400px]'
                            : 'h-[96%] w-auto max-w-[350px] sm:max-w-[390px]'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* SLIDE 0 FLOATING CARDS — Dr. Sapana Agarwal */}
              <div
                style={{ animationDelay: '0.2s' }}
                className={`animate-float-card absolute top-4 -right-1 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_14px_34px_-12px_rgba(13,15,20,0.18)] border border-black/[0.06] items-center gap-2.5 sm:gap-3 z-10 transition-opacity duration-500 ${
                  activeIndex === 0 ? 'flex opacity-100' : 'hidden opacity-0'
                }`}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0 text-white shadow-sm">
                  <Eye className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <div className="font-display text-[15px] sm:text-[17px] font-extrabold text-[#0D0F14] tabular-nums">
                    50M+
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Views
                  </div>
                </div>
              </div>

              <a
                href="https://www.instagram.com/thepromosbyd3/"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow @thepromosbyd3 on Instagram"
                style={{ animationDelay: '1.4s' }}
                className={`animate-float-card absolute left-0 sm:-left-3 top-[55%] w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/95 backdrop-blur-md shadow-[0_12px_28px_-10px_rgba(13,15,20,0.2)] border border-[#E11D35]/15 items-center justify-center text-[#0D0F14] hover:text-[#E11D35] transition-colors z-10 ${
                  activeIndex === 0 ? 'flex' : 'hidden'
                }`}
              >
                <Instagram className="w-5 h-5" />
              </a>

              <div
                style={{ animationDelay: '0.8s' }}
                className={`animate-float-card absolute bottom-4 -left-1 sm:-left-8 bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_16px_38px_-14px_rgba(13,15,20,0.2)] border border-black/[0.06] items-center gap-3 z-10 max-w-[225px] sm:max-w-[245px] ${
                  activeIndex === 0 ? 'flex' : 'hidden'
                }`}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FBBF24] flex items-center justify-center shrink-0 text-[#0D0F14]">
                  <Star className="w-4 h-4 fill-[#0D0F14]" />
                </div>
                <div className="leading-snug min-w-0">
                  <div className="font-display text-[13.5px] sm:text-[14px] font-bold text-[#0D0F14] truncate">
                    Creator
                  </div>
                  <div className="text-[11.5px] sm:text-[12px] text-[#555B66] truncate">
                    Personal Branding Expert
                  </div>
                </div>
              </div>

              {/* SLIDE 1 FLOATING CARDS — Dr. Anshuman Agarwal (kept strictly away from face) */}
              <div
                style={{ animationDelay: '0.3s' }}
                className={`animate-float-card absolute top-4 -right-1 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_14px_34px_-12px_rgba(13,15,20,0.18)] border border-black/[0.06] items-center gap-2.5 sm:gap-3 z-10 ${
                  activeIndex === 1 ? 'flex' : 'hidden'
                }`}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0 text-white shadow-sm">
                  <Eye className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <div className="font-display text-[15px] sm:text-[17px] font-extrabold text-[#0D0F14] tabular-nums">
                    50M+
                  </div>
                  <div className="text-[11px] sm:text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Views
                  </div>
                </div>
              </div>

              <a
                href="https://www.instagram.com/thepromosbyd3/"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow @thepromosbyd3 on Instagram"
                style={{ animationDelay: '1.5s' }}
                className={`animate-float-card absolute right-0 sm:-right-3 top-[56%] w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/95 backdrop-blur-md shadow-[0_12px_28px_-10px_rgba(13,15,20,0.2)] border border-[#E11D35]/15 items-center justify-center text-[#0D0F14] hover:text-[#E11D35] transition-colors z-10 ${
                  activeIndex === 1 ? 'flex' : 'hidden'
                }`}
              >
                <Instagram className="w-5 h-5" />
              </a>

              <div
                style={{ animationDelay: '0.9s' }}
                className={`animate-float-card absolute bottom-4 -left-1 sm:-left-8 bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_16px_38px_-14px_rgba(13,15,20,0.2)] border border-black/[0.06] items-center gap-3 z-10 max-w-[225px] sm:max-w-[245px] ${
                  activeIndex === 1 ? 'flex' : 'hidden'
                }`}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E11D35] flex items-center justify-center shrink-0 text-white shadow-sm">
                  <Star className="w-4 h-4 fill-white" />
                </div>
                <div className="leading-snug min-w-0">
                  <div className="font-display text-[13.5px] sm:text-[14px] font-bold text-[#0D0F14] truncate">
                    Educator &amp; MD
                  </div>
                  <div className="text-[11.5px] sm:text-[12px] text-[#555B66] truncate">
                    Personal Branding Expert
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Info Vertical Slide Transition (matches fobet .info-slide 0.5s ease) */}
            <div className="relative mt-4 w-full h-[58px] text-center">
              {FOUNDERS.map((founder, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={founder.id}
                    aria-hidden={!isActive}
                    className={`absolute inset-x-0 top-0 transition-all duration-500 ease-out ${
                      isActive
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 translate-y-2.5 pointer-events-none'
                    }`}
                  >
                    <div className="inline-block px-2 py-0.5 rounded bg-black/[0.06] text-[10px] font-bold tracking-[0.14em] uppercase text-[#4C525E]">
                      {founder.roleBadge}
                    </div>
                    <p className="mt-1 font-display text-[21px] font-bold tracking-tight text-[#0D0F14]">
                      {founder.name}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Interactive Slider Dots */}
            <div
              className="mt-2 flex items-center justify-center gap-3 z-20"
              role="tablist"
              aria-label="Featured founders"
            >
              {FOUNDERS.map((founder, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={founder.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Show ${founder.name}`}
                    onClick={() => manualSwitch(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E11D35] ${
                      isActive
                        ? 'bg-[#E11D35] scale-125 shadow-[0_0_10px_rgba(225,29,53,0.45)]'
                        : 'bg-black/20 hover:bg-black/35'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
