import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import CheckOutProduct from "../../components/check-out-product-card/check-out-product.component";

import "./checkOut.styles.scss";

const CheckOutPage = () => {
  const { cartItems, total } = useContext(CartContext);
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
