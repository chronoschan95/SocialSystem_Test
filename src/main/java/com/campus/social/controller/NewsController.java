package com.campus.social.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "http://localhost:3000")
public class NewsController {
    @GetMapping
    public ResponseEntity<?> getAllNews() {
        return ResponseEntity.ok().body("News page");
    }
} 