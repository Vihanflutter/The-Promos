import { Sprout, TrendingUp, Zap } from 'lucide-react';
import { type CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const LEFT_PATH_D =
  'M 105 555 C 235 550, 315 527, 405 480 C 505 428, 565 359, 625 286 C 675 225, 716 178, 750 150';
const RIGHT_PATH_D =
  'M 1395 555 C 1265 550, 1185 527, 1095 480 C 995 428, 935 359, 875 286 C 825 225, 784 178, 750 150';
const MOUNTAIN_BODY_D =
  'M 105 555 C 235 550, 315 527, 405 480 C 505 428, 565 359, 625 286 C 675 225, 716 178, 750 150 C 784 178, 825 225, 875 286 C 935 359, 995 428, 1095 480 C 1185 527, 1265 550, 1395 555 L 1395 660 L 105 660 Z';

const DURATION_MS = 3800;
const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

interface BurstDot {
  tx: string;
  ty: string;
  dur: string;
  size: number;
  color: string;
}

export function GrowthPeakSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const leftPathRef = useRef<SVGPathElement>(null);
  const rightPathRef = useRef<SVGPathElement>(null);
  const leftRunnerRef = useRef<HTMLSpanElement>(null);
  const rightRunnerRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);
  const boomTimerRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false);

  const [step24Visible, setStep24Visible] = useState(false);
  const [step62Visible, setStep62Visible] = useState(false);
  const [isBoom, setIsBoom] = useState(false);
  const [boomCycle, setBoomCycle] = useState(0);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  // Deterministic radial burst particles tuned for crisp visibility on light white/blush surface
  const burstDots = useMemo<BurstDot[]>(() => {
    const palette = ['#E11D35', '#FF4D6D', '#FF6B4A', '#9F1239', '#FB7185'];
    return Array.from({ length: 42 }, (_, i) => {
      const angle = (i / 42) * Math.PI * 2 + (i % 3) * 0.08;
      const dist = 68 + ((i * 37) % 135);
      return {
        tx: `${Math.round(Math.cos(angle) * dist)}px`,
        ty: `${Math.round(Math.sin(angle) * dist)}px`,
        dur: `${(0.75 + ((i * 19) % 60) / 100).toFixed(2)}s`,
        size: i % 3 === 0 ? 5 : 3.5,
        color: palette[i % palette.length],
      };
    });
  }, []);

  const getStagePoint = useCallback((pathEl: SVGPathElement, progress: number) => {
    const svg = svgRef.current;
    const stage = stageRef.current;
    if (!svg || !stage) return null;
    const total = pathEl.getTotalLength();
    const pt = pathEl.getPointAtLength(total * progress);
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const svgPt = svg.createSVGPoint();
    svgPt.x = pt.x;
    svgPt.y = pt.y;
    const screenPt = svgPt.matrixTransform(ctm);
    const stageRect = stage.getBoundingClientRect();
    return {
      x: screenPt.x - stageRect.left,
      y: screenPt.y - stageRect.top,
    };
  }, []);

  const runAnimation = useCallback(() => {
    const leftPath = leftPathRef.current;
    const rightPath = rightPathRef.current;
    const leftRunner = leftRunnerRef.current;
    const rightRunner = rightRunnerRef.current;
    if (!leftPath || !rightPath || !leftRunner || !rightRunner) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (boomTimerRef.current) window.clearTimeout(boomTimerRef.current);

    const leftLen = leftPath.getTotalLength();
    const rightLen = rightPath.getTotalLength();

    leftPath.style.strokeDasharray = `${leftLen}`;
    leftPath.style.strokeDashoffset = `${leftLen}`;
    leftPath.style.opacity = '1';

    rightPath.style.strokeDasharray = `${rightLen}`;
    rightPath.style.strokeDashoffset = `${rightLen}`;
    rightPath.style.opacity = '1';

    setStep24Visible(false);
    setStep62Visible(false);
    setIsBoom(false);

    // Honor prefers-reduced-motion cleanly
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      leftPath.style.strokeDashoffset = '0';
      rightPath.style.strokeDashoffset = '0';
      leftRunner.style.opacity = '0';
      rightRunner.style.opacity = '0';
      setStep24Visible(true);
      setStep62Visible(true);
      setIsBoom(true);
      setBoomCycle((c) => c + 1);
      return;
    }

    leftRunner.style.opacity = '1';
    rightRunner.style.opacity = '1';

    const startTime = performance.now();
    let triggered24 = false;
    let triggered62 = false;

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 2.15);

      leftPath.style.strokeDashoffset = `${leftLen * (1 - eased)}`;
      rightPath.style.strokeDashoffset = `${rightLen * (1 - eased)}`;

      const lPos = getStagePoint(leftPath, eased);
      const rPos = getStagePoint(rightPath, eased);

      if (lPos) {
        leftRunner.style.left = `${lPos.x}px`;
        leftRunner.style.top = `${lPos.y}px`;
      }
      if (rPos) {
        rightRunner.style.left = `${rPos.x}px`;
        rightRunner.style.top = `${rPos.y}px`;
      }

      if (!triggered24 && eased >= 0.24) {
        triggered24 = true;
        setStep24Visible(true);
      }
      if (!triggered62 && eased >= 0.62) {
        triggered62 = true;
        setStep62Visible(true);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        boomTimerRef.current = window.setTimeout(() => {
          leftRunner.style.opacity = '0';
          rightRunner.style.opacity = '0';
          setIsBoom(true);
          setBoomCycle((c) => c + 1);
        }, 90);
      }
    };

    rafRef.current = requestAnimationFrame(frame);
  }, [getStagePoint]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasStartedRef.current) {
            hasStartedRef.current = true;
            runAnimation();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.24 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (boomTimerRef.current) window.clearTimeout(boomTimerRef.current);
    };
  }, [runAnimation]);

  return (
    <section
      ref={sectionRef}
      id="growth"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseLeave={() => setCursorPos(null)}
      className="relative overflow-hidden bg-gradient-to-b from-[#FFF7F8] via-white to-[#FFF5F6] text-[#0D0F14] py-20 sm:py-28 border-t border-black/[0.06]"
    >
      {/* Subtle mouse-follow blush ambient light */}
      {cursorPos && (
        <div
          aria-hidden="true"
          style={{ left: cursorPos.x, top: cursorPos.y }}
          className="hidden md:block pointer-events-none absolute w-[360px] h-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(225,29,53,0.09),transparent_70%)] blur-[50px] z-0"
        />
      )}

      {/* Subtle top-left rose corner ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -left-28 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(225,29,53,0.08),transparent_70%)] blur-[70px]"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#E11D35]/15 bg-[#FFF2F4] text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#8E1222]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D35] shadow-[0_0_8px_rgba(225,29,53,0.7)]" />
            Two paths. One peak.
          </div>

          <h2 className="mt-5 font-display text-[clamp(2.25rem,4.6vw,4.1rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-[#0D0F14] [text-wrap:balance]">
            Build trust.
            <br />
            <span className="fps-gradient-text">Extend your reach.</span>
          </h2>

          <p className="mt-4 text-[15.5px] sm:text-[18px] leading-[1.65] text-[#4C525E] max-w-[660px] mx-auto">
            We turn your expertise into reels and use paid promotion to bring your best
            content to a wider audience.
          </p>
        </div>

        {/* Interactive Convergence Stage */}
        <div
          ref={stageRef}
          className="relative mt-6 sm:mt-8 h-[520px] sm:h-[600px] md:h-[640px] w-full"
        >
          {/* Central Crimson Blush Atmosphere Glow (pulses brighter on summit collision) */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 w-[560px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(225,29,53,0.16),rgba(255,107,74,0.06)_45%,transparent_72%)] blur-[60px] transition-all duration-1000 ${
              isBoom ? 'opacity-90 scale-110' : 'opacity-30 scale-90'
            }`}
          />

          {/* SVG Converging Mountain Curves */}
          <svg
            ref={svgRef}
            viewBox="0 0 1500 660"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full z-[6] overflow-visible pointer-events-none"
          >
            <defs>
              <linearGradient id="promosOrganicGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9F1239" />
                <stop offset="48%" stopColor="#E11D35" />
                <stop offset="100%" stopColor="#FF4D6D" />
              </linearGradient>

              <linearGradient id="promosPaidGrad" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#B91C1C" />
                <stop offset="48%" stopColor="#E11D35" />
                <stop offset="100%" stopColor="#FF6B4A" />
              </linearGradient>

              <linearGradient id="promosMountainFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(225,29,53,0.11)" />
                <stop offset="55%" stopColor="rgba(225,29,53,0.035)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>

              <filter id="promosCrimsonGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Subtle Mountain Body Silhouette (reveals on collision) */}
            <path
              d={MOUNTAIN_BODY_D}
              fill="url(#promosMountainFill)"
              className={`transition-opacity duration-1000 ${
                isBoom ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Soft Completed Slope Glow Shadows */}
            <path
              d={LEFT_PATH_D}
              fill="none"
              stroke="rgba(225,29,53,0.14)"
              strokeWidth="16"
              strokeLinecap="round"
              className={`transition-opacity duration-700 ${
                isBoom ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <path
              d={RIGHT_PATH_D}
              fill="none"
              stroke="rgba(255,107,74,0.13)"
              strokeWidth="16"
              strokeLinecap="round"
              className={`transition-opacity duration-700 ${
                isBoom ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Main Animated Paths */}
            <path
              ref={leftPathRef}
              d={LEFT_PATH_D}
              fill="none"
              stroke="url(#promosOrganicGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#promosCrimsonGlow)"
              style={{ opacity: 0 }}
            />
            <path
              ref={rightPathRef}
              d={RIGHT_PATH_D}
              fill="none"
              stroke="url(#promosPaidGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#promosCrimsonGlow)"
              style={{ opacity: 0 }}
            />
          </svg>

          {/* Moving Glowing Runner Orbs */}
          <span
            ref={leftRunnerRef}
            aria-hidden="true"
            className="fps-runner-ring pointer-events-none absolute z-[14] w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E11D35] text-[#E11D35] shadow-[0_0_8px_#fff,0_0_16px_#E11D35,0_0_28px_rgba(225,29,53,0.75)] opacity-0"
          />
          <span
            ref={rightRunnerRef}
            aria-hidden="true"
            className="fps-runner-ring pointer-events-none absolute z-[14] w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6B4A] text-[#FF6B4A] shadow-[0_0_8px_#fff,0_0_16px_#FF6B4A,0_0_28px_rgba(255,107,74,0.75)] opacity-0"
          />

          {/* Progress Step Labels along the slopes (desktop/tablet) */}
          <div
            className={`hidden md:flex items-center gap-2 absolute z-[12] left-[25%] bottom-[210px] px-3 py-1.5 rounded-lg border border-black/[0.08] bg-white/95 backdrop-blur-md shadow-[0_10px_24px_-10px_rgba(13,15,20,0.16)] text-[10px] font-bold tracking-[0.12em] uppercase text-[#0D0F14] transition-all duration-500 ${
              step24Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D35] shadow-[0_0_6px_rgba(225,29,53,0.65)]" />
            Trust
          </div>
          <div
            className={`hidden md:flex items-center gap-2 absolute z-[12] left-[36%] top-[275px] px-3 py-1.5 rounded-lg border border-black/[0.08] bg-white/95 backdrop-blur-md shadow-[0_10px_24px_-10px_rgba(13,15,20,0.16)] text-[10px] font-bold tracking-[0.12em] uppercase text-[#0D0F14] transition-all duration-500 ${
              step62Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] shadow-[0_0_6px_rgba(255,77,109,0.65)]" />
            Authority
          </div>
          <div
            className={`hidden md:flex items-center gap-2 absolute z-[12] right-[25%] bottom-[210px] px-3 py-1.5 rounded-lg border border-black/[0.08] bg-white/95 backdrop-blur-md shadow-[0_10px_24px_-10px_rgba(13,15,20,0.16)] text-[10px] font-bold tracking-[0.12em] uppercase text-[#0D0F14] transition-all duration-500 ${
              step24Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A] shadow-[0_0_6px_rgba(255,107,74,0.65)]" />
            Reach
          </div>
          <div
            className={`hidden md:flex items-center gap-2 absolute z-[12] right-[36%] top-[275px] px-3 py-1.5 rounded-lg border border-black/[0.08] bg-white/95 backdrop-blur-md shadow-[0_10px_24px_-10px_rgba(13,15,20,0.16)] text-[10px] font-bold tracking-[0.12em] uppercase text-[#0D0F14] transition-all duration-500 ${
              step62Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D35] shadow-[0_0_6px_rgba(225,29,53,0.65)]" />
            Discovery
          </div>

          {/* Collision Shockwave + Radial Rays + Burst Particles */}
          {isBoom && (
            <div
              key={`boom-${boomCycle}`}
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[23%] z-[20]"
            >
              {/* 3 Concentric Shockwaves */}
              <span
                className="fps-shockwave-active absolute w-24 h-24 rounded-full border border-[#E11D35]/75"
                style={{ animationDelay: '0s' }}
              />
              <span
                className="fps-shockwave-active absolute w-24 h-24 rounded-full border border-[#FF4D6D]/55"
                style={{ animationDelay: '0.14s' }}
              />
              <span
                className="fps-shockwave-active absolute w-24 h-24 rounded-full border border-[#FF6B4A]/45"
                style={{ animationDelay: '0.28s' }}
              />

              {/* Central Energy Flash */}
              <span className="fps-flash-active absolute w-28 h-28 rounded-full bg-[radial-gradient(circle,rgba(225,29,53,0.65)_0%,rgba(255,77,109,0.4)_38%,transparent_72%)] blur-[8px]" />

              {/* 8 Radial Burst Rays */}
              {RAY_ANGLES.map((deg) => (
                <span
                  key={deg}
                  style={{ transform: `translate(-50%, -100%) rotate(${deg}deg)` }}
                  className="fps-ray-active absolute left-0 top-0 w-[2px] origin-bottom bg-gradient-to-t from-[#E11D35] via-[#FF6B4A] to-transparent rounded-full"
                />
              ))}

              {/* 42 Outward Burst Particles */}
              {burstDots.map((dot, idx) => (
                <span
                  key={idx}
                  style={
                    {
                      width: `${dot.size}px`,
                      height: `${dot.size}px`,
                      backgroundColor: dot.color,
                      boxShadow: `0 0 6px ${dot.color}`,
                      '--tx': dot.tx,
                      '--ty': dot.ty,
                      '--dur': dot.dur,
                    } as CSSProperties
                  }
                  className="fps-particle-active absolute left-0 top-0 rounded-full"
                />
              ))}
            </div>
          )}

          {/* Summit Core Reveal (Hidden until collision) */}
          <div
            className={`absolute left-1/2 top-[11%] sm:top-[12%] z-[25] w-[260px] text-center ${
              isBoom
                ? 'fps-summit-boom pointer-events-auto'
                : 'opacity-0 -translate-x-1/2 scale-75 pointer-events-none'
            }`}
          >
            {/* Continuously Floating 3D Crimson Summit Sphere + Rotating Orbit Halo */}
            <button
              type="button"
              onClick={runAnimation}
              title="Replay growth convergence animation"
              className="fps-peak-float group relative mx-auto w-[92px] h-[92px] rounded-full flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D35]"
            >
              <span
                aria-hidden="true"
                className="fps-ring-spin absolute -inset-6 rounded-full border border-dashed border-[#E11D35]/45 group-hover:border-[#E11D35]/75 transition-colors"
              />
              <span
                aria-hidden="true"
                className="absolute -inset-12 rounded-full border border-[#E11D35]/18"
              />
              <span className="relative w-[84px] h-[84px] rounded-full bg-[radial-gradient(circle_at_30%_26%,#FF8596_0%,#E11D35_48%,#8E1222_100%)] shadow-[0_14px_38px_-6px_rgba(225,29,53,0.65),inset_0_2px_10px_rgba(255,255,255,0.5)] flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-200">
                {/* Brand-matched solid-white Megaphone + Animated Broadcast Reach Waves */}
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                  className="w-11 h-11 drop-shadow-[0_2px_6px_rgba(0,0,0,0.22)]"
                >
                  {/* Solid Megaphone Body */}
                  <path
                    d="M28.5 11.5L14.5 18.2H9.5C7.6 18.2 6 19.8 6 21.7V25.3C6 27.2 7.6 28.8 9.5 28.8H11.4L13.5 35.8C13.8 36.9 14.8 37.6 15.9 37.6H18.1C19.3 37.6 20.2 36.4 19.8 35.2L17.9 28.8H14.5L28.5 35.5C29.9 36.2 31.5 35.2 31.5 33.6V13.4C31.5 11.8 29.9 10.8 28.5 11.5Z"
                    fill="white"
                  />
                  {/* Animated Broadcast Sound / Reach Waves */}
                  <path
                    d="M35.5 17.5L40.5 14"
                    stroke="white"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    className="fps-wave-pulse"
                    style={{ animationDelay: '0s' }}
                  />
                  <path
                    d="M36.5 23.5H42.5"
                    stroke="white"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    className="fps-wave-pulse"
                    style={{ animationDelay: '0.25s' }}
                  />
                  <path
                    d="M35.5 29.5L40.5 33"
                    stroke="white"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    className="fps-wave-pulse"
                    style={{ animationDelay: '0.5s' }}
                  />
                </svg>
              </span>
            </button>

            <p className="mt-4 text-[10px] font-bold tracking-[0.2em] uppercase text-[#6B7280]">
              Together
            </p>
            <p className="mt-0.5 font-display text-[22px] sm:text-[25px] font-extrabold tracking-tight text-[#0D0F14]">
              Audience <span className="text-[#E11D35]">growth</span>
            </p>
          </div>

          {/* Left Channel Card: Organic content */}
          <div className="absolute bottom-3 sm:bottom-8 left-0 sm:left-[1%] z-[18] w-[47.5%] sm:w-[295px] p-4 sm:p-5 rounded-2xl border border-black/[0.08] bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_-22px_rgba(13,15,20,0.16)] hover:-translate-y-1.5 hover:border-[#E11D35]/40 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-[#E11D35]/20 bg-[#FFF2F4] flex items-center justify-center text-[#E11D35] shrink-0">
                <Sprout className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-[15px] sm:text-[18px] font-extrabold tracking-tight text-[#0D0F14] leading-tight">
                  Organic content
                </h3>
                <p className="mt-0.5 text-[9px] sm:text-[10px] font-bold tracking-[0.12em] uppercase text-[#6B7280]">
                  Compounding trust
                </p>
              </div>
            </div>
            <p className="mt-3 text-[12px] sm:text-[13px] leading-[1.55] text-[#4C525E]">
              Answer the questions your audience asks. Give people a reason to follow.
            </p>
          </div>

          {/* Right Channel Card: Paid promotion */}
          <div className="absolute bottom-3 sm:bottom-8 right-0 sm:right-[1%] z-[18] w-[47.5%] sm:w-[295px] p-4 sm:p-5 rounded-2xl border border-black/[0.08] bg-white/95 backdrop-blur-xl shadow-[0_20px_50px_-22px_rgba(13,15,20,0.16)] hover:-translate-y-1.5 hover:border-[#FF6B4A]/45 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-[#FF6B4A]/25 bg-[#FFF4F0] flex items-center justify-center text-[#EA4C2B] shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-[15px] sm:text-[18px] font-extrabold tracking-tight text-[#0D0F14] leading-tight">
                  Paid promotion
                </h3>
                <p className="mt-0.5 text-[9px] sm:text-[10px] font-bold tracking-[0.12em] uppercase text-[#6B7280]">
                  Accelerated reach
                </p>
              </div>
            </div>
            <p className="mt-3 text-[12px] sm:text-[13px] leading-[1.55] text-[#4C525E]">
              Bring your best-performing reels to people who haven&apos;t discovered you yet.
            </p>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <span className="hidden sm:block h-px flex-1 max-w-[200px] bg-gradient-to-r from-transparent to-black/15" />
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-black/[0.08] bg-white shadow-[0_6px_20px_-10px_rgba(13,15,20,0.12)] text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#4C525E]">
            <TrendingUp className="w-3.5 h-3.5 text-[#E11D35]" />
            <span>Independent momentum. One shared peak.</span>
          </div>
          <span className="hidden sm:block h-px flex-1 max-w-[200px] bg-gradient-to-l from-transparent to-black/15" />
        </div>
      </div>
    </section>
  );
}
