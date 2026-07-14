import { instagramPics } from '../../data';

export default function InstagramFeed() {
  return (
    <section className="py-12 bg-cream-bg/30 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl md:text-3xl font-display font-black text-chocolate-text">
            Follow Us on Instagram
          </h2>
          <p className="text-xs sm:text-sm text-body-text-gray font-bold">
            Snap, tag, and share your sweet scoops with us using{' '}
            <span className="text-primary-pink font-extrabold hover:underline cursor-pointer">@IceDelights_Classic</span>
          </p>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {instagramPics.map((src, idx) => (
            <div 
              key={idx}
              className="relative aspect-square rounded-[24px] overflow-hidden group shadow-md cursor-pointer"
            >
              {/* Instagram Photo */}
              <img 
                src={src} 
                alt={`IceDelights Instagram post ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Hover Dark Overlay & Icon */}
              <div className="absolute inset-0 bg-chocolate-text/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white space-y-2">
                {/* Custom SVG Instagram Icon */}
                <div className="p-3 bg-white/20 backdrop-blur-xs rounded-full scale-90 group-hover:scale-100 transition-transform duration-300">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-5 h-5 text-white"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-cream-bg">View Post</span>
                <span className="text-[11px] text-white/85 font-medium leading-none">❤️ 421 Likes</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
