// utils/api.js - Axios configuration and interceptors for Nigerian School Management System

import axios from 'axios';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const MOCK_API_ENABLED = import.meta.env.VITE_ENABLE_MOCK_API !== 'false';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds timeout (good for slower Nigerian internet)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor - Add auth token and handle loading
api.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp for Nigerian timezone
    config.headers['X-Request-Time'] = new Date().toISOString();
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and responses
api.interceptors.response.use(
  (response) => {
    // Log successful response in development
    if (import.meta.env.DEV) {
      console.log('✅ API Response:', response.status, response.config.url);
    }

    return response;
  },
  (error) => {
    // Handle different error scenarios common in Nigerian context
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Request timeout - Check internet connection');
      error.message = 'Request timeout. Please check your internet connection.';
    }

    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          localStorage.removeItem('auth_token');
          window.location.href = '/auth/login';
          break;
        case 403:
          error.message = 'Access denied. Contact school administrator.';
          break;
        case 404:
          error.message = 'Resource not found.';
          break;
        case 422:
          error.message = data.message || 'Validation error occurred.';
          break;
        case 500:
          error.message = 'Server error. Please try again later.';
          break;
        default:
          error.message = data.message || 'An unexpected error occurred.';
      }
    } else if (error.request) {
      // Network error - common in Nigeria
      error.message = 'Network error. Please check your internet connection.';
    }

    console.error('❌ API Error:', error.message);
    return Promise.reject(error);
  }
);

// Mock API delay simulation (for realistic testing)
const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// API helper functions
export const apiHelpers = {
  // Check if using mock API
  isMockMode: () => MOCK_API_ENABLED,

  // Format Nigerian phone numbers
  formatPhoneNumber: (phone) => {
    if (!phone) return '';
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');
    // Format as +234-XXX-XXX-XXXX
    if (cleaned.length === 11 && cleaned.startsWith('0')) {
      return `+234-${cleaned.slice(1, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  },

  // Format Nigerian currency
  formatCurrency: (amount) => {
    if (!amount) return '₦0.00';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  },

  // Handle file uploads with progress
  uploadFile: async (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress?.(percentCompleted);
      },
    });
  },

  // Batch API requests
  batchRequests: async (requests) => {
    try {
      const responses = await Promise.allSettled(requests);
      return responses.map((result, index) => ({
        index,
        success: result.status === 'fulfilled',
        data: result.status === 'fulfilled' ? result.value.data : null,
        error: result.status === 'rejected' ? result.reason : null,
      }));
    } catch (error) {
      console.error('Batch request error:', error);
      throw error;
    }
  },

  // Export data helper
  exportData: async (endpoint, format = 'csv') => {
    const response = await api.get(`${endpoint}/export`, {
      params: { format },
      responseType: 'blob',
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `export_${Date.now()}.${format}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};

// Export configured axios instance and helpers
export default api;
export { mockDelay };