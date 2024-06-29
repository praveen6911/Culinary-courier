import React from 'react'
import { Link } from 'react-router-dom';

const UserProfile = (user) => {
    console.log("user",user)
  return (
    <div>
       <h1>User Profile</h1>
      <p><strong>Name:</strong> {user.user.username}</p>
      <p><strong>Password:</strong> {user.user.password}</p>
      <p><strong>Email:</strong> {user.user.email}</p>

      <Link to="/editUserProfile"><button>Edit Profile</button></Link>

    </div>
  )
}

export default UserProfile
