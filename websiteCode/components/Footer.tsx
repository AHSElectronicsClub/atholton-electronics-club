import React from 'react';
import { ChipIcon } from './Icons'; // Make sure this import is correct
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    // Main footer container with the light 'off-white' background
    <footer className="bg-off-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main grid for all footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Logo, slogan, and social links */}
          <div className="space-y-4">
  
          {/* NEW: Flex container to hold logo and title together */}
          <div className="flex items-center space-x-3">
            <Image src="/logo.png" alt="Atholton Electronics Club Logo" width={40} height={40} />
            <span className="font-bold text-dark-gray text-lg">
            Atholton Electronics Club
            </span>
         </div>
          {/* END: New container */}

          <p className="text-gray-700 text-sm max-w-xs">
           Engineering solutions for our community.
          </p>
         {/* ...social links... */}
            <div className="flex space-x-4">
              <a href="https://github.com/AHSElectronicsClub" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gold">
                GitHub
              </a>
              <a href="#" className="text-gray-700 hover:text-gold">
                Instagram
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-dark-gray tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-700 hover:text-gold">About Us</Link></li>
              <li><Link href="/projects" className="text-gray-700 hover:text-gold">Projects</Link></li>
              <li><Link href="/resources" className="text-gray-700 hover:text-gold">Resources</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-dark-gray tracking-wider uppercase">
              Contact
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li>Room E172, Atholton High School</li>
              <li>ahselectronicsclubteam@gmail.com</li>
            </ul>
          </div>

          {/* Column 4: Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-dark-gray tracking-wider uppercase">
              Info
            </h4>
            <ul className="space-y-2">
              <li><Link href="/conduct" className="text-gray-700 hover:text-gold">Code of Conduct</Link></li>
              <li><a href="#" className="text-gray-700 hover:text-gold">AHS Activity Portal</a></li>
            </ul>
          </div>

        </div> 
        {/* End grid */}

        {/* Copyright section at the bottom */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Atholton Electronics Club. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}