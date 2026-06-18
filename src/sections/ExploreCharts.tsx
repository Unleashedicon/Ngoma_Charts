import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '@/components/FadeIn';
import { exploreCards } from '@/data/albums';

function ExploreCard({
  card,
  index,
  totalCards,
}: {
  card: (typeof exploreCards)[0];
  index: number;
  totalCards: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, targetScale]);

  return (
    <div
      ref={ref}
      className="h-[85vh] sticky"
      style={{ top: `${index * 28 + 96}px` }}
    >
      <motion.div
        style={{ scale }}
        className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col"
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-baseline gap-3 sm:gap-4">
            <span
              className="font-black text-[#0C0C0C] leading-none"
              style={{
                fontSize: 'clamp(3rem, 10vw, 140px)',
                WebkitTextStroke: '1px #D7E2EA',
              }}
            >
              {card.number}
            </span>
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#646973] block mb-1">
                {card.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {card.name}
              </h3>
            </div>
          </div>
          <button className="shrink-0 rounded-full border-2 border-[#D7E2EA] px-6 py-2 sm:px-8 sm:py-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10">
            View Chart
          </button>
        </div>

        <p
          className="text-[#D7E2EA]/60 font-light leading-relaxed max-w-2xl mb-4"
          style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
        >
          {card.description}
        </p>

        {/* Image grid */}
        <div className="flex-1 flex gap-3 sm:gap-4 min-h-0 overflow-hidden">
          <div className="w-[40%] flex flex-col gap-3 sm:gap-4 min-h-0">
            <div className="flex-[2] min-h-0 rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden">
              <img
                src={card.col1Images[0]}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-[3] min-h-0 rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden">
              <img
                src={card.col1Images[1]}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="w-[60%] min-h-0 rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden">
            <img
              src={card.col2Image}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ExploreCharts() {
  return (
    <section
      id="explore"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 md:pt-32 pb-20"
    >
      <FadeIn>
        <h2
          className="hero-heading font-black uppercase tracking-tight text-center mb-16 sm:mb-20 md:mb-28 font-kanit"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Explore Charts
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto">
        {exploreCards.map((card, i) => (
          <ExploreCard key={card.number} card={card} index={i} totalCards={exploreCards.length} />
        ))}
      </div>
    </section>
  );
}