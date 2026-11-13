import React from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  action?: React.ReactNode;
}) {
  return (
    <div className={`mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${align === 'center' ? 'text-center md:flex-col md:items-center' : ''}`}>
      <div className={align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="font-display text-3xl font-bold tracking-tight text-forest-900 md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-lg leading-relaxed text-gray-600">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
