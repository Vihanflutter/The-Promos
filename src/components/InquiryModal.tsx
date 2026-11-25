import { CheckCircle2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { type FormEvent, useEffect, useState } from 'react';
import { PACKAGES } from '../data/content';
import { EASE_EDITORIAL } from './MotionPrimitives';

interface InquiryModalProps {
  isOpen: boolean;
  initialPackage?: string;
  onClose: () => void;
}

export function InquiryModal({ isOpen, initialPackage, onClose }: InquiryModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [handle, setHandle] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(
    initialPackage || 'Complete Momentum'
  );
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedPackage(initialPackage || 'Complete Momentum');
      setSubmitted(false);
      setError('');
    }
  }, [isOpen, initialPackage]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.replace(/\s+/g, '');
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      setError('Please enter your full name.');
      return;
    }
    if (!/^\+?[0-9]{10,14}$/.test(trimmedPhone)) {
      setError('Please enter a valid 10-digit WhatsApp or phone number.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-modal-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: EASE_EDITORIAL }}
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-black/[0.06] max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#E11D35]">
                  The Promos · thepromos.in
                </p>
                <h3
                  id="inquiry-modal-title"
                  className="mt-1 font-display text-2xl font-extrabold tracking-tight text-[#0D0F14]"
                >
                  {submitted ? 'Strategy call requested' : 'Start growing your personal brand'}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full hover:bg-black/5 flex items-center justify-center text-[#555B66] cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                className="mt-6 py-4 text-center space-y-4"
              >
                <motion.div
                  initial={{ scale: 0.5, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                  className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="w-8 h-8" />
                </motion.div>
                <div className="space-y-1.5">
                  <p className="font-display text-lg font-bold text-[#0D0F14]">
                    Thank you, {name.trim()}!
                  </p>
                  <p className="text-sm text-[#555B66] leading-relaxed max-w-sm mx-auto">
                    Our team at The Promos has received your interest in{' '}
                    <span className="font-semibold text-[#0D0F14]">{selectedPackage}</span>. We
                    will reach out on WhatsApp ({phone}) within 24 hours with a tailored content
                    audit.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-7 py-2.5 rounded-full bg-[#0D0F14] hover:bg-[#1E222B] text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Back to website
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                <p className="text-sm text-[#555B66]">
                  Share a few details and we&apos;ll prepare a custom reel strategy before our
                  discovery call.
                </p>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    className="rounded-xl bg-[#FFF2F4] border border-[#E11D35]/25 px-4 py-2.5 text-sm font-medium text-[#A3152A]"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-xs font-semibold text-[#2A2E37] mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. / Founder Name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-sm text-[#0D0F14] placeholder:text-[#8C93A0] focus:outline-none focus:border-[#E11D35] focus:ring-2 focus:ring-[#E11D35]/15"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-phone"
                      className="block text-xs font-semibold text-[#2A2E37] mb-1.5"
                    >
                      WhatsApp / Phone *
                    </label>
                    <input
                      id="inquiry-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-sm text-[#0D0F14] placeholder:text-[#8C93A0] focus:outline-none focus:border-[#E11D35] focus:ring-2 focus:ring-[#E11D35]/15"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block text-xs font-semibold text-[#2A2E37] mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-sm text-[#0D0F14] placeholder:text-[#8C93A0] focus:outline-none focus:border-[#E11D35] focus:ring-2 focus:ring-[#E11D35]/15"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-handle"
                      className="block text-xs font-semibold text-[#2A2E37] mb-1.5"
                    >
                      Instagram Handle
                    </label>
                    <input
                      id="inquiry-handle"
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="@yourhandle"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-sm text-[#0D0F14] placeholder:text-[#8C93A0] focus:outline-none focus:border-[#E11D35] focus:ring-2 focus:ring-[#E11D35]/15"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-package"
                    className="block text-xs font-semibold text-[#2A2E37] mb-1.5"
                  >
                    Preferred Rhythm
                  </label>
                  <select
                    id="inquiry-package"
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 bg-white text-sm text-[#0D0F14] focus:outline-none focus:border-[#E11D35] focus:ring-2 focus:ring-[#E11D35]/15"
                  >
                    {PACKAGES.map((pkg) => (
                      <option key={pkg.id} value={pkg.name}>
                        {pkg.name} ({pkg.volume})
                      </option>
                    ))}
                    <option value="Custom Enterprise Plan">Custom Personal Brand Plan</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-notes"
                    className="block text-xs font-semibold text-[#2A2E37] mb-1.5"
                  >
                    Your Niche &amp; Goal (Optional)
                  </label>
                  <textarea
                    id="inquiry-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g., Doctor building patient trust, founder growing inbound leads, educator scaling courses..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-sm text-[#0D0F14] placeholder:text-[#8C93A0] focus:outline-none focus:border-[#E11D35] focus:ring-2 focus:ring-[#E11D35]/15 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-sheen w-full py-3.5 px-6 rounded-full bg-[#E11D35] hover:bg-[#C4162C] text-white text-sm font-semibold transition-colors duration-150 shadow-[0_10px_24px_-8px_rgba(225,29,53,0.55)] cursor-pointer"
                >
                  Request Strategy Call
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
