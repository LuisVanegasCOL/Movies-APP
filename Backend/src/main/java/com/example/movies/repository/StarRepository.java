package com.example.movies.repository;

import com.example.movies.entity.Star;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StarRepository extends JpaRepository<Star, Long> {} 