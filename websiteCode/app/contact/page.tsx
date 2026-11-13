'use client';
import React, { useState } from 'react';
import { Mail, MapPin, Clock, MessageCircle, Calendar } from 'lucide-react';
import PageHero from '../../components/PageHero';
import Button from '../../components/Button';
import { MEETING_INFO } from '../../data/db';

const EMAIL = 'ahselectronicsclubteam@gmail.com';
const GROUPME = 'https://groupme.com/join_group/110257950/WJX63DOF';

export default function ContactPage() {
  const [status, setStatus] = useState('');

  // Opens the visitor's email app with the message pre-filled (no server needed).
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') || '');
    const email = String(form.get('email') || '');
    const message = String(form.get('message') || '');
    const subject = encodeURIComponent(`Message from ${name} via the club website`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setStatus('Opening your email app. If nothing happens, email us directly at ' + EMAIL + '.');
  };

  const field =
    'mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-200';

  return (
    <div>
      <PageHero
        eyebrow="Get in touch"
        title="Come say hi"
        subtitle="New students, potential mentors and community partners are all welcome. Ask a question, propose a collaboration, or just come to a meeting."
        image="/media/photos/electronics-team-bench.jpg"
        imageAlt="Club members at the electronics bench"
        focus="50% 45%"
      >
        <Button href={GROUPME} target="_blank">Join the GroupMe</Button>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="rounded-3xl border border-forest-100 bg-white p-8 shadow-soft lg:col-span-3">
            <h2 className="font-display text-2xl font-bold text-forest-900">Send us a message</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-forest-800">Name</label>
                  <input type="text" name="name" id="name" required placeholder="Your name" className={field} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-forest-800">Email</label>
                  <input type="email" name="email" id="email" required placeholder="you@example.com" className={field} />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-forest-800">Message</label>
                <textarea id="message" name="message" rows={6} required placeholder="How can we help?" className={field}></textarea>
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-buoy-500 px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-buoy-600"
              >
                Send message
              </button>
              {status && <p className="rounded-xl bg-forest-50 p-3 text-center text-sm text-forest-800">{status}</p>}
            </form>
          </div>

          <div className="space-y-5 lg:col-span-2">
            {[
              { icon: MessageCircle, title: 'Fastest way to join', body: <a className="font-semibold text-buoy-600 hover:underline" href={GROUPME} target="_blank" rel="noopener noreferrer">Join our GroupMe</a> },
              { icon: Mail, title: 'Email', body: <a className="break-all hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a> },
              { icon: MapPin, title: 'Location', body: <>Room E172, Atholton High School<br />Columbia, Maryland</> },
              { icon: Clock, title: 'Weekly meeting', body: <>{MEETING_INFO.when}<br />{MEETING_INFO.where}</> },
            ].map((c) => (
              <div key={c.title} className="flex items-start gap-4 rounded-2xl border border-forest-100 bg-white p-5 shadow-soft">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-800 text-mint-300"><c.icon size={20} /></span>
                <div className="text-gray-700">
                  <h3 className="font-display font-bold text-forest-900">{c.title}</h3>
                  <div className="mt-0.5 text-sm leading-relaxed">{c.body}</div>
                </div>
              </div>
            ))}
            <a
              href={MEETING_INFO.calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-forest-800 p-4 font-semibold text-white transition hover:bg-forest-700"
            >
              <Calendar size={18} /> Add our meeting to your calendar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
