import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import logoImg from '../../assets/images/branding/tasteout-logo.png';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About Us' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const closeDrawer = () => setDrawerOpen(false);

  const activeLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-[#e53e3e] font-semibold'
      : 'text-gray-700 hover:text-[#e53e3e] transition-colors';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md border-b border-gray-100' : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Taste Out home">
              <img
                src={logoImg}
                alt="Taste Out"
                style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
              />
              <span
                style={{
                  fontFamily: "'Berkshire Swash', serif",
                  fontSize: '20px',
                  color: '#e53e3e',
                  lineHeight: 1,
                  fontWeight: 400,
                }}
              >
                Taste Out
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'text-[#e53e3e] font-semibold' : 'text-gray-700 hover:text-[#e53e3e]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Search — desktop */}
              <button
                onClick={() => navigate('/menu')}
                className="hidden sm:flex p-2 text-gray-600 hover:text-[#e53e3e] transition-colors rounded-full"
                aria-label="Search products"
              >
                <Search size={20} />
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-600 hover:text-[#e53e3e] transition-colors rounded-full"
                aria-label={`Cart with ${cartCount} items`}
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#e53e3e] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>

              {/* Order Now — desktop */}
              <Link
                to="/menu"
                className="hidden sm:inline-flex items-center gap-1 px-5 py-2 text-white text-sm font-semibold rounded-full transition-all hover:opacity-90 active:scale-95 ml-1"
                style={{ background: 'linear-gradient(135deg, #e53e3e, #f83d8e)' }}
              >
                Order Now
              </Link>

              {/* Hamburger — mobile */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden p-2 text-gray-700 hover:text-[#e53e3e] transition-colors rounded-full"
                aria-label="Open menu"
                aria-expanded={drawerOpen}
              >
                <Menu size={22} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-[min(320px,85vw)] bg-white shadow-2xl lg:hidden flex flex-col transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!drawerOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link to="/" onClick={closeDrawer} className="flex items-center gap-2">
            <img src={logoImg} alt="Taste Out" style={{ height: '32px', width: 'auto' }} />
            <span style={{ fontFamily: "'Berkshire Swash', serif", fontSize: '18px', color: '#e53e3e' }}>
              Taste Out
            </span>
          </Link>
          <button
            onClick={closeDrawer}
            className="p-2 text-gray-500 hover:text-gray-900 rounded-full"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1" aria-label="Mobile navigation">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={closeDrawer}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors min-h-[44px] ${
                  isActive
                    ? 'bg-red-50 text-[#e53e3e] font-semibold'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#e53e3e]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="px-4 pb-6 pt-2">
          <Link
            to="/menu"
            onClick={closeDrawer}
            className="flex items-center justify-center w-full py-3.5 text-white font-semibold rounded-full text-sm min-h-[44px]"
            style={{ background: 'linear-gradient(135deg, #e53e3e, #f83d8e)' }}
          >
            Order Now
          </Link>
        </div>
      </div>

      {/* Spacer so content doesn't hide behind fixed header */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}
