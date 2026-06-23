"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ChevronDown, Music2, Award, Globe } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { CoverflowRing } from "@/components/CoverflowRing";

/* ─────────────────────────── constants ─────────────────────────── */

const FORGIVENESS_ID = "NCyOpHmh0mA";
const yt = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

const RING_COVERS = [
  { src: yt("fXl5dPuiJa0"), alt: "Joha" },
  { src: yt("_u4_iWCvZ5c"), alt: "Organise" },
  { src: yt("qrIP_igi76U"), alt: "Terminator" },
  { src: yt("MefXQvGTYtE"), alt: "PBUY" },
  { src: yt("pn26zia2_Kk"), alt: "2:30" },
  { src: yt("sWj-zEuH4Lg"), alt: "Dupe" },
  { src: yt(FORGIVENESS_ID), alt: "Forgiveness" },
];

const TRACKS = [
  { id: "fXl5dPuiJa0", title: "Joha",        year: "2022" },
  { id: "_u4_iWCvZ5c", title: "Organise",    year: "2022" },
  { id: "qrIP_igi76U", title: "Terminator",  year: "2022" },
  { id: "MefXQvGTYtE", title: "PBUY",        year: "2023" },
  { id: "pn26zia2_Kk", title: "2:30",        year: "2023" },
  { id: "sWj-zEuH4Lg", title: "Dupe",        year: "2023" },
  { id: FORGIVENESS_ID, title: "Forgiveness", year: "2026" },
];

const PLATFORMS = [
  { name: "Spotify",     color: "#1DB954", href: "#",
    path: "M12 0a12 12 0 100 24 12 12 0 000-24zm5.5 17.3a.75.75 0 01-1 .25c-2.8-1.7-6.3-2.1-10.4-1.1a.75.75 0 11-.34-1.46c4.5-1 8.3-.6 11.4 1.3.36.22.47.7.34 1.02zm1.5-3.3a.94.94 0 01-1.3.3c-3.2-2-8-2.55-11.8-1.4a.94.94 0 01-.55-1.8c4.3-1.3 9.6-.7 13.3 1.6.45.27.6.85.35 1.3zm.1-3.4c-3.8-2.3-10.2-2.5-13.9-1.4a1.12 1.12 0 11-.65-2.15c4.3-1.3 11.4-1 15.8 1.6a1.12 1.12 0 11-1.25 1.95z" },
  { name: "Apple Music", color: "#FC3C44", href: "#",
    path: "M19.5 3.2c-.4-.2-.9-.2-1.4-.1L8 5.2c-.7.2-1.2.8-1.2 1.5v9.6a3 3 0 10.9 2.1V9.5l9.9-2v6a3 3 0 10.9 2.1V4.6c0-.6-.3-1.1-1-1.4z" },
  { name: "Audiomack",   color: "#F68B1F", href: "#", stroke: true,
    path: "M4 18l4-12 4 14 4-10 4 8" },
  { name: "Boomplay",    color: "#00CCA3", href: "#",
    path: "M12 2a10 10 0 100 20 10 10 0 000-20zm-1.5 5.5l7 4.5-7 4.5v-9z" },
];

const BIO_FACTS = [
  { Icon: Music2, label: "Born",    value: "Lagos, Nigeria · 1990" },
  { Icon: Globe,  label: "Label",   value: "YBNL Nation / Empire" },
  { Icon: Award,  label: "Awards",  value: "MOBO · Headies · BET Nom." },
];

const ALBUMS = [
  { title: "Mr. Money with the Vibe", year: "2022" },
  { title: "Work of Art",             year: "2023" },
  { title: "Lungu Boy",               year: "2024" },
  { title: "M$NEY",                   year: "2026" },
];

/* ─────────────────────────── styles ────────────────────────────── */

const STYLES = `
  @keyframes gold-shimmer {
    from { background-position: 200% center; }
    to   { background-position:   0% center; }
  }
  @keyframes asake-pulse {
    0%,100% { opacity:0.5; transform:scale(1);    }
    50%      { opacity:0.9; transform:scale(1.12); }
  }
  .asake-gold-text {
    background: linear-gradient(135deg,
      #8B6010 0%, #C8960E 20%, #FFD700 40%,
      #FFFBE6 55%, #FFD700 70%, #C8960E 85%, #8B6010 100%
    );
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gold-shimmer 6s linear infinite;
    filter: drop-shadow(0 0 60px rgba(200,150,14,0.35));
  }
  .asake-divider {
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(200,150,14,0.45), transparent);
  }
  .asake-platform-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 13px 28px; border-radius: 9999px;
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    text-decoration: none; cursor: pointer; background: transparent;
    transition: background 0.25s, color 0.25s, transform 0.15s, box-shadow 0.25s;
  }
  .asake-platform-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
  .asake-track-strip::-webkit-scrollbar { height: 4px; }
  .asake-track-strip::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); border-radius: 2px; }
  .asake-track-strip::-webkit-scrollbar-thumb { background: rgba(200,150,14,0.35); border-radius: 2px; }
`;

/* ─────────────────────────── sub-components ─────────────────────── */

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div style={{ border: "1px solid rgba(200,150,14,0.2)", borderRadius: 16, padding: "24px 28px", textAlign: "center", background: "rgba(200,150,14,0.04)", backdropFilter: "blur(8px)" }}>
      <p style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, color: "#F0B429", letterSpacing: "-0.02em", lineHeight: 1, margin: 0 }}>{number}</p>
      <p style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#7A7570", marginTop: 8, marginBottom: 0 }}>{label}</p>
    </div>
  );
}

function TrackCard({ id, title, year }: { id: string; title: string; year: string }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={`https://youtu.be/${id}`} target="_blank" rel="noopener noreferrer"
      whileHover={{ y: -10, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      style={{ display: "block", flexShrink: 0, width: 200, borderRadius: 14, overflow: "hidden", position: "relative", cursor: "pointer", textDecoration: "none", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <img src={yt(id)} alt={title} style={{ width: "100%", height: 130, objectFit: "cover", display: "block" }} loading="lazy" />
      <div style={{ position: "absolute", inset: 0, background: hov ? "rgba(3,3,3,0.65)" : "linear-gradient(to top,rgba(3,3,3,0.92) 0%,rgba(3,3,3,0.1) 60%)", transition: "background 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {hov && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-60%)", background: "rgba(200,150,14,0.9)", borderRadius: "50%", width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(200,150,14,0.5)" }}>
            <Play size={18} fill="#030303" color="#030303" />
          </div>
        )}
        <div style={{ position: "absolute", bottom: 12, left: 12 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#EDE8DF", letterSpacing: "0.04em", margin: 0 }}>{title}</p>
          <p style={{ fontSize: 10, color: "#C8960E", letterSpacing: "0.12em", margin: "3px 0 0" }}>{year}</p>
        </div>
      </div>
    </motion.a>
  );
}

/* ─────────────────────────── main page ─────────────────────────── */

export function AsakeForgiveness() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgScale   = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY     = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const chevronOp = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div style={{ background: "#030303", color: "#EDE8DF", fontFamily: "'Kanit', sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{STYLES}</style>

      {/* ── 1. HERO ── */}
      <section ref={heroRef} style={{ position: "relative", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <motion.div style={{ position: "absolute", inset: "-10%", scale: bgScale, opacity: bgOpacity }}>
          <img src={yt(FORGIVENESS_ID)} alt="Asake – Forgiveness" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(3,3,3,0.72) 0%,rgba(3,3,3,0.28) 35%,rgba(3,3,3,0.78) 75%,rgba(3,3,3,1) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 45% at 50% 55%,rgba(200,150,14,0.22) 0%,rgba(200,150,14,0.06) 50%,transparent 75%)" }} />
        </motion.div>
        {/* ambient orbs */}
        <div style={{ position: "absolute", top: "20%", left: "15%", width: 300, height: 300, borderRadius: "50%", background: "rgba(200,150,14,0.06)", filter: "blur(80px)", animation: "asake-pulse 6s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "12%", width: 250, height: 250, borderRadius: "50%", background: "rgba(200,150,14,0.05)", filter: "blur(70px)", animation: "asake-pulse 8s ease-in-out infinite 2s", pointerEvents: "none" }} />

        <motion.div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px", y: textY }}>
          <motion.p initial={{ opacity: 0, letterSpacing: "1em" }} animate={{ opacity: 1, letterSpacing: "0.55em" }} transition={{ duration: 1.4 }}
            style={{ fontSize: "0.65rem", letterSpacing: "0.55em", textTransform: "uppercase", color: "#C8960E", margin: "0 0 20px", fontWeight: 600 }}>ASAKE</motion.p>

          <motion.h1 className="asake-gold-text" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(3.8rem,17vw,13rem)", fontWeight: 900, lineHeight: 0.88, textTransform: "uppercase", letterSpacing: "-0.02em", margin: "0 0 24px" }}>
            Forgiveness
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6 }}
            style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#6B6560", margin: "0 0 44px" }}>
            FROM THE ALBUM <span style={{ color: "#C8960E" }}>M$NEY</span> · APRIL 30, 2026
          </motion.p>

          <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.95 }}
            style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.a href="#video" whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(200,150,14,0.45)" }} whileTap={{ scale: 0.97 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#C8960E", color: "#030303", padding: "14px 30px", borderRadius: 9999, fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none" }}>
              <Play size={15} fill="currentColor" /> Watch the Video
            </motion.a>
            <motion.a href="#stream" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(237,232,223,0.07)", border: "1px solid rgba(237,232,223,0.2)", color: "#EDE8DF", padding: "14px 30px", borderRadius: 9999, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", backdropFilter: "blur(10px)" }}>
              Stream Now
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", opacity: chevronOp }}
          animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
          <ChevronDown size={26} color="rgba(200,150,14,0.7)" />
        </motion.div>
      </section>

      {/* ── 2. VIDEO ── */}
      <section id="video" style={{ padding: "clamp(70px,9vw,130px) clamp(16px,4vw,48px)", maxWidth: 1020, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span style={{ display: "inline-block", fontSize: "0.62rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#C8960E", background: "rgba(200,150,14,0.1)", border: "1px solid rgba(200,150,14,0.28)", borderRadius: 9999, padding: "6px 18px" }}>Official Video</span>
          </div>
          <div style={{ borderRadius: 22, overflow: "hidden", border: "1px solid rgba(200,150,14,0.2)", boxShadow: "0 0 0 1px rgba(200,150,14,0.1),0 0 80px rgba(200,150,14,0.12),0 50px 100px rgba(0,0,0,0.7)", aspectRatio: "16/9", background: "#0A0A09" }}>
            <iframe
              src={`https://www.youtube.com/embed/${FORGIVENESS_ID}?rel=0&modestbranding=1&color=white`}
              title="Asake – Forgiveness (Official Video)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            />
          </div>
          <p style={{ textAlign: "center", marginTop: 22, color: "#5A5550", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Produced by <span style={{ color: "#C8960E" }}>Magicsticks</span> &amp; <span style={{ color: "#C8960E" }}>Nana Ntorinkansah</span> · YBNL Nation / Empire Distribution
          </p>
        </FadeIn>
      </section>

      {/* ── 3. ABOUT THE TRACK ── */}
      <section style={{ padding: "clamp(60px,8vw,120px) clamp(16px,5vw,80px)", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <div className="asake-divider" style={{ marginBottom: 52 }} />
          <blockquote style={{ fontSize: "clamp(1.15rem,2.8vw,2rem)", fontWeight: 600, color: "#EDE8DF", lineHeight: 1.5, fontStyle: "italic", opacity: 0.88, margin: "0 0 52px", letterSpacing: "0.01em" }}>
            "A spiritual prayer — asking God for forgiveness while promising to do better"
          </blockquote>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 16, marginBottom: 44 }}>
            <StatCard number="#1"    label="Nigeria Top 100"  />
            <StatCard number="1.37M" label="Opening Streams"  />
            <StatCard number="2×"    label="Grammy Nominated" />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: 52 }}>
            {["Street-pop", "Afrobeats", "Fuji", "Amapiano", "M$NEY · 2026"].map((tag) => (
              <span key={tag} style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", border: "1px solid rgba(200,150,14,0.28)", borderRadius: 9999, padding: "6px 18px", color: "#C8960E", background: "rgba(200,150,14,0.06)" }}>{tag}</span>
            ))}
          </div>
          <div className="asake-divider" />
        </FadeIn>
      </section>

      {/* ── 4. ROTATING GALLERY ── */}
      <section style={{ padding: "clamp(60px,8vw,120px) 0", background: "linear-gradient(180deg,rgba(200,150,14,0.03) 0%,transparent 100%)" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 12, padding: "0 20px" }}>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C8960E", margin: "0 0 10px" }}>Discography</p>
            <h2 style={{ fontSize: "clamp(2rem,6vw,4.5rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0, color: "#EDE8DF" }}>More from Asake</h2>
          </div>
        </FadeIn>

        {/* 3-D rotating ring */}
        <CoverflowRing covers={RING_COVERS} fadeBg="#030303" />

        {/* Horizontal scroll track below ring */}
        <FadeIn>
          <div className="asake-track-strip" style={{ display: "flex", gap: 16, paddingLeft: "clamp(16px,5vw,64px)", paddingRight: "clamp(16px,5vw,64px)", paddingBottom: 14, overflowX: "auto", marginTop: 32 }}>
            {TRACKS.map((t) => <TrackCard key={t.id} {...t} />)}
          </div>
        </FadeIn>
      </section>

      {/* ── 5. ABOUT ASAKE ── */}
      <section style={{ padding: "clamp(60px,8vw,120px) clamp(16px,4vw,48px)", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div className="asake-divider" style={{ marginBottom: 52 }} />
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,80px)", alignItems: "center" }}>
          {/* Left – thumbnail */}
          <FadeIn x={-40} y={0}>
            <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(200,150,14,0.15)", boxShadow: "0 40px 80px rgba(0,0,0,0.6)", aspectRatio: "3/4" }}>
              <img src={yt("fXl5dPuiJa0")} alt="Asake" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              {/* gold tint overlay */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 40%,rgba(3,3,3,0.85) 100%)" }} />
              <div style={{ position: "absolute", bottom: 24, left: 24 }}>
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C8960E", margin: "0 0 4px" }}>Ahmed Ololade</p>
                <p style={{ fontSize: "1.4rem", fontWeight: 900, textTransform: "uppercase", margin: 0, letterSpacing: "0.05em" }}>ASAKE</p>
              </div>
            </div>
          </FadeIn>

          {/* Right – bio text */}
          <FadeIn x={40} y={0} delay={0.15}>
            <div>
              <p style={{ fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C8960E", margin: "0 0 14px" }}>The Artist</p>
              <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", margin: "0 0 24px", lineHeight: 0.95 }}>
                Nigeria's<br />
                <span className="asake-gold-text" style={{ fontSize: "inherit" }}>Golden Voice</span>
              </h2>
              <p style={{ fontSize: "clamp(0.9rem,1.5vw,1.1rem)", color: "#9A9590", lineHeight: 1.75, margin: "0 0 28px", fontWeight: 400 }}>
                Born in Lagos, Ahmed Ololade Asake burst onto the global music scene with a sound that defies easy categorisation — fusing Fuji rhythms, Amapiano bass lines and Afrobeats energy into something entirely his own. Signed to YBNL Nation and Empire Distribution, he became one of the fastest-rising acts in Afrobeats history.
              </p>
              <p style={{ fontSize: "clamp(0.9rem,1.5vw,1.1rem)", color: "#9A9590", lineHeight: 1.75, margin: "0 0 36px", fontWeight: 400 }}>
                With four studio albums and a relentless touring schedule, Asake has earned two Grammy nominations and a legion of fans across Africa, Europe, and North America. <em style={{ color: "#C8960E" }}>Forgiveness</em> marks his most introspective moment yet — a track stripped of bravado and filled with soul.
              </p>

              {/* Bio facts */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                {BIO_FACTS.map(({ Icon, label, value }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(200,150,14,0.1)", border: "1px solid rgba(200,150,14,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={16} color="#C8960E" />
                    </div>
                    <div>
                      <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#5A5550", margin: 0 }}>{label}</p>
                      <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#EDE8DF", margin: "2px 0 0" }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Album timeline */}
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#5A5550", margin: "0 0 12px" }}>Discography</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {ALBUMS.map((a) => (
                  <div key={a.title} style={{ borderRadius: 10, border: a.year === "2026" ? "1px solid rgba(200,150,14,0.5)" : "1px solid rgba(255,255,255,0.08)", padding: "8px 16px", background: a.year === "2026" ? "rgba(200,150,14,0.08)" : "rgba(255,255,255,0.03)" }}>
                    <p style={{ fontSize: "0.7rem", fontWeight: 700, color: a.year === "2026" ? "#F0B429" : "#9A9590", margin: 0, letterSpacing: "0.05em" }}>{a.title}</p>
                    <p style={{ fontSize: "0.6rem", color: "#5A5550", margin: "2px 0 0", letterSpacing: "0.1em" }}>{a.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="asake-divider" style={{ marginTop: 52 }} />
        </FadeIn>
      </section>

      {/* ── 6. STREAM ── */}
      <section id="stream" style={{ padding: "clamp(70px,9vw,130px) clamp(16px,4vw,48px)", textAlign: "center", background: "linear-gradient(180deg,transparent 0%,rgba(200,150,14,0.04) 40%,transparent 100%)" }}>
        <FadeIn>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#C8960E", margin: "0 0 10px" }}>Available Now</p>
          <h2 style={{ fontSize: "clamp(2.2rem,6vw,5rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", margin: "0 0 48px" }}>Stream Forgiveness</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
            {PLATFORMS.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer"
                className="asake-platform-btn"
                style={{ border: `1.5px solid ${p.color}`, color: p.color }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = p.color; el.style.color = "#030303"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.color = p.color; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={p.stroke ? "none" : "currentColor"} stroke={p.stroke ? "currentColor" : "none"} strokeWidth={p.stroke ? 2 : 0} strokeLinecap="round">
                  <path d={p.path} />
                </svg>
                {p.name}
              </a>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(200,150,14,0.12)", padding: "36px clamp(16px,4vw,48px)", textAlign: "center" }}>
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#3A3530", margin: "0 0 8px" }}>
          © 2026 Ahmed Ololade · YBNL Nation / Empire Distribution
        </p>
        <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2A2520", margin: 0 }}>
          Presented by <span style={{ color: "rgba(200,150,14,0.5)" }}>Ngoma Charts</span>
        </p>
      </footer>
    </div>
  );
}
