'use client';
import React from 'react';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary'|'secondary'|'outline';
  className?: string;
  href?: string;
  target?: string;
  [k: string]: any;
};

export default function Button({ children, onClick, variant = 'primary', className = '', href, target, ...props }: Props) {
  const base = 'inline-block px-6 py-3 rounded-lg font-semibold text-center transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const styles: Record<string,string> = {
    primary: 'bg-teal text-navy hover:bg-orange hover:text-white focus:ring-orange',
    secondary: 'bg-gray-200 text-navy hover:bg-navy-light hover:text-white focus:ring-teal',
    outline: 'bg-transparent border-2 border-teal text-teal hover:bg-teal hover:text-navy focus:ring-teal'
  };

  if (href) {
    return <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className={`${base} ${styles[variant]} ${className}`} {...props}>{children}</a>;
  }
  return <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`} {...props}>{children}</button>;
}
