import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import reliveImage from '../../assets/images/about/relive-image.png';
import reliveCircle from '../../assets/images/about/relive-circle.png';
import reliveTriangle from '../../assets/images/about/relive-triangle.png';

interface AboutSectionProps {
  onExploreMenuClick: () => void;
}

export default function AboutSection({ onExploreMenuClick }: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        backgroundColor: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        padding: '40px 0 0',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          width: 'calc(100% - 40px)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 3,
        }}
      >
        <div className="abt-grid">

          {/* ════ LEFT: Image Column ════ */}
          <div className={`abt-img-col ${visible ? 'abt-fadein-l' : 'abt-hide'}`}>

            {/* Soft pale circle behind girl */}
            <div className="abt-circle-bg">
              <img src={reliveCircle} alt="" aria-hidden="true"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Girl image */}
            <img
              src={reliveImage}
              alt="Girl enjoying ice cream"
              className="abt-girl-img"
            />

            {/* Small circle — left side lower, reference exact */}
            <svg aria-hidden="true" viewBox="0 0 60 60" className="abt-small-circle" style={{overflow:'visible'}}>
              {/* Solid pink filled circle */}
              <circle cx="30" cy="32" r="14" fill="#f83d8e"/>
              {/* Purple outlined circle — offset top-right, partially outside */}
              <circle cx="42" cy="22" r="13" fill="none" stroke="#9333ea" strokeWidth="2.2"/>
            </svg>

          </div>

          {/* ════ RIGHT: Text Column ════ */}
          <div className={`abt-text-col ${visible ? 'abt-fadein-r' : 'abt-hide'}`}>

            {/* Pink dot grid — above heading */}
            <div className="abt-dots" aria-hidden="true">
              {Array.from({ length: 15 }).map((_, i) => (
                <span key={i} className="abt-dot" />
              ))}
            </div>

            {/* Heading block */}
            <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
              <h2 className="abt-heading">
                Relive the Sweet
                <br />
                Memories of Classic
                <br />
                <em style={{ color: '#f83d8e', fontStyle: 'normal' }}>Ice Creams</em>
              </h2>

              {/* Triangle — right of heading */}
              <img
                src={reliveTriangle}
                alt=""
                aria-hidden="true"
                className="abt-triangle"
              />
            </div>

            {/* Paragraph */}
            <p className="abt-para">
              From rich chocolate fudge to creamy vanilla sundaes,
              discover our menu of classic ice cream creations.
            </p>

            {/* Button */}
            <button className="abt-btn" onClick={onExploreMenuClick}>
              Explore Our Menu
              <ArrowRight size={14} />
            </button>

          </div>
        </div>
      </div>

      {/* Bottom-right large partial circle — reference exact */}
      <svg
        aria-hidden="true"
        viewBox="0 0 180 180"
        style={{
          position: 'absolute',
          bottom: '-50px',
          right: '-30px',
          width: 'clamp(100px, 12vw, 155px)',
          height: 'clamp(100px, 12vw, 155px)',
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'visible',
        }}
      >
        {/* Large pink filled half-circle */}
        <path
          d="M 90,180 A 90,90 0 0,1 180,90"
          fill="none"
          stroke="none"
        />
        <circle cx="145" cy="145" r="90" fill="#f83d8e" opacity="0.22" />
        {/* Purple outline arc — smaller, offset */}
        <circle cx="125" cy="158" r="62" fill="none" stroke="#9333ea" strokeWidth="2" opacity="0.35" />
      </svg>

      {/* ── ALL SCOPED STYLES ── */}
      <style>{`

        /* Grid */
        .abt-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: flex-end;
          gap: clamp(20px, 5vw, 70px);
        }

        /* Image column */
        .abt-img-col {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          min-height: clamp(280px, 35vw, 420px);
        }
        .abt-circle-bg {
          position: absolute;
          width: 72%;
          max-width: 310px;
          aspect-ratio: 1;
          left: 50%;
          bottom: 0;
          transform: translateX(-48%);
          z-index: 0;
          pointer-events: none;
        }
        .abt-girl-img {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: clamp(220px, 30vw, 390px);
          height: auto;
          object-fit: contain;
          display: block;
          margin-bottom: 0;
        }
        .abt-small-circle {
          position: absolute;
          left: clamp(-4px, 1vw, 10px);
          bottom: 20%;
          width: clamp(36px, 4vw, 56px);
          height: clamp(36px, 4vw, 56px);
          z-index: 4;
          pointer-events: none;
          overflow: visible;
        }

        /* Text column */
        .abt-text-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          padding-bottom: 40px;
        }

        /* Dot grid */
        .abt-dots {
          display: grid;
          grid-template-columns: repeat(5, 8px);
          gap: 5px;
          width: fit-content;
          margin-bottom: 4px;
        }
        .abt-dot {
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f83d8e;
          opacity: 0.65;
        }

        /* Heading */
        .abt-heading {
          font-family: 'Berkshire Swash', serif;
          font-size: clamp(24px, 3vw, 46px);
          line-height: 1.3;
          font-weight: 400;
          color: #0f0200;
          margin: 0;
        }

        /* Triangle */
        .abt-triangle {
          position: absolute;
          right: clamp(-10px, -1vw, 0px);
          top: 56%;
          width: clamp(26px, 2.8vw, 44px);
          opacity: 0.9;
          pointer-events: none;
        }

        /* Para */
        .abt-para {
          font-family: 'Archivo', sans-serif;
          font-size: clamp(13px, 1vw, 16px);
          line-height: 1.75;
          color: #646464;
          margin: 0;
          max-width: 340px;
        }

        /* Button */
        .abt-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 26px;
          background: #f83d8e;
          color: #fff;
          font-family: 'Archivo', sans-serif;
          font-size: 14px;
          font-weight: 600;
          border-radius: 30px;
          border: none;
          cursor: pointer;
          box-shadow: 0 3px 18px rgb(248 61 142 / 38%);
          transition: background 0.3s, transform 0.2s;
          width: fit-content;
        }
        .abt-btn:hover {
          background: #0f0200;
          transform: scale(1.02);
        }

        /* Animations */
        .abt-hide    { opacity: 0; }
        .abt-fadein-l { animation: abtFadeL 0.7s ease forwards; }
        .abt-fadein-r { animation: abtFadeR 0.7s ease 0.12s forwards; }
        @keyframes abtFadeL {
          from { opacity:0; transform: translateX(-26px); }
          to   { opacity:1; transform: translateX(0); }
        }
        @keyframes abtFadeR {
          from { opacity:0; transform: translateX(26px); }
          to   { opacity:1; transform: translateX(0); }
        }

        /* ── TABLET ── */
        @media (max-width: 1024px) {
          .abt-grid { gap: 20px; }
          .abt-girl-img { max-width: 300px; }
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .abt-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            align-items: flex-start;
          }
          .abt-img-col  { order: 1; min-height: 240px; align-items: center; }
          .abt-text-col { order: 2; align-items: center; text-align: center; padding-bottom: 32px; }
          .abt-para     { margin: 0 auto; }
          .abt-dots     { margin: 0 auto 4px; }
          .abt-triangle { right: -8px; }
          .abt-btn      { align-self: center; }
        }

        /* ── SMALL MOBILE ── */
        @media (max-width: 400px) {
          .abt-girl-img { max-width: 240px; }
          .abt-heading  { font-size: 22px; }
        }
      `}</style>
    </section>
  );
}
