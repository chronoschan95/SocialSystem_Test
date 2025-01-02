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
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new RuntimeException("邮箱不能为空");
        }
        
        User user = userRepository.findByEmail(request.getEmail().trim());
        
        if (user == null) {
            throw new RuntimeException("用户不存在");
        }
        
        if (user.isDeleted()) {
            throw new RuntimeException("账号已被禁用");
        }
        
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("密码错误");
        }
        
        // 处理管理员登录逻辑
        if (request.isLoginAsAdmin() && !user.isAdmin()) {
            throw new RuntimeException("该账号没有管理员权限");
        }
        
        // 设置登录模式
        user.setLoginAsAdmin(request.isLoginAsAdmin());
        return userRepository.save(user); // 保存更新后的用户状态
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

    public boolean isEmailExists(String email) {
        User user = userRepository.findByEmail(email);
        return user != null;
    }

    public boolean isUsernameExists(String username) {
        return userRepository.findByUsername(username) != null;
    }
}