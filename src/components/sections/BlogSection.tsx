import { Calendar, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '../../data';
import { BlogPost } from '../../types';

interface BlogSectionProps {
  onBlogPostClick: (post: BlogPost) => void;
}

export default function BlogSection({ onBlogPostClick }: BlogSectionProps) {
  return (
    <section id="blog" className="py-20 bg-white relative">
      
      {/* Background decoration */}
      <div className="absolute top-1/3 right-10 w-32 h-32 bg-primary-pink/5 rounded-full filter blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-primary-pink text-xs font-bold tracking-wider uppercase bg-primary-pink/10 px-3 py-1 rounded-full">
            Our Chronicles
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-black text-chocolate-text">
            Delicious Scoop Chronicles
          </h2>
          <p className="text-sm text-body-text-gray font-medium">
            Stay updated with the latest ice cream trends, secret topping combinations, and family events happening in our parlor.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              onClick={() => onBlogPostClick(post)}
              className="bg-cream-bg/25 border border-cream-bg rounded-[32px] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer group"
            >
              
              {/* Cover Image */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <span className="absolute bottom-4 left-4 bg-primary-pink text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  Gourmet News
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2.5">
                  {/* Meta row */}
                  <div className="flex items-center gap-4 text-[11px] text-body-text-gray font-bold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary-pink" />
                      <span>{post.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-primary-pink" />
                      <span>{post.author}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-black text-lg text-chocolate-text leading-snug group-hover:text-primary-pink transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-body-text-gray leading-relaxed font-semibold">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read More button */}
                <div className="pt-4 border-t border-cream-bg flex items-center justify-between text-primary-pink font-extrabold text-xs uppercase tracking-wider group-hover:text-primary-pink-dark">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1.5 transition-transform" />
                </div>

              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
