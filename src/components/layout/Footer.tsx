import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import logoImg from '../../assets/images/branding/tasteout-logo.png';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a0a0a] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoImg} alt="Taste Out" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
              <span style={{ fontFamily: "'Berkshire Swash', serif", fontSize: '20px', color: '#e53e3e' }}>
                Taste Out
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Fresh, handcrafted ice creams and waffles made with love in Karachi. Quality ingredients, unforgettable flavors.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#e53e3e] flex items-center justify-center transition-colors"
                aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#e53e3e] flex items-center justify-center transition-colors"
                aria-label="Facebook">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/menu', label: 'Menu' },
                { to: '/about', label: 'About Us' },
                { to: '/blog', label: 'Blog' },
                { to: '/contact', label: 'Contact' },
                { to: '/cart', label: 'Cart' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin size={15} className="shrink-0 mt-0.5 text-[#e53e3e]" />
                <span>Karachi, Pakistan</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone size={15} className="shrink-0 text-[#e53e3e]" />
                <a href="tel:+923001234567" className="hover:text-white transition-colors">
                  +92 300 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail size={15} className="shrink-0 text-[#e53e3e]" />
                <a href="mailto:info@tasteout.pk" className="hover:text-white transition-colors">
                  info@tasteout.pk
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Opening Hours</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Clock size={14} className="shrink-0 mt-0.5 text-[#e53e3e]" />
                <div>
                  <p>Mon – Thu: 12pm – 11pm</p>
                  <p>Fri – Sat: 12pm – 12am</p>
                  <p>Sunday: 2pm – 11pm</p>
                </div>
              </li>
            </ul>
            <Link
              to="/menu"
              className="inline-flex mt-4 px-5 py-2 text-sm font-semibold text-white rounded-full transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #e53e3e, #f83d8e)' }}
            >
              Order Now
            </Link>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {year} Taste Out. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
