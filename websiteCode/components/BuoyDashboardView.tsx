import React from 'react';
import { BuoyDataCard } from './BuoyDataCard(placeholder)';
import { adaptSupabaseRowToBuoyData } from '@/utils/adapters';

interface BuoyDashboardViewProps {
  rawSupabaseRows: any[];
}

export default function BuoyDashboardView({ rawSupabaseRows }: BuoyDashboardViewProps) {
  // Ensure rawSupabaseRows is an array before mapping
  const rows = Array.isArray(rawSupabaseRows) ? rawSupabaseRows : [];

  return (
    <div className="p-6 grid gap-6">
      {rows.length === 0 ? (
        <p className="text-gray-500">No buoy data available.</p>
      ) : (
        rows.map((row, index) => {
          const adaptedData = adaptSupabaseRowToBuoyData(row);
          return <BuoyDataCard key={row.session_id || index} data={adaptedData} />;
        })
      )}
    </div>
  );
}