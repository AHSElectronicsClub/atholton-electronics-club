import React from 'react';

// Define the prop types based on what we see in the screenshot
type EventCardProps = {
  event: {
    id: number;
    title: string;
    date: string; // e.g., "Every Wednesday" or "Friday, November 14, 2025"
    time: string;
    location: string;
    description: string;
  };
};

export default function EventCard({ event }: EventCardProps) {
  return (
    // Main container: shadow, rounded corners, and FLEX layout
    <div className="bg-white shadow-lg rounded-xl flex flex-row overflow-hidden">
      
      {/* Left Side: Date Block */}
      {/* Using w-40 (10rem) for a fixed width. Using dark-gray from your tailwind.config */}
      <div className="w-40 bg-dark-gray text-white p-6 flex flex-col justify-center items-center text-center">
        
        {/* This splits the date string ("Friday, November 14, 2025") into parts */}
        {event.date.split(', ').map((part, index) => (
          <span 
            key={index}
            // Makes the first part ("Friday,") bigger
            className={index === 0 ? 'text-xl font-bold' : 'text-lg'}
          >
            {part}
            {/* Adds a comma back if it's not the last part */}
            {index < event.date.split(', ').length - 1 ? ',' : ''}
          </span>
        ))}

      </div>

      {/* Right Side: Info Block */}
      <div className="p-6 flex-1">
        <h3 className="text-xl font-bold text-forest mb-2">{event.title}</h3>
        
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">When:</span> {event.time}
          </p>
          <p>
            <span className="font-semibold">Where:</span> {event.location}
          </p>
          <p className="text-gray-600 mt-2 text-sm italic">
            {event.description}
          </p>
        </div>

        {/* Add to Calendar Button - styled like the screenshot */}
        <button className="mt-4 bg-transparent border border-gold text-gold hover:bg-gold hover:text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
          Add to Calendar
        </button>
      </div>

    </div>
  );
}