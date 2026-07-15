import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Plus, Minus, ArrowRight } from 'lucide-react';
import { products } from '../data';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { slugify } from '../utils/slug';

export default function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => slugify(p.name) === slug);
  const related = product
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  useEffect(() => {
    document.title = product ? `${product.name} — Taste Out` : 'Product Not Found — Taste Out';
    setQuantity(1);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center py-20">
        <p className="text-5xl">🍦</p>
        <h1 className="text-2xl font-bold text-gray-800">Product Not Found</h1>
        <p className="text-gray-500 text-sm">This product doesn't exist or may have been removed.</p>
        <Link to="/menu" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#e53e3e] text-white font-semibold rounded-full hover:opacity-90 transition-all text-sm">
          <ArrowLeft size={15} /> Back to Menu
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`${quantity}× ${product.name} added to cart 🍦`);
  };

  const handleOrderNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-[#e53e3e] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/menu" className="hover:text-[#e53e3e] transition-colors">Menu</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate max-w-[180px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="bg-white rounded-2xl overflow-hidden aspect-square shadow-sm border border-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1501443715934-62488a258ac6?auto=format&fit=crop&q=80&w=600'; }}
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            <Link to="/menu" className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#e53e3e] w-fit transition-colors">
              <ArrowLeft size={14} /> Back to Menu
            </Link>

            <div>
              <span className="text-xs font-semibold text-[#f83d8e] bg-pink-50 px-2.5 py-1 rounded-full">
                {product.category}
              </span>
              <h1 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(24px,3.5vw,38px)', color: '#0f0200', fontWeight: 400, marginTop: '10px', lineHeight: 1.2 }}>
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill={i < Math.floor(product.rating) ? '#fbab2a' : 'none'} color="#fbab2a" />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{product.rating} / 5</span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-[#f83d8e]">
              ${product.price.toFixed(2)}
              <span className="text-sm text-gray-400 font-normal ml-2">per serving</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">Quantity</span>
              <div className="flex items-center gap-2 border border-gray-200 rounded-full px-2 py-1 bg-white">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:text-[#e53e3e] hover:bg-red-50 transition-all"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="w-7 text-center text-sm font-bold text-gray-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:text-[#e53e3e] hover:bg-red-50 transition-all"
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>
              <span className="text-sm font-bold text-gray-500">
                = <span className="text-[#f83d8e]">${(product.price * quantity).toFixed(2)}</span>
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 border-2 border-[#e53e3e] text-[#e53e3e] font-semibold rounded-full hover:bg-[#e53e3e] hover:text-white transition-all text-sm min-h-[44px]"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <button
                onClick={handleOrderNow}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 text-white font-semibold rounded-full hover:opacity-90 transition-all text-sm min-h-[44px]"
                style={{ background: 'linear-gradient(135deg, #e53e3e, #f83d8e)' }}
              >
                Order Now <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="font-bold text-gray-800 text-lg mb-5">You might also like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map(p => (
                <Link
                  key={p.id}
                  to={`/products/${slugify(p.name)}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="aspect-square overflow-hidden bg-pink-50">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-bold text-gray-800 line-clamp-2 group-hover:text-[#e53e3e] transition-colors">{p.name}</p>
                    <p className="text-sm font-bold text-[#f83d8e] mt-1">${p.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
