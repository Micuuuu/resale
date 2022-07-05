import React from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  /* console.log(cartItems) */
  const dispatch = useDispatch()
  const  isCartOpen  = useSelector(selectIsCartOpen);
  
  const handleClosingProfileDropdown = (e) => {
    if (e.target.id === "profile-wrapper") {
      dispatch(setIsCartOpen(!isCartOpen));
    }
  };
  return (
    <div className="profile-dropdown-container-wrapper" id="profile-wrapper" onClick={(e) => handleClosingProfileDropdown(e)}>
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Link to="/checkout">
        {" "}
        <Button buttonType={"inverted"}> GO TO CHECKOUT </Button>{" "}
      </Link>
    </div>
    </div>
  );
};

export default CartDropdown;
