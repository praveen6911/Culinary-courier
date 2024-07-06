import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserProfile.css'; // Import your CSS file

const UserProfile = ({ user }) => {
  console.log("user", user);
  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Password:</strong> {user.password}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <Link to="/editUserProfile"><button>Edit Profile</button></Link>
    </div>
  );
};

export default UserProfile;
