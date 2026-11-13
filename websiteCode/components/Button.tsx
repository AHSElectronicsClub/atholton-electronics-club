'use client';
import React from 'react';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark' | 'light' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  target?: string;
  [k: string]: any;
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-buoy-500 disabled:opacity-50 disabled:cursor-not-allowed';

const sizes: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm sm:text-base',
  lg: 'px-8 py-4 text-base sm:text-lg',
};

const variants: Record<string, string> = {
  primary: 'bg-buoy-500 text-white shadow-md hover:bg-buoy-600 hover:-translate-y-0.5 hover:shadow-lg',
  secondary: 'bg-forest-100 text-forest-800 hover:bg-forest-200',
  dark: 'bg-forest-800 text-white shadow-md hover:bg-forest-700 hover:-translate-y-0.5',
  light: 'bg-white text-forest-800 shadow-md hover:bg-forest-50 hover:-translate-y-0.5',
  outline: 'border-2 border-white/70 text-white hover:bg-white/10 hover:border-white',
  ghost: 'text-forest-700 hover:bg-forest-50',
};

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  target,
  ...props
}: Props) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className={cls} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls} {...props}>
      {children}
    </button>
  );
}
