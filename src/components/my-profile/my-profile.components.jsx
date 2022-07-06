import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { ReactComponent as ProfileFollowers } from "../../assets/profile-followers.svg";
import { ReactComponent as ProfileShirt } from "../../assets/profile-shirt.svg";
import { Link } from "react-router-dom";

import ProductCard from "../product-card/product-card.component";

import { selectUserDataMapById } from "../../store/user-data/user-data.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectAllProducts } from "../../store/categories/category.selector";
import SoldItem from "../sold-item/sold-item.component";
import OrderItem from "../order-item/order-item.component";
import { selectSoldItemsData } from "../../store/user-data/user-data.selector";
import { selectOrdersData } from "../../store/user-data/user-data.selector";
import ProfileSettings from "../profile-settings/profile-settings.component";
import "./my-profile.styles.scss";
const MyProfileInfo = ({ page }) => {
  const { id } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const allProducts = useSelector(selectAllProducts);
  const [products, setProducts] = useState([]);
  const userSoldItemsById = useSelector(selectSoldItemsData);
  const userOrderItemsById = useSelector(selectOrdersData)
  useEffect(() => {
    var newArray = allProducts.filter((el) => {
      return el.owner.uid === id;
    });
    setProducts(newArray);

    
  }, [id, allProducts]);
  const userDataMapById = useSelector(selectUserDataMapById);
  return currentUser ? (
    currentUser.uid === id ? (
      <div className="profile-info-container">
        <img
          className="profile-info-image"
          src={userDataMapById[id].photoURL}
          alt="profile"
        />
        <h2 className="profile-info-name">
          {userDataMapById[id].displayName}'s profile
        </h2>

        <div className="profile-info-counters">
          <div className="profile-info-counter">
            <ProfileFollowers className="profile-info-counter-img follower" />
            <div className="profile-info-counter-text follower">followers</div>
            <span className="profile-info-counter-number follower-number">
              {userDataMapById[id].followersCount}
            </span>
          </div>
          <div className="profile-info-counter">
            <ProfileShirt className="profile-info-counter-img s-items" />
            <div className="profile-info-counter-text s-items">Sold Items</div>
            <span className="profile-info-counter-number items-number">
              {userDataMapById[id].soldItemsCount}
            </span>
          </div>
        </div>
        {/* //navigare meniuri */}
        <div>
          {(() => {
            if (page === "dressing") {
              return (
                
                  <div className="my-page-selector">
                  <button className="selected-button">Dressing</button>
                  <Link to={`/my-profile/${id}/to-ship`}>
                    <button className="unselected-button">toShip</button>
                  </Link>
                  <Link to={`/my-profile/${id}/orders`}>
                    <button className="unselected-button">orders</button>
                  </Link>
                  <Link to={`/my-profile/${id}/settings`}>
                    <button className="unselected-button">settings</button>
                  </Link>
                </div>

                
                
           
              );
            } else if (page === "to-shipp") {
              return (
                <div className="my-page-selector">
                  <Link to={`/my-profile/${id}/dressing`}>
                    <button className="unselected-button">Dressing</button>
                  </Link>
                  <button className="selected-button">toShip</button>
                  <Link to={`/my-profile/${id}/orders`}>
                    <button className="unselected-button">orders</button>
                  </Link>
                  <Link to={`/my-profile/${id}/settings`}>
                    <button className="unselected-button">settings</button>
                  </Link>
                </div>
              );
            } else if (page === "orders") {
              return (
                <div className="my-page-selector">
                  <Link to={`/my-profile/${id}/dressing`}>
                    <button className="unselected-button">Dressing</button>
                  </Link>
                  <Link to={`/my-profile/${id}/to-ship`}>
                    <button className="unselected-button">toShip</button>
                  </Link>

                  <button className="selected-button">orders</button>

                  <Link to={`/my-profile/${id}/settings`}>
                    <button className="unselected-button">settings</button>
                  </Link>
                </div>
              );
            } else if (page === "settings") {
              return (
              
                
                    <div className="my-page-selector">
                  <Link to={`/my-profile/${id}/dressing`}>
                    <button className="unselected-button">Dressing</button>
                  </Link>
                  <Link to={`/my-profile/${id}/to-ship`}>
                    <button className="unselected-button">toShip</button>
                  </Link>
                  <Link to={`/my-profile/${id}/orders`}>
                    <button className="unselected-button">orders</button>
                  </Link>

                  <button className="selected-button">settings</button>
                </div>
                
                  

                
              );
            }
          })()}
        </div>


        <div className="dressing-items-container">
          {(() => {
            if (page === "dressing") {
              return (
                
                <div className="dressing-items-container ">
                {products.length>0 ? (products.map((product) => (
                    <ProductCard
                      key={product.id}
                      products={product}
                      title={product.category}
                      currentUser = {currentUser}
                    />
                  ))) :
                  (
                    <div className="dressing-items-container ">
                    No more items in dressing
                  </div>
                  )
                  }
                </div>

               
                
           
              );
            } else if (page === "to-shipp") {
              return (
                
                userSoldItemsById[id].length > 0 ? (      
                
                  userSoldItemsById[id].map((item) => <SoldItem item = {item} />)
                 
               )
                : (
                 <div >
                   No items sold yet
                 </div>

                 
               )
              );
            } else if (page === "orders") {
              return (
                userOrderItemsById[id].length > 0 ? (      
                
                  userOrderItemsById[id].map((item) => <OrderItem item = {item} />)
                 
               )
                : (
                 <div >
                   No orders to receive yet
                 </div>

               )
              );
            } else if (page === "settings") {
              return (
              
                <ProfileSettings id={id} />
              );
            }
          })()}
        </div>
      </div>
    ) : (
      <h2>That s not your profile</h2>
    )
  ) : (
    <h2>you re not logged in</h2>
  );
};

export default MyProfileInfo;
