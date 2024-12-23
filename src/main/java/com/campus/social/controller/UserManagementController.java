package com.campus.social.controller;

import com.campus.social.model.User;
import com.campus.social.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserManagementController {
    
    @Autowired
    private UserManagementService userManagementService;
    
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userManagementService.getAllUsers());
    }
    
    @PutMapping("/{userId}/role")
    public ResponseEntity<?> toggleUserRole(@PathVariable Long userId) {
        return ResponseEntity.ok(userManagementService.toggleUserRole(userId));
    }
    
    @PutMapping("/{userId}/status")
    public ResponseEntity<?> toggleUserStatus(@PathVariable Long userId) {
        return ResponseEntity.ok(userManagementService.toggleUserStatus(userId));
    }
} 