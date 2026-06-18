import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FadeIn } from '@/components/FadeIn';
import { API_BASE } from '@/lib/config';

type NewsItem = {
  image: string;
  date: string;
  title: string;
  excerpt: string;
};

const STATIC_NEWS: NewsItem[] = [
  {
    image: '/news/news-1.png',
    date: 'Apr 12, 2026',
    title: 'Midnight Frequencies is out on every platform',
    excerpt: 'The new album lands on Spotify, Apple Music, Audiomack, Boomplay and more — here\'s the story behind the record.',
  },
  {
    image: '/news/news-2.png',
    date: 'Mar 28, 2026',
    title: 'Inside the 2026 studio and production workflow',
    excerpt: 'The gear, plugins, and habits relied on to write, produce, and mix records faster without losing the feel.',
  },
  {
    image: '/news/news-3.png',
    date: 'Mar 09, 2026',
    title: 'Announcing the Solaris EP tour dates',
    excerpt: 'Live shows are coming. Here\'s where to catch the Solaris EP performed front to back this summer.',
  },
];

const PLACEHOLDER_IMAGES = ['/news/news-1.png', '/news/news-2.png', '/news/news-3.png'];

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>(STATIC_NEWS);

  useEffect(() => {
    fetch(`${API_BASE}/news/`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length) {
          const mapped: NewsItem[] = data.slice(0, 3).map((item: any, i: number) => ({
            image: PLACEHOLDER_IMAGES[i % 3],
            date: new Date(item.published_at).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
            }),
            title: item.title,
            excerpt: item.excerpt || '',
          }));
          setNews(mapped);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="news"
      className="bg-[var(--lp-bg)] px-5 sm:px-8 md:px-10 pt-10 pb-24 sm:pb-28 md:pb-32 transition-colors duration-300"
    >
      <h2
        className="font-black uppercase leading-none tracking-tight text-center hero-heading mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        News
      </h2>

      <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 md:grid-cols-3">
        {news.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.1} y={40}>
            <article className="group flex flex-col gap-5">
              <div className="overflow-hidden rounded-[28px] sm:rounded-[32px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <span className="text-[var(--lp-text-muted)] uppercase tracking-widest text-xs font-medium">
                {item.date}
              </span>
              <h3 className="text-[var(--lp-text)] font-medium uppercase leading-tight text-xl sm:text-2xl text-balance">
                {item.title}
              </h3>
              <p className="text-[var(--lp-text-soft)] font-light leading-relaxed text-sm sm:text-base text-pretty">
                {item.excerpt}
              </p>
              <Link
                to="/app#news"
                className="text-[var(--lp-gold)] uppercase tracking-widest text-xs font-semibold transition-opacity duration-200 hover:opacity-70"
              >
                Read more →
              </Link>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
