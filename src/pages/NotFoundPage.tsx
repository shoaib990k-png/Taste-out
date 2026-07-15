import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  useEffect(() => { document.title = '404 Not Found — Taste Out'; }, []);
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 px-4 text-center py-20">
      <p className="text-6xl">🍦</p>
      <h1 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(28px,4vw,44px)', color: '#0f0200', fontWeight: 400 }}>
        Oops! Page Not Found
      </h1>
      <p className="text-gray-500 text-sm max-w-sm">
        Looks like this page has melted away. Let's get you back to something delicious.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
        <Link to="/" className="px-6 py-2.5 text-white font-semibold rounded-full hover:opacity-90 text-sm"
          style={{ background: 'linear-gradient(135deg, #e53e3e, #f83d8e)' }}>
          Go Home
        </Link>
        <Link to="/menu" className="px-6 py-2.5 border-2 border-[#e53e3e] text-[#e53e3e] font-semibold rounded-full hover:bg-[#e53e3e] hover:text-white transition-all text-sm">
          Browse Menu
        </Link>
      </div>
    </div>
  );
}
