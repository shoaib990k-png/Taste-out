import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Star, Leaf } from 'lucide-react';
import reliveImage from '../assets/images/about/relive-image.png';

export default function AboutPage() {
  useEffect(() => { document.title = 'About Us — Taste Out'; }, []);

  const values = [
    { icon: <Heart size={22} color="#f83d8e" />, title: 'Made with Love', desc: 'Every scoop and waffle is prepared with care and passion for great food.' },
    { icon: <Leaf size={22} color="#22c55e" />, title: 'Fresh Ingredients', desc: 'We use quality, fresh ingredients to ensure the best taste in every bite.' },
    { icon: <Star size={22} color="#fbab2a" />, title: 'Customer Delight', desc: 'Your happiness is our priority. We strive to exceed expectations every visit.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(28px,4vw,48px)', color: '#0f0200', fontWeight: 400 }}>
            About <em style={{ color: '#f83d8e', fontStyle: 'normal' }}>Taste Out</em>
          </h1>
          <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Karachi's favourite destination for handcrafted ice creams, Belgian waffles, and delightful frozen treats.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="rounded-2xl overflow-hidden shadow-md aspect-square max-w-md mx-auto w-full bg-pink-50">
              <img
                src={reliveImage}
                alt="Taste Out - handcrafted ice cream"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#f83d8e] bg-pink-50 px-3 py-1 rounded-full uppercase tracking-wider">
                Our Story
              </span>
              <h2 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(22px,3vw,36px)', color: '#0f0200', fontWeight: 400 }}>
                Born from a Passion for Sweet Moments
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Taste Out began with a simple idea: to bring joy through fresh, handcrafted ice creams and waffles made the right way. Located in the heart of Karachi, we've been serving smiles to families, friends, and sweet lovers since day one.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                We believe great desserts come from great ingredients. That's why everything at Taste Out is made fresh — from our creamy ice cream bases to our crispy waffle batter.
              </p>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-white font-semibold rounded-full hover:opacity-90 transition-all text-sm"
                style={{ background: 'linear-gradient(135deg, #e53e3e, #f83d8e)' }}
              >
                See Our Menu <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(22px,3vw,34px)', color: '#0f0200', fontWeight: 400, marginBottom: '40px' }}>
            What Makes Us <em style={{ color: '#f83d8e', fontStyle: 'normal' }}>Different</em>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto">
                  {v.icon}
                </div>
                <h3 className="font-bold text-gray-800">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white text-center px-4">
        <h2 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(20px,3vw,32px)', color: '#0f0200', fontWeight: 400, marginBottom: '12px' }}>
          Ready to taste the difference?
        </h2>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-8 py-3 text-white font-semibold rounded-full hover:opacity-90 transition-all text-sm"
          style={{ background: 'linear-gradient(135deg, #e53e3e, #f83d8e)' }}
        >
          Explore Full Menu <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}
