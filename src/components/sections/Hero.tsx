import { ArrowRight } from 'lucide-react';
import bannerImage from '../../assets/images/hero/banner-image.png';
import bannerLeftTop from '../../assets/images/hero/banner-lefttopimage.png';

interface HeroProps {
  homeVariant: number;
  onCtaClick: () => void;
  onViewMenuClick: () => void;
}

export default function Hero({ onCtaClick, onViewMenuClick }: HeroProps) {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: '60px',
        paddingBottom: '0',
        overflow: 'hidden',
      }}
    >
      {/* Faded left-top decoration — hidden on tablet/mobile via CSS */}
      <div className="hero-left-deco">
        <img src={bannerLeftTop} alt="" style={{ width: '100%', height: 'auto' }} />
      </div>

      {/* Main grid */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="hero-grid">

          {/* LEFT: Text */}
          <div className="hero-text">
            {/* Welcome line */}
            <div className="hero-welcome">
              <span style={{ display: 'inline-block', width: '40px', height: '2px', background: '#683292', flexShrink: 0 }} />
              <span style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(16px,2vw,22px)', fontWeight: 400, color: '#3a3a3a', lineHeight: 1.3 }}>
                Welcome to The
              </span>
            </div>

            {/* H1 */}
            <h1 className="hero-h1">
              Classic <span style={{ color: '#e53e3e' }}>Ice</span>
              <br />
              <span style={{ color: '#e53e3e' }}>Cream</span> Parlor
            </h1>

            {/* Description */}
            <p className="hero-para">
              Savor the taste of traditional ice cream made with love and quality ingredients.
            </p>

            {/* Buttons row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'inherit' }}>
              {/* CTA Button */}
              <button
                onClick={onCtaClick}
                className="hero-btn"
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.9'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
              >
                Browse Our Classic Flavors
                <ArrowRight size={16} />
              </button>

              {/* View Full Menu Button */}
              <button
                onClick={onViewMenuClick}
                className="hero-btn hero-btn-menu"
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.9'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
              >
                View Full Menu
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* RIGHT: Ice cream image */}
          <div className="hero-img-col">
            {/* Glow circle */}
            <div className="hero-glow" />

            <img
              src={bannerImage}
              alt="Classic Ice Cream"
              className="hero-cone-img"
            />
          </div>

        </div>
      </div>

      {/* Bottom wave */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          width: '100%',
          lineHeight: 0,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: 'clamp(60px, 8vw, 100px)' }}
        >
          <path
            d="M0,40 C80,70 160,15 280,45 C400,75 500,10 630,42
               C760,74 860,12 990,44 C1120,76 1220,14 1340,46
               C1380,56 1415,42 1440,48 L1440,80 L0,80 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* ── ALL HERO RESPONSIVE STYLES ── */}
      <style>{`

        /* Left deco — visible only on desktop */
        .hero-left-deco {
          position: absolute;
          top: 0;
          left: 0;
          width: 180px;
          opacity: 0.18;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        /* Grid */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: flex-end;
          gap: 0;
        }

        /* Text col */
        .hero-text {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-bottom: 80px;
          padding-top: 40px;
        }
        .hero-welcome {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .hero-h1 {
          font-family: 'Berkshire Swash', serif;
          font-size: clamp(38px, 6vw, 88px);
          line-height: 1.05;
          font-weight: 400;
          color: #0f0200;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .hero-para {
          font-family: 'Archivo', sans-serif;
          font-size: clamp(14px, 1.2vw, 18px);
          line-height: 1.6;
          font-weight: 400;
          color: #646464;
          max-width: 420px;
          margin: 0;
        }
        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #683292, #9333ea);
          color: #fff;
          font-family: 'Archivo', sans-serif;
          font-size: clamp(13px, 1.1vw, 16px);
          font-weight: 600;
          padding: 13px 28px;
          border-radius: 30px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(104,50,146,0.35);
          transition: opacity 0.2s, transform 0.2s;
          white-space: nowrap;
        }
        .hero-btn-menu {
          background: linear-gradient(135deg, #f83d8e, #c026d3);
          box-shadow: 0 4px 20px rgba(248,61,142,0.35);
        }

        /* Image col */
        .hero-img-col {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          position: relative;
        }
        .hero-glow {
          position: absolute;
          bottom: 0;
          right: -20px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(248,61,142,0.12) 0%, rgba(243,232,255,0.4) 55%, transparent 75%);
          pointer-events: none;
          z-index: 0;
        }
        .hero-cone-img {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 560px;
          height: auto;
          object-fit: contain;
          object-position: bottom;
          display: block;
        }

        /* ── TABLET: 768px – 1024px ── */
        @media (max-width: 1024px) {
          .hero-left-deco { display: none; }
          .hero-grid { gap: 0; }
          .hero-h1 { font-size: clamp(34px, 5vw, 60px); }
          .hero-text { padding-bottom: 60px; padding-top: 30px; gap: 16px; }
          .hero-cone-img { max-width: 420px; }
          .hero-glow { width: 360px; height: 360px; }
        }

        /* ── MOBILE: max 768px ── */
        @media (max-width: 768px) {
          .hero-left-deco { display: none; }
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-text {
            text-align: center;
            padding-bottom: 16px;
            padding-top: 28px;
            gap: 14px;
            order: 1;
          }
          .hero-welcome { justify-content: center; }
          .hero-para { margin: 0 auto; }
          .hero-h1 { font-size: clamp(32px, 8vw, 52px); }
          .hero-img-col {
            justify-content: center;
            order: 2;
          }
          .hero-cone-img {
            max-width: min(360px, 90vw);
          }
          .hero-glow {
            width: 300px;
            height: 300px;
            right: 50%;
            transform: translateX(50%);
          }
          .hero-btn { font-size: 13px; padding: 12px 22px; }
        }

        /* ── SMALL MOBILE: max 430px ── */
        @media (max-width: 430px) {
          .hero-h1 { font-size: clamp(28px, 8vw, 40px); }
          .hero-cone-img { max-width: min(300px, 92vw); }
          .hero-text { padding-top: 20px; gap: 12px; }
          .hero-btn { font-size: 12px; padding: 11px 18px; }
        }

        /* ── TINY: max 320px ── */
        @media (max-width: 320px) {
          .hero-h1 { font-size: 26px; }
          .hero-btn { font-size: 11px; padding: 10px 16px; }
          .hero-cone-img { max-width: 260px; }
        }
      `}</style>

    </section>
  );
}
