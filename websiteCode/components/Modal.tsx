'use client';
import React from 'react';
import { XIcon } from './Icons';

export default function Modal({ isOpen, onClose, children }: { isOpen: boolean, onClose: ()=>void, children?: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-off-white rounded-xl shadow-2xl w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto relative" onClick={(e)=>e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-forest transition-colors z-10" aria-label="Close">
          <XIcon className="w-8 h-8" />
        </button>
        {children}
      </div>
    </div>
  );
}
  