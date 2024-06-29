import React, { useState, useEffect } from 'react';
import '../seller/styles/SellerProfile.css';
import SellerHeader from './SellerHeader';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const SellerProfile = ({ seller }) => {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    if (seller) {
      setProfileData({
        name: seller.username,
        email: seller.email,
        restaurant: seller.restaurant,
        address: seller.address,
        phone: seller.phone,
        image: seller.image,
        description: seller.description
      });
      toast.success('Profile data loaded successfully!');
    } else {
      toast.error('Failed to load profile data.');
    }
  }, [seller]); // Update when seller prop changes
  console.log("image",profileData.image)
  return (
    <div>
      <SellerHeader />
      <div className="seller-profile">
        <h1>Seller Profile</h1>
        <div className="profile-info">
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Restaurant:</strong> {profileData.restaurant}</p>
          <p><strong>Address:</strong> {profileData.address}</p>
          <p><strong>Phone:</strong> {profileData.phone}</p>
          <p>Image: <img src={seller.image} alt="Profile" id='profileimage' /></p>
          <p><strong>Description:</strong> {profileData.description}</p>
          <Link to="/SellerEditProfile"><button>Edit Profile</button></Link>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
