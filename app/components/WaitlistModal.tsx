"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";

interface WaitlistModalProps {
  onClose: () => void;
}

export default function WaitlistModal({ onClose }: WaitlistModalProps) {
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep]   = useState<"form" | "loading" | "done" | "error">("form");

  const submit = async () => {
    if (!name || !email) return;
    setStep("loading");

    try {
      await emailjs.send(
        "service_t17qb8u",
        "template_q30goci",
        {
          name,
          email,
          title: "Waitlist Signup",
          message: `${name} just joined the Sportcliq Waitlist.`,
          time: new Date().toLocaleString(),
        },
        "TodbFXXSb4MyVBNKS"
      );
      setStep("done");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStep("error");
    }
  };

  return (
    <>
      <style>{`
        .wl-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .wl-modal {
          background: #ffffff;
          border-radius: 16px;
          width: 100%;
          max-width: 460px;
          overflow: hidden;
          position: relative;
        }
        .wl-input {
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          color: #111110;
          background: #ffffff;
          border: 1.5px solid #E5E3DE;
          border-radius: 8px;
          padding: 12px 16px;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        .wl-input:focus { border-color: #1447E6; }
        .wl-input::placeholder { color: #8A8880; }
        .wl-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
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
          text-decoration: none;
        }
        .wl-btn-primary:hover { background: #1447E6; transform: translateY(-1px); }
        .wl-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #111110;
          font-family: 'Anton', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 1px;
          padding: 10px 22px;
          border-radius: 8px;
          border: 1.5px solid #E5E3DE;
          cursor: pointer;
          transition: all 0.2s;
        }
        .wl-btn-outline:hover { border-color: #8A8880; background: #F8F7F4; }
        @keyframes wl-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="wl-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="wl-modal">
          <div style={{ height: 3, background: "linear-gradient(90deg, #1447E6 0%, #FF4D00 100%)" }} />

          <div style={{ padding: "36px 36px 40px" }}>
            {step === "form" && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <p style={{ fontFamily: "'Anton', sans-serif", fontSize: 11, fontWeight: 400, letterSpacing: 2, textTransform: "uppercase", color: "#1447E6" }}>Early Access</p>
                  <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, background: "#F8F7F4", border: "none", display: "flex", alignItems: "center", justifyContent: "center", color: "#8A8880", flexShrink: 0, cursor: "pointer" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                </div>

                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 38, fontWeight: 400, lineHeight: 1.05, marginBottom: 10, letterSpacing: 1, color: "#111110" }}>
                  JOIN THE <span style={{ color: "#1447E6" }}>WAITLIST</span>
                </h2>
                <p style={{ fontSize: 14, color: "#3D3C39", lineHeight: 1.7, marginBottom: 24 }}>
                  Be first when Sportcliq launches across..
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#F8F7F4", borderRadius: 10, marginBottom: 24 }}>
                  <div style={{ display: "flex" }}>
                    {["#1447E6","#FF4D00","#15803D","#7C3AED","#D97706"].map((c, i) => (
                      <div key={i} style={{ width: 24, height: 24, borderRadius: "50%", background: c, border: "2px solid #F8F7F4", marginLeft: i > 0 ? -7 : 0 }} />
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <input className="wl-input" type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} />
                  <input className="wl-input" type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
                  <button className="wl-btn-primary" onClick={submit} style={{ width: "100%", justifyContent: "center", padding: "14px", marginTop: 4 }}>
                    Claim My Spot
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  </button>
                </div>
                <p style={{ fontSize: 11, color: "#8A8880", textAlign: "center", marginTop: 14 }}>No spam. Unsubscribe any time.</p>
              </>
            )}

            {step === "loading" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0" }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ animation: "wl-spin 1s linear infinite", marginBottom: 20 }}>
                  <circle cx="16" cy="16" r="12" stroke="#E5E3DE" strokeWidth="3"/>
                  <path d="M16 4a12 12 0 0112 12" stroke="#1447E6" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                <p style={{ fontFamily: "'Anton', sans-serif", fontSize: 22, fontWeight: 400, letterSpacing: 1, color: "#111110" }}>SECURING YOUR SPOT…</p>
              </div>
            )}

            {step === "done" && (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid #15803D", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M4 13l7 7L22 7" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 36, fontWeight: 400, marginBottom: 10, letterSpacing: 1, color: "#111110" }}>
                  YOU'RE <span style={{ color: "#15803D" }}>IN!</span>
                </h2>
                <p style={{ fontSize: 14, color: "#3D3C39", lineHeight: 1.7, marginBottom: 28, maxWidth: 300, margin: "0 auto 28px" }}>
                  Welcome to Sportcliq. We'll let you know the moment early access opens.
                </p>
                <button className="wl-btn-outline" onClick={onClose}>Back to site</button>
              </div>
            )}

            {step === "error" && (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p style={{ fontSize: 16, color: "#E24B4A", marginBottom: 16 }}>Something went wrong. Please try again.</p>
                <button className="wl-btn-outline" onClick={() => setStep("form")}>Try Again</button>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </>
  );
}