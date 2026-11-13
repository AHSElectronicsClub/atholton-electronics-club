'use client';
import React, { useState, useMemo } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import PageHero from '../../components/PageHero';
import ProjectCard from '../../components/ProjectCard';
import Modal from '../../components/Modal';
import ProjectModalContent from '../../components/ProjectModalContent';
import Button from '../../components/Button';
import JoinCTA from '../../components/JoinCTA';
import { Photo } from '../../components/Media';
import { PROJECTS_DATA, ALL_TAGS } from '../../data/db';
import type { Project } from '../../data/types';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter(project => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => project.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [searchTerm, selectedTags]);

  return (
    <div>
      <PageHero
        eyebrow="What we build"
        title="Club projects"
        subtitle="Everything we make is built by students, tested in the real world, and open source."
        image="/media/photos/aqua-guardian-workbench.jpg"
        imageAlt="A club member working on the orange buoy hull at the workbench"
        focus="50% 35%"
      >
        <Button href="/dashboard">See it running live <ArrowRight size={16} /></Button>
        <Button href="/journey" variant="outline">How we built it</Button>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Search + filters */}
        <div className="mb-10 rounded-2xl border border-forest-100 bg-white p-5 shadow-soft">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="md:col-span-1">
              <label htmlFor="search" className="mb-1 block text-sm font-semibold text-forest-800">Search projects</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. Aqua Guardian"
                  className="w-full rounded-xl border border-gray-300 py-2.5 pl-9 pr-3 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-200"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-semibold text-forest-800">Filter by tag</label>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-colors duration-200 ${
                      selectedTags.includes(tag) ? 'bg-forest-800 text-white' : 'bg-forest-50 text-forest-700 hover:bg-forest-100'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-12 text-center text-gray-600">
            <h3 className="text-xl font-semibold">No projects found</h3>
            <p>Try adjusting your search or filter settings.</p>
          </div>
        )}

        {/* Aqua Guardian deep dive */}
        <section className="mt-24">
          <p className="eyebrow mb-3">Featured build</p>
          <h2 className="font-display text-3xl font-bold text-forest-900 md:text-4xl">Aqua Guardian, from CAD to the lake</h2>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-4 text-lg leading-relaxed text-gray-700">
              <p>
                The buoy&apos;s steep A-frame solar panels keep it powered as it swings on its anchor, a foam ring at the waterline keeps it upright
                in wind, and the hull is printed in ASA and sealed with epoxy.
              </p>
              <p>
                Inside, an ESP32 FireBeetle sleeps between readings, a SIM7670G modem sends each batch over cellular, and a six-probe array measures
                pH, dissolved oxygen, conductivity, turbidity, temperature and ORP. A leak sensor and an enclosure temperature/humidity sensor watch the
                electronics.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href="/journey" variant="dark">Read the build story</Button>
                <Button href="https://a360.co/4sSlGQV" target="_blank" variant="secondary">Spin the 3D model</Button>
                <Button href="https://github.com/AHSElectronicsClub/atholton-electronics-club" target="_blank" variant="secondary">Firmware &amp; server code</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Photo src="/images/buoyCAD.jpg" alt="CAD render of the buoy" caption="CAD render" className="aspect-square" imgClassName="aspect-square object-contain bg-white p-4" />
              <Photo src="/media/photos/aqua-guardian-inside-poster.jpg" alt="Top-down view inside the hull with microcontroller, modem and wiring" caption="Inside the hull" className="aspect-square" imgClassName="aspect-square" />
              <Photo src="/media/photos/buoy-launch-2026-11-dock-prep.jpg" alt="Two club members assembling the buoy on a dock" caption="Final assembly, launch day" className="col-span-2" imgClassName="aspect-[16/8]" focus="50% 40%" />
            </div>
          </div>
        </section>

        <div className="mt-24"><JoinCTA /></div>
      </div>

      {selectedProject && (
        <Modal isOpen={true} onClose={() => setSelectedProject(null)}>
          <ProjectModalContent project={selectedProject} onClose={() => setSelectedProject(null)} />
        </Modal>
      )}
    </div>
  );
}
