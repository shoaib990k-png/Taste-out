import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import logoImg from '../../assets/images/branding/tasteout-logo.png';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenPage: (page: string) => void;
  onContactClick: () => void;
  onHomeVariantChange: (variant: number) => void;
}

export default function Header({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenPage,
  onContactClick,
  onHomeVariantChange,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const close = () => setActiveDropdown(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleDropdown = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const ddMenu = 'absolute top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 min-w-[200px]';
  const ddItem = 'w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-[#f83d8e] transition-colors font-normal';

  return (
    <header
      className="relative z-10"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">

          {/* ── LOGO ── */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer shrink-0"
          >
            <img
              src={logoImg}
              alt="Taste Out"
              style={{
                height: '40px',
                width: 'auto',
                objectFit: 'contain',
              }}
            />
            <span
              style={{
                fontFamily: "'Berkshire Swash', serif",
                fontSize: '22px',
                fontWeight: 400,
                color: '#e53e3e',
                lineHeight: 1,
              }}
            >
              Taste Out
            </span>
          </div>

          {/* ── DESKTOP NAV (center) ── */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">

            {/* Home */}
            <div className="relative">
              <button
                onClick={(e) => toggleDropdown('home', e)}
                className="flex items-center gap-0.5 px-3 py-2 text-sm font-medium text-[#f83d8e] hover:text-pink-600 transition-colors cursor-pointer"
                style={{ fontFamily: "'Archivo', sans-serif" }}
              >
                Home
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'home' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'home' && (
                <div onClick={(e) => e.stopPropagation()} className={`${ddMenu} left-0`}>
                  {[
                    { emoji: '🍦', label: 'Home Classic (Vanilla)', v: 1 },
                    { emoji: '🍫', label: 'Home Deluxe (Chocolate)', v: 2 },
                    { emoji: '🍓', label: 'Home Fruity (Strawberry)', v: 3 },
                  ].map(({ emoji, label, v }) => (
                    <button key={v} onClick={() => { onHomeVariantChange(v); window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveDropdown(null); }} className={ddItem}>
                      {emoji} {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* About Us */}
            <button
              onClick={() => scrollToSection('about')}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#f83d8e] transition-colors cursor-pointer"
              style={{ fontFamily: "'Archivo', sans-serif" }}
            >
              About Us
            </button>

            {/* Pages */}
            <div className="relative">
              <button
                onClick={(e) => toggleDropdown('pages', e)}
                className={`flex items-center gap-0.5 px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${activeDropdown === 'pages' ? 'text-[#f83d8e]' : 'text-gray-700 hover:text-[#f83d8e]'}`}
                style={{ fontFamily: "'Archivo', sans-serif" }}
              >
                Pages
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'pages' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'pages' && (
                <div onClick={(e) => e.stopPropagation()} className={`${ddMenu} left-1/2 -translate-x-1/2`}>
                  {[
                    { emoji: '👥', label: 'Our Artisanal Team', page: 'team' },
                    { emoji: '✍️', label: 'Write Product Review', page: 'review' },
                    { emoji: '🏷️', label: 'Special Offers & Coupons', page: 'special_offers' },
                    { emoji: '⏰', label: 'App Coming Soon', page: 'coming_soon' },
                    { emoji: '🔒', label: 'Privacy Policy', page: 'privacy' },
                    { emoji: '📜', label: 'Terms & Conditions', page: 'terms' },
                    { emoji: '⚠️', label: 'Spilled Scoop 404', page: 'err404' },
                  ].map(({ emoji, label, page }) => (
                    <button key={page} onClick={() => { onOpenPage(page); setActiveDropdown(null); }} className={ddItem}>
                      {emoji} {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Blog */}
            <div className="relative">
              <button
                onClick={(e) => toggleDropdown('blog', e)}
                className={`flex items-center gap-0.5 px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${activeDropdown === 'blog' ? 'text-[#f83d8e]' : 'text-gray-700 hover:text-[#f83d8e]'}`}
                style={{ fontFamily: "'Archivo', sans-serif" }}
              >
                Blog
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'blog' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'blog' && (
                <div onClick={(e) => e.stopPropagation()} className={`${ddMenu} left-0`}>
                  <button onClick={() => { scrollToSection('blog'); }} className={ddItem}>📖 Explore Our Blog</button>
                  <button onClick={() => { onOpenPage('coming_soon'); setActiveDropdown(null); }} className={ddItem}>✍️ Load More Columns</button>
                </div>
              )}
            </div>

            {/* Faq's */}
            <button
              onClick={() => onOpenPage('faq')}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#f83d8e] transition-colors cursor-pointer"
              style={{ fontFamily: "'Archivo', sans-serif" }}
            >
              Faq's
            </button>

          </nav>

          {/* ── RIGHT CONTROLS ── */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-gray-500 hover:text-[#f83d8e] transition-colors cursor-pointer"
              title="Search"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            {/* Cart */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-gray-500 hover:text-[#f83d8e] transition-colors cursor-pointer"
              title="Cart"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#f83d8e] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Contact Us */}
            <button
              onClick={onContactClick}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-full transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ml-1"
              style={{
                background: 'linear-gradient(135deg, #f83d8e, #c026d3)',
                fontFamily: "'Archivo', sans-serif",
                boxShadow: '0 3px 22px 3px rgb(248 61 142 / 31%)',
              }}
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-[#f83d8e] transition-colors cursor-pointer ml-1"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* ── MOBILE DRAWER ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-5 space-y-1" style={{ fontFamily: "'Archivo', sans-serif" }}>

            {/* Home variants */}
            <div className="pb-3 mb-1 border-b border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Home Style</p>
              <div className="flex gap-2">
                {[{ label: '🍦 Vanilla', v: 1 }, { label: '🍫 Choc', v: 2 }, { label: '🍓 Berry', v: 3 }].map(({ label, v }) => (
                  <button key={v}
                    onClick={() => { onHomeVariantChange(v); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="flex-1 py-2 text-xs font-semibold rounded-xl border border-gray-200 text-gray-700 hover:border-pink-400 hover:text-[#f83d8e] transition-colors">
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {[
              { label: 'About Us', action: () => scrollToSection('about') },
              { label: 'Shop Categories', action: () => scrollToSection('categories') },
              { label: 'Blog', action: () => scrollToSection('blog') },
              { label: "Faq's", action: () => { onOpenPage('faq'); setMobileMenuOpen(false); } },
              { label: 'Contact Us', action: () => { onContactClick(); setMobileMenuOpen(false); } },
            ].map(({ label, action }) => (
              <button key={label} onClick={action}
                className="w-full text-left px-2 py-3 text-sm font-medium text-gray-700 hover:text-[#f83d8e] border-b border-gray-50 transition-colors">
                {label}
              </button>
            ))}

            <div className="pt-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Pages</p>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { emoji: '👥', label: 'Our Team', page: 'team' },
                  { emoji: '✍️', label: 'Write Review', page: 'review' },
                  { emoji: '🏷️', label: 'Special Offers', page: 'special_offers' },
                  { emoji: '⏰', label: 'Coming Soon', page: 'coming_soon' },
                  { emoji: '🔒', label: 'Privacy Policy', page: 'privacy' },
                  { emoji: '📜', label: 'Terms', page: 'terms' },
                ].map(({ emoji, label, page }) => (
                  <button key={page}
                    onClick={() => { onOpenPage(page); setMobileMenuOpen(false); }}
                    className="text-left px-3 py-2.5 text-xs font-medium text-gray-600 hover:text-[#f83d8e] hover:bg-pink-50 rounded-xl transition-colors">
                    {emoji} {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => { onContactClick(); setMobileMenuOpen(false); }}
                className="w-full py-3.5 text-white font-semibold rounded-full text-sm flex items-center justify-center gap-2 cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #f83d8e, #c026d3)', boxShadow: '0 3px 22px 3px rgb(248 61 142 / 31%)' }}>
                Contact Us <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
