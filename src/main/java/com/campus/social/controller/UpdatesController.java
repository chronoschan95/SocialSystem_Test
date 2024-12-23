package com.campus.social.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/updates")
@CrossOrigin(origins = "http://localhost:3000")
public class UpdatesController {

    @GetMapping
    public ResponseEntity<?> getUpdates() {
        return ResponseEntity.ok().body("Updates page");
    }
} 