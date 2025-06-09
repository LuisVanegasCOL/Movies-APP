FROM maven:3.9-eclipse-temurin-17 AS backend-builder
WORKDIR /app
COPY Backend /app
RUN mvn clean package -DskipTests

FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY Frontend /app
RUN npm install
RUN npm run build

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Instalar Node.js, npm y bash
RUN apk add --no-cache nodejs npm bash

# Copiar el backend construido
COPY --from=backend-builder /app/target/*.jar /app/backend.jar

# Copiar el frontend construido
COPY --from=frontend-builder /app/dist /app/frontend

# Exponer los puertos
EXPOSE 8080 3000

# Comando para iniciar la aplicación usando bash
CMD ["/bin/bash", "-c", "java -jar backend.jar & cd frontend && npm install -g serve && serve -s . -l 3000"] 