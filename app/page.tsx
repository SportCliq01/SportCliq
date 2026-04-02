"use client";
import { useEffect, useRef, useState } from "react";
import WaitlistModal from "./components/WaitlistModal";

/* ── Counter ─────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref  = useRef<HTMLSpanElement>(null);
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
    }, { threshold: .3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ── Ticker ───────────────────────────────────── */
function Ticker() {
  const items = [
    "⚽ Super Eagles 2–0 Ivory Coast · 71ʼ",
    "🏀 Lagos Ballers lead Raptors 905 · Q3",
    "🏃 Omolara Alli wins 100m heat · Diamond League",
    "🏉 Nigeria Rugby secures AFCON qualifier",
    "⚽ AFCON 2025 draw confirmed · Abuja & Lagos",
    "🏏 Nigeria Cricket advances to Super 6",
    "🏀 NBL Finals — Lagos & Abuja dates announced",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {doubled.map((t, i) => (
          <span key={i} className="ticker-item">{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────── */
export default function SportcliqMinimal() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="page-root">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --white:   #FFFFFF;
          --canvas:  #F8F7F4;
          --ink:     #111110;
          --ink2:    #3D3C39;
          --ink3:    #8A8880;
          --rule:    #E5E3DE;
          --accent:  #1447E6;
          --accent2: #FF4D00;
          --green:   #15803D;
          --font-headline: 'Anton', sans-serif;
          --font-body:     'Outfit', sans-serif;
        }
        body {
          font-family: var(--font-body);
          background: var(--white);
          color: var(--ink);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        a { text-decoration: none; color: inherit; }
        img { display: block; max-width: 100%; }
        button { cursor: pointer; border: none; background: none; font-family: var(--font-body); }
        ::selection { background: var(--accent); color: #fff; }

        @keyframes fadeUp  { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:none } }
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes ticker  { 0% { transform:translateX(0) } 100% { transform:translateX(-50%) } }
        @keyframes pulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.4)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:none} }

        .fu  { animation: fadeUp .7s cubic-bezier(.22,1,.36,1) both; }
        .fu1 { animation-delay: .05s }
        .fu2 { animation-delay: .15s }
        .fu3 { animation-delay: .28s }
        .fu4 { animation-delay: .42s }

        /* ── Page root ── */
        .page-root {
          background: var(--white);
          padding-top: 72px;
        }

        /* ── Buttons ── */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--ink); color: #fff;
          font-family: var(--font-headline); font-size: 13px; font-weight: 400;
          letter-spacing: 1px;
          padding: 12px 24px; border-radius: 8px;
          transition: background .2s, transform .2s;
          border: none; cursor: pointer;
        }
        .btn-primary:hover { background: var(--accent); transform: translateY(-1px); }
        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: var(--ink);
          font-family: var(--font-headline); font-size: 13px; font-weight: 400;
          letter-spacing: 1px;
          padding: 11px 22px; border-radius: 8px;
          border: 1.5px solid var(--rule);
          transition: border-color .2s, background .2s;
          cursor: pointer;
        }
        .btn-outline:hover { border-color: var(--ink3); background: var(--canvas); }

        /* ── Live dot ── */
        .live-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--green);
          animation: pulse 2s infinite;
          flex-shrink: 0;
          display: inline-block;
        }

        /* ── Tag pill ── */
        .tag {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 12px; border-radius: 99px; border: 1.5px solid var(--rule);
          font-family: var(--font-body); font-size: 12px; font-weight: 500; color: var(--ink2);
          letter-spacing: .1px; transition: border-color .2s, background .2s;
        }
        .tag:hover { border-color: var(--ink3); background: var(--canvas); }

        /* ── Ticker ── */
        .ticker-wrap {
          overflow: hidden;
          border-bottom: 1.5px solid var(--rule);
          background: var(--white);
          padding: 10px 0;
        }
        .ticker-inner {
          display: flex;
          animation: ticker 36s linear infinite;
          white-space: nowrap;
        }
        .ticker-inner:hover { animation-play-state: paused; }
        .ticker-item {
          font-size: 12px; font-weight: 500;
          color: var(--ink2); padding-right: 56px;
          white-space: nowrap;
        }

        /* ── Inputs ── */
        .wl-input {
          font-family: var(--font-body); font-size: 14px; color: var(--ink);
          background: var(--white); border: 1.5px solid var(--rule);
          border-radius: 8px; padding: 12px 16px; outline: none;
          transition: border-color .2s; width: 100%;
        }
        .wl-input:focus { border-color: var(--accent); }
        .wl-input::placeholder { color: var(--ink3); }

        /* ── Feature cards ── */
        .feat-card {
          border-radius: 16px; overflow: hidden; position: relative;
          transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s;
        }
        .feat-card:hover { transform: translateY(-5px); box-shadow: 0 20px 56px rgba(0,0,0,.08); }
        .feat-card:hover .feat-img { transform: scale(1.04); }
        .feat-img { transition: transform .5s cubic-bezier(.22,1,.36,1); }

        /* ── Event cards ── */
        .ev-card {
          border: 1.5px solid var(--rule); border-radius: 16px;
          overflow: hidden;
          transition: border-color .25s, box-shadow .25s, transform .3s cubic-bezier(.22,1,.36,1);
          background: var(--white);
        }
        .ev-card:hover { border-color: transparent; box-shadow: 0 12px 40px rgba(0,0,0,.08); transform: translateY(-4px); }
        .ev-card:hover .ev-img { transform: scale(1.04); }
        .ev-img { transition: transform .5s cubic-bezier(.22,1,.36,1); }

        /* ══════════════════════════════════════════
           HERO
        ══════════════════════════════════════════ */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--white);
        }
        .hero-inner {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 40px 0;
          width: 100%;
        }
        .hero-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 36px;
        }
        .hero-label span {
          font-size: 12px; font-weight: 500;
          color: var(--ink2); letter-spacing: .5px;
        }
        .hero-h1 {
          font-family: var(--font-headline);
          font-size: clamp(52px, 9vw, 120px);
          font-weight: 400; line-height: .95; letter-spacing: 1px;
          max-width: 900px; margin-bottom: 32px;
        }
        .hero-sub-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 32px;
          margin-bottom: 56px;
        }
        .hero-sub-row p {
          font-size: 17px; color: var(--ink2);
          line-height: 1.75; max-width: 440px; font-weight: 300;
        }
        .hero-cta {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
        }
        .hero-cta-hint {
          font-size: 12px;
          color: var(--ink3);
        }
        .hero-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 56px;
        }
        .hero-img-wrap {
          width: 100%;
          height: 380px;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
        }
        .hero-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 40%;
        }
        .hero-img-fade {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, var(--white) 0%, transparent 18%, transparent 100%);
        }
        .hero-stats {
          position: absolute;
          bottom: 24px; left: 40px;
          display: flex; gap: 12px;
          flex-wrap: wrap;
        }
        .hero-stat {
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255,255,255,.9);
          border-radius: 12px;
          padding: 10px 18px;
        }
        .hero-stat-val {
          font-family: var(--font-headline);
          font-size: 22px; font-weight: 400;
          letter-spacing: 1px; color: var(--ink); line-height: 1;
        }
        .hero-stat-label {
          font-size: 11px; font-weight: 500;
          color: var(--ink3); margin-top: 2px;
        }

        /* ══════════════════════════════════════════
           MISSION
        ══════════════════════════════════════════ */
        .mission {
          padding: 96px 40px;
          background: var(--canvas);
        }
        .mission-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .mission-eyebrow {
          font-size: 11px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          color: var(--ink3); margin-bottom: 20px;
        }
        .mission-h2 {
          font-family: var(--font-headline);
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 400; line-height: 1; letter-spacing: 1px;
          margin-bottom: 24px;
        }
        .mission-body {
          font-size: 16px; color: var(--ink2);
          line-height: 1.8; font-weight: 300; margin-bottom: 20px;
        }
        .mission-countries {
          display: flex; gap: 10px; flex-wrap: wrap;
        }
        .mission-country {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 16px;
          background: var(--white);
          border: 1.5px solid var(--rule);
          border-radius: 8px;
        }
        .mission-country span:first-child { font-size: 16px; }
        .mission-country span:last-child { font-size: 13px; font-weight: 500; color: var(--ink); }
        .mission-photos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          height: 440px;
        }
        .mission-photo-tall {
          border-radius: 16px; overflow: hidden;
          grid-row: span 2;
        }
        .mission-photo {
          border-radius: 16px; overflow: hidden;
        }
        .mission-photo img,
        .mission-photo-tall img {
          width: 100%; height: 100%; object-fit: cover;
        }

        /* ══════════════════════════════════════════
           STATS
        ══════════════════════════════════════════ */
        .stats {
          border-top: 1.5px solid var(--rule);
          border-bottom: 1.5px solid var(--rule);
          background: var(--white);
        }
        .stats-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .stat-cell {
          padding: 52px 40px;
          text-align: center;
        }
        .stat-cell:not(:last-child) {
          border-right: 1.5px solid var(--rule);
        }
        .stat-val {
          font-family: var(--font-headline);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400; letter-spacing: 1px;
          color: var(--ink); line-height: 1; margin-bottom: 8px;
        }
        .stat-label {
          font-size: 13px; font-weight: 500; color: var(--ink3);
        }

        /* ══════════════════════════════════════════
           FEATURES
        ══════════════════════════════════════════ */
        .features {
          padding: 96px 40px;
          background: var(--white);
        }
        .features-inner {
          max-width: 1200px; margin: 0 auto;
        }
        .features-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 48px;
          padding-bottom: 36px;
          border-bottom: 1.5px solid var(--rule);
          flex-wrap: wrap;
          gap: 20px;
        }
        .features-eyebrow {
          font-size: 11px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          color: var(--ink3); margin-bottom: 14px;
        }
        .features-h2 {
          font-family: var(--font-headline);
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 400; letter-spacing: 1px; line-height: 1;
        }
        .features-sub {
          font-size: 15px; color: var(--ink2);
          font-weight: 300; max-width: 360px; line-height: 1.75;
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr;
          grid-template-rows: 260px 260px;
          gap: 14px;
        }
        .feat-main {
          grid-row: span 2;
        }

        /* ══════════════════════════════════════════
           LIVE EVENTS
        ══════════════════════════════════════════ */
        .events {
          padding: 80px 40px;
          background: var(--canvas);
        }
        .events-inner {
          max-width: 1200px; margin: 0 auto;
        }
        .events-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .events-live {
          display: flex; align-items: center; gap: 8px; margin-bottom: 12px;
        }
        .events-live span {
          font-size: 12px; font-weight: 600;
          color: var(--green); letter-spacing: .3px;
        }
        .events-h2 {
          font-family: var(--font-headline);
          font-size: clamp(28px, 4.5vw, 52px);
          font-weight: 400; letter-spacing: 1px; line-height: 1;
        }
        .events-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .ev-img-wrap {
          position: relative; height: 192px; overflow: hidden;
        }
        .ev-img-wrap img {
          width: 100%; height: 100%; object-fit: cover;
        }
        .ev-badge {
          position: absolute; top: 14px;
          background: rgba(255,255,255,.92);
          border-radius: 6px; padding: 4px 10px;
        }
        .ev-badge-sport { left: 14px; }
        .ev-badge-live  { right: 14px; display: flex; align-items: center; gap: 5px; }
        .ev-badge span  { font-size: 11px; font-weight: 600; color: var(--ink); }
        .ev-badge-live span { color: var(--green); }
        .ev-score {
          position: absolute; bottom: 14px;
          left: 0; right: 0; text-align: center;
        }
        .ev-score span {
          font-family: var(--font-headline);
          font-size: 26px; font-weight: 400;
          color: #fff; letter-spacing: 1px;
          text-shadow: 0 2px 8px rgba(0,0,0,.5);
        }
        .ev-body { padding: 18px 20px 20px; }
        .ev-match {
          font-family: var(--font-headline);
          font-size: 16px; font-weight: 400;
          letter-spacing: .5px; margin-bottom: 4px; line-height: 1.2;
        }
        .ev-detail { font-size: 12px; color: var(--ink3); margin-bottom: 16px; }
        .ev-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ev-avatars { display: flex; }
        .ev-avatar {
          width: 22px; height: 22px; border-radius: 50%;
          border: 2.5px solid var(--white);
        }
        .ev-avatar:not(:first-child) { margin-left: -7px; }
        .ev-watching { font-size: 12px; color: var(--ink3); font-weight: 500; }

        /* ══════════════════════════════════════════
           FAN CHAT
        ══════════════════════════════════════════ */
        .chat-section {
          padding: 96px 40px;
          background: var(--white);
          border-top: 1.5px solid var(--rule);
        }
        .chat-inner {
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .chat-eyebrow {
          font-size: 11px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          color: var(--ink3); margin-bottom: 20px;
        }
        .chat-h2 {
          font-family: var(--font-headline);
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400; letter-spacing: 1px;
          line-height: 1.05; margin-bottom: 24px;
        }
        .chat-body {
          font-size: 16px; color: var(--ink2);
          line-height: 1.8; font-weight: 300; margin-bottom: 36px;
        }
        .chat-features { display: flex; flex-direction: column; gap: 12px; margin-bottom: 40px; }
        .chat-feat {
          display: flex; gap: 14px; align-items: flex-start;
          padding: 16px 18px;
          border: 1.5px solid var(--rule); border-radius: 12px;
        }
        .chat-feat-icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
        .chat-feat-title { font-size: 14px; font-weight: 600; color: var(--ink); margin-bottom: 3px; }
        .chat-feat-desc  { font-size: 13px; color: var(--ink3); line-height: 1.5; }

        /* Chat UI */
        .chat-ui {
          background: var(--canvas);
          border: 1.5px solid var(--rule);
          border-radius: 24px;
          padding: 28px;
        }
        .chat-ui-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 24px; padding-bottom: 20px;
          border-bottom: 1.5px solid var(--rule);
        }
        .chat-ui-title { font-family: var(--font-headline); font-size: 16px; font-weight: 400; letter-spacing: 1px; }
        .chat-ui-sub   { font-size: 11px; color: var(--ink3); margin-top: 2px; }
        .chat-live-badge {
          display: flex; align-items: center; gap: 6px;
          background: rgba(21,128,61,.1);
          border: 1.5px solid rgba(21,128,61,.2);
          border-radius: 8px; padding: 5px 10px;
        }
        .chat-live-badge span { font-size: 11px; font-weight: 600; color: var(--green); }
        .chat-msg { display: flex; gap: 10px; }
        .chat-msg:not(:last-child) { margin-bottom: 14px; }
        .chat-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 13px; font-weight: 700;
        }
        .chat-bubble {
          flex: 1; background: var(--white);
          border-radius: 12px; padding: 10px 14px;
          border: 1.5px solid var(--rule);
        }
        .chat-bubble-meta {
          display: flex; justify-content: space-between; margin-bottom: 4px;
        }
        .chat-bubble-name { font-size: 13px; font-weight: 600; color: var(--ink); }
        .chat-bubble-flag { font-size: 14px; }
        .chat-bubble-time { font-size: 10px; color: var(--ink3); }
        .chat-bubble-text { font-size: 13px; color: var(--ink2); line-height: 1.5; }
        .chat-input-row {
          display: flex; align-items: center; gap: 10px;
          background: var(--white); border-radius: 12px;
          padding: 10px 14px; border: 1.5px solid var(--rule);
          margin-top: 14px;
        }
        .chat-input-placeholder { flex: 1; font-size: 13px; color: var(--ink3); }
        .chat-send {
          width: 28px; height: 28px; border-radius: 8px;
          background: var(--accent);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0;
        }

        /* ══════════════════════════════════════════
           CTA
        ══════════════════════════════════════════ */
        .cta-section {
          padding: 0 40px 96px;
          background: var(--white);
        }
        .cta-inner { max-width: 1200px; margin: 0 auto; }
        .cta-card {
          border-radius: 24px; overflow: hidden; position: relative;
        }
        .cta-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
        }
        .cta-overlay {
          position: absolute; inset: 0;
          background: rgba(248,247,244,.92);
        }
        .cta-content {
          position: relative; z-index: 1;
          padding: 80px 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
          flex-wrap: wrap;
        }
        .cta-left { max-width: 520px; }
        .cta-eyebrow {
          font-size: 11px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          color: var(--ink3); margin-bottom: 16px;
        }
        .cta-h2 {
          font-family: var(--font-headline);
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 400; letter-spacing: 1px;
          line-height: .95; margin-bottom: 18px;
        }
        .cta-body {
          font-size: 16px; color: var(--ink2);
          line-height: 1.75; font-weight: 300;
        }
        .cta-form {
          display: flex; flex-direction: column;
          gap: 12px; min-width: 320px;
        }
        .cta-hint {
          font-size: 12px; color: var(--ink3); text-align: center;
        }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
          }
          .feat-main { grid-row: auto; grid-column: span 2; height: 300px; }
        }

        @media (max-width: 768px) {
          .page-root { padding-top: 64px; }

          /* Hero */
          .hero-inner { padding: 40px 20px 0; }
          .hero-h1 { font-size: clamp(40px, 10vw, 72px); margin-bottom: 24px; }
          .hero-sub-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            margin-bottom: 32px;
          }
          .hero-sub-row p { font-size: 15px; max-width: 100%; }
          .hero-cta { align-items: stretch; width: 100%; }
          .btn-primary, .btn-outline {
            justify-content: center;
            width: 100%;
            padding: 13px 20px;
            font-size: 13px;
          }
          .hero-tags { margin-bottom: 32px; }
          .hero-img-wrap { height: 260px; }
          .hero-stats { left: 16px; bottom: 12px; gap: 8px; }
          .hero-stat { padding: 8px 12px; }
          .hero-stat-val { font-size: 18px; }

          /* Mission */
          .mission { padding: 60px 20px; }
          .mission-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .mission-photos {
            height: 280px;
          }

          /* Stats */
          .stats-inner {
            grid-template-columns: repeat(2, 1fr);
          }
          .stat-cell {
            padding: 32px 20px;
          }
          .stat-cell:nth-child(2) { border-right: none; }
          .stat-cell:nth-child(odd):not(:last-child) { border-right: 1.5px solid var(--rule); }
          .stat-cell:nth-child(1),
          .stat-cell:nth-child(2) { border-bottom: 1.5px solid var(--rule); }

          /* Features */
          .features { padding: 60px 20px; }
          .features-header { flex-direction: column; align-items: flex-start; }
          .features-sub { max-width: 100%; }
          .features-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            gap: 12px;
          }
          .feat-main { grid-row: auto; grid-column: auto; height: 280px; }
          .feat-card:not(.feat-main) { height: 220px; }

          /* Events */
          .events { padding: 60px 20px; }
          .events-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          /* Chat */
          .chat-section { padding: 60px 20px; }
          .chat-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .chat-body { font-size: 15px; }

          /* CTA */
          .cta-section { padding: 0 20px 60px; }
          .cta-content {
            padding: 40px 24px;
            flex-direction: column;
            align-items: flex-start;
          }
          .cta-form { min-width: 0; width: 100%; }
        }

        @media (max-width: 480px) {
          .hero-inner { padding: 32px 16px 0; }
          .hero-label { margin-bottom: 24px; }
          .hero-img-wrap { height: 220px; }
          .hero-stats { flex-wrap: wrap; }

          .mission { padding: 48px 16px; }
          .mission-photos { height: 220px; }

          .features { padding: 48px 16px; }
          .events   { padding: 48px 16px; }
          .chat-section { padding: 48px 16px; }
          .cta-section { padding: 0 16px 48px; }

          .events-grid { grid-template-columns: 1fr; }

          /* Stats 1-col on very small phones */
          .stats-inner { grid-template-columns: 1fr; }
          .stat-cell { border-right: none !important; }
          .stat-cell:not(:last-child) { border-bottom: 1.5px solid var(--rule); border-right: none; }
        }
      `}</style>

      {waitlistOpen && <WaitlistModal onClose={() => setWaitlistOpen(false)} />}

      {/* ═══ HERO ════════════════════════════════ */}
      <section className="hero">
        

        <div className="hero-inner">
          <div className="hero-label fu fu1">
            <div className="live-dot" />
            <span></span>
          </div>

          <h1 className="hero-h1 fu fu2">
            WHERE FANS<br />FIND THEIR{" "}
            <span style={{ color: "var(--accent)" }}>CLIQ.</span>
          </h1>

          <div className="hero-sub-row fu fu3">
            <p>
              Real-time fan conversations, personalized sports feeds, and local event discovery — one platform built for the culture.
            </p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => setWaitlistOpen(true)} style={{ fontSize: 14, padding: "14px 28px" }}>
                JOIN THE WAITLIST
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </button>
              <a href="https://t.me/sportcliq" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: 14, padding: "14px 28px", textDecoration: "none" }}>
                JOIN THE CLIQ ON TELEGRAM
              </a>
            </div>
          </div>

          <div className="hero-tags fu fu3">
            {["⚽ Soccer", "🏀 Basketball", "🏉 American Football", "🏒 Ice-Hockey"].map(s => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>
        </div>

        <div className="hero-img-wrap fu fu4">
          <img
            src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1600&auto=format&fit=crop&q=80"
            alt="Stadium crowd"
          />
          <div className="hero-img-fade" />
          {/* <div className="hero-stats">
            {[
              { val: "24K+", label: "Active Fans" },
              { val: "150+", label: "Monthly Events" },
              { val: "3",    label: "Countries" },
            ].map(s => (
              <div key={s.label} className="hero-stat">
                <p className="hero-stat-val">{s.val}</p>
                <p className="hero-stat-label">{s.label}</p>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* ═══ MISSION ══════════════════════════════ */}
      <section className="mission">
        <div className="mission-inner">
          <div>
            <p className="mission-eyebrow">Our Mission</p>
            <h2 className="mission-h2">
              SPORTS HAS<br />NO <span style={{ color: "var(--accent2)" }}>BORDERS.</span>
            </h2>
            <p className="mission-body">
              Sportcliq is a fan engagement and community platform designed to bring sports enthusiasts together.
            </p>
            <p className="mission-body">
              We combine real-time conversations, personalized feeds, and local event discovery into one unified experience — built for the culture.
            </p>
           
          </div>

          <div className="mission-photos">
            <div className="mission-photo-tall">
              <img src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=500&auto=format&fit=crop&q=80" alt="Sports fans" />
            </div>
            <div className="mission-photo">
              <img src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&auto=format&fit=crop&q=80" alt="Basketball" />
            </div>
            <div className="mission-photo">
              <img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&auto=format&fit=crop&q=80" alt="Athletics" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ════════════════════════════════ */}
      {/* <section className="stats">
        <div className="stats-inner">
          {[
            { to: 24000, suffix: "+", label: "Active fans" },
            { to: 150,   suffix: "+", label: "Live events monthly" },
            { to: 3,     suffix: "",  label: "Countries & growing" },
            { to: 98,    suffix: "%", label: "Fan satisfaction" },
          ].map((s) => (
            <div key={s.label} className="stat-cell">
              <p className="stat-val"><Counter to={s.to} suffix={s.suffix} /></p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* ═══ FEATURES ═════════════════════════════ */}
      <section className="features">
        <div className="features-inner">
          <div className="features-header">
            <div>
              <p className="features-eyebrow">Platform Features</p>
              <h2 className="features-h2">
                BUILT FOR THE<br /><span style={{ color: "var(--accent)" }}>REAL FAN.</span>
              </h2>
            </div>
            <p className="features-sub">
              Everything you need to live, breathe, and share sports — in one clean, unified experience.
            </p>
          </div>

          <div className="features-grid">
            <div className="feat-card feat-main">
              <img className="feat-img" src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80" alt="Fan feed" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.65) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 28 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <div className="live-dot" />
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#fff", letterSpacing: .5 }}>Real-time</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-headline)", fontSize: 28, fontWeight: 400, color: "#fff", letterSpacing: 1, marginBottom: 8, lineHeight: 1.1 }}>REAL-TIME FAN FEED</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,.72)", lineHeight: 1.6, maxWidth: 280 }}>Live match conversations as they unfold. React and vibe with thousands of fans simultaneously.</p>
              </div>
            </div>

            {[
              { img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&auto=format&fit=crop&q=80", label: "Discovery",    title: "EVENT DISCOVERY",     desc: "Find local sports events and watch parties near you." },
              { img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=80", label: "Personalized", title: "YOUR FEED",           desc: "Curated to the teams and sports you're most passionate about." },
              { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80", label: "Community",    title: "CREATE A CLIQ",      desc: "Create A Cliq Join A Cliq, Find Your Cliq." },
              { img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80", label: "Global",       title: "CROSS-BORDER UNITY", desc: "Sports has no borders. So Join A Cliq!" },
            ].map((f, i) => (
              <div key={i} className="feat-card">
                <img className="feat-img" src={f.img} alt={f.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 22px" }}>
                  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 5 }}>{f.label}</p>
                  <h3 style={{ fontFamily: "var(--font-headline)", fontSize: 18, fontWeight: 400, color: "#fff", letterSpacing: 1, marginBottom: 5 }}>{f.title}</h3>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,.65)", lineHeight: 1.5 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* ═══ FAN CHAT PREVIEW ═════════════════════ */}
     <section className="chat-section">
  <div className="chat-inner">
    <div>
      <p className="chat-eyebrow">Community</p>
      <h2 className="chat-h2">
        YOUR CLIQ<br />IS <span style={{ color: "var(--accent)" }}>WAITING.</span>
      </h2>
      <p className="chat-body">
        Sports fans across North America are already signing up, finding their cliq, 
        and getting ready to live sports together. 
        Join the conversation before we go live
      </p>
      <div className="chat-features">
        {[
          { icon: "💬", title: "Real-time conversations", desc: "Live match chats that move at the speed of the game" },
          { icon: "📍", title: "Local event discovery",   desc: "Find and share sports events in your city" },
          { icon: "🤝", title: "Cliq building",          desc: "Find people who share your passion for the sport" },
        ].map(f => (
          <div key={f.title} className="chat-feat">
            <span className="chat-feat-icon">{f.icon}</span>
            <div>
              <p className="chat-feat-title">{f.title}</p>
              <p className="chat-feat-desc">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px", textAlign: "center" }}>
        <button className="btn-primary" onClick={() => setWaitlistOpen(true)} style={{ fontSize: 14, padding: "14px 28px" }}>
          JOIN THE WAITLIST
        </button>
        <a href="https://t.me/sportcliq" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: 14, padding: "14px 28px", textDecoration: "none" }}>
          JOIN THE CLIQ ON TELEGRAM
        </a>
      </div>
    </div>

    <div className="chat-ui">
      <div className="chat-ui-header">
        <div>
          <p className="chat-ui-title">FAN FEED</p>
          <p className="chat-ui-sub">Live · Just now</p>
        </div>
        <div className="chat-live-badge">
          <div className="live-dot" />
          <span>Live</span>
        </div>
      </div>

      {[
        { user: "Emeka O.",  msg: "Super Eagles dominating the midfield! 🦅🔥",         color: "#1447E6", flag: "🇳🇬", time: "now" },
        { user: "Damola K.", msg: "That pass from Lookman 😭 absolute madness!",         color: "#FF4D00", flag: "🇳🇬", time: "1m" },
        { user: "Marcus T.", msg: "Watching from Toronto — Lagos send the energy 🙌🏾", color: "#7C3AED", flag: "🇨🇦", time: "2m" },
        { user: "Aisha B.",  msg: "Goals incoming, I can feel it 🎯 Let's go!",         color: "#15803D", flag: "🇳🇬", time: "3m" },
      ].map((m, i) => (
        <div key={i} className="chat-msg">
          <div className="chat-avatar" style={{ background: m.color }}>{m.user[0]}</div>
          <div className="chat-bubble">
            <div className="chat-bubble-meta">
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span className="chat-bubble-name">{m.user}</span>
                <span className="chat-bubble-flag">{m.flag}</span>
              </div>
              <span className="chat-bubble-time">{m.time}</span>
            </div>
            <p className="chat-bubble-text">{m.msg}</p>
          </div>
        </div>
      ))}

      <div className="chat-input-row" onClick={() => window.open("https://t.me/sportcliq", "_blank")} style={{ cursor: "pointer" }}>
        <span className="chat-input-placeholder">Add to the conversation...</span>
        <div className="chat-send">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5h7M5.5 2l3.5 3.5L5.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ═══ CTA ══════════════════════════════════ */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="cta-card">
            <img className="cta-bg" src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1600&auto=format&fit=crop&q=80" alt="Stadium" />
            <div className="cta-overlay" />
            <div className="cta-content">
              <div className="cta-left">
                <p className="cta-eyebrow">Early Access · Limited Spots</p>
                <h2 className="cta-h2">
                  READY TO JOIN<br />THE <span style={{ color: "var(--accent)" }}>MOVEMENT?</span>
                </h2>
                <p className="cta-body">
                  Find your cliq. Sports fans across North America are signing up — join the conversation before we go live.
                </p>
              </div>
              <div className="cta-form">
                
                <button className="btn-primary" onClick={() => setWaitlistOpen(true)} style={{ justifyContent: "center", padding: "14px" }}>
                  GET EARLY ACCESS
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                </button>
                <p className="cta-hint">Free to join · No credit card required</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}