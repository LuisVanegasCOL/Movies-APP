package com.example.movies.service;

import com.example.movies.entity.Star;
import com.example.movies.repository.StarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class StarService {
    @Autowired
    private StarRepository starRepository;

    public List<Star> getAllStars() {
        return starRepository.findAll();
    }

    public Optional<Star> getStarById(Long id) {
        return starRepository.findById(id);
    }

    public Star saveStar(Star star) {
        return starRepository.save(star);
    }

    public Star updateStar(Long id, Star star) {
        star.setId(id);
        return starRepository.save(star);
    }

    public void deleteStar(Long id) {
        starRepository.deleteById(id);
    }
} 