import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

type Cover = { src: string; alt: string };

type Breakpoint = 'sm' | 'md' | 'lg';

const SIZES: Record<Breakpoint, { radius: number; height: number; coverSize: number; verticalStep: number; duration: number }> = {
  sm: { radius: 165, height: 300, coverSize:  78, verticalStep: 11, duration: 52 },
  md: { radius: 255, height: 400, coverSize: 122, verticalStep: 17, duration: 44 },
  lg: { radius: 315, height: 480, coverSize: 162, verticalStep: 23, duration: 38 },
};

function getBreakpoint(): Breakpoint {
  const w = window.innerWidth;
  return w < 640 ? 'sm' : w < 1024 ? 'md' : 'lg';
}

export function CoverflowRing({ covers }: { covers: Cover[] }) {
  const { isDark } = useTheme();
  const fadeBg = isDark ? '#0C0C0C' : '#F6F3ED';
  const [bp, setBp] = useState<Breakpoint>(getBreakpoint);

  useEffect(() => {
    const handler = () => setBp(getBreakpoint());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const { radius, height, coverSize, verticalStep, duration } = SIZES[bp];
  const N = covers.length;

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      {/* Ambient gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(168,128,10,0.13) 0%, rgba(168,128,10,0.04) 50%, transparent 75%)',
        }}
      />

      {/* Top & bottom fade into section bg */}
      <div className="absolute inset-x-0 top-0 h-14 z-10 pointer-events-none" style={{ background: `linear-gradient(to bottom, ${fadeBg}, transparent)` }} />
      <div className="absolute inset-x-0 bottom-0 h-14 z-10 pointer-events-none" style={{ background: `linear-gradient(to top, ${fadeBg}, transparent)` }} />

      {/* 3D stage */}
      <div
        className="absolute inset-0 mx-auto"
        style={{ perspective: 1400, maxWidth: 1200 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d', transformOrigin: '50% 50%' }}
          animate={{ rotateY: 360 }}
          transition={{ repeat: Infinity, duration, ease: 'linear' }}
        >
          {covers.map((cover, i) => {
            const angle = (i / N) * 360;
            const lift = (i - (N - 1) / 2) * verticalStep;
            return (
              <div
                key={`${cover.src}-${i}`}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: coverSize,
                  height: coverSize,
                  marginLeft: -coverSize / 2,
                  marginTop: -coverSize / 2,
                  transform: `rotateY(${angle}deg) translateZ(${radius}px) translateY(${lift}px)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="w-full h-full rounded-xl overflow-hidden shadow-2xl"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <img
                    src={cover.src}
                    alt={cover.alt}
                    className="w-full h-full object-cover block"
                    draggable={false}
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
