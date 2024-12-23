package com.campus.social.dto;

import com.campus.social.model.User;

public class LoginResponse {
    private User user;
    private boolean isAdmin;
    private String token;

    public LoginResponse(User user, boolean isAdmin) {
        this.user = user;
        this.isAdmin = isAdmin;
    }

    // Getters and Setters
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
} 