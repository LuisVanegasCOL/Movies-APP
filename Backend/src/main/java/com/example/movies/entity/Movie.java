package com.example.movies.entity;

import jakarta.persistence.*;
import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "movies")
@Data
@Schema(description = "Entidad que representa una película")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private Integer year;
    private String imageUrl;
    private String certificate;
    private Integer runtime;
    private Float imdbRating;
    private String description;
    private Integer metacore;
    private Long votes;
    private Long gross;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "movies_directors",
        joinColumns = @JoinColumn(name = "movies_id"),
        inverseJoinColumns = @JoinColumn(name = "directors_id")
    )
    private Set<Director> directors = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "movies_stars",
        joinColumns = @JoinColumn(name = "movies_id"),
        inverseJoinColumns = @JoinColumn(name = "stars_id")
    )
    private Set<Star> stars = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "movies_genres",
        joinColumns = @JoinColumn(name = "movies_id"),
        inverseJoinColumns = @JoinColumn(name = "genres_id")
    )
    private Set<Genre> genres = new HashSet<>();
} 