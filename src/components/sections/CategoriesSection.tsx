import { IceCream, Coffee, Sparkles, UtensilsCrossed } from 'lucide-react';
import { ReactNode } from 'react';
import { categories } from '../../data';

interface CategoriesSectionProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
}

// Map category name to a relevant icon
function CategoryIcon({ name }: { name: string }): ReactNode {
  const cls = 'cat-icon-svg';
  const n = name.toLowerCase();
  if (n.includes('sundae'))  return <UtensilsCrossed size={24} className={cls} aria-hidden="true" />;
  if (n.includes('cone'))    return <IceCream        size={24} className={cls} aria-hidden="true" />;
  if (n.includes('shake'))   return <Coffee          size={24} className={cls} aria-hidden="true" />;
  return                            <Sparkles        size={24} className={cls} aria-hidden="true" />;
}

export default function CategoriesSection({ onSelectCategory }: CategoriesSectionProps) {
  return (
    <section
      id="categories"
      className="cat-section"
    >
      {/* ── Heading ── */}
      <div className="cat-heading-wrap">
        <h2 className="cat-heading">
          Explore Our{' '}
          <em style={{ color: '#e53e3e', fontStyle: 'normal' }}>Categories</em>
        </h2>
        <p className="cat-subtitle">
          Browse through our different categories to find your favorite ice cream treats.
        </p>
      </div>

      {/* ── Cards grid ── */}
      <div className="cat-container">
        <div className="cat-grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="cat-card"
              onClick={() => onSelectCategory(cat.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectCategory(cat.name);
                }
              }}
              aria-label={`Browse ${cat.name}`}
            >
              {/* ── Image ── */}
              <div className="cat-img-wrap">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="cat-img"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1501443715934-62488a258ac6?auto=format&fit=crop&q=80&w=400';
                  }}
                />
              </div>

              {/* ── Floating white info panel ── */}
              <div className="cat-panel">
                <span className="cat-name">{cat.name}</span>
                <span className="cat-icon-wrap" aria-hidden="true">
                  <CategoryIcon name={cat.name} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scoped styles ── */}
      <style>{`

        /* ── Section ── */
        .cat-section {
          background-color: #ffffff;
          padding: clamp(36px, 5vw, 60px) 0 clamp(56px, 7vw, 80px);
        }

        /* ── Heading ── */
        .cat-heading-wrap {
          text-align: center;
          margin-bottom: clamp(24px, 3.5vw, 40px);
          padding: 0 16px;
        }
        .cat-heading {
          font-family: 'Berkshire Swash', serif;
          font-size: clamp(26px, 3.5vw, 44px);
          font-weight: 400;
          color: #0f0200;
          margin: 0 0 10px;
          line-height: 1.2;
        }
        .cat-subtitle {
          font-family: 'Archivo', sans-serif;
          font-size: clamp(12px, 1.1vw, 15px);
          color: #9ca3af;
          margin: 0;
        }

        /* ── Container ── */
        .cat-container {
          max-width: 1140px;
          width: calc(100% - 40px);
          margin: 0 auto;
        }

        /* ── Grid ── */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(12px, 2vw, 20px);
          /* bottom padding so panel doesn't get clipped */
          padding-bottom: 28px;
        }

        /* ── Card ── */
        .cat-card {
          position: relative;
          /* room for panel to hang below */
          padding-bottom: 40px;
          cursor: pointer;
          outline: none;
          min-width: 0;
          transition: transform 0.25s ease;
        }
        .cat-card:hover {
          transform: translateY(-6px);
        }
        .cat-card:focus-visible .cat-img-wrap {
          outline: 3px solid #e53e3e;
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          .cat-card { transition: none; }
          .cat-img  { transition: none; }
        }

        /* ── Image wrapper ── */
        .cat-img-wrap {
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 28px;
          overflow: hidden;
          background: #f9f0f6;
          box-shadow: 0 4px 20px rgba(0,0,0,0.10);
          transition: box-shadow 0.25s ease;
        }
        .cat-card:hover .cat-img-wrap {
          box-shadow: 0 10px 32px rgba(0,0,0,0.15);
        }
        .cat-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s ease;
        }
        .cat-card:hover .cat-img {
          transform: scale(1.05);
        }

        /* ── Floating white panel ── */
        .cat-panel {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 86%;
          background: #ffffff;
          border-radius: 26px;
          box-shadow: 0 6px 28px rgba(0,0,0,0.12);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          min-height: 60px;
          z-index: 2;
        }

        /* ── Category name ── */
        .cat-name {
          font-family: 'Archivo', sans-serif;
          font-size: clamp(11px, 1vw, 14px);
          font-weight: 700;
          color: #0f0200;
          line-height: 1.3;
          flex: 1;
          min-width: 0;
          word-break: break-word;
        }

        /* ── Icon wrap ── */
        .cat-icon-wrap {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 12px;
          background: #fff5f5;
        }
        .cat-icon-svg {
          color: #e53e3e;
          stroke-width: 1.6;
        }

        /* ── Tablet: 2 cols ── */
        @media (max-width: 1023px) {
          .cat-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .cat-img-wrap {
            aspect-ratio: 3 / 4;
          }
        }

        /* ── Mobile: 1 col at narrow widths, 2 cols where it fits ── */
        @media (max-width: 479px) {
          .cat-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .cat-img-wrap {
            aspect-ratio: 4 / 3;
          }
          .cat-panel {
            width: 82%;
          }
        }

        /* ── Very narrow (≥ 380px) allow 2 col ── */
        @media (min-width: 380px) and (max-width: 479px) {
          .cat-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
          }
          .cat-img-wrap {
            aspect-ratio: 3 / 4;
          }
          .cat-name { font-size: 10px; }
          .cat-icon-wrap { width: 28px; height: 28px; border-radius: 8px; }
          .cat-icon-svg { width: 16px !important; height: 16px !important; }
        }

        /* ── 320-379px: strictly 1 col ── */
        @media (max-width: 379px) {
          .cat-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      `}</style>
    </section>
  );
}
