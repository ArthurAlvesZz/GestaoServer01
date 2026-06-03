# Restore script for GestaoOS Server Manager (Windows)

param (
    [Parameter(Mandatory=$true)]
    [string]$BackupFile
)

$DB_CONTAINER = "gestaoos_postgres"
$DB_USER = "root"
$DB_NAME = "gestaoos_db"

if (!(Test-Path -Path $BackupFile)) {
    Write-Host "Error: Backup file not found!" -ForegroundColor Red
    exit 1
}

Write-Host "WARNING: This will overwrite the current database." -ForegroundColor Yellow
$confirmation = Read-Host "Are you sure you want to proceed? (y/N)"

if ($confirmation -notmatch "^[Yy]$") {
    Write-Host "Restore cancelled."
    exit 1
}

Write-Host "Restoring from $BackupFile..."
docker cp "$BackupFile" ${DB_CONTAINER}:/tmp/restore.sql
docker exec -t $DB_CONTAINER pg_restore -U $DB_USER -d $DB_NAME -c -1 /tmp/restore.sql
docker exec -t $DB_CONTAINER rm /tmp/restore.sql

Write-Host "Restore completed." -ForegroundColor Green
