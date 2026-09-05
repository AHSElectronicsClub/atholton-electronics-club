'use client';
import React, { useState } from 'react';
import Script from 'next/script';
import './dashboard.css'; 

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
  const [startTime, setStartTime] = useState('2025-01-01T00:00');
  const [endTime, setEndTime] = useState('2025-12-31T23:59');

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
      'pH': '#1f77b4', 
      'DO': '#ff7f0e', 
      'EC': '#2ca02c', 
      'Turbidity': '#d62728', 
      'Temp': '#9467bd', 
      'ORP': '#8c564b' 
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
      xaxis: { title: 'Time', type: 'date', gridcolor: '#f0f0f0' },
      yaxis: { title: 'Value', gridcolor: '#f0f0f0' },
      plot_bgcolor: 'rgba(240,240,240,0.1)',
      paper_bgcolor: 'white',
      margin: { t: 30, r: 30, b: 80, l: 60 }
    };

    window.Plotly.newPlot('raw-values-graph', rawTraces, { ...layoutBase, title: 'Raw Sensor Values' });

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

    window.Plotly.newPlot('deviation-graph', [...devTraces, ...thresholds], { ...layoutBase, title: 'Deviations', yaxis: { title: 'Standard Deviations' } });

    // 3. Moving Avg Graph
    const maTraces = sensors.map(sensor => ({
      x: timestamps,
      y: movingAvg.map((d: any) => d[sensor]),
      type: 'scatter',
      mode: 'lines',
      name: sensor,
      line: { color: sensorColors[sensor], width: 2 }
    }));
    window.Plotly.newPlot('moving-avg-graph', maTraces, { ...layoutBase, title: 'Moving Averages' });

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
    const sensors = ['pH', 'DO', 'EC', 'Turbidity', 'Temp', 'air_temp', 'humidity', 'ORP'];
    const lastData = dashboardData.dashboard_metrics.raw_data[dashboardData.dashboard_metrics.raw_data.length - 1];

    return sensors.map(sensor => {
        const base = baselines[sensor];
        const dev = baseline_std_devs[sensor];
        const curr = lastData[sensor];
        let status = 'Green'; 
        
        if (base && dev && curr) {
            const z = Math.abs((curr - base) / dev);
            if (z > 2) status = 'Red';
            else if (z > 1) status = 'Yellow';
        }

        return (
            <tr key={sensor}>
                <td>{sensor}</td>
                <td>{base?.toFixed(4) || 'N/A'}</td>
                <td>{dev?.toFixed(4) || 'N/A'}</td>
                <td><span className={`info-badge badge-${status.toLowerCase()}`}>{status === 'Green' ? 'Normal' : 'Alert'}</span></td>
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

  return (
    <div className="dashboard-container">
      <Script src="https://cdn.plot.ly/plotly-2.27.0.min.js" onLoad={() => setLibsLoaded(prev => ({...prev, plotly: true}))} />
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" onLoad={() => setLibsLoaded(prev => ({...prev, leaflet: true}))} />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      <div className="header">
        <h1>Water Quality Dashboard</h1>
        {showDashboard && dashboardData && (
            <>
            <p className="subtitle">
                Buoy ID: {dashboardData.buoy_id} | GPS: {dashboardData.gps_coordinates.latitude}, {dashboardData.gps_coordinates.longitude}
            </p>
            <div className="leakage-status">
                <div className={`status-dot ${dashboardData.water_leak ? 'status-red' : 'status-green'}`}></div>
                <span>{dashboardData.water_leak ? 'Leak Detected' : 'No Leakages'}</span>
            </div>
            </>
        )}
      </div>

      {!showDashboard ? (
        <div className="api-form-container">
            {loading ? (
                <div style={{textAlign: 'center'}}>
                    <div className="loading-spinner" style={{margin:'0 auto'}}></div>
                    <h2>Fetching Analysis...</h2>
                </div>
            ) : (
                <form className="api-form" onSubmit={handleRunAnalysis}>
                    <h2 className="form-group full-width" style={{textAlign:'center'}}>Run New Analysis</h2>
                    
                    {/* NEW ERROR BOX UI */}
                    {analysisError && (
                      <div className="form-group full-width" style={{ background: '#fee2e2', color: '#991b1b', padding: '15px', borderRadius: '8px', textAlign: 'center', border: '1px solid #f87171' }}>
                        {analysisError}
                      </div>
                    )}

                    <div className="form-group full-width">
                        <label>Buoy ID</label>
                        <input type="text" value={buoyId} onChange={(e) => setBuoyId(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Start Time</label>
                        <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>End Time</label>
                        <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                    </div>
                    <button type="submit" id="fetch-data-button" disabled={!libsLoaded.plotly || !libsLoaded.leaflet}>
                        {(!libsLoaded.plotly || !libsLoaded.leaflet) ? 'Loading Libraries...' : 'Run Analysis'}
                    </button>
                </form>
            )}
        </div>
      ) : (
        <div id="dashboard-content">
            <div className="metrics-row">
                <div className="metric-card">
                    <div className="metric-title">Overall Status</div>
                    <div className={`safety-light safety-${dashboardData.derived_metrics.water_quality_status.toLowerCase()}`}></div>
                    <div className="analysis-text">{dashboardData.derived_metrics.water_quality_status}</div>
                </div>
                <div className="metric-card">
                    <div className="metric-title">Algae Risk</div>
                    <div className="metric-value">{dashboardData.derived_metrics.algae_bloom_risk.risk_score}%</div>
                    <div className="analysis-text">{dashboardData.derived_metrics.algae_bloom_risk.analysis}</div>
                </div>
                <div className="metric-card">
                    <div className="metric-title">Pollution</div>
                    <div className="metric-value">{dashboardData.derived_metrics.chemical_pollution.pollution_score}%</div>
                    <div className="analysis-text">{dashboardData.derived_metrics.chemical_pollution.analysis}</div>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="card">
                    <h2>Raw Sensor Values</h2>
                    <div id="raw-values-graph" className="chart-container"></div>
                </div>
                <div className="card">
                    <h2>Buoy Location</h2>
                    <div id="map" className="map-container"></div>
                </div>
                <div className="card">
                    <h2>Deviations</h2>
                    <div id="deviation-graph" className="chart-container"></div>
                </div>
                <div className="card">
                    <h2>Moving Average</h2>
                    <div id="moving-avg-graph" className="chart-container"></div>
                </div>
            </div>

            <div className="card">
                <h2>Sensor Baselines</h2>
                <table className="baseline-table">
                    <thead>
                        <tr><th>Sensor</th><th>Baseline</th><th>Std Dev</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        {getBaselineRows()}
                    </tbody>
                </table>
            </div>
            
            <div style={{textAlign: 'center', marginTop: '20px'}}>
              <button onClick={() => setShowDashboard(false)} style={{padding: '10px 20px', borderRadius: '8px', cursor: 'pointer'}}>
                Run Another Analysis
              </button>
            </div>
        </div>
      )}
    </div>
  );
}