import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, X, ShoppingCart, Star, SlidersHorizontal } from 'lucide-react';
import { products, categories } from '../data';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { slugify } from '../utils/slug';
import { Product } from '../types';

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const activeCategory = searchParams.get('category') || '';

  useEffect(() => {
    document.title = 'Menu — Taste Out';
  }, []);

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
    if (cat) setSearchParams({ category: cat });
    else setSearchParams({});
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    showToast(`${product.name} added to cart 🍦`);
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search ice creams, waffles..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#f83d8e] bg-white"
              aria-label="Search products"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category filter chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal size={14} className="text-gray-400 shrink-0" />
            <button
              onClick={() => setCategory('')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${!activeCategory ? 'bg-[#e53e3e] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#e53e3e] hover:text-[#e53e3e]'}`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.name)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${activeCategory === cat.name ? 'bg-[#e53e3e] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#e53e3e] hover:text-[#e53e3e]'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="text-sm text-gray-400 mb-5">
          {filtered.length} {filtered.length === 1 ? 'item' : 'items'} found
          {activeCategory && <span> in <strong className="text-gray-700">{activeCategory}</strong></span>}
          {query && <span> for "<strong className="text-gray-700">{query}</strong>"</span>}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <p className="text-4xl">🍦</p>
            <p className="font-semibold text-gray-700">No items found</p>
            <p className="text-sm text-gray-400">Try a different search or category</p>
            <button
              onClick={() => { setQuery(''); setCategory(''); }}
              className="mt-2 px-5 py-2 bg-[#e53e3e] text-white text-sm rounded-full hover:opacity-90"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))' }}
          >
            {filtered.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                <Link to={`/products/${slugify(product.name)}`} className="block aspect-square overflow-hidden bg-pink-50 flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1501443715934-62488a258ac6?auto=format&fit=crop&q=80&w=400'; }}
                  />
                </Link>
                <div className="p-3 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <Link to={`/products/${slugify(product.name)}`} className="text-sm font-bold text-gray-900 hover:text-[#e53e3e] leading-tight line-clamp-2">
                      {product.name}
                    </Link>
                    <span className="flex items-center gap-0.5 text-[11px] font-bold text-gray-700 shrink-0">
                      <Star size={10} fill="#fbab2a" color="#fbab2a" />
                      {product.rating}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{product.category}</p>
                  <p className="text-xs text-gray-500 line-clamp-2 flex-1">{product.description}</p>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
                    <span className="text-base font-bold text-[#e53e3e]">${product.price.toFixed(2)}</span>
                    <div className="flex items-center gap-1.5">
                      <Link
                        to={`/products/${slugify(product.name)}`}
                        className="px-2.5 py-1 text-[11px] font-semibold text-gray-600 border border-gray-200 rounded-full hover:border-[#e53e3e] hover:text-[#e53e3e] transition-colors"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:opacity-90 active:scale-90 transition-all"
                        style={{ background: '#683292' }}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingCart size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
