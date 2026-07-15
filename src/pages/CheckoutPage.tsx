import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { slugify } from '../utils/slug';

const WHATSAPP = '923001234567';

interface FormData {
  name: string;
  phone: string;
  altPhone: string;
  address: string;
  area: string;
  landmark: string;
  notes: string;
  deliveryMethod: 'delivery' | 'pickup';
  payment: 'cod' | 'whatsapp';
}

export default function CheckoutPage() {
  const { cart, subtotal, discount, deliveryFee, tax, total, appliedPromo } = useCart();
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [form, setForm] = useState<FormData>({
    name: '', phone: '', altPhone: '', address: '', area: '',
    landmark: '', notes: '', deliveryMethod: 'delivery', payment: 'cod',
  });

  useEffect(() => { document.title = 'Checkout — Taste Out'; }, []);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center py-20">
        <ShoppingBag size={56} className="text-gray-200" />
        <h1 className="text-xl font-bold text-gray-700">Your cart is empty</h1>
        <p className="text-sm text-gray-400">Add items to your cart before checking out.</p>
        <Link to="/menu" className="px-6 py-2.5 text-white font-semibold rounded-full text-sm hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #e53e3e, #f83d8e)' }}>
          Browse Menu
        </Link>
      </div>
    );
  }

  const update = (field: keyof FormData, value: string) => {
    setForm(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(p => { const n = { ...p }; delete n[field]; return n; });
  };

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (form.deliveryMethod === 'delivery' && !form.address.trim()) e.address = 'Address is required';
    if (form.deliveryMethod === 'delivery' && !form.area.trim()) e.area = 'Area is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMessage = () => {
    const items = cart.map(i => `• ${i.product.name} × ${i.quantity} — $${(i.product.price * i.quantity).toFixed(2)}`).join('\n');
    return [
      '*🍦 New Order — Taste Out*',
      '',
      `*Customer:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      form.altPhone ? `*Alt Phone:* ${form.altPhone}` : '',
      `*Method:* ${form.deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'}`,
      form.deliveryMethod === 'delivery' ? `*Address:* ${form.address}, ${form.area}${form.landmark ? `, near ${form.landmark}` : ''}` : '',
      form.notes ? `*Notes:* ${form.notes}` : '',
      '',
      '*Order Items:*',
      items,
      '',
      `*Subtotal:* $${subtotal.toFixed(2)}`,
      discount > 0 ? `*Discount (${appliedPromo}):* -$${discount.toFixed(2)}` : '',
      `*Delivery:* ${deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}`,
      `*Tax (8%):* $${tax.toFixed(2)}`,
      `*Total:* $${total.toFixed(2)}`,
      '',
      `*Payment:* ${form.payment === 'cod' ? 'Cash on Delivery' : 'To be confirmed'}`,
    ].filter(Boolean).join('\n');
  };

  const handleOrder = () => {
    if (!validate()) return;
    const msg = buildMessage();
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const InputClass = (field: keyof FormData) =>
    `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#f83d8e] transition-colors ${errors[field] ? 'border-red-400' : 'border-gray-200'}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#e53e3e] mb-3 transition-colors">
            <ArrowLeft size={14} /> Back to Cart
          </Link>
          <h1 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(24px,3.5vw,38px)', color: '#0f0200', fontWeight: 400 }}>
            Place Your <em style={{ color: '#e53e3e', fontStyle: 'normal' }}>Order</em>
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* Form */}
          <div className="lg:col-span-2 space-y-5">

            {/* Delivery method */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4 text-sm">Delivery Method</h2>
              <div className="flex gap-3">
                {(['delivery', 'pickup'] as const).map(m => (
                  <button key={m} onClick={() => update('deliveryMethod', m)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all capitalize ${form.deliveryMethod === m ? 'border-[#e53e3e] bg-red-50 text-[#e53e3e]' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                    {m === 'delivery' ? '🚚 Delivery' : '🏪 Pickup'}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal info */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
              <h2 className="font-bold text-gray-800 text-sm">Contact Information</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name *</label>
                <input type="text" placeholder="Your full name" value={form.name} onChange={e => update('name', e.target.value)} className={InputClass('name')} />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone *</label>
                  <input type="tel" placeholder="+92 300 000 0000" value={form.phone} onChange={e => update('phone', e.target.value)} className={InputClass('phone')} />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Alt Phone (optional)</label>
                  <input type="tel" placeholder="+92 300 000 0000" value={form.altPhone} onChange={e => update('altPhone', e.target.value)} className={InputClass('altPhone')} />
                </div>
              </div>
            </div>

            {/* Delivery address */}
            {form.deliveryMethod === 'delivery' && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
                <h2 className="font-bold text-gray-800 text-sm">Delivery Address</h2>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Street Address *</label>
                  <input type="text" placeholder="House/flat number, street" value={form.address} onChange={e => update('address', e.target.value)} className={InputClass('address')} />
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Area / Block *</label>
                    <input type="text" placeholder="e.g. DHA Phase 6" value={form.area} onChange={e => update('area', e.target.value)} className={InputClass('area')} />
                    {errors.area && <p className="text-xs text-red-500 mt-1">{errors.area}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Landmark (optional)</label>
                    <input type="text" placeholder="Near mosque, park etc." value={form.landmark} onChange={e => update('landmark', e.target.value)} className={InputClass('landmark')} />
                  </div>
                </div>
              </div>
            )}

            {/* Notes + Payment */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Order Notes (optional)</label>
                <textarea rows={3} placeholder="Any special requests..." value={form.notes} onChange={e => update('notes', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#f83d8e] resize-none" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-600 mb-2">Payment Method</h3>
                <div className="flex gap-3">
                  <button onClick={() => update('payment', 'cod')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border-2 transition-all ${form.payment === 'cod' ? 'border-[#e53e3e] bg-red-50 text-[#e53e3e]' : 'border-gray-200 text-gray-500'}`}>
                    💵 Cash on Delivery
                  </button>
                  <button onClick={() => update('payment', 'whatsapp')}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border-2 transition-all ${form.payment === 'whatsapp' ? 'border-[#e53e3e] bg-red-50 text-[#e53e3e]' : 'border-gray-200 text-gray-500'}`}>
                    💬 Confirm via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4 text-sm">Order Summary</h2>
              <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-pink-50 shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer"
                        onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1501443715934-62488a258ac6?auto=format&fit=crop&q=80&w=100'; }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link to={`/products/${slugify(product.name)}`} className="text-xs font-semibold text-gray-800 truncate block hover:text-[#e53e3e]">{product.name}</Link>
                      <p className="text-xs text-gray-400">×{quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-700 shrink-0">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-4 pt-3 space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-600 font-semibold"><span>Discount</span><span>-${discount.toFixed(2)}</span></div>}
                <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span></div>
                <div className="flex justify-between font-bold text-gray-800 text-sm pt-1 border-t border-gray-100">
                  <span>Total</span><span className="text-[#e53e3e]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleOrder}
              className="w-full py-3.5 text-white font-bold rounded-full hover:opacity-90 transition-all text-sm min-h-[44px]"
              style={{ background: 'linear-gradient(135deg, #e53e3e, #f83d8e)' }}
            >
              📲 Place Order via WhatsApp
            </button>
            <p className="text-xs text-center text-gray-400">
              Your order will be sent to our team via WhatsApp for confirmation.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
