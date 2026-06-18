import { FadeIn } from '@/components/FadeIn';
import { Magnet } from '@/components/Magnet';
import { ContactButton } from '@/components/ContactButton';
import { useTheme } from '@/hooks/useTheme';

export function HeroSection() {
  const { isDark } = useTheme();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'About', target: 'about' },
    { label: 'Charts', target: 'charts' },
    { label: 'Albums', target: 'albums' },
    { label: 'Contact', target: 'contact' },
  ];

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col overflow-x-clip"
      style={{ background: isDark ? '#0C0C0C' : '#FDFCF8' }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              className="text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70"
              style={{ color: '#D7E2EA' }}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </FadeIn>

      {/* Hero Heading */}
      <div className="overflow-hidden w-full mt-6 sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center
            text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m jack
          </h1>
        </FadeIn>
      </div>

      {/* Hero Portrait - Centered with Magnet Effect */}
      <FadeIn delay={0.6} y={30} className="absolute left-1/2 -translate-x-1/2 z-10"
        style={{ top: '50%', transform: 'translate(-50%, -50%)' }}>
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src="/hero-portrait.png"
            alt="Jack portrait"
            className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] object-contain pointer-events-none select-none"
            style={{ maxHeight: '70vh' }}
          />
        </Magnet>
      </FadeIn>

      {/* Bottom Bar */}
      <div className="mt-auto flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="font-light uppercase tracking-wide leading-snug
              max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{
              color: '#D7E2EA',
              fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)',
            }}
          >
            A 3D creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton label="Contact Me" />
        </FadeIn>
      </div>
    </section>
  );
}