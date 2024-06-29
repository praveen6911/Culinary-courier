import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../seller/styles/EditSellerProfile.css"; // Create a CSS file for styling
import SellerHeader from "./SellerHeader";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../../firebase";

const EditSellerProfile = ({ setLoggedinSeller, seller }) => {
  const [profileData, setProfileData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/";

  useEffect(() => {
    // Load seller profile data into form
    if (seller) {
      setProfileData({
        username: seller.username,
        email: seller.email,
        restaurant: seller.restaurant,
        address: seller.address,
        phone: seller.phone,
        image: seller.image,
        description: seller.description,
        password: seller.password,
      });
      setImageUrl(seller.image); // Set initial image URL
    } else {
      toast.error("Failed to load profile data.");
    }
  }, [seller]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

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
        setImageUrl(url); // Update image URL state
        setProfileData({
          ...profileData,
          image: url, // Update profileData with the new image URL
        });
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
      const response = await fetch(API_URL + `update-Seller/${seller._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });
      if (response.ok) {
        const updatedSeller = await response.json(); // Fetch updated seller data from response
        setLoggedinSeller(updatedSeller); // Update logged-in seller state with the updated data
        toast.success("Profile updated successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/SellerProfile"); // Redirect to profile page after saving
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div>
      <SellerHeader />
      <div className="edit-seller-profile">
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit} className="profile-form">
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={profileData.username || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profileData.email || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Restaurant:
            <input
              type="text"
              name="restaurant"
              value={profileData.restaurant || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={profileData.address || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={profileData.phone || ""}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
          />
          <button disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
         
          <label>
            Description:
            <textarea
              name="description"
              value={profileData.description || ""}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditSellerProfile;
  