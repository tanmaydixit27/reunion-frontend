import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      alert('Sign in successful!');
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        alert('Error signing in: ' + error.response.data.message);
      } else {
        alert('Error signing in: ' + error.message);
      }
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="content">
        <h1>Welcome to To-do app</h1>
        <form className="login-form" onSubmit={handleSignIn}>
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
          <button type="submit" className="login-button">Sign in to continue</button>
        </form>
        <div className="signup-option">
          <p>Don't have an account? <Link to="/SignUp">Sign up here</Link></p> {/* Link to sign-up page */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
