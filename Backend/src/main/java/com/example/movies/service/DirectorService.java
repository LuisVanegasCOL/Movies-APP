package com.example.movies.service;

import com.example.movies.entity.Director;
import com.example.movies.repository.DirectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Optional;

@Service
public class DirectorService {
    
    private static final Logger logger = LoggerFactory.getLogger(DirectorService.class);
    
    @Autowired
    private DirectorRepository directorRepository;

    public List<Director> getAllDirectors() {
        logger.info("🎭 Consultando todos los directores desde la BD...");
        List<Director> directors = directorRepository.findAll();
        logger.info("🎭 ✅ Encontrados {} directores en la base de datos", directors.size());
        return directors;
    }

    public Optional<Director> getDirectorById(Long id) {
        logger.info("🔍 Buscando director con ID: {}", id);
        Optional<Director> director = directorRepository.findById(id);
        if (director.isPresent()) {
            logger.info("🔍 ✅ Director encontrado: {}", director.get().getName());
        } else {
            logger.warn("🔍 ⚠️ Director con ID {} no encontrado", id);
        }
        return director;
    }

    public Director saveDirector(Director director) {
        logger.info("💾 Guardando nuevo director: {}", director.getName());
        try {
            if (director.getName() == null || director.getName().trim().isEmpty()) {
                throw new IllegalArgumentException("El nombre del director no puede estar vacío");
            }
            Director savedDirector = directorRepository.save(director);
            logger.info("💾 ✅ Director guardado exitosamente con ID: {}", savedDirector.getId());
            return savedDirector;
        } catch (Exception e) {
            logger.error("💾 ❌ Error al guardar el director: {}", e.getMessage());
            throw e;
        }
    }

    public Director updateDirector(Long id, Director director) {
        logger.info("📝 Actualizando director con ID: {}", id);
        try {
            if (!directorRepository.existsById(id)) {
                throw new IllegalArgumentException("El director con ID " + id + " no existe");
            }
            director.setId(id);
            Director updatedDirector = directorRepository.save(director);
            logger.info("📝 ✅ Director actualizado exitosamente: {}", updatedDirector.getName());
            return updatedDirector;
        } catch (Exception e) {
            logger.error("📝 ❌ Error al actualizar el director: {}", e.getMessage());
            throw e;
        }
    }

    public void deleteDirector(Long id) {
        logger.info("🗑️ Eliminando director con ID: {}", id);
        try {
            if (!directorRepository.existsById(id)) {
                throw new IllegalArgumentException("El director con ID " + id + " no existe");
            }
            directorRepository.deleteById(id);
            logger.info("🗑️ ✅ Director eliminado exitosamente");
        } catch (Exception e) {
            logger.error("🗑️ ❌ Error al eliminar el director: {}", e.getMessage());
            throw e;
        }
    }
} 