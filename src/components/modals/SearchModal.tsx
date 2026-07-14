import { useState, useEffect } from 'react';
import { Search, X, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../../types';
import { products } from '../../data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export default function SearchModal({ isOpen, onClose, onSelectProduct, onAddToCart }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults(products.slice(0, 4)); // Show featured by default
    } else {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-chocolate-text/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-cream-bg overflow-hidden z-10 animate-in fade-in slide-in-from-top-4 duration-300">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-5 border-b border-cream-bg">
          <Search className="w-6 h-6 text-primary-pink" />
          <input
            type="text"
            placeholder="Search our delicious classic ice creams, sundaes, shakes..."
            className="w-full text-lg outline-none text-chocolate-text placeholder:text-body-text-gray/50 font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-cream-bg text-body-text-gray hover:text-chocolate-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[380px] overflow-y-auto p-6 space-y-4">
          <h3 className="text-xs font-bold tracking-wider text-body-text-gray/70 uppercase">
            {query.trim() === '' ? 'Recommended Flavors' : `Found ${results.length} delicious matches`}
          </h3>

          {results.length === 0 ? (
            <div className="text-center py-8 text-body-text-gray">
              <p className="text-lg font-medium mb-1">No matching flavors found</p>
              <p className="text-sm">Try searching "sundae", "cone", "strawberry", or "chocolate"!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((product) => (
                <div 
                  key={product.id}
                  className="group flex items-center justify-between p-3 rounded-2xl hover:bg-cream-bg/60 border border-transparent hover:border-cream-bg transition-all duration-250 cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-14 h-14 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="inline-block text-[10px] font-bold text-primary-pink bg-primary-pink/10 px-2 py-0.5 rounded-full mb-1">
                        {product.category}
                      </span>
                      <h4 className="font-bold text-chocolate-text group-hover:text-primary-pink transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-extrabold text-primary-pink">${product.price.toFixed(2)}</span>
                        <span className="text-xs text-body-text-gray">•</span>
                        <div className="flex items-center text-gold-star text-xs">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold ml-1 text-chocolate-text">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart button inside Search */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="p-3 bg-white hover:bg-primary-pink text-primary-pink hover:text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-cream-bg"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
