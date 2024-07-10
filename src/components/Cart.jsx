import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../styles/Cart.css"; // Make sure to import the CSS file

const Cart = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

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

  const handleAddQuantity = async (item) => {
    try {
      const response = await fetch(`http://localhost:5000/cart/increase-quantity/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const updatedItem = await response.json();
      setCartItems(cartItems.map(cartItem => cartItem._id === item._id ? updatedItem : cartItem));
    } catch (error) {
      console.error("Failed to increase item quantity:", error.message);
    }
  };

  const handleRemoveQuantity = async (item) => {
    try {
      if (item.quantity > 1) {
        const response = await fetch(`http://localhost:5000/cart/decrease-quantity/${item._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const updatedItem = await response.json();
        setCartItems(cartItems.map(cartItem => cartItem._id === item._id ? updatedItem : cartItem));
      }
    } catch (error) {
      console.error("Failed to decrease item quantity:", error.message);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <div>
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h3 className="cart-item-title">{item.name}</h3>
              <p className="cart-item-price">{item.price / 100 || item.defaultPrice / 100}</p>
              <div className="cart-item-quantity">
                <button className="quantity-btn" onClick={() => handleRemoveQuantity(item)}>-</button>
                <span className="cart-item-quantity-number">{item.quantity}</span>
                <button className="quantity-btn" onClick={() => handleAddQuantity(item)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
     {/*  <div className="cart-summary">
        <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>Clear Cart</button>
        {cartItems.map(item => (
          <button key={item._id} className="remove-item-btn" onClick={() => dispatch(removeItem(item._id))}>Remove Item</button>
        ))}
      </div> */}
    </div>
  );
};

export default Cart;
