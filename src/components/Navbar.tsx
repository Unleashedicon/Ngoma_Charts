import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Charts',    hash: 'charts' },
  { label: 'Analytics', hash: 'analytics' },
  { label: 'Records',   hash: 'records' },
  { label: 'Year End',  hash: 'year-end' },
  { label: 'Certs',     hash: 'certifications' },
  { label: 'News',      hash: 'news' },
];

export function Navbar() {
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goTo = (hash: string) => {
    navigate(`/app#${hash}`);
    setMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-[var(--lp-bg)]/95 backdrop-blur-md border-b border-[var(--lp-border)]'
          : 'bg-transparent'
      }`}
    >
      {/* Utility bar */}
      <div className="bg-[var(--lp-utility-bar)] px-4 py-1 text-center">
        <p className="text-[10px] sm:text-xs text-[var(--lp-text-muted)] uppercase tracking-widest">
          June 2026 — Ngoma Top 50 (Kenya) — Combined Chart
        </p>
      </div>

      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 sm:py-4">
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="flex items-baseline gap-1 shrink-0"
        >
          <span className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-[var(--lp-text)]">
            NGOMA
          </span>
          <span className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-[var(--lp-gold)]">
            CHARTS
          </span>
          <span className="text-[10px] sm:text-xs text-[var(--lp-gold)] font-medium ml-0.5 hidden sm:inline">
            (KENYA)
          </span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => goTo(link.hash)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                link.label === 'Charts'
                  ? 'bg-[var(--lp-gold-soft)] text-[var(--lp-gold)] border border-[var(--lp-gold-border)]'
                  : 'text-[var(--lp-text-muted)] hover:text-[var(--lp-text)]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right: theme toggle + hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggle}
            className="flex items-center gap-2 rounded-full border border-[var(--lp-border)] px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium uppercase tracking-wider text-[var(--lp-text-soft)] transition-all hover:bg-[var(--lp-card-border)]"
          >
            {isDark ? (
              <>
                <Moon className="h-3.5 w-3.5 text-[var(--lp-gold)]" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Sun className="h-3.5 w-3.5 text-[var(--lp-gold)]" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-[var(--lp-border)] text-[var(--lp-text-soft)] hover:bg-[var(--lp-card-border)] transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[var(--lp-bg)]/98 border-t border-[var(--lp-border)] px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => goTo(link.hash)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium uppercase tracking-wider transition-colors ${
                link.label === 'Charts'
                  ? 'bg-[var(--lp-gold-soft)] text-[var(--lp-gold)]'
                  : 'text-[var(--lp-text-muted)] hover:text-[var(--lp-text)] hover:bg-[var(--lp-stripe)]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {scrolled && !menuOpen && <div className="h-px bg-[var(--lp-border)]" />}
    </nav>
  );
}
