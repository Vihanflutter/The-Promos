import { ArrowUpRight, Eye, Instagram, Play, Star, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { type TouchEvent, useCallback, useEffect, useRef, useState } from 'react';
import { FOUNDERS, LOGO_URL } from '../data/content';
import { EASE_EDITORIAL } from './MotionPrimitives';

interface HeroSectionProps {
  onOpenInquiry: (defaultPackage?: string) => void;
}

export function HeroSection({ onOpenInquiry }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
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
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !cursorGlowRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        cursorGlowRef.current.style.opacity = '1';
        cursorGlowRef.current.style.transform = `translate3d(${e.clientX - rect.left}px, ${e.clientY - rect.top}px, 0) translate(-50%, -50%)`;
      }}
      onPointerLeave={() => {
        if (cursorGlowRef.current) cursorGlowRef.current.style.opacity = '0';
      }}
      className="relative overflow-hidden bg-gradient-to-b from-[#FCFBF9] via-[#FFFCFC] to-[#FFF4F6] pt-12 pb-20 sm:pt-16 sm:pb-28 art-paper-grain"
    >
      {/* Subtle architectural gallery lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.38]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(13,15,20,0.09) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 75% 75% at 68% 45%, black 10%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 75% at 68% 45%, black 10%, transparent 100%)',
        }}
      />

      {/* Organic painterly blush ribbon behind stage */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 540"
        fill="none"
        className="pointer-events-none absolute -right-24 top-6 w-[860px] max-w-none opacity-65 z-0"
      >
        <motion.path
          d="M110 470C285 380 410 120 670 110C875 102 990 250 1160 190"
          stroke="url(#heroArtRibbon)"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: EASE_EDITORIAL }}
        />
        <motion.path
          d="M40 430C250 320 420 55 720 68C930 78 1030 220 1190 155"
          stroke="url(#heroArtRibbonSoft)"
          strokeWidth="44"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.16 }}
          transition={{ duration: 1.7, delay: 0.12, ease: EASE_EDITORIAL }}
        />
        <defs>
          <linearGradient id="heroArtRibbon" x1="110" y1="470" x2="1160" y2="190" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E11D35" stopOpacity="0" />
            <stop offset="0.45" stopColor="#E11D35" stopOpacity="0.4" />
            <stop offset="1" stopColor="#FF7A59" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroArtRibbonSoft" x1="40" y1="430" x2="1190" y2="155" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FCECEF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#E11D35" stopOpacity="0.35" />
            <stop offset="1" stopColor="#FCECEF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Subtle desktop-only mouse-follow blush ambient light (zero React re-renders) */}
      <div
        ref={cursorGlowRef}
        aria-hidden="true"
        className="hidden md:block pointer-events-none absolute top-0 left-0 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(225,29,53,0.085)_0%,rgba(225,29,53,0.025)_42%,transparent_72%)] opacity-0 transition-opacity duration-200 will-change-transform z-0"
      />

      {/* Subtle floating ambient particles */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[10%] top-[74%] w-1.5 h-1.5 rounded-full bg-[#E11D35]/30 animate-float-particle"
      />
      <span
        aria-hidden="true"
        style={{ animationDuration: '12s', animationDelay: '1.5s' }}
        className="pointer-events-none absolute left-[76%] top-[20%] w-2 h-2 rounded-full border border-[#E11D35]/35 animate-float-particle"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Artistic Editorial Value Proposition & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            {/* Unboxed editorial studio signature */}
            <div
              className="hero-fade-in inline-flex items-center gap-3 text-[12.5px] font-semibold text-[#555B66]"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="w-5 h-4 overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src={LOGO_URL}
                  alt=""
                  aria-hidden="true"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 object-cover object-[50%_18%] mix-blend-multiply"
                />
              </span>
              <span className="text-[#0D0F14] font-bold tracking-tight">The Promos</span>
              <span aria-hidden="true" className="text-[#E11D35]">/</span>
              <span>Personal Branding Studio</span>
            </div>

            <h1
              className="hero-fade-in font-display text-[clamp(2.65rem,4.9vw,4.25rem)] font-extrabold leading-[1.03] tracking-[-0.038em] text-[#0D0F14] max-w-[13ch] [text-wrap:balance]"
              style={{ animationDelay: '0.2s' }}
            >
              Your expertise deserves an{' '}
              <span className="relative inline-block font-editorial italic font-semibold text-[#E11D35] tracking-[-0.02em] pr-1">
                audience.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 240 16"
                  fill="none"
                  className="absolute -bottom-2 left-0 w-full h-3.5 overflow-visible"
                >
                  <motion.path
                    d="M3 11.5C64 4.2 158 2.4 236 8.2"
                    stroke="#E11D35"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.4, ease: EASE_EDITORIAL }}
                  />
                  <motion.path
                    d="M38 14.2C102 10.6 168 9.6 218 11.8"
                    stroke="#E11D35"
                    strokeWidth="1.2"
                    strokeOpacity="0.45"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.65, ease: EASE_EDITORIAL }}
                  />
                </svg>
              </span>
            </h1>

            <div
              className="hero-fade-in space-y-2 text-[16px] sm:text-[17.5px] leading-[1.65] text-[#4C525E] max-w-[460px]"
              style={{ animationDelay: '0.3s' }}
            >
              <p>Personal branding for founders, educators and creators.</p>
              <p>
                Our team plans, shoots and publishes{' '}
                <span className="font-editorial italic font-medium text-[#0D0F14] text-[18.5px]">
                  your next reel.
                </span>
              </p>
            </div>

            <div
              className="hero-fade-in flex flex-wrap items-center gap-4 pt-2"
              style={{ animationDelay: '0.4s' }}
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                onClick={() => onOpenInquiry()}
                className="btn-sheen group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#E11D35] hover:bg-[#C4162C] text-white text-[15px] font-semibold transition-colors duration-200 shadow-[0_14px_30px_-10px_rgba(225,29,53,0.6)] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E11D35]"
              >
                <span>Start Growing Now</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>

              <motion.a
                href="#results"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white border border-[#0D0F14]/12 hover:border-[#E11D35]/35 text-[#0D0F14] text-[15px] font-semibold transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E11D35]"
              >
                <Play className="w-3.5 h-3.5 fill-[#E11D35] text-[#E11D35]" />
                See Results
              </motion.a>
            </div>
          </div>

          {/* Right Column: Sculpted Gallery-Arch Animated Founder Stage */}
          <div
            className="hero-fade-in lg:col-span-6 flex flex-col items-center cursor-grab active:cursor-grabbing select-none"
            style={{ animationDelay: '0.3s' }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Stage Container: Arch is 87% height so transparent founder head pops cleanly above the arch */}
            <div className="relative w-full max-w-[450px] h-[395px] sm:h-[465px] flex items-end justify-center">
              {/* Soft breathing crimson-blush radial glow behind arch */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[45%] left-1/2 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(225,29,53,0.14)_0%,rgba(225,29,53,0.04)_44%,transparent_72%)] animate-orb-pulse z-0"
              />

              {/* Outer Artistic Hairline Gallery Arch Halo */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 w-[322px] sm:w-[394px] h-[91%] rounded-t-[210px] border border-dashed border-[#E11D35]/20 border-b-0 z-0"
              />

              {/* Primary Arch Backdrop (87% height, bottom open) */}
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
                className="absolute bottom-0 w-[300px] sm:w-[370px] h-[87%] rounded-t-[200px] bg-gradient-to-b from-[#FCECEF] via-[#FFF6F7] to-[#FCFBF9] border border-[#E11D35]/15 border-b-0 shadow-[inset_0_24px_50px_-24px_rgba(225,29,53,0.18)] z-[1] cursor-pointer"
              />

              {/* Smooth Cross-Fade Founder Slides */}
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
                        loading="eager"
                        decoding="async"
                        fetchPriority={idx === 0 ? 'high' : 'auto'}
                        referrerPolicy="no-referrer"
                        className={`founder-cutout-mask object-contain object-bottom drop-shadow-[0_20px_30px_rgba(13,15,20,0.14)] ${
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
                className={`animate-float-card absolute top-4 -right-1 sm:-right-6 bg-white md:bg-white/95 md:backdrop-blur-md rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_18px_40px_-14px_rgba(13,15,20,0.16)] border border-[#0D0F14]/[0.07] items-center gap-2.5 sm:gap-3 z-10 transition-opacity duration-500 ${
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
                className={`animate-float-card absolute left-0 sm:-left-3 top-[55%] w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white md:bg-white/95 md:backdrop-blur-md shadow-[0_14px_30px_-10px_rgba(13,15,20,0.18)] border border-[#E11D35]/18 items-center justify-center text-[#0D0F14] hover:text-[#E11D35] hover:border-[#E11D35]/40 transition-colors z-10 ${
                  activeIndex === 0 ? 'flex' : 'hidden'
                }`}
              >
                <Instagram className="w-5 h-5" />
              </a>

              <div
                style={{ animationDelay: '0.8s' }}
                className={`animate-float-card absolute bottom-4 -left-1 sm:-left-8 bg-white md:bg-white/95 md:backdrop-blur-md rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_18px_40px_-14px_rgba(13,15,20,0.18)] border border-[#0D0F14]/[0.07] items-center gap-3 z-10 max-w-[225px] sm:max-w-[245px] ${
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

              {/* SLIDE 1 FLOATING CARDS — Dr. Anshuman Agarwal (strictly clear of face) */}
              <div
                style={{ animationDelay: '0.3s' }}
                className={`animate-float-card absolute top-4 -right-1 sm:-right-6 bg-white md:bg-white/95 md:backdrop-blur-md rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_18px_40px_-14px_rgba(13,15,20,0.16)] border border-[#0D0F14]/[0.07] items-center gap-2.5 sm:gap-3 z-10 ${
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
                className={`animate-float-card absolute right-0 sm:-right-3 top-[56%] w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white md:bg-white/95 md:backdrop-blur-md shadow-[0_14px_30px_-10px_rgba(13,15,20,0.18)] border border-[#E11D35]/18 items-center justify-center text-[#0D0F14] hover:text-[#E11D35] hover:border-[#E11D35]/40 transition-colors z-10 ${
                  activeIndex === 1 ? 'flex' : 'hidden'
                }`}
              >
                <Instagram className="w-5 h-5" />
              </a>

              <div
                style={{ animationDelay: '0.9s' }}
                className={`animate-float-card absolute bottom-4 -left-1 sm:-left-8 bg-white md:bg-white/95 md:backdrop-blur-md rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_18px_40px_-14px_rgba(13,15,20,0.18)] border border-[#0D0F14]/[0.07] items-center gap-3 z-10 max-w-[225px] sm:max-w-[245px] ${
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

            {/* Founder Info Vertical Slide Transition */}
            <div className="relative mt-5 w-full h-[60px] text-center">
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
                    <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#E11D35]">
                      {founder.roleBadge}
                    </p>
                    <p className="mt-0.5 font-editorial italic text-[24px] font-medium tracking-tight text-[#0D0F14]">
                      {founder.name}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Interactive Slider Dots */}
            <div
              className="mt-2.5 flex items-center justify-center gap-3 z-20"
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
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E11D35] ${
                      isActive
                        ? 'w-7 bg-[#E11D35] shadow-[0_0_10px_rgba(225,29,53,0.45)]'
                        : 'w-2 bg-[#0D0F14]/20 hover:bg-[#0D0F14]/40'
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
