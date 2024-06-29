import React from 'react';
import  UserContext  from '../utils/UserContext';
import { useContext } from 'react';
import '../styles/ContactUs.css'; // Import CSS file for styling

const ContactUs = () => {
  const username=useContext(UserContext);

  return (
    <div className="contact-us">
      <div className="container">
        <h1>Contact Us</h1>
        <p>
          We would love to hear from you! If you have any questions, comments, or feedback, please feel free to reach out to us.
        </p>
        <h1> 👋 {username.loggedInUser}</h1>
        <form className="contact-form">

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
