export function adaptSupabaseRowToBuoyData(row: any) {
  const samplesArray = Array.isArray(row.samples) ? row.samples : [];
  const latestSample = samplesArray.length > 0 ? samplesArray[samplesArray.length - 1] : {};

  return {
    buoy_id: row.buoy_id || row.device_id || 'AG-01',
    friendly_name: row.friendly_name || 'Aqua Guardian Buoy',
    water_body_type: row.water_body_type || 'Freshwater',
    timestamp: row.timestamp || new Date().toISOString(),
    water_leak: Boolean(row.water_leak),
    
    // Check flat columns first, then fall back to the JSONB samples array
    ph: row.ph ?? latestSample.pH ?? latestSample.ph ?? null,
    temp: row.temp ?? latestSample.temp ?? latestSample.Temp ?? null,
    ec: row.ec ?? latestSample.EC ?? latestSample.ec ?? null,
    turbidity: row.turbidity ?? latestSample.Turb ?? latestSample.turbidity ?? null,
    DO: row.DO ?? latestSample.DO ?? latestSample.do ?? null,
    orp: row.orp ?? latestSample.ORP ?? latestSample.orp ?? null,
    battery_v: row.battery_v ?? latestSample.Bat ?? latestSample.battery_v ?? null,

    // Check flat GPS columns first, then fall back to the JSONB gps object
    gps_lat: row.gps_lat ?? row.gps?.lat ?? null,
    gps_lon: row.gps_lon ?? row.gps?.lon ?? null,
  };
}