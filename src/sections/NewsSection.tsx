import { FadeIn } from "@/components/FadeIn";

const NEWS = [
  {
    image: "/news/news-1.png",
    date: "Apr 12, 2026",
    title: "Midnight Frequencies is out on every platform",
    excerpt:
      "The new album lands on Spotify, Apple Music, Audiomack, Boomplay and more — here's the story behind the record.",
  },
  {
    image: "/news/news-2.png",
    date: "Mar 28, 2026",
    title: "Inside my 2026 studio and production workflow",
    excerpt:
      "The gear, plugins, and habits i rely on to write, produce, and mix records faster without losing the feel.",
  },
  {
    image: "/news/news-3.png",
    date: "Mar 09, 2026",
    title: "Announcing the Solaris EP tour dates",
    excerpt:
      "Live shows are coming. Here's where to catch the Solaris EP performed front to back this summer.",
  },
];

export function NewsSection() {
  return (
    <section
      id="news"
      className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-10 pb-24 sm:pb-28 md:pb-32"
    >
      <h2
        className="font-black uppercase leading-none tracking-tight text-center text-white mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        News
      </h2>

      <div className="mx-auto grid max-w-6xl gap-6 sm:gap-8 md:grid-cols-3">
        {NEWS.map((item, i) => (
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
              <span className="text-[#D7E2EA]/50 uppercase tracking-widest text-xs font-medium">
                {item.date}
              </span>
              <h3 className="text-[#D7E2EA] font-medium uppercase leading-tight text-xl sm:text-2xl text-balance">
                {item.title}
              </h3>
              <p className="text-[#D7E2EA]/60 font-light leading-relaxed text-sm sm:text-base text-pretty">
                {item.excerpt}
              </p>
              <a
                href="#news"
                className="text-[#D7E2EA] uppercase tracking-widest text-xs font-medium transition-opacity duration-200 hover:opacity-70"
              >
                Read more
              </a>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
