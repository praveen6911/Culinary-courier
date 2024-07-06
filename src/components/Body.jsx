import React, { useContext, useEffect, useState } from "react";
import RestaurantCard, { WithPromotedLabel } from "./RestaurantCard";
import LocalRestaurantCard from "./LocalRestaurantCard";
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
  const [localrestaurants, setlocalrestaurants] = useState([]);

  useEffect(() => {
    fetchData();
    fetchrestaurants();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(SWIGGY_API_URL);
      const data = await response.json();

      function checkJsonData(data) {
        for (let i = 0; i < data?.data?.cards.length; i++) {
          let checkData =
            data?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }
      const restaurants = checkJsonData(data);

      setOriginalList(restaurants);
      setFilteredList(restaurants);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchrestaurants = async () => {
    try {
      const response = await fetch("http://localhost:5000/sellers");
      const data = await response.json();

      setlocalrestaurants(data);
    } catch (error) {
      console.error("Error fetching the restaurants:", error);
    }
  };

  const IsPromoted = WithPromotedLabel(RestaurantCard);
  const isOnline = useOnlineStatus();
  if (!isOnline) {
    return <UserOffline />;
  }

  const handleSearch = () => {
    const filteredRestaurants = originalList.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filteredRestaurants.length === 0) {
      alert("No restaurant found");
      return;
    }

    setFilteredList(filteredRestaurants);
  };

  const handleFilterToggle = () => {
    if (filteredList.length === originalList.length) {
      const topRatedRestaurants = originalList.filter(
        (restaurant) => restaurant.info.avgRating > 4.2
      );
      setFilteredList(topRatedRestaurants);
    } else {
      setFilteredList(originalList);
    }
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
          {filteredList.length === originalList.length ? "Top Rated" : "Show All"}
        </button>
      </div>

      <div className="restaurant-container">
        {filteredList.map((restaurant) => {
          return (
            <Link
              to={"/restaurant/" + restaurant?.info?.id}
              key={restaurant?.info?.id}
              style={{
                textDecoration: 'none',
                color: 'inherit',
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
        <div><h2>Local Restaurants</h2></div>
      <div className="restaurant-container">
        {localrestaurants.map((restaurant) => {
          return (
            <Link to={"/restaurants/" + restaurant._id} key={restaurant._id} style={{
              textDecoration: 'none',
              color: 'inherit',
            }}>
            <LocalRestaurantCard
              key={restaurant._id}
              restaurantData={restaurant}
            />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
