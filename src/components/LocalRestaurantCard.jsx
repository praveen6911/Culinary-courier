import React from 'react';
import '../styles/Body.css';

const LocalRestaurantCard = (props) => {
  const { restaurantData } = props;
  const { restaurant, cuisines,image ,costForTwo,rating} = restaurantData;
  console.log("idi okati ",restaurantData)
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
        src= {image}
        alt="restaurant-logo" 
      />
      <h3 className="restaurant-details" style={{ fontSize: 20 , color: 'black' }}>{restaurant}</h3>
      <h4 className='rating' >{renderStars(rating)}</h4>
      <h4 className="restaurant-details"> {costForTwo} for two</h4>


      <h4 className="restaurant-details">{cuisines}</h4>
    </div>
  );
};

export default LocalRestaurantCard;
