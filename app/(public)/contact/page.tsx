"use client";

import WaitlistModal from "@/app/components/WaitlistModal";
import Image from "next/image";
import { useState } from "react";

const _styles = (() => {
  if (typeof document === "undefined") return;
  const id = "sportcliq-contact-styles";
  if (document.getElementById(id)) return;
  const s = document.createElement("style");
  s.id = id;
  s.textContent = `
    @keyframes fadeUp  { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:none } }
    @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
    @keyframes pulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.4)} }
    @keyframes spin    { to { transform:rotate(360deg) } }
    @keyframes scaleIn { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:none} }

    .fu  { animation: fadeUp .7s cubic-bezier(.22,1,.36,1) both; }
    .fu1 { animation-delay: .05s }
    .fu2 { animation-delay: .15s }
    .fu3 { animation-delay: .28s }
    .fu4 { animation-delay: .42s }

    .contact-input {
      font-family: var(--font-body); font-size: 14px; color: var(--ink);
      background: var(--white); border: 1.5px solid var(--rule);
      border-radius: 8px; padding: 13px 16px; outline: none;
      transition: border-color .2s, box-shadow .2s; width: 100%;
    }
    .contact-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(20,71,230,.08); }
    .contact-input::placeholder { color: var(--ink3); }

    .contact-btn {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--ink); color: #fff;
      font-family: var(--font-headline); font-size: 13px; font-weight: 400;
      letter-spacing: 1px; padding: 14px 28px; border-radius: 8px;
      border: none; cursor: pointer;
      transition: background .2s, transform .2s;
      width: 100%; justify-content: center;
    }
    .contact-btn:hover:not(:disabled) { background: var(--accent); transform: translateY(-1px); }
    .contact-btn:disabled { opacity: .6; cursor: not-allowed; }

    .social-link {
      display: flex; align-items: center; gap: 14px;
      padding: 18px 20px; border: 1.5px solid var(--rule); border-radius: 14px;
      background: var(--white); text-decoration: none; color: var(--ink);
      transition: border-color .2s, box-shadow .25s, transform .25s cubic-bezier(.22,1,.36,1);
    }
    .social-link:hover { border-color: var(--accent); box-shadow: 0 8px 24px rgba(20,71,230,.08); transform: translateY(-2px); }

    .office-card {
      border: 1.5px solid var(--rule); border-radius: 16px;
      overflow: hidden; background: var(--white);
      transition: border-color .2s, box-shadow .2s, transform .25s cubic-bezier(.22,1,.36,1);
    }
    .office-card:hover { border-color: rgba(20,71,230,.25); box-shadow: 0 10px 30px rgba(0,0,0,.06); transform: translateY(-3px); }

    .email-card {
      display: flex; align-items: center; gap: 14px;
      padding: 14px 18px; border: 1.5px solid var(--rule);
      border-radius: 12px; background: var(--white);
      transition: border-color .2s;
    }
    .email-card:hover { border-color: rgba(20,71,230,.25); }

    .live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: pulse 2s infinite; flex-shrink: 0; }

    /* ==================== MOBILE RESPONSIVENESS ==================== */
    @media (max-width: 768px) {
      section {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }

      .social-grid {
        grid-template-columns: 1fr !important;
        gap: 12px !important;
      }

      .offices-grid {
        grid-template-columns: 1fr !important;
        gap: 14px !important;
      }

      .contact-grid {
        grid-template-columns: 1fr !important;
        gap: 48px !important;
      }

      h1 {
        font-size: clamp(42px, 9vw, 72px) !important;
      }

      .hero-section {
        padding: 60px 20px 52px !important;
      }
    }

    @media (max-width: 480px) {
      section {
        padding-left: 16px !important;
        padding-right: 16px !important;
      }
    }
  `;
  document.head.appendChild(s);
})();

/* ── Icons (unchanged) ──────────────────────────────── */
const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M17.5 3.5L2.5 9l5 1.5 1.5 5 2.5-3 4 3 2-11z" stroke="#0088cc" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 3l5.5 7L3 17h2l4.5-5.5L14 17h3l-5.8-7.5L17 3h-2l-4 4.8L6 3H3z" fill="#111110" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="3" y="3" width="14" height="14" rx="4" stroke="url(#igG)" strokeWidth="1.5"/>
    <circle cx="10" cy="10" r="3" stroke="url(#igG)" strokeWidth="1.5"/>
    <circle cx="14.2" cy="5.8" r=".9" fill="#E1306C"/>
    <defs>
      <linearGradient id="igG" x1="3" y1="17" x2="17" y2="3" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f09433"/><stop offset=".25" stopColor="#e6683c"/>
        <stop offset=".5" stopColor="#dc2743"/><stop offset=".75" stopColor="#cc2366"/>
        <stop offset="1" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
  </svg>
);
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M13 2c.2 1.8 1.2 3 3 3.2v2.2c-1.1 0-2.1-.4-3-.9V13a5 5 0 11-5-5v2.2a2.8 2.8 0 102.8 2.8V2H13z" fill="#111110"/>
  </svg>
);
const ArrowIcon = () => (
  <svg style={{ marginLeft: "auto", flexShrink: 0 }} width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7h10M7 3l4 4-4 4" stroke="var(--ink3)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

/* ── Data (unchanged) ───────────────────────────────── */
const socials = [
  { name: "Telegram",   handle: "@sportcliq",      href: "https://t.me/sportcliq",                  icon: <TelegramIcon />,  bg: "rgba(0,136,204,.08)",   desc: "Join our community" },
  { name: "Twitter / X",handle: "@sportcliq",      href: "https://twitter.com/sportcliq_",           icon: <TwitterIcon />,   bg: "rgba(17,17,16,.05)",    desc: "Live updates & takes" },
  { name: "Instagram",  handle: "@sportcliq.app",  href: "https://instagram.com/sportcliq.app_",     icon: <InstagramIcon />, bg: "rgba(220,39,67,.06)",   desc: "Behind the scenes" },
  { name: "TikTok",     handle: "@sportcliq",      href: "https://tiktok.com/@sportcliq",           icon: <TikTokIcon />,    bg: "rgba(17,17,16,.05)",    desc: "Short-form content" },
];

const offices = [
  {
    flag: "🇳🇬", city: "Lagos", country: "Nigeria",
    address: "Victoria Island, Lagos", timezone: "WAT · UTC+1",
    color: "var(--accent2)",
    img: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&auto=format&fit=crop&q=80",
  },
  {
    flag: "🇨🇦", city: "Toronto", country: "Canada",
    address: "Downtown Toronto, ON", timezone: "EST · UTC-5",
    color: "var(--accent)",
    img: "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?w=600&auto=format&fit=crop&q=80",
  },
  {
    flag: "🇺🇸", city: "New York", country: "USA",
    address: "Manhattan, New York", timezone: "EST · UTC-5",
    color: "#7C3AED",
    img: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=600&auto=format&fit=crop&q=80",
  },
];

/* ── Page ───────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("sent");
  };

  const handle = (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div style={{ background: "var(--white)", minHeight: "100vh" }}>

      {/* HERO */}
      <section className="hero-section" style={{ background: "var(--canvas)", borderBottom: "1.5px solid var(--rule)", padding: "72px 40px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          {/* Left - Image */}
          <Image
            src="/contact-hero.jpeg"
            alt="Get In Touch"
            width={600}
            height={600}
            style={{ width: "100%", height: "auto", borderRadius: 16, objectFit: "cover" }}
            priority
          />
          {/* Right - Text */}
          <div>
            <div className="fu fu1" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
              <div className="live-dot" />
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink2)", letterSpacing: .5 }}>
                We reply within 24 hours · Mon – Fri
              </span>
            </div>
            <h1 className="fu fu2" style={{
              fontFamily: "var(--font-headline)",
              fontSize: "clamp(56px, 8vw, 104px)",
              fontWeight: 400, lineHeight: .95, letterSpacing: 1, marginBottom: 28,
            }}>
              GET IN<br /><span style={{ color: "var(--accent)" }}>TOUCH.</span>
            </h1>
            <p className="fu fu3" style={{ fontSize: 17, color: "var(--ink2)", lineHeight: 1.75, fontWeight: 300, maxWidth: 500 }}>
              Whether you're a fan, partner, journalist, or just curious — we're always happy to connect. Find us on your favourite platform or send us a message directly.
            </p>
          </div>
        </div>
      </section>

      {/* SOCIALS */}
      <section style={{ padding: "72px 40px 0", background: "var(--white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)", marginBottom: 10 }}>Social Media</p>
              <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 400, letterSpacing: 1, lineHeight: 1 }}>
                FIND US <span style={{ color: "var(--accent)" }}>ONLINE.</span>
              </h2>
            </div>
            <p style={{ fontSize: 14, color: "var(--ink3)", fontWeight: 300, maxWidth: 300, lineHeight: 1.6 }}>
              Follow along for live scores, fan moments, and platform updates.
            </p>
          </div>

          <div className="social-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {socials.map((s, i) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="social-link fu fu2">
                <div style={{ width: 42, height: 42, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", lineHeight: 1.2, marginBottom: 2 }}>{s.name}</p>
                  <p style={{ fontSize: 12, color: "var(--ink3)", marginBottom: 2 }}>{s.handle}</p>
                  <p style={{ fontSize: 11, color: "var(--ink3)", fontStyle: "italic" }}>{s.desc}</p>
                </div>
                <ArrowIcon />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section style={{ padding: "72px 40px 96px", background: "var(--white)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 72, alignItems: "start" }} className="contact-grid">
          {/* Left - Text */}
          <div className="fu fu2">
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)", marginBottom: 20 }}>Direct Contact</p>
            <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(34px, 4vw, 52px)", fontWeight: 400, letterSpacing: 1, lineHeight: 1, marginBottom: 20 }}>
              SEND US A<br /><span style={{ color: "var(--accent)" }}>MESSAGE.</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--ink2)", lineHeight: 1.8, fontWeight: 300, marginBottom: 36 }}>
              Have a proposal, press enquiry, partnership opportunity, or just want to say hi? Fill out the form and we'll get back to you within 24 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="email-card" style={{ textDecoration: "none" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {s.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: "var(--ink3)", letterSpacing: 1, marginBottom: 2 }}>{s.name}</p>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "var(--accent)" }}>{s.handle}</p>
                  </div>
                  <ArrowIcon />
                </a>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <Image 
            src="/contact-hero.jpg" 
            alt="Contact Hero" 
            width={600} 
            height={800}
            style={{ width: "100%", height: "auto", borderRadius: 12, objectFit: "cover" }}
            priority 
          />
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ borderTop: "1.5px solid var(--rule)", padding: "48px 40px", background: "var(--canvas)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <p style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 400, letterSpacing: 1, lineHeight: 1.1, marginBottom: 6 }}>
              NOT READY TO CHAT?{" "}
              <span style={{ color: "var(--accent)" }}>JOIN THE WAITLIST.</span>
            </p>
            <p style={{ fontSize: 14, color: "var(--ink3)", fontWeight: 300 }}>Be first when Sportcliq goes live in your city.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
           <button
  onClick={() => setWaitlistOpen(true)}
  style={{
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "#111110", color: "#ffffff",
    fontFamily: "var(--font-headline)", fontSize: 13, letterSpacing: 1,
    padding: "14px 28px", borderRadius: 8, cursor: "pointer",
    border: "1.5px solid #111110", whiteSpace: "nowrap",
    transition: "background .2s, color .2s",
  }}
>
  JOIN WAITLIST
</button>
            
            <a
              href="https://t.me/sportcliq"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "var(--ink)", color: "#fff",
                fontFamily: "var(--font-headline)", fontSize: 13, letterSpacing: 1,
                padding: "14px 28px", borderRadius: 8, textDecoration: "none",
                transition: "background .2s", whiteSpace: "nowrap",
              }}
            >
              JOIN THE SQUAD
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* WAITLIST MODAL */}
      {waitlistOpen && <WaitlistModal onClose={() => setWaitlistOpen(false)} />}

    </div>
  );
}