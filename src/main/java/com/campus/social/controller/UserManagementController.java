package com.campus.social.controller;

import com.campus.social.model.User;
import com.campus.social.model.ErrorResponse;
import com.campus.social.service.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserManagementController {
    
    @Autowired
    private UserManagementService userManagementService;
    
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        try {
            return ResponseEntity.ok(userManagementService.getAllUsers());
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("获取用户列表失败: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{userId}/role")
    public ResponseEntity<?> toggleUserRole(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(userManagementService.toggleUserRole(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("更改用户角色失败: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{userId}/status")
    public ResponseEntity<?> toggleUserStatus(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(userManagementService.toggleUserStatus(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("更改用户状态失败: " + e.getMessage()));
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            System.out.println("Received create user request with data: " + 
                             "username=" + user.getUsername() + 
                             ", email=" + user.getEmail());
            
            if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("用户名不能为空"));
            }
            if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("邮箱不能为空"));
            }
            if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("密码不能为空"));
            }
            
            User createdUser = userManagementService.createUser(user);
            System.out.println("User created successfully with ID: " + createdUser.getId());
            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            System.err.println("Error creating user: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("创建用户失败: " + e.getMessage()));
        }
    }
    
    @GetMapping("/{userId}/password")
    public ResponseEntity<?> getUserPassword(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(userManagementService.getUserPassword(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("获取用户密码失败: " + e.getMessage()));
        }
    }
} 