import { PROTOCOL_STEPS } from '../data/content';

export function ProtocolSection() {
  return (
    <section
      id="protocol"
      className="py-20 sm:py-24 bg-gradient-to-b from-[#FFF7F8] via-[#FFF4F6] to-[#FFF8F9]"
    >
      <div className="max-w-[980px] mx-auto px-5 sm:px-8">
        {/* Centered Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-[clamp(1.75rem,3.3vw,2.55rem)] font-extrabold tracking-tight text-[#0D0F14] [text-wrap:balance]">
            Our Proven Personal Branding{' '}
            <span className="text-[#E11D35]">Agency Protocol</span>
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-[#555B66]">
            We don&apos;t guess. Our personal branding experts use research, audience feedback
            and performance data to guide each stage of your growth.
          </p>
        </div>

        {/* 6 Alternating Horizontal Protocol Cards */}
        <div className="mt-12 space-y-6">
          {PROTOCOL_STEPS.map((step, index) => {
            const imageOnLeft = index % 2 === 1;
            return (
              <article
                key={step.number}
                className="bg-white rounded-2xl border border-black/[0.06] shadow-[0_12px_36px_-24px_rgba(13,15,20,0.14)] p-6 sm:p-7 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center"
              >
                {/* Copy Column */}
                <div
                  className={`md:col-span-6 space-y-2.5 ${
                    imageOnLeft ? 'md:order-2 md:pl-2' : 'md:order-1 md:pr-2'
                  }`}
                >
                  <p className="font-display text-sm font-bold text-[#E11D35] tabular-nums">
                    {step.number}
                  </p>
                  <h3 className="font-display text-[21px] sm:text-[23px] font-extrabold tracking-tight text-[#0D0F14]">
                    {step.title}
                  </h3>
                  <p className="text-[14.5px] sm:text-[15.5px] leading-[1.65] text-[#555B66]">
                    {step.description}
                  </p>
                </div>

                {/* Image Column */}
                <div
                  className={`md:col-span-6 ${
                    imageOnLeft ? 'md:order-1' : 'md:order-2'
                  }`}
                >
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#F7EFF0] border border-black/[0.05]">
                    <img
                      src={step.image}
                      alt={step.imageAlt}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
