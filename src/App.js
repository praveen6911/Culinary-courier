import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/Header";
import Body from "./components/Body";
import AboutPage from "./components/AboutPage";
import ContactUs from "./components/ContactUs";
import Error from "./components/Error";
import Footer from "./components/Footer";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import Login from "./components/Login";
import appStore from "./store/appStore";
import Cart from "./components/Cart";
import Signup from "./components/Signup";
import SellerSignup from "./components/seller/SellerSignup";
import SellerLogin from "./components/seller/SellerLogin";
import "./App.css";
import SellerDashboard from "./components/seller/SellerDashboard";
import SellerProducts from "./components/seller/SellerProducts";
import SellerOrders from "./components/seller/SellerOrders";
import SellerProfile from "./components/seller/SellerProfile";
import SellerEditProfile from "./components/seller/SellerEditProfile";
import SigninWithGoogle from "./components/signinwithgoogle";
import UserProfile from "./components/UserProfile";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserEditProfile from "./components/UserEditProfile";

const Grocery = lazy(() => import("./components/grocery"));
const AppLayout = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedinSeller, setLoggedinSeller] = useState(null);
  const [showsellerlogin, setshowsellerlogin] = useState();
  const [showLogin, setShowLogin] = useState();
  const location = useLocation();

  useEffect(() => {
    setShowLogin(loggedInUser === null);
  }, [loggedInUser]);

  useEffect(() => {
    setshowsellerlogin(loggedinSeller === null);
  }, [loggedinSeller]);

  console.log("loggedinSeller", loggedinSeller);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <div className="App">
          { location.pathname !== "/SellerSignup" &&
            location.pathname !== "/SellerLogin" &&
            location.pathname !== "/SellerDashboard" &&
            location.pathname !== "/SellerProducts" &&
            location.pathname !== "/SellerOrders" &&
            location.pathname !== "/SellerProfile" && 
            location.pathname !== "/SellerSignup" && location.pathname !== "/SellerEditProfile" &&(
              <Header user={loggedInUser} setLoggedInUser={setLoggedInUser} />
            )}
          {showLogin && location.pathname !== "/signup" ? (

            <Login setLoggedInUser={setLoggedInUser} />

          ) : (
            <Routes>
              <Route path="/" element={<Body />} />
              <Route path="/aboutus" element={<AboutPage />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/Sellersignup" element={<SellerSignup />} />
              <Route path="/UserProfile" element={<UserProfile user={loggedInUser} />} />
              <Route path="/editUserProfile" element={<UserEditProfile user={loggedInUser} setLoggedInUser={setLoggedInUser} />} />

              <Route
                path="/SellerLogin"
                element={<SellerLogin setLoggedinSeller={setLoggedinSeller} />}
              />
              <Route path="/SellerDashboard" element={<SellerDashboard />} />
              <Route path="/SellerProducts" element={<SellerProducts />} />
              <Route path="/SellerOrders" element={<SellerOrders />} />
              <Route
                path="/SellerProfile"
                element={<SellerProfile seller={loggedinSeller} />}
              />
              <Route path="/SellerEditProfile" element={<SellerEditProfile setLoggedinSeller={setLoggedinSeller} seller={loggedinSeller}  edit={true}/>} />

              <Route
                path="/grocery"
                element={
                  <Suspense fallback={<h1>Loading...</h1>}>
                    <Grocery />
                  </Suspense>
                }
              />
              <Route path="/restaurant/:resId" element={<RestaurantMenu />} />
            </Routes>
          )}
            
          <Footer />
          <ToastContainer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const router = createBrowserRouter([
  {
    path: "/*",
    element: <AppLayout />,
    errorElement: <Error />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
