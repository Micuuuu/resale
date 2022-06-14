import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect,  } from "react";

import { ReactComponent as ProfileFollowers } from "../../assets/profile-followers.svg";
import { ReactComponent as ProfileShirt } from "../../assets/profile-shirt.svg";
import { Link } from "react-router-dom";

import ProductCard from "../product-card/product-card.component";

import { selectUserDataMapById } from "../../store/user-data/user-data.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectAllProducts } from "../../store/categories/category.selector";

import "./profile-page-info.styles.scss";
const ProfileInfo = ({ page }) => {
  const { id } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const allProducts = useSelector(selectAllProducts);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    var newArray = allProducts.filter((el)=>{
        return el.owner.uid === id
    } )
    setProducts(newArray)

    const numAscending = [...newArray].sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
  }, [id, allProducts]);
  const userDataMapById = useSelector(selectUserDataMapById);
  return (
    
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
      {page === "dressing" ? (
        <div className="page-selector dressing">
          <button className="dressing-button">Dressing</button>
          <Link to={`/profile/${id}/sold`}>
            <button className="sold-items">Sold Items</button>
          </Link>
        </div>
      ) : (
        <div className="page-selector sold">
          <Link to={`/profile/${id}/dressing`}>
            <button className="dressing-button">Dressing</button>
          </Link>
          <button className="sold-items">Sold Items</button>
        </div>
      )}


      {page === "dressing" ? (
        <div className="dressing-items-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} products={product} title = {product.category} />
          ))}
      </div>
      ) : (
        <div>
            No items sold yet
            </div>
      )}
    </div>
  );
};

export default ProfileInfo;
