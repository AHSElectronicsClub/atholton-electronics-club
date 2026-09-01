'use client';
import React, { useState } from 'react';

// --- INLINED COMPONENTS TO FIX ERRORS ---
const Button = ({ href, target, variant, className, children }: any) => {
  let styles = "inline-block rounded-lg font-medium text-center transition-colors duration-200 ";
  if (variant === 'primary') {
    styles += "bg-gold text-forest hover:bg-gold/80";
  } else {
    styles += "bg-gray-200 text-gray-900 hover:bg-gray-300";
  }
  return (
    <a href={href} target={target} className={`${styles} ${className}`}>
      {children}
    </a>
  );
};
const MenuIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const XIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
// --- END OF INLINED COMPONENTS ---

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // --- UPDATED NAVIGATION LIST ---
  const nav = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Dashboard', href: '/dashboard' }, // <--- ADDED THIS LINK
    { name: 'Resources', href: '/resources' },
    { name: 'Contact', href: '/contact' }
  ];
  
  const groupme = "https://groupme.com/join_group/110257950/WJX63DOF";
  
  return (
    <nav className="bg-hero-gradient sticky top-0 z-40 shadow-lg border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            {/* --- THIS IS THE LOGO PATH --- */}
            {/* It MUST be at websiteCode/public/logo.png */}
            <a href="/">
              <img 
                src="/logo.png" 
                alt="Atholton Electronics Club Logo" 
                width={40} 
                height={40} 
                className="w-10 h-10 inline-block" 
              />
              <span className="text-white text-xl font-bold font-display ml-3 hidden sm:inline-block">Atholton Electronics Club</span>
              <span className="text-white text-lg font-bold font-display ml-3 sm:hidden">AEC</span>
            </a>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {nav.map(item => (
                <a 
                  key={item.href} 
                  href={item.href} 
                  className="px-3 py-2 rounded-md text-base font-medium text-white hover:text-gold transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
              <Button href={groupme} target="_blank" variant="primary" className="ml-4 !py-2 !px-4">Join the Club</Button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <Button href={groupme} target="_blank" variant="primary" className="mr-2 !py-2 !px-4">Join</Button>
            <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-forest-light">
              <span className="sr-only">Open main menu</span>
              {isMobileOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`${isMobileOpen ? 'block' : 'hidden'} md:hidden border-t border-gray-700`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {nav.map(item => (
            <a 
              key={item.href} 
              href={item.href} 
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gold transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}