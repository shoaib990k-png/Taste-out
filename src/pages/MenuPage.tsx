import { useState, useEffect, useMemo } from 'react';
import { Search, X, ShoppingCart, SlidersHorizontal, ChevronDown, Plus } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data';

import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Product, ProductVariant, ProductAddon } from '../types';

/* ─── Price display helper ─────────────────────────────── */
function priceDisplay(p: Product): string {
  if (p.variants && p.variants.length > 0) {
    const prices = p.variants.map(v => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    if (p.category === 'Belgium Waffles' || p.category === 'Pan Cakes') {
      const [a, b] = p.variants;
      return `${a.label} Rs. ${a.price} · ${b.label} Rs. ${b.price}`;
    }
    if (min === max) return `Rs. ${min}`;
    return `From Rs. ${min}`;
  }
  return `Rs. ${p.price ?? 0}`;
}

/* ─── Variant Selector Modal ──────────────────────────── */
function VariantModal({
  product,
  onClose,
  onConfirm,
}: {
  product: Product;
  onClose: () => void;
  onConfirm: (variant: ProductVariant | undefined, addons: ProductAddon[]) => void;
}) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.length === 1 ? product.variants[0] : undefined
  );
  const [selectedAddons, setSelectedAddons] = useState<ProductAddon[]>([]);
  const [error, setError] = useState('');

  const toggleAddon = (addon: ProductAddon) => {
    setSelectedAddons(prev =>
      prev.find(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const total = (selectedVariant?.price ?? product.price ?? 0)
    + selectedAddons.reduce((s, a) => s + a.price, 0);

  const handleConfirm = () => {
    if (product.variants?.length && !selectedVariant) {
      setError('Please select an option before adding to cart.');
      return;
    }
    onConfirm(selectedVariant, selectedAddons);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}>
      <div
        className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-5 space-y-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-gray-900 text-sm leading-tight">{product.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{product.description}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0 mt-0.5">
            <X size={18} />
          </button>
        </div>

        {/* Variant selection */}
        {product.variants && product.variants.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Choose size</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map(v => (
                <button
                  key={v.id}
                  onClick={() => { setSelectedVariant(v); setError(''); }}
                  className={`flex-1 min-w-[80px] py-2 px-3 rounded-xl text-xs font-semibold border-2 transition-all ${
                    selectedVariant?.id === v.id
                      ? 'border-[#e53e3e] bg-red-50 text-[#e53e3e]'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span className="block">{v.label}</span>
                  <span className="block font-bold mt-0.5">Rs. {v.price}</span>
                </button>
              ))}
            </div>
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
          </div>
        )}

        {/* Add-ons */}
        {product.addons && product.addons.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Add-ons (optional)</p>
            {product.addons.map(addon => {
              const checked = selectedAddons.some(a => a.id === addon.id);
              return (
                <label key={addon.id} className="flex items-center justify-between py-2 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAddon(addon)}
                      className="w-4 h-4 accent-[#e53e3e]"
                    />
                    <span className="text-sm text-gray-700">{addon.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#e53e3e]">+ Rs. {addon.price}</span>
                </label>
              );
            })}
          </div>
        )}

        {/* Total + confirm */}
        <div className="border-t border-gray-100 pt-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-400">Total</p>
            <p className="text-base font-bold text-[#e53e3e]">Rs. {total}</p>
          </div>
          <button
            onClick={handleConfirm}
            className="flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-full text-sm hover:opacity-90 transition-all"
            style={{ background: 'linear-gradient(135deg, #e53e3e, #f83d8e)' }}
          >
            <ShoppingCart size={14} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Product Card ─────────────────────────────────────── */
function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const hasVariants = !!(product.variants?.length);

  const handleAdd = () => {
    if (hasVariants || product.addons?.length) {
      setShowModal(true);
    } else {
      addToCart(product, { quantity: 1 });
      showToast(`${product.name} added to cart 🍦`);
    }
  };

  const handleConfirm = (variant: ProductVariant | undefined, addons: ProductAddon[]) => {
    addToCart(product, { variant, addons, quantity: 1 });
    const label = variant ? `${product.name} (${variant.label})` : product.name;
    showToast(`${label} added to cart 🍦`);
  };

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col min-w-0">
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-pink-50 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1501443715934-62488a258ac6?auto=format&fit=crop&q=80&w=400';
            }}
          />
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col flex-1 gap-1">
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">{product.category}</p>

          <p className="text-sm font-bold text-gray-900 leading-tight">
            {product.name}
          </p>

          <p className="text-xs text-gray-500 line-clamp-2 flex-1">{product.description}</p>

          {/* Price */}
          <div className="mt-2">
            <p className="text-xs font-bold text-[#e53e3e] leading-snug">{priceDisplay(product)}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end mt-2 pt-2 border-t border-gray-50">
            <button
              onClick={handleAdd}
              className="flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-semibold rounded-full hover:opacity-90 active:scale-95 transition-all"
              style={{ background: '#683292' }}
              aria-label={`Add ${product.name} to cart`}
            >
              {hasVariants ? (
                <><ChevronDown size={12} /> Select</>
              ) : (
                <><Plus size={12} /> Add</>
              )}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <VariantModal
          product={product}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}

/* ─── Menu Page ────────────────────────────────────────── */
export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const activeCategory = searchParams.get('category') || '';

  useEffect(() => { document.title = 'Menu — Taste Out'; }, []);

  const menuCategories = ['Ice Cream', 'Shakes', 'Faluda', 'Belgium Waffles', 'Lollipop Waffles', 'Pan Cakes'];

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesCat = !activeCategory || p.category === activeCategory;
      const q = query.toLowerCase().trim();
      const matchesQuery = !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, query]);

  const setCategory = (cat: string) => {
    setQuery('');
    if (cat) setSearchParams({ category: cat });
    else setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(28px,4vw,44px)', color: '#0f0200', fontWeight: 400, margin: '0 0 6px' }}>
            Our <em style={{ color: '#e53e3e', fontStyle: 'normal' }}>Menu</em>
          </h1>
          <p className="text-gray-500 text-sm">Handcrafted with quality ingredients. Pick your favourite.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Search */}
        <div className="relative max-w-md mb-4">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search waffles, shakes, faluda..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#e53e3e] bg-white"
            aria-label="Search menu items"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 flex-wrap mb-5">
          <SlidersHorizontal size={13} className="text-gray-400 shrink-0" />
          <button
            onClick={() => setCategory('')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              !activeCategory ? 'bg-[#e53e3e] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#e53e3e] hover:text-[#e53e3e]'
            }`}
          >
            All
          </button>
          {menuCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat ? 'bg-[#e53e3e] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#e53e3e] hover:text-[#e53e3e]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-xs text-gray-400 mb-5">
          {filtered.length} {filtered.length === 1 ? 'item' : 'items'} found
          {activeCategory && <span> in <strong className="text-gray-700">{activeCategory}</strong></span>}
          {query && <span> for &ldquo;<strong className="text-gray-700">{query}</strong>&rdquo;</span>}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <p className="text-4xl">🍦</p>
            <p className="font-semibold text-gray-700">No menu items found.</p>
            <p className="text-sm text-gray-400">Try a different search or category</p>
            <button
              onClick={() => { setQuery(''); setCategory(''); }}
              className="mt-2 px-5 py-2 bg-[#e53e3e] text-white text-sm rounded-full hover:opacity-90"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))' }}
          >
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
