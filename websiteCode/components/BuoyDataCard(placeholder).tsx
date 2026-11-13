import React from 'react';
import { Activity, Droplet, Thermometer, Zap, Battery, AlertTriangle, Navigation, Wind, Info, ArrowRight } from 'lucide-react';

interface BuoyData {
  buoy_id: string;
  friendly_name: string;
  water_body_type: string;
  timestamp: string;
  water_leak: boolean;
  ph: number | null;
  temp: number | null;
  air_temp: number | null;
  humidity: number | null;
  ec: number | null;
  turbidity: number | null;
  DO: number | null;
  orp: number | null;
  battery_v: number | null;
  gps_lat: number | null;
  gps_lon: number | null;
}

export const BuoyDataCard: React.FC<{ data: BuoyData; showDashboardLink?: boolean }> = ({ data, showDashboardLink = true }) => {
  const BATTERY_THRESHOLD = 3.5;
  const batteryVal = typeof data.battery_v === 'number' ? data.battery_v : null;
  const isBatteryLow = batteryVal !== null && batteryVal < BATTERY_THRESHOLD;
  const batteryColor = isBatteryLow ? 'text-red-700 bg-red-100' : 'text-forest-700 bg-forest-100';

  const formatVal = (val: number | null, decimals: number = 2, suffix: string = '') => {
    if (val === null || val === undefined || isNaN(val)) return 'N/A';
    return `${val.toFixed(decimals)}${suffix}`;
  };

  // Enclosure Threshold Status Helpers
  const getAirTempStatus = (t: number | null) => {
    if (t === null) return { text: 'N/A', color: 'bg-gray-100 text-gray-600' };
    if (t > 75) return { text: 'Critical', color: 'bg-red-100 text-red-700' };
    if (t > 50) return { text: 'Warning', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Normal', color: 'bg-forest-100 text-forest-700' };
  };

  const getHumidityStatus = (h: number | null) => {
    if (h === null) return { text: 'N/A', color: 'bg-gray-100 text-gray-600' };
    if (h > 85) return { text: 'Critical', color: 'bg-red-100 text-red-700' };
    if (h > 70) return { text: 'Warning', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Normal', color: 'bg-forest-100 text-forest-700' };
  };

  const airTempStatus = getAirTempStatus(data.air_temp);
  const humidityStatus = getHumidityStatus(data.humidity);
  const hasValidGps = data.gps_lat !== null && data.gps_lon !== null && !isNaN(data.gps_lat) && !isNaN(data.gps_lon);

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-forest-100 bg-white shadow-lift">
      {/* Header band */}
      <div className="relative bg-hero-gradient px-6 py-5 text-white">
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-mint-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint-400" />
              </span>
              Live from the lake
            </div>
            <h2 className="font-display text-2xl font-bold">{data.friendly_name || 'Buoy Unit'}</h2>
            <p className="text-sm text-forest-200">ID: {data.buoy_id || 'N/A'} • {data.water_body_type || 'Water Body'}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {data.water_leak && (
              <div className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-700">
                <AlertTriangle size={14} /> Leak flag
              </div>
            )}
            {batteryVal !== null && (
              <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${batteryColor}`}>
                <Battery size={16} />
                {batteryVal.toFixed(2)}V
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* GPS Location Bar */}
        <div className="mb-5 flex flex-wrap items-center gap-2 rounded-xl border border-forest-100 bg-forest-50 px-3 py-2 text-xs text-forest-800">
          <Navigation size={14} className="text-buoy-500" />
          <span className="font-semibold">GPS location:</span>
          <span>{hasValidGps ? `${data.gps_lat?.toFixed(4)}°, ${data.gps_lon?.toFixed(4)}°` : 'N/A'}</span>
          <span className="text-forest-500">· Lake Elkhorn, Columbia, MD</span>
        </div>

        <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-forest-500">Water quality</h3>
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          <MetricItem icon={<Thermometer />} label="Water Temp" value={formatVal(data.temp, 1, '°C')} hint="Warmer water holds less oxygen and fuels algae growth." color="text-orange-600" />
          <MetricItem icon={<Droplet />} label="pH Level" value={formatVal(data.ph, 2)} hint="Healthy lakes sit around 6.5 to 8.5." color="text-sky-600" />
          <MetricItem icon={<Activity />} label="Dis. Oxygen" value={formatVal(data.DO, 1, ' mg/L')} hint="What fish breathe. Below ~5 mg/L stresses aquatic life." color="text-cyan-600" />
          <MetricItem icon={<Zap />} label="Conductivity" value={formatVal(data.ec, 0, ' µS/cm')} hint="Dissolved salts and minerals. Spikes can mean runoff." color="text-purple-600" />
          <MetricItem icon={<Activity />} label="Turbidity" value={formatVal(data.turbidity, 1, ' NTU')} hint="How cloudy the water is, from sediment or algae." color="text-amber-600" />
          <MetricItem icon={<Activity />} label="ORP" value={formatVal(data.orp, 0, ' mV')} hint="Oxidation-reduction potential: a clue to organic pollution." color="text-indigo-600" />
        </div>

        <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-forest-500">Inside the buoy</h3>
        <div className="mb-5 grid grid-cols-2 gap-3">
          <div className="flex flex-col rounded-xl border border-forest-100 bg-forest-50/60 p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-orange-600">
                <Thermometer size={18} />
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500">Internal Air Temp</span>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${airTempStatus.color}`}>{airTempStatus.text}</span>
            </div>
            <div className="text-xl font-semibold text-gray-800">{formatVal(data.air_temp, 1, '°C')}</div>
            <p className="mt-1 text-xs text-gray-500">Electronics enclosure. Warning above 50, critical above 75.</p>
          </div>

          <div className="flex flex-col rounded-xl border border-forest-100 bg-forest-50/60 p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sky-600">
                <Wind size={18} />
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500">Internal Humidity</span>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${humidityStatus.color}`}>{humidityStatus.text}</span>
            </div>
            <div className="text-xl font-semibold text-gray-800">{formatVal(data.humidity, 1, '%')}</div>
            <p className="mt-1 text-xs text-gray-500">Watches for moisture in the hull. Warning above 70%, critical above 85%.</p>
          </div>
        </div>

        {/* Interactive Map View */}
        <div className="h-48 w-full overflow-hidden rounded-xl border border-forest-100 bg-forest-50 shadow-inner">
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
            <div className="flex h-full items-center justify-center text-sm text-gray-400">GPS Location Unavailable</div>
          )}
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl bg-buoy-500/10 px-3 py-2.5 text-xs leading-relaxed text-buoy-700">
          <Info size={14} className="mt-0.5 shrink-0" />
          <span>
            We are still calibrating pH, dissolved oxygen, ORP, turbidity and conductivity, so read these as trends rather than lab-grade values. The leak flag comes from the humidity sensor inside the hull, so treat it as a prompt to check, not proof.
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-forest-100 pt-4">
          <span className="text-xs text-gray-500">
            Last updated: {data.timestamp ? new Date(data.timestamp).toLocaleString() : 'N/A'}
          </span>
          {showDashboardLink && (
            <a href="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-semibold text-buoy-600 hover:text-buoy-700">
              Explore trends in the full dashboard <ArrowRight size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const MetricItem = ({ icon, label, value, color, hint }: { icon: React.ReactNode; label: string; value: string; color: string; hint?: string }) => (
  <div className="flex flex-col rounded-xl border border-forest-100 bg-forest-50/60 p-3 transition-shadow hover:shadow-md">
    <div className={`mb-2 flex items-center gap-2 ${color}`}>
      {React.cloneElement(icon as React.ReactElement, { size: 18 } as { size?: number })}
      <span className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</span>
    </div>
    <div className="text-xl font-semibold text-gray-900">{value}</div>
    {hint && <p className="mt-1 text-xs leading-snug text-gray-500">{hint}</p>}
  </div>
);
