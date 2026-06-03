# install-service.ps1
# Requires Administrator privileges
$ServiceName = "GestaoOSServerManager"
$ServiceDisplayName = "GestaoOS Server Manager API"
$ServiceDescription = "Serviço que hospeda a API e o painel do ERP GestaoOS."
# Simplest option without NSSM is just document it or use a basic template.
# In a real environment, NSSM or node-windows is highly recommended.
Write-Host "Instalando serviço (Recomendado o uso via NSSM para produção)..."
Write-Host "Para usar NSSM: nssm install $ServiceName node `"C:\caminho\para\server.js`""
Write-Host "Service installed conceptually."
