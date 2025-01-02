package com.campus.social.dto;

import com.campus.social.model.User;

public class LoginResponse {
    private User user;
    private boolean admin;
    private boolean loginAsAdmin;
    private String token;

    public LoginResponse(User user) {
        this.user = user;
        this.admin = user.isAdmin();
        this.loginAsAdmin = user.isLoginAsAdmin();
    }

    // Getters and Setters
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public boolean isLoginAsAdmin() {
        return loginAsAdmin;
    }

    public void setLoginAsAdmin(boolean loginAsAdmin) {
        this.loginAsAdmin = loginAsAdmin;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
} 