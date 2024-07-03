import React, { useState, useEffect } from 'react';
import SellerHeader from './SellerHeader';
import { Link } from 'react-router-dom';

const SellerProducts = ({ seller }) => {
  const [products, setProducts] = useState([]);
  const[sellerproducts,setsellerproducts]=useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products'); // Adjust URL as needed
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const filteredProducts = data.filter(product => product.sellerId === seller._id)
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
   



  return (
    <div className="seller-products">
      <SellerHeader />
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Seller: {product.sellerId}</p>
          </li>
        ))}
      </ul>
      <Link to="/addProduct"><button>Add Product</button></Link>
    </div>
  );
};

export default SellerProducts;
