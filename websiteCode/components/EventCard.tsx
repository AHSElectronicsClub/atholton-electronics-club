import React from 'react';
import type { Event } from '../data/types';

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="bg-off-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      <div className="flex-shrink-0 w-full md:w-40 flex flex-col items-center justify-center bg-dark-gray text-off-white p-6 text-center">
        <span className="text-2xl font-bold block">{event.date}</span>
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold font-display text-forest mb-2">{event.title}</h3>
        <div className="text-gray-600 text-sm space-y-1 mb-4">
          <p><strong>When:</strong> {event.time}</p>
          <p><strong>Where:</strong> {event.location}</p>
        </div>
        <p className="text-gray-700 text-sm mb-6">{event.description}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          {/*<button
            onClick={() => alert('RSVP modal would open here.')}
            className="px-4 py-2 bg-teal text-forest rounded-md"
          >
            Reserve Spot
          </button>*/}
          <a
            href={event.calendarLink} // <-- Now it's dynamic
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border-2 border-gold text-gold rounded-md hover:bg-gold/10"
          >
            Add to Calendar
          </a>
        </div>
      </div>
    </div>
  );
}