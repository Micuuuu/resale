import { useSelector } from "react-redux";

import { selectUserDataMap } from "../../store/user-data/user-data.selector";
import { selectFollowersData } from "../../store/user-data/user-data.selector";

import { selectCartItems } from "../../store/cart/cart.selector";
import { selectProductsById } from "../../store/categories/category.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import Details from "./details/details.component";

import "./product-details.styles.scss";

const ProductDetails = () => {
  const productsIdMap = useSelector(selectProductsById);
  const userDataMap = useSelector(selectUserDataMap);
  const userFollowersDataMap = useSelector(selectFollowersData);
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);

  return productsIdMap && userDataMap && userFollowersDataMap && cartItems && currentUser ? (
    <Details
      productsIdMap={productsIdMap}
      userDataMap={userDataMap}
      userFollowersDataMap={userFollowersDataMap}
      cartItems={cartItems}
      currentUser={currentUser}
    />
  ) : (
    <div>Loading</div>
  );
};

export default ProductDetails;
