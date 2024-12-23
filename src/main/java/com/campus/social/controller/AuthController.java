package com.campus.social.controller;

import com.campus.social.model.User;
import com.campus.social.service.AuthService;
import com.campus.social.dto.LoginRequest;
import com.campus.social.dto.LoginResponse;
import com.campus.social.dto.ErrorResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            System.out.println("Received registration request for user: " + user.getEmail());
            return authService.register(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ErrorResponse("Registration failed: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = authService.login(loginRequest);
            if (user != null) {
                LoginResponse response = new LoginResponse(user, user.isAdmin());
                response.setToken("dummy-token-" + System.currentTimeMillis());
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.badRequest().body("Invalid credentials");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }
} 