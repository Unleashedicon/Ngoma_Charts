"use client";

import { Facebook, Instagram, Moon, Send, Sun } from "lucide-react";
import { useNavigate } from "react-router";
import { useTheme } from "@/hooks/useTheme";
import { FadeIn } from "@/components/FadeIn";

const QUICK_LINKS = [
  { label: 'Home',         action: 'home' },
  { label: 'Charts',       action: 'charts' },
  { label: 'Analytics',    action: 'analytics' },
  { label: 'Year End',     action: 'year-end' },
  { label: 'News',         action: 'news' },
];

export function FooterSection() {
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();

  const go = (action: string) => {
    if (action === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    else navigate(`/app#${action}`);
  };

  return (
    <footer
      id="contact"
      className="relative border-t border-[var(--lp-border)] bg-[var(--lp-surface)] text-[var(--lp-text)] transition-colors duration-300"
    >
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Newsletter */}
          <FadeIn>
            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold tracking-tight">Stay Connected</h2>
              <p className="mb-6 text-[var(--lp-text-muted)]">
                Join our newsletter for the latest chart updates and exclusive music insights.
              </p>
              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-10 rounded-md border border-[var(--lp-border)] bg-[var(--lp-input-bg)] px-3 py-2 text-sm text-[var(--lp-text)] placeholder:text-[var(--lp-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lp-gold)] pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-[var(--lp-gold)] text-white flex items-center justify-center transition-transform hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </button>
              </form>
              <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-[var(--lp-gold)]/10 blur-2xl" />
            </div>
          </FadeIn>

          {/* Quick Links */}
          <FadeIn delay={0.1}>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
              <nav className="space-y-2 text-sm">
                {QUICK_LINKS.map(({ label, action }) => (
                  <button
                    key={label}
                    onClick={() => go(action)}
                    className="block w-full text-left text-[var(--lp-text-muted)] transition-colors hover:text-[var(--lp-gold)]"
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </div>
          </FadeIn>

          {/* Contact */}
          <FadeIn delay={0.2}>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
              <address className="space-y-2 text-sm not-italic text-[var(--lp-text-muted)]">
                <p>Nairobi, Kenya</p>
                <p>Music Ranking Intelligence</p>
                <p>Email: hello@ngomacharts.co.ke</p>
              </address>
            </div>
          </FadeIn>

          {/* Social + Theme toggle */}
          <FadeIn delay={0.3}>
            <div className="relative">
              <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
              <div className="mb-6 flex space-x-4">
                <a
                  href="https://www.facebook.com/ngomacharts"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-[var(--lp-border)] text-[var(--lp-text-muted)] hover:bg-[var(--lp-stripe)] hover:text-[var(--lp-gold)] transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://x.com/Ngoma_Charts"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="X"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-[var(--lp-border)] text-[var(--lp-text-muted)] hover:bg-[var(--lp-stripe)] hover:text-[var(--lp-gold)] transition-colors"
                >
                  {/* X (formerly Twitter) logo */}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.8 5h2.2l-4.8 5.5L20 19h-4.4l-3.5-4.6L8 19H5.8l5.1-5.9L5 5h4.5l3.1 4.2L16.8 5Zm-.8 12.6h1.2L9.1 6.3H7.8L16 17.6Z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/ngoma_charts/"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-[var(--lp-border)] text-[var(--lp-text-muted)] hover:bg-[var(--lp-stripe)] hover:text-[var(--lp-gold)] transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Sun className="h-4 w-4 text-[var(--lp-gold)]" />
                <button
                  onClick={toggle}
                  className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lp-gold)]"
                  style={{ backgroundColor: isDark ? 'var(--lp-gold)' : 'var(--lp-border-strong)' }}
                  role="switch"
                  aria-checked={isDark}
                  aria-label="Toggle dark mode"
                >
                  <span
                    className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform ${
                      isDark ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <Moon className="h-4 w-4 text-[var(--lp-text-muted)]" />
                <span className="text-xs text-[var(--lp-text-muted)] uppercase tracking-wider">
                  {isDark ? 'Dark' : 'Light'}
                </span>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--lp-border)] pt-8 text-center md:flex-row">
          <p className="text-sm text-[var(--lp-text-muted)]">
            &copy; 2026 Ngoma Charts. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm text-[var(--lp-text-muted)]">
            <a href="#" className="transition-colors hover:text-[var(--lp-gold)]">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-[var(--lp-gold)]">Terms of Service</a>
            <a href="#" className="transition-colors hover:text-[var(--lp-gold)]">Cookie Settings</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
