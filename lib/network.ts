import os from 'os';

export function getLocalIps(): string[] {
  const interfaces = os.networkInterfaces();
  const ips: string[] = [];

  for (const name of Object.keys(interfaces)) {
    const iface = interfaces[name];
    if (!iface) continue;

    for (const config of iface) {
      if (config.family === 'IPv4' && !config.internal) {
        ips.push(config.address);
      }
    }
  }

  // Fallback se nÃ£o achar nada
  if (ips.length === 0) {
    ips.push('127.0.0.1');
  }

  return ips;
}
