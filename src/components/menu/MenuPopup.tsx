import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import menu1 from '../../assets/images/menu/menu-image-1.jpeg';
import menu2 from '../../assets/images/menu/menu-image-2.jpeg';

interface MenuPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const slides = [menu1, menu2];

export default function MenuPopup({ isOpen, onClose }: MenuPopupProps) {
  const [current, setCurrent] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setCurrent(0);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);
  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);

  // Touch swipe
  const handleTouchStart = (x: number) => setDragStartX(x);
  const handleTouchEnd = (x: number) => {
    if (dragStartX === null) return;
    const diff = dragStartX - x;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    setDragStartX(null);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.82)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(12px, 3vw, 32px)',
      }}
      onClick={onClose}
    >
      {/* Inner container — stops click propagation */}
      <div
        style={{
          position: 'relative',
          maxWidth: '900px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => handleTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0].clientX)}
      >
        {/* ── Close button ── */}
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{
            position: 'absolute',
            top: '-14px',
            right: '-14px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#f83d8e'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#ffffff'; (e.currentTarget as HTMLButtonElement).style.color = '#000'; }}
        >
          <X size={18} />
        </button>

        {/* ── Slide image ── */}
        <div
          style={{
            width: '100%',
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            lineHeight: 0,
          }}
        >
          <img
            src={slides[current]}
            alt={`Menu page ${current + 1}`}
            key={current}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '80vh',
              objectFit: 'contain',
              display: 'block',
              animation: 'menuFadeIn 0.28s ease',
            }}
          />
        </div>

        {/* ── Arrows — outside the image ── */}
        {slides.length > 1 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '12px',
          }}>
            <button
              onClick={prev}
              aria-label="Previous slide"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                transition: 'background 0.2s, color 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#f83d8e'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.9)'; (e.currentTarget as HTMLButtonElement).style.color = '#000'; }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Slide counter — center */}
            <div style={{
              fontFamily: "'Archivo', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.75)',
              letterSpacing: '0.5px',
            }}>
              {current + 1} / {slides.length}
            </div>

            <button
              onClick={next}
              aria-label="Next slide"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                transition: 'background 0.2s, color 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#f83d8e'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.9)'; (e.currentTarget as HTMLButtonElement).style.color = '#000'; }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

      </div>

      {/* Animation */}
      <style>{`
        @keyframes menuFadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* Mobile arrow reposition */
        @media (max-width: 500px) {
          .menu-arrow-left  { left: 4px !important; }
          .menu-arrow-right { right: 4px !important; }
        }
      `}</style>
    </div>
  );
}
