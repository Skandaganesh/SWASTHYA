// src/components/Signup.js
import React, { useState } from 'react';
import api from '../api';

const Signup = () => {
  const [userData, setUserData] = useState({
    user_id: '',
    name: '',
    age: '',
    dietary_preferences: '',
    health_goals: '',
    allergy_info: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/signup', userData);
      alert(response.data.message);  // Show success message
    } catch (error) {
      alert(error.response?.data?.message || 'Error signing up');  // Show error message
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="user_id" placeholder="User ID" onChange={handleChange} required />
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="text" name="dietary_preferences" placeholder="Dietary Preferences" onChange={handleChange} />
        <input type="text" name="health_goals" placeholder="Health Goals" onChange={handleChange} />
        <input type="text" name="allergy_info" placeholder="Allergy Info" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
