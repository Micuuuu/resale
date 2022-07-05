import {ReactComponent as ShopingIcon} from '../../assets/shopping-bag.svg';
import "./cart-icon.styles.scss";
import React, { useState } from "react";
import SigninPopup from '../signin-popup/signin-popup.component';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartCount } from '../../store/cart/cart.selector';
import { useSelector, useDispatch } from 'react-redux';
const CartIcon = ({currentUser}) =>{
    const dispatch = useDispatch()
    const  isCartOpen  = useSelector(selectIsCartOpen);
    const  cartCount = useSelector(selectCartCount);
    const [showPopup, setShowPopup] = useState(false);
    const [pageName, setPageName] = useState("");
    const toggleIsCartOpen = (e) => {
        if (!currentUser) {
            console.log(e.currentTarget)
            setPageName(e.currentTarget.id)
            e.preventDefault();
            setShowPopup(true);
          }
          else
      
        {   
             dispatch(setIsCartOpen(!isCartOpen))
        }
    }
  
    return( 
        <div>
        <div className='cart-icon-container'  id = "Cart"  onClick={toggleIsCartOpen} >
            <ShopingIcon  id="Cart" className="shopping-icon"/>
            {currentUser && <span className='item-count'>{cartCount}</span>} 
        </div>
         {showPopup && <SigninPopup setShowPopup={setShowPopup} pageName = {pageName} />}
        </div>
    )
}


export default CartIcon
