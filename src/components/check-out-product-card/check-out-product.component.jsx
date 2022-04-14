import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

import "./check-out-product.styles.scss";

const CheckOutProduct = ({ key, items }) => {
  const { name, imageUrl, price, quantity } = items;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);
  return (
    <div className="checkout-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <span className="name">{name}</span>
      <div className="quantity">
        <div className="arrow" onClick={() => removeItemFromCart(items)}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div   className="arrow" onClick={() => addItemToCart(items)}>&#10095;</div>
      </div>
      <span className="price">{`${price}$`}</span>
      <div className='remove-button' onClick={() => clearItemFromCart(items)}>&#10005;</div>
    </div>
  );
};

export default CheckOutProduct;
