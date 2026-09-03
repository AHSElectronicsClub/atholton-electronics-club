import React from 'react';
import { Activity, Droplet, Thermometer, Zap, Battery, AlertTriangle, Navigation } from 'lucide-react';

interface BuoyData {
  buoy_id: string;
  friendly_name: string;
  water_body_type: string;
  timestamp: string;
  water_leak: boolean;
  ph: number | null;
  temp: number | null;
  ec: number | null;
  turbidity: number | null;
  DO: number | null;
  orp: number | null;
  battery_v: number | null;
  gps_lat: number | null;
  gps_lon: number | null;
}

export const BuoyDataCard: React.FC<{ data: BuoyData }> = ({ data }) => {
  const BATTERY_THRESHOLD = 3.5; 
  const batteryVal = typeof data.battery_v === 'number' ? data.battery_v : null;
  const isBatteryLow = batteryVal !== null && batteryVal < BATTERY_THRESHOLD;
  const batteryColor = isBatteryLow ? 'text-red-500 bg-red-100' : 'text-emerald-500 bg-emerald-100';

  const formatVal = (val: number | null, decimals: number = 2, suffix: string = '') => {
    if (val === null || val === undefined || isNaN(val)) return 'N/A';
    return `${val.toFixed(decimals)}${suffix}`;
  };

  const hasValidGps = data.gps_lat !== null && data.gps_lon !== null && !isNaN(data.gps_lat) && !isNaN(data.gps_lon);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-2xl w-full">
      <div className="flex justify-between items-start mb-4">
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

      {/* GPS Location Bar */}
      <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-600">
        <Navigation size={14} className="text-blue-500" />
        <span className="font-semibold text-gray-700">GPS Location:</span>
        <span>{hasValidGps ? `${data.gps_lat?.toFixed(4)}°, ${data.gps_lon?.toFixed(4)}°` : 'N/A'}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <MetricItem icon={<Thermometer />} label="Temp" value={formatVal(data.temp, 1, '°C')} color="text-orange-500" />
        <MetricItem icon={<Droplet />} label="pH Level" value={formatVal(data.ph, 2)} color="text-blue-500" />
        <MetricItem icon={<Activity />} label="Dis. Oxygen" value={formatVal(data.DO, 1, ' mg/L')} color="text-cyan-500" />
        <MetricItem icon={<Zap />} label="Conductivity" value={formatVal(data.ec, 0, ' µS/cm')} color="text-purple-500" />
        <MetricItem icon={<Activity />} label="Turbidity" value={formatVal(data.turbidity, 1, ' NTU')} color="text-amber-500" />
        <MetricItem icon={<Activity />} label="ORP" value={formatVal(data.orp, 0, ' mV')} color="text-indigo-500" />
      </div>

      {/* Interactive Map View */}
      <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50">
        {hasValidGps ? (
          <iframe
            title="Buoy Map Location"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${(data.gps_lon ?? 0) - 0.01}%2C${(data.gps_lat ?? 0) - 0.01}%2C${(data.gps_lon ?? 0) + 0.01}%2C${(data.gps_lat ?? 0) + 0.01}&layer=mapnik&marker=${data.gps_lat}%2C${data.gps_lon}`}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            GPS Location Unavailable
          </div>
        )}
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
      {React.cloneElement(icon as React.ReactElement, { size: 18 } as { size?: number })}
      <span className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</span>
    </div>
    <div className="text-xl font-semibold text-gray-800">{value}</div>
  </div>
);