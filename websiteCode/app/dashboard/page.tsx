'use client';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import './dashboard.css';
import { Info, ArrowRight } from 'lucide-react';

declare global {
  interface Window {
    Plotly: any;
    L: any;
  }
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [libsLoaded, setLibsLoaded] = useState({ plotly: false, leaflet: false });
  
  // Real data state instead of dummy import
  const [dashboardData, setDashboardData] = useState<any>(null);
  
  // New error state for handling missing data cleanly
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Form input states
  const [buoyId, setBuoyId] = useState('AG-01'); // Matches your Supabase setup
  // Default window is the current day (in the visitor's local time); filled in on mount to avoid SSR/client mismatch.
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Format a Date as the 'YYYY-MM-DDTHH:mm' string <input type="datetime-local"> expects (local time).
  const toLocalInput = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const setRangeToToday = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59);
    setStartTime(toLocalInput(start));
    setEndTime(toLocalInput(end));
  };

  const setRangeToLast = (hours: number) => {
    const now = new Date();
    setStartTime(toLocalInput(new Date(now.getTime() - hours * 3600 * 1000)));
    setEndTime(toLocalInput(now));
  };

  useEffect(() => {
    setRangeToToday();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const processAndRenderDashboard = (data: any) => {
    if (!window.Plotly || !window.L) {
      console.warn("Libraries not loaded yet");
      return;
    }

    const { dashboard_metrics, gps_coordinates, buoy_id } = data;
    const rawData = dashboard_metrics.raw_data;
    const zscores = dashboard_metrics.raw_data_zscores || rawData;
    const movingAvg = dashboard_metrics.moving_average || rawData;
    
    // 1. Raw Values Graph
    const timestamps = rawData.map((d: any) => d.timestamp);
    // Inside processAndRenderDashboard and getBaselineRows in page_2.tsx:
    const sensors = ['pH', 'DO', 'EC', 'Turbidity', 'Temp', 'ORP'];
    const sensorColors: any = { 
      'pH': '#2563eb', 
      'DO': '#0891b2', 
      'EC': '#7c3aed', 
      'Turbidity': '#b45309', 
      'Temp': '#f26b21', 
      'ORP': '#3f8059' 
    };

    const rawTraces = sensors.map(sensor => ({
      x: timestamps,
      y: rawData.map((d: any) => d[sensor]),
      type: 'scatter',
      mode: 'lines+markers',
      name: sensor,
      line: { color: sensorColors[sensor], width: 2 },
      marker: { size: 4 }
    }));

    const layoutBase = {
      dragmode: 'pan',
      xaxis: { title: 'Time', type: 'date', gridcolor: '#e6efe8' },
      yaxis: { title: 'Value', gridcolor: '#e6efe8' },
      plot_bgcolor: 'rgba(245,247,241,0.6)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      font: { family: 'Inter, system-ui, sans-serif', color: '#25533A' },
      legend: { orientation: 'h', y: -0.3 },
      margin: { t: 40, r: 30, b: 90, l: 60 }
    };

    window.Plotly.newPlot('raw-values-graph', rawTraces, { ...layoutBase, title: 'Raw Sensor Values' }, { responsive: true });

    // 2. Deviation Graph
    const devTraces = sensors.map(sensor => ({
      x: timestamps,
      y: zscores.map((d: any) => d[sensor]),
      type: 'scatter',
      mode: 'lines+markers',
      name: sensor,
      line: { color: sensorColors[sensor], width: 2 }
    }));

    const thresholds = [
        { y: [1, 1], color: '#f39c12', name: 'Warning (+1σ)' },
        { y: [-1, -1], color: '#f39c12', name: 'Warning (-1σ)' },
        { y: [2, 2], color: '#e74c3c', name: 'Alert (+2σ)' },
        { y: [-2, -2], color: '#e74c3c', name: 'Alert (-2σ)' }
    ].map(t => ({
        x: [timestamps[0], timestamps[timestamps.length - 1]],
        y: t.y,
        mode: 'lines',
        name: t.name,
        line: { color: t.color, dash: 'dash' }
    }));

    window.Plotly.newPlot('deviation-graph', [...devTraces, ...thresholds], { ...layoutBase, title: 'Deviations', yaxis: { title: 'Standard Deviations', gridcolor: '#e6efe8' } }, { responsive: true });

    // 3. Moving Avg Graph
    const maTraces = sensors.map(sensor => ({
      x: timestamps,
      y: movingAvg.map((d: any) => d[sensor]),
      type: 'scatter',
      mode: 'lines',
      name: sensor,
      line: { color: sensorColors[sensor], width: 2 }
    }));
    window.Plotly.newPlot('moving-avg-graph', maTraces, { ...layoutBase, title: 'Moving Averages' }, { responsive: true });

    // 4. Initialize Map
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapContainer.innerHTML = "<div id='map-inner' style='height:100%; width:100%'></div>";
        const map = window.L.map('map-inner').setView([gps_coordinates.latitude, gps_coordinates.longitude], 13);
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        window.L.marker([gps_coordinates.latitude, gps_coordinates.longitude]).addTo(map)
            .bindPopup(`Buoy ${buoy_id}`).openPopup();
    }
  };

  const getBaselineRows = () => {
    if (!dashboardData) return null;
    const { baselines, baseline_std_devs } = dashboardData.calculation_details;
    const lastData = dashboardData.dashboard_metrics.raw_data[dashboardData.dashboard_metrics.raw_data.length - 1];

    // Filter out air_temp and humidity so they don't appear in the baseline table
    const sensors = Object.keys(baselines).filter(
      sensor => sensor !== 'air_temp' && sensor !== 'humidity'
    );

    return sensors.map(sensor => {
        const base = baselines[sensor];
        const dev = baseline_std_devs[sensor];
        const curr = lastData[sensor];
        let status = 'Green'; 
        
        if (base !== undefined && dev !== undefined && curr !== undefined) {
            const z = Math.abs((curr - base) / dev);
            if (z > 2) status = 'Red';
            else if (z > 1) status = 'Yellow';
        }

        return (
            <tr key={sensor}>
                <td>{sensor}</td>
                <td>{base?.toFixed(4) || 'N/A'}</td>
                <td>{dev?.toFixed(4) || 'N/A'}</td>
                <td><span className={`info-badge badge-${status.toLowerCase()}`}>{status === 'Green' ? 'Normal' : status === 'Yellow' ? 'Watch' : 'Alert'}</span></td>
            </tr>
        );
    });
  };

  const handleRunAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAnalysisError(null); // Clear old errors before running
    
    try {
      // LIVE RENDER API CALL
      const response = await fetch('https://aqua-guardian-cloud-test.onrender.com/api/get-dashboard-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buoy_id: buoyId,
          timeframe_start: startTime + ':00', 
          timeframe_end: endTime + ':00' 
        })
      });

      const data = await response.json();
      
      // Catch backend errors (like our 404 No Data error)
      if (!response.ok || data.error) {
        throw new Error(data.error || `Server returned ${response.status}`);
      }

      setDashboardData(data);
      setShowDashboard(true);
      
      setTimeout(() => {
          processAndRenderDashboard(data);
      }, 100);

    } catch (err: any) {
      console.error(err);
      // Set the UI error instead of using alert()
      setAnalysisError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sensorGuide = [
    { name: 'Temp', ok: true, unit: '°C', what: 'Water temperature', tip: 'Warm water holds less oxygen and encourages algae. Sudden swings are unusual.' },
    { name: 'pH', ok: false, unit: '', what: 'How acidic or basic the water is', tip: 'Most healthy lakes sit between about 6.5 and 8.5. Algae blooms can push pH up.' },
    { name: 'DO', ok: false, unit: 'mg/L', what: 'Dissolved oxygen', tip: 'What fish and other aquatic life breathe. Values below about 5 mg/L can stress them.' },
    { name: 'EC', ok: true, unit: 'µS/cm', what: 'Electrical conductivity', tip: 'A proxy for dissolved salts and minerals. Jumps after rain or road-salt runoff are worth noticing.' },
    { name: 'Turbidity', ok: false, unit: 'NTU', what: 'Water clarity', tip: 'Higher means cloudier, from sediment stirred up by storms or from algae.' },
    { name: 'ORP', ok: false, unit: 'mV', what: 'Oxidation-reduction potential', tip: 'Sustained low values alongside low oxygen can point to decaying organic matter such as sewage.' },
  ];

  const quickRanges = [
    { label: 'Today', fn: setRangeToToday },
    { label: 'Last 24 hours', fn: () => setRangeToLast(24) },
    { label: 'Last 7 days', fn: () => setRangeToLast(24 * 7) },
    { label: 'Last 30 days', fn: () => setRangeToLast(24 * 30) },
  ];

  return (
    <div className="dashboard-page">
      <Script src="https://cdn.plot.ly/plotly-2.27.0.min.js" onLoad={() => setLibsLoaded(prev => ({...prev, plotly: true}))} />
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" onLoad={() => setLibsLoaded(prev => ({...prev, leaflet: true}))} />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      {/* Hero */}
      <section className="dash-hero">
        <img src="/media/photos/buoy-launch-2026-11-wide.jpg" alt="The Aqua Guardian buoy floating on Lake Elkhorn" className="dash-hero-img" />
        <div className="dash-hero-overlay" />
        <div className="dash-hero-inner">
          <p className="dash-eyebrow">Aqua Guardian · Lake Elkhorn</p>
          <h1>Data Explorer</h1>
          <p className="dash-lede">
            Choose a time range and we will pull the buoy&apos;s readings for it, then show how each sensor changed and how far the readings
            sat from their usual values. For the most recent reading, see the live data card on the <a href="/#live-data">home page</a>.
          </p>
          {showDashboard && dashboardData && (
            <div className="dash-hero-meta">
              <span>Buoy ID: <strong>{dashboardData.buoy_id}</strong></span>
              <span>GPS: <strong>{dashboardData.gps_coordinates.latitude}, {dashboardData.gps_coordinates.longitude}</strong></span>
              <span className="leakage-status">
                <span className={`status-dot ${dashboardData.water_leak ? 'status-red' : 'status-green'}`}></span>
                {dashboardData.water_leak ? 'Leak flag raised' : 'No leakages'}
              </span>
            </div>
          )}
        </div>
      </section>

      <div className="dashboard-container">
        {!showDashboard ? (
          <>
            <div className="intro-grid">
              <div className="api-form-container">
                {loading ? (
                  <div style={{textAlign: 'center', padding: '40px 0'}}>
                    <div className="loading-spinner" style={{margin:'0 auto 16px'}}></div>
                    <h2>Fetching analysis…</h2>
                    <p className="muted">Our server may need up to a minute to wake up the first time.</p>
                  </div>
                ) : (
                  <form className="api-form" onSubmit={handleRunAnalysis}>
                    <h2 className="form-group full-width">Run a new analysis</h2>
                    <p className="form-group full-width muted" style={{marginTop: '-8px'}}>
                      Defaults to today. Choose a quick range or set your own start and end.
                    </p>

                    {analysisError && (
                      <div className="form-group full-width error-box">
                        <strong>{analysisError}</strong>
                        <span>No data in that window? The buoy only reports every so often, so try &quot;Last 24 hours&quot; or &quot;Last 7 days&quot;.</span>
                      </div>
                    )}

                    <div className="form-group full-width">
                      <label>Quick ranges</label>
                      <div className="chip-row">
                        {quickRanges.map(r => (
                          <button type="button" key={r.label} className="chip" onClick={r.fn}>{r.label}</button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <label>Buoy ID</label>
                      <input type="text" value={buoyId} onChange={(e) => setBuoyId(e.target.value)} required />
                      <span className="field-hint">Our only buoy is AG-01, deployed in Lake Elkhorn.</span>
                    </div>
                    <div className="form-group">
                      <label>Start time</label>
                      <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>End time</label>
                      <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                    </div>
                    <button type="submit" id="fetch-data-button" disabled={!libsLoaded.plotly || !libsLoaded.leaflet}>
                      {(!libsLoaded.plotly || !libsLoaded.leaflet) ? 'Loading libraries…' : 'Run analysis'}
                    </button>
                  </form>
                )}
              </div>

              <aside className="about-buoy">
                <img src="/media/photos/buoy-launch-2026-11-close.jpg" alt="Close-up of the buoy on the water" />
                <div className="about-buoy-body">
                  <h3>About this buoy</h3>
                  <ul>
                    <li><strong>Status</strong> Fully deployed on Lake Elkhorn, Columbia, MD</li>
                    <li><strong>Power</strong> solar panel and battery; sleeps between readings</li>
                    <li><strong>Reporting</strong> sends a batch of readings over cellular on a regular cycle (about every 45 minutes in our firmware)</li>
                    <li><strong>Sensors</strong> pH, dissolved oxygen, conductivity, turbidity, temperature and ORP</li>
                  </ul>
                  <div className="note">
                    <Info size={16} />
                    <span>Only water temperature, internal air temperature and conductivity are reading correctly right now. pH, dissolved oxygen, ORP and turbidity are not calibrated yet, so ignore those values.</span>
                  </div>
                  <a className="text-link" href="/journey">See how it was built <ArrowRight size={14} /></a>
                </div>
              </aside>
            </div>

            <section className="guide-section">
              <h2 className="section-title">How to read the Data Explorer</h2>
              <div className="steps-row">
                <div className="step"><span className="step-num">1</span><h3>Choose a window</h3><p>We fetch every reading in that time range. Longer windows show trends; shorter ones show detail.</p></div>
                <div className="step"><span className="step-num">2</span><h3>Check the summary</h3><p>Three cards give an overall traffic-light status plus algae-bloom and pollution risk scores.</p></div>
                <div className="step"><span className="step-num">3</span><h3>Dig into the charts</h3><p>Raw values, deviations from this lake&apos;s own baseline, and smoothed moving averages tell the story.</p></div>
              </div>

              <h2 className="section-title" style={{marginTop: '40px'}}>What each sensor measures</h2>
              <div className="sensor-guide">
                {sensorGuide.map(sn => (
                  <div className="sensor-item" key={sn.name}>
                    <div className="sensor-head"><span className="sensor-name">{sn.name}</span>{sn.unit && <span className="sensor-unit">{sn.unit}</span>}</div>
                    <span className={`sensor-flag ${sn.ok ? 'flag-ok' : 'flag-bad'}`}>{sn.ok ? 'Reading correctly' : 'Not calibrated, ignore'}</span>
                    <div className="sensor-what">{sn.what}</div>
                    <p>{sn.tip}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div id="dashboard-content">
            <div className="results-bar">
              <div>
                <span className="muted">Showing</span> <strong>{startTime.replace('T', ' ')}</strong> <span className="muted">to</span> <strong>{endTime.replace('T', ' ')}</strong>
              </div>
              <button onClick={() => setShowDashboard(false)} className="secondary-btn">Change range</button>
            </div>

            <div className="note note-wide" style={{marginTop: 0}}>
              <Info size={16} />
              <span>
                <strong>Calibration in progress.</strong> Only water temperature, internal air temperature and conductivity (EC) are reading correctly right now.
                pH, dissolved oxygen, ORP and turbidity are not calibrated, so ignore those lines and any score that uses them.
              </span>
            </div>

            <div className="metrics-row">
              <div className="metric-card">
                <div className="metric-title">Overall status</div>
                <div className={`safety-light safety-${dashboardData.derived_metrics.water_quality_status.toLowerCase()}`}></div>
                <div className="analysis-text">{dashboardData.derived_metrics.water_quality_status}</div>
                <p className="metric-help">A traffic-light summary of how far current readings sit from their usual values. It includes probes that are not calibrated yet, so ignore it for now.</p>
              </div>
              <div className="metric-card">
                <div className="metric-title">Algae risk</div>
                <div className="metric-value">{dashboardData.derived_metrics.algae_bloom_risk.risk_score}%</div>
                <div className="analysis-text">{dashboardData.derived_metrics.algae_bloom_risk.analysis}</div>
                <p className="metric-help">Built from temperature, turbidity, pH and dissolved oxygen. Several of those probes are not calibrated yet, so ignore this score for now.</p>
              </div>
              <div className="metric-card">
                <div className="metric-title">Pollution</div>
                <div className="metric-value">{dashboardData.derived_metrics.chemical_pollution.pollution_score}%</div>
                <div className="analysis-text">{dashboardData.derived_metrics.chemical_pollution.analysis}</div>
                <p className="metric-help">Looks at pH, conductivity and ORP. pH and ORP are not calibrated yet, so ignore this score for now.</p>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="card">
                <h2>Raw sensor values</h2>
                <p className="card-help">Every reading the buoy sent, by sensor. Drag to pan, click legend items to hide a line.</p>
                <div id="raw-values-graph" className="chart-container"></div>
              </div>
              <div className="card">
                <h2>Buoy location</h2>
                <p className="card-help">Where the buoy is anchored right now, from its onboard GPS.</p>
                <div id="map" className="map-container"></div>
              </div>
              <div className="card">
                <h2>Deviations from normal</h2>
                <p className="card-help">How many standard deviations (σ) each sensor sits from its baseline. Past the dashed orange lines (±1σ) is worth watching; past the red lines (±2σ) is an alert.</p>
                <div id="deviation-graph" className="chart-container"></div>
              </div>
              <div className="card">
                <h2>Moving average</h2>
                <p className="card-help">Raw readings smoothed over several samples so real trends stand out from sensor noise.</p>
                <div id="moving-avg-graph" className="chart-container"></div>
              </div>
            </div>

            <div className="card">
              <h2>Sensor baselines</h2>
              <p className="card-help">
                A baseline is the typical value we have learned for each sensor, and the standard deviation is its normal wiggle room. Status compares the
                latest reading to that: <span className="info-badge badge-green">Normal</span> within 1σ, <span className="info-badge badge-yellow">Watch</span> 1 to 2σ away, <span className="info-badge badge-red">Alert</span> more than 2σ away.
              </p>
              <div style={{overflowX: 'auto'}}>
                <table className="baseline-table">
                  <thead>
                    <tr><th>Sensor</th><th>Baseline</th><th>Std dev</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {getBaselineRows()}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="note note-wide">
              <Info size={16} />
              <span>
                The pH, dissolved oxygen, ORP and turbidity probes are still waiting to be calibrated against reference solutions.
                The leak indicator is based on the humidity sensor inside the hull, so it is a cue to take a closer look.
              </span>
            </div>

            <div className="footer-actions">
              <button onClick={() => setShowDashboard(false)} className="primary-btn">Run another analysis</button>
              <a className="secondary-btn" href="/journey">How we built it</a>
              <a className="secondary-btn" href="/projects">Project details</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
