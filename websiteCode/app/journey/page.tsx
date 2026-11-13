import React from 'react';
import type { Metadata } from 'next';
import { ArrowRight, Lightbulb, Radio, Sun, Thermometer } from 'lucide-react';
import PageHero from '../../components/PageHero';
import Button from '../../components/Button';
import SectionHeading from '../../components/SectionHeading';
import JoinCTA from '../../components/JoinCTA';
import { Photo, Video, Embed } from '../../components/Media';
import { JOURNEY, LAUNCH_FACTS } from '../../data/journey';
import type { JourneyMedia } from '../../data/journey';

export const metadata: Metadata = {
  title: 'Our Journey',
  description: 'How a student team designed, built, ice-tested and launched the Aqua Guardian water-quality buoy.',
};

function MediaItem({ m }: { m: JourneyMedia }) {
  if (m.kind === 'photo') return <Photo src={m.src} alt={m.alt} caption={m.caption} focus={m.focus} className="h-full" imgClassName="aspect-[4/3]" />;
  if (m.kind === 'video') return <Video src={m.src} poster={m.poster} caption={m.caption} />;
  return <Embed provider="vimeo" id={m.id} title={m.title} caption={m.caption} />;
}

const lessons = [
  {
    icon: Radio,
    title: 'The antenna mount was hurting the signal',
    text: 'A teammate learning heat simulations noticed our mount was working against the cellular antenna. We redesigned it together, and the buoy has been phoning home ever since.',
  },
  {
    icon: Sun,
    title: 'Shape matters on open water',
    text: 'Steep A-frame solar panels keep the batteries charging as the buoy swings on its anchor, and a foam ring at the waterline keeps it upright in the wind.',
  },
  {
    icon: Lightbulb,
    title: 'A quiet buoy is not a broken buoy',
    text: 'After launch nothing uploaded for hours. We think the battery was low when it went in and simply needed morning sun. By the next day data was flowing.',
  },
  {
    icon: Thermometer,
    title: 'Humidity can look like a leak',
    text: 'Our leak alert is driven by a humidity sensor inside the hull. It fired on day one while the buoy floated perfectly normally, so we treat it as a flag to check, not proof.',
  },
];

export default function JourneyPage() {
  return (
    <div>
      <PageHero
        eyebrow="Our journey"
        title="From a headline to a buoy on the lake"
        subtitle="A year of CAD, soldering, late nights and one very cold February. Here is how Aqua Guardian came together, in photos and video."
        image="/media/photos/buoy-launch-2026-11-wide.jpg"
        imageAlt="The orange buoy as a small dot on Lake Elkhorn"
        focus="50% 60%"
        size="lg"
      >
        <Button href="/dashboard">Watch it live <ArrowRight size={16} /></Button>
        <Button href="#timeline" variant="outline">Jump to the timeline</Button>
      </PageHero>

      {/* Facts strip */}
      <section className="relative z-10 mx-auto -mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-forest-100 shadow-lift md:grid-cols-4">
          {LAUNCH_FACTS.map((f) => (
            <div key={f.label} className="bg-white px-5 py-5 text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-forest-500">{f.label}</div>
              <div className="mt-1 font-display text-lg font-bold text-forest-900">{f.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="mx-auto mt-24 max-w-6xl scroll-mt-24 px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Timeline" title="How it came together" />
        <ol className="relative space-y-16 border-l-2 border-forest-200 pl-8 md:pl-12">
          {JOURNEY.map((step, idx) => {
            const isLast = idx === JOURNEY.length - 1;
            return (
              <li key={step.id} id={step.id} className="relative scroll-mt-28">
                <span
                  className={`absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-4 border-cream md:-left-[57px] ${
                    isLast ? 'bg-buoy-500' : 'bg-forest-600'
                  }`}
                />
                <p className="font-mono text-sm font-medium uppercase tracking-wider text-buoy-600">{step.when}</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-forest-900 md:text-3xl">{step.title}</h3>
                <div className="mt-4 max-w-3xl space-y-3 text-lg leading-relaxed text-gray-700">
                  {step.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {step.media.length > 0 && (
                  <div className={`mt-6 grid gap-4 ${step.media.length === 1 ? 'max-w-md' : 'sm:grid-cols-2'} ${step.media.length >= 3 ? 'lg:grid-cols-3' : ''}`}>
                    {step.media.map((m, i) => (
                      <MediaItem key={i} m={m} />
                    ))}
                  </div>
                )}
                {step.id === 'now' && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href="/dashboard">Open the live dashboard <ArrowRight size={16} /></Button>
                    <Button href="https://spfmakerclub.wordpress.com/aqua-guardian-ahs-electronics-club/" target="_blank" variant="secondary">
                      Read the full build journal
                    </Button>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      {/* Lessons */}
      <section className="mx-auto mt-28 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we learned"
          title="Things that went sideways (and how we fixed them)"
          subtitle="Real engineering is mostly debugging. These are the moments that taught us the most."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {lessons.map((l) => (
            <div key={l.title} className="flex gap-4 rounded-2xl border border-forest-100 bg-white p-6 shadow-soft">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-800 text-mint-300">
                <l.icon size={22} />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-forest-900">{l.title}</h3>
                <p className="mt-1 text-gray-600">{l.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto mt-28 max-w-7xl px-4 sm:px-6 lg:px-8">
        <JoinCTA />
      </div>
    </div>
  );
}
