"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";

/* ── Intersection-observer fade-up hook ─── */
function useFadeUp(): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Animated counter ─── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let cur = 0;
        const step = to / (1400 / 16);
        const t = setInterval(() => {
          cur = Math.min(cur + step, to);
          setVal(Math.floor(cur));
          if (cur >= to) clearInterval(t);
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ── Fade-up wrapper ─── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, visible] = useFadeUp();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Value card ─── */
function ValueCard({ icon, title, desc, accent }: { icon: React.ReactNode; title: string; desc: string; accent: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--color-sq-surface)",
        borderRadius: 16,
        padding: 28,
        border: `1.5px solid ${hovered ? "transparent" : "var(--color-sq-border)"}`,
        boxShadow: hovered ? "0 16px 48px rgba(0,87,255,0.10)" : "none",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: 20, background: accent + "18" }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: "var(--font-headline)", letterSpacing: "0.05em", color: "var(--color-sq-ink)", fontSize: 15, marginBottom: 8 }}>
        {title}
      </h3>
      <p style={{ color: "var(--color-sq-body)", fontSize: 13, lineHeight: 1.7 }}>{desc}</p>
      <div style={{ marginTop: 20, height: 2, borderRadius: 2, background: accent, width: hovered ? "100%" : "0%", transition: "width 0.4s ease" }} />
    </div>
  );
}

/* ── Team card ─── */
function TeamCard({ name, role, country, flag, color }: { name: string; role: string; country: string; flag: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--color-sq-surface)",
        border: `1.5px solid ${hovered ? color + "40" : "var(--color-sq-border)"}`,
        borderRadius: 16,
        padding: 24,
        textAlign: "center",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.07)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ width: 64, height: 64, borderRadius: "50%", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, fontWeight: 700, background: `linear-gradient(135deg, ${color}, ${color}99)` }}>
        {name.split(" ").map((n: string) => n[0]).join("")}
      </div>
      <p style={{ fontFamily: "var(--font-headline)", letterSpacing: "0.04em", color: "var(--color-sq-ink)", fontSize: 14, marginBottom: 4 }}>{name}</p>
      <p style={{ color: "var(--color-sq-body)", fontSize: 12, marginBottom: 12 }}>{role}</p>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, padding: "4px 12px", borderRadius: 99, border: `1px solid ${color}30`, color, background: color + "10" }}>
        <span>{flag}</span> {country}
      </div>
    </div>
  );
}

/* ── Sport card ─── */
function SportCard({ icon, sport, color, desc }: { icon: React.ReactNode; sport: string; color: string; desc: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        padding: 24,
        textAlign: "center",
        cursor: "default",
        border: `1.5px solid ${hovered ? color + "40" : "var(--color-sq-border)"}`,
        background: "var(--color-sq-surface)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.07)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 16px", background: color + "15" }}>
        {icon}
      </div>
      <p style={{ fontFamily: "var(--font-headline)", letterSpacing: "0.05em", color: "var(--color-sq-ink)", fontSize: 13, marginBottom: 4 }}>{sport}</p>
      <p style={{ fontSize: 11, lineHeight: 1.5, color: "var(--color-sq-muted)" }}>{desc}</p>
      <div style={{ margin: "16px auto 0", height: 2, borderRadius: 2, background: color, width: hovered ? "100%" : "0%", transition: "all 0.3s ease" }} />
    </div>
  );
}

/* ════════════════════════════════════════
   STYLES
════════════════════════════════════════ */
const STYLES = `
  *, *::before, *::after { box-sizing: border-box; }

  .about-root {
    min-height: 100vh;
    background: var(--color-sq-bg);
    font-family: var(--font-body);
    color: var(--color-sq-ink);
    overflow-x: hidden;
    width: 100%;
  }

  .about-section {
    width: 100%;
    overflow-x: hidden;
  }

  .about-container {
    max-width: 1200px;
    margin: 0 auto;
    padding-left: 40px;
    padding-right: 40px;
    width: 100%;
  }

  /* ── Gradient text helper ── */
  .grad-text {
    display: inline;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  /* ── Outline text helper ── */
  .outline-text {
    display: inline;
    color: transparent;
  }

  /* ── Hero ── */
  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }
  .hero-img-box {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    height: 400px;
  }
  .hero-img-box img {
    width: 100%; height: 100%; object-fit: cover;
  }
  .hero-floating-badge {
    position: absolute;
    bottom: 16px;
    left: 16px;
    border-radius: 16px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    border: 1.5px solid var(--color-sq-border);
    background: var(--color-sq-surface);
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }

  /* ── Stats ── */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }

  /* ── Story ── */
  .story-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }
  .story-collage {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    height: 420px;
  }
  .story-img-tall {
    border-radius: 16px;
    overflow: hidden;
    grid-row: span 2;
  }
  .story-img {
    border-radius: 16px;
    overflow: hidden;
  }
  .story-img img,
  .story-img-tall img {
    width: 100%; height: 100%; object-fit: cover;
  }

  /* ── Values ── */
  .values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  /* ── Sports ── */
  .sports-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }

  /* ── Team ── */
  .team-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  /* ── Roadmap ── */
  .roadmap-line {
    position: absolute;
    left: 19px;
    top: 8px;
    bottom: 8px;
    width: 1px;
    background: var(--color-sq-border);
  }
  .roadmap-item {
    position: relative;
    display: flex;
    gap: 32px;
    margin-bottom: 40px;
    padding-left: 56px;
  }
  .roadmap-dot {
    position: absolute;
    left: 12px;
    top: 16px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid;
    flex-shrink: 0;
  }

  /* ── CTA card ── */
  .cta-card {
    border-radius: 24px;
    padding: 64px;
    text-align: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #0057FF 0%, #002299 100%);
  }
  .cta-card-content {
    position: relative;
    z-index: 2;
  }
  .cta-orb-1 {
    pointer-events: none;
    position: absolute;
    top: -80px;
    right: -80px;
    width: 256px;
    height: 256px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.18), transparent 70%);
    z-index: 1;
  }
  .cta-orb-2 {
    pointer-events: none;
    position: absolute;
    bottom: -80px;
    left: -80px;
    width: 224px;
    height: 224px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,107,0,0.18), transparent 70%);
    z-index: 1;
  }
  .cta-grid {
    position: absolute;
    inset: 0;
    opacity: 0.06;
    background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 1;
  }
  .cta-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #00D4FF;
    margin-bottom: 20px;
  }
  .cta-heading {
    font-family: var(--font-headline);
    font-size: clamp(32px, 5vw, 64px);
    letter-spacing: 0.03em;
    color: #ffffff;
    line-height: 1;
    margin-bottom: 20px;
  }
  .cta-heading-accent {
    color: #FFD600;
  }
  .cta-body {
    font-size: 16px;
    font-weight: 300;
    line-height: 1.75;
    color: rgba(255,255,255,0.8);
    max-width: 440px;
    margin: 0 auto 32px;
  }
  .cta-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .cta-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    padding: 12px 28px;
    border-radius: 99px;
    font-size: 14px;
    text-decoration: none;
    background: #FFD600;
    color: #0D1520;
    box-shadow: 0 6px 24px rgba(255,214,0,0.35);
    transition: transform 0.2s, box-shadow 0.2s;
    border: none;
    cursor: pointer;
  }
  .cta-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(255,214,0,0.45);
  }
  .cta-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    padding: 12px 28px;
    border-radius: 99px;
    font-size: 14px;
    text-decoration: none;
    color: #ffffff;
    border: 1px solid rgba(255,255,255,0.35);
    transition: background 0.2s;
    background: transparent;
    cursor: pointer;
  }
  .cta-btn-secondary:hover {
    background: rgba(255,255,255,0.1);
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  /* ══════════════════════════════════════
     TABLET
  ══════════════════════════════════════ */
  @media (max-width: 1024px) {
    .sports-grid { grid-template-columns: repeat(3, 1fr); }
    .team-grid   { grid-template-columns: repeat(2, 1fr); }
    .values-grid { grid-template-columns: repeat(2, 1fr); }
  }

  /* ══════════════════════════════════════
     MOBILE
  ══════════════════════════════════════ */
  @media (max-width: 768px) {
    .about-container { padding-left: 20px; padding-right: 20px; }
    .hero-grid { grid-template-columns: 1fr; gap: 32px; }
    .hero-img-box { height: 260px; }
    .hero-floating-badge { position: static; margin-top: 12px; width: fit-content; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
    .story-grid { grid-template-columns: 1fr; gap: 32px; }
    .story-collage { height: 260px; }
    .values-grid { grid-template-columns: 1fr; gap: 16px; }
    .sports-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .team-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .roadmap-line { left: 15px; }
    .roadmap-item { padding-left: 44px; margin-bottom: 28px; }
    .roadmap-dot { left: 8px; top: 14px; }
    .cta-card { padding: 40px 24px; }
  }

  @media (max-width: 480px) {
    .about-container { padding-left: 16px; padding-right: 16px; }
    .hero-img-box { height: 220px; }
    .story-collage { height: 200px; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .sports-grid { grid-template-columns: repeat(2, 1fr); }
    .team-grid   { grid-template-columns: repeat(2, 1fr); }
    .values-grid { grid-template-columns: 1fr; }
    .cta-card { padding: 32px 20px; }
  }
`;

/* ════════════════════════════════════════
   PAGE
════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <main className="about-root">
      <style>{STYLES}</style>

      {/* ── HERO ─────────────────────────────────── */}
      <section className="about-section" style={{ background: "#FFFFFF", paddingBottom: 80 }}>
        <div style={{ pointerEvents: "none", position: "absolute", top: -128, right: -128, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,87,255,0.05) 0%, transparent 70%)" }} />
        <div style={{ pointerEvents: "none", position: "absolute", bottom: -80, left: -80, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)" }} />

        <div className="about-container" style={{ paddingTop: 80 }}>
          <FadeUp delay={0}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 99, padding: "8px 16px", marginBottom: 40, border: "1.5px solid var(--color-sq-border)", background: "var(--color-sq-bg)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-sq-green)", animation: "pulse 2s infinite", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-sq-body)" }}>Our Story</span>
            </div>
          </FadeUp>

          <div className="hero-grid">
            <div>
              <FadeUp delay={80}>
                <h1 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(44px, 7vw, 88px)", letterSpacing: "0.02em", color: "var(--color-sq-ink)", lineHeight: 0.95, marginBottom: 24 }}>
                  WE LIVE{" "}SPORTS.
                  <br />
                  WE BUILD{" "}
                  <span style={{ display: "inline", color: "transparent", WebkitTextStroke: "2px #FF6B00" }}>
                    CLIQS.
                  </span>
                </h1>
              </FadeUp>

              <FadeUp delay={160}>
                <p style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 28, maxWidth: 440, fontWeight: 300, color: "var(--color-sq-body)" }}>
                  Sportcliq was born from a simple idea — fans everywhere deserved a better way to experience sports together. We built the place to make it happen.
                </p>
              </FadeUp>

              
            </div>

            <FadeUp delay={120}>
              <div className="hero-img-box">
                <Image src="/icee.jpg" alt="Fans in stadium" width={600} height={400} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,21,32,0.55) 0%, transparent 60%)" }} />
              </div>
              <div className="hero-floating-badge">
                <div style={{ display: "flex" }}>
                  {["#0057FF", "#FF6B00", "#00E87A"].map((c, i) => (
                    <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: c, border: "2px solid white", marginLeft: i > 0 ? -10 : 0 }} />
                  ))}
                </div>
                
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────── */}
      {/* <section className="about-section" style={{ background: "var(--color-sq-dark)", position: "relative", overflow: "hidden" }}>
        <div style={{ pointerEvents: "none", position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="about-container" style={{ paddingTop: 64, paddingBottom: 64 }}>
          <div className="stats-grid">
            {[
              { to: 24000, suffix: "+", label: "Active Fans",    color: "#0057FF" },
              { to: 150,   suffix: "+", label: "Events Monthly", color: "#FF6B00" },
              { to: 3,     suffix: "",  label: "Countries",      color: "#00E87A" },
              { to: 5,     suffix: "+", label: "Sports Covered", color: "#FFD600" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(32px, 5vw, 56px)", color: s.color, letterSpacing: "0.02em", lineHeight: 1, marginBottom: 8 }}>
                  <Counter to={s.to} suffix={s.suffix} />
                </p>
                <p style={{ fontSize: 13, color: "var(--color-sq-muted)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── STORY ───────────────────────────────── */}
     <section className="about-section" style={{ background: "var(--color-sq-bg)", paddingTop: 96, paddingBottom: 96 }}>
  <div className="about-container">
    <div className="story-grid">
      <FadeUp>
        <div className="story-collage">
          <div className="story-img-tall">
            <img src="/fans.jpg" alt="Stadium entry" />
          </div>
          <div className="story-img">
            <img src="https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?w=400&auto=format&fit=crop&q=80" alt="Ice hockey" />
          </div>
          <div className="story-img">
            <img src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&auto=format&fit=crop&q=80" alt="Basketball" />
          </div>
        </div>
      </FadeUp>

      <div>
        <FadeUp delay={80}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-sq-blue)", marginBottom: 16 }}>THE ORIGIN</p>
          <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(34px, 5vw, 60px)", letterSpacing: "0.02em", color: "var(--color-sq-ink)", lineHeight: 1, marginBottom: 24 }}>
            BORN FROM THE{" "}
            <span style={{ color: "#FF6B00" }}>STANDS</span>
          </h2>
        </FadeUp>

        <FadeUp delay={160}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 15, lineHeight: 1.8, fontWeight: 300, color: "var(--color-sq-body)", marginBottom: 28 }}>
            <p>Sportcliq was born from a simple idea — sports fans everywhere deserved a better way to experience the game together.</p>
            <p>We saw passionate fans in Canada watching the same matches, cheering the same plays, feeling the same highs and lows — but doing it alone. No shared space. No real community. Just group chats and social media noise.</p>
            <p>So we built the place they deserved. Sportcliq is community-first, real-time, and built for the fans who live and breathe sport.</p>
          </div>
        </FadeUp>

        <FadeUp delay={240}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: 20, borderRadius: 16, border: "1.5px solid var(--color-sq-border)", background: "var(--color-sq-surface)" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, background: "rgba(0,87,255,0.1)" }}>🎯</div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: "var(--color-sq-ink)" }}>Where We're Starting</p>
              <p style={{ fontSize: 12, lineHeight: 1.6, color: "var(--color-sq-body)" }}>Launching in Canada — building the foundation for a fan community that's real-time, sport-agnostic, and built to grow.</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  </div>
</section>

      {/* ── VALUES ──────────────────────────────── */}
      <section className="about-section" style={{ background: "var(--color-sq-surface)", paddingTop: 96, paddingBottom: 96 }}>
        <div className="about-container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-sq-blue)", marginBottom: 12 }}>What We Stand For</p>
              <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(34px, 5vw, 60px)", letterSpacing: "0.02em", color: "var(--color-sq-ink)", lineHeight: 1 }}>
                OUR{" "} VALUES
              </h2>
            </div>
          </FadeUp>

          <div className="values-grid">
            {[
              { icon: "🌍", title: "COMMUNITY FIRST",  desc: "Every decision starts with the fan. We build features that bring people together, not just engagement metrics.", accent: "#0057FF" },
              { icon: "⚡", title: "REAL-TIME ENERGY", desc: "Sports are alive. Our platform moves at the pace of the game — no delays, no lag, no missing the moment.",    accent: "#FF6B00" },
              { icon: "🤝", title: "CULTURE IS CORE",  desc: "We don't just cover sports — we celebrate the culture around them. From chants to banter to local legends.",   accent: "#00E87A" },
              { icon: "🌐", title: "NO BORDERS",       desc: "We're building the ultimate home for sports fans — a place where passion meets community and every voice counts. Welcome to the Cliq.",        accent: "#7B2FFF" },
              { icon: "📍", title: "LOCAL MATTERS",    desc: "Global vibes, local roots. Event discovery is hyper-local so you never miss what's happening in your city.",    accent: "#00D4FF" },
              { icon: "🚀", title: "BUILT TO SCALE",   desc: "Building a Platform For every sport Lover In The world.",     accent: "#FFD600" },
            ].map((v, i) => (
              <FadeUp key={v.title} delay={i * 60}>
                <ValueCard {...v} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION QUOTE ───────────────────────── */}
      <section className="about-section" style={{ background: "var(--color-sq-dark)", paddingTop: 80, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #0057FF 0%, #00D4FF 35%, #FF6B00 70%, #00E87A 100%)" }} />
        <div style={{ pointerEvents: "none", position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="about-container" style={{ maxWidth: 720, textAlign: "center", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-sq-muted)", marginBottom: 24 }}>Our Mission</p>
            <blockquote style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(22px, 4vw, 46px)", letterSpacing: "0.03em", color: "", lineHeight: 1.15, marginBottom: 32 }}>
              "TO UNITE SPORTS FANS ACROSS{" "} &{" "}
              <span style={{ color: "#00E87A" }}>BEYOND</span> — ONE <span style={{ color: "#0057ff" }}>CLIQ </span>
               AT A TIME."
            </blockquote>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: "var(--color-sq-muted)", maxWidth: 560, margin: "0 auto" }}>
              The Platform focuses on combining real-time fan conversations, personalised feeds, and local event discovery into one unified experience — validating community-driven engagement at scale.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── SPORTS WE COVER ─────────────────────── */}
      <section className="about-section" style={{ background: "var(--color-sq-bg)", paddingTop: 96, paddingBottom: 96 }}>
        <div className="about-container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-sq-blue)", marginBottom: 12 }}>Multi-Sport</p>
              <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(34px, 5vw, 60px)", letterSpacing: "0.02em", color: "var(--color-sq-ink)", lineHeight: 1 }}>
                EVERY SPORT{" "}
                {/* ✅ FIXED: outline text */}
                <span style={{ display: "inline", color: "transparent", WebkitTextStroke: "2px #0057FF" }}>
                  YOU LOVE
                </span>
              </h2>
            </div>
          </FadeUp>

          <div className="sports-grid">
            {[
              { icon: "⚽", sport: "Soccer",   color: "#0057FF", desc: "" },
              { icon: "🏀", sport: "Basketball", color: "#FF6B00", desc: "" },
              { icon: "🏉", sport: "American Football",      color: "#7B2FFF", desc: "" },
              { icon: "🏒", sport: "Ice-Hockey",    color: "#FFD600", desc: "" },
            ].map((s, i) => (
              <FadeUp key={s.sport} delay={i * 70}>
                <SportCard {...s} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>


      {/* ── CTA ─────────────────────────────────── */}
      {/* ✅ FIXED: rebuilt with CSS classes so z-index stacking works properly */}
      <section className="about-section" style={{ background: "var(--color-sq-surface)", paddingTop: 80, paddingBottom: 80 }}>
        <div className="about-container" style={{ maxWidth: 860 }}>
          <FadeUp>
            <div className="cta-card">
              {/* Background layers — z-index 1, behind content */}
              <div className="cta-orb-1" />
              <div className="cta-orb-2" />
              <div className="cta-grid" />

              {/* Content — z-index 2, always on top */}
              <div className="cta-card-content">
                <p className="cta-eyebrow">Be Part of the Story</p>
                <h2 className="cta-heading">
                  JOIN THE <span className="cta-heading-accent">MOVEMENT</span>
                </h2>
                <p className="cta-body">
                  Find your cliq. Sports fans across North America are signing up — join the conversation before we go live.
                </p>
                <div className="cta-buttons">
                  <a href="/contact" className="cta-btn-primary">
                    Join Waitlist
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </a>
                  <a href="https://t.me/sportcliq" className="cta-btn-secondary">
                    Explore Platform
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

    </main>
  );
}