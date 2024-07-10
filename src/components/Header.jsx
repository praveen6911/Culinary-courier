import { LOGO_URL } from "../utils/constants";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import useOnlineStatus from "./hooks/useOnlineStatus";
import "../styles/Header.css";
// import  UserContext  from "../utils/UserContext";
import { useSelector } from "react-redux";

  

const Header = ({ user ,setLoggedInUser , }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [cartItems, setCartItems] = useState([]);


  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/carts");
      const data = await response.json();
      const filteredCartItems = data.filter((item) => item.userId === user._id);
      setCartItems(filteredCartItems);
    } catch (error) {
      console.log(error);
    }
  };
  // const onlineStatus = useOnlineStatus();
  // const username=useContext(UserContext);
  const navigate = useNavigate();
  // const cartItems=useSelector((store)=>{
  //  return store.cart.items
  // })


 
  
  const handleLoginLogout = () => {
    if (user) {
      setLoggedInUser(null); // Log out the user
      setIsLoggedin(false);  // Update the state to indicate the user is logged out
      navigate("/");         // Redirect to the home page
    } else {
      setIsLoggedin(true);   // Update the state to indicate the user is logging in
      navigate("/login");    // Redirect to the login page
    }
  };
  
  

  // console.log("praveen",user) 
 

  
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="Logo" />
      </div>
      <div className="navitems">
        <ul>
        {/* <li id="username">Welcome 👋{username.loggedInUser}</li> */}
          {/* <li>{onlineStatus?"🟢":"🔴"}</li> */}
          <li><Link to={"/"} className="header-link">Home</Link></li>
          <li><Link to={"/aboutus"} className="header-link">About Us</Link></li>
          {<li > <Link to={"/contactus" } className="header-link">Contact Us</Link></li>}
          <li><Link to={"/cart"} className="header-link">Cart-</Link></li>
          <li > <Link to={"/SellerLogin"} className="header-link">Seller</Link></li>
          <li><Link to={"/UserProfile"} className="header-link">Profile</Link></li>
          
            <button
              className="login-button"
              id="login-button"
              onClick={handleLoginLogout}
            >
              {(user) ?  "Logout" : "Login"}
            </button>
            
         
         
        </ul>
      </div>
    </div>
  );
};

export default Header;
