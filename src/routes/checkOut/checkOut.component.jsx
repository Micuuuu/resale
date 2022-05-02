import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";

import CheckOutProduct from "../../components/check-out-product-card/check-out-product.component";

import "./checkOut.styles.scss";

const CheckOutPage = () => {
  const  cartItems  = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  return (
    <div className="checkOut-container">
      <div className="table-titles">
        <span className="header-block">Product</span>
        <span className="header-block">Description</span>
        <span className="header-block">Quantity</span>
        <span className="header-block">Price</span>
        <span className="header-block">Remove</span>
      </div>

      <div className="product-card">
        {cartItems.map((item) => {
          return <CheckOutProduct key={item.id} items={item} />;
        })}
      </div>
      <span className="total">{`Total: ${total}$`}</span>
    </div>
  );
};

export default CheckOutPage;
