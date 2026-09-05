export function adaptSupabaseRowToBuoyData(row: any) {
  if (!row) return null;

  // Safe fallback for legacy rows if a JSON samples array still exists
  let samplesArray = row.samples;
  if (typeof samplesArray === 'string') {
    try {
      samplesArray = JSON.parse(samplesArray);
    } catch (e) {
      samplesArray = [];
    }
  }
  samplesArray = Array.isArray(samplesArray) ? samplesArray : [];
  const latestSample = samplesArray.length > 0 ? samplesArray[samplesArray.length - 1] : {};

  // Safely parse gps if it's a string or an object
  let gpsObj = row.gps;
  if (typeof gpsObj === 'string') {
    try {
      gpsObj = JSON.parse(gpsObj);
    } catch (e) {
      gpsObj = {};
    }
  }
  gpsObj = typeof gpsObj === 'object' && gpsObj !== null ? gpsObj : {};

  return {
    buoy_id: row.buoy_id || row.device_id || 'AG-01',
    friendly_name: row.friendly_name || 'Aqua Guardian Buoy',
    water_body_type: row.water_body_type || 'Freshwater',
    timestamp: row.timestamp || row.sample_time || new Date().toISOString(),
    water_leak: Boolean(row.water_leak),
    
    // Map values supporting normalized flat columns, uppercase keys, and legacy JSON fallback
    ph: row.ph ?? latestSample.pH ?? latestSample.ph ?? null,
    temp: row.temp ?? latestSample.temp ?? latestSample.Temp ?? null,             // Water temperature (DS18B20)
    air_temp: row.air_temp ?? latestSample.air_temp ?? null,                     // Enclosure air temperature (SHT40)
    humidity: row.humidity ?? latestSample.humidity ?? null,                     // Enclosure humidity (SHT40)
    ec: row.ec ?? latestSample.EC ?? latestSample.ec ?? null,
    turbidity: row.turbidity ?? latestSample.Turb ?? latestSample.turbidity ?? null,
    DO: row.DO ?? latestSample.DO ?? latestSample.do ?? null,
    orp: row.orp ?? latestSample.ORP ?? latestSample.orp ?? null,
    battery_v: row.battery_v ?? latestSample.Bat ?? latestSample.battery_v ?? null,

    // Map GPS coordinates
    gps_lat: row.gps_lat ?? gpsObj.lat ?? gpsObj.latitude ?? 0,
    gps_lon: row.gps_lon ?? gpsObj.lon ?? gpsObj.longitude ?? 0,
  };
}