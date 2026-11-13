import React from 'react';

/** Simple titled content wrapper. Pages with a photo hero use <PageHero /> instead. */
export default function PageContainer({ title, icon, children }: { title?: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      {title && (
        <div className="mb-8 flex items-center gap-3">
          {icon}
          <h1 className="font-display text-4xl font-bold tracking-tight text-forest-900 md:text-5xl">{title}</h1>
        </div>
      )}
      {children}
    </div>
  );
}
