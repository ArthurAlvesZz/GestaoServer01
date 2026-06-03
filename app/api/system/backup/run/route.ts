import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

export async function POST() {
    try {
        console.log("Backup requested via API.");
        // We will call the backup script
        const { stdout, stderr } = await execAsync('npm run backup');
        return NextResponse.json({ 
            success: true, 
            message: 'Backup executed.', 
            output: stdout 
        });
    } catch (e: any) {
        return NextResponse.json({ 
            success: false, 
            error: e.message 
        }, { status: 500 });
    }
}
