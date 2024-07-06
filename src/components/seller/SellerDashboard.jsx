import React, { useState, useEffect } from 'react';
import SellerOrders from './SellerOrders';
import { useNavigate } from 'react-router-dom';
import '../seller/styles/SellerDashboard.css';
import SellerHeader from './SellerHeader';

const SellerDashboard = ({ seller }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const filteredProducts = data.filter(product => product.sellerId === seller._id);
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [seller]);

  const handleViewAll = () => {
    navigate('/SellerProducts');
  };

  return (
    <div className="seller-dashboard">
      <SellerHeader />
      <h1>Seller Dashboard</h1>
      <div className="dashboard-sections">
        <SellerOrders />
        <div className="products-section">
          <h2>Products</h2>
          <ul>
            {products.slice(0, 2).map(product => (
              <li key={product._id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                {product.image && <img src={product.image} alt={product.name} />}
                <p>Seller: {product.sellerId}</p>
              </li>
            ))}
          </ul>
          <button onClick={handleViewAll}>View All</button>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
