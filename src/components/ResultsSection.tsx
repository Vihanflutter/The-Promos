import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { CLIENT_RESULTS } from '../data/content';
import { AnimatedMetric, EASE_EDITORIAL, Reveal, SpotlightSurface } from './MotionPrimitives';

interface ConfettiPiece {
  left: string;
  color: string;
  width: number;
  height: number;
  duration: string;
  delay: string;
}

const FALLING_CONFETTI: ConfettiPiece[] = [
  { left: '8%', color: '#E11D35', width: 9, height: 5, duration: '4.4s', delay: '0s' },
  { left: '22%', color: '#10B981', width: 8, height: 5, duration: '5.1s', delay: '-1.3s' },
  { left: '37%', color: '#F59E0B', width: 10, height: 5, duration: '4.7s', delay: '-2.8s' },
  { left: '54%', color: '#8B5CF6', width: 8, height: 6, duration: '5.4s', delay: '-0.7s' },
  { left: '72%', color: '#E11D35', width: 9, height: 5, duration: '4.2s', delay: '-3.1s' },
  { left: '88%', color: '#3B82F6', width: 8, height: 5, duration: '5.0s', delay: '-1.9s' },
  { left: '15%', color: '#10B981', width: 9, height: 5, duration: '4.6s', delay: '-0.4s' },
  { left: '46%', color: '#F59E0B', width: 8, height: 6, duration: '5.2s', delay: '-2.5s' },
  { left: '63%', color: '#EC4899', width: 9, height: 5, duration: '4.5s', delay: '-1.1s' },
  { left: '81%', color: '#8B5CF6', width: 8, height: 5, duration: '5.3s', delay: '-3.6s' },
  { left: '94%', color: '#E11D35', width: 9, height: 5, duration: '4.8s', delay: '-2.1s' },
];

export function ResultsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionVisible = useInView(sectionRef, { margin: '150px 0px' });

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative py-22 sm:py-28 bg-gradient-to-b from-[#FFF4F6] via-[#FCFBF9] to-white border-t border-[#0D0F14]/[0.05] art-paper-grain"
    >
      <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
        {/* Editorial Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.16em] uppercase text-[#8E1222]">
            <span className="w-7 h-px bg-[#E11D35]" aria-hidden="true" />
            <span>Proven Results</span>
            <span className="w-7 h-px bg-[#E11D35]" aria-hidden="true" />
          </div>
          <h2 className="mt-4 font-display text-[clamp(2rem,3.6vw,3rem)] font-extrabold tracking-[-0.03em] text-[#0D0F14] [text-wrap:balance]">
            Client Transformation{' '}
            <span className="font-editorial italic font-semibold text-[#E11D35]">Results</span>
          </h2>
          <p className="mt-3 text-[15.5px] sm:text-[16.5px] text-[#555B66]">
            We work with business owners, entrepreneurs and professionals
          </p>
        </Reveal>

        {/* Gallery-Framed Transformation Cards */}
        <div className="mt-14 space-y-7">
          {CLIENT_RESULTS.map((client, cardIdx) => (
            <motion.article
              key={client.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.16 }}
              transition={{ duration: 0.6, delay: cardIdx * 0.06, ease: EASE_EDITORIAL }}
              className="group relative rounded-[28px] bg-white border border-[#0D0F14]/[0.08] shadow-[0_20px_50px_-30px_rgba(13,15,20,0.18)] hover:border-[#E11D35]/35 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <SpotlightSurface
                glowColor="rgba(225, 29, 53, 0.09)"
                glowSize={380}
                className="grid grid-cols-1 md:grid-cols-12"
              >
                {/* Continuous Party-Popper Falling Confetti (pauses off-screen for 60fps mobile scroll) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden z-20"
                >
                  {FALLING_CONFETTI.map((piece, idx) => (
                    <span
                      key={`${client.id}-confetti-${idx}`}
                      style={{
                        left: piece.left,
                        top: '-14px',
                        width: `${piece.width}px`,
                        height: `${piece.height}px`,
                        backgroundColor: piece.color,
                        animationDuration: piece.duration,
                        animationDelay: `calc(${piece.delay} - ${cardIdx * 0.6}s)`,
                        animationPlayState: isSectionVisible ? 'running' : 'paused',
                      }}
                      className={`absolute rounded-[2px] animate-confetti-fall ${
                        idx >= 6 ? 'hidden sm:block' : ''
                      }`}
                    />
                  ))}
                </div>

                {/* Left Side: Optimized Instagram Profile Screenshot */}
                <div className="md:col-span-6 p-6 sm:p-8 bg-white flex items-center justify-center relative z-10">
                  <img
                    src={client.profileImage}
                    alt={`${client.displayName} (@${client.handle}) Instagram profile results`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full max-w-[395px] h-auto object-contain rounded-xl transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                {/* Right Side: Artistic Blush Rose Editorial Result Panel */}
                <div className="md:col-span-6 relative p-8 sm:p-11 bg-gradient-to-br from-[#FFF3F5] via-[#FFF9FA] to-[#FCECEF] border-t md:border-t-0 md:border-l border-[#E11D35]/12 flex flex-col items-center justify-center text-center z-10 overflow-hidden">
                  {/* Slowly rotating concentric gallery arc ornament */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 240 240"
                    fill="none"
                    style={{ animationPlayState: isSectionVisible ? 'running' : 'paused' }}
                    className="pointer-events-none absolute -right-16 -bottom-16 w-56 h-56 opacity-50 animate-slow-spin"
                  >
                    <circle cx="120" cy="120" r="88" stroke="#E11D35" strokeOpacity="0.18" strokeWidth="1" />
                    <circle cx="120" cy="120" r="62" stroke="#E11D35" strokeOpacity="0.16" strokeWidth="1.2" strokeDasharray="4 6" />
                  </svg>

                  <span className="relative text-[11px] font-bold tracking-[0.18em] uppercase text-[#8E1222]/75">
                    0{cardIdx + 1} · Verified Growth
                  </span>

                  <p className="relative mt-2.5 font-display text-[19px] sm:text-[21px] font-bold tracking-tight text-[#0D0F14]">
                    @{client.handle}
                  </p>

                  <p className="relative mt-2 font-editorial italic text-[32px] sm:text-[40px] font-semibold tracking-tight text-[#C4162C] leading-none tabular-nums">
                    <AnimatedMetric value={client.milestoneValue} />
                  </p>

                  {client.milestoneSubtext && (
                    <p className="relative mt-2.5 text-[14px] sm:text-[15px] font-medium text-[#555B66]">
                      {client.milestoneSubtext}
                    </p>
                  )}
                </div>
              </SpotlightSurface>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
