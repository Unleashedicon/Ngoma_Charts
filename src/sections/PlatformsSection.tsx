import { FadeIn } from '@/components/FadeIn';

const PLATFORMS = [
  {
    name: 'Spotify',
    type: 'Streaming Charts',
    Logo: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-[#D7E2EA]">
        <path d="M12 0a12 12 0 100 24 12 12 0 000-24zm5.5 17.3a.75.75 0 01-1 .25c-2.8-1.7-6.3-2.1-10.4-1.1a.75.75 0 11-.34-1.46c4.5-1 8.3-.6 11.4 1.3.36.22.47.7.34 1.02zm1.5-3.3a.94.94 0 01-1.3.3c-3.2-2-8-2.55-11.8-1.4a.94.94 0 01-.55-1.8c4.3-1.3 9.6-.7 13.3 1.6.45.27.6.85.35 1.3zm.1-3.4c-3.8-2.3-10.2-2.5-13.9-1.4a1.12 1.12 0 11-.65-2.15c4.3-1.3 11.4-1 15.8 1.6a1.12 1.12 0 11-1.25 1.95z" />
      </svg>
    ),
  },
  {
    name: 'Apple Music',
    type: 'Streaming Charts',
    Logo: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-[#D7E2EA]">
        <path d="M19.5 3.2c-.4-.2-.9-.2-1.4-.1L8 5.2c-.7.2-1.2.8-1.2 1.5v9.6a3 3 0 10.9 2.1V9.5l9.9-2v6a3 3 0 10.9 2.1V4.6c0-.6-.3-1.1-1-1.4z" />
      </svg>
    ),
  },
  {
    name: 'Audiomack',
    type: 'Streaming + Downloads',
    Logo: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-8 w-8 text-[#D7E2EA]">
        <path d="M4 18l4-12 4 14 4-10 4 8" />
      </svg>
    ),
  },
  {
    name: 'Boomplay',
    type: 'Streaming Charts',
    Logo: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-[#D7E2EA]">
        <circle cx="12" cy="12" r="10" opacity="0.25" />
        <path d="M10 8l6 4-6 4z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    type: 'Music Video Views',
    Logo: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-[#D7E2EA]">
        <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6a3 3 0 00-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
      </svg>
    ),
  },
  {
    name: 'Shazam',
    type: 'Discovery & Shazams',
    Logo: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-[#D7E2EA]">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 4.5c2.8 0 5 2.2 5 5 0 1.6-.7 3-1.9 3.9l-1.2-1.2c.8-.6 1.3-1.6 1.3-2.7a3.2 3.2 0 00-3.2-3.2c-1.1 0-2.1.5-2.7 1.3L7.1 8.4A5 5 0 0111 6.5zM7.9 9.6l1.2 1.2c-.8.6-1.3 1.6-1.3 2.7a3.2 3.2 0 003.2 3.2c1.1 0 2.1-.5 2.7-1.3l1.2 1.2A5 5 0 0111 18.5c-2.8 0-5-2.2-5-5 0-1.6.7-3 1.9-3.9z" />
      </svg>
    ),
  },
];

const STATS = [
  { value: '50', label: 'Chart Positions' },
  { value: '6', label: 'Platforms' },
  { value: 'Weekly', label: 'Updated' },
  { value: 'Kenya', label: 'Market' },
];

export function PlatformsSection() {
  return (
    <section className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-16 sm:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <FadeIn>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 mb-5">
              Powered by
            </p>
            <h2
              className="font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 9vw, 110px)' }}
            >
              <span className="block text-[#A8800A]">6 Platforms.</span>
              <span className="block text-[#D7E2EA]">One Chart.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-[#9A9C9A] leading-relaxed max-w-sm text-sm sm:text-base md:text-right">
              Instead of checking six separate charts, Ngoma aggregates rankings across every major streaming and discovery platform into one definitive Kenyan chart.
            </p>
          </FadeIn>
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {PLATFORMS.map((platform, i) => {
            const { Logo } = platform;
            return (
              <FadeIn key={platform.name} delay={i * 0.07}>
                <div className="group border border-[#1E1E1E] rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-[#111111] flex flex-col gap-5 hover:border-[#2E2E2E] transition-colors duration-300">
                  <div className="flex items-start justify-between">
                    <Logo />
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] uppercase tracking-widest text-green-500/70 hidden sm:block">
                        Live
                      </span>
                    </span>
                  </div>
                  <div>
                    <p className="text-[#D7E2EA] font-semibold text-sm sm:text-base">
                      {platform.name}
                    </p>
                    <p className="text-[10px] sm:text-xs text-zinc-600 mt-1 uppercase tracking-widest">
                      {platform.type}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Stats bar */}
        <FadeIn delay={0.5}>
          <div className="mt-12 sm:mt-16 border-t border-[#1E1E1E] pt-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
