import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import CategoriesSection from '../components/sections/CategoriesSection';
import PromoBanner from '../components/sections/PromoBanner';
import Testimonials from '../components/sections/Testimonials';
import MenuPopup from '../components/menu/MenuPopup';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { products, blogPosts } from '../data';
import { slugify } from '../utils/slug';
import { Product } from '../types';
import { Star, ShoppingCart, ArrowRight, Calendar, User } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [menuPopupOpen, setMenuPopupOpen] = useState(false);

  useEffect(() => {
    document.title = 'Taste Out — Classic Ice Cream & Waffles in Karachi';
  }, []);

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    showToast(`${product.name} added to cart 🍦`);
  };

  return (
    <div>
      {/* Hero */}
      <Hero
        homeVariant={1}
        onCtaClick={() => navigate('/menu')}
        onViewMenuClick={() => setMenuPopupOpen(true)}
      />

      {/* Menu Image Popup */}
      <MenuPopup
        isOpen={menuPopupOpen}
        onClose={() => setMenuPopupOpen(false)}
      />

      {/* Categories */}
      <CategoriesSection
        selectedCategory={null}
        onSelectCategory={(cat) => navigate(`/menu?category=${encodeURIComponent(cat || '')}`)}
      />

      {/* Best Sellers */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 400, color: '#0f0200', margin: '0 0 8px' }}>
              Our <em style={{ color: '#e53e3e', fontStyle: 'normal' }}>Best Sellers</em>
            </h2>
            <p className="text-gray-500 text-sm">These treats sell out fast — don't miss out!</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {bestSellers.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                <Link to={`/products/${slugify(product.name)}`} className="block aspect-square overflow-hidden bg-pink-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1501443715934-62488a258ac6?auto=format&fit=crop&q=80&w=400'; }}
                  />
                </Link>
                <div className="p-3 flex flex-col flex-1 gap-1">
                  <div className="flex items-start justify-between gap-1">
                    <Link to={`/products/${slugify(product.name)}`} className="text-sm font-bold text-gray-900 hover:text-[#e53e3e] leading-tight line-clamp-2">
                      {product.name}
                    </Link>
                    <span className="flex items-center gap-0.5 text-[11px] font-bold text-gray-800 shrink-0">
                      <Star size={10} fill="#fbab2a" color="#fbab2a" />
                      {product.rating}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide">{product.category}</p>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-base font-bold text-[#e53e3e]">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 hover:opacity-90 active:scale-90 transition-all"
                      style={{ background: '#683292' }}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingCart size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-7 py-3 text-white font-semibold rounded-full hover:opacity-90 transition-all"
              style={{ background: 'linear-gradient(135deg, #e53e3e, #f83d8e)' }}
            >
              View Full Menu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <PromoBanner
        onApplyPromoCode={() => {}}
        onOpenCart={() => navigate('/cart')}
      />

      {/* About teaser */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 400, color: '#0f0200' }}>
            Made Fresh, Served with <em style={{ color: '#e53e3e', fontStyle: 'normal' }}>Love</em>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Taste Out is Karachi's favourite spot for handcrafted ice creams, waffles and refreshing treats. Every scoop is made fresh with quality ingredients.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-[#e53e3e] text-[#e53e3e] font-semibold rounded-full hover:bg-[#e53e3e] hover:text-white transition-all text-sm"
          >
            Learn More <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Blog teaser */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(22px,3vw,36px)', fontWeight: 400, color: '#0f0200' }}>
              Latest from Our <em style={{ color: '#e53e3e', fontStyle: 'normal' }}>Blog</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map(post => (
              <Link
                key={post.id}
                to={`/blog/${slugify(post.title)}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="aspect-video overflow-hidden bg-pink-50">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                    <span className="flex items-center gap-1"><User size={11} />{post.author}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-[#e53e3e] transition-colors leading-snug text-sm">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#e53e3e] font-semibold hover:underline text-sm"
            >
              View All Blogs <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14" style={{ background: 'linear-gradient(135deg, #e53e3e, #f83d8e)' }}>
        <div className="max-w-2xl mx-auto px-4 text-center space-y-4">
          <h2 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(24px,3.5vw,40px)', color: '#fff', fontWeight: 400 }}>
            Ready to Order?
          </h2>
          <p className="text-white/85 text-sm sm:text-base">Explore our full menu and get your favourites delivered fresh.</p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white font-bold rounded-full hover:bg-gray-50 transition-all text-sm"
            style={{ color: '#e53e3e' }}
          >
            Browse Menu <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
