package com.example.movies;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class MoviesApplication {
    
    private static final Logger logger = LoggerFactory.getLogger(MoviesApplication.class);
    
    public static void main(String[] args) {
        logger.info("🎬 INICIANDO API DE PELÍCULAS...");
        SpringApplication.run(MoviesApplication.class, args);
    }
    
    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        logger.info("✅ ¡API DE PELÍCULAS INICIADA EXITOSAMENTE!");
        logger.info("🌐 Swagger UI disponible en: http://localhost:8080/swagger-ui.html");
        logger.info("📋 API disponible en: http://localhost:8080/api/");
        logger.info("🎯 Endpoints principales:");
        logger.info("   - GET /api/movies (DTO con relaciones)");
        logger.info("   - GET /api/directors");
        logger.info("   - GET /api/stars");
        logger.info("   - GET /api/genres");
    }
} 