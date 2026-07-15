import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data';
import { slugify } from '../utils/slug';

export default function BlogPage() {
  useEffect(() => { document.title = 'Blog — Taste Out'; }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 py-10 px-4 sm:px-6 lg:px-8 text-center">
        <h1 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(26px,4vw,44px)', color: '#0f0200', fontWeight: 400 }}>
          Our <em style={{ color: '#e53e3e', fontStyle: 'normal' }}>Blog</em>
        </h1>
        <p className="text-gray-500 text-sm mt-2">Sweet stories, tips, and updates from Taste Out</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {blogPosts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">📖</p>
            <p>No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map(post => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                <Link to={`/blog/${slugify(post.title)}`} className="block aspect-video overflow-hidden bg-pink-50">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1501443715934-62488a258ac6?auto=format&fit=crop&q=80&w=600'; }}
                  />
                </Link>
                <div className="p-5 flex flex-col flex-1 gap-2">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                    <span className="flex items-center gap-1"><User size={11} />{post.author}</span>
                  </div>
                  <Link to={`/blog/${slugify(post.title)}`}>
                    <h2 className="font-bold text-gray-900 hover:text-[#e53e3e] transition-colors leading-snug">{post.title}</h2>
                  </Link>
                  <p className="text-sm text-gray-500 line-clamp-3 flex-1">{post.excerpt}</p>
                  <Link
                    to={`/blog/${slugify(post.title)}`}
                    className="flex items-center gap-1 text-[#e53e3e] font-semibold text-xs hover:underline mt-1 w-fit"
                  >
                    Read More <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
