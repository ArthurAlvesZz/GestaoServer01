#!/bin/bash
# install-service.sh
# Requires root/sudo

SERVICE_FILE="gestaoos-server.service"
UNIT_PATH="/etc/systemd/system/$SERVICE_FILE"

echo "Instalando serviço Linux..."
cp ./scripts/linux/$SERVICE_FILE $UNIT_PATH
systemctl daemon-reload
systemctl enable $SERVICE_FILE
echo "Serviço instalado e habilitado para iniciar no boot."
