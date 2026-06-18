import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '@/components/FadeIn';
import { ContactButton } from '@/components/ContactButton';

const aboutText = "With more than five years of experience in music and design, I focus on branding, web design, and user experience. I truly enjoy working with artists and businesses that aim to stand out and present their best image. Let's build something incredible together!";

function AnimatedParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');

  return (
    <p ref={ref} className="text-center leading-relaxed max-w-[560px] mx-auto" style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
        );
      })}
    </p>
  );
}

function Word({ word, progress, range }: { word: string; progress: ReturnType<typeof useScroll>['scrollYProgress']; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span className="inline-block mr-[0.25em]" style={{ opacity, color: '#D7E2EA' }}>
      {word}
    </motion.span>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C]"
    >
      {/* Decorative corner images */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          className="absolute w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none"
          style={{ top: '4%', left: '1%' }}
          loading="lazy"
        />
      </FadeIn>

      <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          className="absolute w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none select-none"
          style={{ bottom: '8%', left: '3%' }}
          loading="lazy"
        />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          className="absolute w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none"
          style={{ top: '4%', right: '1%' }}
          loading="lazy"
        />
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt=""
          className="absolute w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none select-none"
          style={{ bottom: '8%', right: '3%' }}
          loading="lazy"
        />
      </FadeIn>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <AnimatedParagraph text={aboutText} />

        <div className="mt-16 sm:mt-20 md:mt-24">
          <ContactButton label="Contact Me" />
        </div>
      </div>
    </section>
  );
}