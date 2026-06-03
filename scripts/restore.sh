#!/bin/bash
# Restore script for GestaoOS Server Manager

if [ -z "$1" ]; then
  echo "Usage: ./restore.sh <backup_file_path>"
  exit 1
fi

BACKUP_FILE=$1
DB_CONTAINER="gestaoos_postgres"
DB_USER="root"
DB_NAME="gestaoos_db"

if [ ! -f "$BACKUP_FILE" ]; then
  echo "Error: Backup file not found!"
  exit 1
fi

echo "WARNING: This will overwrite the current database."
read -p "Are you sure you want to proceed? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Restore cancelled."
  exit 1
fi

echo "Restoring from $BACKUP_FILE..."
docker cp "$BACKUP_FILE" $DB_CONTAINER:/tmp/restore.sql
docker exec -t $DB_CONTAINER pg_restore -U $DB_USER -d $DB_NAME -c -1 /tmp/restore.sql
docker exec -t $DB_CONTAINER rm /tmp/restore.sql

echo "Restore completed."
