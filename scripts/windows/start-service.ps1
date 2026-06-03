# start-service.ps1
# Requires Administrator privileges
$ServiceName = "GestaoOSServerManager"
Write-Host "Iniciando $ServiceName..."
Start-Service -Name $ServiceName -ErrorAction SilentlyContinue
if ($?) {
    Write-Host "Serviço iniciado com sucesso." -ForegroundColor Green
} else {
    Write-Host "Serviço não encontrado ou não pôde iniciar manualmente via npm run server:start." -ForegroundColor Yellow
}
