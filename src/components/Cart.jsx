import React from "react";
import { useSelector } from "react-redux";
import { clearCart, removeItem } from "../store/slices/cartSlice";
import { useDispatch } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
    const dispatch=useDispatch();
  return (
    <div>
      <h1>Cart</h1>
      <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.price/100||item.defaultPrice/100}</p>
          </div>
        ))}
      </div>
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
      <button onClick={() => dispatch(removeItem())}>Remove Item</button>
   
   

    </div>
  );
};

export default Cart;
