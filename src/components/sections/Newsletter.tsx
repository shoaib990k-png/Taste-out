import { useState } from 'react';
import { Mail, Sparkles } from 'lucide-react';

interface NewsletterProps {
  onPrivacyClick: () => void;
}

export default function Newsletter({ onPrivacyClick }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setErrorMsg('');

    if (!email) {
      setStatus('error');
      setErrorMsg('Please enter your email address.');
      return;
    }

    if (!agreed) {
      setStatus('error');
      setErrorMsg('Please agree to our Privacy Policy.');
      return;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // Success response simulation
    setStatus('success');
    setEmail('');
    setAgreed(false);
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      
      {/* Background soft grids */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-cream-bg rounded-full filter blur-3xl opacity-65 -z-10" />

      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-cream-bg/30 border border-cream-bg rounded-[40px] p-8 md:p-12 text-center shadow-xl space-y-6 relative overflow-hidden">
          
          {/* Sparkle Floating Indicator */}
          <div className="w-12 h-12 bg-primary-pink/15 rounded-full flex items-center justify-center mx-auto text-primary-pink animate-pulse">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>

          {/* Heading */}
          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-black text-chocolate-text">
              Sign up For Exclusive Deals & Updates
            </h2>
            <p className="text-xs sm:text-sm text-body-text-gray font-medium leading-relaxed">
              Join the IceDelights Sweet Club today and receive a coupon for <b>one free scoop of vanilla or chocolate</b> on your birthday, plus secret recipe sneak peeks!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5 bg-white border border-cream-bg rounded-2xl sm:rounded-full p-1.5 shadow-sm focus-within:border-primary-pink/50 focus-within:shadow-md transition-all">
              
              <div className="flex items-center gap-2 px-3 py-2.5 sm:py-0 flex-1">
                <Mail className="w-5 h-5 text-body-text-gray/50 shrink-0" />
                <input
                  type="email"
                  placeholder="Enter your sweet email address"
                  className="w-full text-sm outline-none text-chocolate-text placeholder:text-body-text-gray/50 font-medium bg-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="py-3 px-7 bg-primary-pink hover:bg-primary-pink-dark text-white text-sm font-extrabold rounded-xl sm:rounded-full shadow transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer shrink-0"
              >
                Subscribe Now
              </button>
            </div>

            {/* Checkbox */}
            <div className="flex items-start justify-center gap-2">
              <input
                id="privacy-agree"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-cream-bg text-primary-pink focus:ring-primary-pink cursor-pointer"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="privacy-agree" className="text-xs text-body-text-gray font-semibold text-left leading-snug cursor-pointer select-none">
                I agree to the{' '}
                <button 
                  type="button"
                  onClick={onPrivacyClick}
                  className="text-primary-pink hover:underline font-bold"
                >
                  Privacy Policy
                </button> and consent to receive emails.
              </label>
            </div>

            {/* Validation Feedback */}
            {status === 'success' && (
              <div className="p-3 bg-green-50 text-green-700 text-xs font-bold rounded-2xl border border-green-150 animate-in fade-in duration-200">
                🎉 Subscribed! Check your inbox for your free scoop coupon!
              </div>
            )}

            {status === 'error' && (
              <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-2xl border border-red-150 animate-in fade-in duration-200">
                ⚠️ {errorMsg}
              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}
