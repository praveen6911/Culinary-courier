import React, { useContext } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import UserContext from "../utils/UserContext";
import { useNavigate } from 'react-router-dom';

const SigninWithGoogle = ({ setLoggedInUser }) => {
  const { setuserName } = useContext(UserContext);
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/";

  const handlesubmit = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const response = await fetch(API_URL + "google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, name: user.displayName }),
      });

      const data = await response.json();
      setLoggedInUser(data);
      setuserName && setuserName(data.username);
      toast.success("Signed in successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in with Google");
    }
  };

  return (
    <div> 
      <p style={{ textAlign: "center", margin: "10px 0" }}>---or continue with---</p>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
        <button 
          id="google-signin-button" 
          onClick={handlesubmit}
          style={{
            backgroundColor: "white",
            color: "#4285F4",
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
          }}
        >
          <img 
            src="https://img.icons8.com/color/48/000000/google-logo.png" 
            alt="Google" 
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SigninWithGoogle;
