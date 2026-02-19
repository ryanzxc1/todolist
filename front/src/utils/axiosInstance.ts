import axios from 'axios';

const axiosInstance = axios.create({
  // 배포 시엔 환경 변수를 쓰고, 로컬 개발 시엔 localhost를 사용
  // baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1',
  baseURL: 'http://13.124.238.31:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - JWT 토큰 자동 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - 401 에러 시 로그아웃 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;