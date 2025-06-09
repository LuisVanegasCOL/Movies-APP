#!/bin/bash

echo "Iniciando Movies App..."

# Iniciar el servicio de Docker
service docker start || true

# Esperar a que Docker esté listo
while ! docker info > /dev/null 2>&1; do
    echo "Esperando a que Docker esté listo..."
    sleep 2
done

# Asegurarse de que no haya contenedores antiguos
docker-compose down || true

# Iniciar los servicios con docker-compose
echo "Iniciando servicios con docker-compose..."
docker-compose up -d

# Mostrar logs
echo "Mostrando logs de los servicios..."
docker-compose logs -f 