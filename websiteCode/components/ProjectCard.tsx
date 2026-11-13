import React, { useState } from 'react';
import { ArrowRight, ImageOff } from 'lucide-react';
import { Github } from './BrandIcons';

type ProjectCardProps = {
  project: {
    id: number;
    title: string;
    description: string;
    shortDescription?: string;
    tags: string[];
    images?: string[];
    repoUrl?: string;
    repoLink?: string;
    status?: string;
  };
  onClick: () => void;
};

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const firstImage = project.images?.[0];
  const showPlaceholder = !firstImage || imgFailed;
  const repo = project.repoUrl || project.repoLink;
  const blurb = project.shortDescription || `${project.description.substring(0, 140)}…`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift">
      <button onClick={onClick} className="relative block aspect-[16/10] overflow-hidden bg-forest-800 text-left" aria-label={`View details for ${project.title}`}>
        {showPlaceholder ? (
          <div className="flex h-full items-center justify-center"><ImageOff className="h-16 w-16 text-forest-400" /></div>
        ) : (
          <img
            src={firstImage}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgFailed(true)}
          />
        )}
        {project.status && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-forest-950/80 px-3 py-1 text-xs font-semibold text-mint-300 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint-400" /> {project.status}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-forest-900">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{blurb}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((t) => (
            <span key={t} className="rounded-full bg-forest-50 px-2.5 py-0.5 text-xs font-medium text-forest-700">{t}</span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-forest-100 pt-4 text-sm">
          <button onClick={onClick} className="inline-flex items-center gap-1.5 font-semibold text-buoy-600 hover:text-buoy-700">
            View details <ArrowRight size={16} />
          </button>
          {repo && (
            <a href={repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-gray-500 hover:text-forest-700">
              <Github size={16} /> Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
