import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getCurrentUser = async () => {
        try {
            // 使用管理员接口获取所有用户
            const response = await fetch('http://localhost:8080/api/admin/users', {
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const users = await response.json();
            const userEmail = localStorage.getItem('email');
            const currentUser = users.find(user => user.email === userEmail && !user.deleted);

            if (currentUser) {
                setUser(currentUser);
                localStorage.setItem('user', JSON.stringify(currentUser));
                return currentUser;
            }
            throw new Error('User not found');
        } catch (error) {
            console.error('获取用户信息失败:', error);
            return null;
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            await getCurrentUser();
        };
        checkAuth();
    }, []);

    const login = async (userData) => {
        console.log('Processing login with data:', userData);
        
        if (!userData.user || !userData.user.email) {
            console.error('Invalid user data received:', userData);
            return;
        }
        
        const userInfo = userData.user;
        
        // 存储用户信息
        localStorage.setItem('email', userInfo.email);
        localStorage.setItem('user', JSON.stringify(userInfo));
        
        // 更新 context
        setUser(userInfo);
        
        // 立即获取最新用户信息
        try {
            const response = await fetch(
                `http://localhost:8080/api/auth/user-by-email?email=${encodeURIComponent(userInfo.email)}`,
                {
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            if (response.ok) {
                const freshUserData = await response.json();
                console.log('Retrieved fresh user data:', freshUserData);
                if (freshUserData && freshUserData.email) {
                    localStorage.setItem('user', JSON.stringify(freshUserData));
                    setUser(freshUserData);
                }
            }
        } catch (error) {
            console.error('Error fetching fresh user data:', error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout,
            getCurrentUser 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};