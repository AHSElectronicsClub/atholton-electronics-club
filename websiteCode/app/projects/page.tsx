'use client';
import React, { useState, useMemo } from 'react';
import PageContainer from '../../components/PageContainer';
import ProjectCard from '../../components/ProjectCard';
import Modal from '../../components/Modal';
import ProjectModalContent from '../../components/ProjectModalContent';
import { PROJECTS_DATA, ALL_TAGS } from '../../data/db'; // Import your projects and tags
import type { Project } from '../../data/types'; // Import the Project type

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Handle clicking a tag
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Filter projects based on search and tags
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter(project => {
      // Search term check
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Tag check
      const matchesTags = selectedTags.length === 0 ||
                          selectedTags.every(tag => project.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [searchTerm, selectedTags]);

  return (
    <PageContainer title="Club Projects">

      {/* --- THIS IS THE FIX --- */}
      {/* I've wrapped your search/filter bar in a white card */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Search Bar */}
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Projects
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g., 'Aqua Guardian'"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-gold focus:border-gold"
            />
          </div>

          {/* Tag Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Tag
            </label>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                    selectedTags.includes(tag)
                      ? 'bg-gold text-forest' // Active tag
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300' // Inactive tag
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={() => setSelectedProject(project)} 
          />
        ))}
      </div>

      {/* No results message */}
      {filteredProjects.length === 0 && (
        <div className="text-center text-gray-600 mt-12">
          <h3 className="text-xl font-semibold">No projects found</h3>
          <p>Try adjusting your search or filter settings.</p>
        </div>
      )}

      {/* Project Modal */}
      {selectedProject && (
        <Modal isOpen={true} onClose={() => setSelectedProject(null)}>
          <ProjectModalContent
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </Modal>
      )}

    </PageContainer>
  );
}