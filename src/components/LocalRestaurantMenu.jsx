import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../styles/LocalRestaurantMenu.css"; // Import CSS file
import { MenuShimmer } from './Shimmer';

const LocalRestaurantMenu = () => {
  const { resId } = useParams();
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState({});

  useEffect(() => {
    const fetchLocalRestaurantMenu = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${resId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant menu');
        }
        const data = await response.json();
        setProducts(data);
        console.log("kothadhi",data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLocalRestaurantMenu();
  }, [resId]);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await fetch(`http://localhost:5000/sellers/${resId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch seller');
        }
        const data = await response.json();
        setSeller(data);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchSeller();
  }, [resId]);

  const handleAddItem = (item) => {
    // Logic to add item to cart or order
    console.log(`Added item: ${item.name}`);
  };

  return !products.length || !seller.restaurant ? (
    <MenuShimmer />
  ) : (
    <div className="restaurant-menu">
      <div className="restaurant-summary">
        <img
          className="restaurant-img"
          src={seller.image}
          alt={seller.restaurant}
        />
        <div className="restaurant-summary-details">
          <h2 className="restaurant-title">{seller?.restaurant}</h2>
          <p className="restaurant-tags">{seller?.cuisines}</p>
          <div className="restaurant-details">
            <div className="restaurant-rating">
              <i className="fa-solid fa-star"></i>
              <span>{seller?.rating}</span>
            </div>
            <div className="restaurant-rating-slash">|</div>
            <div>{seller?.rating}</div>
            <div className="restaurant-rating-slash">|</div>
            <div>{seller.costForTwo} for two</div>
          </div>
        </div>
      </div>

      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-title-wrap">
            <h3 className="menu-title">Recommended</h3>
            <p className="menu-count">{products.length} ITEMS</p>
          </div>
          <div className="menu-items-list">
            {products.map((item) => (
              <div className="menu-item" key={item?.id}>
                <div className="menu-item-details">
                  <h3 className="item-title">{item?.name}</h3>
                  <p className="item-cost">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>
                  <p className="item-desc">{item?.description}</p>
                </div>
                <div className="menu-img-wrapper">
                  {item?.image && (
                    <img
                      className="menu-item-img"
                      src={item.image} // Add the correct image source URL here
                      alt={item?.name}
                    />
                  )}
                  <button className="add-btn" onClick={() => handleAddItem(item)}>
                    ADD +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalRestaurantMenu;
