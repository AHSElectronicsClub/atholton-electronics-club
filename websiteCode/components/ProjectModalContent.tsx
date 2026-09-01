import React, { useState } from 'react'; // <-- ADDED useState

// --- In-lined SVG Icon to fix compile errors ---
const XIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
// Added this placeholder icon
const ImageOffIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
  </svg>
);

// Define the props
type ProjectModalContentProps = {
  project: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    // --- FIX #1: Changed 'imageUrl' to 'images' array ---
    images?: string[]; 
    repoUrl?: string; // This is the old 'repoLink'
  };
  onClose: () => void;
};

export default function ProjectModalContent({ project, onClose }: ProjectModalContentProps) {
  // --- ADDED THIS STATE FOR IMAGE FALLBACK ---
  const [imgFailed, setImgFailed] = useState(false);
  
  // Get the first image from the array
  const firstImage = project.images?.[0];
  const showPlaceholder = !firstImage || imgFailed;

  return (
    // Main modal content panel
    <div className="bg-white rounded-xl overflow-hidden max-w-2xl w-full">
      
      {/* --- FIX #2: Updated image logic --- */}
      {/* Image Header / Placeholder */}
      <div className="h-64 bg-gray-700 flex items-center justify-center">
        {showPlaceholder ? (
          <ImageOffIcon className="w-32 h-32 text-gray-500" />
        ) : (
          <img 
            src={firstImage} 
            alt={project.title} 
            className="w-full h-full object-cover" 
            onError={() => setImgFailed(true)}
          />
        )}
      </div>

      {/* Close Button (top right) */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-black/30 rounded-full p-1 transition-colors hover:bg-black/50"
      >
        <XIcon className="w-6 h-6" />
        <span className="sr-only">Close modal</span>
      </button>
      
      {/* Content Padding */}
      <div className="p-8">
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-forest mb-4">
          {project.title}
        </h2>
        
        {/* Full Description */}
        <div className="text-base text-gray-700 space-y-4">
          {project.description.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Links Footer */}
        <div className="border-t border-gray-200 mt-6 pt-6 flex gap-4">
          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Close
          </button>
          {project.repoUrl && (
            <a 
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-forest hover:bg-gold/80 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              View Repo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}