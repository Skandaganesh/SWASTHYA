// src/components/Login.js
import React, { useState } from 'react';
import api from '../api';

const Login = () => {
  const [loginData, setLoginData] = useState({
    user_id: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', loginData);
      alert(response.data.message);  // Show success message
    } catch (error) {
      alert(error.response?.data?.message || 'Error logging in');  // Show error message
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="user_id" placeholder="User ID" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
