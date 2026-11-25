import { ArrowUpRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { PACKAGES } from '../data/content';
import { EASE_EDITORIAL, Reveal, SpotlightSurface } from './MotionPrimitives';

interface PackagesSectionProps {
  onSelectPackage: (packageName: string) => void;
}

export function PackagesSection({ onSelectPackage }: PackagesSectionProps) {
  return (
    <section
      id="packages"
      className="py-22 sm:py-28 bg-gradient-to-b from-white via-[#FCFBF9] to-[#FFF4F6] border-t border-[#0D0F14]/[0.05] art-paper-grain"
    >
      <div className="max-w-[1120px] mx-auto px-5 sm:px-8">
        {/* Kicker + Sculpted Editorial Heading */}
        <Reveal className="max-w-xl">
          <div className="inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.16em] uppercase text-[#8E1222]">
            <span className="w-7 h-px bg-[#E11D35]" aria-hidden="true" />
            <span>Content Packages</span>
          </div>
          <h2 className="mt-3.5 font-display text-[clamp(2.1rem,3.8vw,3.1rem)] font-extrabold tracking-[-0.03em] text-[#0D0F14] leading-[1.06]">
            Find your{' '}
            <span className="font-editorial italic font-semibold text-[#E11D35]">rhythm.</span>
          </h2>
          <p className="mt-3.5 text-[15.5px] sm:text-[16px] leading-relaxed text-[#555B66]">
            Choose how often you want to publish. We handle the work from the first idea to
            the day it goes live.
          </p>
        </Reveal>

        {/* 3 Editorial Package Cards (Center Recommended Card in Sculpted Obsidian Contrast) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {PACKAGES.map((plan, idx) => {
            const isFeatured = Boolean(plan.featured);
            return (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 34, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: idx * 0.1, ease: EASE_EDITORIAL }}
                whileHover={{ y: isFeatured ? -12 : -6 }}
                className={`relative rounded-[28px] border overflow-hidden transition-colors duration-300 ${
                  isFeatured
                    ? 'bg-[#0D0F14] text-white border-[#0D0F14] shadow-[0_28px_64px_-24px_rgba(13,15,20,0.45)] md:-translate-y-2'
                    : 'bg-white text-[#0D0F14] border-[#0D0F14]/[0.08] shadow-[0_18px_46px_-28px_rgba(13,15,20,0.16)] hover:border-[#E11D35]/35 hover:shadow-[0_26px_60px_-26px_rgba(225,29,53,0.18)]'
                }`}
              >
                <SpotlightSurface
                  glowColor={isFeatured ? 'rgba(225, 29, 53, 0.24)' : 'rgba(225, 29, 53, 0.09)'}
                  glowSize={320}
                  className="h-full flex flex-col justify-between p-7 sm:p-8"
                >
                  {/* Animated Shimmer Crimson Top Rule for Featured Package */}
                  {isFeatured && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#E11D35] via-[#FF7A59] to-[#E11D35] animate-bar-shimmer"
                    />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-editorial italic text-[14px] font-medium ${
                          isFeatured ? 'text-[#FF6B81]' : 'text-[#8E1222]/80'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      {isFeatured && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] uppercase text-[#FF6B81]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] animate-pulse" />
                          Most Popular
                        </span>
                      )}
                    </div>

                    <h3
                      className={`mt-3 font-display text-[23px] font-extrabold tracking-[-0.02em] ${
                        isFeatured ? 'text-white' : 'text-[#0D0F14]'
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`mt-1 text-[14.5px] ${
                        isFeatured ? 'text-white/65' : 'text-[#555B66]'
                      }`}
                    >
                      {plan.tagline}
                    </p>

                    <div
                      className={`mt-6 pb-6 border-b ${
                        isFeatured ? 'border-white/12' : 'border-[#0D0F14]/[0.08]'
                      }`}
                    >
                      <p
                        className={`font-editorial italic text-[24px] font-semibold leading-tight tabular-nums ${
                          isFeatured ? 'text-white' : 'text-[#0D0F14]'
                        }`}
                      >
                        {plan.volume}
                      </p>
                      <p
                        className={`mt-1 text-[13.5px] ${
                          isFeatured ? 'text-white/55' : 'text-[#666D7A]'
                        }`}
                      >
                        {plan.cadence}
                      </p>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className={`flex items-center gap-3 text-[14.5px] font-medium ${
                            isFeatured ? 'text-white/85' : 'text-[#2A2E37]'
                          }`}
                        >
                          <Check
                            className={`w-4 h-4 shrink-0 ${
                              isFeatured ? 'text-[#FF4D6D]' : 'text-[#E11D35]'
                            }`}
                            strokeWidth={2.5}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative z-10 mt-8">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                      onClick={() => onSelectPackage(plan.name)}
                      className={`group w-full py-3.5 px-5 rounded-full text-[14.5px] font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E11D35] ${
                        isFeatured
                          ? 'btn-sheen bg-[#E11D35] hover:bg-[#FF324D] text-white shadow-[0_12px_28px_-8px_rgba(225,29,53,0.65)] focus-visible:ring-offset-[#0D0F14]'
                          : 'bg-[#0D0F14] hover:bg-[#E11D35] text-white shadow-[0_10px_24px_-10px_rgba(13,15,20,0.38)]'
                      }`}
                    >
                      <span>{plan.ctaLabel}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.button>
                  </div>
                </SpotlightSurface>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
