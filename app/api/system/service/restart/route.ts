import { NextResponse } from 'next/server';

export async function POST() {
    console.log("Service restart requested via API.");
    // Simulated restart signal
    return NextResponse.json({ 
        message: 'Restart signal sent. Server should restart if controlled by PM2/Docker/Systemd.', 
        success: true 
    });
}
