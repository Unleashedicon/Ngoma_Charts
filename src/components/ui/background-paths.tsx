"use client";

import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full"
                viewBox="0 0 696 316"
                fill="none"
            >
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke={path.color}
                        strokeWidth={path.width}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                            duration: 2,
                            delay: path.id * 0.05,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Ngoma Charts",
}: {
    title?: string;
}) {
    const words = title.split(" ");

    return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />

            <div className="relative z-10 text-center px-4">
                <h2 className="text-5xl sm:text-6xl md:text-8xl font-kanit font-black uppercase tracking-tight hero-heading">
                    {words.map((word, wordIndex) => (
                        <span key={wordIndex} className="inline-block mr-4 sm:mr-6">
                            {word.split("").map((letter, letterIndex) => (
                                <motion.span
                                    key={letterIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: wordIndex * 0.3 + letterIndex * 0.05,
                                        ease: [0.25, 0.1, 0.25, 1],
                                    }}
                                    className="inline-block"
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </span>
                    ))}
                </h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-4 text-lg sm:text-xl text-[#6F7170] font-light tracking-wide"
                >
                    Music Ranking Intelligence
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10"
                >
                    Discover Excellence
                    <span className="text-lg">&rarr;</span>
                </motion.button>
            </div>
        </section>
    );
}