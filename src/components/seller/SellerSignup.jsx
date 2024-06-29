import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SellerHeader from './SellerHeader';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../../firebase";

const SellerSignup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/";

  const fetchSellers = async () => {
    try {
      const response = await fetch(API_URL + "sellers");
      const data = await response.json();
      setSellers(data);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleImageChange = async (event) => {
    const image = event.target.files[0];
    if (image) {
      try {
        setUploading(true);
        const storage = getStorage(app);
        const storageRef = ref(storage, "images/" + image.name);
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

    const existingSeller = sellers.find(seller => seller.email === email);
    if (existingSeller) {
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
      const response = await fetch(API_URL + 'create-seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, restaurant, address, phone, image: imageUrl, description, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      // Redirect to login page or any other route after successful signup
      navigate('/SellerLogin');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <SellerHeader />
      <div className="signup-container">
        <h2>Seller Sign Up</h2>
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
            <label htmlFor="restaurant">Restaurant:</label>
            <input
              type="text"
              id="restaurant"
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              required
            />
            <button disabled={uploading}>{uploading ? "Uploading..." : "Upload"}</button>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
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
            <Link to="/SellerLogin">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerSignup;
