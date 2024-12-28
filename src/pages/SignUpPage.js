import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './HomePage.css';
import axios from 'axios';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });
      alert('Sign up successful! Please sign in.');
    } catch (error) {
      alert('Error signing up: ' + error.response.data.message);
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="content">
        <h1>Create an Account</h1>
        <form className="login-form" onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="email ID"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
