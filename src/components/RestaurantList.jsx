import React, { useEffect, useState } from "react";
import axios from "axios";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/restaurants");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching the restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div>
      <h1>Restaurant List</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant._id}>{restaurant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
