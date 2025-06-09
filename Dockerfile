# Usar una imagen base con Docker y Docker Compose
FROM ubuntu:22.04

# Evitar interacciones durante la instalación
ENV DEBIAN_FRONTEND=noninteractive

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    software-properties-common \
    python3-pip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Instalar Docker
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update \
    && apt-get install -y docker-ce docker-ce-cli containerd.io \
    && rm -rf /var/lib/apt/lists/*

# Instalar Docker Compose
RUN pip3 install docker-compose

# Crear directorio de trabajo
WORKDIR /app

# Copiar todos los archivos necesarios
COPY . .

# Dar permisos de ejecución al script de inicio
RUN chmod +x start.sh

# Exponer los puertos necesarios
EXPOSE 8080 3000 3306

# Comando para iniciar la aplicación
CMD ["./start.sh"]

# Etapa 1: Construir el Backend
FROM maven:3.9-eclipse-temurin-17 AS backend-builder
WORKDIR /app
COPY Backend/pom.xml ./
COPY Backend/src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Construir el Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend/ ./
RUN npm run build

# Etapa 3: Crear imagen final con Nginx como proxy
FROM nginx:alpine
WORKDIR /app

# Instalar OpenJDK para ejecutar el backend
RUN apk add --no-cache openjdk17-jre

# Copiar el JAR del backend
COPY --from=backend-builder /app/target/*.jar /app/backend.jar

# Copiar archivos del frontend construido
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar script de inicio
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Exponer puerto 80 (Nginx)
EXPOSE 80

# Iniciar ambos servicios
CMD ["/app/start.sh"] 