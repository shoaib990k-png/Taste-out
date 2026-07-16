import { useState, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Info, Heart } from 'lucide-react';
import { Product } from '../../types';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailsModal({ product, onClose, onAddToCart }: ProductDetailsModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setIsFavorite(false);
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [product, onClose]);

  if (!product) return null;

  // Generate dynamic ingredients & nutrition based on name
  const getGourmetDetails = () => {
    const name = product.name.toLowerCase();
    if (name.includes('chocolate') || name.includes('brownie') || name.includes('rocky road')) {
      return {
        ingredients: ['Organic Whole Milk', 'Heavy Cream', 'Pure Dutch Cocoa', 'Callebaut Dark Chocolate Chips', 'Brownie Pieces (wheat flour, butter)', 'Pure Vanilla extract'],
        calories: '280 kcal',
        fat: '14g',
        sugar: '22g',
        protein: '5g'
      };
    } else if (name.includes('strawberry') || name.includes('peach') || name.includes('berry')) {
      return {
        ingredients: ['Fresh Hand-picked Strawberries', 'Organic Cane Sugar', 'Heavy Milk Cream', 'Pure Lemon Juice extract', 'Natural Fruit Pectin', 'Vanilla Bean Specks'],
        calories: '210 kcal',
        fat: '9g',
        sugar: '18g',
        protein: '3g'
      };
    } else if (name.includes('vanilla')) {
      return {
        ingredients: ['Madagascar Bourbon Vanilla Pods', 'Heavy Organic Cream', 'Fresh Farmer Milk', 'Egg Yolks (Custard style)', 'Pure Cane Sugar', 'Sea Salt'],
        calories: '230 kcal',
        fat: '11g',
        sugar: '19g',
        protein: '4g'
      };
    } else {
      return {
        ingredients: ['Fresh Farmer Milk', 'Sweetened Condensed Milk', 'Natural Flavor Infusions', 'Pure Cane Sugar', 'Organic Heavy Whipping Cream'],
        calories: '240 kcal',
        fat: '12g',
        sugar: '20g',
        protein: '4g'
      };
    }
  };

  const info = getGourmetDetails();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-chocolate-text/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-[32px] shadow-2xl overflow-hidden z-10 border border-cream-bg grid grid-cols-1 md:grid-cols-2 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Left: Product Media with Floating Badges */}
        <div className="relative h-64 md:h-full min-h-[280px]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Top Control Overlay */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <span className="bg-primary-pink text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              {product.category}
            </span>
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2.5 bg-white rounded-full text-body-text-gray hover:text-red-500 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-sm font-semibold text-white/90">Gourmet Handmade Ice Cream</p>
          </div>
        </div>

        {/* Right: Rich Details and Actions */}
        <div className="p-6 md:p-8 flex flex-col justify-between max-h-[90vh] md:max-h-none overflow-y-auto">
          {/* Exit Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-cream-bg hover:bg-primary-pink/10 rounded-full text-body-text-gray hover:text-primary-pink transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and Price */}
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-chocolate-text leading-tight pr-6">
              {product.name}
            </h3>
            
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-primary-pink">${(product.price ?? 0).toFixed(2)}</span>
              <span className="text-xs text-body-text-gray font-semibold">/ serving cone or bowl</span>
            </div>

            <p className="text-sm text-body-text-gray leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Ingredients Grid */}
          <div className="my-5 space-y-2">
            <h4 className="text-xs font-extrabold text-chocolate-text uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-primary-pink" />
              <span>Artisanal Ingredients</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {info.ingredients.map((ingredient, idx) => (
                <span 
                  key={idx} 
                  className="text-xs bg-cream-bg text-chocolate-text/80 px-2.5 py-1 rounded-full font-medium border border-chocolate-text/5"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Nutrition Stats */}
          <div className="bg-cream-bg/40 border border-cream-bg/60 p-4 rounded-2xl mb-5">
            <h4 className="text-xs font-extrabold text-chocolate-text uppercase tracking-wider mb-2.5">
              Nutrition Value (Per Scoop)
            </h4>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white p-2 rounded-xl border border-cream-bg/45">
                <p className="text-[10px] text-body-text-gray font-bold">CALORIES</p>
                <p className="text-sm font-black text-chocolate-text">{info.calories}</p>
              </div>
              <div className="bg-white p-2 rounded-xl border border-cream-bg/45">
                <p className="text-[10px] text-body-text-gray font-bold">TOTAL FAT</p>
                <p className="text-sm font-black text-chocolate-text">{info.fat}</p>
              </div>
              <div className="bg-white p-2 rounded-xl border border-cream-bg/45">
                <p className="text-[10px] text-body-text-gray font-bold">SUGARS</p>
                <p className="text-sm font-black text-chocolate-text">{info.sugar}</p>
              </div>
              <div className="bg-white p-2 rounded-xl border border-cream-bg/45">
                <p className="text-[10px] text-body-text-gray font-bold">PROTEIN</p>
                <p className="text-sm font-black text-chocolate-text">{info.protein}</p>
              </div>
            </div>
          </div>

          {/* Quantity and CTA row */}
          <div className="flex items-center gap-4 pt-3 border-t border-cream-bg">
            <div className="flex items-center gap-3 border border-cream-bg bg-cream-bg/20 rounded-full px-3 py-2">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 rounded-full text-body-text-gray hover:text-primary-pink hover:bg-cream-bg transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold text-chocolate-text w-5 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 rounded-full text-body-text-gray hover:text-primary-pink hover:bg-cream-bg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => onAddToCart(product, quantity)}
              className="flex-1 py-3.5 bg-primary-pink hover:bg-primary-pink-dark text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Order — ${((product.price ?? 0) * quantity).toFixed(2)}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
