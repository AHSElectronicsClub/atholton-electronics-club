//This the placeholder, actual code is in my notes app
// 📍 FILE: components/BuoyDataCard.tsx
//
import React from 'react';

export default function BuoyDataCard() {
  return (
    <div className="bg-navy-dark rounded-lg shadow-xl p-6 text-white">
      <h2 className="text-xl font-bold mb-4">Aqua Guardian: Live Data</h2>
      <div className="text-center py-10">
        <p className="text-2xl font-bold mb-2">Buoy Not Yet Deployed</p>
        <p className="text-gray-300">Live telemetry will be available here soon!</p>
      </div>
      <div className="text-sm text-gray-400">
        Status: Offline
      </div>
    </div>
  );
}