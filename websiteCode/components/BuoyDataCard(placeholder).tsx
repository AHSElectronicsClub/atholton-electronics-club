import React from 'react';
import { Activity, Droplet, Thermometer, Zap, Battery, AlertTriangle } from 'lucide-react';

interface BuoyData {
  buoy_id: string;
  friendly_name: string;
  water_body_type: string;
  timestamp: string;
  water_leak: boolean;
  pH: number | null;
  Temp: number | null;
  EC: number | null;
  Turbidity: number | null;
  DO: number | null;
  ORP: number | null;
  battery_v: number | null;
}

export const BuoyDataCard: React.FC<{ data: BuoyData }> = ({ data }) => {
  const BATTERY_THRESHOLD = 3.5; 
  const batteryVal = typeof data.battery_v === 'number' ? data.battery_v : null;
  const isBatteryLow = batteryVal !== null && batteryVal < BATTERY_THRESHOLD;
  const batteryColor = isBatteryLow ? 'text-red-500 bg-red-100' : 'text-emerald-500 bg-emerald-100';

  // Safe formatter helper
  const formatVal = (val: number | null, decimals: number = 2, suffix: string = '') => {
    if (val === null || val === undefined || isNaN(val)) return 'N/A';
    return `${val.toFixed(decimals)}${suffix}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-2xl w-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{data.friendly_name || 'Buoy Unit'}</h2>
          <p className="text-sm text-gray-500">ID: {data.buoy_id || 'N/A'} • {data.water_body_type || 'Water Body'}</p>
        </div>
        
        <div className="flex items-center gap-3">
          {data.water_leak && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold uppercase tracking-wider">
              <AlertTriangle size={14} /> Leak
            </div>
          )}
          {batteryVal !== null && (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${batteryColor}`}>
              <Battery size={16} />
              {batteryVal.toFixed(2)}V
            </div>
          )}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <MetricItem icon={<Thermometer />} label="Temp" value={formatVal(data.Temp, 1, '°C')} color="text-orange-500" />
        <MetricItem icon={<Droplet />} label="pH Level" value={formatVal(data.pH, 2)} color="text-blue-500" />
        <MetricItem icon={<Activity />} label="Dis. Oxygen" value={formatVal(data.DO, 1, ' mg/L')} color="text-cyan-500" />
        <MetricItem icon={<Zap />} label="Conductivity" value={formatVal(data.EC, 0, ' µS/cm')} color="text-purple-500" />
        <MetricItem icon={<Activity />} label="Turbidity" value={formatVal(data.Turbidity, 1, ' NTU')} color="text-amber-500" />
        <MetricItem icon={<Activity />} label="ORP" value={formatVal(data.ORP, 0, ' mV')} color="text-indigo-500" />
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400 text-right">
        Last updated: {data.timestamp ? new Date(data.timestamp).toLocaleString() : 'N/A'}
      </div>
    </div>
  );
};

const MetricItem = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) => (
  <div className="flex flex-col p-3 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
    <div className={`flex items-center gap-2 mb-2 ${color} opacity-80`}>
      {React.isValidElement(icon) ? React.cloneElement(icon, { size: 18 } as { size?: number }) : icon}
      <span className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</span>
    </div>
    <div className="text-xl font-semibold text-gray-800">{value}</div>
  </div>
);