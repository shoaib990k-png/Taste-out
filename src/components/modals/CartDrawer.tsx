import { useState } from 'react';
import { X, Plus, Minus, Trash2, Tag, Gift, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, q: number) => void;
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => boolean;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  appliedPromo,
  onApplyPromo
}: CartDrawerProps) {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'completed'>('cart');
  
  // Checkout Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  // Calculations
  const subtotal = cart.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
  
  // Calculate BOGO 50% Off (Buy One Sundae Get One 50% Off)
  let discount = 0;
  if (appliedPromo.toUpperCase() === 'SUMMER50' && cart.length > 0) {
    const allIndividualPrices: number[] = [];
    cart.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        allIndividualPrices.push(item.unitPrice);
      }
    });
    // Sort descending so the more expensive ones are paid in full, and the cheaper ones get 50% off
    allIndividualPrices.sort((a, b) => b - a);
    
    // Group into pairs, discount the second one
    for (let i = 1; i < allIndividualPrices.length; i += 2) {
      discount += allIndividualPrices[i] * 0.5;
    }
  }

  const deliveryFee = subtotal > 15 || subtotal === 0 ? 0 : 2.50;
  const tax = (subtotal - discount) * 0.08; // 8% sales tax
  const total = subtotal - discount + deliveryFee + tax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;
    
    const success = onApplyPromo(promoInput);
    if (success) {
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon code. Try "SUMMER50"!');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formAddress) {
      alert('Please fill out all required fields.');
      return;
    }
    // Generate order ID
    const randomId = 'ID-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    setCheckoutStep('completed');
  };

  const resetAll = () => {
    onClearCart();
    setCheckoutStep('cart');
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormAddress('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-chocolate-text/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white flex flex-col shadow-2xl relative border-l border-cream-bg animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-cream-bg flex items-center justify-between bg-cream-bg/40">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-primary-pink" />
              <h2 className="text-xl font-display font-bold text-chocolate-text">
                {checkoutStep === 'cart' && 'Your Sweet Order'}
                {checkoutStep === 'checkout' && 'Secure Checkout'}
                {checkoutStep === 'completed' && 'Delight Reserved!'}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-cream-bg text-body-text-gray hover:text-chocolate-text transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6">
            
            {/* Step 1: Cart View */}
            {checkoutStep === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <div className="w-24 h-24 bg-cream-bg rounded-full flex items-center justify-center mb-6 text-primary-pink/50">
                      <ShoppingBag className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-chocolate-text mb-2">Your Cart is Empty</h3>
                    <p className="text-body-text-gray max-w-xs text-sm mb-6">
                      Add some of our delicious classic scoops and loaded sundaes to get started!
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 bg-primary-pink hover:bg-primary-pink-dark text-white font-bold rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                    >
                      Browse Ice Creams
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Item list */}
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div 
                          key={item.cartItemId}
                          className="flex items-center gap-4 pb-4 border-b border-cream-bg/60 last:border-0 last:pb-0"
                        >
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-cream-bg"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-chocolate-text leading-tight">{item.product.name}</h4>
                            {item.variantLabel && (
                              <p className="text-xs text-body-text-gray font-medium mt-0.5">{item.variantLabel}</p>
                            )}
                            <p className="text-xs text-primary-pink font-semibold mt-0.5">{item.product.category}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-extrabold text-primary-pink">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                              
                              {/* Quantity Toggles */}
                              <div className="flex items-center gap-2 border border-cream-bg bg-cream-bg/20 rounded-full px-2 py-1">
                                <button 
                                  onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                                  className="p-1 rounded-full text-body-text-gray hover:text-primary-pink hover:bg-cream-bg transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-xs font-bold text-chocolate-text w-4 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                                  className="p-1 rounded-full text-body-text-gray hover:text-primary-pink hover:bg-cream-bg transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => onRemoveFromCart(item.cartItemId)}
                            className="p-1.5 text-body-text-gray/50 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors self-start"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Promo Code Entry */}
                    <div className="pt-4 border-t border-cream-bg">
                      {appliedPromo ? (
                        <div className="flex items-center justify-between bg-green-50 text-green-700 p-3.5 rounded-2xl border border-green-200">
                          <div className="flex items-center gap-2 text-sm font-bold">
                            <Tag className="w-4 h-4 fill-green-700/20" />
                            <span>Code applied: "{appliedPromo.toUpperCase()}"</span>
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 font-extrabold px-2.5 py-1 rounded-full">
                            BOGO 50% OFF!
                          </span>
                        </div>
                      ) : (
                        <form onSubmit={handleApplyPromo} className="space-y-2">
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body-text-gray/60" />
                              <input
                                type="text"
                                placeholder="Promo code (SUMMER50)"
                                className="w-full pl-9 pr-3 py-2.5 bg-cream-bg/30 border border-cream-bg rounded-full text-sm font-medium outline-none focus:border-primary-pink transition-colors text-chocolate-text"
                                value={promoInput}
                                onChange={(e) => setPromoInput(e.target.value)}
                              />
                            </div>
                            <button
                              type="submit"
                              className="px-5 bg-chocolate-text hover:bg-primary-pink text-white font-bold rounded-full text-sm transition-colors cursor-pointer"
                            >
                              Apply
                            </button>
                          </div>
                          {promoError && (
                            <p className="text-xs text-red-500 font-bold pl-3">{promoError}</p>
                          )}
                          <div className="bg-primary-pink/5 border border-primary-pink/15 p-3 rounded-2xl flex items-start gap-2">
                            <Gift className="w-4 h-4 text-primary-pink mt-0.5 shrink-0" />
                            <p className="text-xs text-body-text-gray">
                              <span className="font-extrabold text-primary-pink">Summer Deal!</span> Use code <span className="font-mono bg-white border border-primary-pink/20 px-1.5 py-0.5 rounded text-[10px] font-bold text-chocolate-text">SUMMER50</span> for <b>Buy 1 Get 1 50% OFF</b>!
                            </p>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Step 2: Checkout Form */}
            {checkoutStep === 'checkout' && (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <p className="text-sm text-body-text-gray mb-4">
                  Please enter your delivery and contact details to place your gourmet order.
                </p>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-chocolate-text uppercase">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full p-3 border border-cream-bg bg-cream-bg/10 rounded-2xl text-sm focus:border-primary-pink outline-none text-chocolate-text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-chocolate-text uppercase">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full p-3 border border-cream-bg bg-cream-bg/10 rounded-2xl text-sm focus:border-primary-pink outline-none text-chocolate-text"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-chocolate-text uppercase">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+61 400 123 456"
                    className="w-full p-3 border border-cream-bg bg-cream-bg/10 rounded-2xl text-sm focus:border-primary-pink outline-none text-chocolate-text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-chocolate-text uppercase">Delivery Address *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Where should we send your scoops?"
                    className="w-full p-3 border border-cream-bg bg-cream-bg/10 rounded-2xl text-sm focus:border-primary-pink outline-none text-chocolate-text resize-none"
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                  />
                </div>

                <div className="pt-4 border-t border-cream-bg">
                  <h4 className="text-xs font-bold text-chocolate-text uppercase mb-2">Payment Method</h4>
                  <div className="p-4 bg-cream-bg/30 border border-cream-bg rounded-2xl flex items-center justify-between">
                    <span className="text-sm font-bold text-chocolate-text">💵 Cash / Card on Delivery</span>
                    <span className="text-[10px] bg-primary-pink/10 text-primary-pink font-extrabold px-2.5 py-1 rounded-full uppercase">
                      Default
                    </span>
                  </div>
                  <p className="text-[11px] text-body-text-gray mt-2">
                    Pay securely in cash or use a mobile reader when our cool dessert van arrives.
                  </p>
                </div>
              </form>
            )}

            {/* Step 3: Checkout Completed */}
            {checkoutStep === 'completed' && (
              <div className="text-center py-10 space-y-6">
                <div className="w-20 h-20 bg-green-50 border-4 border-green-400 rounded-full flex items-center justify-center mx-auto text-green-500 animate-bounce">
                  <CheckCircle className="w-10 h-10 fill-current text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-chocolate-text">Order Reserved!</h3>
                  <p className="text-sm text-body-text-gray mt-2 px-4">
                    Thank you, <span className="font-bold text-chocolate-text">{formName}</span>! We are whipping up your sundae swirls right now.
                  </p>
                </div>

                <div className="p-5 bg-cream-bg/40 border border-cream-bg rounded-3xl space-y-2 text-left">
                  <div className="flex justify-between text-xs text-body-text-gray">
                    <span>Order ID:</span>
                    <span className="font-mono font-bold text-chocolate-text">{orderId}</span>
                  </div>
                  <div className="flex justify-between text-xs text-body-text-gray">
                    <span>Estimated Arrival:</span>
                    <span className="font-bold text-primary-pink">20 - 35 mins</span>
                  </div>
                  <div className="flex justify-between text-xs text-body-text-gray">
                    <span>Total Paid:</span>
                    <span className="font-extrabold text-chocolate-text">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-body-text-gray">
                    <span>Deliver to:</span>
                    <span className="font-medium text-chocolate-text truncate max-w-[180px]" title={formAddress}>{formAddress}</span>
                  </div>
                </div>

                <button
                  onClick={resetAll}
                  className="w-full py-4 bg-primary-pink hover:bg-primary-pink-dark text-white font-bold rounded-full shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
                >
                  Place Another Order
                </button>
              </div>
            )}

          </div>

          {/* Footer Receipt Summary (Only shown if items in cart & not completed) */}
          {cart.length > 0 && checkoutStep !== 'completed' && (
            <div className="p-6 border-t border-cream-bg bg-cream-bg/20 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-body-text-gray font-medium">
                  <span>Subtotal</span>
                  <span className="text-chocolate-text font-bold">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600 font-bold">
                    <span>BOGO 50% Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-body-text-gray font-medium">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-chocolate-text font-bold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-body-text-gray font-medium">
                  <span>Delivery / Handling</span>
                  <span className="text-chocolate-text font-bold">
                    {deliveryFee === 0 ? <span className="text-green-600 font-extrabold uppercase text-xs bg-green-100 px-2.5 py-0.5 rounded-full">Free</span> : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-display font-extrabold text-chocolate-text pt-2 border-t border-cream-bg">
                  <span>Grand Total</span>
                  <span className="text-primary-pink">${total.toFixed(2)}</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full py-4 bg-primary-pink hover:bg-primary-pink-dark text-white font-bold rounded-full shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setCheckoutStep('cart')}
                    className="flex-1 py-3 bg-white border border-cream-bg hover:bg-cream-bg/30 text-chocolate-text font-bold rounded-full transition-colors cursor-pointer text-sm"
                  >
                    Back to Order
                  </button>
                  <button
                    onClick={handleCheckoutSubmit}
                    className="flex-1 py-3 bg-primary-pink hover:bg-primary-pink-dark text-white font-bold rounded-full shadow-lg transition-all hover:scale-[1.01] cursor-pointer text-sm"
                  >
                    Place Sweet Order
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
