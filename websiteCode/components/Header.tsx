'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ChipIcon, MenuIcon, XIcon } from './Icons';
import Button from './Button';

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const nav = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Resources', href: '/resources' },
    //{ name: 'Data Log', href: '/data-log' },
    { name: 'Contact', href: '/contact' }
  ];
  const groupme = "https://groupme.com/join_group/110257950/WJX63DOF";
  return (
    <nav className="bg-forest sticky top-0 z-40 shadow-lg border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Image src="/logo.png" alt="Atholton Electronics Club Logo" width={40} height={40} />
            <span className="text-white text-xl font-bold font-display ml-3 hidden sm:block">Atholton Electronics Club</span>
            <span className="text-white text-lg font-bold font-display ml-3 sm:hidden">AEC</span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {nav.map(item => (
                <a key={item.href} href={item.href} className="px-3 py-2 rounded-md text-base font-medium text-off-white hover:bg-forest-light hover:text-white">{item.name}</a>
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

      <div className={`${isMobileOpen ? 'block' : 'hidden'} md:hidden border-t border-navy-light`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {nav.map(item => (
            <a key={item.href} href={item.href} className="block px-3 py-2 rounded-md text-base font-medium text-off-white hover:bg-forest-light hover:text-white">{item.name}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}