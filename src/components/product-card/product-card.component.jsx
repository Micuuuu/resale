import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import Button from '../button/button.component'
import { selectCartItems } from '../../store/cart/cart.selector';
import "./product-card.styles.scss"

const ProductCard = ({products}) => {
   const {name, price, imageUrl} = products;
   const cartItems = useSelector(selectCartItems)
   const dispatch = useDispatch();
   const addProductToCart = () =>{ dispatch(addItemToCart(cartItems, products))
        }
    return(
    <div className="product-card-container">
        <img src={imageUrl} alt={`${name}`} />
        <div className="footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
        <Button buttonType = 'inverted' onClick = {addProductToCart}>Add to card</Button>
    </div>
    )

}

export default ProductCard
