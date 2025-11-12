//
// 📍 FILE: app/api/buoy/route.ts
//
import { NextResponse } from 'next/server';

// You were missing this line
export async function GET(request: Request) { 

  // --- (Your code starts here) ---
  const currentMinute = new Date().getMinutes();
  const isOnline = currentMinute >= 0 && currentMinute <= 3; // Online for first 3 mins of the hour

  // --- NEW SERVER DATA ---
  // We simulate data with Math.random() to make it look live
  const serverData = {
    status: {
      online_status: isOnline ? "Online" : "Offline"
    },
    // Send back 'null' if offline, just like the real buoy
    telemetry: isOnline ? {
      waterTemp: parseFloat((18 + Math.random()).toFixed(1)), // e.g., 18.1
      turbidity: parseFloat((5 + Math.random()).toFixed(1)), // e.g., 5.1
      algaeSensor: parseFloat((126 + Math.random() * 5).toFixed(1)) // e.g., 126.1
    } : null,
    last_updated: new Date().toISOString()
  };

  // 2. Send the data back to the client as JSON
  return NextResponse.json(serverData);

} // <-- You were missing this closing bracket