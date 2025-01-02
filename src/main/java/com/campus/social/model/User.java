package com.campus.social.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String email;
    private String password;
    
    @Column(name = "is_admin")
    private boolean isAdmin;
    
    @Column(name = "deleted")
    private boolean deleted;
    
    @Transient
    private boolean loginAsAdmin;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public boolean isLoginAsAdmin() {
        return loginAsAdmin;
    }

    public void setLoginAsAdmin(boolean loginAsAdmin) {
        this.loginAsAdmin = loginAsAdmin;
    }

    // 默认构造函数
    public User() {}
    
    // 添加新的构造函数用于查询结果映射
    public User(Long id, String username, String email, boolean isAdmin, boolean deleted) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.isAdmin = isAdmin;
        this.deleted = deleted;
    }
}