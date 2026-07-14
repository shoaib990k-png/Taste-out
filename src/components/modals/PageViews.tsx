import { useState } from 'react';
import { X, Calendar, Star, Send } from 'lucide-react';
import { teamMembers, faqs } from '../../data';

interface PageViewsProps {
  activePage: string | null; // e.g. 'team' | 'faq' | 'terms' | 'privacy' | 'coming_soon' | 'special_offers' | 'err404'
  onClose: () => void;
  onSubmitReview?: (review: { name: string; text: string; rating: number; avatar: string }) => void;
}

export default function PageViews({ activePage, onClose, onSubmitReview }: PageViewsProps) {
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(0);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!activePage) return null;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewText) return;

    if (onSubmitReview) {
      onSubmitReview({
        name: reviewName,
        text: reviewText,
        rating: reviewRating,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150' // Default avatar
      });
    }

    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setReviewName('');
      setReviewText('');
      setReviewRating(5);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-chocolate-text/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-[32px] shadow-2xl border border-cream-bg z-10 p-6 md:p-10 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-cream-bg hover:bg-primary-pink/10 rounded-full text-body-text-gray hover:text-primary-pink transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* View Switcher */}
        
        {/* 1. TEAM VIEW */}
        {activePage === 'team' && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-primary-pink text-xs font-bold tracking-wider uppercase bg-primary-pink/10 px-3 py-1 rounded-full">
                Behind the Counter
              </span>
              <h2 className="text-3xl font-display font-extrabold text-chocolate-text mt-2">
                Meet Our Artisanal Team
              </h2>
              <p className="text-sm text-body-text-gray max-w-md mx-auto mt-1">
                The masterminds crafting the fluffiest creams, baking crispy waffle cones, and serving happy memories daily.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="bg-cream-bg/30 border border-cream-bg p-5 rounded-2xl text-center group hover:shadow-md transition-all">
                  <div className="relative w-28 h-28 mx-auto mb-4 overflow-hidden rounded-full border-4 border-white shadow-md group-hover:border-primary-pink transition-colors">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="font-display font-bold text-chocolate-text leading-tight">{member.name}</h3>
                  <p className="text-xs text-primary-pink font-extrabold uppercase tracking-wide mt-1">{member.role}</p>
                  <p className="text-xs text-body-text-gray mt-2 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. FAQ VIEW */}
        {activePage === 'faq' && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-primary-pink text-xs font-bold tracking-wider uppercase bg-primary-pink/10 px-3 py-1 rounded-full">
                Got Questions?
              </span>
              <h2 className="text-3xl font-display font-extrabold text-chocolate-text mt-2">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-body-text-gray max-w-md mx-auto mt-1">
                Everything you need to know about our fresh milk scoop formula, vegan selections, and local delivery.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              {faqs.map((faq, idx) => {
                const isOpen = faqOpenIdx === idx;
                return (
                  <div 
                    key={idx}
                    className="border border-cream-bg bg-cream-bg/15 rounded-2xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setFaqOpenIdx(isOpen ? null : idx)}
                      className="w-full text-left p-5 flex items-center justify-between font-bold font-display text-chocolate-text hover:text-primary-pink transition-colors focus:outline-none"
                    >
                      <span>{faq.question}</span>
                      <span className="text-lg font-bold text-primary-pink">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="p-5 pt-0 text-sm text-body-text-gray border-t border-cream-bg/40 leading-relaxed bg-white">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. REVIEW VIEW */}
        {activePage === 'review' && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-primary-pink text-xs font-bold tracking-wider uppercase bg-primary-pink/10 px-3 py-1 rounded-full">
                Share the Sweetness
              </span>
              <h2 className="text-3xl font-display font-extrabold text-chocolate-text mt-2">
                Leave a Love Note
              </h2>
              <p className="text-sm text-body-text-gray max-w-md mx-auto mt-1">
                Your feedback helps us handcraft even better flavors. Leave us a review!
              </p>
            </div>

            {reviewSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-green-50 border-4 border-green-400 rounded-full flex items-center justify-center mx-auto text-green-500 animate-bounce">
                  <CheckCircleIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-bold text-chocolate-text">Thank You So Much!</h3>
                <p className="text-sm text-body-text-gray">Your review was posted to our testimonials slider successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4 pt-4 max-w-md mx-auto">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-chocolate-text uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full p-3 border border-cream-bg bg-cream-bg/10 rounded-2xl text-sm focus:border-primary-pink outline-none text-chocolate-text font-medium"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-chocolate-text uppercase block">Your Star Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1 text-gold-star hover:scale-110 transition-transform"
                      >
                        <Star className={`w-7 h-7 ${star <= reviewRating ? 'fill-current' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-chocolate-text uppercase">Review Content</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your favorite flavors or experience..."
                    className="w-full p-3 border border-cream-bg bg-cream-bg/10 rounded-2xl text-sm focus:border-primary-pink outline-none text-chocolate-text resize-none font-medium leading-relaxed"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary-pink hover:bg-primary-pink-dark text-white font-bold rounded-full shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Review</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* 4. PRIVACY / TERMS */}
        {(activePage === 'privacy' || activePage === 'terms') && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-primary-pink text-xs font-bold tracking-wider uppercase bg-primary-pink/10 px-3 py-1 rounded-full">
                Regulatory Agreements
              </span>
              <h2 className="text-3xl font-display font-extrabold text-chocolate-text mt-2">
                {activePage === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h2>
              <p className="text-xs text-body-text-gray font-mono">Last modified: July 12, 2026</p>
            </div>

            <div className="p-6 bg-cream-bg/30 border border-cream-bg rounded-2xl max-h-[350px] overflow-y-auto text-sm text-body-text-gray space-y-4 leading-relaxed font-medium">
              <p>Welcome to IceDelights Ice Cream Parlor. Your privacy and satisfaction are central to our gourmet values. We treat all local order credentials, delivery coordinates, and payment handshakes with high grade security protocols.</p>
              
              <h4 className="font-bold text-chocolate-text mt-2 text-base">1. Ordering and Deliveries</h4>
              <p>By placing an order via our dessert van dispatcher, you confirm that your coordinates are accessible. If the cream melting threshold is breached during transit, a replacement BOGO coupon will be dispatched instantly.</p>
              
              <h4 className="font-bold text-chocolate-text mt-2 text-base">2. Promotional Codes</h4>
              <p>The code "SUMMER50" enables a buy one sundae get one 50% discount. It must be input inside the order drawer. It cannot be bartered for tangible currencies or raw chocolate bars.</p>

              <h4 className="font-bold text-chocolate-text mt-2 text-base">3. Allergen Alerts</h4>
              <p>Our kitchen processes dairy, peanuts, almonds, soy, and gluten. Please inform our Master Gelatiere in case of acute dietary hyper-sensitivity.</p>
            </div>
          </div>
        )}

        {/* 5. COMING SOON */}
        {activePage === 'coming_soon' && (
          <div className="space-y-6 text-center py-6">
            <div className="w-16 h-16 bg-primary-pink/10 rounded-full flex items-center justify-center mx-auto text-primary-pink">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <span className="text-primary-pink text-xs font-bold tracking-wider uppercase bg-primary-pink/10 px-3 py-1 rounded-full">
                Whipping up new treats
              </span>
              <h2 className="text-3xl font-display font-extrabold text-chocolate-text mt-2">
                IceDelights Mobile App
              </h2>
              <p className="text-sm text-body-text-gray max-w-sm mx-auto mt-2 leading-relaxed">
                Track our ice cream vans in real-time, gain Loyalty Melt Points, and custom pre-mix sundaes straight from your phone!
              </p>
            </div>

            {/* Simulated Countdown */}
            <div className="flex justify-center gap-4 pt-2">
              <div className="bg-cream-bg/40 border border-cream-bg p-3.5 rounded-2xl w-16 text-center">
                <span className="block text-xl font-black text-primary-pink">18</span>
                <span className="text-[10px] text-body-text-gray font-bold">DAYS</span>
              </div>
              <div className="bg-cream-bg/40 border border-cream-bg p-3.5 rounded-2xl w-16 text-center">
                <span className="block text-xl font-black text-primary-pink">04</span>
                <span className="text-[10px] text-body-text-gray font-bold">HOURS</span>
              </div>
              <div className="bg-cream-bg/40 border border-cream-bg p-3.5 rounded-2xl w-16 text-center">
                <span className="block text-xl font-black text-primary-pink">29</span>
                <span className="text-[10px] text-body-text-gray font-bold">MINS</span>
              </div>
            </div>
          </div>
        )}

        {/* 6. SPILLED SCOOP 404 PAGE */}
        {activePage === 'err404' && (
          <div className="space-y-6 text-center py-6">
            {/* Custom vector illustration of spilled scoop on floor */}
            <div className="relative w-40 h-40 mx-auto">
              <div className="absolute inset-x-0 bottom-2 h-4 bg-primary-pink/20 rounded-full filter blur-md" />
              {/* Spilled pink ice cream scoop */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-10 bg-primary-pink rounded-full flex items-center justify-center text-white font-extrabold text-xs shadow-md">
                Spilled Splash!
              </div>
              {/* Upside down waffle cone */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-20 bg-amber-600 rounded-b-full rounded-t-lg origin-bottom -rotate-45 flex items-center justify-center border-2 border-dashed border-amber-800 text-white font-bold text-xs select-none shadow">
                ▼ Cone
              </div>
              <div className="absolute top-24 left-12 w-3 h-3 bg-primary-pink rounded-full animate-ping" />
              <div className="absolute top-12 right-12 w-4 h-4 text-amber-500 font-extrabold">⚡</div>
            </div>

            <div>
              <span className="text-primary-pink text-xs font-bold tracking-wider uppercase bg-primary-pink/10 px-3 py-1 rounded-full">
                Oops! Error 404
              </span>
              <h2 className="text-3xl font-display font-extrabold text-chocolate-text mt-2">
                We Spilled Your Scoop!
              </h2>
              <p className="text-sm text-body-text-gray max-w-sm mx-auto mt-2 leading-relaxed">
                The webpage you are licking for doesn't exist. It might have melted away or slid off the cone.
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-3 bg-chocolate-text hover:bg-primary-pink text-white font-bold rounded-full shadow-md transition-colors text-sm cursor-pointer"
            >
              Back to Safety
            </button>
          </div>
        )}

        {/* 7. SPECIAL OFFERS */}
        {activePage === 'special_offers' && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-primary-pink text-xs font-bold tracking-wider uppercase bg-primary-pink/10 px-3 py-1 rounded-full">
                Special Offers
              </span>
              <h2 className="text-3xl font-display font-extrabold text-chocolate-text mt-2">
                Active Promo Bundles
              </h2>
              <p className="text-sm text-body-text-gray max-w-md mx-auto mt-1">
                Take advantage of our limited-time summer specials. Apply the codes during checkout!
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="p-5 border border-dashed border-primary-pink bg-primary-pink/5 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <span className="text-xs font-bold text-primary-pink bg-primary-pink/15 px-2.5 py-0.5 rounded-full uppercase">
                    BOGO Deal
                  </span>
                  <h3 className="font-display font-bold text-chocolate-text text-lg mt-1">Buy 1 Get 1 50% Off</h3>
                  <p className="text-xs text-body-text-gray mt-0.5">Applies to all cones and gourmet loaded sundaes in your sweet cart.</p>
                </div>
                <div className="bg-white border-2 border-dashed border-primary-pink px-4 py-2.5 rounded-2xl text-center">
                  <span className="block text-xs font-bold text-body-text-gray uppercase">USE CODE</span>
                  <span className="font-mono text-lg font-black text-primary-pink tracking-widest uppercase">SUMMER50</span>
                </div>
              </div>

              <div className="p-5 border border-dashed border-mint-accent bg-mint-accent/10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <span className="text-xs font-bold text-mint-accent bg-mint-accent/20 px-2.5 py-0.5 rounded-full uppercase">
                    Locals Treat
                  </span>
                  <h3 className="font-display font-bold text-chocolate-text text-lg mt-1">Free Delivery on Orders Over $15</h3>
                  <p className="text-xs text-body-text-gray mt-0.5">Valid in Melbourne metro areas. Applied automatically to your cart.</p>
                </div>
                <div className="bg-white border-2 border-dashed border-mint-accent px-4 py-2.5 rounded-2xl text-center">
                  <span className="block text-xs font-bold text-body-text-gray uppercase">USE CODE</span>
                  <span className="font-mono text-lg font-black text-mint-accent tracking-widest uppercase">AUTOMATIC</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Inline fallback checkmark icon to avoid import delays
function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className="w-full h-full"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
