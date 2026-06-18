"use client";

import * as React from "react";
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/FadeIn";

export function FooterSection() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const handleToggle = () => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove("dark");
      localStorage.setItem("ngoma-theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("ngoma-theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <footer
      id="contact"
      className="relative border-t bg-[#0C0C0C] text-[#D7E2EA] transition-colors duration-300"
    >
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Newsletter */}
          <FadeIn>
            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold tracking-tight">Stay Connected</h2>
              <p className="mb-6 text-[#9A9C9A]">
                Join our newsletter for the latest chart updates and exclusive music insights.
              </p>
              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-10 rounded-md border border-[#262626] bg-[#141414] px-3 py-2 text-sm text-[#F4F3EF] placeholder:text-[#646973] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8800A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C] pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-[#A8800A] text-black flex items-center justify-center transition-transform hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </button>
              </form>
              <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-[#A8800A]/10 blur-2xl" />
            </div>
          </FadeIn>

          {/* Quick Links */}
          <FadeIn delay={0.1}>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
              <nav className="space-y-2 text-sm">
                <a href="#hero" className="block transition-colors hover:text-[#A8800A]">Home</a>
                <a href="#about" className="block transition-colors hover:text-[#A8800A]">About</a>
                <a href="#charts" className="block transition-colors hover:text-[#A8800A]">Charts</a>
                <a href="#albums" className="block transition-colors hover:text-[#A8800A]">Albums</a>
                <a href="#contact" className="block transition-colors hover:text-[#A8800A]">Contact</a>
              </nav>
            </div>
          </FadeIn>

          {/* Contact */}
          <FadeIn delay={0.2}>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
              <address className="space-y-2 text-sm not-italic text-[#9A9C9A]">
                <p>Nairobi, Kenya</p>
                <p>Music Ranking Intelligence</p>
                <p>Email: hello@ngomacharts.co.ke</p>
              </address>
            </div>
          </FadeIn>

          {/* Social */}
          <FadeIn delay={0.3}>
            <div className="relative">
              <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
              <div className="mb-6 flex space-x-4">
                {[
                  { Icon: Facebook, label: 'Facebook', href: '#' },
                  { Icon: Twitter, label: 'Twitter', href: '#' },
                  { Icon: Instagram, label: 'Instagram', href: '#' },
                  { Icon: Linkedin, label: 'LinkedIn', href: '#' },
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-[#262626] bg-transparent text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-[#A8800A]" />
                <button
                  onClick={handleToggle}
                  className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8800A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C]"
                  style={{ backgroundColor: isDarkMode ? '#A8800A' : '#262626' }}
                  role="switch"
                  aria-checked={isDarkMode}
                >
                  <span
                    className={cn(
                      'pointer-events-none block h-5 w-5 rounded-full bg-[#0C0C0C] shadow-lg ring-0 transition-transform',
                      isDarkMode ? 'translate-x-5' : 'translate-x-0'
                    )}
                  />
                </button>
                <Moon className="h-4 w-4 text-[#646973]" />
                <span className="sr-only">Toggle dark mode</span>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#262626] pt-8 text-center md:flex-row">
          <p className="text-sm text-[#646973]">
            &copy; 2025 Ngoma Charts. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-[#A8800A]">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-[#A8800A]">Terms of Service</a>
            <a href="#" className="transition-colors hover:text-[#A8800A]">Cookie Settings</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}