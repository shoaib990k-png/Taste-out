import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  useEffect(() => { document.title = 'Privacy Policy — Taste Out'; }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 py-10 px-4 sm:px-6 lg:px-8 text-center">
        <h1 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(24px,4vw,40px)', color: '#0f0200', fontWeight: 400 }}>Privacy Policy</h1>
        <p className="text-gray-400 text-sm mt-2">Last updated: July 2026</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="font-bold text-gray-800 text-base mb-2">1. Information We Collect</h2>
          <p>When you place an order or contact us, we collect your name, phone number, delivery address, and order details. This information is used solely to process and deliver your order.</p>
        </section>
        <section>
          <h2 className="font-bold text-gray-800 text-base mb-2">2. How We Use Your Information</h2>
          <p>Your information is used to confirm your order, arrange delivery, and communicate updates. We do not sell or share your personal data with third parties.</p>
        </section>
        <section>
          <h2 className="font-bold text-gray-800 text-base mb-2">3. Data Storage</h2>
          <p>Orders placed via WhatsApp are stored in WhatsApp's platform. Cart data is stored locally in your browser and is never sent to external servers by our website.</p>
        </section>
        <section>
          <h2 className="font-bold text-gray-800 text-base mb-2">4. Contact</h2>
          <p>For any privacy concerns, contact us at <a href="mailto:info@tasteout.pk" className="text-[#e53e3e] hover:underline">info@tasteout.pk</a>.</p>
        </section>
        <Link to="/" className="inline-block text-[#e53e3e] hover:underline text-sm">← Back to Home</Link>
      </div>
    </div>
  );
}
