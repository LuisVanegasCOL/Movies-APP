FROM docker:20.10.16

# Instalar dependencias necesarias
RUN apk add --no-cache \
    python3 \
    py3-pip \
    bash \
    git

# Instalar docker-compose
RUN pip3 install docker-compose

# Copiar los archivos del proyecto
COPY . /app
WORKDIR /app

# Exponer los puertos necesarios
EXPOSE 3000
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["docker-compose", "up", "-d"] 