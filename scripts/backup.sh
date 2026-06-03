#!/bin/bash
# Backup script for GestaoOS Server Manager

DB_CONTAINER="gestaoos_postgres"
DB_USER="root"
DB_NAME="gestaoos_db"
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.sql"

mkdir -p "$BACKUP_DIR"

echo "Creating backup for $DB_NAME..."
docker exec -t $DB_CONTAINER pg_dump -U $DB_USER -d $DB_NAME -F c -f /tmp/backup.sql
docker cp $DB_CONTAINER:/tmp/backup.sql "$BACKUP_FILE"
docker exec -t $DB_CONTAINER rm /tmp/backup.sql

echo "Backup created at $BACKUP_FILE"
