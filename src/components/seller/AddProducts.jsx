import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../../firebase'; // Adjust the path as necessary

const AddProducts = ({ seller }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const API_URL = 'http://localhost:5000';

  useEffect(() => {
    // Load seller profile data into form
    if (seller) {
      console.log(seller);
    } else {
      console.log("Failed to load profile data.");
    }
  }, [seller]);

  const handleImageChange = async (event) => {
    const image = event.target.files[0];
    if (image) {
      try {
        setUploading(true);
        const storage = getStorage(app);
        const storageRef = ref(storage, "product-images/" + image.name);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        setUploading(false);
        setImageUrl(url);
        setImage(url); // Set the image URL to the state
      } catch (error) {
        console.error(error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/addProduct`, {
        name,
        description,
        price,
        image: imageUrl,
        sellerId: seller._id,
      });
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
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" onChange={handleImageChange} required />
        <button disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {imageUrl && <img src={imageUrl} alt="Product" style={{ width: '100px', height: '100px' }} />}
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProducts;
