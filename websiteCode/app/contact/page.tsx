// components/ContactSection.tsx
'use client';
import React, { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill out all fields.');
      return;
    }

    setError('');
    setSubmitted(true);

    // Open mail client as fallback
    window.location.href = `mailto:ahselectronicsclubteam@gmail.com?subject=Contact from ${formData.name}&body=${encodeURIComponent(
      formData.message
    )}`;

    // Clear form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold font-display text-forest mb-8">Contact Us</h2>

      {submitted && (
        <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
          Message sent! Check your email client to finish sending.
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-forest mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-teal focus:outline-none"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-forest mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-teal focus:outline-none"
            placeholder="Your email"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-forest mb-1">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-teal focus:outline-none"
            placeholder="Your message"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-teal text-white font-bold rounded-md hover:bg-teal/90 transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}