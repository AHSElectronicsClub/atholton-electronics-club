import React from 'react';
import { MENTORS_DATA } from '../data/db';

export default function MentorsSection() {
  if (!MENTORS_DATA || MENTORS_DATA.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold font-display text-navy mb-8">Our Mentors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {MENTORS_DATA.map(mentor => (
          <div key={mentor.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow">
            <img
              src={mentor.imageUrl}
              alt={mentor.name}
              className="w-32 h-32 rounded-full mb-4 object-cover"
              onError={(e: any) => (e.target.src = 'https://placehold.co/400x400?text=No+Image')}
            />
            <h3 className="text-xl font-semibold text-navy mb-1">{mentor.name}</h3>
            <p className="text-teal font-medium mb-2">{mentor.title}</p>
            <p className="text-gray-600 text-sm">{mentor.bio}</p>
            <p className="text-gray-400 text-xs mt-2">Office Hours: {mentor.officeHours}</p>
          </div>
        ))}
      </div>
    </div>
  );
}