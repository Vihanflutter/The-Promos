import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { FAQS } from '../data/content';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-24 bg-white">
      <div className="max-w-[820px] mx-auto px-5 sm:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-3">
            <span className="w-6 h-[2px] bg-[#E11D35]" aria-hidden="true" />
            <span className="text-[12px] font-bold tracking-[0.14em] uppercase text-[#555B66]">
              Common Questions
            </span>
          </div>
          <h2 className="mt-3 font-display text-[clamp(1.85rem,3.4vw,2.5rem)] font-extrabold tracking-tight text-[#0D0F14]">
            Answers before we <span className="text-[#E11D35]">start.</span>
          </h2>
        </div>

        <div className="mt-10 divide-y divide-black/[0.08] border-y border-black/[0.08]">
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D35] rounded"
                >
                  <span className="font-display text-[16.5px] sm:text-[17.5px] font-bold text-[#0D0F14] group-hover:text-[#E11D35] transition-colors">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#555B66] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#E11D35]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-5 pr-8 text-[15px] leading-[1.65] text-[#555B66]">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
