// This is the new code for BuoyDataCard(placeholder).tsx

import React from 'react';

export default function BuoyDataCard() {
  return (
    // Main card container with the 'off-white' background
    <div className="bg-off-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto">
      
      {/* Header title of the card */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-400 font-medium">
          Aqua Guardian: Live Data
        </h3>
      </div>

      {/* Main "Not Deployed" message, centered */}
      <div className="flex flex-col items-center justify-center h-48 my-8">
        <h2 className="text-3xl font-bold text-dark-gray">
          Buoy Not Yet Deployed
        </h2>
        <p className="text-gray-500 mt-2">
          Live telemetry will be available here soon!
        </p>
      </div>

      {/* Status at the bottom of the card */}
      <div className="border-t border-gray-200 pt-4">
        <p className="text-gray-600">
          <span className="font-bold text-gray-700">Status:</span> Offline
        </p>
      </div>
    </div>
  );
}