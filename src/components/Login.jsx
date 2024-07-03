import React, { useState, useContext, useEffect } from 'react';
import UserContext from "../utils/UserContext";
import "../styles/Login.css";
import { Link, useNavigate } from 'react-router-dom';
import SigninWithGoogle from './signinwithgoogle';

const Login = ({ setLoggedInUser }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const { setuserName } = useContext(UserContext);
  const navigate = useNavigate();
  
  const API_URL = "http://localhost:5000/";

  const fetchUser = async () => {
    try {
      const response = await fetch(API_URL + "users");
      
      const data = await response.json();
      console.log("idiVacheydata",data)
      setUsers(data);
      console.log("idi kuda",users)
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  },[]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setuserName && setuserName(e.target.value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setuserName && setuserName(user.name);
      setLoggedInUser(user)
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button id='Login' type="submit">Login</button>
        <div className="form-group">
          <label htmlFor="signup">Don't have an account?</label>
          <Link to="/signup">Signup</Link>
        </div>
      </form>
      <SigninWithGoogle setLoggedInUser={setLoggedInUser}/>
    </div>
  );
};

export default Login;
