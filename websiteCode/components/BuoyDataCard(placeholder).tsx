import React from 'react';

// --- In-lined SVG Icon to fix compile errors ---
// This is the "Offline" status icon
const StatusOfflineIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728m-2.828-2.828a5.25 5.25 0 010-7.072M7.93 7.93a5.25 5.25 0 017.072 0m-7.072 7.072a5.25 5.25 0 010-7.072m10.606-2.828a.75.75 0 10-1.06-1.06L5.636 18.364a.75.75 0 001.06 1.06L18.364 5.636z" />
  </svg>
);


export default function BuoyDataCard() {
  return (
    // Main card: white, shadow, rounded
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      
      {/* Top Title Bar */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-sm font-medium text-gray-500">
          Aqua Guardian: Live Data
        </h2>
      </div>

      {/* Main Content Area */}
      <div className="p-12 text-center">
        {/* Uses 'dark-gray' from your config */}
        <h3 className="text-2xl font-bold text-dark-gray">
          Buoy Not Yet Deployed
        </h3>
        <p className="mt-2 text-gray-600">
          Live telemetry will be available here soon!
        </p>
      </div>

      {/* Footer Status Bar */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center">
        <StatusOfflineIcon className="w-5 h-5 text-gray-400 mr-2" />
        <span className="text-sm text-gray-700">
          Status: <span className="font-medium text-gray-900">Offline</span>
        </span>
      </div>
    </div>
  );
}