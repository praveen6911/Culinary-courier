import React, { useState, useEffect } from 'react';
import '../styles/Signup.css';
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/";

  const fetchUser = async () => {
    try {
      const response = await fetch(API_URL + "users");
      const data = await response.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error messages
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setError(null);

  

    // Client-side validations
    let isValid = true;

    if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters long');
      isValid = false;
    }

    if (!email.includes('@')) {
      setEmailError('Invalid email address');
      isValid = false;
    }
    const user= users.find(u => u.email === email);
    if (user) {
      setEmailError('Email already exists');
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    }
   
    if (!isValid) {
      return; // Exit early if any validation fails
    }


    try {
      const response = await fetch('http://localhost:5000/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      // Redirect to login page or any other route after successful signup
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {usernameError && <p className="error-message">{usernameError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Sign Up</button>
        <div className="form-group">
          <label htmlFor="signup">Already have an account?</label>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
