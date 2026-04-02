"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import WaitlistModal from "./WaitlistModal";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className="navbar-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
          background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #E2E9FF" : "1px solid transparent",
        }}
      >
        <div className="navbar-inner">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <div className="navbar-logo-icon">
              <Image src="/logo-white.png" alt="Logo" width={16} height={16} />
            </div>
            <span className="navbar-logo-text">
              SPORT<span style={{ color: "#0057FF" }}>CLIQ</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="navbar-links">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={`navbar-link ${path === l.href ? "active" : ""}`}>
                {l.label}
                {path === l.href && <span className="navbar-link-underline" />}
              </Link>
            ))}
          </nav>

          {/* CTA — desktop */}
          <div className="navbar-cta">
            <button className="btn-outline" onClick={() => setShowWaitlist(true)}>
              Join Waitlist
            </button>
            <a
              href="https://t.me/sportcliq"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Join the Cliq On Telegram
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="hamburger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="hamburger-bar"
                style={{
                  transform:
                    open && i === 0 ? "rotate(45deg) translateY(7px)" :
                    open && i === 2 ? "rotate(-45deg) translateY(-7px)" : "none",
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`mobile-drawer ${open ? "open" : ""}`}>
          <div className="mobile-drawer-inner">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`mobile-link ${path === l.href ? "active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
            <div className="mobile-cta">
              <button
                className="btn-outline full-width"
                onClick={() => { setOpen(false); setShowWaitlist(true); }}
              >
                Join Waitlist
              </button>
              <a
                href="https://t.me/sportcliq"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-primary full-width"
              >
                Join the Cliq On Telegram
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {open && (
        <div
          className="mobile-overlay"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} />}

      <style>{`
        /* ── Base ───────────────────────────── */
        .navbar-header {
          height: 72px;
        }

        .navbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── Logo ───────────────────────────── */
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .navbar-logo-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: #0057FF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .navbar-logo-text {
          font-family: 'Anton', sans-serif;
          font-size: 20px;
          letter-spacing: 1px;
          color: #0D1520;
        }

        /* ── Desktop nav ────────────────────── */
        .navbar-links {
          display: flex;
          gap: 36px;
          align-items: center;
        }

        .navbar-link {
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          color: #4A5E78;
          transition: color 0.2s;
          position: relative;
          padding-bottom: 4px;
        }

        .navbar-link.active {
          color: #0057FF;
        }

        .navbar-link-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #0057FF;
          border-radius: 2px;
        }

        /* ── CTA buttons ────────────────────── */
        .navbar-cta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-outline {
  background: transparent;
  color: #111110;
  font-family: 'Anton', sans-serif;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 1px;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1.5px solid #E5E3DE;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.btn-outline:hover {
  border-color: #8A8880;
  background: #F8F7F4;
}

        .btn-primary {
  background: #111110;
  color: #fff;
  font-family: 'Anton', sans-serif;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 1px;
  padding: 10px 22px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  white-space: nowrap;
  display: inline-block;
  text-decoration: none;
}
.btn-primary:hover {
  background: #1447E6;
  transform: translateY(-1px);
}

        .btn-outline.full-width,
        .btn-primary.full-width {
          width: 100%;
          text-align: center;
          padding: 13px 0;
          font-size: 14px;
          display: block;
          box-sizing: border-box;
        }

        /* ── Hamburger ──────────────────────── */
        .hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          flex-direction: column;
          gap: 5px;
          flex-shrink: 0;
        }

        .hamburger-bar {
          display: block;
          width: 24px;
          height: 2px;
          background: #0D1520;
          border-radius: 2px;
          transition: all 0.3s;
        }

        /* ── Mobile drawer ──────────────────── */
        .mobile-drawer {
          display: none;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          background: #fff;
          border-top: 1px solid transparent;
        }

        .mobile-drawer.open {
          max-height: 400px;
          border-top-color: #E2E9FF;
        }

        .mobile-drawer-inner {
          padding: 16px 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-link {
          font-size: 15px;
          font-weight: 500;
          color: #4A5E78;
          text-decoration: none;
          padding: 10px 0;
          border-bottom: 1px solid #F0F4FF;
          transition: color 0.2s;
        }

        .mobile-link:last-of-type {
          border-bottom: none;
        }

        .mobile-link.active {
          color: #0057FF;
        }

        .mobile-cta {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 12px;
        }

        /* ── Overlay ────────────────────────── */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 40;
        }

        /* ── Responsive breakpoints ─────────── */
        @media (max-width: 767px) {
          .navbar-header {
            height: 64px;
          }

          .navbar-inner {
            height: 64px;
            padding: 0 16px;
          }

          .navbar-logo-text {
            font-size: 18px;
          }

          .navbar-links,
          .navbar-cta {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .mobile-drawer {
            display: block;
          }
        }

        @media (min-width: 768px) {
          .mobile-drawer,
          .hamburger {
            display: none !important;
          }
        }

        /* ── Small phones ───────────────────── */
        @media (max-width: 380px) {
          .navbar-inner {
            padding: 0 12px;
          }

          .navbar-logo-text {
            font-size: 16px;
          }

          .navbar-logo-icon {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </>
  );
}