# Deployment Guide

Como compilar este projeto para Produção:

1. Baixe os nós dependentes
\`\`\`bash
npm ci
\`\`\`

2. Execute o build da aplicação:
\`\`\`bash
npm run build
\`\`\`

3. Suba usando o instalador padrão do Next.js:
\`\`\`bash
npm run start
\`\`\`

* Opcional: Se for deploy em serviços Serverless da Cloud Run / AWS, considere alterar a configuração "output": "standalone" contida em \`next.config.ts\`.
* Se estiver usando um serviço gerenciado (Render/Railway), o \`docker-compose.yml\` não será necessário se o banco for gerenciado pela Cloud. Mude a variável \`DATABASE_URL\` para refletir a nova connection string do seu provedor.

## Processo de Backup
No painel de controle ou pelo agendador de tarefas do sistema operacional local (ex: Cron no Linux, Task Scheduler no Win), aponte para executar automaticamente \`/scripts/backup.sh\` (ou ps1) todo dia à meia-noite. 
O arquivo `.sql` será persistido em \`./backups/\`.
