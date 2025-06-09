package com.example.movies.dto;

import lombok.Data;
import java.util.Set;

@Data
public class MovieDTO {
    private Long id;
    private String title;
    private String description;
    private Set<String> directors;
    private Set<String> genres;
    private Set<String> stars;
} 