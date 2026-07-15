import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  useEffect(() => { document.title = 'Terms of Service — Taste Out'; }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 py-10 px-4 sm:px-6 lg:px-8 text-center">
        <h1 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(24px,4vw,40px)', color: '#0f0200', fontWeight: 400 }}>Terms of Service</h1>
        <p className="text-gray-400 text-sm mt-2">Last updated: July 2026</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="font-bold text-gray-800 text-base mb-2">1. Orders</h2>
          <p>All orders placed through our website are confirmed via WhatsApp. An order is only confirmed once our team responds with a confirmation message.</p>
        </section>
        <section>
          <h2 className="font-bold text-gray-800 text-base mb-2">2. Delivery</h2>
          <p>Delivery is available within Karachi. Delivery charges and estimated times will be communicated upon order confirmation. Taste Out is not liable for delays caused by unforeseen circumstances.</p>
        </section>
        <section>
          <h2 className="font-bold text-gray-800 text-base mb-2">3. Payments</h2>
          <p>We accept Cash on Delivery. Payment must be made at the time of delivery. Prices are as listed on the menu and are subject to change without prior notice.</p>
        </section>
        <section>
          <h2 className="font-bold text-gray-800 text-base mb-2">4. Allergens</h2>
          <p>Our products may contain dairy, nuts, gluten, and other allergens. Please inform our team of any allergies before placing an order.</p>
        </section>
        <section>
          <h2 className="font-bold text-gray-800 text-base mb-2">5. Cancellations</h2>
          <p>Orders can be cancelled within 10 minutes of confirmation by contacting us via WhatsApp. Cancellations after preparation has started may not be possible.</p>
        </section>
        <Link to="/" className="inline-block text-[#e53e3e] hover:underline text-sm">← Back to Home</Link>
      </div>
    </div>
  );
}
