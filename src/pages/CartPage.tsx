import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { slugify } from '../utils/slug';

export default function CartPage() {
  useEffect(() => { document.title = 'Cart — Taste Out'; }, []);
  const { cart, subtotal, discount, deliveryFee, tax, total, updateQuantity, removeFromCart, appliedPromo } = useCart();
  const { showToast } = useToast();

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    showToast(`${name} removed from cart`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center py-20">
        <ShoppingBag size={56} className="text-gray-200" />
        <h1 className="text-xl font-bold text-gray-700">Your cart is empty</h1>
        <p className="text-sm text-gray-400">Add something delicious from our menu!</p>
        <Link to="/menu" className="inline-flex items-center gap-2 px-6 py-2.5 text-white font-semibold rounded-full hover:opacity-90 text-sm" style={{ background: 'linear-gradient(135deg, #e53e3e, #f83d8e)' }}>
          Browse Menu <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(24px,3.5vw,38px)', color: '#0f0200', fontWeight: 400 }}>
            Your <em style={{ color: '#e53e3e', fontStyle: 'normal' }}>Cart</em>
          </h1>
          <p className="text-sm text-gray-400 mt-1">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start gap-4">
                <Link to={`/products/${slugify(product.name)}`} className="shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-pink-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1501443715934-62488a258ac6?auto=format&fit=crop&q=80&w=200'; }}
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${slugify(product.name)}`} className="font-bold text-sm text-gray-900 hover:text-[#e53e3e] transition-colors block truncate">
                    {product.name}
                  </Link>
                  <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
                  <p className="text-sm font-bold text-[#e53e3e] mt-1">${(product.price * quantity).toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button onClick={() => handleRemove(product.id, product.name)} className="text-gray-300 hover:text-red-500 transition-colors" aria-label="Remove item">
                    <Trash2 size={14} />
                  </button>
                  <div className="flex items-center gap-1.5 border border-gray-200 rounded-full px-2 py-1">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-[#e53e3e] transition-colors" aria-label="Decrease">
                      <Minus size={11} />
                    </button>
                    <span className="w-5 text-center text-xs font-bold">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-[#e53e3e] transition-colors" aria-label="Increase">
                      <Plus size={11} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-fit space-y-3">
            <h2 className="font-bold text-gray-800">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Promo ({appliedPromo})</span><span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? <span className="text-green-600 font-semibold">Free</span> : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-800 text-base">
                <span>Total</span><span className="text-[#e53e3e]">${total.toFixed(2)}</span>
              </div>
            </div>
            {deliveryFee > 0 && (
              <p className="text-xs text-gray-400">Add ${(15 - subtotal).toFixed(2)} more for free delivery</p>
            )}
            <Link
              to="/checkout"
              className="flex items-center justify-center gap-2 w-full py-3 text-white font-semibold rounded-full hover:opacity-90 transition-all text-sm min-h-[44px]"
              style={{ background: 'linear-gradient(135deg, #e53e3e, #f83d8e)' }}
            >
              Proceed to Checkout <ArrowRight size={15} />
            </Link>
            <Link to="/menu" className="flex items-center justify-center text-sm text-gray-400 hover:text-[#e53e3e] transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
