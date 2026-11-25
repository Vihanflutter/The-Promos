import { ArrowRight, Globe, Instagram, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { LOGO_URL } from '../data/content';
import { Reveal } from './MotionPrimitives';

interface FooterProps {
  onOpenInquiry: (defaultPackage?: string) => void;
}

export function Footer({ onOpenInquiry }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-[#0D0F14] text-white">
      {/* Subtle breathing crimson ambient glow behind final CTA */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[8%] w-[460px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(225,29,53,0.2)_0%,rgba(225,29,53,0.06)_42%,transparent_72%)]"
      />

      {/* Final Conversion Band */}
      <div className="relative z-10 border-b border-white/10">
        <Reveal className="max-w-[1100px] mx-auto px-5 sm:px-8 py-16 sm:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.45rem)] font-extrabold tracking-tight leading-tight [text-wrap:balance]">
              Ready to build an audience around your{' '}
              <span className="text-[#E11D35]">expertise?</span>
            </h2>
            <p className="mt-3 text-[15.5px] text-white/70 leading-relaxed">
              Book a quick clarity call with The Promos team. We&apos;ll map out your content
              pillars, posting cadence, and first 30 days of reels.
            </p>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 420, damping: 24 }}
            onClick={() => onOpenInquiry()}
            className="btn-sheen group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#E11D35] hover:bg-[#C4162C] text-white text-[15px] font-semibold transition-colors duration-150 shadow-[0_12px_28px_-8px_rgba(225,29,53,0.6)] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0F14] focus-visible:ring-[#E11D35]"
          >
            <span>Start Growing Now</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>
        </Reveal>
      </div>

      {/* Quiet Directory Footer */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-3">
            <a href="#top" className="inline-flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src={LOGO_URL}
                  alt="The Promos logo"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 object-cover object-[50%_18%]"
                />
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                The Promos<span className="text-[#E11D35]">.</span>
              </span>
            </a>
            <p className="text-sm text-white/65 max-w-sm leading-relaxed">
              Personal branding agency for founders, doctors, educators and creators. Strategy,
              scripting, shooting, editing and publishing under one roof.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">
              Explore
            </p>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <a href="#results" className="hover:text-white transition-colors">
                  Client Results
                </a>
              </li>
              <li>
                <a href="#reels" className="hover:text-white transition-colors">
                  Our Reels
                </a>
              </li>
              <li>
                <a href="#protocol" className="hover:text-white transition-colors">
                  Agency Protocol
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  Packages
                </a>
              </li>
              <li>
                <a href="#founders" className="hover:text-white transition-colors">
                  Leadership
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">
              Connect
            </p>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#E11D35] shrink-0" />
                <a
                  href="https://thepromos.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  thepromos.in
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E11D35] shrink-0" />
                <a
                  href="mailto:hello@thepromos.in"
                  className="hover:text-white transition-colors"
                >
                  hello@thepromos.in
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#E11D35] shrink-0" />
                <a
                  href="https://www.instagram.com/thepromosbyd3/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @thepromosbyd3
                </a>
              </li>
            </ul>
            <p className="pt-2 text-xs text-white/50">
              Kota, Rajasthan · Partnering with founders across India
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <p>© {new Date().getFullYear()} The Promos (thepromos.in). All rights reserved.</p>
          <p>Founded by Dr. Anshuman Agarwal &amp; Dr. Sapana Agarwal</p>
        </div>
      </div>
    </footer>
  );
}
