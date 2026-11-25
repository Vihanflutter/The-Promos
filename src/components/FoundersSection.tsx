import { ArrowUpRight, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { CORE_TEAM, FOUNDERS } from '../data/content';
import { EASE_EDITORIAL, Reveal } from './MotionPrimitives';

export function FoundersSection() {
  // Dr. Anshuman Agarwal left, Dr. Sapana Agarwal right
  const orderedFounders = [FOUNDERS[1], FOUNDERS[0]];

  return (
    <section
      id="founders"
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#FFF9FA] to-[#FFF4F6] text-[#0D0F14] py-24 sm:py-28 border-t border-black/[0.06]"
    >
      {/* Subtle architectural light grid floor & soft rose radial spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(13,15,20,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,15,20,0.045) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 65% at 50% 58%, black 20%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 65% at 50% 58%, black 20%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[20%] left-1/2 -translate-x-1/2 w-[660px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(225,29,53,0.09),transparent_68%)]"
      />

      <div className="relative z-10 max-w-[1120px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#E11D35]/15 bg-[#FFF2F4] text-[10.5px] font-bold tracking-[0.18em] uppercase text-[#8E1222]">
            Meet The Minds
          </div>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,4.2vw,3.4rem)] font-extrabold tracking-tight text-[#0D0F14] leading-[1.08]">
            Our <span className="text-[#E11D35]">Leadership</span>
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16.5px] text-[#4C525E]">
            Strategy, creativity, and execution. We are the team behind the screens.
          </p>
        </Reveal>

        {/* Row 1: Two Founder Cards (floating avatar with spinning dashed crimson ring) */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-20 max-w-[940px] mx-auto">
          {orderedFounders.map((founder, idx) => (
            <motion.article
              key={founder.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.68, delay: idx * 0.12, ease: EASE_EDITORIAL }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl border border-black/[0.08] bg-white md:bg-white/95 md:backdrop-blur-xl px-6 sm:px-8 pt-20 pb-7 text-center shadow-[0_22px_55px_-24px_rgba(13,15,20,0.16)] hover:border-[#E11D35]/40 hover:shadow-[0_28px_65px_-22px_rgba(225,29,53,0.2)] transition-colors duration-300 flex flex-col justify-between"
            >
              {/* Floating Circular Portrait Pulled Above Top Border */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 16 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 22,
                  delay: 0.12 + idx * 0.12,
                }}
                className="absolute -top-[70px] left-1/2 -translate-x-1/2 w-[140px] h-[140px]"
              >
                {/* Slowly Rotating Dashed Crimson Halo */}
                <span
                  aria-hidden="true"
                  className="fps-ring-spin absolute -inset-1.5 rounded-full border-2 border-dashed border-[#E11D35]/55"
                />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white bg-gradient-to-b from-[#FCECEF] to-[#FFF5F6] shadow-[0_14px_30px_-8px_rgba(13,15,20,0.22)]">
                  <img
                    src={founder.image}
                    alt={`${founder.name}, Founder at The Promos`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </motion.div>

              <div>
                {/* Role + Creator Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-[#FFF2F4] border border-[#E11D35]/25 text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#B91C2E]">
                    {founder.roleBadge}
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#E11D35] to-[#FF4D6D] text-[10.5px] font-bold tracking-[0.12em] uppercase text-white shadow-[0_6px_16px_-4px_rgba(225,29,53,0.45)]">
                    Creator
                  </span>
                </div>

                {/* Founder Name & Credentials */}
                <h3 className="mt-4 font-display text-[24px] sm:text-[26px] font-extrabold tracking-tight text-[#0D0F14]">
                  {founder.name}
                </h3>
                <p className="mt-1 text-[12.5px] font-semibold tracking-wide text-[#E11D35]">
                  {founder.degreeLine}
                </p>

                {/* Clinical + Creator Authority Copy */}
                <p className="mt-4 text-[14px] leading-[1.65] text-[#3B404B]">
                  {founder.bio}
                </p>
                <p className="mt-2.5 text-[13.5px] leading-[1.6] text-[#5D6370]">
                  {founder.creatorHighlight}
                </p>
              </div>

              {/* Instagram Creator Page Buttons */}
              <div className="mt-6 space-y-2.5 text-left">
                {founder.socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 w-full px-4 py-2.5 rounded-xl border border-black/[0.08] bg-[#FAFAFB] hover:bg-[#FFF2F4] hover:border-[#E11D35]/35 text-[#0D0F14] transition-all duration-200 group/link"
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <Instagram className="w-4 h-4 text-[#E11D35] shrink-0" />
                      <span className="text-[13px] font-semibold truncate">{link.label}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-[#6B7280] shrink-0">
                      <span className="hidden sm:inline">{link.sublabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#6B7280] group-hover/link:text-[#E11D35] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                    </span>
                  </a>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Row 2: Core Leadership Team (matching floating-portrait light card style) */}
        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-24">
          {CORE_TEAM.map((member, idx) => (
            <motion.article
              key={member.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: idx * 0.1, ease: EASE_EDITORIAL }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl border border-black/[0.08] bg-white md:bg-white/95 md:backdrop-blur-xl px-6 pt-20 pb-7 text-center shadow-[0_22px_55px_-24px_rgba(13,15,20,0.16)] hover:border-[#E11D35]/40 hover:shadow-[0_28px_65px_-22px_rgba(225,29,53,0.2)] transition-colors duration-300 flex flex-col justify-start"
            >
              {/* Floating Circular Portrait Pulled Above Top Border */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 14 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 22,
                  delay: 0.1 + idx * 0.1,
                }}
                className="absolute -top-[64px] left-1/2 -translate-x-1/2 w-[128px] h-[128px]"
              >
                {/* Slowly Rotating Dashed Crimson Halo */}
                <span
                  aria-hidden="true"
                  className="fps-ring-spin absolute -inset-1.5 rounded-full border-2 border-dashed border-[#E11D35]/55"
                />
                {member.image ? (
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white bg-[#FFF5F6] shadow-[0_14px_30px_-8px_rgba(13,15,20,0.22)]">
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.role} at The Promos`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full rounded-full border-4 border-white bg-gradient-to-b from-[#FFF2F4] to-[#FCECEF] shadow-[0_14px_30px_-8px_rgba(13,15,20,0.18)] flex items-center justify-center font-display text-[30px] font-extrabold tracking-tight text-[#E11D35] transition-transform duration-300 group-hover:scale-105">
                    {member.initials}
                  </div>
                )}
              </motion.div>

              {/* Role Pill Badge */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#E11D35] to-[#FF4D6D] text-[10.5px] font-bold tracking-[0.12em] uppercase text-white shadow-[0_6px_16px_-4px_rgba(225,29,53,0.45)]">
                  {member.role}
                </span>
              </div>

              {/* Name & Subtitle */}
              <h3 className="mt-4 font-display text-[22px] sm:text-[23px] font-extrabold tracking-tight text-[#0D0F14] leading-tight">
                {member.name}
              </h3>
              <p className="mt-1 text-[12px] font-semibold tracking-wide text-[#E11D35]">
                {member.subtitle}
              </p>

              {/* Bio Copy */}
              <p className="mt-4 text-[13.5px] leading-[1.65] text-[#4C525E]">
                {member.bio}
              </p>
              {member.detailBio && (
                <p className="mt-2.5 text-[13px] leading-[1.6] text-[#6B7280]">
                  {member.detailBio}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
