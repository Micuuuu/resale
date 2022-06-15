import { useSelector} from "react-redux";
import { selectUserDataMap } from "../../store/user-data/user-data.selector";
import CardUser from "./card-user/card-user.components";
import "./product-card.styles.scss";
import CardNoUser from "./card-no-user/card-no-user.component";
const ProductCard = ({ products, title, currentUser }) => {
  
  const userDataMap = useSelector(selectUserDataMap);
  console.log(currentUser);
  return (
    currentUser ? ( <CardUser products = {products} title = {title} currentUser = {currentUser} userDataMap = {userDataMap} />

    ): (<CardNoUser products = {products} title = {title} currentUser = {currentUser} userDataMap = {userDataMap} />)
  );
};

export default ProductCard;
