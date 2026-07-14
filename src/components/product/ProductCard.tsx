import { Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onSelectProduct }: ProductCardProps) {
  return (
    <div 
      className="group bg-white rounded-[28px] p-5 border border-cream-bg shadow-xs hover:-translate-y-2 hover:shadow-2xl hover:border-primary-pink/10 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
      onClick={() => onSelectProduct(product)}
    >
      
      {/* Product Media */}
      <div>
        <div className="relative w-full h-44 rounded-[22px] overflow-hidden bg-cream-bg mb-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          {/* Quick View overlay icon */}
          <div className="absolute inset-0 bg-chocolate-text/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <span className="p-3 bg-white text-chocolate-text rounded-full shadow-md hover:scale-105 active:scale-95 transition-all">
              <Eye className="w-5 h-5 text-primary-pink stroke-[2.5]" />
            </span>
          </div>
        </div>

        {/* Rating Row */}
        <div className="flex items-center gap-1 text-gold-star mb-1">
          <Star className="w-4 h-4 fill-current text-gold-star" />
          <span className="text-xs font-black text-chocolate-text">{product.rating} / 5</span>
          <span className="text-[10px] text-body-text-gray/50">•</span>
          <span className="text-[10px] text-body-text-gray font-bold uppercase tracking-wider">{product.category}</span>
        </div>

        {/* Title */}
        <h3 className="font-display font-black text-chocolate-text text-base leading-snug group-hover:text-primary-pink transition-colors">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-body-text-gray mt-1 leading-relaxed line-clamp-2">
          {product.description}
        </p>
      </div>

      {/* Pricing and Cart Add row */}
      <div className="flex items-center justify-between pt-4 mt-3 border-t border-cream-bg/60">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-body-text-gray uppercase tracking-widest leading-none">Price</span>
          <span className="text-lg font-black text-primary-pink mt-0.5">${product.price.toFixed(2)}</span>
        </div>

        {/* Circular cart-icon button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="p-3 bg-cream-bg text-primary-pink group-hover:bg-primary-pink group-hover:text-white rounded-full transition-all duration-300 shadow-sm active:scale-90 cursor-pointer"
          title="Add to Cart"
        >
          <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

    </div>
  );
}
