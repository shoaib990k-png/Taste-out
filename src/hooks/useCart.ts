import { useState } from 'react';
import { Product, CartItem } from '../types';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<string>('');

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const clearCart = () => setCart([]);

  const applyPromo = (code: string): boolean => {
    if (code.toUpperCase() === 'SUMMER50') {
      setAppliedPromo('SUMMER50');
      return true;
    }
    return false;
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return {
    cart,
    appliedPromo,
    cartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyPromo,
  };
}
