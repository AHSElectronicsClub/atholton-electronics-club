'use client';
import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import ProjectCard from '../components/ProjectCard';
import EventCard from '../components/EventCard';
import AquaGuardianPanel from '../components/AquaGuardianPanel';
import Modal from '../components/Modal';
import ProjectModalContent from '../components/ProjectModalContent';
import { PROJECTS_DATA, EVENTS_DATA } from '../data/db';
import BuoyDataCard from '../components/BuoyDataCard(placeholder)';


export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const openProject = (id: number) => setSelectedProject(id);
  const closeProject = () => setSelectedProject(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero / Header Section */}
      <PageContainer title="Atholton Electronics Club" icon={<span className="text-4xl">⚡</span>}>
        <p className="text-gray-700 text-lg max-w-2xl">
          Welcome to the Atholton Electronics Club! Explore our student-built projects, live telemetry dashboards, and upcoming events.
        </p>
      </PageContainer>

      {/* Aqua Guardian Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <BuoyDataCard />
      </div>

      {/* Projects Section */}
      <PageContainer title="Our Projects" icon={<span className="text-4xl">🛠️</span>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map(project => (
            <ProjectCard key={project.id} project={project} onClick={() => openProject(project.id)} />
          ))}
        </div>
      </PageContainer>

      {/* Events Section */}
      <PageContainer title="Upcoming Events" icon={<span className="text-4xl">📅</span>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EVENTS_DATA.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </PageContainer>

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