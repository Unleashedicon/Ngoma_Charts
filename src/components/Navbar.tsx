import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { CHARTS_APP_URL } from '@/lib/config';

const navLinks = [
  { label: 'Charts',    hash: 'charts' },
  { label: 'Trending',  hash: 'trending' },
  { label: 'Artists',   hash: 'artists' },
  { label: 'Analytics', hash: 'analytics' },
  { label: 'Records',   hash: 'records' },
  { label: 'Year End',  hash: 'year-end' },
  { label: 'News',      hash: 'news' },
];

export function Navbar() {
  const { isDark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goTo = (hash: string) => {
    window.open(`${CHARTS_APP_URL}/#${hash}`, '_blank', 'noopener,noreferrer');
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
          ? 'bg-[#0C0C0C]/95 backdrop-blur-md border-b border-[#262626]'
          : 'bg-transparent'
      }`}
    >
      {/* Utility bar */}
      <div className="bg-[#1A1A1A] px-4 py-1 text-center">
        <p className="text-[10px] sm:text-xs text-[#746159] uppercase tracking-widest">
          June 2026 — Ngoma Top 50 (Kenya) — Combined Chart
        </p>
      </div>

      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 sm:py-4">
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="flex items-baseline gap-1 shrink-0"
        >
          <span className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-[#F4F3EF]">
            NGOMA
          </span>
          <span className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-[#A8800A]">
            CHARTS
          </span>
          <span className="text-[10px] sm:text-xs text-[#A8800A] font-medium ml-0.5 hidden sm:inline">
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
                  ? 'bg-[#2A2316] text-[#F4F3EF]'
                  : 'text-[#9A9C9A] hover:text-[#F4F3EF]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side: theme toggle + hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggle}
            className="flex items-center gap-2 rounded-full border border-[#262626] px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-all hover:bg-[#262626]"
          >
            {isDark ? (
              <>
                <Moon className="h-3.5 w-3.5 text-[#A8800A]" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Sun className="h-3.5 w-3.5 text-[#A8800A]" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          {/* Hamburger — visible below lg */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-[#262626] text-[#D7E2EA] hover:bg-[#262626] transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0C0C0C]/98 border-t border-[#1E1E1E] px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => goTo(link.hash)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium uppercase tracking-wider transition-colors ${
                link.label === 'Charts'
                  ? 'bg-[#2A2316] text-[#F4F3EF]'
                  : 'text-[#9A9C9A] hover:text-[#F4F3EF] hover:bg-[#161616]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {scrolled && !menuOpen && <div className="h-px bg-[#2E2E2E]" />}
    </nav>
  );
}
