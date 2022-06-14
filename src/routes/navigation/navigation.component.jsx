import React from "react";
import {ReactComponent as Profile} from '../../assets/profile.svg';

import { Outlet } from "react-router-dom";
import { Fragment} from "react";
import { useSelector } from "react-redux";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import img from "../../assets/logo.png"
import { selectCurrentUser } from "../../store/user/user.selector";
import { SignOutUser } from "../../utils/firebase/firebase.utils";
//Cart Redux
import { selectIsCartOpen } from "../../store/cart/cart.selector";
//Profile icon  & redux
import { selectIsProfileDropdownOpen } from "../../store/profile/profile.selector";
import ProfileIcon from "../../components/profile-icon/profile-icon.component";
import ProfileDropdown from "../../components/profile-dropdown/profile-dropdown.component";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";
import {NavigationContainer, NavLink, NavLinksContainer1, NavLinksContainer2, NavLinkProfile, LogoContainer} from "./navigation.styles.js";
import "./navigation.styles.scss"
const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen);
  const isProfileDropdownOpen = useSelector(selectIsProfileDropdownOpen);
  return (
    <Fragment>
    
      
      <NavigationContainer >

        <NavLinksContainer1>
          <NavLink to="/shop">
                SHOP
          </NavLink>
          <NavLink to="/sell">
                SELL
          </NavLink>
          
          {currentUser && <NavLink to="/sell">
              FOR YOU
            </NavLink> }
           
          
        </NavLinksContainer1>
        <LogoContainer to="/">
          <img className = "image" src={img}/>
        </LogoContainer>

        <NavLinksContainer2>
          {
            currentUser ? (
              <div className="nav">
                <div className='profile-icon-container '>
                <ProfileIcon className="profile-icon"/>
                </div>
              </div>
            ) : (
              <NavLinkProfile to="/auth" >
               <div className='profile-icon-container'>
                <Profile className="profile-icon"/>
              </div>
              </NavLinkProfile>
            )
          }
         
          <CartIcon  className='nav-link'/>
        </NavLinksContainer2>
        {isProfileDropdownOpen && <ProfileDropdown/>}
       { isCartOpen && <CartDropdown/> }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
