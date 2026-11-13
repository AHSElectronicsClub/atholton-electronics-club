'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Activity } from 'lucide-react';

const GROUPME = 'https://groupme.com/join_group/110257950/WJX63DOF';

const NAV = [
  { name: 'Home', href: '/' },
  { name: 'Journey', href: '/journey' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Resources', href: '/resources' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || '/';
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const dashActive = isActive('/dashboard');

  const DashboardLink = ({ mobile = false }: { mobile?: boolean }) => (
    <Link
      href="/dashboard"
      onClick={() => setOpen(false)}
      className={`group relative inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-200 ${
        mobile ? 'w-full justify-center px-4 py-3 text-base' : 'px-4 py-2 text-sm'
      } ${
        dashActive
          ? 'bg-white text-forest-900 shadow-glow'
          : 'bg-buoy-500 text-white shadow-md hover:bg-buoy-600 hover:-translate-y-0.5'
      }`}
    >
      <Activity size={16} />
      Data Explorer
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-forest-950/95 backdrop-blur supports-[backdrop-filter]:bg-forest-950/85">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Atholton Electronics Club home">
          <img src="/logo.png" alt="" width={44} height={44} className="h-11 w-11 rounded-full ring-2 ring-white/10" />
          <span className="hidden font-display text-lg font-bold leading-tight text-white sm:block">
            Atholton
            <span className="block text-xs font-medium uppercase tracking-[0.2em] text-mint-300">Electronics Club</span>
          </span>
          <span className="font-display text-lg font-bold text-white sm:hidden">AEC</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.slice(0, 3).map((item) => (
            <NavLink key={item.href} item={item} active={isActive(item.href)} />
          ))}
          <div className="mx-2">
            <DashboardLink />
          </div>
          {NAV.slice(3).map((item) => (
            <NavLink key={item.href} item={item} active={isActive(item.href)} />
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={GROUPME}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
          >
            Join the Club
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-full bg-buoy-500 px-3.5 py-2 text-sm font-semibold text-white"
          >
            <Activity size={14} />
            Data Explorer
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:bg-white/10 hover:text-white"
            aria-expanded={open}
            aria-label="Toggle main menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-forest-950 lg:hidden">
          <div className="space-y-1 px-4 py-4">
            <DashboardLink mobile />
            <div className="pt-2">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-3 text-base font-medium ${
                    isActive(item.href) ? 'bg-white/10 text-white' : 'text-white/75 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href={GROUPME}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block rounded-lg border border-white/25 px-3 py-3 text-center font-semibold text-white"
              >
                Join the Club
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ item, active }: { item: { name: string; href: string }; active: boolean }) {
  return (
    <Link
      href={item.href}
      className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        active ? 'text-white' : 'text-white/70 hover:text-white'
      }`}
    >
      {item.name}
      <span
        className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-mint-400 transition-opacity ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </Link>
  );
}
