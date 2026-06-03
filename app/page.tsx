'use client';

import { useState, useEffect } from 'react';
import { Shield, Server, Database, Network, Key, Settings, Download, CheckCircle, XCircle, Clock, Copy, RefreshCw } from 'lucide-react';

interface SystemStatus {
  appVersion: string;
  nodeEnv: string;
  apiOnline: boolean;
  dbConnected: boolean;
  databaseProvider: string;
  dataMode: string;
  paymentMode: string;
  uptime: number;
  serverPort: number;
  localIps: string[];
  recommendedClientUrl: string;
  appPublicUrl: string;
  migrationStatus: string;
  seedStatus: string;
  lastBackupAt: string | null;
}

export default function ServerManager() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState<string>('');

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/system/status');
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      }
      
      const logRes = await fetch('/api/system/logs');
      if (logRes.ok) {
         const logData = await logRes.json();
         setLogs(logData.logs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
  };

  if (!status && loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Server className="w-6 h-6 text-amber-500" />
              GestaoOS Server Manager
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Painel de controle operacional do servidor ERP.
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={async () => {
                 if(confirm("Tem certeza? O aplicativo cliente perderá conexão.")){
                    await fetch('/api/system/service/stop', { method: 'POST' });
                    alert("Sinal de parada enviado.");
                 }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-950/30 border border-red-900/50 text-red-500 rounded-md hover:bg-red-950/50 text-sm transition"
            >
              Parar Servidor
            </button>
            <button 
              onClick={async () => {
                 await fetch('/api/system/service/restart', { method: 'POST' });
                 alert("Sinal de reinício enviado ao runner do serviço.");
              }}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 text-sm transition text-zinc-300"
            >
              Reiniciar
            </button>
            <button 
              onClick={fetchStatus}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-md hover:bg-amber-500/20 text-sm transition font-medium"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </button>
          </div>
        </header>

        {/* Client URL Highlights */}
        {status?.recommendedClientUrl && (
          <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-amber-500 mb-1">URL do Aplicativo Cliente</h2>
              <p className="text-sm text-zinc-300">
                O aplicativo cliente ERP na sua rede local deve se conectar ao servidor usando este endereço.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-black/50 border border-zinc-800 px-3 py-2 rounded text-zinc-300 select-all">
                {status.recommendedClientUrl}
              </code>
              <button
                onClick={() => handleCopy(status.recommendedClientUrl)}
                className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded transition text-zinc-300"
                title="Copiar URL"
              >
                {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Server API Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
              <Server className="w-5 h-5 text-amber-500" />
              <h3 className="font-medium text-white">Servidor API</h3>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Status</span>
                <span className="flex items-center gap-1.5 text-green-500">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Ambiente</span>
                <span className="uppercase text-xs font-mono bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">{status?.nodeEnv}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Versão</span>
                <span className="text-zinc-300 font-mono">{status?.appVersion}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Porta</span>
                <span className="text-zinc-300 font-mono">{status?.serverPort}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Uptime</span>
                <span className="text-zinc-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {status ? formatUptime(status.uptime) : '-'}
                </span>
              </div>
            </div>
          </div>

          {/* Database Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-500" />
              <h3 className="font-medium text-white">Banco de Dados</h3>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Status</span>
                {status?.dbConnected ? (
                  <span className="flex items-center gap-1.5 text-green-500">
                    <CheckCircle className="w-4 h-4" />
                    Conectado
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-red-500">
                    <XCircle className="w-4 h-4" />
                    Desconectado
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Provider</span>
                <span className="text-zinc-300 capitalize">{status?.databaseProvider || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Migrations</span>
                <span className={`capitalize ${status?.migrationStatus === 'error' ? 'text-red-500' : 'text-zinc-300'}`}>
                  {status?.migrationStatus || '-'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Semente (Seed)</span>
                <span className={`capitalize ${status?.seedStatus === 'error' ? 'text-red-500' : 'text-zinc-300'}`}>
                  {status?.seedStatus || '-'}
                </span>
              </div>
              <div className="pt-2">
                <p className="text-xs text-zinc-500 flex items-center gap-1 leading-relaxed">
                  <Shield className="w-3.5 h-3.5" />
                  Senhas e URLs de conexÃ£o estÃ£o ocultas por seguranÃ§a.
                </p>
              </div>
            </div>
          </div>

          {/* Network & Setup */}
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
                <Network className="w-5 h-5 text-amber-500" />
                <h3 className="font-medium text-white">Rede</h3>
              </div>
              <div className="p-4 space-y-3 text-sm">
                <div className="text-zinc-400 mb-2">Interfaces de Rede Detectadas:</div>
                <ul className="space-y-2">
                  {status?.localIps.map(ip => (
                    <li key={ip} className="flex justify-between items-center px-3 py-2 bg-zinc-800/50 rounded-md">
                      <span className="font-mono text-zinc-300">{ip}</span>
                      {ip !== '127.0.0.1' && (
                         <span className="text-[10px] uppercase tracking-wider bg-amber-500/20 text-amber-500 px-1.5 py-0.5 rounded">Local</span>
                      )}
                    </li>
                  )) || <li className="text-zinc-500">Nenhuma identificada</li>}
                </ul>
              </div>
            </div>
          </div>

          {/* Backup Management */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-amber-500" />
                <h3 className="font-medium text-white">Backups</h3>
              </div>
            </div>
            <div className="p-4 flex flex-col h-[calc(100%-60px)] justify-between">
               <div className="space-y-3 text-sm">
                 <div className="flex justify-between items-center text-zinc-400">
                   <span>Ãltimo Backup</span>
                   <span className="text-zinc-300">{status?.lastBackupAt || 'Nenhum'}</span>
                 </div>
               </div>
               
                 <div className="mt-6 flex flex-col gap-2">
                   <button 
                     onClick={async () => {
                       alert('Iniciando backup em background.');
                       await fetch('/api/system/backup/run', { method: 'POST' });
                     }}
                     className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-md transition text-sm flex justify-center items-center gap-2">
                     <Download className="w-4 h-4" />
                     Criar Backup Manual
                   </button>
                   <p className="text-xs text-center text-zinc-500">
                      Dependencias de scripts locais em /scripts/
                   </p>
                 </div>
            </div>
          </div>

           {/* Security Warning */}
           <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden lg:col-span-2 flex flex-col justify-center">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-zinc-800 rounded-full">
                  <Key className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">OrientaÃ§Ãµes de SeguranÃ§a</h3>
                  <div className="space-y-2 text-sm text-zinc-400">
                    <p>â¢ <strong>Nunca exponha a porta do banco de dados (5432) externamente.</strong> Mantendo seu banco apenas acessÃ­vel internamente, os dados estarÃ£o seguros.</p>
                    <p>â¢ Use a funcionalidade de "Criar Backup Manual" regularmente.</p>
                    <p>â¢ <strong>AtenÃ§Ã£o com o JWT_SECRET</strong>: A constante em <code>.env</code> define a integridade das sessÃµes e logins dos usuÃ¡rios.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Setup Assistant & Logs */}
          <div className="space-y-6">
             <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-amber-500" />
                  <h3 className="font-medium text-white">Assistente de Setup</h3>
                </div>
                <div className="p-4 space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Banco de Dados</span>
                    <span className={`${status?.dbConnected ? 'text-green-500' : 'text-zinc-500'}`}>
                       {status?.dbConnected ? 'Configurado' : 'Aguardando. . .'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Migrations</span>
                    <span className={`${status?.migrationStatus === 'ok' ? 'text-green-500' : 'text-zinc-500'}`}>
                       {status?.migrationStatus === 'ok' ? 'Rodadas' : 'Pendentes'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Seed Inicial</span>
                    <span className={`${status?.seedStatus === 'ok' ? 'text-green-500' : 'text-zinc-500'}`}>
                       {status?.seedStatus === 'ok' ? 'Concluído' : 'Aguardando. . .'}
                    </span>
                  </div>
                </div>
                <div className="px-4 pb-4">
                    <button 
                      onClick={async () => {
                        alert('Iniciando o setup em background.');
                        await fetch('/api/system/setup/run', { method: 'POST' });
                        setTimeout(fetchStatus, 3000);
                      }}
                      className="w-full py-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border border-amber-500/20 transition rounded-md font-medium text-sm">
                      Iniciar Setup Wizard
                    </button>
                </div>
             </div>

             <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                 <div className="p-4 border-b border-zinc-800">
                    <h3 className="font-medium text-white">Logs de Auditoria</h3>
                 </div>
                 <div className="p-4 bg-zinc-950/50">
                    <pre className="text-xs font-mono text-zinc-400 whitespace-pre-wrap">
                      {logs || "Carregando logs..."}
                    </pre>
                 </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
