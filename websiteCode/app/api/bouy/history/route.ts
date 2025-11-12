//
// 📍 FILE: websiteCode/app/api/history/route.ts (NEW FILE)
//
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // 1. Fetch the data from the 'buoy_data_history' list
    // kv.lrange(key, start_index, end_index)
    // This command gets the 500 most recent items (0 = newest, 499 = 500th)
    // Your buoy would have to send data 500 times (hours) to fill this.
    const historyData = await kv.lrange('buoy_data_history', 0, 499);

    // 2. Return the list as JSON
    return NextResponse.json(historyData);

  } catch (error) {
    console.error("Failed to fetch history:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}