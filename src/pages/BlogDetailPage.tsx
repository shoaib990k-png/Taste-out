import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data';
import { slugify } from '../utils/slug';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => slugify(p.title) === slug);
  const related = post ? blogPosts.filter(p => p.id !== post.id).slice(0, 2) : [];

  useEffect(() => {
    document.title = post ? `${post.title} — Taste Out Blog` : 'Article Not Found — Taste Out';
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center py-20">
        <p className="text-5xl">📖</p>
        <h1 className="text-2xl font-bold text-gray-800">Article Not Found</h1>
        <p className="text-gray-500 text-sm">This article doesn't exist or may have been moved.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#e53e3e] text-white font-semibold rounded-full hover:opacity-90 text-sm">
          <ArrowLeft size={15} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex items-center gap-2 text-xs text-gray-500">
          <Link to="/" className="hover:text-[#e53e3e] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-[#e53e3e] transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-700 truncate max-w-[200px]">{post.title}</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#e53e3e] mb-6 transition-colors">
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden aspect-video bg-pink-50 mb-6 shadow-sm">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
          <span className="flex items-center gap-1"><User size={12} />By {post.author}</span>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(22px,3.5vw,36px)', color: '#0f0200', fontWeight: 400, lineHeight: 1.3, marginBottom: '16px' }}>
          {post.title}
        </h1>

        {/* Content */}
        <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-4">
          <p className="font-medium text-gray-700">{post.excerpt}</p>
          <p>
            At Taste Out, we are passionate about bringing you the finest frozen treats made with love and quality ingredients. Every product we create is a result of careful selection of flavours, fresh ingredients, and a dedication to making your experience unforgettable.
          </p>
          <p>
            Whether you are stopping by for a quick scoop or treating your family to a full dessert experience, we make sure every visit is special. Our team works hard to maintain the quality and freshness that our customers have come to love.
          </p>
          <p>
            We continuously experiment with seasonal flavours and new combinations to keep our menu exciting and fresh. Stay tuned to our blog for the latest updates, flavour launches, and special offers.
          </p>
        </div>

        {/* Share */}
        <div className="mt-8 p-4 bg-pink-50 rounded-xl flex items-center justify-between flex-wrap gap-3">
          <span className="text-sm font-semibold text-gray-700">Enjoyed this article?</span>
          <Link to="/menu" className="inline-flex items-center gap-1.5 text-sm text-[#e53e3e] font-semibold hover:underline">
            Try our Menu <ArrowRight size={14} />
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-bold text-gray-800 text-base mb-5">More Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map(r => (
                <Link
                  key={r.id}
                  to={`/blog/${slugify(r.title)}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex gap-3 p-3"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-pink-50 shrink-0">
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <p className="text-xs font-bold text-gray-800 group-hover:text-[#e53e3e] transition-colors line-clamp-2">{r.title}</p>
                    <p className="text-xs text-gray-400">{r.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
