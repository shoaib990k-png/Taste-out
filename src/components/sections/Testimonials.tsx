import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Autoplay functionality
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const current = testimonials[activeIndex];

  return (
    <section 
      id="reviews" 
      className="py-20 bg-cream-bg/30 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative background star */}
      <div className="absolute top-10 right-10 text-primary-pink/5 text-[150px] font-bold select-none leading-none pointer-events-none">
        ★
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10 space-y-10">
        
        {/* Section Heading */}
        <div className="space-y-2">
          <span className="text-primary-pink text-xs font-bold tracking-wider uppercase bg-primary-pink/10 px-3 py-1 rounded-full">
            Sweet Whispers
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-black text-chocolate-text">
            Loved By Ice Cream Lovers
          </h2>
        </div>

        {/* CLICKABLE AVATAR THUMBNAIL ROW */}
        <div className="flex items-center justify-center gap-3 md:gap-5 pb-4">
          {testimonials.map((test, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={test.id}
                onClick={() => setActiveIndex(idx)}
                className="relative focus:outline-none cursor-pointer"
                title={test.name}
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                  isActive 
                    ? 'border-primary-pink scale-110 shadow-lg' 
                    : 'border-white hover:border-primary-pink/40 hover:scale-105'
                }`}>
                  <img 
                    src={test.avatar} 
                    alt={test.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Active Highlight Ring Dot */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary-pink rounded-full border-2 border-white shadow-sm" />
                )}
              </button>
            );
          })}
        </div>

        {/* TESTIMONIAL DISPLAY CARD */}
        <div className="bg-white border border-cream-bg rounded-[36px] p-8 md:p-12 shadow-xl relative max-w-2xl mx-auto min-h-[280px] flex flex-col justify-between animate-in fade-in duration-300">
          
          {/* Quote Accent Icon */}
          <div className="absolute top-6 left-6 text-primary-pink/10 select-none">
            <Quote className="w-12 h-12 fill-current" />
          </div>

          {/* Testimonial Quote */}
          <div className="space-y-6 relative z-10">
            <p className="text-base sm:text-lg text-chocolate-text font-medium leading-relaxed italic">
              "{current.text}"
            </p>

            {/* Stars row */}
            <div className="flex items-center justify-center gap-1 text-gold-star">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
          </div>

          {/* Customer Metadata */}
          <div className="pt-6 border-t border-cream-bg/60 mt-6 text-center">
            <h4 className="font-display font-black text-chocolate-text text-lg">
              {current.name}
            </h4>
            <p className="text-xs text-primary-pink font-extrabold uppercase tracking-widest mt-0.5">
              {current.role}
            </p>
          </div>

        </div>

        {/* Slide Indicators Dots */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'w-8 bg-primary-pink' : 'w-2.5 bg-chocolate-text/10 hover:bg-primary-pink/40'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
