"use client";

import Image from "next/image";

const TelegramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <path d="M17.5 3.5L2.5 9l5 1.5 1.5 5 2.5-3 4 3 2-11z" stroke="#0088cc" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 3l5.5 7L3 17h2l4.5-5.5L14 17h3l-5.8-7.5L17 3h-2l-4 4.8L6 3H3z" fill="#111110" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
    <rect x="3" y="3" width="14" height="14" rx="4" stroke="url(#igF)" strokeWidth="1.5"/>
    <circle cx="10" cy="10" r="3" stroke="url(#igF)" strokeWidth="1.5"/>
    <circle cx="14.2" cy="5.8" r=".9" fill="#E1306C"/>
    <defs>
      <linearGradient id="igF" x1="3" y1="17" x2="17" y2="3" gradientUnits="userSpaceOnUse">
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

const socials = [
  { name: "Telegram",    href: "https://t.me/sportcliq",               icon: <TelegramIcon /> },
  { name: "Twitter / X", href: "https://twitter.com/sportcliq_",       icon: <TwitterIcon /> },
  { name: "Instagram",   href: "https://instagram.com/sportcliq.app_", icon: <InstagramIcon /> },
  { name: "TikTok",      href: "https://tiktok.com/@sportcliq",        icon: <TikTokIcon /> },
];

const cols: Record<string, string[]> = {
  Company: ["About", "Contact"],
  Legal:   ["Privacy Policy", "Terms of Use", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="footer-root">

      {/* ── Main grid ── */}
      <div className="footer-grid">

        {/* Brand col */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <Image src="/logo-white.png" alt="Sportcliq logo" width={18} height={18} />
            </div>
            <span className="footer-logo-text">
              SPORT<span style={{ color: "#0057FF" }}>CLIQ</span>
            </span>
          </div>

          <p className="footer-tagline">
            Real-time fan conversations, personalized feeds, and local event discovery — built for the culture.
          </p>

          <div className="footer-socials">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                className="footer-social-btn"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link cols */}
        <div className="footer-link-cols">
          {Object.entries(cols).map(([heading, links]) => (
            <div key={heading} className="footer-col">
              <p className="footer-col-heading">{heading}</p>
              <div className="footer-col-links">
                {links.map((l) => (
                  <a key={l} href="#" className="footer-col-link">{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copyright">© 2025 Sportcliq. All rights reserved.</p>
          <div className="footer-regions">
            {["🇨🇦",].map((flag) => (
              <span key={flag} className="footer-flag">{flag}</span>
            ))}
            <span className="footer-region-text">Canada</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-root {
          border-top: 1.5px solid var(--rule);
          background: var(--white);
        }

        /* ── Main grid ── */
        .footer-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 56px 40px 48px;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr;
          gap: 48px;
        }

        /* ── Brand ── */
        .footer-brand {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .footer-logo-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: #0057FF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .footer-logo-text {
          font-family: 'Anton', sans-serif;
          font-size: 20px;
          letter-spacing: 1px;
          color: #0D1520;
        }

        .footer-tagline {
          font-size: 13px;
          color: var(--ink3);
          line-height: 1.75;
          margin-bottom: 24px;
          max-width: 240px;
        }

        .footer-socials {
          display: flex;
          gap: 8px;
        }

        .footer-social-btn {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          border: 1.5px solid var(--rule);
          background: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color .2s, transform .2s, box-shadow .2s;
        }

        .footer-social-btn:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(20,71,230,.1);
        }

        /* ── Link cols ── */
        .footer-link-cols {
          display: contents;
        }

        .footer-col-heading {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--ink3);
          margin-bottom: 18px;
        }

        .footer-col-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-col-link {
          font-size: 13px;
          font-weight: 500;
          color: var(--ink2);
          text-decoration: none;
          transition: color .2s;
        }

        .footer-col-link:hover {
          color: var(--accent);
        }

        /* ── Bottom bar ── */
        .footer-bottom {
          border-top: 1.5px solid var(--rule);
          padding: 20px 40px;
        }

        .footer-bottom-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-copyright {
          font-size: 12px;
          color: var(--ink3);
        }

        .footer-regions {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .footer-flag {
          font-size: 16px;
        }

        .footer-region-text {
          font-size: 12px;
          color: var(--ink3);
          margin-left: 6px;
        }

        /* ── Tablet (≤ 768px) ── */
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            padding: 40px 24px 36px;
            gap: 36px;
          }

          .footer-brand {
            grid-column: 1 / -1;
          }

          .footer-tagline {
            max-width: 100%;
          }

          .footer-link-cols {
            display: contents;
          }

          .footer-bottom {
            padding: 16px 24px;
          }
        }

        /* ── Mobile (≤ 480px) ── */
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
            padding: 32px 20px 28px;
            gap: 28px;
          }

          .footer-brand {
            grid-column: 1;
          }

          /* Side-by-side link cols on small mobile */
          .footer-link-cols {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 28px;
            grid-column: 1;
          }

          .footer-bottom {
            padding: 16px 20px;
          }

          .footer-bottom-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .footer-logo-text {
            font-size: 18px;
          }
        }
      `}</style>
    </footer>
  );
}