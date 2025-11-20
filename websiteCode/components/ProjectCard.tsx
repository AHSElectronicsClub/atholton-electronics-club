import React, { useState } from 'react'; // <-- ADDED useState

// --- In-lined SVG Icon to fix compile errors ---
// This is the "image not found" placeholder
const ImageOffIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
  </svg>
);

// Define the props for the project card
type ProjectCardProps = {
  project: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    // --- FIX #1: Changed 'imageUrl' to 'images' array ---
    images?: string[]; // The project has an array of images
    repoUrl?: string; // This is the old 'repoLink'
  };
  onClick: () => void; // For the "View Details" button
};

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  // --- ADDED THIS STATE FOR IMAGE FALLBACK ---
  const [imgFailed, setImgFailed] = useState(false);

  // Get the first image from the array
  const firstImage = project.images?.[0];
  const showPlaceholder = !firstImage || imgFailed;

  return (
    // Main card: white, shadow, rounded, and flex-col
    <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col">
      
      {/* Image/Placeholder Section */}
      <div className="h-48 bg-gray-700 flex items-center justify-center">
        {showPlaceholder ? (
          // Inlined placeholder icon
          <ImageOffIcon className="w-24 h-24 text-gray-500" />
        ) : (
          // --- FIX #2: Load the firstImage and add onError ---
          <img 
            src={firstImage} 
            alt={project.title} 
            className="w-full h-full object-cover" 
            onError={() => setImgFailed(true)} // This will catch broken image paths
          />
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1"> 
          <h3 className="text-xl font-bold text-forest mb-2">{project.title}</h3>
          
          <p className="text-sm text-gray-700">
            {project.description.substring(0, 100)}...
          </p>
        </div>
        
        {/* Footer Section (stays at bottom) */}
        <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center text-sm">
          <button 
            onClick={onClick} 
            className="font-medium text-forest hover:text-gold transition-colors duration-200"
          >
            View Details
          </button>
          
          {project.repoUrl && (
            <a 
              href={project.repoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-medium text-gray-500 hover:text-gold transition-colors duration-200"
            >
              Repo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}