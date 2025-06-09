package com.example.movies.controller;

import com.example.movies.entity.Star;
import com.example.movies.service.StarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stars")
public class StarController {
    @Autowired
    private StarService starService;

    @GetMapping
    public List<Star> getAllStars() {
        return starService.getAllStars();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Star> getStarById(@PathVariable Long id) {
        Optional<Star> star = starService.getStarById(id);
        return star.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Star createStar(@RequestBody Star star) {
        return starService.saveStar(star);
    }

    @PutMapping("/{id}")
    public Star updateStar(@PathVariable Long id, @RequestBody Star star) {
        return starService.updateStar(id, star);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStar(@PathVariable Long id) {
        starService.deleteStar(id);
        return ResponseEntity.noContent().build();
    }
} 