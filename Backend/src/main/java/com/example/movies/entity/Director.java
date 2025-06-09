package com.example.movies.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Set;

@Entity
@Table(name = "directors")
@Data
public class Director {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(name = "birth_date")
    private String birthDate;
    
    private String nationality;
    
    @Column(columnDefinition = "TEXT")
    private String biography;
    
    @Column(name = "image_url")
    private String imageUrl;

    @ManyToMany(mappedBy = "directors")
    @JsonIgnore
    private Set<Movie> movies;
} 