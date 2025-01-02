package com.campus.social.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/topics")
@CrossOrigin(origins = "http://localhost:3000")
public class TopicsController {

    @GetMapping
    public ResponseEntity<?> getTopics() {
        return ResponseEntity.ok().body("Topics page");
    }
} 