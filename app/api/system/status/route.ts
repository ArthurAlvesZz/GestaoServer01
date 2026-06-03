import { NextResponse } from 'next/server';
import { getLocalIps } from '@/lib/network';
import { checkDbConnection } from '@/lib/db';

export async function GET() {
  const localIps = getLocalIps();
  const dbConnected = await checkDbConnection();
  
  const recommendedIp = localIps.find(ip => ip !== '127.0.0.1') || '127.0.0.1';
  
  return NextResponse.json({
    appVersion: "1.0.0",
    nodeEnv: process.env.NODE_ENV || "development",
    apiOnline: true,
    dbConnected: dbConnected,
    databaseProvider: "postgresql",
    dataMode: "api",
    paymentMode: "mock/manual",
    uptime: process.uptime(),
    serverPort: 3000,
    localIps: localIps,
    recommendedClientUrl: `http://${recommendedIp}:3000`,
    appPublicUrl: process.env.APP_URL || "",
    migrationStatus: dbConnected ? "ok" : "error",
    seedStatus: dbConnected ? "ok" : "error",
    lastBackupAt: null
  });
}
