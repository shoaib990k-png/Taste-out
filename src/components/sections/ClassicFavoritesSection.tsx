import { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import classicLeft from '../../assets/images/products/classic-leftimage.png';
import classicRight from '../../assets/images/products/classic-rightimage.png';

interface ClassicFavoritesSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ClassicFavoritesSection({
  products,
  onAddToCart,
  onSelectProduct,
}: ClassicFavoritesSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [paused, setPaused] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = products.length;

  // Responsive visible count
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 600) setVisibleCount(1);
      else if (w < 900) setVisibleCount(2);
      else if (w < 1200) setVisibleCount(3);
      else setVisibleCount(4);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const next = useCallback(() => {
    setActiveIdx((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIdx((i) => (i - 1 + total) % total);
  }, [total]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    autoRef.current = setInterval(next, 3200);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [next, paused]);

  const pauseTemporarily = () => {
    setPaused(true);
    setTimeout(() => setPaused(false), 3000);
  };

  const goTo = (idx: number) => {
    setActiveIdx(idx);
    pauseTemporarily();
  };

  // Drag/swipe handlers
  const onDragStart = (x: number) => { dragStartX.current = x; pauseTemporarily(); };
  const onDragEnd = (x: number) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - x;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    dragStartX.current = null;
  };

  // Build the visible product cards (circular)
  const visibleProducts = Array.from({ length: visibleCount }, (_, i) =>
    products[(activeIdx + i) % total]
  );

  return (
    <section
      id="favorites"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(36px, 5vw, 64px) 0',
        background: 'linear-gradient(140deg, #efd7ef 0%, #f5f9fc 40%, #f8eae1 70%, #eaf8f9 100%)',
      }}
    >
      {/* ── Left decorative image ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-30px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(90px, 13vw, 190px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
        className="cf-deco-hide-sm"
      >
        <img src={classicLeft} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>

      {/* ── Right decorative image ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-20px',
          bottom: 0,
          width: 'clamp(90px, 13vw, 190px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
        className="cf-deco-hide-sm"
      >
        <img src={classicRight} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>

      {/* ── Content ── */}
      <div
        style={{
          maxWidth: '860px',
          width: 'calc(100% - 40px)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 3vw, 32px)' }}>
          <h2
            style={{
              fontFamily: "'Berkshire Swash', serif",
              fontSize: 'clamp(24px, 3.5vw, 42px)',
              fontWeight: 400,
              color: '#0f0200',
              margin: '0 0 8px',
              lineHeight: 1.2,
            }}
          >
            Our <em style={{ color: '#e53e3e', fontStyle: 'normal' }}>Classic</em> Favorites
          </h2>
          <p
            style={{
              fontFamily: "'Archivo', sans-serif",
              fontSize: 'clamp(12px, 1vw, 14px)',
              color: '#646464',
              margin: 0,
            }}
          >
            Check out our top products that our customers love.
          </p>
        </div>

        {/* Cards track */}
        <div
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseUp={(e) => onDragEnd(e.clientX)}
          onMouseLeave={() => { dragStartX.current = null; }}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${visibleCount}, 1fr)`,
            gap: '14px',
            userSelect: 'none',
          }}
        >
          {visibleProducts.map((product, i) => (
            <div
              key={`${activeIdx}-${i}`}
              onClick={() => onSelectProduct(product)}
              style={{
                background: '#ffffff',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 2px 14px rgba(0,0,0,0.07)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                animation: 'cfSlide 0.32s ease',
                border: '1px solid rgba(0,0,0,0.04)',
              }}
            >
              {/* Heart icon */}
              <button
                onClick={(e) => e.stopPropagation()}
                aria-label="Wishlist"
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  zIndex: 3,
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#fff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#ccc',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#f83d8e'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#ccc'; }}
              >
                <Heart size={13} />
              </button>

              {/* Product image */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  background: '#fdf6ff',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
              </div>

              {/* Card body */}
              <div
                style={{
                  padding: '10px 12px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  flex: 1,
                }}
              >
                {/* Name + Rating row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '4px' }}>
                  <span
                    style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#0f0200',
                      lineHeight: 1.3,
                      flex: 1,
                    }}
                  >
                    {product.name}
                  </span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2px',
                      fontFamily: "'Archivo', sans-serif",
                      fontSize: '10px',
                      fontWeight: 700,
                      color: '#0f0200',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    <Star size={10} fill="#fbab2a" color="#fbab2a" />
                    {product.rating}
                  </span>
                </div>

                {/* Category */}
                <span
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontSize: '10px',
                    color: '#9ca3af',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.4px',
                  }}
                >
                  {product.category}
                </span>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Archivo', sans-serif",
                    fontSize: '10px',
                    color: '#646464',
                    lineHeight: 1.5,
                    margin: '2px 0 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical' as const,
                    overflow: 'hidden',
                  }}
                >
                  {product.description}
                </p>

                {/* Price + Cart */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                    paddingTop: '8px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Archivo', sans-serif",
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#e53e3e',
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                    aria-label="Add to cart"
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: '#683292',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#fff',
                      flexShrink: 0,
                      transition: 'background 0.2s, transform 0.15s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#f83d8e'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#683292'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
                  >
                    <ShoppingCart size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '7px',
            marginTop: '20px',
          }}
        >
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === activeIdx ? '22px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === activeIdx ? '#f83d8e' : '#d1d5db',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cfSlide {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 600px) {
          .cf-deco-hide-sm { display: none !important; }
        }
      `}</style>
    </section>
  );
}
