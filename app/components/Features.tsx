const FeaturesSection = () => {
  const smallCards = [
    {
      img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&auto=format&fit=crop&q=80",
      label: "Discovery",
      title: "EVENT DISCOVERY",
      desc: "Find local sports events and watch parties near you.",
    },
    {
      img: "/af.jpeg",
      label: "Personalized",
      title: "YOUR FEED",
      desc: "Curated to the teams and sports you're most passionate about.",
    },
    {
      img: "/team.jpeg",
      label: "Community",
      title: "CREATE A CLIQ",
      desc: "Create a Cliq, Join a Cliq and Find Your Cliq!",
    },
    {
      img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop&q=80",
      label: "Global",
      title: "CROSS-BORDER UNITY",
      desc: "Sports has no borders. So Join A Cliq!",
    },
  ];

  return (
    <section style={{ padding: "96px 40px", background: "var(--white)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: 48, paddingBottom: 36, borderBottom: "1.5px solid var(--rule)",
          flexWrap: "wrap", gap: 20,
        }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--ink3)", marginBottom: 14 }}>
              Platform Features
            </p>
            <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 400, letterSpacing: 1, lineHeight: 1 }}>
              BUILT FOR <br /><span style={{ color: "var(--accent)" }}>REAL FANS.</span>
            </h2>
          </div>
          <p style={{ fontSize: 15, color: "var(--ink2)", fontWeight: 300, maxWidth: 360, lineHeight: 1.75 }}>
            Everything you need to live, breathe, and share sports - in one clean, unified experience.
          </p>
        </div>

        {/* ── Desktop grid ── */}
        <div className="feat-grid-desktop">

          {/* Large card 1 */}
          <div className="feat-card-large">
            <img
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80"
              alt="Fan feed"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 55%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 28 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <div className="live-dot" />
                <span style={{ fontSize: 11, fontWeight: 600, color: "#fff", letterSpacing: 0.5 }}>Real-time</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-headline)", fontSize: 28, fontWeight: 400, color: "#fff", letterSpacing: 1, marginBottom: 8, lineHeight: 1.1 }}>
                REAL-TIME FAN FEED
              </h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.72)", lineHeight: 1.6, maxWidth: 280 }}>
                Live match conversations as they unfold. React and vibe with thousands of fans simultaneously.
              </p>
            </div>
          </div>

          {/* Large card 2 */}
          <div className="feat-card-large">
            <img
              src="/cl.jpg"
              alt="Fan prizes"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 50%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 28px" }}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 5 }}>Prizes</p>
              <h3 style={{ fontFamily: "var(--font-headline)", fontSize: 28, fontWeight: 400, color: "#fff", letterSpacing: 1, marginBottom: 8 }}>
                PARTICIPATE TO WIN
              </h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.65)", lineHeight: 1.6 }}>
                Join daily, weekly, or monthly trivia to stand a chance to win amazing prizes.
              </p>
            </div>
          </div>

          {/* 4 Small cards */}
          {smallCards.map((f, i) => (
            <div key={i} className="feat-card-small">
              <img
                src={f.img}
                alt={f.title}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.75) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 22px" }}>
                <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 5 }}>{f.label}</p>
                <h3 style={{ fontFamily: "var(--font-headline)", fontSize: 18, fontWeight: 400, color: "#fff", letterSpacing: 1, marginBottom: 5 }}>{f.title}</h3>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.65)", lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            </div>
          ))}

        </div>
      </div>

      <style>{`
        /* ── Desktop: 4-col, 2-row ── */
        .feat-grid-desktop {
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 320px 220px;
        }

        /* Large cards: span 2 cols, sit in row 1 only */
        .feat-card-large {
          grid-column: span 2;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
        }

        /* Small cards: span 1 col, auto-flow into row 2 */
        .feat-card-small {
          grid-column: span 1;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
        }

        /* ── Mobile: simple 2-col stack ── */
        @media (max-width: 768px) {
          .feat-grid-desktop {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: none;
          }

          .feat-card-large {
            grid-column: span 1;
            height: 210px;
          }

          .feat-card-small {
            height: 145px;
          }

          /* Shrink text on mobile */
          .feat-card-large h3,
          .feat-card-small h3 {
            font-size: 14px !important;
            margin-bottom: 3px !important;
          }

          .feat-card-large p:last-child,
          .feat-card-small p:last-child {
            font-size: 10px !important;
            line-height: 1.4 !important;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .feat-card-large > div:last-child,
          .feat-card-small > div:last-child {
            padding: 12px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;