import {ReactComponent as ShopingIcon} from '../../assets/shopping-bag.svg';
import "./cart-icon.styles.scss";

import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartCount } from '../../store/cart/cart.selector';
import { useSelector, useDispatch } from 'react-redux';
const CartIcon = () =>{
    const dispatch = useDispatch()
    const  isCartOpen  = useSelector(selectIsCartOpen);
    const  cartCount = useSelector(selectCartCount);
    const toggleIsCartOpen = () => {
      dispatch(setIsCartOpen(!isCartOpen))
    }
    return( 
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShopingIcon className="shopping-icon"/>
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}


export default CartIcon
