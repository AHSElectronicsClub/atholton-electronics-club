import React from 'react';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  /** vertical focal point of the cover photo, e.g. "50% 40%" */
  focus?: string;
  size?: 'md' | 'lg';
  children?: React.ReactNode;
};

/** Dark-green hero banner with an optional real cover photo behind it. */
export default function PageHero({ eyebrow, title, subtitle, image, imageAlt = '', focus = '50% 50%', size = 'md', children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-950 text-white">
      {image && (
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          style={{ objectPosition: focus }}
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950 via-forest-950/80 to-forest-950/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${size === 'lg' ? 'py-28 md:py-40' : 'py-16 md:py-24'}`}>
        <div className="max-w-3xl">
          {eyebrow && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-mint-300">{eyebrow}</p>}
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-forest-100 md:text-xl">{subtitle}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
