import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { LOGO_URL } from '../data/content';

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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/[0.06]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#top"
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
          <span className="font-display text-[21px] font-extrabold tracking-tight text-[#0D0F14]">
            The Promos<span className="text-[#E11D35]">.</span>
          </span>
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-[15px] font-medium text-[#2A2E37]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 hover:text-[#E11D35] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D35] rounded px-1 py-0.5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenInquiry()}
            className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#E11D35] hover:bg-[#C4162C] active:scale-[0.98] text-white text-sm font-semibold transition-all duration-150 shadow-[0_6px_18px_-6px_rgba(225,29,53,0.55)] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E11D35]"
          >
            Get Started
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-black/10 text-[#0D0F14] hover:bg-[#FFF5F6] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-black/[0.06] bg-white px-5 py-4 space-y-1 shadow-lg">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-[15px] font-medium text-[#1F232B] hover:bg-[#FFF5F6] hover:text-[#E11D35] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-3 px-5 rounded-full bg-[#E11D35] hover:bg-[#C4162C] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
