import React, { useState } from 'react';
import { ExternalLink, ArrowRight, Cpu } from 'lucide-react';
import { Github } from './BrandIcons';

type ProjectModalContentProps = {
  project: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    images?: string[];
    repoUrl?: string;
    repoLink?: string;
    partsList?: string[];
    status?: string;
    links?: { label: string; href: string; external?: boolean }[];
  };
  onClose: () => void;
};

export default function ProjectModalContent({ project, onClose }: ProjectModalContentProps) {
  const images = (project.images || []).filter(Boolean);
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const repo = project.repoUrl || project.repoLink;

  return (
    <div className="w-full">
      {/* Gallery */}
      {images.length > 0 && (
        <div className="bg-forest-950">
          <div className="aspect-[16/9] w-full overflow-hidden">
            {failed[active] ? (
              <div className="flex h-full items-center justify-center text-forest-400">Image unavailable</div>
            ) : (
              <img
                src={images[active]}
                alt={`${project.title}, photo ${active + 1}`}
                className="h-full w-full object-cover"
                onError={() => setFailed((f) => ({ ...f, [active]: true }))}
              />
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto px-4 py-3">
              {images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActive(i)}
                  className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${i === active ? 'border-buoy-500' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  aria-label={`Show photo ${i + 1}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="p-6 sm:p-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {project.status && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-800 px-3 py-1 text-xs font-semibold text-mint-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint-400" /> {project.status}
            </span>
          )}
          {project.tags.slice(0, 6).map((tag) => (
            <span key={tag} className="rounded-full bg-forest-50 px-2.5 py-0.5 text-xs font-semibold text-forest-700">{tag}</span>
          ))}
        </div>

        <h2 className="font-display text-3xl font-bold text-forest-900 sm:text-4xl">{project.title}</h2>

        <div className="mt-5 space-y-4 text-base leading-relaxed text-gray-700">
          {project.description.split('\n').filter((p) => p.trim()).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {project.partsList && project.partsList.length > 0 && (
          <div className="mt-8 rounded-2xl bg-forest-50 p-5">
            <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-forest-900"><Cpu size={18} /> What&apos;s inside</h3>
            <ul className="grid gap-x-6 gap-y-1.5 text-sm text-gray-700 sm:grid-cols-2">
              {project.partsList.map((part) => (
                <li key={part} className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-500" />{part}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3 border-t border-forest-100 pt-6">
          {(project.links || []).map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                i === 0 ? 'bg-buoy-500 text-white hover:bg-buoy-600' : 'bg-forest-100 text-forest-800 hover:bg-forest-200'
              }`}
            >
              {l.label} {l.external ? <ExternalLink size={14} /> : <ArrowRight size={14} />}
            </a>
          ))}
          {repo && (
            <a href={repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-forest-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-800">
              <Github size={16} /> View the code
            </a>
          )}
          <button onClick={onClose} className="ml-auto rounded-full px-4 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100">Close</button>
        </div>
      </div>
    </div>
  );
}
