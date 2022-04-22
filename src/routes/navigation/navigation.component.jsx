import React from "react";
import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { SignOutUser } from "../../utils/firebase/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";
import {NavigationContainer, NavLink, NavLinksContainer, LogoContainer} from "./navigation.styles.js";
const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  

  const {isCartOpen} = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer >
        <LogoContainer to="/">
          <div className="logo">
            <CrwnLogo />
          </div>
        </LogoContainer>

        <NavLinksContainer>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={SignOutUser}>SIGN OUT</NavLink>
          ) : (
            <NavLink to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon  className='nav-link'/>
        </NavLinksContainer>

       { isCartOpen && <CartDropdown/> }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
