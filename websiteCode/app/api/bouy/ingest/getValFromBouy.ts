//
// 📍 FILE: websiteCode/app/api/ingest/route.ts
//
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

// This reads the secret key you set up in Vercel
const BUOY_SECRET_KEY = process.env.BUOY_SECRET_KEY;

export async function POST(request: Request) {
  // 1. Check for the secret key
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${BUOY_SECRET_KEY}`) {
    // If the key is wrong, send a "401 Unauthorized" error
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // 2. Get data from the buoy and create a timestamp
  const body = await request.json();
  const telemetryData = body.telemetry; // e.g., { waterTemp: 18.5, ... }
  const timestamp = new Date().toISOString();

  // 3. Prepare the two data objects we need to save
  
  // Object 1: For the LIVE homepage card
  const dataForLiveCard = {
    telemetry: telemetryData,
    status: { online_status: 'Online' },
    last_updated: timestamp,
  };

  // Object 2: For the HISTORY log page
  const dataForHistoryLog = {
    timestamp: timestamp,
    ...telemetryData, // This adds waterTemp, turbidity, etc.
  };

  // 4. Execute both database commands
  try {
    // Command A: Save the "latest" data (overwrites old data)
    await kv.set('latest_buoy_data', dataForLiveCard);

    // Command B: Add to the "history" list (preserves old data)
    await kv.lpush('buoy_data_history', dataForHistoryLog);

  } catch (error) {
    console.error("Failed to save data to KV:", error);
    // If the database fails, send an error back to the buoy
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  // 5. Send a "Success" response back to the buoy
  return NextResponse.json({ success: true, message: "Data ingested to live and history logs" });
}