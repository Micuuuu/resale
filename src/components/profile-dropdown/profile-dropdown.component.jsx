import React from "react";
import { ReactComponent as Avatar } from "../../assets/avatar.svg";
import { ReactComponent as Profile } from "../../assets/profile.svg";
import { ReactComponent as SignOut } from "../../assets/sign-out.svg";
import { ReactComponent as Dressing } from "../../assets/dressing-shirt.svg";
import { ReactComponent as Heart } from "../../assets/heart.svg";
import { ReactComponent as Settings } from "../../assets/settings.svg";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignOutUser } from "../../utils/firebase/firebase.utils";

import { setIsProfileDropdownOpen } from "../../store/profile/profile.action";
import { selectIsProfileDropdownOpen } from "../../store/profile/profile.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectUserDataMap } from "../../store/user-data/user-data.selector";
import "./profile-dropdown.styles.scss";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const isProfileDropdownOpen = useSelector(selectIsProfileDropdownOpen);
  const currentUser = useSelector(selectCurrentUser);
  const userDataMap = useSelector(selectUserDataMap);

  const SignOutToggle = () => {
    dispatch(setIsProfileDropdownOpen(!isProfileDropdownOpen));
    SignOutUser();
  };

  const onClickHandler = (e) => {
    
    dispatch(setIsProfileDropdownOpen(false));
  };

  return (
    <div className="profile-dropdown-container">
      {/* <Link
        to={`/my-profile/${userDataMap[currentUser.email].uid}/dressing`}
        onClick={onClickHandler}
        className="profile-container"
      >
        <img
          src={userDataMap[currentUser.email].photoURL}
          alt="Avatar"
          className="avatar"
        />
        <span className="avatar-name">{`${
          userDataMap[currentUser.email].displayName
        }`}</span>
      </Link>

      <div className="profile-dropdown-menu">
        <Link
          to={`/my-profile/${userDataMap[currentUser.email].uid}/dressing`}
          className="profile-link-container"
          onClick={onClickHandler}
        >
          <Dressing className="sign" />
          <p className="text"> MyDressing </p>
        </Link>

        <Link
          to={`/my-profile/${userDataMap[currentUser.email].uid}/settings`}
          className="profile-link-container"
          onClick={onClickHandler}
        >
          <Settings className="sign" />
          <p className="text"> Settings </p>
        </Link>
      </div>
 */}
      <Link
        to="/"
        onClick={SignOutToggle}
        className="profile-signout-link-container"
      >
        <button className="signout-button">
          <SignOut className="signout-sign" />
          <p className="signout-text">SignOut</p>
        </button>
      </Link>
    </div>
  );
};

export default ProfileDropdown;
