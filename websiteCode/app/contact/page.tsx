'use client';
import React, { useState } from 'react';
import PageContainer from '../../components/PageContainer';

// --- In-lined SVG Icons for the contact details ---
const MailIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615A2.25 2.25 0 013 6.993V6.75" />
  </svg>
);
const MapPinIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

export default function ContactPage() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Message sent! (This is a demo)');
    // In a real app, you'd handle form submission here
  };

  return (
    <PageContainer title="Contact Us">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* --- FORM SECTION (LEFT) --- */}
        {/* --- THIS IS THE FIX --- */}
        {/* The form is now wrapped in a bg-white card */}
        <div className="md:col-span-2 bg-white shadow-lg rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Your message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-forest bg-gold hover:bg-gold/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-colors"
              >
                Send Message
              </button>
            </div>

            {/* Status Message */}
            {status && (
              <p className="text-center text-forest">{status}</p>
            )}
          </form>
        </div>

        {/* --- INFO SECTION (RIGHT) --- */}
        {/* This text is dark and will be readable on the gradient */}
        <div className="md:col-span-1 space-y-6">
          <h3 className="text-2xl font-semibold text-forest">Get in Touch</h3>
          <p className="text-gray-700">
            We're always excited to hear from new students, potential mentors, or community partners.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MailIcon className="w-6 h-6 text-forest flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Email</h4>
                <p className="text-gray-700">ahselectronicsclubteam@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPinIcon className="w-6 h-6 text-forest flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Location</h4>
                <p className="text-gray-700">Room E172<br />Atholton High School</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </PageContainer>
  );
}