import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../styles/userEditProfile.module.css"; // Create a CSS file for styling

const UserEditProfile = ({ setLoggedinUser, user }) => {
  const [profileData, setProfileData] = useState({});
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/";

  useEffect(() => {
    // Load user profile data into form
    if (user) {
      setProfileData({
        username: user.username,
        email: user.email,
        password: user.password,
      });
    } else {
      toast.error("Failed to load profile data.");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL + `update-User/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("Updated user:", updatedUser); // Log the updated user data
        setLoggedinUser(updatedUser); // Update logged-in user state with the updated data
        toast.success("Profile updated successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/UserProfile"); // Redirect to profile page after saving
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile.");
      navigate("/UserProfile");
    }
  };

  return (
    <div>
      <div className="edit-user-profile">
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
            Password:
            <input
              type="password"
              name="password"
              value={profileData.password || ""}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default UserEditProfile;
