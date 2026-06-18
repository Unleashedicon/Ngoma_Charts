import { ArrowRight, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChartMovement } from '@/types';
import { FadeIn } from '@/components/FadeIn';
import { chartEntries } from '@/data/albums';
import { CoverflowRing } from '@/components/CoverflowRing';

interface MovementBadgeProps {
  movement: ChartMovement;
  size?: 'sm' | 'lg';
}

function MovementBadge({ movement, size = 'sm' }: MovementBadgeProps) {
  const dims = size === 'lg' ? 'h-7 px-2.5 text-sm gap-1' : 'h-5 w-5 justify-center';
  const iconSize = size === 'lg' ? 'h-3.5 w-3.5' : 'h-3 w-3';

  if (movement === 'new') {
    return (
      <span
        className={cn(
          'inline-flex items-center rounded-md bg-[#A8800A] font-bold text-black',
          dims,
          size === 'sm' && 'text-[10px] px-1'
        )}
      >
        NEW
      </span>
    );
  }

  const colorClass =
    movement === 'up'
      ? 'bg-green-600 text-white'
      : movement === 'down'
      ? 'bg-red-600 text-white'
      : 'bg-zinc-700 text-zinc-300';

  const Icon = movement === 'up' ? ArrowUp : movement === 'down' ? ArrowDown : Minus;

  return (
    <span className={cn('inline-flex items-center rounded-md font-bold', dims, colorClass)}>
      <Icon className={iconSize} />
    </span>
  );
}

const ringCovers = chartEntries.map((e) => ({ src: e.coverUrl, alt: e.title }));

export function ChartLeaderboard() {
  const [leader, ...rest] = chartEntries;

  return (
    <section id="charts" className="bg-[#0C0C0C] px-4 pt-16 pb-0 sm:px-8 md:pt-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl font-kanit">
              Ngoma Top 10
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#9A9C9A] sm:text-base">
              The top performing songs across radio and streaming platforms in Kenya this week.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Coverflow ring — full bleed */}
      <FadeIn delay={0.15}>
        <CoverflowRing covers={ringCovers} />
      </FadeIn>

      {/* Caption */}
      <FadeIn delay={0.2}>
        <p className="text-center text-[10px] sm:text-xs uppercase tracking-[0.3em] text-zinc-600 mb-10 sm:mb-14">
          Top albums in rotation
        </p>
      </FadeIn>

      <div className="mx-auto max-w-6xl pb-16 md:pb-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,360px)_1fr] md:gap-12">
          {leader && (
            <FadeIn delay={0.1}>
              <div className="flex flex-col items-center md:items-start">
                <div className="relative w-full max-w-[340px]">
                  <div className="absolute -left-3 -top-3 z-10">
                    <span className="flex items-center gap-1 rounded-md bg-green-600 px-2.5 py-1 text-sm font-bold text-white">
                      {leader.rank}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <img
                    src={leader.coverUrl}
                    alt={`${leader.title} cover art`}
                    className="aspect-square w-full rounded-md object-cover"
                  />
                </div>
                <div className="mt-4 text-center md:text-left">
                  <p className="text-xl font-bold text-white sm:text-2xl">{leader.title}</p>
                  <p className="mt-1 text-sm text-[#9A9C9A] sm:text-base">{leader.artist}</p>
                </div>
              </div>
            </FadeIn>
          )}

          <ol className="flex flex-col divide-y divide-[#262626]">
            {rest.map((entry, idx) => (
              <FadeIn key={entry.rank} delay={0.05 * (idx + 1)}>
                <li className="flex items-center gap-4 py-3 transition-colors hover:bg-white/5 sm:gap-5">
                  <span className="w-6 shrink-0 text-right text-base font-bold text-white sm:text-lg">
                    {entry.rank}
                  </span>
                  <div className="shrink-0">
                    <MovementBadge movement={entry.movement} />
                  </div>
                  <img
                    src={entry.coverUrl}
                    alt={`${entry.title} cover art`}
                    className="h-10 w-10 shrink-0 rounded object-cover sm:h-12 sm:w-12"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white sm:text-base">
                      {entry.title}
                    </p>
                    <p className="truncate text-xs text-[#9A9C9A] sm:text-sm">{entry.artist}</p>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}