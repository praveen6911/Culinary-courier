import React, { useContext, useEffect } from "react";
import RestaurantCard, { WithPromotedLabel } from "./RestaurantCard";
import { useState } from "react";
import { SWIGGY_API_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../components/hooks/useOnlineStatus";
import UserOffline from "./UserOffline";
import "../styles/Body.css";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [originalList, setOriginalList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { loggedInUser, setuserName } = useContext(UserContext);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(SWIGGY_API_URL);
      const data = await response.json();
    
      function checkJsonData(data) {
        for (let i = 0; i < data?.data?.cards.length; i++) {
          // initialize checkData for Swiggy Restaurant data
          let checkData =
            data?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;
              console.log("idi card number",i, data?.data?.cards[i])
          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }
      const restaurants = checkJsonData(data);
      
      // console.log(restaurants);
      //storing all the restuarants in originalList
      setOriginalList(restaurants);
      //storing all the restuarants in filteredList
      console.log(restaurants);
      setFilteredList(restaurants);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const IsPromoted = WithPromotedLabel(RestaurantCard);
  const isOnline = useOnlineStatus();
  if (!isOnline) {
    return <UserOffline />;
  }
  const handleSearch = () => {
    //filtering the originalList based on searchText
    const filteredRestaurants = originalList.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
    );

    //if filteredRestaurants is empty then show alert
    if (filteredRestaurants.length === 0) {
      alert("No restaurant found");
      return;
    }

    //updating the filteredList from original list to the filtered list
    setFilteredList(filteredRestaurants);
  };

  const handleFilterToggle = () => {
    //checking the length of filtered list with original list a
    if (filteredList.length === originalList.length) {
      const topRatedRestaurants = originalList.filter(
        (restaurant) => restaurant.info.avgRating > 4.2
      );
      setFilteredList(topRatedRestaurants);
    } else {
      setFilteredList(originalList);
    }
    console.log(filteredList.length, originalList.length);
  };

  return isLoading ? (
    <Shimmer />
  ) : (
    <div className="body">
      
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-input"
            placeholder="Search for restaurant"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <button className="filter-btn" onClick={handleFilterToggle}>
          {filteredList.length === originalList.length
            ? "Top Rated"
            : "Show All"}
        </button>
      </div>
     

      <div className="restaurant-container">
        {/* mapping the filteredList ( condition is if it is not filtered then the filteredlist will be equal to original list ) with RestaurantCard component */}
        {filteredList.map((restaurant) => {
          return (
            <Link 
              to={"/restaurant/" + restaurant?.info?.id}
              key={restaurant?.info?.id}
              style={{
                textDecoration: 'none', // Remove underline
                color: 'inherit',       // Inherit text color
                // Add other styles as needed
              }}
            >
              {restaurant?.info?.veg ? (
                <IsPromoted restaurantData={restaurant} />
              ) : (
                <RestaurantCard
                  key={restaurant.info.id}
                  restaurantData={restaurant}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
