'use client';
import React from 'react';
import { ChipIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-gray-400 border-t border-teal/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <ChipIcon className="w-8 h-8 text-teal" />
              <span className="text-white text-lg font-bold font-display ml-2">Atholton Electronics Club</span>
            </div>
            <p className="text-sm">Engineering solutions for our community.</p>
            <div className="flex space-x-4 mt-6">
              <a href="https://github.com/AHSElectronicsClub/atholton-electronics-club" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">GitHub</a>
              <a href="https://instagram.com/ahselectronic" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Instagram</a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/projects" className="hover:text-white">Projects</a></li>
              <li><a href="/resources" className="hover:text-white">Resources</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Room E172, Atholton High School</li>
              <li><a href="mailto:ahselectronicsclubteam@gmail.com" className="hover:text-white">ahselectronicsclubteam@gmail.com</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Info</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-white">Code of Conduct</a></li>
              <li><a href="#" className="hover:text-white">AHS Activity Portal</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-navy-light text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Atholton Electronics Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}