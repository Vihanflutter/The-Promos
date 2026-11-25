import { Check } from 'lucide-react';
import { PACKAGES } from '../data/content';

interface PackagesSectionProps {
  onSelectPackage: (packageName: string) => void;
}

export function PackagesSection({ onSelectPackage }: PackagesSectionProps) {
  return (
    <section
      id="packages"
      className="py-20 sm:py-24 bg-gradient-to-b from-white via-[#FFF9FA] to-[#FFF4F6]"
    >
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        {/* Kicker + Heading */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-3">
            <span className="w-7 h-[2px] bg-[#E11D35]" aria-hidden="true" />
            <span className="text-[12px] font-bold tracking-[0.14em] uppercase text-[#555B66]">
              Content Packages
            </span>
          </div>
          <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,2.75rem)] font-extrabold tracking-tight text-[#0D0F14]">
            Find your <span className="text-[#E11D35]">rhythm.</span>
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-[#555B66]">
            Choose how often you want to publish. We handle the work from the first idea to
            the day it goes live.
          </p>
        </div>

        {/* 3 Content Package Cards */}
        <div className="mt-11 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PACKAGES.map((plan) => (
            <article
              key={plan.id}
              className={`relative bg-white rounded-2xl border overflow-hidden flex flex-col justify-between p-7 transition-shadow duration-200 hover:shadow-[0_18px_44px_-24px_rgba(13,15,20,0.2)] ${
                plan.featured
                  ? 'border-[#E11D35]/25 shadow-[0_18px_44px_-24px_rgba(225,29,53,0.18)]'
                  : 'border-black/[0.08] shadow-[0_12px_32px_-24px_rgba(13,15,20,0.14)]'
              }`}
            >
              {/* Crimson Top Highlight Bar for Featured Package */}
              {plan.featured && (
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-[#E11D35]"
                />
              )}

              <div>
                <h3 className="font-display text-[22px] font-extrabold tracking-tight text-[#0D0F14]">
                  {plan.name}
                </h3>
                <p className="mt-1 text-[14.5px] text-[#555B66]">{plan.tagline}</p>

                <div className="mt-6 pb-6 border-b border-black/[0.08]">
                  <p className="font-display text-[19px] font-extrabold text-[#0D0F14] tabular-nums">
                    {plan.volume}
                  </p>
                  <p className="mt-0.5 text-[13.5px] text-[#666D7A]">{plan.cadence}</p>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-[14.5px] font-medium text-[#2A2E37]"
                    >
                      <Check className="w-4 h-4 text-[#E11D35] shrink-0" strokeWidth={2.5} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => onSelectPackage(plan.name)}
                  className="w-full py-3.5 px-5 rounded-full bg-[#E11D35] hover:bg-[#C4162C] active:scale-[0.98] text-white text-[14.5px] font-semibold transition-all duration-150 shadow-[0_8px_20px_-8px_rgba(225,29,53,0.5)] cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E11D35]"
                >
                  {plan.ctaLabel}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
