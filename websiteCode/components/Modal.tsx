'use client';
import React, { useEffect } from 'react'; // Added useEffect
// import { XIcon } from './Icons'; // <-- Removed this broken import

// --- ADDED THIS INLINED ICON TO FIX THE ERROR ---
const XIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
// --- END OF INLINED ICON ---

export default function Modal({ isOpen, onClose, children }: { isOpen: boolean, onClose: ()=>void, children?: React.ReactNode }) {
  
  // --- ADDED THIS 'ESCAPE' KEY FUNCTIONALITY ---
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  // --- END OF 'ESCAPE' KEY FUNCTIONALITY ---

  if (!isOpen) return null;

  return (
    // This is your layout, with the blur background
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      
      {/* --- FIX #2: Changed bg-off-white to bg-white ---
        (Since 'bg-off-white' is no longer in your tailwind.config.js)
      */}
      <div className="bg-white rounded-xl shadow-2xl w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto relative" onClick={(e)=>e.stopPropagation()}>
        
        {/* This button will now work because XIcon is inlined */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-forest transition-colors z-10" aria-label="Close">
          <XIcon className="w-8 h-8" />
        </button>
        {children}
      </div>
    </div>
  );
}