'use client';
import React, { useState } from 'react';
import { Wrench, Cpu, Code2, Target, Users, Trophy, Leaf, HeartHandshake } from 'lucide-react';
import PageHero from '../../components/PageHero';
import SectionHeading from '../../components/SectionHeading';
import Button from '../../components/Button';
import JoinCTA from '../../components/JoinCTA';
import { Photo } from '../../components/Media';
import { TEAM_DATA, MENTORS_DATA, MEETING_INFO } from '../../data/db';

const initials = (name: string) => name.split(' ').map((n) => n[0]).slice(0, 2).join('');

const PersonCard = ({ person, large = false }: { person: { name: string; title: string; imageUrl?: string; bio?: string }; large?: boolean }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const showPlaceholder = !person.imageUrl || imgFailed;

  return (
    <div className="flex flex-col items-center rounded-2xl border border-forest-100 bg-white p-6 text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
      <div className={`mb-4 overflow-hidden rounded-full bg-forest-100 ring-4 ring-forest-50 ${large ? 'h-36 w-36' : 'h-32 w-32'}`}>
        {showPlaceholder ? (
          <div className="flex h-full w-full items-center justify-center bg-forest-800 font-display text-3xl font-bold text-mint-300">
            {initials(person.name)}
          </div>
        ) : (
          <img src={person.imageUrl} alt={person.name} className="h-full w-full object-cover object-top" loading="lazy" onError={() => setImgFailed(true)} />
        )}
      </div>
      <h3 className="font-display text-xl font-bold text-forest-900">{person.name}</h3>
      <p className="mt-1 text-sm font-semibold text-buoy-600">{person.title}</p>
      {person.bio && <p className="mt-3 text-sm leading-relaxed text-gray-600">{person.bio}</p>}
    </div>
  );
};

const pillars = [
  { icon: Wrench, title: 'Mechanical', text: 'CAD, 3D printing, hull design and sealing, solar mounts. For Aqua Guardian this meant a floating ASA hull, A-frame solar panels and a foam stabilizing ring.' },
  { icon: Cpu, title: 'Electrical', text: 'Sensors, power and wiring: probes, a microcontroller, a cellular modem, a battery with protection circuitry and a solar charge controller.' },
  { icon: Code2, title: 'Software', text: 'Embedded firmware, a cloud API and database, and the live dashboard and analysis you can use on this site.' },
];

const milestones = [
  { icon: Users, value: '~35', label: 'student members' },
  { icon: Leaf, value: '2025', label: 'founded at Atholton High' },
  { icon: Trophy, value: 'Top 2', label: 'Maryland teams in the Solve for Tomorrow semifinals' },
  { icon: Target, value: '$10,000', label: 'won for our school' },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About us"
        title="Students who build real things"
        subtitle="The Atholton Electronics Club gives students hands-on experience in electronics, programming and environmental technology, on projects that matter beyond the classroom."
        image="/media/photos/buoy-launch-2026-11-fall-shoreline.jpg"
        imageAlt="The orange Aqua Guardian buoy floating on Lake Elkhorn"
        focus="50% 80%"
      >
        <Button href="#team">Meet the team</Button>
        <Button href="/journey" variant="outline">Our journey</Button>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Milestones */}
        <section className="relative z-10 -mt-24 mb-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {milestones.map((m) => (
            <div key={m.label} className="rounded-2xl border border-forest-100 bg-white p-5 text-center shadow-lift">
              <m.icon className="mx-auto mb-2 text-forest-500" size={22} />
              <div className="font-display text-2xl font-extrabold text-forest-800 md:text-3xl">{m.value}</div>
              <div className="mt-1 text-sm leading-snug text-gray-600">{m.label}</div>
            </div>
          ))}
        </section>

        {/* Story */}
        <section className="mb-24 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our story" title="Started in 2025, already on a lake" />
            <div className="-mt-4 space-y-4 text-lg leading-relaxed text-gray-700">
              <p>
                Founded in 2025 at Atholton High School, the Atholton Electronics Club was established to provide students with hands-on
                experience in electrical engineering and applied technology.
              </p>
              <p>
                With a growing membership of approximately 35 students, the club focuses on designing and building real-world engineering
                projects that both educate members and benefit the broader community.
              </p>
              <p>
                Our first big project, <strong className="text-forest-800">Aqua Guardian</strong>, began after a sewage overflow and algal-bloom advisories in our
                own county. It became a solar-powered, cellular-connected water-quality buoy that made the Samsung Solve for Tomorrow national
                semifinals and was launched on Lake Elkhorn on November 11, 2026.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href="/journey" variant="dark">Read the whole story</Button>
                <Button href="/dashboard" variant="secondary">See the live data</Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Photo src="/media/photos/buoy-launch-2026-11-dock-prep.jpg" alt="Two club members finishing assembly of the buoy on the dock" caption="Launch day, Lake Elkhorn" className="col-span-2" imgClassName="aspect-[16/9]" focus="50% 35%" />
            <Photo src="/media/photos/lake-test-ice-opening.jpg" alt="Club members at an ice opening testing the buoy" caption="Ice test, February 2026" imgClassName="aspect-[4/3]" />
            <Photo src="/media/photos/aqua-guardian-workbench.jpg" alt="A member sealing the buoy hull at the workbench" caption="Hull work in the lab" imgClassName="aspect-[4/3]" focus="50% 40%" />
          </div>
        </section>

        {/* Mission */}
        <section className="mb-24 overflow-hidden rounded-3xl bg-hero-gradient p-8 text-white shadow-lift md:p-14">
          <p className="eyebrow !text-mint-300 mb-3">Our mission</p>
          <p className="max-w-4xl font-display text-2xl font-bold leading-snug md:text-4xl">
            Give students hands-on experience in electronics, programming and environmental technology, and use it to serve our community.
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-forest-100">
            We build real-world projects, mentor each other, and contribute to our local community through technology and innovation.
          </p>
        </section>

        {/* What we do */}
        <section className="mb-24">
          <SectionHeading eyebrow="How we work" title="Three teams, one project" subtitle="Everyone picks a lane, and the lanes constantly overlap." />
          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-2xl border border-forest-100 bg-white p-6 shadow-soft">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-forest-800 text-mint-300"><p.icon size={22} /></span>
                <h3 className="font-display text-xl font-bold text-forest-900">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-600">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section id="team" className="mb-24 scroll-mt-24">
          <SectionHeading eyebrow="The people" title="Our team" subtitle="Student leaders across mechanical, electrical, software and outreach." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_DATA.map(member => <PersonCard key={member.id} person={member} />)}
          </div>
        </section>

        {/* Mentors */}
        <section id="mentors" className="mb-24 scroll-mt-24">
          <SectionHeading eyebrow="Guidance" title="Our mentors" subtitle="Professionals who advise on engineering, software and environmental science." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {MENTORS_DATA.map(mentor => <PersonCard key={mentor.id} person={mentor} large />)}
          </div>
        </section>

        {/* Meet us */}
        <section className="mb-24 grid items-center gap-8 rounded-3xl border border-forest-100 bg-white p-8 shadow-soft md:grid-cols-3 md:p-10">
          <div className="md:col-span-2">
            <p className="eyebrow mb-2">Visit us</p>
            <h2 className="font-display text-2xl font-bold text-forest-900 md:text-3xl">Drop by a meeting</h2>
            <p className="mt-3 text-gray-600">We meet {MEETING_INFO.when} in {MEETING_INFO.where}. New members are always welcome.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button href={MEETING_INFO.calendarLink} target="_blank" variant="dark">Add to calendar</Button>
            <Button href="/contact" variant="secondary">Contact us</Button>
          </div>
        </section>

        {/* Code of Conduct */}
        <section id="conduct" className="mb-20 scroll-mt-24 rounded-3xl bg-forest-50 p-8 md:p-12">
          <div className="mb-6 flex items-center gap-3">
            <HeartHandshake className="text-forest-600" size={28} />
            <h2 className="font-display text-2xl font-bold text-forest-900 md:text-3xl">Code of Conduct</h2>
          </div>
          <ul className="grid gap-3 text-gray-700 md:grid-cols-2">
            {[
              'The Atholton Electronics Club is dedicated to providing a harassment-free experience for everyone, regardless of gender, gender identity, sexual orientation, disability, physical appearance, body size, race, or religion.',
              'Be respectful, inclusive, and collaborative.',
              'Be mindful of your speech and actions.',
              'Respect lab equipment, tools, and shared spaces. Clean up after yourself.',
              'Do not tolerate harassment or intimidation in any form.',
              'Ask for help, and offer help when you can.',
            ].map((rule) => (
              <li key={rule} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-soft">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-buoy-500" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        <JoinCTA />
      </div>
    </div>
  );
}
