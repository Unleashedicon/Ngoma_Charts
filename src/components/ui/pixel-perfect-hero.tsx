"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

/* ---------------------------------------------------------------------------
 * MUSIC PLATFORM LOGO COMPONENTS
 * ------------------------------------------------------------------------ */

const BRAND_LOGOS: { name: string; Logo: React.FC }[] = [
  {
    name: "Spotify",
    Logo: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 0a12 12 0 100 24 12 12 0 000-24zm5.5 17.3a.75.75 0 01-1 .25c-2.8-1.7-6.3-2.1-10.4-1.1a.75.75 0 11-.34-1.46c4.5-1 8.3-.6 11.4 1.3.36.22.47.7.34 1.02zm1.5-3.3a.94.94 0 01-1.3.3c-3.2-2-8-2.55-11.8-1.4a.94.94 0 01-.55-1.8c4.3-1.3 9.6-.7 13.3 1.6.45.27.6.85.35 1.3zm.1-3.4c-3.8-2.3-10.2-2.5-13.9-1.4a1.12 1.12 0 11-.65-2.15c4.3-1.3 11.4-1 15.8 1.6a1.12 1.12 0 11-1.25 1.95z" />
      </svg>
    ),
  },
  {
    name: "Apple Music",
    Logo: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M19.5 3.2c-.4-.2-.9-.2-1.4-.1L8 5.2c-.7.2-1.2.8-1.2 1.5v9.6a3 3 0 10.9 2.1V9.5l9.9-2v6a3 3 0 10.9 2.1V4.6c0-.6-.3-1.1-1-1.4z" />
      </svg>
    ),
  },
  {
    name: "Audiomack",
    Logo: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-6 w-6">
        <path d="M4 18l4-12 4 14 4-10 4 8" />
      </svg>
    ),
  },
  {
    name: "Boomplay",
    Logo: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <circle cx="12" cy="12" r="10" opacity="0.25" />
        <path d="M10 8l6 4-6 4z" />
      </svg>
    ),
  },
  {
    name: "Shazam",
    Logo: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 4.5c2.8 0 5 2.2 5 5 0 1.6-.7 3-1.9 3.9l-1.2-1.2c.8-.6 1.3-1.6 1.3-2.7a3.2 3.2 0 00-3.2-3.2c-1.1 0-2.1.5-2.7 1.3L7.1 8.4A5 5 0 0111 6.5zM7.9 9.6l1.2 1.2c-.8.6-1.3 1.6-1.3 2.7a3.2 3.2 0 003.2 3.2c1.1 0 2.1-.5 2.7-1.3l1.2 1.2A5 5 0 0111 18.5c-2.8 0-5-2.2-5-5 0-1.6.7-3 1.9-3.9z" />
      </svg>
    ),
  },
];

/* ---------------------------------------------------------------------------
 * CANVAS STAGGERED PHYSICS ENGINE
 * ------------------------------------------------------------------------ */

type Pixel = {
  x: number;
  y: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInt: number;
  maxSize: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;
  draw: () => void;
  appear: () => void;
  disappear: () => void;
  shimmer: () => void;
};

function createPixel(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  color: string,
  baseSpeed: number,
  delay: number
): Pixel {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  const p: Pixel = {
    x, y, color, ctx,
    speed: rand(0.08, 0.4) * baseSpeed,
    size: 0,
    sizeStep: rand(0.12, 0.28),
    minSize: 0.5,
    maxSizeInt: 2,
    maxSize: rand(0.5, 2),
    delay,
    counter: 0,
    counterStep: rand(1.8, 3.2) + (canvas.width + canvas.height) * 0.008,
    isIdle: false,
    isReverse: false,
    isShimmer: false,
    draw() {
      const offset = p.maxSizeInt * 0.5 - p.size * 0.5;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size);
    },
    appear() {
      p.isIdle = false;
      if (p.counter <= p.delay) {
        p.counter += p.counterStep;
        return;
      }
      if (p.size >= p.maxSize) p.isShimmer = true;
      if (p.isShimmer) p.shimmer();
      else p.size += p.sizeStep;
      p.draw();
    },
    disappear() {
      p.isShimmer = false;
      p.counter = 0;
      if (p.size <= 0) {
        p.isIdle = true;
        return;
      }
      p.size -= 0.1;
      p.draw();
    },
    shimmer() {
      if (p.size >= p.maxSize) p.isReverse = true;
      else if (p.size <= p.minSize) p.isReverse = false;
      if (p.isReverse) p.size -= p.speed;
      else p.size += p.speed;
    },
  };

  return p;
}

type PixelCanvasProps = {
  colors: string[];
  gap?: number;
  speed?: number;
};

function PixelCanvas({ colors, gap = 5, speed = 30 }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const animationRef = useRef(0);
  const lastFrameRef = useRef(performance.now());
  const reducedMotionRef = useRef(false);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || colors.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = wrap.getBoundingClientRect();
    const w = Math.floor(width);
    const h = Math.floor(height);
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const effectiveSpeed = reducedMotionRef.current ? 0 : Math.min(speed, 100) * 0.001;
    const pixels: Pixel[] = [];

    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dx = x - w / 2;
        const dy = y - h / 2;
        const delay = reducedMotionRef.current ? 0 : Math.sqrt(dx * dx + dy * dy) * 0.65;
        pixels.push(createPixel(ctx, canvas, x, y, color, effectiveSpeed, delay));
      }
    }

    pixelsRef.current = pixels;
  }, [colors, gap, speed]);

  const animate = useCallback((mode: "appear" | "disappear") => {
    cancelAnimationFrame(animationRef.current);
    const frameInterval = 1000 / 60;

    const loop = () => {
      animationRef.current = requestAnimationFrame(loop);

      const now = performance.now();
      const elapsed = now - lastFrameRef.current;
      if (elapsed < frameInterval) return;
      lastFrameRef.current = now - (elapsed % frameInterval);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pixels = pixelsRef.current;
      for (const pixel of pixels) pixel[mode]();

      if (pixels.every((p) => p.isIdle)) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    animationRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    init();

    const resizeObserver = new ResizeObserver(() => init());
    if (wrapRef.current) resizeObserver.observe(wrapRef.current);

    animate("appear");

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [init, animate]);

  return (
    <div ref={wrapRef} className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * HERO COMPONENT
 * ------------------------------------------------------------------------ */

interface PixelHeroProps {
  word1?: string;
  word2?: string;
  description?: string;
  primaryCta?: string;
  primaryCtaMobile?: string;
  secondaryCta?: string;
  secondaryCtaMobile?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export function PixelHero({
  word1 = "Jack",
  word2 = "Music.",
  description = "Aggregating Kenyan music charts across six platforms into a unified voice. Every beat, every rise, every number one — tracked in real time.",
  primaryCta = "Explore Charts",
  primaryCtaMobile = "Explore",
  secondaryCta = "View Albums",
  secondaryCtaMobile = "Albums",
  onPrimaryClick,
  onSecondaryClick,
}: PixelHeroProps) {
  const { isDark } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [themeColors, setThemeColors] = useState<string[]>([]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const div = document.createElement("div");
    document.body.appendChild(div);
    div.className = "text-muted-foreground";
    const muted = getComputedStyle(div).color;
    div.className = "text-primary";
    const primary = getComputedStyle(div).color;
    document.body.removeChild(div);

    setThemeColors([muted, muted, muted, muted, primary]);

    const loadTimer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(loadTimer);
  }, [isDark]);

  return (
    <section className={cn(
      "relative w-full min-h-[100dvh] flex flex-col overflow-hidden bg-[var(--lp-bg)] transition-opacity duration-700",
      isLoaded ? "opacity-100" : "opacity-0"
    )}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>

      {/* Canvas background */}
      <div className="absolute inset-0 z-0">
        {themeColors.length > 0 && (
          <PixelCanvas colors={themeColors} gap={5} speed={30} />
        )}
      </div>

      {/* Top: Glass Header */}
      <div className="relative z-10 flex-1 flex items-start justify-center pt-24 sm:pt-28 md:pt-32">
        <h1 className="tahoe-glass-text text-center font-kanit font-black uppercase leading-[0.9] tracking-tighter">
          <span className="block text-[14vw] sm:text-[12vw] md:text-[10vw]">{word1}</span>
          <span className="block text-[14vw] sm:text-[12vw] md:text-[10vw]">{word2}</span>
        </h1>
      </div>

      {/* Center: Description */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 pb-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm sm:text-base md:text-lg text-[var(--lp-text-soft)] leading-relaxed mb-6">
            {description}
          </p>
        </div>
      </div>

      {/* Bottom: CTA Row */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 pb-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <button
          onClick={onPrimaryClick}
          className="group relative overflow-hidden rounded-full bg-[var(--lp-text)] px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-medium uppercase tracking-widest text-[var(--lp-bg)] transition-all hover:opacity-85"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className="sm:hidden">{primaryCtaMobile}</span>
            <span className="hidden sm:inline">{primaryCta}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </button>
        <button
          onClick={onSecondaryClick}
          className="rounded-full border border-[var(--lp-border-strong)] px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-medium uppercase tracking-widest text-[var(--lp-text-soft)] transition-all hover:bg-[var(--lp-stripe)]"
        >
          <span className="sm:hidden">{secondaryCtaMobile}</span>
          <span className="hidden sm:inline">{secondaryCta}</span>
        </button>
      </div>

      {/* Streaming platforms marquee */}
      <div className="relative z-10 pb-10 pt-6">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-[var(--lp-text-muted)] mb-5">
          Stream everywhere
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-14 pr-14">
            {[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map(({ name, Logo }, i) => (
              <div key={i} className={cn(
                "flex items-center gap-2 transition-colors shrink-0",
                isDark ? "text-zinc-500 hover:text-zinc-200" : "text-[var(--lp-text-muted)] hover:text-[var(--lp-text)]"
              )}>
                <Logo />
                <span className="text-sm font-medium tracking-wide">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
