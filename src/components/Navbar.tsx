import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { useState } from 'react';
import { LOGO_URL } from '../data/content';
import { EASE_EDITORIAL } from './MotionPrimitives';

interface NavbarProps {
  onOpenInquiry: (defaultPackage?: string) => void;
}

const NAV_LINKS = [
  { label: 'Results', href: '#results' },
  { label: 'Reels', href: '#reels' },
  { label: 'Protocol', href: '#protocol' },
  { label: 'Packages', href: '#packages' },
  { label: 'Leadership', href: '#founders' },
];

export function Navbar({ onOpenInquiry }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <header className="sticky top-0 z-40 bg-[#FCFBF9]/88 backdrop-blur-xl border-b border-[#0D0F14]/[0.07]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-[74px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <motion.a
          href="#top"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: EASE_EDITORIAL }}
          className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D35] rounded-lg"
        >
          <span className="w-9 h-8 overflow-hidden flex items-center justify-center shrink-0">
            <img
              src={LOGO_URL}
              alt="The Promos megaphone mark"
              referrerPolicy="no-referrer"
              className="w-11 h-11 object-cover object-[50%_18%] mix-blend-multiply"
            />
          </span>
          <span className="font-display text-[21px] font-extrabold tracking-[-0.03em] text-[#0D0F14]">
            The Promos<span className="font-editorial italic text-[#E11D35]">.</span>
          </span>
        </motion.a>

        {/* Zone 2: 5 concise single-line editorial navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-[14.5px] font-medium text-[#2A2E37]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="editorial-nav-link whitespace-nowrap shrink-0 hover:text-[#0D0F14] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D35] rounded px-0.5 py-0.5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 420, damping: 24 }}
            onClick={() => onOpenInquiry()}
            className="btn-sheen hidden sm:inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0D0F14] hover:bg-[#E11D35] text-white text-[13.5px] font-semibold tracking-tight transition-colors duration-200 shadow-[0_8px_20px_-8px_rgba(13,15,20,0.4)] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E11D35]"
          >
            <span>Get Started</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#0D0F14]/12 text-[#0D0F14] hover:bg-[#FFF2F4] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Scroll-Linked Crimson Reading Progress Rail */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="h-[2.5px] origin-left bg-gradient-to-r from-[#E11D35] via-[#FF4D6D] to-[#FF6B4A]"
      />

      {/* Smooth Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: EASE_EDITORIAL }}
            className="md:hidden overflow-hidden border-t border-[#0D0F14]/[0.07] bg-[#FCFBF9] shadow-xl"
          >
            <div className="px-5 py-4 space-y-1">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.25, ease: EASE_EDITORIAL }}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 px-3 rounded-xl text-[15px] font-medium text-[#1F232B] hover:bg-[#FFF2F4] hover:text-[#E11D35] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenInquiry();
                  }}
                  className="btn-sheen w-full py-3 px-5 rounded-full bg-[#E11D35] hover:bg-[#C4162C] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
