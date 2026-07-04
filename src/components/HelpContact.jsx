import React, { useState } from 'react';
import { API_BASE_URL } from '../config.js';
import { Send, ArrowLeft, CheckCircle2, MessageSquare, LifeBuoy, AlertCircle } from 'lucide-react';

const HelpContact = ({ onBack }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setErrorMsg('All fields are required.');
      return;
    }
    
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (!res.ok) {
        throw new Error('Failed to submit inquiry. Please try again.');
      }
      
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Help Navbar Header */}
      <div className="bg-white border-b border-ebay-borderGrey shadow-sm py-4 px-6 flex justify-between items-center w-full sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="flex text-2xl font-bold tracking-tighter select-none font-sans mr-2">
            <span className="text-ebay-red">e</span>
            <span className="text-ebay-blue">b</span>
            <span className="text-ebay-yellow">a</span>
            <span className="text-ebay-green">y</span>
          </div>
          <span className="text-sm font-semibold text-ebay-textGrey border-l border-gray-300 pl-3">
            Customer Help Center
          </span>
        </div>

        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs font-bold border border-ebay-dark text-ebay-dark px-4 py-2 rounded-full hover:bg-gray-50 transition cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Store</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full px-4 py-10 flex-grow flex flex-col justify-center">
        
        {submitted ? (
          // Success Screen
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 text-center max-w-lg mx-auto shadow-sm space-y-6 animate-scaleIn text-left">
            <div className="flex justify-center">
              <CheckCircle2 size={56} className="text-ebay-green" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-xl md:text-2xl font-bold text-ebay-dark">Inquiry Submitted Successfully!</h2>
              <p className="text-sm text-ebay-textGrey">
                Thank you for contacting eBay Support. Your inquiry has been sent to our customer care team (Admin Dashboard).
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-xs text-ebay-textGrey space-y-1.5">
              <p><span className="font-semibold text-ebay-dark">Response Time:</span> Typically within 24 hours.</p>
              <p><span className="font-semibold text-ebay-dark">Submission ID:</span> #EB-{Math.floor(Math.random() * 900000 + 100000)}</p>
            </div>
            <button
              onClick={onBack}
              className="w-full bg-ebay-blue hover:bg-blue-700 text-white font-bold py-3 rounded-full text-xs transition duration-200 text-center cursor-pointer shadow-sm"
            >
              Return to Homepage
            </button>
          </div>
        ) : (
          // Form Screen
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Info Cards (Col 5) */}
            <div className="md:col-span-5 space-y-4 text-left">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-ebay-dark flex items-center space-x-2 border-b border-gray-100 pb-3 mb-4">
                  <LifeBuoy size={18} className="text-ebay-blue animate-spin-slow" />
                  <span>eBay Help Center</span>
                </h3>
                <p className="text-xs text-ebay-textGrey leading-relaxed">
                  Have a question about buying, selling, or returns? Fill out our secure contact form to route your inquiry directly to our department managers.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-ebay-textGrey">Typical Help Topics</h4>
                <div className="space-y-3 text-xs text-ebay-dark font-medium">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ebay-blue"></span>
                    <span>Track ordered shipments</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ebay-red"></span>
                    <span>Request returns & refunds</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ebay-yellow"></span>
                    <span>Report listings issues</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ebay-green"></span>
                    <span>Help with account security</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form (Col 7) */}
            <div className="md:col-span-7 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm text-left">
              <h2 className="text-lg md:text-xl font-bold text-ebay-dark mb-1">Contact eBay Support</h2>
              <p className="text-xs text-ebay-textGrey mb-6">We'll review your inquiry and get back to you shortly.</p>

              {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 text-red-800 border border-red-200 rounded-xl text-xs font-semibold flex items-center space-x-2">
                  <AlertCircle size={14} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-ebay-textGrey">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Kumar"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1">Subject of Inquiry *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Question about order shipment / refund"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">Write your Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your query in detail..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-ebay-blue hover:bg-blue-700 text-white font-bold py-3 rounded-full text-xs transition duration-200 flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm disabled:opacity-50 disabled:hover:bg-ebay-blue"
                >
                  <Send size={14} className={isSubmitting ? 'animate-pulse' : ''} />
                  <span>{isSubmitting ? 'Submitting...' : 'Send Message'}</span>
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default HelpContact;
