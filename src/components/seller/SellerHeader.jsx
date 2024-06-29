import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/SellerHeader.css';
import { LOGO_URL } from '../../utils/constants';
const SellerHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here, for example:
    // - Clear authentication tokens
    // - Clear user state
    // - Redirect to login page
    // This is just a placeholder logic
    localStorage.removeItem('sellerToken'); 
    navigate('/login');
  };

  return (
    <header className="seller-header">
      <div className="container" id='sellercontainer'>
        <div className="header-content">
          <Link to="/" className="logo">
            <img src={LOGO_URL} alt="Logo" />
          </Link>
          <nav className="nav-links">
            <Link to="/SellerDashboard">Dashboard</Link>
            <Link to="/SellerProfile">Profile</Link>
            <Link to="/SellerProducts">Products</Link>
            <Link to="/SellerOrders">Orders</Link>
          </nav>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default SellerHeader;
