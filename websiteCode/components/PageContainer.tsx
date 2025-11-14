import React from 'react';

export default function PageContainer({ title, icon, children }: { title: string, icon?: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex items-center mb-8">
        <div className="p-3 bg-teal/10 rounded-lg mr-4">{icon}</div>
        <h1 className="text-4xl font-bold font-display tracking-tight text-forest">{title}</h1>
      </div>
      {children}
    </div>
  );
}