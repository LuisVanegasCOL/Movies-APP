package com.example.movies.controller;

import com.example.movies.dto.MovieDTO;
import com.example.movies.entity.Movie;
import com.example.movies.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class MovieController {
    
    private static final Logger logger = LoggerFactory.getLogger(MovieController.class);
    
    @Autowired
    private MovieService movieService;

    @GetMapping
    public List<MovieDTO> getAllMovies() {
        logger.info("🌐 HTTP GET /api/movies - Solicitando todas las películas (DTO)");
        List<MovieDTO> movies = movieService.getAllMovies();
        logger.info("🌐 ✅ Respuesta enviada con {} películas", movies.size());
        return movies;
    }

    @GetMapping("/entity")
    public List<Movie> getAllMoviesEntity() {
        logger.info("🌐 HTTP GET /api/movies/entity - Solicitando todas las películas (entidades)");
        List<Movie> movies = movieService.getAllMoviesEntity();
        logger.info("🌐 ✅ Respuesta enviada con {} películas", movies.size());
        return movies;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        logger.info("🌐 HTTP GET /api/movies/{} - Solicitando película específica", id);
        Optional<Movie> movie = movieService.getMovieById(id);
        if (movie.isPresent()) {
            logger.info("🌐 ✅ Película encontrada y enviada: {}", movie.get().getTitle());
            return ResponseEntity.ok(movie.get());
        } else {
            logger.warn("🌐 ⚠️ Película no encontrada, enviando 404");
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        logger.info("🌐 HTTP POST /api/movies - Creando nueva película: {}", movie.getTitle());
        try {
            Movie createdMovie = movieService.saveMovie(movie);
            logger.info("🌐 ✅ Película creada exitosamente con ID: {}", createdMovie.getId());
            return ResponseEntity.ok(createdMovie);
        } catch (Exception e) {
            logger.error("🌐 ❌ Error al crear la película: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable Long id, @RequestBody Movie movie) {
        logger.info("🌐 HTTP PUT /api/movies/{} - Actualizando película: {}", id, movie.getTitle());
        Movie updatedMovie = movieService.updateMovie(id, movie);
        logger.info("🌐 ✅ Película actualizada exitosamente");
        return updatedMovie;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        logger.info("🌐 HTTP DELETE /api/movies/{} - Eliminando película", id);
        movieService.deleteMovie(id);
        logger.info("🌐 ✅ Película eliminada exitosamente");
        return ResponseEntity.noContent().build();
    }
} 