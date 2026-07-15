import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';

const WHATSAPP_NUMBER = '923001234567';

export default function ContactPage() {
  useEffect(() => { document.title = 'Contact Us — Taste Out'; }, []);

  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleWhatsApp = () => {
    if (!validate()) return;
    const msg = `*New Enquiry — Taste Out*\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || 'N/A'}\nSubject: ${form.subject || 'General Enquiry'}\n\nMessage:\n${form.message}`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-10 px-4 sm:px-6 lg:px-8 text-center">
        <h1 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(26px,4vw,44px)', color: '#0f0200', fontWeight: 400 }}>
          Contact <em style={{ color: '#f83d8e', fontStyle: 'normal' }}>Us</em>
        </h1>
        <p className="text-gray-500 text-sm mt-2">We'd love to hear from you — reach out anytime!</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
              <h2 className="font-bold text-gray-800 text-base">Get in Touch</h2>

              {[
                { icon: <MapPin size={18} color="#e53e3e" />, label: 'Location', value: 'Karachi, Pakistan' },
                { icon: <Phone size={18} color="#e53e3e" />, label: 'Phone', value: '+92 300 123 4567', href: 'tel:+923001234567' },
                { icon: <Mail size={18} color="#e53e3e" />, label: 'Email', value: 'info@tasteout.pk', href: 'mailto:info@tasteout.pk' },
                { icon: <Clock size={18} color="#e53e3e" />, label: 'Hours', value: 'Mon–Thu: 12pm–11pm\nFri–Sat: 12pm–12am\nSun: 2pm–11pm' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-gray-700 hover:text-[#e53e3e] transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-sm text-gray-700 whitespace-pre-line">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl text-white font-semibold text-sm hover:opacity-90 transition-all"
              style={{ background: '#25d366' }}
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-800 text-base mb-6">Send a Message</h2>
            <div className="space-y-4">
              {[
                { field: 'name', label: 'Full Name *', type: 'text', placeholder: 'Your name' },
                { field: 'phone', label: 'Phone Number *', type: 'tel', placeholder: '+92 300 000 0000' },
                { field: 'email', label: 'Email (optional)', type: 'email', placeholder: 'your@email.com' },
                { field: 'subject', label: 'Subject', type: 'text', placeholder: 'How can we help?' },
              ].map(({ field, label, type, placeholder }) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
                  <input
                    id={field}
                    type={type}
                    placeholder={placeholder}
                    value={form[field as keyof typeof form]}
                    onChange={e => update(field, e.target.value)}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#f83d8e] transition-colors ${errors[field] ? 'border-red-400' : 'border-gray-200'}`}
                    aria-describedby={errors[field] ? `${field}-error` : undefined}
                  />
                  {errors[field] && <p id={`${field}-error`} className="text-xs text-red-500 mt-1">{errors[field]}</p>}
                </div>
              ))}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-gray-600 mb-1.5">Message *</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us what's on your mind..."
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-[#f83d8e] transition-colors resize-none ${errors.message ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              <p className="text-xs text-gray-400">
                Your message will be sent directly via WhatsApp for the fastest response.
              </p>

              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-full hover:opacity-90 transition-all text-sm min-h-[44px]"
                style={{ background: 'linear-gradient(135deg, #e53e3e, #f83d8e)' }}
              >
                <Send size={15} /> Send via WhatsApp
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
