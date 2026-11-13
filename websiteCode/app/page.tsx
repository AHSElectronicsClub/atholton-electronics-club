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
    { value: 'Nov 11, 2026', label: 'Launched on Lake Elkhorn' },
    { value: '6', label: 'water-quality probes on board' },
    { value: 'Top 2', label: 'Maryland teams in the Solve for Tomorrow semifinals' },
    { value: '$10,000', label: 'won for Atholton High School' },
  ];

  const explore = [
    { href: '/dashboard', icon: Activity, title: 'Live Dashboard', text: 'Pick any date range and see raw readings, deviations, moving averages and risk scores.', accent: true },
    { href: '/journey', icon: Compass, title: 'Our Journey', text: 'From a sewage-overflow headline to a buoy floating on a lake, with the photos and videos.' },
    { href: '/projects', icon: FolderGit2, title: 'Projects', text: 'The parts list, the CAD, the code, and how every piece fits together.' },
    { href: '/about', icon: Users, title: 'The Team', text: 'Meet the students and mentors behind the club.' },
  ];

  const pipeline = [
    { icon: Waves, title: 'Sense', text: 'pH, dissolved oxygen, conductivity, turbidity, temperature and ORP probes.' },
    { icon: Cpu, title: 'Think', text: 'An ESP32 samples, then deep-sleeps to sip power from the solar-charged battery.' },
    { icon: Radio, title: 'Send', text: 'A cellular + GPS modem uploads every reading from the middle of the lake.' },
    { icon: Database, title: 'Store', text: 'Readings land in our cloud database the moment they arrive.' },
    { icon: Gauge, title: 'Explain', text: 'The dashboard turns numbers into baselines, deviations and plain-language risk.' },
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
              We built a buoy.<br />
              <span className="text-mint-300">It&apos;s floating in Lake Elkhorn.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-forest-100 md:text-xl">
              Aqua Guardian is a student-built, solar-powered water-quality station that measures the lake around the clock and
              uploads what it finds so anyone can check it. Watch the data come in live.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/dashboard" size="lg">
                <Activity size={20} /> Open the live dashboard
              </Button>
              <Button href="/journey" variant="outline" size="lg">
                Follow the build <ArrowRight size={18} />
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
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Right now"
          title="What the lake looks like this minute"
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
              caption="The buoy this season, on its anchor in Lake Elkhorn."
              className="aspect-[4/3]"
              imgClassName="aspect-[4/3]"
            />
            <div className="rounded-2xl border border-forest-100 bg-white p-6 shadow-soft">
              <h3 className="font-display text-xl font-bold text-forest-900">Want more than the latest reading?</h3>
              <p className="mt-2 text-gray-600">
                The dashboard lets you pick any time window and see how every sensor moved, which readings strayed from normal,
                and an algae and pollution risk score.
              </p>
              <Button href="/dashboard" className="mt-5" variant="dark">
                Run an analysis <ArrowRight size={16} />
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
              <p className="eyebrow !text-mint-300 mb-3">The story so far</p>
              <h2 className="font-display text-3xl font-bold md:text-4xl">Two winters, one very orange buoy.</h2>
              <p className="mt-5 text-lg leading-relaxed text-forest-100">
                We started with a headline about a sewage overflow. A year later, we had designed, printed, sealed and wired a
                buoy, tested it through a frozen lake in February, and launched it into open water on November 11, 2026 with
                help from a Columbia Association crew.
              </p>
              <p className="mt-4 leading-relaxed text-forest-200">
                Along the way we became a Samsung Solve for Tomorrow national semifinalist, one of just two teams from Maryland,
                and won $10,000 for our school.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/journey">Read the full journey <ArrowRight size={16} /></Button>
                <Button href="/projects" variant="outline">See how it&apos;s built</Button>
              </div>
            </div>
            <div className="space-y-4">
              <Video
                src="/media/video/buoy-launch-2026-11-lake-assembly.mp4"
                poster="/media/photos/buoy-launch-2026-11-lake-assembly.jpg"
                caption="Launch day: assembling the buoy on the dock at Lake Elkhorn."
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
        <SectionHeading eyebrow="Explore the site" title="Where would you like to start?" />
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
