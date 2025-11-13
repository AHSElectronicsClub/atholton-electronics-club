'use client';
import React, { useEffect, useState } from 'react';

export default function AquaGuardianPanel() {
  const [telemetry, setTelemetry] = useState({ temp: 18.2, turbidity: 4.8, algae: 120.5, status: 'Operational' });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        temp: parseFloat((prev.temp + (Math.random() - 0.5) * 0.2).toFixed(1)),
        turbidity: parseFloat(Math.max(0, prev.turbidity + (Math.random() - 0.5) * 0.5).toFixed(1)),
        algae: parseFloat(Math.max(50, prev.algae + (Math.random() - 0.5) * 5).toFixed(1)),
        status: 'Operational'
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-navy-dark rounded-xl shadow-2xl p-6 border-2 border-teal/30">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white font-display">Aqua Guardian: Live Data</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-400 font-medium">LIVE</span>
        </div>
      </div>
      <p className="text-sm text-gray-400 mb-6">Simulated telemetry from our environmental monitoring buoy.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="text-center bg-navy-light p-4 rounded-lg">
          <div className="text-sm text-gray-300 mb-1">Water Temp</div>
          <div className="text-4xl font-bold text-orange tracking-tight">{telemetry.temp}<span className="text-2xl opacity-70">°C</span></div>
        </div>
        <div className="text-center bg-navy-light p-4 rounded-lg">
          <div className="text-sm text-gray-300 mb-1">Turbidity</div>
          <div className="text-4xl font-bold text-teal tracking-tight">{telemetry.turbidity}<span className="text-2xl opacity-70"> NTU</span></div>
        </div>
        <div className="text-center bg-navy-light p-4 rounded-lg">
          <div className="text-sm text-gray-300 mb-1">Algae Sensor</div>
          <div className="text-4xl font-bold text-white tracking-tight">{telemetry.algae}<span className="text-2xl opacity-70"> mV</span></div>
        </div>
      </div>

      <div className="text-center mt-6 text-sm text-gray-500">Status: <span className="text-green-400">{telemetry.status}</span></div>
    </div>
  );
}