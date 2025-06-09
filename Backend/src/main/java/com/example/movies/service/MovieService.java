package com.example.movies.service;

import com.example.movies.dto.MovieDTO;
import com.example.movies.entity.Movie;
import com.example.movies.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MovieService {
    
    private static final Logger logger = LoggerFactory.getLogger(MovieService.class);
    
    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMoviesEntity() {
        logger.info("📀 Consultando todas las películas (entidades completas) desde la BD...");
        List<Movie> movies = movieRepository.findAll();
        logger.info("📀 ✅ Encontradas {} películas en la base de datos", movies.size());
        return movies;
    }

    public List<MovieDTO> getAllMovies() {
        logger.info("🎬 Consultando todas las películas (DTO con relaciones) desde la BD...");
        List<Movie> movies = movieRepository.findAll();
        List<MovieDTO> movieDTOs = movies.stream().map(this::convertToDTO).collect(Collectors.toList());
        logger.info("🎬 ✅ Convertidas {} películas a DTO con relaciones", movieDTOs.size());
        return movieDTOs;
    }

    public Optional<Movie> getMovieById(Long id) {
        logger.info("🔍 Buscando película con ID: {}", id);
        Optional<Movie> movie = movieRepository.findById(id);
        if (movie.isPresent()) {
            logger.info("🔍 ✅ Película encontrada: {}", movie.get().getTitle());
        } else {
            logger.warn("🔍 ⚠️ Película con ID {} no encontrada", id);
        }
        return movie;
    }

    public Movie saveMovie(Movie movie) {
        logger.info("💾 Guardando nueva película: {}", movie.getTitle());
        try {
            if (movie.getTitle() == null || movie.getTitle().trim().isEmpty()) {
                throw new IllegalArgumentException("El título de la película no puede estar vacío");
            }
            Movie savedMovie = movieRepository.save(movie);
            logger.info("💾 ✅ Película guardada exitosamente con ID: {}", savedMovie.getId());
            return savedMovie;
        } catch (Exception e) {
            logger.error("💾 ❌ Error al guardar la película: {}", e.getMessage());
            throw e;
        }
    }

    public Movie updateMovie(Long id, Movie movie) {
        logger.info("📝 Actualizando película con ID: {}", id);
        try {
            if (!movieRepository.existsById(id)) {
                throw new IllegalArgumentException("La película con ID " + id + " no existe");
            }
            movie.setId(id);
            Movie updatedMovie = movieRepository.save(movie);
            logger.info("📝 ✅ Película actualizada exitosamente: {}", updatedMovie.getTitle());
            return updatedMovie;
        } catch (Exception e) {
            logger.error("📝 ❌ Error al actualizar la película: {}", e.getMessage());
            throw e;
        }
    }

    public void deleteMovie(Long id) {
        logger.info("🗑️ Eliminando película con ID: {}", id);
        try {
            if (!movieRepository.existsById(id)) {
                throw new IllegalArgumentException("La película con ID " + id + " no existe");
            }
            movieRepository.deleteById(id);
            logger.info("🗑️ ✅ Película eliminada exitosamente");
        } catch (Exception e) {
            logger.error("🗑️ ❌ Error al eliminar la película: {}", e.getMessage());
            throw e;
        }
    }

    private MovieDTO convertToDTO(Movie movie) {
        MovieDTO dto = new MovieDTO();
        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setDescription(movie.getDescription());
        
        // Verificar si las colecciones no son null antes de procesarlas
        if (movie.getDirectors() != null) {
            dto.setDirectors(movie.getDirectors().stream().map(d -> d.getName()).collect(Collectors.toSet()));
        }
        
        if (movie.getGenres() != null) {
            dto.setGenres(movie.getGenres().stream().map(g -> g.getName()).collect(Collectors.toSet()));
        }
        
        if (movie.getStars() != null) {
            dto.setStars(movie.getStars().stream().map(s -> s.getName()).collect(Collectors.toSet()));
        }
        
        return dto;
    }
} 