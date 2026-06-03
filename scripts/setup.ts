import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import crypto from 'crypto';

const envPath = path.resolve(process.cwd(), '.env');
const envExamplePath = path.resolve(process.cwd(), '.env.example');

function run(command: string, successMessage?: string) {
    console.log(`\n> Executing: ${command}`);
    try {
        execSync(command, { stdio: 'inherit' });
        if (successMessage) {
            console.log(`✓ ${successMessage}`);
        }
    } catch (error) {
        console.error(`✗ Command failed: ${command}`);
        process.exit(1);
    }
}

async function setup() {
    console.log("\n=== GESTAOOS SERVER MANAGER STARTING SETUP ===");

    // 1. Check or Create .env
    let envContent = '';
    if (!fs.existsSync(envPath)) {
        console.log("\n[1] Creating .env file from .env.example...");
        envContent = fs.readFileSync(envExamplePath, 'utf8');
        fs.writeFileSync(envPath, envContent);
    } else {
        console.log("\n[1] .env file already exists.");
        envContent = fs.readFileSync(envPath, 'utf8');
    }

    // 2. Generate secure JWT_SECRET if absent or default
    if (envContent.includes('JWT_SECRET="super-secret-key-change-me-in-production"')) {
        console.log("\n[2] Generating a secure JWT_SECRET...");
        const secureSecret = crypto.randomBytes(32).toString('hex');
        envContent = envContent.replace(
            'JWT_SECRET="super-secret-key-change-me-in-production"',
            `JWT_SECRET="${secureSecret}"`
        );
        fs.writeFileSync(envPath, envContent);
        console.log("✓ New JWT_SECRET configured.");
    } else {
        console.log("\n[2] JWT_SECRET valid.");
    }

    // 3. Start Database (Docker Compose)
    console.log("\n[3] Starting Database with Docker Compose...");
    run("docker compose up -d", "Postgres container is running.");

    // wait briefly for db to initialize
    console.log("Waiting 5s for database to become fully ready...");
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 5000);

    // 4. Run Prisma Setup
    console.log("\n[4] Running Database Setup (Prisma Generate, Migrate & Seed)...");
    run("npm run db:setup", "Database schemas and seed completed.");

    // 5. Finalize
    console.log("\n=== SETUP COMPLETED SUCCESSFULLY ===");
    console.log("You can now start the server by running:");
    console.log("  npm run dev (for testing/development)");
    console.log("  npm run build && npm run start (for production)");
    
    console.log("\nClient connection URLs can be viewed via the Web Panel.");
}

setup();
