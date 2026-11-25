import { motion } from 'motion/react';
import { PROTOCOL_STEPS } from '../data/content';
import { EASE_EDITORIAL, Reveal, SpotlightSurface } from './MotionPrimitives';

export function ProtocolSection() {
  return (
    <section
      id="protocol"
      className="py-22 sm:py-28 bg-gradient-to-b from-[#FCFBF9] via-[#FFF6F7] to-[#FCFBF9] border-t border-[#0D0F14]/[0.05] art-paper-grain overflow-hidden"
    >
      <div className="max-w-[1040px] mx-auto px-5 sm:px-8">
        {/* Centered Editorial Header */}
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.16em] uppercase text-[#8E1222]">
            <span className="w-7 h-px bg-[#E11D35]" aria-hidden="true" />
            <span>The Craft</span>
            <span className="w-7 h-px bg-[#E11D35]" aria-hidden="true" />
          </div>
          <h2 className="mt-4 font-display text-[clamp(2rem,3.6vw,2.95rem)] font-extrabold tracking-[-0.03em] text-[#0D0F14] [text-wrap:balance]">
            Our Proven Personal Branding{' '}
            <span className="font-editorial italic font-semibold text-[#E11D35]">
              Agency Protocol
            </span>
          </h2>
          <p className="mt-3.5 text-[15.5px] sm:text-[16.5px] leading-relaxed text-[#555B66]">
            We don&apos;t guess. Our personal branding experts use research, audience feedback
            and performance data to guide each stage of your growth.
          </p>
        </Reveal>

        {/* 6 Alternating Artistic Gallery Chapters */}
        <div className="mt-14 space-y-7">
          {PROTOCOL_STEPS.map((step, index) => {
            const imageOnLeft = index % 2 === 1;
            return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.68, ease: EASE_EDITORIAL }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-[28px] border border-[#0D0F14]/[0.07] hover:border-[#E11D35]/35 shadow-[0_20px_54px_-32px_rgba(13,15,20,0.18)] hover:shadow-[0_28px_64px_-28px_rgba(225,29,53,0.18)] transition-colors duration-300 overflow-hidden"
              >
                <SpotlightSurface
                  glowColor="rgba(225, 29, 53, 0.08)"
                  glowSize={360}
                  className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-7 sm:gap-10 items-center"
                >
                  {/* Copy Column */}
                  <motion.div
                    initial={{ opacity: 0, x: imageOnLeft ? 18 : -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.62, delay: 0.08, ease: EASE_EDITORIAL }}
                    className={`relative z-10 md:col-span-6 space-y-3 ${
                      imageOnLeft ? 'md:order-2 md:pl-3' : 'md:order-1 md:pr-3'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-editorial italic text-[32px] sm:text-[36px] leading-none font-medium text-[#E11D35]/90 tabular-nums transition-transform duration-300 group-hover:scale-110 origin-left">
                        {step.number}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-px w-10 group-hover:w-16 bg-gradient-to-r from-[#E11D35]/55 to-transparent transition-all duration-300"
                      />
                    </div>
                    <h3 className="font-display text-[22px] sm:text-[25px] font-extrabold tracking-[-0.025em] text-[#0D0F14] group-hover:text-[#E11D35] transition-colors duration-200">
                      {step.title}
                    </h3>
                    <p className="text-[15px] sm:text-[15.5px] leading-[1.7] text-[#555B66]">
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Image Column with subtle editorial zoom-in reveal */}
                  <div
                    className={`relative z-10 md:col-span-6 ${
                      imageOnLeft ? 'md:order-1' : 'md:order-2'
                    }`}
                  >
                    <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-[#F7EFF0] border border-[#0D0F14]/[0.06]">
                      <motion.img
                        src={step.image}
                        alt={step.imageAlt}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        initial={{ scale: 1.07 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.85, ease: EASE_EDITORIAL }}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.045]"
                      />
                    </div>
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
