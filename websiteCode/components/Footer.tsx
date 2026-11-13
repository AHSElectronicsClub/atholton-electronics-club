import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, ExternalLink } from 'lucide-react';
import { Github } from './BrandIcons';

export default function Footer() {
  return (
    <footer className="mt-24 bg-forest-950 text-forest-100">
      <div className="h-1 bg-gradient-to-r from-forest-700 via-mint-400 to-buoy-500" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="space-y-4 md:col-span-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="" width={48} height={48} className="h-12 w-12 rounded-full" />
              <span className="font-display text-xl font-bold text-white">Atholton Electronics Club</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-forest-200">
              Student engineers at Atholton High School designing, building and deploying real-world electronics, from CAD to a
              solar-powered buoy floating on Lake Elkhorn.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="https://github.com/AHSElectronicsClub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-sm text-white hover:bg-white/10"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href="https://spfmakerclub.wordpress.com/aqua-guardian-ahs-electronics-club/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-sm text-white hover:bg-white/10"
              >
                Build journal <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-mint-300">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/dashboard" className="font-semibold text-buoy-300 hover:text-buoy-400">Live Dashboard</Link></li>
              <li><Link href="/journey" className="hover:text-white">Our Journey</Link></li>
              <li><Link href="/projects" className="hover:text-white">Projects</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-mint-300">Get involved</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="https://groupme.com/join_group/110257950/WJX63DOF" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Join our GroupMe
                </a>
              </li>
              <li><Link href="/contact" className="hover:text-white">Contact the team</Link></li>
              <li><Link href="/about#team" className="hover:text-white">Meet the team</Link></li>
              <li><Link href="/about#conduct" className="hover:text-white">Code of Conduct</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-mint-300">Find us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-mint-400" /> Room E172, Atholton High School, Columbia, MD</li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0 text-mint-400" />
                <a href="mailto:ahselectronicsclubteam@gmail.com" className="break-all hover:text-white">ahselectronicsclubteam@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-sm text-forest-300 sm:flex-row">
          <p>© {new Date().getFullYear()} Atholton Electronics Club. All rights reserved.</p>
          <p>Aqua Guardian · Samsung Solve for Tomorrow 2026 national semifinalist</p>
        </div>
      </div>
    </footer>
  );
}
