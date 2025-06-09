FROM node:18-alpine

# Instalar dependencias necesarias
RUN apk add --no-cache \
    python3 \
    py3-pip \
    bash \
    git \
    docker \
    docker-cli

# Copiar los archivos del proyecto
COPY . /app

# Establecer el directorio de trabajo
WORKDIR /app

# Exponer los puertos necesarios
EXPOSE 3000 8080

# Comando para iniciar la aplicación
CMD ["sh", "-c", "cd Backend && ./mvnw spring-boot:run & cd Frontend && npm install && npm run dev"] 