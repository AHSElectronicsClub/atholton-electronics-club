'use client';
import React, { useState } from 'react';
import PageContainer from './PageContainer';

// --- In-lined SVG Icon to fix compile errors ---
// This is the "User" placeholder icon
const UserIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

// --- Helper component for the mentor cards ---
const MentorCard = ({ person }: { person: { name: string, role: string, description: string, imageUrl?: string } }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const showPlaceholder = !person.imageUrl || imgFailed;

  return (
    // --- FIX #1: Added bg-white, shadow-lg, and rounded-xl ---
    <div className="bg-white shadow-lg rounded-xl text-center p-6 flex flex-col items-center">
      <div className="w-32 h-32 rounded-full mb-4 flex items-center justify-center overflow-hidden bg-gray-200">
        {showPlaceholder ? (
          <UserIcon className="w-20 h-20 text-gray-400" />
        ) : (
          // --- FIX #2: Added onError to fix broken images ---
          <img 
            src={person.imageUrl} 
            alt={person.name}
            className="w-full h-full object-cover"
            onError={() => setImgFailed(true)} 
          />
        )}
      </div>
      <h3 className="text-xl font-bold text-forest">{person.name}</h3>
      <p className="text-sm text-gold font-medium">{person.role}</p>
      <p className="text-sm text-gray-700 mt-4">
        {person.description}
      </p>
    </div>
  );
};

// --- Your Mentor Data (Example) ---
// This data is probably already in your file.
const mentors = [
  { 
    name: 'Arif Khan', 
    role: 'Mentor / Software Engineer', 
    description: 'Arif is a software engineer at Dundics Enterprises with experience in multiple programming languages (Python, C++, C Sharp). He specializes in distributed computing architectures and experimental research.',
    imageUrl: '/images/arif.jpg' // This broken path will now show a placeholder
  },
  { 
    name: 'Radhika Wijetunge', 
    role: 'Project Manager, Stormwater Management Division', 
    description: "Radhika is a Project Manager with the Stormwater Management Division of Howard County's Department of Public Works' Bureau of Environmental Services. A civil engineer with degrees from Princeton and Yale, graduate work at MIT, and expertise in computer mapping and modeling.",
    imageUrl: '/images/radhika.jpg'
  },
];

// --- Main Mentors Section Component ---
export default function MentorsSection() {
  return (
    <PageContainer title="Our Mentors">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mentors.map(person => (
          <MentorCard key={person.name} person={person} />
        ))}
      </div>
    </PageContainer>
  );
}