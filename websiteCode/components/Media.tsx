'use client';
import React from 'react';

/** Photo with a caption. Uses a plain <img> to match the rest of the site (no next/image config needed). */
export function Photo({
  src,
  alt,
  caption,
  className = '',
  imgClassName = '',
  focus,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
  focus?: string;
}) {
  return (
    <figure className={`group overflow-hidden rounded-2xl bg-forest-100 shadow-soft ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${imgClassName}`}
        style={focus ? { objectPosition: focus } : undefined}
      />
      {caption && (
        <figcaption className="bg-white px-4 py-2.5 text-sm text-gray-600">{caption}</figcaption>
      )}
    </figure>
  );
}

/** Self-hosted video with poster + controls, optional caption. */
export function Video({
  src,
  poster,
  caption,
  className = '',
}: {
  src: string;
  poster?: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`overflow-hidden rounded-2xl bg-black shadow-soft ${className}`}>
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        muted
        loop
        preload="none"
        className="aspect-video w-full bg-black object-cover"
      />
      {caption && <figcaption className="bg-white px-4 py-2.5 text-sm text-gray-600">{caption}</figcaption>}
    </figure>
  );
}

/** Vimeo / YouTube embed. */
export function Embed({
  provider,
  id,
  title,
  caption,
  className = '',
}: {
  provider: 'vimeo' | 'youtube';
  id: string;
  title: string;
  caption?: string;
  className?: string;
}) {
  const src =
    provider === 'vimeo'
      ? `https://player.vimeo.com/video/${id}?dnt=1`
      : `https://www.youtube-nocookie.com/embed/${id}`;
  return (
    <figure className={`overflow-hidden rounded-2xl bg-black shadow-soft ${className}`}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full"
      />
      {caption && <figcaption className="bg-white px-4 py-2.5 text-sm text-gray-600">{caption}</figcaption>}
    </figure>
  );
}
