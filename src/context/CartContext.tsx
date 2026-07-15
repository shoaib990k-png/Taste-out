import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface CartContextValue {
  cart: CartItem[];
  appliedPromo: string;
  cartCount: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  applyPromo: (code: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = 'tasteout_cart';
const PROMO_STORAGE_KEY = 'tasteout_promo';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<string>(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(PROMO_STORAGE_KEY, appliedPromo);
    } catch {}
  }, [appliedPromo]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) { removeFromCart(id); return; }
    setCart(prev => prev.map(item =>
      item.product.id === id ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const clearCart = () => setCart([]);

  const applyPromo = (code: string): boolean => {
    if (code.toUpperCase() === 'SUMMER50') {
      setAppliedPromo('SUMMER50');
      return true;
    }
    return false;
  };

  // Calculations
  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);
  const subtotal = cart.reduce((t, i) => t + i.product.price * i.quantity, 0);

  let discount = 0;
  if (appliedPromo.toUpperCase() === 'SUMMER50' && cart.length > 0) {
    const prices: number[] = [];
    cart.forEach(item => {
      for (let i = 0; i < item.quantity; i++) prices.push(item.product.price);
    });
    prices.sort((a, b) => b - a);
    for (let i = 1; i < prices.length; i += 2) discount += prices[i] * 0.5;
  }

  const deliveryFee = subtotal === 0 ? 0 : subtotal > 15 ? 0 : 2.5;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + deliveryFee + tax;

  return (
    <CartContext.Provider value={{
      cart, appliedPromo, cartCount,
      subtotal, discount, deliveryFee, tax, total,
      addToCart, updateQuantity, removeFromCart, clearCart, applyPromo,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
