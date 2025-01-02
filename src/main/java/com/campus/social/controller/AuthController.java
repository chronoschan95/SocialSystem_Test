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
            // 检查邮箱是否已存在
            if (authService.isEmailExists(user.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("该邮箱已注册，是否跳转到登录页面？"));
            }
            
            // 验证用户数据
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

            return authService.register(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("注册失败: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = authService.login(loginRequest);
            LoginResponse response = new LoginResponse(user);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> isEmailExists(@RequestParam String email) {
        try {
            boolean exists = authService.isEmailExists(email);
            return ResponseEntity.ok().body(exists);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/check-username")
    public ResponseEntity<?> isUsernameExists(@RequestParam String username) {
        try {
            boolean exists = authService.isUsernameExists(username);
            return ResponseEntity.ok().body(exists);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
        }
    }
} 