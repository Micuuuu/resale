import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";

import img from "../../assets/logo.png";
import { selectCurrentUser } from "../../store/user/user.selector";
//Cart Redux
import { selectIsCartOpen } from "../../store/cart/cart.selector";
//Profile icon  & redux
import { selectIsProfileDropdownOpen } from "../../store/profile/profile.selector";
import ProfileIcon from "../../components/profile-icon/profile-icon.component";
import ProfileDropdown from "../../components/profile-dropdown/profile-dropdown.component";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";
import SigninPopup from "../../components/signin-popup/signin-popup.component";
import { NavigationContainer, NavLink, NavLinksContainer1, NavLinksContainer2, LogoContainer } from "./navigation.styles.js";
import "./navigation.styles.scss";
import { getUserData } from "../../utils/firebase/firebase.utils";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/user-data/user-data.action";
const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const isProfileDropdownOpen = useSelector(selectIsProfileDropdownOpen);
  const [showPopup, setShowPopup] = useState(false);
  const [pageName, setPageName] = useState("");
  
  const openSigninPopup = (e) => {
    if (!currentUser) {
      setPageName(e.target.id)
      e.preventDefault();
      setShowPopup(true);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserDataMap = async () => {
      const userDataArray = await getUserData();
      console.log(userDataArray)
      dispatch(setUserData(userDataArray));
    };
    return getUserDataMap();
  }, [dispatch]);
  return (
    <Fragment>
      <NavigationContainer>
        <NavLinksContainer1>
          <NavLink id="Shop"  to="/shop">SHOP</NavLink>
          <NavLink id="Sell" onClick={(e) => openSigninPopup(e)} to="/sell">
            SELL
          </NavLink>
          {!currentUser && <NavLink to="/auth">SIGN IN</NavLink>}
          {currentUser && <NavLink to="/for-you">FOR YOU</NavLink>}
        </NavLinksContainer1>
        <LogoContainer to="/">
          <img className="image" src={img} alt = "logo" />
        </LogoContainer>

        <NavLinksContainer2>
          <div className="ProfileIconContainer">
            {currentUser && <ProfileIcon className="profile-icon" />}
            {isProfileDropdownOpen && <ProfileDropdown />}
          </div>
          <CartIcon className="nav-link" currentUser = {currentUser}/>
        </NavLinksContainer2>
        {isCartOpen && <CartDropdown />}
        {showPopup && <SigninPopup setShowPopup={setShowPopup} pageName = {pageName} />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
