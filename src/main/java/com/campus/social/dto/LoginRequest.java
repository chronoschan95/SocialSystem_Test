package com.campus.social.dto;

public class LoginRequest {
    private String email;
    private String password;
    private boolean isAdminLogin;

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

    public boolean isAdminLogin() {
        return isAdminLogin;
    }

    public void setAdminLogin(boolean adminLogin) {
        isAdminLogin = adminLogin;
    }

    @Override
    public String toString() {
        return "LoginRequest{" +
                "email='" + email + '\'' +
                ", password='[PROTECTED]'" +
                '}';
    }
}