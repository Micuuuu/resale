import { useState } from "react";
import SigninPopup from "../../signin-popup/signin-popup.component";
import "./card-no-user.styles.scss"



const CardNoUser = ({ products, title, currentUser, userDataMap }) => {
  const { name, price, imageUrl } = products;
  const { email } = products.owner;
  console.log(products.owner)

  const [showPopup, setShowPopup] = useState(false);
  const [pageName, setPageName] = useState("");
  const openSigninPopup = (e) => {
    if (!currentUser) {
      console.log(e.currentTarget);
      setPageName(e.currentTarget.id)
      e.preventDefault();
      setShowPopup(true);
    }
  };

  return (
    <div className="product-card-container">
      
        <div className="product-card-image-container" id="Product Details" onClick={(e) => openSigninPopup(e)}>
          <img className="product-card-image" src={imageUrl} alt={`${name}`} />
        </div>
      

      <div className="seller-info-container" id="User Profile" onClick={(e) => openSigninPopup(e)}>
        <img
          className="seller-info-image"
          src={userDataMap[email].photoURL}
          alt=""
        />

        <div className="seller-info-details">
          <h3>{userDataMap[email].displayName}</h3>
        </div>
      </div>

      <div className="footer" id="Product Details" onClick={(e) => openSigninPopup(e)}>
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      {showPopup && <SigninPopup setShowPopup={setShowPopup} pageName = {pageName} />}

    </div>
    
  );
};


export default CardNoUser