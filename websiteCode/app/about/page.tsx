'use client';
import React, { useState } from 'react'; // <-- ADDED useState
import PageContainer from '../../components/PageContainer';
import { TEAM_DATA, MENTORS_DATA } from '../../data/db';

// --- In-lined SVG Icon to fix compile errors ---
// This is the "User" placeholder icon
const UserIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

// --- NEW PersonCard component ---
// This will be used for BOTH students and mentors
const PersonCard = ({ person }: { person: { name: string, title: string, imageUrl?: string, bio?: string } }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const showPlaceholder = !person.imageUrl || imgFailed;

  return (
    // --- FIX #1: Changed bg-off-white to bg-white shadow-lg ---
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
      <div className="w-32 h-32 rounded-full mb-4 flex items-center justify-center overflow-hidden bg-gray-200">
        {showPlaceholder ? (
          // --- FIX #2: Use the clean SVG placeholder ---
          <UserIcon className="w-20 h-20 text-gray-400" />
        ) : (
          // --- FIX #2: Added onError handler ---
          <img
            src={person.imageUrl}
            alt={person.name}
            className="w-full h-full object-cover"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>
      <h3 className="text-xl font-semibold text-forest mb-1">{person.name}</h3>
      <p className="text-gold font-medium mb-2">{person.title}</p>
      
      {/* This will only show up for mentors who have a bio */}
      {person.bio && (
        <p className="text-gray-700 text-sm">{person.bio}</p>
      )}
    </div>
  );
};

// --- YOUR MAIN PAGE ---
export default function AboutPage() {
  return (
    <PageContainer title="About Us" icon={<span>👋</span>}>

      {/* Your "Our Story" Section (UNTOUCHED) */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-forest mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          Founded in 2025 at Atholton High School, the Atholton Electronics Club was established to provide students with hands-on experience in electrical engineering and applied technology.
        </p>
        <p className="text-gray-700 leading-relaxed">
          With a growing membership of approximately 35 students, the club focuses on designing and building real-world engineering projects that both educate members and benefit the broader community.
        </p>
      </section>

      {/* Your "Our Mission" Section (UNTOUCHED) */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-forest mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          The Atholton Electronics Club is dedicated to providing students with hands-on experience in electronics, programming, and environmental technology. 
          We build real-world projects, mentor each other, and contribute to our local community through technology and innovation.
        </p>
      </section>

      {/* --- Team Members Section (FIXED) --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-forest mb-8">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {TEAM_DATA.map(member => (
            // Replaced the old div with the new PersonCard component
            <PersonCard key={member.id} person={member} />
          ))}
        </div>
      </section>

      {/* --- Mentors Section (FIXED) --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-forest mb-8">Our Mentors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {MENTORS_DATA.map(mentor => (
            // Replaced the old div with the new PersonCard component
            <PersonCard key={mentor.id} person={mentor} />
          ))}
        </div>
      </section>

      {/* Your "Code of Conduct" Section (UNTOUCHED) */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-forest mb-4">Code of Conduct</h2>
        <ul className="text-gray-700 list-disc list-inside space-y-2">
          <li>The Atholton Electronics Club is dedicated to providing a harassment-free experience for everyone, regardless of gender, gender identity, sexual orientation, disability, physical appearance, body size, race, or religion.</li>
          <li>Be respectful, inclusive, and collaborative.</li>
          <li>Be mindful of your speech and actions.</li>
          <li>Respect lab equipment, tools, and shared spaces. Clean up after yourself.</li>
          <li>Do not tolerate harassment or intimidation in any form.</li>
          <li>Ask for help, and offer help when you can.</li>
        </ul>
      </section>

    </PageContainer>
  );
}