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
        console.log('Sending request to:', config.url, config.data);
        return config;
    },
    error => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => {
        console.log('Received response:', response.data);
        return response;
    },
    error => {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout');
            return Promise.reject(new Error('请求超时，请稍后重试'));
        }
        
        if (!error.response) {
            console.error('Network error:', error);
            return Promise.reject(new Error('网络连接失败，请检查后端服务是否启动'));
        }

        console.error('Response error:', error.response);
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData)
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