package com.campus.social.service;

import com.campus.social.model.User;
import com.campus.social.repository.UserRepository;
import com.campus.social.dto.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;

    public User login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        
        // 如果是特殊账户且不存在，则创建
        if (user == null && "1018296826@qq.com".equals(request.getEmail())) {
            user = new User();
            user.setEmail("1018296826@qq.com");
            user.setPassword("123456");
            user.setUsername("Admin");
            user.setAdmin(true);
            user = userRepository.save(user);
        }
        
        // 验证密码
        if (user != null && user.getPassword().equals(request.getPassword())) {
            // 如果是管理员登录但用户不是管理员
            if (request.isAdminLogin() && !user.isAdmin() && 
                !"1018296826@qq.com".equals(request.getEmail())) {
                throw new RuntimeException("该账户不是管理员账户");
            }
            return user;
        }
        
        return null;
    }

    public ResponseEntity<?> register(User user) {
        // 检查邮箱是否已存在
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            return ResponseEntity.badRequest().body("该邮箱已被注册");
        }
        
        // 设置为普通用户
        user.setAdmin(false);
        user.setDeleted(false);
        
        // 特殊处理管理员账号
        if ("1018296826@qq.com".equals(user.getEmail())) {
            user.setAdmin(true);
        }
        
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
}