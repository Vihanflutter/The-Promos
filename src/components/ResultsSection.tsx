import { CLIENT_RESULTS } from '../data/content';

interface ConfettiPiece {
  left: string;
  color: string;
  width: number;
  height: number;
  duration: string;
  delay: string;
}

const FALLING_CONFETTI: ConfettiPiece[] = [
  { left: '6%', color: '#E11D35', width: 9, height: 5, duration: '4.4s', delay: '0s' },
  { left: '14%', color: '#10B981', width: 8, height: 5, duration: '5.1s', delay: '-1.3s' },
  { left: '23%', color: '#F59E0B', width: 10, height: 5, duration: '4.7s', delay: '-2.8s' },
  { left: '32%', color: '#8B5CF6', width: 8, height: 6, duration: '5.4s', delay: '-0.7s' },
  { left: '41%', color: '#E11D35', width: 9, height: 5, duration: '4.2s', delay: '-3.1s' },
  { left: '52%', color: '#3B82F6', width: 8, height: 5, duration: '5.0s', delay: '-1.9s' },
  { left: '61%', color: '#10B981', width: 10, height: 5, duration: '4.6s', delay: '-0.4s' },
  { left: '70%', color: '#F59E0B', width: 8, height: 6, duration: '5.2s', delay: '-2.5s' },
  { left: '79%', color: '#EC4899', width: 9, height: 5, duration: '4.5s', delay: '-1.1s' },
  { left: '88%', color: '#8B5CF6', width: 8, height: 5, duration: '5.3s', delay: '-3.6s' },
  { left: '94%', color: '#E11D35', width: 9, height: 5, duration: '4.8s', delay: '-2.1s' },
];

export function ResultsSection() {
  return (
    <section
      id="results"
      className="py-20 sm:py-24 bg-gradient-to-b from-[#FFF6F7] via-[#FFFAFB] to-white"
    >
      <div className="max-w-[960px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-block px-3.5 py-1 rounded border border-[#E11D35]/35 bg-[#FFF5F6] text-[11px] font-bold tracking-[0.14em] uppercase text-[#A3152A]">
            Proven Results
          </div>
          <h2 className="mt-4 font-display text-[clamp(1.85rem,3.4vw,2.65rem)] font-extrabold tracking-tight text-[#0D0F14] [text-wrap:balance]">
            Client Transformation <span className="text-[#E11D35]">Results</span>
          </h2>
          <p className="mt-2.5 text-[15px] sm:text-[16px] text-[#555B66]">
            We work with business owners, entrepreneurs and professionals
          </p>
        </div>

        {/* Transformation Cards */}
        <div className="mt-12 space-y-6">
          {CLIENT_RESULTS.map((client, cardIdx) => (
            <article
              key={client.id}
              className="relative grid grid-cols-1 md:grid-cols-12 rounded-2xl bg-white border border-black/[0.07] shadow-[0_14px_40px_-24px_rgba(13,15,20,0.16)] overflow-hidden"
            >
              {/* Continuous Party-Popper Falling Confetti Overlay across the card */}
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
                    }}
                    className="absolute rounded-[2px] animate-confetti-fall"
                  />
                ))}
              </div>

              {/* Left Side: Actual Uploaded Instagram Profile Screenshot */}
              <div className="md:col-span-6 p-5 sm:p-6 bg-white flex items-center justify-center relative z-10">
                <img
                  src={client.profileImage}
                  alt={`${client.displayName} (@${client.handle}) Instagram profile results`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full max-w-[390px] h-auto object-contain rounded-lg"
                />
              </div>

              {/* Right Side: Blush Rose Follower Result Panel (Milestone Unlocked badge removed) */}
              <div className="md:col-span-6 relative p-8 sm:p-10 bg-gradient-to-br from-[#FFF2F4] via-[#FFF8F9] to-[#FDECEF] border-t md:border-t-0 md:border-l border-[#E11D35]/10 flex flex-col items-center justify-center text-center z-10">
                <p className="font-display text-[20px] sm:text-[23px] font-extrabold tracking-tight text-[#0D0F14]">
                  @{client.handle}
                </p>

                <p className="mt-2 font-display text-[28px] sm:text-[34px] font-extrabold tracking-tight text-[#A3152A] tabular-nums">
                  {client.milestoneValue}
                </p>

                {client.milestoneSubtext && (
                  <p className="mt-1.5 text-[14px] sm:text-[15px] font-medium text-[#555B66]">
                    {client.milestoneSubtext}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
