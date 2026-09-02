import React from 'react';
import { Activity, Droplet, Thermometer, Zap, Battery, AlertTriangle } from 'lucide-react';

interface BuoyData {
  buoy_id: string;
  friendly_name: string;
  water_body_type: string;
  timestamp: string;
  water_leak: boolean;
  pH: number;
  Temp: number;
  EC: number;
  Turbidity: number;
  DO: number;
  ORP: number;
  battery_v: number | null;
}

export const BuoyDataCard: React.FC<{ data: BuoyData }> = ({ data }) => {
  // In-house battery threshold setting
  const BATTERY_THRESHOLD = 3.5; 
  const isBatteryLow = data.battery_v !== null && data.battery_v < BATTERY_THRESHOLD;
  const batteryColor = isBatteryLow ? 'text-red-500 bg-red-100' : 'text-emerald-500 bg-emerald-100';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-2xl w-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{data.friendly_name}</h2>
          <p className="text-sm text-gray-500">ID: {data.buoy_id} • {data.water_body_type}</p>
        </div>
        
        {/* Battery & Status Indicators */}
        <div className="flex items-center gap-3">
          {data.water_leak && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold uppercase tracking-wider">
              <AlertTriangle size={14} /> Leak
            </div>
          )}
          {data.battery_v !== null && (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${batteryColor}`}>
              <Battery size={16} />
              {data.battery_v.toFixed(2)}V
            </div>
          )}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <MetricItem icon={<Thermometer />} label="Temp" value={`${data.Temp}°C`} color="text-orange-500" />
        <MetricItem icon={<Droplet />} label="pH Level" value={data.pH.toFixed(2)} color="text-blue-500" />
        <MetricItem icon={<Activity />} label="Dis. Oxygen" value={`${data.DO} mg/L`} color="text-cyan-500" />
        <MetricItem icon={<Zap />} label="Conductivity" value={`${data.EC} µS/cm`} color="text-purple-500" />
        <MetricItem icon={<Activity />} label="Turbidity" value={`${data.Turbidity} NTU`} color="text-amber-500" />
        <MetricItem icon={<Activity />} label="ORP" value={`${data.ORP} mV`} color="text-indigo-500" />
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400 text-right">
        Last updated: {new Date(data.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

// Reusable micro-component for sleek metric rendering
const MetricItem = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) => (
  <div className="flex flex-col p-3 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
    <div className={`flex items-center gap-2 mb-2 ${color} opacity-80`}>
      {React.cloneElement(icon as React.ReactElement, { size: 18 })}
      <span className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</span>
    </div>
    <div className="text-xl font-semibold text-gray-800">{value}</div>
  </div>
);