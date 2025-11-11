//
// 📍 FILE: app/api/ingest/route.ts
//
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

// This is a secret key. In Vercel, go to Settings -> Environment Variables
// and add one called 'BUOY_SECRET_KEY' with a long, random password.
const BUOY_SECRET_KEY = process.env.BUOY_SECRET_KEY;

export async function POST(request: Request) {
  // 1. Check for the secret key
  // The buoy must send an 'Authorization' header with the value 'Bearer YOUR_KEY'
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${BUOY_SECRET_KEY}`) {
    // If the key is wrong, send a "401 Unauthorized" error
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // 2. Get the telemetry data from the buoy's POST request
  // The buoy should send JSON like: { "telemetry": { "waterTemp": 18.5, ... } }
  const body = await request.json();
  const telemetryData = body.telemetry;

  // 3. Add a timestamp and set the online status
  const dataToStore = {
    telemetry: telemetryData, // This is the { waterTemp: ..., ... } object
    status: {
      online_status: 'Online', // If we're getting data, it's online
    },
    last_updated: new Date().toISOString(),
  };

  // 4. Save this complete object to the Vercel KV database
  // It will be stored under the key 'latest_buoy_data'
  await kv.set('latest_buoy_data', dataToStore);

  // 5. Send a "Success" response back to the buoy so it knows the data was received
  return NextResponse.json({ success: true, message: "Data ingested" });
}