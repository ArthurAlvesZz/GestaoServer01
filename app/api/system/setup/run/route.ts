import { NextResponse } from 'next/server';
import { checkDbConnection } from '@/lib/db';

export async function POST() {
    try {
        console.log("Setup requested via API.");
        
        // Em um setup real via API (neste formato), podemos rodar as migrations em background
        // se certificando primeiro que o banco está conectado.
        const dbConnected = await checkDbConnection();
        if (!dbConnected) {
            return NextResponse.json({ success: false, error: 'Database not connected. Please ensure docker compose up is running.' }, { status: 400 });
        }
        
        // A simple workaround to call db setup
        const { exec } = require('child_process');
        exec('npm run db:setup');

        return NextResponse.json({ 
            success: true, 
            message: 'Setup started in background. Migrations and Seed are running.'
        });
    } catch (e: any) {
        return NextResponse.json({ 
            success: false, 
            error: e.message 
        }, { status: 500 });
    }
}
