
import React from 'react';
import SellerOrders from './SellerOrders';
import SellerProducts from './SellerProducts';
import '../seller/styles/SellerDashboard.css';
import SellerHeader from './SellerHeader';

const SellerDashboard = () => {
  return (
    <div className="seller-dashboard">
        <SellerHeader/>
      <h1>Seller Dashboard</h1>
      <div className="dashboard-sections">
        <SellerOrders />
        <SellerProducts />
      </div>
    </div>
  );
};

export default SellerDashboard;
