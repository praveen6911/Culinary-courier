import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SellerHeader from './SellerHeader';
import { toast } from 'react-toastify';
import "../seller/styles/SellerLogin.css" 
import { LOGO_URL } from '../../utils/constants';


function SellerLogin({ setLoggedinSeller }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/";

  const fetchSellers = async () => {
    try {
      const response = await fetch(API_URL + "sellers");
      const data = await response.json();
      console.log(data);
      setSellers(data);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Fetched sellers:", sellers);
    const seller = sellers.find(u => u.email === email && u.password === password);
    console.log("Found seller:", seller);
    if (seller) {
      setLoggedinSeller(seller);
      navigate("/SellerDashboard");
      toast.success('Logged in successfully!');
    } else {
      setError("Invalid email or password");
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <Link to="/" className="logo">
            <img src={LOGO_URL} alt="Logo" />
          </Link>
      <h1>Welcome Seller</h1>
      <p>Please log in to continue</p>
      <h2>Seller Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
        <div className="form-group">
          <label htmlFor="signup">Don't have an account?</label>
          <Link to="/SellerSignup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default SellerLogin;
