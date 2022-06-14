import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import Button from "../button/button.component";
import { selectCartItems } from "../../store/cart/cart.selector";
import { selectUserDataMap } from "../../store/user-data/user-data.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import {  Link } from "react-router-dom";

import "./product-card.styles.scss";

const ProductCard = ({ products, title }) => {
  const { name, price, imageUrl, id } = products;
  const { email } = products.owner;
  const userDataMap = useSelector(selectUserDataMap);

  return (
    <div className="product-card-container">
        <Link   to = {`/shop/${title}/${id}/details`}>
        
        <div className="product-card-image-container" >
          <img className="product-card-image" src={imageUrl} alt={`${name}`} />
        </div>
      </Link>

      
        <div className="seller-info-container">
            
            <img className="seller-info-image" src={userDataMap[email].photoURL} alt="" />
            
            <div className="seller-info-details">
                <h3>{userDataMap[email].displayName}</h3>
                <div className="followButton">
                    <span>follow</span>
                </div>
            </div>
        </div>

      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
