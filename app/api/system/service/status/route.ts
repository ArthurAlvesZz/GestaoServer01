import { NextResponse } from 'next/server';

// Simulating service status since we might not have direct PM2/Systemd access.
export async function GET() {
  return NextResponse.json({ 
      status: 'active', 
      message: 'Service is currently running the API.',
      since: new Date(Date.now() - process.uptime() * 1000).toISOString()
  });
}
