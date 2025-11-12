'use client';
import React from 'react';
//import { GithubIcon } from './Icons';
import type { Project } from '@/data/types';

export default function ProjectCard({ project, onClick }: { project: Project, onClick?: () => void }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer group" onClick={onClick}>
      <div className="relative">
        <img src={project.images[0]} alt={project.title} className="w-full h-48 object-cover" onError={(e: any) => e.target.src = '/images/placeholder.png'} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          {project.tags.slice(0,2).map(t => <span key={t} className="inline-block bg-teal text-navy text-xs font-bold px-2 py-1 rounded-full mr-2">{t}</span>)}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold font-display text-navy mb-2 group-hover:text-teal transition-colors">{project.title}</h3>
        <p className="text-gray-600 text-sm">{project.shortDescription}</p>
        <div className="flex justify-between items-center mt-6">
          <span className="text-sm font-semibold text-orange group-hover:underline">View Details</span>
          <button onClick={(e)=>{ e.stopPropagation(); window.open(project.repoLink, '_blank'); }} className="text-gray-400 group-hover:text-navy">
            Repo
          </button>
        </div>
      </div>
    </div>
  );
}
