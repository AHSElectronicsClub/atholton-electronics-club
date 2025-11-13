'use client';
export default function GridBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(to right, #00B7C2 1px, transparent 1px), linear-gradient(to bottom, #00B7C2 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: '0.05',
          maskImage: 'radial-gradient(ellipse at center, white 0%, transparent 70%)'
        }}
      />
    </div>
  );
}