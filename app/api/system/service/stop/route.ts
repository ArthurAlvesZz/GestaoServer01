import { NextResponse } from 'next/server';

export async function POST() {
    // To gracefully shut down we would send a signal. We simulate here.
    console.log("Service stop requested via API.");
    return NextResponse.json({ 
        message: 'Stop signal sent. If running as a Windows/Linux service, use the OS controls.', 
        success: true 
    });
}
