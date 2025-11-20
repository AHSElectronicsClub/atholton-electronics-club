import React from 'react';

export default function PageContainer({ title, icon, children }: { title: string, icon?: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-8">
        <h1 className="text-5xl font-bold font-display tracking-tight text-forest">{title}</h1>
      </div>
      {children}
    </div>
  );
}

