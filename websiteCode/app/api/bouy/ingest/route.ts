import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("🌊 Aqua-Guardian Buoy Data Ingested:", data);

    return NextResponse.json(
      { message: "Buoy data received successfully!" }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Ingestion Error:", error);
    return NextResponse.json(
      { error: "Failed to process buoy data payload" }, 
      { status: 400 }
    );
  }
}
