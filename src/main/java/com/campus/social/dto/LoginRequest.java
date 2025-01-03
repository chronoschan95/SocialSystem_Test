package com.campus.social.dto;

public class LoginRequest {
    private String email;
    private String password;
    private boolean loginAsAdmin;

    // Getters and Setters
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

    public boolean isLoginAsAdmin() {
        return loginAsAdmin;
    }

    public void setLoginAsAdmin(boolean loginAsAdmin) {
        this.loginAsAdmin = loginAsAdmin;
    }
}