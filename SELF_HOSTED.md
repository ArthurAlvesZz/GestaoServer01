# Self-Hosted Guide

Para rodar este aplicativo em infraestrutura própria para seus clientes, siga os passos estritos deste guia corporativo.

## Pré-requisitos (Máquina do Cliente ou VPS)
* **OS:** Windows Server, Ubuntu 22.04 LTS ou Debian 12.
* **Memória:** Min 2GB RAM.
* **Ferramentas:** Node.js v20+, Docker e Docker Compose, Git.

## Instalação Limpa

1. Clone ou Extraia os arquivos do Servidor na máquina local (ex: \`C:\apps\gestaoos-server\`)
2. Ajuste o arquivo \`.env\` com novas senhas e chaves \`JWT_SECRET\`.
3. Garanta que a porta \`3000\` está liberada no Firewall local da máquina.
4. Garanta que a porta \`5432\` do Postgres NÃO ESTÁ liberada externamente no roteador/firewall (apenas acesso intra-rede/docker).

## Subindo o Docker
O \`docker-compose.yml\` inclui o serviço do banco e seus volumes de dados (\`pgdata\`). Este volume persiste as informações mesmo se o container for restartado. 
\`\`\`bash
docker compose up -d
\`\`\`

## Redes Corporativas Restritas
Para clientes que precisam de acesso externo sem IP Fixo, considere instalar um serviço como **Tailscale** na máquina servidora, ou criar um **Cloudflare Tunnel** (cloudflared). 
Essas abordagens eliminam a necessidade de abrir portas no roteador do provedor de internet do cliente e evitam riscos de DDOS.
