// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`, // Update this with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
