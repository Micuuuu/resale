import { useSelector, useDispatch } from "react-redux";
import {
  
  clearItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import "./check-out-product.styles.scss";
import {ReactComponent as RemoveClosedIcon} from '../../assets/closed-trash.svg';
import {ReactComponent as RemoveOpenIcon} from '../../assets/open-trash.svg';

const CheckOutProduct = ({items }) => {
  const { name, imageUrl, price } = items;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  return (
    <div className="checkout-item-container">
      <div className = "checkout-item-image-container" >
      <img className="checkout-item-image" src={imageUrl} alt={`${name}`} />
      </div>
      
      <span className="name">{name}</span>
      <div className="quantity">
       
        <span className="value">M</span>
        
      </div>
      <span className="price">{`$${price}`}</span>
      <div
        className="remove-button-container"
        onClick={() => dispatch(clearItemFromCart(cartItems, items))}
      >
        <RemoveClosedIcon className="remove-closed-button"/>
        <RemoveOpenIcon className="remove-open-button"/>

      </div>
    </div>
  );
};

export default CheckOutProduct;
