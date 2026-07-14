import { useState } from 'react';
import { Tag, Sparkles, Check } from 'lucide-react';

interface PromoBannerProps {
  onApplyPromoCode: (code: string) => void;
  onOpenCart: () => void;
}

export default function PromoBanner({ onApplyPromoCode, onOpenCart }: PromoBannerProps) {
  const [copied, setCopied] = useState(false);

  const handleGrabDeal = () => {
    onApplyPromoCode('SUMMER50');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    // Open cart to show the discount in action!
    setTimeout(() => {
      onOpenCart();
    }, 600);
  };

  return (
    <section className="py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Banner Block */}
        <div className="relative bg-primary-pink rounded-[40px] p-8 md:p-12 lg:p-16 text-white overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* BACKGROUND DECORATIVE DOTS & CIRCLES */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-12 -mt-12 pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-black/5 rounded-full pointer-events-none" />
          
          {/* Floating Dotted Arrow simulation vector in background */}
          <div className="absolute right-1/3 top-1/4 opacity-10 pointer-events-none hidden lg:block select-none">
            <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-white stroke-2 fill-none stroke-dasharray">
              <path d="M10,80 Q50,80 50,40 T90,20" />
              <polygon points="90,15 95,20 90,25" fill="white" />
            </svg>
          </div>

          {/* LEFT CONTENT BLOCK */}
          <div className="space-y-6 max-w-xl text-center lg:text-left relative z-10">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 fill-white" />
              <span>Limited Summer Rush</span>
            </div>

            {/* Title & Offer */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight leading-none">
                Summer Special!
              </h2>
              <p className="text-xl sm:text-2xl font-bold text-cream-bg/90">
                Buy One Sundae, Get One 50% Off!
              </p>
            </div>

            <p className="text-xs sm:text-sm text-white/85 max-w-md mx-auto lg:mx-0 leading-relaxed font-semibold">
              Beat the Melbourne heat wave with our loaded double-scoop sundaes! Mix & match your favorite flavors. Discount applies automatically to the cheaper pair.
            </p>

            {/* Action Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={handleGrabDeal}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-cream-bg text-primary-pink font-extrabold rounded-full shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4.5 h-4.5 stroke-[3]" />
                    <span>Coupon Pre-Applied!</span>
                  </>
                ) : (
                  <>
                    <Tag className="w-4.5 h-4.5 stroke-[2.5]" />
                    <span>Get This Deal</span>
                  </>
                )}
              </button>
              
              <div className="text-center sm:text-left text-xs text-white/90">
                <p className="font-semibold">Use code: <span className="font-mono bg-white/20 border border-white/20 px-2 py-0.5 rounded text-sm font-black text-white select-all">SUMMER50</span></p>
                <p className="text-[10px] text-white/70 mt-1">Click code or button to copy & apply instantly.</p>
              </div>
            </div>

          </div>

          {/* RIGHT PICTURE BLOCK WITH ROTATEDbadge */}
          <div className="relative flex justify-center items-center shrink-0">
            
            {/* ROTATED "50% OFF" BADGE (STICKER EFFECT) */}
            <div className="absolute -top-6 -left-6 bg-badge-red text-white w-24 h-24 rounded-full flex flex-col items-center justify-center font-display font-black text-center shadow-lg border-4 border-white rotate-[-12deg] z-20 animate-pulse select-none">
              <span className="text-[10px] uppercase tracking-wider leading-none">UP TO</span>
              <span className="text-2xl leading-none">50%</span>
              <span className="text-xs leading-none">OFF!</span>
            </div>

            {/* Rounded Product Image */}
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-[44px] overflow-hidden border-8 border-white/20 shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=600" 
                alt="Summer Sundae Special BOGO" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
