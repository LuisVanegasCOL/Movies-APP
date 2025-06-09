package com.example.movies.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class DatabaseConnectionLogger {
    
    private static final Logger logger = LoggerFactory.getLogger(DatabaseConnectionLogger.class);
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @EventListener(ApplicationReadyEvent.class)
    public void checkDatabaseConnection() {
        try {
            // Verificar conexión con una consulta simple
            String version = jdbcTemplate.queryForObject("SELECT VERSION()", String.class);
            logger.info("💾 ✅ CONEXIÓN A BASE DE DATOS EXITOSA!");
            logger.info("💾 🔗 Conectado a MySQL versión: {}", version);
            
            // Verificar que las tablas existen
            Integer movieCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM movies", Integer.class);
            Integer directorCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM directors", Integer.class);
            Integer starCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM stars", Integer.class);
            Integer genreCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM genres", Integer.class);
            
            logger.info("💾 📊 DATOS EN LA BASE DE DATOS:");
            logger.info("💾 🎬 Películas: {}", movieCount);
            logger.info("💾 🎭 Directores: {}", directorCount);
            logger.info("💾 ⭐ Estrellas: {}", starCount);
            logger.info("💾 🏷️ Géneros: {}", genreCount);
            logger.info("💾 ✅ ---- Esta funcionando correctamente el backend ----");
            
        } catch (Exception e) {
            logger.error("💾 ❌ ERROR AL CONECTAR CON LA BASE DE DATOS: {}", e.getMessage());
        }
    }
} 