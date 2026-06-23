"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ChevronDown, Music2, Award, Globe } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { CoverflowRing } from "@/components/CoverflowRing";

/* ─────────────────────── constants ─────────────────────── */

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
  { id: "fXl5dPuiJa0",  title: "Joha",        year: "2022" },
  { id: "_u4_iWCvZ5c",  title: "Organise",    year: "2022" },
  { id: "qrIP_igi76U",  title: "Terminator",  year: "2022" },
  { id: "MefXQvGTYtE",  title: "PBUY",        year: "2023" },
  { id: "pn26zia2_Kk",  title: "2:30",        year: "2023" },
  { id: "sWj-zEuH4Lg",  title: "Dupe",        year: "2023" },
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
  { Icon: Music2, label: "Born",   value: "Lagos, Nigeria · 1990" },
  { Icon: Globe,  label: "Label",  value: "YBNL Nation / Empire" },
  { Icon: Award,  label: "Awards", value: "MOBO · Headies · BET Nom." },
];

const ALBUMS = [
  { title: "Mr. Money with the Vibe", year: "2022" },
  { title: "Work of Art",             year: "2023" },
  { title: "Lungu Boy",               year: "2024" },
  { title: "M$NEY",                   year: "2026" },
];

/* ─────────────────────── styles ─────────────────────────── */

const STYLES = `
  @keyframes gold-shimmer {
    from { background-position: 200% center; }
    to   { background-position:   0% center; }
  }
  @keyframes asake-pulse {
    0%,100% { opacity:.5; transform:scale(1);    }
    50%      { opacity:.9; transform:scale(1.12); }
  }
  .asake-gold-text {
    background: linear-gradient(135deg,
      #8B6010 0%,#C8960E 20%,#FFD700 40%,
      #FFFBE6 55%,#FFD700 70%,#C8960E 85%,#8B6010 100%);
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gold-shimmer 6s linear infinite;
    filter: drop-shadow(0 0 60px rgba(200,150,14,.35));
  }
  .asake-divider {
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(200,150,14,.45), transparent);
  }
  /* platform stream buttons */
  .asake-platform-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 13px 24px; border-radius: 9999px;
    font-family: 'Kanit',sans-serif;
    font-size: .72rem; font-weight: 700;
    letter-spacing: .12em; text-transform: uppercase;
    text-decoration: none; cursor: pointer; background: transparent;
    transition: background .25s,color .25s,transform .15s,box-shadow .25s;
  }
  .asake-platform-btn:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,.3); }

  /* scrollbar for track strip */
  .asake-track-strip::-webkit-scrollbar { height: 4px; }
  .asake-track-strip::-webkit-scrollbar-track { background:rgba(255,255,255,.03); border-radius:2px; }
  .asake-track-strip::-webkit-scrollbar-thumb { background:rgba(200,150,14,.35); border-radius:2px; }

  /* ── RESPONSIVE ── */
  .asake-bio-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(28px,5vw,80px);
    align-items: start;
  }
  .asake-portrait {
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(200,150,14,.15);
    box-shadow: 0 40px 80px rgba(0,0,0,.6);
    aspect-ratio: 16/9;
    position: relative;
  }
  .asake-stat-grid {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 14px;
    margin-bottom: 40px;
  }
  .asake-platforms {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }
  @media (max-width: 900px) {
    .asake-bio-grid { grid-template-columns: 1fr; }
    .asake-portrait { aspect-ratio: 16/9; max-height: 280px; }
  }
  @media (max-width: 600px) {
    .asake-stat-grid { grid-template-columns: 1fr; gap: 12px; }
    .asake-platforms { flex-direction: column; align-items: stretch; }
    .asake-platform-btn { justify-content: center; padding: 14px 20px; }
  }
`;

/* ─────────────────────── sub-components ─────────────────────── */

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div style={{ border: "1px solid rgba(200,150,14,.2)", borderRadius: 14, padding: "20px 16px", textAlign: "center", background: "rgba(200,150,14,.04)" }}>
      <p style={{ fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 900, color: "#F0B429", letterSpacing: "-0.02em", lineHeight: 1, margin: 0 }}>{number}</p>
      <p style={{ fontSize: ".62rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#7A7570", marginTop: 8, marginBottom: 0 }}>{label}</p>
    </div>
  );
}

function TrackCard({ id, title, year }: { id: string; title: string; year: string }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={`https://youtu.be/${id}`} target="_blank" rel="noopener noreferrer"
      whileHover={{ y: -8, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      style={{ display: "block", flexShrink: 0, width: "clamp(150px,42vw,200px)", borderRadius: 12, overflow: "hidden", position: "relative", cursor: "pointer", textDecoration: "none", border: "1px solid rgba(255,255,255,.06)" }}
    >
      <img src={yt(id)} alt={title} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} loading="lazy" />
      <div style={{ position: "absolute", inset: 0, background: hov ? "rgba(3,3,3,.65)" : "linear-gradient(to top,rgba(3,3,3,.92) 0%,rgba(3,3,3,.1) 60%)", transition: "background .3s", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {hov && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-60%)", background: "rgba(200,150,14,.9)", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(200,150,14,.5)" }}>
            <Play size={16} fill="#030303" color="#030303" />
          </div>
        )}
        <div style={{ position: "absolute", bottom: 10, left: 10 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#EDE8DF", letterSpacing: ".04em", margin: 0 }}>{title}</p>
          <p style={{ fontSize: 9, color: "#C8960E", letterSpacing: ".12em", margin: "2px 0 0" }}>{year}</p>
        </div>
      </div>
    </motion.a>
  );
}

/* ─────────────────────── page ─────────────────────────────── */

export function AsakeForgiveness() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgScale   = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY     = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const chevronOp = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div style={{ background: "#030303", color: "#EDE8DF", fontFamily: "'Kanit',sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{STYLES}</style>

      {/* ── 1. HERO ── */}
      <section ref={heroRef} style={{ position: "relative", height: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* bg image with parallax */}
        <motion.div style={{ position: "absolute", inset: "-10%", scale: bgScale, opacity: bgOpacity }}>
          <img src={yt(FORGIVENESS_ID)} alt="Asake – Forgiveness" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(3,3,3,.72) 0%,rgba(3,3,3,.28) 35%,rgba(3,3,3,.8) 75%,rgba(3,3,3,1) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 65% 45% at 50% 55%,rgba(200,150,14,.22) 0%,rgba(200,150,14,.06) 50%,transparent 75%)" }} />
        </motion.div>

        {/* ambient orbs */}
        {[{ t:"20%",l:"15%",w:300,h:300,d:"6s",del:"0s" }, { t:"auto",l:"auto",b:"20%",r:"12%",w:250,h:250,d:"8s",del:"2s" }].map((o,i)=>(
          <div key={i} style={{ position:"absolute", top:o.t, left:o.l, bottom:(o as any).b, right:(o as any).r, width:o.w, height:o.h, borderRadius:"50%", background:"rgba(200,150,14,.05)", filter:"blur(72px)", animation:`asake-pulse ${o.d} ease-in-out infinite ${o.del}`, pointerEvents:"none" }} />
        ))}

        {/* content */}
        <motion.div style={{ position:"relative", zIndex:10, textAlign:"center", padding:"0 20px", y:textY, width:"100%", maxWidth:900 }}>
          <motion.p
            initial={{ opacity:0, letterSpacing:"1em" }} animate={{ opacity:1, letterSpacing:"0.55em" }} transition={{ duration:1.4 }}
            style={{ fontSize:".65rem", letterSpacing:".55em", textTransform:"uppercase", color:"#C8960E", margin:"0 0 20px", fontWeight:600 }}>
            ASAKE
          </motion.p>

          <motion.h1
            className="asake-gold-text"
            initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }} transition={{ duration:1.1, delay:.25, ease:[0.22,1,0.36,1] }}
            style={{ fontSize:"clamp(3rem,16vw,12rem)", fontWeight:900, lineHeight:.88, textTransform:"uppercase", letterSpacing:"-0.02em", margin:"0 0 22px" }}>
            Forgiveness
          </motion.h1>

          <motion.p
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.9, delay:.6 }}
            style={{ fontSize:".65rem", letterSpacing:".4em", textTransform:"uppercase", color:"#6B6560", margin:"0 0 40px" }}>
            FROM THE ALBUM <span style={{ color:"#C8960E" }}>M$NEY</span> · APRIL 30, 2026
          </motion.p>

          <motion.div
            initial={{ opacity:0, scale:.88 }} animate={{ opacity:1, scale:1 }} transition={{ duration:.7, delay:.95 }}
            style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <motion.a href="#video" whileHover={{ scale:1.05, boxShadow:"0 0 30px rgba(200,150,14,.45)" }} whileTap={{ scale:.97 }}
              style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#C8960E", color:"#030303", padding:"13px 28px", borderRadius:9999, fontSize:".72rem", fontWeight:800, letterSpacing:".14em", textTransform:"uppercase", textDecoration:"none" }}>
              <Play size={14} fill="currentColor" /> Watch the Video
            </motion.a>
            <motion.a href="#stream" whileHover={{ scale:1.05 }} whileTap={{ scale:.97 }}
              style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(237,232,223,.07)", border:"1px solid rgba(237,232,223,.2)", color:"#EDE8DF", padding:"13px 28px", borderRadius:9999, fontSize:".72rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", textDecoration:"none", backdropFilter:"blur(10px)" }}>
              Stream Now
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div style={{ position:"absolute", bottom:24, left:"50%", transform:"translateX(-50%)", opacity:chevronOp }}
          animate={{ y:[0,9,0] }} transition={{ repeat:Infinity, duration:2.2, ease:"easeInOut" }}>
          <ChevronDown size={24} color="rgba(200,150,14,.7)" />
        </motion.div>
      </section>

      {/* ── 2. VIDEO ── */}
      <section id="video" style={{ padding:"clamp(56px,8vw,120px) clamp(16px,5vw,48px)", maxWidth:1020, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <span style={{ display:"inline-block", fontSize:".6rem", letterSpacing:".35em", textTransform:"uppercase", color:"#C8960E", background:"rgba(200,150,14,.1)", border:"1px solid rgba(200,150,14,.28)", borderRadius:9999, padding:"5px 16px" }}>
              Official Video
            </span>
          </div>
          <div style={{ borderRadius:18, overflow:"hidden", border:"1px solid rgba(200,150,14,.2)", boxShadow:"0 0 80px rgba(200,150,14,.12),0 50px 100px rgba(0,0,0,.7)", aspectRatio:"16/9", background:"#0A0A09" }}>
            <iframe
              src={`https://www.youtube.com/embed/${FORGIVENESS_ID}?rel=0&modestbranding=1&color=white`}
              title="Asake – Forgiveness (Official Video)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ width:"100%", height:"100%", border:"none", display:"block" }}
            />
          </div>
          <p style={{ textAlign:"center", marginTop:18, color:"#5A5550", fontSize:".65rem", letterSpacing:".18em", textTransform:"uppercase" }}>
            Produced by <span style={{ color:"#C8960E" }}>Magicsticks</span> &amp; <span style={{ color:"#C8960E" }}>Nana Ntorinkansah</span> · YBNL Nation / Empire
          </p>
        </FadeIn>
      </section>

      {/* ── 3. TRACK STATS ── */}
      <section style={{ padding:"0 clamp(16px,5vw,48px) clamp(56px,8vw,100px)", maxWidth:900, margin:"0 auto", textAlign:"center" }}>
        <FadeIn>
          <div className="asake-divider" style={{ marginBottom:48 }} />
          <blockquote style={{ fontSize:"clamp(1rem,2.6vw,1.8rem)", fontWeight:600, color:"#EDE8DF", lineHeight:1.55, fontStyle:"italic", opacity:.88, margin:"0 0 48px", letterSpacing:".01em" }}>
            "A spiritual prayer — asking God for forgiveness<br className="hidden sm:inline" /> while promising to do better"
          </blockquote>

          <div className="asake-stat-grid">
            <StatCard number="#1"    label="Nigeria Top 100"  />
            <StatCard number="1.37M" label="Opening Streams"  />
            <StatCard number="2×"    label="Grammy Nominated" />
          </div>

          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:9 }}>
            {["Street-pop","Afrobeats","Fuji","Amapiano","M$NEY · 2026"].map((tag)=>(
              <span key={tag} style={{ fontSize:".6rem", letterSpacing:".16em", textTransform:"uppercase", border:"1px solid rgba(200,150,14,.28)", borderRadius:9999, padding:"5px 14px", color:"#C8960E", background:"rgba(200,150,14,.06)" }}>{tag}</span>
            ))}
          </div>
          <div className="asake-divider" style={{ marginTop:48 }} />
        </FadeIn>
      </section>

      {/* ── 4. ROTATING GALLERY ── */}
      <section style={{ padding:"clamp(48px,7vw,100px) 0", background:"linear-gradient(180deg,rgba(200,150,14,.03) 0%,transparent 100%)" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:8, padding:"0 20px" }}>
            <p style={{ fontSize:".6rem", letterSpacing:".4em", textTransform:"uppercase", color:"#C8960E", margin:"0 0 8px" }}>Discography</p>
            <h2 style={{ fontSize:"clamp(1.8rem,6vw,4rem)", fontWeight:900, textTransform:"uppercase", letterSpacing:"-0.02em", margin:0, color:"#EDE8DF" }}>More from Asake</h2>
          </div>
        </FadeIn>

        {/* 3-D rotating ring */}
        <CoverflowRing covers={RING_COVERS} fadeBg="#030303" />

        {/* Horizontal scroll strip */}
        <FadeIn>
          <div className="asake-track-strip" style={{ display:"flex", gap:12, paddingLeft:"clamp(16px,5vw,56px)", paddingRight:"clamp(16px,5vw,56px)", paddingBottom:12, overflowX:"auto", marginTop:28 }}>
            {TRACKS.map((t)=><TrackCard key={t.id} {...t} />)}
          </div>
        </FadeIn>
      </section>

      {/* ── 5. ABOUT ASAKE ── */}
      <section style={{ padding:"clamp(56px,8vw,120px) clamp(16px,5vw,48px)", maxWidth:1100, margin:"0 auto" }}>
        <FadeIn><div className="asake-divider" style={{ marginBottom:48 }} /></FadeIn>

        <div className="asake-bio-grid">
          {/* Portrait — uses Forgiveness thumbnail which prominently shows Asake */}
          <FadeIn x={-36} y={0}>
            <div className="asake-portrait">
              <img
                src={yt(FORGIVENESS_ID)}
                alt="Asake"
                style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 15%", display:"block" }}
              />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,transparent 45%,rgba(3,3,3,.9) 100%)" }} />
              <div style={{ position:"absolute", bottom:20, left:20 }}>
                <p style={{ fontSize:".58rem", letterSpacing:".3em", textTransform:"uppercase", color:"#C8960E", margin:"0 0 3px" }}>Ahmed Ololade</p>
                <p style={{ fontSize:"1.3rem", fontWeight:900, textTransform:"uppercase", margin:0, letterSpacing:".05em" }}>ASAKE</p>
              </div>
            </div>
          </FadeIn>

          {/* Bio text */}
          <FadeIn x={36} y={0} delay={0.12}>
            <div>
              <p style={{ fontSize:".6rem", letterSpacing:".4em", textTransform:"uppercase", color:"#C8960E", margin:"0 0 12px" }}>The Artist</p>
              <h2 style={{ fontSize:"clamp(1.8rem,4.5vw,3.2rem)", fontWeight:900, textTransform:"uppercase", letterSpacing:"-0.02em", margin:"0 0 20px", lineHeight:.95 }}>
                Nigeria's{" "}
                <span className="asake-gold-text" style={{ fontSize:"inherit" }}>Golden Voice</span>
              </h2>
              <p style={{ fontSize:"clamp(.88rem,1.5vw,1.05rem)", color:"#9A9590", lineHeight:1.75, margin:"0 0 20px", fontWeight:400 }}>
                Born in Lagos, Ahmed Ololade Asake burst onto the global stage with a sound that defies categorisation — fusing Fuji rhythms, Amapiano bass lines, and Afrobeats energy into something entirely his own. Signed to YBNL Nation and Empire Distribution, he became one of the fastest-rising acts in Afrobeats history.
              </p>
              <p style={{ fontSize:"clamp(.88rem,1.5vw,1.05rem)", color:"#9A9590", lineHeight:1.75, margin:"0 0 32px", fontWeight:400 }}>
                With four studio albums and a relentless touring schedule spanning Africa, Europe, and North America, Asake has earned two Grammy nominations and an ever-growing global fanbase. <em style={{ color:"#C8960E" }}>Forgiveness</em> marks his most introspective moment yet — stripped of bravado and filled with soul.
              </p>

              {/* Facts */}
              <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:32 }}>
                {BIO_FACTS.map(({ Icon, label, value })=>(
                  <div key={label} style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:34, height:34, borderRadius:"50%", background:"rgba(200,150,14,.1)", border:"1px solid rgba(200,150,14,.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Icon size={15} color="#C8960E" />
                    </div>
                    <div>
                      <p style={{ fontSize:".58rem", letterSpacing:".2em", textTransform:"uppercase", color:"#5A5550", margin:0 }}>{label}</p>
                      <p style={{ fontSize:".82rem", fontWeight:600, color:"#EDE8DF", margin:"2px 0 0" }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Album timeline */}
              <p style={{ fontSize:".58rem", letterSpacing:".3em", textTransform:"uppercase", color:"#5A5550", margin:"0 0 10px" }}>Albums</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {ALBUMS.map((a)=>(
                  <div key={a.title} style={{ borderRadius:10, border: a.year==="2026" ? "1px solid rgba(200,150,14,.5)" : "1px solid rgba(255,255,255,.08)", padding:"7px 14px", background: a.year==="2026" ? "rgba(200,150,14,.08)" : "rgba(255,255,255,.03)" }}>
                    <p style={{ fontSize:".68rem", fontWeight:700, color: a.year==="2026" ? "#F0B429" : "#9A9590", margin:0, letterSpacing:".04em" }}>{a.title}</p>
                    <p style={{ fontSize:".58rem", color:"#5A5550", margin:"2px 0 0", letterSpacing:".1em" }}>{a.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn><div className="asake-divider" style={{ marginTop:48 }} /></FadeIn>
      </section>

      {/* ── 6. STREAM ── */}
      <section id="stream" style={{ padding:"clamp(56px,8vw,120px) clamp(16px,4vw,48px)", textAlign:"center", background:"linear-gradient(180deg,transparent 0%,rgba(200,150,14,.04) 40%,transparent 100%)" }}>
        <FadeIn>
          <p style={{ fontSize:".6rem", letterSpacing:".4em", textTransform:"uppercase", color:"#C8960E", margin:"0 0 8px" }}>Available Now</p>
          <h2 style={{ fontSize:"clamp(2rem,6vw,4.5rem)", fontWeight:900, textTransform:"uppercase", letterSpacing:"-0.02em", margin:"0 0 44px" }}>Stream Forgiveness</h2>
          <div className="asake-platforms">
            {PLATFORMS.map((p)=>(
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer"
                className="asake-platform-btn"
                style={{ border:`1.5px solid ${p.color}`, color:p.color }}
                onMouseEnter={(e)=>{ const el=e.currentTarget as HTMLAnchorElement; el.style.background=p.color; el.style.color="#030303"; }}
                onMouseLeave={(e)=>{ const el=e.currentTarget as HTMLAnchorElement; el.style.background="transparent"; el.style.color=p.color; }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill={p.stroke?"none":"currentColor"} stroke={p.stroke?"currentColor":"none"} strokeWidth={p.stroke?2:0} strokeLinecap="round">
                  <path d={p.path} />
                </svg>
                {p.name}
              </a>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:"1px solid rgba(200,150,14,.12)", padding:"32px clamp(16px,4vw,48px)", textAlign:"center" }}>
        <p style={{ fontSize:".6rem", letterSpacing:".24em", textTransform:"uppercase", color:"#3A3530", margin:"0 0 6px" }}>
          © 2026 Ahmed Ololade · YBNL Nation / Empire Distribution
        </p>
        <p style={{ fontSize:".56rem", letterSpacing:".2em", textTransform:"uppercase", color:"#2A2520", margin:0 }}>
          Presented by <span style={{ color:"rgba(200,150,14,.5)" }}>Ngoma Charts</span>
        </p>
      </footer>
    </div>
  );
}
