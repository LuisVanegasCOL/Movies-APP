#!/bin/bash

echo "Iniciando Movies App..."

# Asegurarse de que Docker esté corriendo
service docker start

# Esperar a que Docker esté listo
while ! docker info > /dev/null 2>&1; do
    echo "Esperando a que Docker esté listo..."
    sleep 1
done

# Iniciar los servicios con docker-compose
echo "Iniciando servicios con docker-compose..."
docker-compose up -d

# Mantener el contenedor corriendo
tail -f /dev/null 