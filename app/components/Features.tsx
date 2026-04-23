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
    <section className="features">
      <div className="features-inner">
        <div className="features-header">
          <div>
            <p className="features-eyebrow">Platform Features</p>
            <h2 className="features-h2">
              BUILT FOR <br />
              <span style={{ color: "var(--accent)" }}>REAL FANS.</span>
            </h2>
          </div>
          <p className="features-sub">
            Everything you need to live, breathe, and share sports - in one
            clean, unified experience.
          </p>
        </div>

        <div className="feat-grid">
          {/* Large card 1 */}
          <div className="feat-card feat-card--large">
            <img
              className="feat-img"
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80"
              alt="Fan feed"
            />
            <div className="feat-overlay" />
            <div className="feat-content">
              <div className="feat-live-badge">
                <div className="live-dot" />
                <span className="feat-badge-text">Real-time</span>
              </div>
              <h3 className="feat-title feat-title--lg">REAL-TIME FAN FEED</h3>
              <p className="feat-desc">
                Live match conversations as they unfold. React and vibe with
                thousands of fans simultaneously.
              </p>
            </div>
          </div>

          {/* Large card 2 */}
          <div className="feat-card feat-card--large">
            <img
              className="feat-img"
              src="/cl.jpg"
              alt="Fan prizes"
            />
            <div className="feat-overlay" />
            <div className="feat-content">
              <p className="feat-label">Prizes</p>
              <h3 className="feat-title feat-title--lg">PARTICIPATE TO WIN</h3>
              <p className="feat-desc">
                Join daily, weekly, or monthly trivia to stand a chance to win
                amazing prizes.
              </p>
            </div>
          </div>

          {/* Small cards */}
          {smallCards.map((f, i) => (
            <div key={i} className="feat-card feat-card--small">
              <img
                className="feat-img"
                src={f.img}
                alt={f.title}
              />
              <div className="feat-overlay feat-overlay--sm" />
              <div className="feat-content feat-content--sm">
                <p className="feat-label">{f.label}</p>
                <h3 className="feat-title feat-title--sm">{f.title}</h3>
                <p className="feat-desc feat-desc--sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Grid layout ── */
        .feat-grid {
          display: grid;
          gap: 10px;
          grid-template-columns: 1fr 1fr;
        }

        /* ── Card base ── */
        .feat-card {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
        }

        .feat-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ── Overlays ── */
        .feat-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 55%);
        }
        .feat-overlay--sm {
          background: linear-gradient(to top, rgba(0,0,0,.75) 0%, transparent 60%);
        }

        /* ── Content blocks ── */
        .feat-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 14px;
        }
        .feat-content--sm {
          padding: 12px;
        }

        /* ── Live badge ── */
        .feat-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 6px;
        }
        .feat-badge-text {
          font-size: 10px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.5px;
        }

        /* ── Labels ── */
        .feat-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,.6);
          margin: 0 0 4px;
        }

        /* ── Titles ── */
        .feat-title {
          font-family: var(--font-headline);
          font-weight: 400;
          color: #fff;
          letter-spacing: 0.8px;
          line-height: 1.1;
          margin: 0 0 5px;
        }
        .feat-title--lg {
          font-size: 16px;
        }
        .feat-title--sm {
          font-size: 13px;
          margin-bottom: 3px;
        }

        /* ── Descriptions ── */
        .feat-desc {
          font-size: 11px;
          color: rgba(255,255,255,.7);
          line-height: 1.45;
          margin: 0;
        }
        .feat-desc--sm {
          font-size: 10px;
          line-height: 1.4;

          /* clamp to 2 lines on mobile so it never overflows */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── Card sizes (mobile) ── */
        .feat-card--large {
          grid-column: span 1;
          height: 210px;
        }
        .feat-card--small {
          grid-column: span 1;
          height: 145px;
        }

        /* ── Desktop (768px+) ── */
        @media (min-width: 768px) {
          .feat-grid {
            gap: 14px;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: 260px 260px;
          }

          .feat-card--large {
            grid-column: span 2;
            grid-row: span 2;
            height: auto;
          }

          .feat-card--small {
            grid-column: span 1;
            grid-row: span 1;
            height: auto;
          }

          .feat-content {
            padding: 28px;
          }
          .feat-content--sm {
            padding: 20px 22px;
          }

          .feat-title--lg {
            font-size: 28px;
            margin-bottom: 8px;
          }
          .feat-title--sm {
            font-size: 18px;
            margin-bottom: 5px;
          }

          .feat-desc {
            font-size: 13px;
            line-height: 1.6;
          }
          .feat-desc--sm {
            font-size: 12px;
            line-height: 1.5;
            -webkit-line-clamp: unset;
            overflow: visible;
          }

          .feat-label {
            font-size: 10px;
            margin-bottom: 5px;
          }

          .feat-live-badge {
            margin-bottom: 10px;
          }
          .feat-badge-text {
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;