import { useState } from 'react';
import { Calendar, User, Clock } from 'lucide-react';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Sections
import Hero from './components/sections/Hero';
import AboutSection from './components/sections/AboutSection';
import CategoriesSection from './components/sections/CategoriesSection';
import PromoBanner from './components/sections/PromoBanner';
import Testimonials from './components/sections/Testimonials';
import Newsletter from './components/sections/Newsletter';
import InstagramFeed from './components/sections/InstagramFeed';
import BlogSection from './components/sections/BlogSection';
import ClassicFavoritesSection from './components/sections/ClassicFavoritesSection';
import ProductCarousel from './components/product/ProductCarousel';
import ProductDetailsModal from './components/product/ProductDetailsModal';

// Modals
import CartDrawer from './components/modals/CartDrawer';
import SearchModal from './components/modals/SearchModal';
import PageViews from './components/modals/PageViews';

// Menu
import MenuPopup from './components/menu/MenuPopup';

// Data & Types
import { products, testimonials as initialTestimonials } from './data';
import { Product, CartItem, BlogPost } from './types';

export default function App() {
  // Navigation & Page State
  const [activePage, setActivePage] = useState<string | null>(null); // 'team' | 'faq' | 'privacy' | 'terms' etc.
  const [homeVariant, setHomeVariant] = useState<number>(1); // 1: Vanilla, 2: Chocolate, 3: Strawberry
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Search & Cart States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<string>('');

  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);

  // Blog Details state
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  // Success Notification banner/toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    showToast(`Added ${quantity}x ${product.name} to order 🍦`);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (id: string) => {
    const item = cart.find((i) => i.product.id === id);
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== id));
    if (item) {
      showToast(`Removed ${item.product.name} from order`);
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleApplyPromo = (code: string) => {
    if (code.toUpperCase() === 'SUMMER50') {
      setAppliedPromo('SUMMER50');
      showToast('BOGO Code Applied! Second item gets 50% OFF 🏷️');
      return true;
    }
    return false;
  };

  // Submit a review from review page -> appends in memory (Simulated persistent review)
  const handleNewReview = (review: { name: string; text: string; rating: number; avatar: string }) => {
    const newTestimonial = {
      id: 'custom-' + Date.now(),
      name: review.name,
      role: 'Verified Local Diner',
      text: review.text,
      rating: review.rating,
      avatar: review.avatar
    };
    initialTestimonials.unshift(newTestimonial); // Append to data array dynamically
    showToast('Your loving review is posted! Check our reviews slide below 🌟');
  };

  // Scroll triggers
  const handleScrollToMenu = () => {
    const el = document.getElementById('favorites');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToFooter = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Products filters based on category selection
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const classicFavorites = filteredProducts.filter((p) => p.isClassic || selectedCategory);
  const bestSellers = filteredProducts.filter((p) => p.isBestSeller || selectedCategory);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative min-h-screen text-chocolate-text">
      
      {/* Hero + Navbar share same gradient background */}
      <div style={{ background: 'linear-gradient(140deg, #efd7ef 8%, #f5f9fc 39%, #f8eae1 66%, #eaf8f9 91%)' }}>
        {/* 1. NAVBAR */}
        <Header
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenPage={(page) => setActivePage(page)}
          onContactClick={handleScrollToFooter}
          onHomeVariantChange={(v) => setHomeVariant(v)}
        />

        {/* 2. HERO SECTION */}
        <Hero
          homeVariant={homeVariant}
          onCtaClick={handleScrollToMenu}
          onViewMenuClick={() => setIsMenuPopupOpen(true)}
        />
      </div>

      {/* 3. RELIVE SWEET MEMORIES */}
      <AboutSection 
        onExploreMenuClick={handleScrollToMenu}
      />

      {/* 4. CLASSIC FAVORITES CAROUSEL */}
      <ClassicFavoritesSection
        products={classicFavorites}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* 5. EXPLORE CATEGORIES */}
      <CategoriesSection
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* 6. SUMMER SPECIAL PROMO BANNER */}
      <PromoBanner
        onApplyPromoCode={handleApplyPromo}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 7. BEST SELLERS CAROUSEL */}
      <section id="bestsellers" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-primary-pink text-xs font-bold tracking-wider uppercase bg-primary-pink/10 px-3 py-1 rounded-full">
              Voted best in town
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-chocolate-text">
              Our Best Sellers
            </h2>
            <p className="text-sm text-body-text-gray font-medium">
              These treats sell out within hours! Try them in cones or custom waffle sundaes today.
            </p>
          </div>

          <ProductCarousel
            productsList={bestSellers}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />

        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <Testimonials />

      {/* 9. BLOG SECTION */}
      <BlogSection 
        onBlogPostClick={(post) => setSelectedBlogPost(post)}
      />

      {/* 10. NEWSLETTER SIGNUP */}
      <Newsletter 
        onPrivacyClick={() => setActivePage('privacy')}
      />

      {/* 11. INSTAGRAM FEED */}
      <InstagramFeed />

      {/* 12. FOOTER */}
      <Footer
        onOpenPage={(page) => setActivePage(page)}
        onContactSubmit={(_email, _message) => showToast('Thank you! Your inquiry was sent to the chef.')}
      />

      {/* SUCCESS OVERLAY TOAST */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-chocolate-text text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="w-8 h-8 bg-primary-pink rounded-full flex items-center justify-center text-xs animate-bounce">
            🎉
          </div>
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* ==================================== */}
      {/* OVERLAYS / MODALS ROOT MOUNTINGS */}
      {/* ==================================== */}

      {/* Persistent Shopping Cart Sidebar Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
      />

      {/* Dynamic Header Product Search */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setIsSearchOpen(false);
        }}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      {/* Single Product Details Pop-Up details */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p, q) => {
            handleAddToCart(p, q);
            setSelectedProduct(null);
          }}
        />
      )}

      {/* Secondary Web Pages Views (Team lists, reviews, privacy, 404 spilled cone, coming_soon, etc.) */}
      {activePage && (
        <PageViews
          activePage={activePage}
          onClose={() => setActivePage(null)}
          onSubmitReview={handleNewReview}
        />
      )}

      {/* Menu Popup */}
      <MenuPopup
        isOpen={isMenuPopupOpen}
        onClose={() => setIsMenuPopupOpen(false)}
      />

      {/* Blog Detail modal view overlay */}
      {selectedBlogPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-chocolate-text/60 backdrop-blur-md" onClick={() => setSelectedBlogPost(null)} />
          <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl p-6 md:p-8 border border-cream-bg overflow-hidden z-10 animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedBlogPost(null)}
              className="absolute top-4 right-4 p-2 bg-cream-bg hover:bg-primary-pink/10 rounded-full text-body-text-gray hover:text-primary-pink transition-colors cursor-pointer"
            >
              ×
            </button>
            <div className="space-y-4">
              <img 
                src={selectedBlogPost.image} 
                alt={selectedBlogPost.title} 
                className="w-full h-56 rounded-2xl object-cover shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div className="flex items-center gap-4 text-xs text-body-text-gray font-bold">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary-pink" /> {selectedBlogPost.date}</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-primary-pink" /> By {selectedBlogPost.author}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-primary-pink" /> 4 min read</span>
              </div>
              <h3 className="text-2xl font-display font-black text-chocolate-text">{selectedBlogPost.title}</h3>
              <p className="text-sm text-body-text-gray leading-relaxed font-semibold">
                {selectedBlogPost.excerpt}
              </p>
              <p className="text-sm text-body-text-gray leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam efficitur purus vel velit scelerisque tincidunt. Maecenas tristique lorem eu dui eleifend lacinia. Etiam elementum pretium massa sit amet tincidunt. Suspendisse ac varius sem, non luctus ligula. Aliquam volutpat felis eu ipsum congue, at elementum eros placerat.
              </p>
              <div className="bg-primary-pink/5 border border-primary-pink/10 p-4 rounded-xl flex items-center justify-between">
                <span className="text-xs font-bold text-chocolate-text">Spread the sweetness on socials:</span>
                <span className="text-xs text-primary-pink font-extrabold hover:underline cursor-pointer">Share Article 🔗</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
