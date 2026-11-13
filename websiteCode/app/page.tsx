'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Activity, Compass, FolderGit2, Users, Waves, Radio, Database, Cpu, Gauge } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import Modal from '../components/Modal';
import ProjectModalContent from '../components/ProjectModalContent';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import JoinCTA from '../components/JoinCTA';
import { Photo, Video } from '../components/Media';
import { PROJECTS_DATA } from '../data/db';
import { BuoyDataCard } from '@/components/BuoyDataCard(placeholder)';
import { adaptSupabaseRowToBuoyData } from '@/utils/adapters';

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [buoyData, setBuoyData] = useState<any>(null);

  // Fetch the latest buoy data from your Flask/Supabase endpoint on load
  useEffect(() => {
    fetch('https://aqua-guardian-cloud-test.onrender.com/api/buoys/latest')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Adapt the raw Supabase row into flat properties for BuoyDataCard
          const adaptedRow = adaptSupabaseRowToBuoyData(data[0]);
          setBuoyData(adaptedRow);
        }
      })
      .catch(err => console.error("Failed to fetch buoy telemetry:", err));
  }, []);

  const openProject = (id: number) => setSelectedProject(id);
  const closeProject = () => setSelectedProject(null);

  const stats = [
    { value: 'Fully Deployed', label: 'on Lake Elkhorn, Columbia, MD' },
    { value: '6', label: 'water-quality probes on board' },
    { value: 'Solar', label: 'powered, with a battery backup' },
    { value: 'Cellular + GPS', label: 'sends readings from the lake' },
  ];

  const explore = [
    { href: '/dashboard', icon: Activity, title: 'Data Explorer', text: 'Choose a time range and look at the buoy\'s readings, averages and deviations.', accent: true },
    { href: '/journey', icon: Compass, title: 'Our Journey', text: 'How the project came together, with photos and videos.' },
    { href: '/projects', icon: FolderGit2, title: 'Projects', text: 'The parts list, the CAD, the code, and how every piece fits together.' },
    { href: '/about', icon: Users, title: 'The Team', text: 'Meet the students and mentors behind the club.' },
  ];

  const pipeline = [
    { icon: Waves, title: 'Sense', text: 'pH, dissolved oxygen, conductivity, turbidity, temperature and ORP probes.' },
    { icon: Cpu, title: 'Think', text: 'An ESP32 samples, then deep-sleeps to sip power from the solar-charged battery.' },
    { icon: Radio, title: 'Send', text: 'A cellular + GPS modem uploads every reading from the middle of the lake.' },
    { icon: Database, title: 'Store', text: 'Readings land in our cloud database the moment they arrive.' },
    { icon: Gauge, title: 'Explain', text: 'The Data Explorer shows each sensor\'s readings, baselines and deviations over any time range.' },
  ];

  return (
    <div>
      {/* ───────────── HERO ───────────── */}
      <section className="relative isolate overflow-hidden bg-forest-950 text-white">
        <img
          src="/media/photos/buoy-launch-2026-11-fall-shoreline.jpg"
          alt="The orange Aqua Guardian buoy floating on Lake Elkhorn with fall trees behind it"
          className="absolute inset-0 -z-20 h-full w-full -scale-x-100 object-cover object-[50%_78%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950 via-forest-950/75 to-forest-950/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950 via-transparent to-forest-950/30" />
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 md:pb-28 md:pt-36 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-mint-400/40 bg-forest-950/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-mint-300 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-mint-400" />
              Atholton High School · Electronics Club
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
              A water-quality buoy<br />
              <span className="text-mint-300">built by Atholton students.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-forest-100 md:text-xl">
              Aqua Guardian is a solar-powered buoy on Lake Elkhorn. It measures the water and sends its readings online, and the
              latest one is shown below.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="#live-data" size="lg">
                See the latest reading
              </Button>
              <Button href="/dashboard" variant="outline" size="lg">
                <Activity size={20} /> Open the Data Explorer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── STATS ───────────── */}
      <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-forest-100 shadow-lift md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-5 py-6 text-center">
              <div className="font-display text-2xl font-extrabold text-forest-800 md:text-3xl">{s.value}</div>
              <div className="mt-1 text-sm leading-snug text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── LIVE DATA ───────────── */}
      <section id="live-data" className="mx-auto mt-24 max-w-7xl scroll-mt-24 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Live data"
          title="The latest reading from the buoy"
          subtitle="This card shows the most recent reading the buoy sent home. It updates each time the buoy wakes up, measures and uploads."
        />
        <div className="grid items-start gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {buoyData ? (
              <BuoyDataCard data={buoyData} />
            ) : (
              <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-3 rounded-3xl border border-forest-100 bg-white p-6 text-center text-gray-500 shadow-soft">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-forest-100 border-t-forest-500" />
                <p className="font-medium text-forest-800">Loading live buoy telemetry…</p>
                <p className="max-w-xs text-sm">Our server wakes up on demand, so the first load can take up to a minute.</p>
              </div>
            )}
          </div>

          <aside className="space-y-6 lg:col-span-2">
            <Photo
              src="/media/photos/buoy-launch-2026-11-close.jpg"
              alt="Close-up of the buoy with its solar panel catching the light"
              caption="Aqua Guardian on Lake Elkhorn."
              className="aspect-[4/3]"
              imgClassName="aspect-[4/3]"
            />
            <div className="rounded-2xl border border-forest-100 bg-white p-6 shadow-soft">
              <h3 className="font-display text-xl font-bold text-forest-900">Looking for older readings?</h3>
              <p className="mt-2 text-gray-600">
                The Data Explorer lets you pick a time range and see how each sensor changed over it, and how far readings sat from
                their usual values.
              </p>
              <Button href="/dashboard" className="mt-5" variant="dark">
                Open the Data Explorer <ArrowRight size={16} />
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {/* ───────────── HOW IT WORKS ───────────── */}
      <section className="mx-auto mt-28 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="From lake water to a number on your screen"
          subtitle="Five steps, every cycle, powered entirely by a solar panel."
        />
        <ol className="grid gap-4 md:grid-cols-5">
          {pipeline.map((step, i) => (
            <li key={step.title} className="relative rounded-2xl border border-forest-100 bg-white p-5 shadow-soft">
              <span className="absolute right-4 top-4 font-mono text-xs text-forest-300">0{i + 1}</span>
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-forest-800 text-mint-300">
                <step.icon size={22} />
              </span>
              <h3 className="font-display text-lg font-bold text-forest-900">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ───────────── STORY / MEDIA ───────────── */}
      <section className="mt-28 bg-forest-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow !text-mint-300 mb-3">The project</p>
              <h2 className="font-display text-3xl font-bold md:text-4xl">How it came together</h2>
              <p className="mt-5 text-lg leading-relaxed text-forest-100">
                The idea came from local water problems we ran into. Over the following year we designed, printed, sealed and wired the
                buoy, tested it on a frozen lake in February, and set it in Lake Elkhorn on November 11, 2026 with help from a
                Columbia Association crew. It is now fully deployed.
              </p>
              <p className="mt-4 leading-relaxed text-forest-200">
                The project was also a Samsung Solve for Tomorrow national semifinalist.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/journey">See the timeline <ArrowRight size={16} /></Button>
                <Button href="/projects" variant="outline">See how it&apos;s built</Button>
              </div>
            </div>
            <div className="space-y-4">
              <Video
                src="/media/video/buoy-launch-2026-11-lake-assembly.mp4"
                poster="/media/photos/buoy-launch-2026-11-lake-assembly.jpg"
                caption="Assembling the buoy on the dock at Lake Elkhorn."
              />
              <div className="grid grid-cols-2 gap-4">
                <Photo src="/media/photos/aqua-guardian-workbench.jpg" alt="A team member working on the buoy hull in the lab" caption="In the lab" className="aspect-[4/3]" imgClassName="aspect-[4/3]" focus="50% 40%" />
                <Photo src="/media/photos/lake-test-ice-opening.jpg" alt="Team members at an ice opening testing the buoy" caption="Ice test, Feb 2026" className="aspect-[4/3]" imgClassName="aspect-[4/3]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── EXPLORE ───────────── */}
      <section className="mx-auto mt-28 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Explore the site" title="Find your way around" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {explore.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className={`group flex flex-col rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lift ${
                e.accent ? 'border-buoy-500 bg-buoy-500 text-white' : 'border-forest-100 bg-white text-forest-900 shadow-soft'
              }`}
            >
              <e.icon size={28} className={e.accent ? 'text-white' : 'text-forest-600'} />
              <h3 className="mt-4 font-display text-xl font-bold">{e.title}</h3>
              <p className={`mt-2 flex-1 text-sm leading-relaxed ${e.accent ? 'text-white/90' : 'text-gray-600'}`}>{e.text}</p>
              <span className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${e.accent ? 'text-white' : 'text-buoy-600'}`}>
                Go <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── PROJECTS ───────────── */}
      <section className="mx-auto mt-28 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we build"
          title="Our projects"
          action={<Button href="/projects" variant="ghost">All projects <ArrowRight size={16} /></Button>}
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS_DATA.map(project => (
            <ProjectCard key={project.id} project={project} onClick={() => openProject(project.id)} />
          ))}
        </div>
      </section>

      <div className="mx-auto mt-28 max-w-7xl px-4 sm:px-6 lg:px-8">
        <JoinCTA />
      </div>

      {/* Project Modal */}
      {selectedProject !== null && (
        <Modal isOpen={true} onClose={closeProject}>
          <ProjectModalContent
            project={PROJECTS_DATA.find(p => p.id === selectedProject)!}
            onClose={closeProject}
          />
        </Modal>
      )}
    </div>
  );
}
