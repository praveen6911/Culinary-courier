import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProducts = ({seller}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const API_URL = 'http://localhost:5000';

  useEffect(() => {
    // Load seller profile data into form
    if (seller) {
      console.log(seller)
    } else {
      console.log("Failed to load profile data.");
    }
  }, [seller]);
  console.log("ithanu kuda seller",seller)
  console.log("ithanu id",seller._id)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL+'/addProduct', { name, description, price,sellerId: seller._id  });
      navigate('/SellerProducts');
      console.log('Product added:', response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
 

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProducts;
