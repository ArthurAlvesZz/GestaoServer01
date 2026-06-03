# stop-service.ps1
# Requires Administrator privileges
$ServiceName = "GestaoOSServerManager"
Write-Host "Parando $ServiceName..."
Stop-Service -Name $ServiceName -ErrorAction SilentlyContinue
if ($?) {
    Write-Host "Serviço parado com sucesso." -ForegroundColor Green
} else {
    Write-Host "Não foi possível parar o serviço ou ele já está inativo." -ForegroundColor Yellow
}
