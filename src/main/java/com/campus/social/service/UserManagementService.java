package com.campus.social.service;

import com.campus.social.model.User;
import com.campus.social.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * 用户管理服务类
 * 提供用户相关的核心业务逻辑实现
 */
@Service
public class UserManagementService {
    @Autowired
    private UserRepository userRepository;
    
    /**
     * 获取所有用户列表
     * @return 用户列表
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    /**
     * 切换用户的管理员权限状态
     * @param userId 用户ID
     * @return 更新后的用户对象
     * @throws RuntimeException 当用户不存在时抛出
     */
    public User toggleUserRole(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("未找到用户"));
        user.setAdmin(!user.isAdmin());
        return userRepository.save(user);
    }
    
    /**
     * 切换用户的删除状态
     * @param userId 用户ID
     * @return 更新后的用户对象
     * @throws RuntimeException 当用户不存在时抛出
     */
    public User toggleUserStatus(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户未找到"));
        user.setDeleted(!user.isDeleted());
        return userRepository.save(user);
    }
    
    /**
     * 创建新用户
     * 包含数据验证、重复检查等安全措施
     * @param user 待创建的用户对象
     * @return 创建成功的用户对象
     * @throws RuntimeException 当验证失败或保存失败时抛出
     */
    public User createUser(User user) {
        // 数据验证
        validateUserData(user);
        
        // 检查邮箱是否已存在
        checkEmailExists(user.getEmail());
        
        // 设置默认值
        setDefaultValues(user);
        
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("保存用户失败: " + e.getMessage());
        }
    }
    
    /**
     * 验证用户数据完整性
     * @param user 待验证的用户对象
     * @throws RuntimeException 当验证失败时抛出
     */
    private void validateUserData(User user) {
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new RuntimeException("用户名不能为空");
        }
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new RuntimeException("邮箱不能为空");
        }
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            throw new RuntimeException("密码不能为空");
        }
    }
    
    /**
     * 检查邮箱是否已被注册
     * @param email 待检查的邮箱
     * @throws RuntimeException 当邮箱已存在时抛出
     */
    private void checkEmailExists(String email) {
        User existingUser = userRepository.findByEmail(email);
        if (existingUser != null) {
            throw new RuntimeException("该邮箱已被注册");
        }
    }
    
    /**
     * 设置用户默认值
     * @param user 待设置的用户对象
     */
    private void setDefaultValues(User user) {
        user.setAdmin(false);
        user.setDeleted(false);
    }
    
    /**
     * 获取用户密码
     * @param userId 用户ID
     * @return 用户密码
     * @throws RuntimeException 当用户不存在时抛出
     */
    public String getUserPassword(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户未找到"));
        return user.getPassword();
    }
}