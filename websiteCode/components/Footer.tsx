import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-hero-gradient text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {/* --- THIS IS THE LOGO PATH --- */}
              <img 
                src="/logo.png" 
                alt="Atholton Electronics Club Logo" 
                width={40} 
                height={40} 
                className="w-10 h-10"
              />
              <span className="font-bold text-white text-lg">
                Atholton Electronics Club
              </span>
            </div>
            <p className="text-sm max-w-xs">
              Engineering solutions for our community.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/AHSElectronicsClub" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gold">
                GitHub
              </a>
              <a href="#" className="text-gray-300 hover:text-gold">
                Instagram
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-gold">About Us</a></li>
              <li><a href="/projects" className="text-gray-300 hover:text-gold">Projects</a></li>
              <li><a href="/resources" className="text-gray-300 hover:text-gold">Resources</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              Contact
            </h4>
            <ul className="space-y-2">
              <li>Room E172, Atholton High School</li>
              <li>ahselectronicsclubteam@gmail.com</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              Info
            </h4>
            <ul className="space-y-2">
              <li><a href="/conduct" className="text-gray-300 hover:text-gold">Code of Conduct</a></li>
              <li><a href="#" className="text-gray-300 hover:text-gold">AHS Activity Portal</a></li>
            </ul>
          </div>

        </div> 

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Atholton Electronics Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}