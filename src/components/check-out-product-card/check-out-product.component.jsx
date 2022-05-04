import { useSelector, useDispatch } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import "./check-out-product.styles.scss";

const CheckOutProduct = ({items }) => {
  const { name, imageUrl, price, quantity } = items;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  return (
    <div className="checkout-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <span className="name">{name}</span>
      <div className="quantity">
        <div
          className="arrow"
          onClick={() => dispatch(removeItemFromCart(cartItems, items))}
        >
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div
          className="arrow"
          onClick={() => dispatch(addItemToCart(cartItems, items))}
        >
          &#10095;
        </div>
      </div>
      <span className="price">{`${price}$`}</span>
      <div
        className="remove-button"
        onClick={() => dispatch(clearItemFromCart(cartItems, items))}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckOutProduct;
