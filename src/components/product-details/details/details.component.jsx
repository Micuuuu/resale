import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import Button from "../../button/button.component";
import { Link } from "react-router-dom";

import { addItemToCart } from "../../../store/cart/cart.action";
import { Footer } from "antd/lib/layout/layout";
import { updateUserFollowersCount } from "../../../utils/firebase/firebase.utils";
import { updateUserFollowingList } from "../../../utils/firebase/firebase.utils";

const Details = ({ productsIdMap, userDataMap, userFollowersDataMap, cartItems, currentUser }) => {
  const { category, id } = useParams();
  const [product, setProduct] = useState(productsIdMap[id]);

  const { brand, color, createdAt, gender, imageUrl, itemDescription, material, name, owner, price, size } = product;

  const { email } = owner;
  const dispatch = useDispatch();

  const [currentUserFollowin, setCurrentUserFollowin] = useState(userFollowersDataMap[currentUser.email]);
  const [isFollowed, setIsFollowed] = useState(currentUserFollowin.includes(userDataMap[email].uid));

  useEffect(() => {
    setProduct(productsIdMap[id]);
  }, [id, productsIdMap]);
  useEffect(() => {
    setCurrentUserFollowin(userDataMap[currentUser.email].following);
    setIsFollowed(currentUserFollowin.includes(userDataMap[email].uid))
  }, [userFollowersDataMap,currentUser.email,currentUserFollowin,userDataMap, email]);

  const addProductToCart = () => {
    dispatch(addItemToCart(cartItems, productsIdMap[id],email, userDataMap));
  };

  const fireBaseTime = new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000);

  const followHandler = async () => {
    try {
      const updateUserFollowers = await updateUserFollowersCount(userDataMap[email].uid);
      console.log(updateUserFollowers);
      const updateUserFollowing = await updateUserFollowingList(currentUser.uid, userDataMap[email].uid);
      console.log(updateUserFollowing);
    } catch (error) {
      console.log(error);
    }
  };

  const date = fireBaseTime.toDateString();
  // const atTime = fireBaseTime.toLocaleTimeString();
  return (
    <div className="product-details-container">
      <div className="images-container">
        <img className="image-thumbnail" src={imageUrl} alt="" />
      </div>

      <div className="product-details">
        <div className="product-details-title">
          <h1>{name}</h1>
          <h1 className="price">${price}</h1>
        </div>
        <div className="product-details-size-favorite">
          <div className="size">
            <h3>Size:</h3>
            <div className="container">
              <span>{size}</span>
            </div>
          </div>
          <div className="favorites">add to favorite</div>
        </div>
        <div>
          <h3>Item Description</h3>
          <p>{itemDescription}</p>
        </div>

        <h3>Details</h3>
        <div className="product-more-details">
          <div>
            <div className="details">
              <h4>Material:</h4>
              <span>{material}</span>
            </div>
            <div className="details">
              <h4>Color:</h4>
              <span>{color}</span>
            </div>
            <div className="details">
              <h4>Brand:</h4>
              <span>{brand}</span>
            </div>
          </div>
          <div>
            <div className="details">
              <h4>Gender:</h4>
              <span>{gender}</span>
            </div>
            <div className="details">
              <h4>Posted at:</h4>
              <span>{date}</span>
            </div>
            <div className="details">
              <h4>Shipped from:</h4>
              <span>
                {userDataMap[email].shippingAddress.city}, jud. {userDataMap[email].shippingAddress.county}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>

      
       
            {currentUser.email === email ? (
              <div className="seller">
                <span>That product is yours</span>

                <Link to={`/shop/${category}/${id}/edit`}>
                  <Button type="button" buttonType="inverted">
                    Edit IT{" "}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="seller">
              <h2>Seller info</h2>
              <div className="seller-info-container">
              <div className="seller-info-image">
                <img src={userDataMap[email].photoURL} alt="" />
              </div>
              <div className="seller-info-details">
                <h3>{userDataMap[email].displayName}</h3>
              <div>
                <div className="followButton">{!isFollowed ? <span onClick={followHandler}>follow</span> : <span>followed</span>}</div>

                <Link to={`/profile/${userDataMap[email].uid}/dressing`}>See entire dressing</Link>
              </div>
              </div>
          </div>
          </div>
            )}
         
      

      <div className="product-button-details">
      {currentUser.email === email ? ( <Button type="button" buttonType="disabled"  onClick={addProductToCart}>
          Disabled
        </Button> ) : (
         

        <Button type="button" buttonType="cart"  onClick={addProductToCart}>
          Add to Cart
        </Button>
        )
       
        }
      </div>
     
    </div>
    
  );
};

export default Details;
