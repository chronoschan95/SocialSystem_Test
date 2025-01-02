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
import jakarta.servlet.http.HttpSession;

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
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        try {
            User user = authService.login(loginRequest);
            // 在 session 中存储用户信息
            session.setAttribute("userId", user.getId());
            session.setAttribute("email", user.getEmail());
            
            LoginResponse response = new LoginResponse(user);
            System.out.println("User logged in: " + user.getUsername() + ", Email: " + user.getEmail());
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

    @GetMapping("/current-user")
    @ResponseBody
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        try {
            // 从 session 中获取用户 ID
            Long userId = (Long) session.getAttribute("userId");
            System.out.println("Current userId from session: " + userId); // 添加日志
            
            if (userId == null) {
                // 尝试从 token 获取用户信息
                String token = session.getAttribute("token") != null ? 
                             session.getAttribute("token").toString() : null;
                System.out.println("Token from session: " + token); // 添加日志
                
                if (token == null) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ErrorResponse("未登录"));
                }
                // 这里可以添加从 token 获取用户信息的逻辑
            }
            
            User currentUser = authService.getCurrentUser(userId);
            System.out.println("Found user: " + currentUser); // 添加日志
            
            return ResponseEntity.ok(currentUser);
        } catch (Exception e) {
            e.printStackTrace(); // 添加详细错误日志
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("获取用户信息失败: " + e.getMessage()));
        }
    }

    @GetMapping("/user-by-email")
    @ResponseBody
    public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
        try {
            System.out.println("Received request for email: " + email);
            User user = authService.getUserByEmail(email);
            
            if (user != null) {
                System.out.println("Found user: " + user.getUsername());
                return ResponseEntity.ok(user);
            } else {
                System.out.println("No user found for email: " + email);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("用户不存在"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("获取用户信息失败: " + e.getMessage()));
        }
    }
} 