import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { FAQS } from '../data/content';
import { EASE_EDITORIAL, Reveal } from './MotionPrimitives';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-22 sm:py-28 bg-[#FCFBF9] border-t border-[#0D0F14]/[0.06] art-paper-grain"
    >
      <div className="max-w-[840px] mx-auto px-5 sm:px-8">
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-3 text-[12px] font-semibold tracking-[0.16em] uppercase text-[#8E1222]">
            <span className="w-7 h-px bg-[#E11D35]" aria-hidden="true" />
            <span>Common Questions</span>
            <span className="w-7 h-px bg-[#E11D35]" aria-hidden="true" />
          </div>
          <h2 className="mt-4 font-display text-[clamp(2rem,3.6vw,2.85rem)] font-extrabold tracking-[-0.03em] text-[#0D0F14]">
            Answers before we{' '}
            <span className="font-editorial italic font-semibold text-[#E11D35]">start.</span>
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-[#0D0F14]/[0.09] border-y border-[#0D0F14]/[0.09]">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: EASE_EDITORIAL }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full py-6 flex items-center justify-between gap-5 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D35] rounded"
                >
                  <span className="flex items-baseline gap-4 min-w-0">
                    <span className="font-editorial italic text-[15px] font-medium text-[#E11D35]/80 tabular-nums shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="font-display text-[17px] sm:text-[18.5px] font-bold tracking-[-0.015em] text-[#0D0F14] group-hover:text-[#E11D35] transition-colors">
                      {item.question}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      isOpen
                        ? 'border-[#E11D35] bg-[#E11D35] text-white'
                        : 'border-[#0D0F14]/15 text-[#555B66] group-hover:border-[#E11D35]/40 group-hover:text-[#E11D35]'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.34, ease: EASE_EDITORIAL }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-9 pr-10 text-[15px] leading-[1.7] text-[#555B66]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
