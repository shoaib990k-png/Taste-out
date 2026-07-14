import { useRef } from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';

interface ProductCarouselProps {
  productsList: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductCarousel({ productsList, onAddToCart, onSelectProduct }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">

      {/* Swipeable Horizontal track */}
      <div 
        ref={scrollRef}
        className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {productsList.map((product) => (
          <div 
            key={product.id}
            className="w-[280px] sm:w-[310px] shrink-0"
          >
            <ProductCard 
              product={product}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
