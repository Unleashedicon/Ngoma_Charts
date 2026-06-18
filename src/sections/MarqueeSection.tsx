import { useRef, useEffect, useState } from 'react';

const musicNewsItems = [
  { title: 'Bien & Alikiba\'s "Finale" Claims #1 Spot', category: 'Chart News' },
  { title: 'Kenyan Drill Scene Explodes Onto Ngoma', category: 'Trending' },
  { title: 'Sauti Sol Drops Surprise EP', category: 'New Release' },
  { title: '14 New Entries This Week', category: 'Chart Update' },
  { title: 'Khaligraph Jones Breaks Streaming Record', category: 'Records' },
  { title: 'Gengetone Revival Continues Strong', category: 'Analysis' },
  { title: 'Cross-Platform Hits Hit All-Time High', category: 'Analytics' },
  { title: 'Nadia Mukami Leads Female Artists', category: 'Artists' },
  { title: 'Apple Music Kenya Charts Synced', category: 'Platforms' },
  { title: 'Year-End Countdown Begins', category: 'Year End' },
  { title: 'Diamond Platnumz Crosses Borders', category: 'Regional' },
];

function NewsCard({ title, category }: { title: string; category: string }) {
  return (
    <div className="shrink-0 w-[380px] sm:w-[420px] rounded-2xl border border-[#262626] bg-[#141414] p-5 flex flex-col gap-2">
      <span className="text-[10px] uppercase tracking-widest text-[#A8800A] font-semibold">
        {category}
      </span>
      <p className="text-sm sm:text-base text-[#D7E2EA] font-medium leading-snug">
        {title}
      </p>
    </div>
  );
}

export function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollVal = (window.scrollY - rect.top + window.innerHeight) * 0.3;
      setOffset(scrollVal);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1 = [...musicNewsItems, ...musicNewsItems, ...musicNewsItems];
  const row2 = [...musicNewsItems.slice(5), ...musicNewsItems.slice(0, 5), ...musicNewsItems.slice(5), ...musicNewsItems.slice(0, 5), ...musicNewsItems.slice(5), ...musicNewsItems.slice(0, 5)];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="px-6 md:px-10 mb-8">
        <h3 className="text-xs uppercase tracking-widest text-[#646973] font-medium">
          Latest Music News
        </h3>
      </div>

      {/* Row 1 - moves RIGHT on scroll */}
      <div
        className="flex gap-3 mb-3"
        style={{
          transform: `translateX(${offset - 200}px)`,
          willChange: 'transform',
        }}
      >
        {row1.map((item, i) => (
          <NewsCard key={`r1-${i}`} title={item.title} category={item.category} />
        ))}
      </div>

      {/* Row 2 - moves LEFT on scroll */}
      <div
        className="flex gap-3"
        style={{
          transform: `translateX(${-(offset - 200)}px)`,
          willChange: 'transform',
        }}
      >
        {row2.map((item, i) => (
          <NewsCard key={`r2-${i}`} title={item.title} category={item.category} />
        ))}
      </div>
    </section>
  );
}