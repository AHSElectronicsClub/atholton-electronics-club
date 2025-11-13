'use client';
import React from 'react';
import PageContainer from '../../components/PageContainer';
import { TEAM_DATA, MENTORS_DATA } from '../../data/db';

export default function AboutPage() {
  return (
    <PageContainer title="About Us" icon={<span>👋</span>}>

      {/* Our Story Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-navy mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed mb-2">
          Founded in 2025 at Atholton High School, the Atholton Electronics Club was established to provide students with hands-on experience in electrical engineering and applied technology.
        </p>
        <p className="text-gray-700 leading-relaxed">
          With a growing membership of approximately 35 students, the club focuses on designing and building real-world engineering projects that both educate members and benefit the broader community.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-navy mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          The Atholton Electronics Club is dedicated to providing students with hands-on experience in electronics, programming, and environmental technology. 
          We build real-world projects, mentor each other, and contribute to our local community through technology and innovation.
        </p>
      </section>

      {/* Team Members Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-navy mb-8">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {TEAM_DATA.map(member => (
            <div key={member.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-32 h-32 rounded-full mb-4 object-cover"
                onError={(e: any) => (e.target.src = 'https://placehold.co/400x400?text=No+Image')}
              />
              <h3 className="text-xl font-semibold text-navy mb-1">{member.name}</h3>
              <p className="text-teal font-medium">{member.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mentors Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-navy mb-8">Our Mentors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {MENTORS_DATA.map(mentor => (
            <div
              key={mentor.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow"
            >
              <img
                src={mentor.imageUrl}
                alt={mentor.name}
                className="w-32 h-32 rounded-full mb-4 object-cover"
                onError={(e: any) => (e.target.src = 'https://placehold.co/400x400?text=No+Image')}
              />
              <h3 className="text-xl font-semibold text-navy mb-1">{mentor.name}</h3>
              <p className="text-teal font-medium mb-2">{mentor.title}</p>
              <p className="text-gray-700 text-base mb-2">{mentor.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Code of Conduct Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-navy mb-4">Code of Conduct</h2>
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