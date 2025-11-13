'use client';
import { useState, useMemo } from 'react';
import PageContainer from '../../components/PageContainer';
import LayersIcon from '@/components/Icons';
import { PROJECTS_DATA, ALL_TAGS } from '../../data/db';
import ProjectCard from '../../components/ProjectCard';
import Modal from '../../components/Modal';
import ProjectModalContent from '@/components/ProjectModalContent';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS_DATA[0] | null>(null);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const filteredProjects = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return PROJECTS_DATA.filter(project => {
      const titleMatch = project.title.toLowerCase().includes(lowerSearch);
      const descMatch = project.shortDescription.toLowerCase().includes(lowerSearch);
      const tagTextMatch = project.tags.some((tag: string) => tag.toLowerCase().includes(lowerSearch));
      const tagFilterMatch = activeTags.length === 0 || activeTags.every(tag => project.tags.includes(tag));
      return (titleMatch || descMatch || tagTextMatch) && tagFilterMatch;
    });
  }, [searchTerm, activeTags]);

  return (
    <>
      <PageContainer title="Club Projects" icon={<LayersIcon name="layers" className="w-8 h-8 text-teal" />}>
        <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Projects</label>
              <input id="search" type="text" value={searchTerm} onChange={(e: { target: { value: any; }; }) => setSearchTerm(e.target.value)} placeholder="e.g., 'Aqua Guardian'" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Tag</label>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map(tag => (
                  <button key={tag} onClick={() => toggleTag(tag)} className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${activeTags.includes(tag) ? 'bg-navy text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{tag}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length ? filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          )) : <p className="text-gray-600 md:col-span-3 text-center">No projects match your search criteria.</p>}
        </div>
      </PageContainer>

      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && <ProjectModalContent project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </Modal>
    </>
  );
}