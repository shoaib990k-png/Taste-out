import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, ProductVariant, ProductAddon, CartItem } from '../types';

interface AddToCartOptions {
  variant?: ProductVariant;
  addons?: ProductAddon[];
  quantity?: number;
}

interface CartContextValue {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  addToCart: (product: Product, options?: AddToCartOptions) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const CART_KEY = 'tasteout_cart_v2';

function buildCartItemId(productId: string, variantId?: string, addonIds?: string[]): string {
  const parts = [productId];
  if (variantId) parts.push(variantId);
  if (addonIds?.length) parts.push(...addonIds.sort());
  return parts.join('__');
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {}
  }, [cart]);

  const addToCart = (product: Product, options: AddToCartOptions = {}) => {
    const { variant, addons = [], quantity = 1 } = options;
    const addonIds = addons.map(a => a.id);
    const cartItemId = buildCartItemId(product.id, variant?.id, addonIds);
    const unitPrice = (variant?.price ?? product.price ?? 0) + addons.reduce((s, a) => s + a.price, 0);

    setCart(prev => {
      const existing = prev.find(i => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map(i => i.cartItemId === cartItemId
          ? { ...i, quantity: i.quantity + quantity }
          : i
        );
      }
      return [...prev, {
        cartItemId,
        product,
        variantId: variant?.id,
        variantLabel: variant?.label,
        variantPrice: variant?.price,
        selectedAddons: addons,
        quantity,
        unitPrice,
      }];
    });
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) { removeFromCart(cartItemId); return; }
    setCart(prev => prev.map(i => i.cartItemId === cartItemId ? { ...i, quantity } : i));
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);
  const subtotal  = cart.reduce((t, i) => t + i.unitPrice * i.quantity, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal > 1000 ? 0 : 150;
  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider value={{
      cart, cartCount, subtotal, deliveryFee, total,
      addToCart, updateQuantity, removeFromCart, clearCart,
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
