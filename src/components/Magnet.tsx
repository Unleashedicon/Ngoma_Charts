import { useRef, useState, useCallback, type ReactNode } from 'react';

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
  activeTransition?: string;
  inactiveTransition?: string;
}

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  className = '',
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate3d(0,0,0)');
  const [transition, setTransition] = useState(inactiveTransition);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / strength;
      const dy = (e.clientY - centerY) / strength;
      setTransform(`translate3d(${dx}px, ${dy}px, 0)`);
    },
    [strength]
  );

  const handleMouseEnter = useCallback(() => {
    setTransition(activeTransition);
  }, [activeTransition]);

  const handleMouseLeave = useCallback(() => {
    setTransform('translate3d(0,0,0)');
    setTransition(inactiveTransition);
  }, [inactiveTransition]);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: `${padding}px`,
        margin: `-${padding}px`,
        display: 'inline-block',
      }}
    >
      <div
        style={{
          transform,
          transition,
          willChange: 'transform',
          display: 'inline-block',
        }}
      >
        {children}
      </div>
    </div>
  );
}