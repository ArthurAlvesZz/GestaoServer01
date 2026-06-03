# GestaoOS Server Manager

Painel de controle do Servidor e da API central para o sistema ERP GestaoOS. 

Este aplicativo servidor hospeda o banco de dados via Docker e disponibiliza serviços (API) para o aplicativo cliente do ERP.

## Stack
* Node.js / Next.js 15 (App Router Server)
* React / Tailwind CSS (Client-side Panel)
* PostgreSQL 15 via Docker Compose
* Prisma ORM

## Instruções de uso local

1. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

2. Renomeie o arquivo de ambiente:
\`\`\`bash
cp .env.example .env
\`\`\`

3. Inicie o banco via Docker:
\`\`\`bash
docker compose up -d
\`\`\`

4. Inicialize o banco de dados (Migrations, Seed, Types):
\`\`\`bash
npm run db:setup
\`\`\`

5. Inicie o servidor:
\`\`\`bash
npm run dev
\`\`\`

## Funcionalidades
* \`/api/system/status\`: Status da rede, banco de dados (online/offline), endereço local e versão.
* Painel de Controle Operacional
* Scripts em \`/scripts/\` para realizar backup e restore.

## Integração com App Cliente
1. Acesse o Painel do Server Manager (http://localhost:3000)
2. Copie o endereço recomendado, por exemplo: \`http://192.168.1.100:3000\`
3. No app cliente do ERP, vá em "Conexão com Servidor" e cole esta URL.
