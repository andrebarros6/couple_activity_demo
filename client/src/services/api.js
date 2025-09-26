import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging (development only)
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', response.status, response.data);
    }
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API functions
export const searchActivities = async (criteria) => {
  try {
    const response = await api.post('/activities/search', criteria);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to search activities');
  }
};

export const getCities = async () => {
  try {
    const response = await api.get('/activities/cities');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch cities');
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/activities/categories');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch categories');
  }
};

export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Server health check failed');
  }
};

export default api;