import { motion, useInView } from 'motion/react';
import { type HTMLAttributes, type ReactNode, useEffect, useRef, useState } from 'react';

export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  amount?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.65,
  y = 26,
  x = 0,
  scale = 1,
  amount = 0.16,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE_EDITORIAL }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedMetricProps {
  value: string;
  className?: string;
}

/**
 * Smoothly animates milestone strings like "~93K Followers", "50.2K Followers", "~3.3K Followers"
 * from 0 up to the target number the first time it enters the viewport.
 */
export function AnimatedMetric({ value, className }: AnimatedMetricProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }

    const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
    const duration = 1150;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3.2);
      const current = target * eased;
      const formatted = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

interface SpotlightSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glowColor?: string;
  glowSize?: number;
}

/**
 * Adds a subtle, modern cursor-tracking radial spotlight sheen over cards without changing layout.
 */
export function SpotlightSurface({
  children,
  className = '',
  glowColor = 'rgba(225, 29, 53, 0.14)',
  glowSize = 320,
  ...rest
}: SpotlightSurfaceProps) {
  const [spot, setSpot] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });

  return (
    <div
      {...rest}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
        rest.onMouseMove?.(e);
      }}
      onMouseLeave={(e) => {
        setSpot((prev) => ({ ...prev, visible: false }));
        rest.onMouseLeave?.(e);
      }}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        style={{
          opacity: spot.visible ? 1 : 0,
          background: `radial-gradient(${glowSize}px circle at ${spot.x}px ${spot.y}px, ${glowColor}, transparent 70%)`,
        }}
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
      />
      {children}
    </div>
  );
}
