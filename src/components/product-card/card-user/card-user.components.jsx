import { Link } from "react-router-dom";
import Loading from "../../Loading/loading.component";
import Button from "../../button/button.component";
import { selectFollowersData } from "../../../store/user-data/user-data.selector";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { updateUserFollowersCount } from "../../../utils/firebase/firebase.utils";
import { updateUserFollowingList } from "../../../utils/firebase/firebase.utils";

import "./card-user.styles.scss";
const CardUser = ({ products, title, currentUser, userDataMap }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { name, price, imageUrl, id, owner } = products;
  const { email } = products.owner;
  const userFollowersDataMap = useSelector(selectFollowersData);

  const [currentUserFollowin, setCurrentUserFollowin] = useState(userFollowersDataMap[currentUser.email]);

  const [isFollowed, setIsFollowed] = useState(currentUserFollowin.includes(userDataMap[email].uid));

  useEffect(() => {
    setCurrentUserFollowin(userDataMap[currentUser.email].following);
    setIsFollowed(currentUserFollowin.includes(userDataMap[email].uid));
  }, [userFollowersDataMap, currentUser, currentUserFollowin, email, userDataMap]);

  const followHandler = async () => {
    setIsLoading(true);
    try {
      const updateUserFollowers = await updateUserFollowersCount(userDataMap[email].uid);
      const updateUserFollowing = await updateUserFollowingList(currentUser.uid, userDataMap[email].uid);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return currentUser ? (
    <div className="product-card-container">
      {isLoading ? (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        ""
      )}
      <Link to={`/shop/${title}/${id}/details`}>
        <div className="product-card-image-container">
          <img className="product-card-image" src={imageUrl} alt={`${name}`} />
        </div>
      </Link>
      {currentUser.email === email ? (
        <div>
          <span>That product is yours</span>

          <Link to={`/shop/${title}/${id}/edit`}>
            <Button type="button" buttonType="inverted">
              Edit IT{" "}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="seller-info-container">
          <img className="seller-info-image" src={userDataMap[email].photoURL} alt="" />

          <div className="seller-info-details">
            <h3>{userDataMap[email].displayName}</h3>
            <div className="buttons">
              <div className="followButton">
                {!isFollowed ? (
                  <span className="notfollowed" onClick={followHandler}>
                    follow
                  </span>
                ) : (
                  <span>followed</span>
                )}
              </div>
              <div className="dressingButton">
                <Link to={`/profile/${userDataMap[email].uid}/dressing`}>See entire dressing</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
    </div>
  ) : (
    <div className="product-card-container">
      <Loading />
    </div>
  );
};

export default CardUser;
