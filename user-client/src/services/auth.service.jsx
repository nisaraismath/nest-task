import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
  baseURL: 'http://localhost:3000/auth',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject({
        message: error.response.data?.message || 'Request failed',
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      return Promise.reject({ message: 'No response from server' });
    } else {
      return Promise.reject({ message: error.message });
    }
  }
);

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    if (response.data.token) {
      const decoded = jwtDecode(response.data.token);
      return {
        token: response.data.token,
        user: decoded
      };
    }
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Registration failed');
  }
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return jwtDecode(token);
  }
  return null;
};

export default {
  login,
  register,
  getCurrentUser
};