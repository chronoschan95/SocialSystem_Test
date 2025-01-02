import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true,
    timeout: 5000
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('API Request:', {
            url: config.url,
            method: config.method,
            headers: config.headers,
            data: config.data
        });
        return config;
    },
    error => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => {
        console.log('API Response:', {
            url: response.config.url,
            status: response.status,
            data: response.data
        });
        return response;
    },
    error => {
        console.error('Response error:', error.response || error);
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getCurrentUser: () => api.get('/auth/current-user')
};

export const newsAPI = {
    getAll: () => api.get('/news'),
    create: (newsData) => api.post('/news', newsData)
};

export const topicsAPI = {
    getAll: () => api.get('/topics'),
    create: (topicData) => api.post('/topics', topicData)
};

export const updatesAPI = {
    getAll: () => api.get('/updates'),
    create: (updateData) => api.post('/updates', updateData)
};

export const personalLogAPI = {
    getAll: () => api.get('/personal-log'),
    create: (logData) => api.post('/personal-log', logData)
};

export default api;