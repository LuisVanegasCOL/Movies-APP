FROM docker/compose:1.29.2

# Instalar dependencias necesarias
RUN apk add --no-cache \
    python3 \
    py3-pip \
    bash \
    git

# Copiar los archivos del proyecto
COPY . /app

# Establecer el directorio de trabajo
WORKDIR /app

# Exponer los puertos necesarios
EXPOSE 3000 8080

# Comando para iniciar la aplicación
CMD ["docker-compose", "up", "-d"] 