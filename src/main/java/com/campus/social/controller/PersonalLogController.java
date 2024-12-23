package com.campus.social.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/personal-log")
@CrossOrigin(origins = "http://localhost:3000")
public class PersonalLogController {
    @GetMapping
    public ResponseEntity<?> getPersonalLogs() {
        return ResponseEntity.ok().body("Personal logs page");
    }
} 