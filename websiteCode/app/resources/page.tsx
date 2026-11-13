'use client';
import React from 'react';
import { Code2, Wrench, Link2, ArrowUpRight, Activity, Compass, FolderGit2 } from 'lucide-react';
import PageHero from '../../components/PageHero';
import SectionHeading from '../../components/SectionHeading';
import JoinCTA from '../../components/JoinCTA';
import CodeSnippet from '../../components/CodeSnippet';
import { RESOURCES_DATA } from '../../data/db';

const ResourceCard = ({ resource }: { resource: typeof RESOURCES_DATA[0] }) => {
  const Icon = resource.type === 'code' ? Code2 : resource.type === 'supplier' ? Wrench : Link2;
  const label = resource.type === 'code' ? 'Code' : resource.type === 'supplier' ? 'Parts supplier' : 'Link';
  return (
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-forest-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-forest-800 text-mint-300"><Icon size={20} /></span>
        <span className="rounded-full bg-forest-50 px-2.5 py-0.5 text-xs font-semibold text-forest-700">{label}</span>
      </div>
      <h3 className="font-display text-lg font-bold text-forest-900">{resource.title}</h3>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-gray-600">{resource.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-buoy-600">
        Visit <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </a>
  );
};

// A real excerpt from the Aqua Guardian firmware (modem.cpp): reading GPS from the SIM7670G.
const exampleCode = `
/**
 * @brief Gets GPS coordinates using SIM7670G compatible command (AT+CGNSSINFO).
 */
bool modem_get_gps(float& lat, float& lon) {
    modem.sendAT(GF("+CGNSSINFO"));
    if (modem.waitResponse(2000L, GF("+CGNSSINFO:")) != 1) {
        return false;
    }

    String res = modem.stream.readStringUntil('\\n');
    modem.waitResponse();

    // Find comma indices to extract lat/lon fields
    int commas[9];
    int pos = -1;
    for (int i = 0; i < 9; i++) {
        pos = res.indexOf(',', pos + 1);
        if (pos == -1) return false;
        commas[i] = pos;
    }

    String latStr = res.substring(commas[4] + 1, commas[5]);
    String latDir = res.substring(commas[5] + 1, commas[6]);
    String lonStr = res.substring(commas[6] + 1, commas[7]);
    String lonDir = res.substring(commas[7] + 1, commas[8]);

    if (latStr.length() == 0 || lonStr.length() == 0) {
        return false;
    }

    lat = latStr.toFloat();
    lon = lonStr.toFloat();

    if (latDir.equalsIgnoreCase("S")) lat = -lat;
    if (lonDir.equalsIgnoreCase("W")) lon = -lon;

    return (lat != 0.0 || lon != 0.0);
}
`;

const onSite = [
  { href: '/dashboard', icon: Activity, title: 'Live Dashboard', text: 'Explore the buoy\'s data over any time window.' },
  { href: '/journey', icon: Compass, title: 'Our Journey', text: 'Photos, video and the story of the build.' },
  { href: '/projects', icon: FolderGit2, title: 'Projects', text: 'Parts lists, CAD and code for what we make.' },
];

export default function ResourcesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Learn & build"
        title="Resources"
        subtitle="Where to find our code, our parts, and the people and organizations we work with."
        image="/media/photos/aqua-guardian-inside-poster.jpg"
        imageAlt="Top-down view inside the buoy hull showing the electronics"
        focus="50% 50%"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="mb-20">
          <SectionHeading eyebrow="Elsewhere" title="Links we use every week" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCES_DATA.map(resource => <ResourceCard key={resource.id} resource={resource} />)}
          </div>
        </section>

        <section className="mb-20">
          <SectionHeading eyebrow="On this site" title="Keep exploring" />
          <div className="grid gap-5 md:grid-cols-3">
            {onSite.map((o) => (
              <a key={o.href} href={o.href} className="group flex items-start gap-4 rounded-2xl bg-forest-800 p-6 text-white shadow-soft transition-all hover:-translate-y-1 hover:bg-forest-700 hover:shadow-lift">
                <o.icon className="mt-1 shrink-0 text-mint-300" size={24} />
                <div>
                  <h3 className="font-display text-lg font-bold">{o.title}</h3>
                  <p className="mt-1 text-sm text-forest-100">{o.text}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <SectionHeading
            eyebrow="Real code"
            title="A peek at the buoy's firmware"
            subtitle="The Aqua Guardian runs C++ on an ESP32 (built with PlatformIO). This function asks the cellular modem for its GPS fix so every upload carries the buoy's location."
          />
          <CodeSnippet language="cpp" codeString={exampleCode} />
          <p className="mt-3 text-sm text-gray-500">
            The full firmware lives in our{' '}
            <a className="font-semibold text-buoy-600 hover:underline" href="https://github.com/AHSElectronicsClub/atholton-electronics-club" target="_blank" rel="noopener noreferrer">
              GitHub repository
            </a>.
          </p>
        </section>

        <JoinCTA />
      </div>
    </div>
  );
}
