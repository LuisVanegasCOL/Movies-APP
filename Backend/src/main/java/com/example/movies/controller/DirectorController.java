package com.example.movies.controller;

import com.example.movies.entity.Director;
import com.example.movies.service.DirectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/directors")
public class DirectorController {
    
    private static final Logger logger = LoggerFactory.getLogger(DirectorController.class);
    
    @Autowired
    private DirectorService directorService;

    @GetMapping
    public List<Director> getAllDirectors() {
        logger.info("🌐 HTTP GET /api/directors - Solicitando todos los directores");
        List<Director> directors = directorService.getAllDirectors();
        logger.info("🌐 ✅ Respuesta enviada con {} directores", directors.size());
        return directors;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Director> getDirectorById(@PathVariable Long id) {
        Optional<Director> director = directorService.getDirectorById(id);
        return director.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Director createDirector(@RequestBody Director director) {
        return directorService.saveDirector(director);
    }

    @PutMapping("/{id}")
    public Director updateDirector(@PathVariable Long id, @RequestBody Director director) {
        return directorService.updateDirector(id, director);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDirector(@PathVariable Long id) {
        directorService.deleteDirector(id);
        return ResponseEntity.noContent().build();
    }
} 