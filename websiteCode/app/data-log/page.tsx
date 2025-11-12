/*
// 📍 FILE: websiteCode/app/data-log/page.tsx (NEW FILE)
//
'use client'; // This page must be a client component to fetch data

import React, { useState, useEffect } from 'react';
// We'll re-use your PageContainer component
import PageContainer from '../../components/PageContainer';

// This type must match the data from our new API
type HistoryLog = {
  timestamp: string;
  waterTemp: number;
  turbidity: number;
  algaeSensor: number;
};

export default function DataLogPage() {
  const [data, setData] = useState<HistoryLog[]>([]); // Data is now an ARRAY
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Call our NEW history API
        const response = await fetch('/api/history');
        if (!response.ok) {
          throw new Error('Failed to fetch data log');
        }
        const jsonData = (await response.json()) as HistoryLog[];
        setData(jsonData);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []); // The empty [] means "run this only once on load"

  // -- Render Logic --

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading history...</p>;
    }

    if (error) {
      return <p className="text-red-500">Error: {error}</p>;
    }
    
    if (data.length === 0) {
      return <p>No data has been logged yet. Check back after the buoy sends its first update.</p>
    }

    // -- Data Table --
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp (UTC)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Water Temp (°C)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Turbidity (NTU)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Algae Sensor (mV)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((log, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(log.timestamp).toLocaleString('en-US', { timeZone: 'UTC' })}
                </td>
                <td className="px-6 py-4 whitespace-rowrap text-sm text-gray-500">
                  {log.waterTemp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {log.turbidity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {log.algaeSensor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    // Note: If PageContainer isn't at '@/components/PageContainer', you'll
    // need to fix that import path.
    <PageContainer title="Aqua Guardian Data Log" icon={<span className="text-4xl">📈</span>}>
      <p className="text-gray-700 mb-6">
        Showing the {data.length} most recent data entries from the buoy.
      </p>
      {renderContent()}
    </PageContainer>
  );
}*/