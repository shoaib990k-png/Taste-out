import { ArrowRight } from 'lucide-react';
import { categories } from '../../data';

interface CategoriesSectionProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
}

export default function CategoriesSection({ onSelectCategory }: CategoriesSectionProps) {
  return (
    <section
      id="categories"
      style={{
        backgroundColor: '#ffffff',
        padding: 'clamp(36px, 5vw, 60px) 0 clamp(40px, 5vw, 64px)',
        overflow: 'hidden',
      }}
    >
      {/* ── Heading ── */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(20px, 3vw, 32px)', padding: '0 16px' }}>
        <h2
          style={{
            fontFamily: "'Berkshire Swash', serif",
            fontSize: 'clamp(26px, 3.5vw, 44px)',
            fontWeight: 400,
            color: '#0f0200',
            margin: '0 0 10px',
            lineHeight: 1.2,
          }}
        >
          Explore Our{' '}
          <em style={{ color: '#e53e3e', fontStyle: 'normal' }}>Categories</em>
        </h2>
        <p
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontSize: 'clamp(12px, 1.1vw, 15px)',
            color: '#9ca3af',
            margin: 0,
          }}
        >
          Browse through our different categories to find your favorite ice cream treats.
        </p>
      </div>

      {/* ── Cards grid ── */}
      <div
        style={{
          maxWidth: '1100px',
          width: 'calc(100% - 40px)',
          margin: '0 auto',
        }}
      >
        <div className="cat-grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="cat-card"
              onClick={() => onSelectCategory(cat.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectCategory(cat.name)}
              aria-label={`Browse ${cat.name}`}
            >
              {/* Image area */}
              <div className="cat-img-wrap">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="cat-img"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1501443715934-62488a258ac6?auto=format&fit=crop&q=80&w=400';
                  }}
                />
              </div>

              {/* Label bar */}
              <div className="cat-label">
                <span className="cat-name">{cat.name}</span>
                <button
                  className="cat-arrow-btn"
                  onClick={(e) => { e.stopPropagation(); onSelectCategory(cat.name); }}
                  aria-label={`Go to ${cat.name}`}
                >
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 1.5vw, 18px);
        }

        .cat-card {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 16px rgba(0,0,0,0.09);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          background: #fff;
          outline: none;
        }
        .cat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 28px rgba(248,61,142,0.13);
        }
        .cat-card:hover .cat-arrow-btn {
          transform: translateX(3px);
        }

        /* Image */
        .cat-img-wrap {
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          flex-shrink: 0;
          background: #f9f0f6;
        }
        .cat-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .cat-card:hover .cat-img {
          transform: scale(1.04);
        }

        /* Label bar */
        .cat-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: #ffffff;
          flex-shrink: 0;
        }
        .cat-name {
          font-family: 'Archivo', sans-serif;
          font-size: clamp(12px, 1.1vw, 15px);
          font-weight: 700;
          color: #0f0200;
          line-height: 1;
        }
        .cat-arrow-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #f83d8e;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #ffffff;
          flex-shrink: 0;
          transition: transform 0.2s ease, background 0.2s;
        }
        .cat-arrow-btn:hover {
          background: #e0206e;
        }

        /* Tablet — 2 cols */
        @media (max-width: 900px) {
          .cat-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .cat-img-wrap {
            aspect-ratio: 4 / 3;
          }
        }

        /* Mobile — 2 compact cols or 1 */
        @media (max-width: 480px) {
          .cat-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .cat-img-wrap {
            aspect-ratio: 1 / 1;
          }
          .cat-name { font-size: 11px; }
          .cat-arrow-btn { width: 26px; height: 26px; }
        }

        @media (max-width: 340px) {
          .cat-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
