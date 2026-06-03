# Backup script for GestaoOS Server Manager (Windows)

$DB_CONTAINER = "gestaoos_postgres"
$DB_USER = "root"
$DB_NAME = "gestaoos_db"
$BACKUP_DIR = ".\backups"
$TIMESTAMP = Get-Date -Format "yyyyMMdd_HHmmss"
$BACKUP_FILE = "$BACKUP_DIR\backup_$TIMESTAMP.sql"

if (!(Test-Path -Path $BACKUP_DIR)) {
    New-Item -ItemType Directory -Path $BACKUP_DIR | Out-Null
}

Write-Host "Creating backup for $DB_NAME..."
docker exec -t $DB_CONTAINER pg_dump -U $DB_USER -d $DB_NAME -F c -f /tmp/backup.sql
docker cp ${DB_CONTAINER}:/tmp/backup.sql "$BACKUP_FILE"
docker exec -t $DB_CONTAINER rm /tmp/backup.sql

Write-Host "Backup created at $BACKUP_FILE"
