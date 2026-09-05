export function adaptSupabaseRowToBuoyData(row: any) {
  const samplesArray = Array.isArray(row.samples) ? row.samples : [];
  const latestSample = samplesArray.length > 0 ? samplesArray[samplesArray.length - 1] : {};

  return {
    buoy_id: row.buoy_id || 'AG-01',
    friendly_name: row.friendly_name || 'Aqua Guardian Buoy',
    water_body_type: row.water_body_type || 'Freshwater',
    timestamp: row.timestamp || new Date().toISOString(),
    water_leak: Boolean(row.water_leak),
    ph: latestSample.pH ?? latestSample.ph ?? null,
    temp: latestSample.temp ?? latestSample.Temp ?? null,
    ec: latestSample.EC ?? latestSample.ec ?? null,
    turbidity: latestSample.Turb ?? latestSample.turbidity ?? null,
    DO: latestSample.DO ?? latestSample.do ?? null,
    orp: latestSample.ORP ?? latestSample.orp ?? null,
    battery_v: latestSample.Bat ?? latestSample.battery_v ?? null,
    gps_lat: row.gps?.lat ?? row.gps_lat ?? null,
    gps_lon: row.gps?.lon ?? row.gps_lon ?? null,
  };
}