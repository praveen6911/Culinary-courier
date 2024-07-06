import React from 'react';
import { CDN_URL } from '../utils/constants';
import '../styles/Body.css';

const RestaurantCard = (props) => {
  const { restaurantData } = props;
  const { name, cuisines, avgRating, costForTwo, cloudinaryImageId } = restaurantData.info;

  // Function to generate stars based on the average rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>&#9733;</span>); // Unicode for a filled star
    }

    if (halfStar) {
      stars.push(<span key={fullStars}>&#9734;</span>); // Unicode for a half star (or use an appropriate character or icon)
    }

    return stars;
  };

  return (
    <div className="restaurant-card">
      <img
        className="restaurant-logo"
        src={CDN_URL + cloudinaryImageId}
        alt="restaurant-logo" 
      />
      <h3 className="restaurant-details" style={{ fontSize: 20 , color: 'black' }}>{name}</h3>

      <h4 className='rating' >{renderStars(avgRating)}</h4>
      <h4 className="restaurant-details" style={{ marginBottom: "15px" }}>{costForTwo}</h4>
      <h4 className="restaurant-details" style={{ marginTop: "15px" }}>{cuisines.join(", ")}</h4>
    </div>
  );
};

export const WithPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <div className="promoted-label">Promoted</div>
        <RestaurantCard {...props}/>
      </div>
    );
  };
};

export default RestaurantCard;
