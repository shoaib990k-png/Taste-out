import { useState } from 'react';
import { Facebook, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenPage: (page: string) => void;
  onContactSubmit: (email: string, message: string) => void;
}

export default function Footer({ onOpenPage, onContactSubmit }: FooterProps) {
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMessage) return;
    
    onContactSubmit(contactEmail, contactMessage);
    setContactSuccess(true);
    setContactEmail('');
    setContactMessage('');
    setTimeout(() => setContactSuccess(false), 3000);
  };

  return (
    <footer id="contact" className="bg-footer-bg text-footer-text relative overflow-hidden pt-20 pb-10">
      
      {/* LARGE FADED VECTOR GRAPHIC IN BACKGROUND */}
      <div className="absolute right-[-40px] bottom-[-40px] text-white/[0.03] select-none pointer-events-none select-none z-0 text-[350px] leading-none font-bold">
        🍦
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-16">
        
        {/* UPPER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand Logo & Tagline */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-11 h-11 bg-primary-pink rounded-full flex items-center justify-center text-xl shadow-md">
                🍦
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-display font-black text-white leading-none tracking-tight">
                  Ice<span className="text-primary-pink">Delights</span>
                </h3>
                <span className="text-[9px] font-bold text-footer-text/60 tracking-widest uppercase">Classic Parlor</span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-footer-text/75 leading-relaxed max-w-sm">
              Making Melbourne sweet since 1994. Handcrafting slow-churned grass-fed milk gelato scoop creations and warm loaded waffle sundaes fresh every day.
            </p>

            {/* Social Icons row */}
            <div className="flex items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-primary-pink text-footer-text hover:text-white rounded-full flex items-center justify-center border border-white/10 hover:border-primary-pink transition-all duration-300"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-primary-pink text-footer-text hover:text-white rounded-full flex items-center justify-center border border-white/10 hover:border-primary-pink transition-all duration-300"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-primary-pink text-footer-text hover:text-white rounded-full flex items-center justify-center border border-white/10 hover:border-primary-pink transition-all duration-300"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-black text-white text-base tracking-wide border-b border-white/10 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-primary-pink transition-colors cursor-pointer text-left">
                  Home Classic
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="hover:text-primary-pink transition-colors cursor-pointer text-left">
                  About Us Story
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('categories')} className="hover:text-primary-pink transition-colors cursor-pointer text-left">
                  Shop Categories
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPage('team')} className="hover:text-primary-pink transition-colors cursor-pointer text-left">
                  Meet Our Team
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPage('faq')} className="hover:text-primary-pink transition-colors cursor-pointer text-left">
                  Faq's Accordion
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Products / Legal */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-black text-white text-base tracking-wide border-b border-white/10 pb-2">
              Our Products
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold">
              <li>
                <button onClick={() => scrollToSection('favorites')} className="hover:text-primary-pink transition-colors cursor-pointer text-left">
                  Classic Favorites
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('bestsellers')} className="hover:text-primary-pink transition-colors cursor-pointer text-left">
                  Best Seller Scoops
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPage('special_offers')} className="hover:text-primary-pink transition-colors cursor-pointer text-left">
                  Special Coupons
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPage('privacy')} className="hover:text-primary-pink transition-colors cursor-pointer text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPage('terms')} className="hover:text-primary-pink transition-colors cursor-pointer text-left">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info Details */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-display font-black text-white text-base tracking-wide border-b border-white/10 pb-2">
              Got Questions?
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm font-medium">
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-pink shrink-0 mt-0.5" />
                <span className="text-footer-text/85">121 King Street, Melbourne, VIC 3000, Australia</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-pink shrink-0" />
                <a href="mailto:info@icedelights.com" className="hover:text-primary-pink transition-colors">info@icedelights.com</a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-pink shrink-0" />
                <a href="tel:+568925896325" className="hover:text-primary-pink transition-colors font-bold">+5689 2589 6325</a>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1.5">
                <p className="text-xs font-black text-primary-pink uppercase tracking-wider">Hotline Open 24/7</p>
                <p className="text-[11px] text-footer-text/75 leading-tight">Call our dispatchers for rush corporate event ice cream deliveries!</p>
              </div>

            </div>
          </div>

        </div>

        {/* INTERACTIVE COMPREHENSIVE CONTACT HOTLINE FORM */}
        <div className="pt-10 border-t border-white/10 max-w-xl mx-auto text-center space-y-4">
          <h4 className="font-display font-black text-white text-lg">Send Us a Sweet Message</h4>
          <p className="text-xs text-footer-text/75">Have specific dietary allergen requests or want to hire our dessert vans?</p>
          
          <form onSubmit={handleSendMessage} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="email"
                required
                placeholder="Your email address *"
                className="w-full p-3.5 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder:text-footer-text/40 outline-none focus:border-primary-pink transition-colors"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="What can we mix for you? *"
                className="w-full p-3.5 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder:text-footer-text/40 outline-none focus:border-primary-pink transition-colors"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-primary-pink hover:bg-primary-pink-dark text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            >
              Send Message ✉️
            </button>
            {contactSuccess && (
              <p className="text-xs text-green-400 font-bold">🎉 Message delivered! Our Master Gelatiere will reply in under 2 hours.</p>
            )}
          </form>
        </div>

        {/* LOWER COPYRIGHT BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-footer-text/60 font-semibold">
          <p>Copyright © 2026 icedelights All rights reserved.</p>
          <div className="flex gap-4">
            <button onClick={() => onOpenPage('privacy')} className="hover:text-primary-pink transition-colors cursor-pointer">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => onOpenPage('terms')} className="hover:text-primary-pink transition-colors cursor-pointer">Terms of Service</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
