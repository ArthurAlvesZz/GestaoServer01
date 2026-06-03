import { NextResponse } from 'next/server';

export async function GET() {
    // In a real application, you would read from a rolling log file.
    // For this demonstration, we return some static / hardcoded recent events or mock recent events.
    const logs = [
        `[${new Date(Date.now() - 3600000).toISOString()}] [System] Server Checked and Started`,
        `[${new Date(Date.now() - 3500000).toISOString()}] [Database] Connection Checked`,
        `[${new Date().toISOString()}] [API] Fetched system logs`
    ];

    return NextResponse.json({
        success: true,
        logs: logs.join('\n')
    });
}
