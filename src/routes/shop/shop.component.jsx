import { useContext } from "react"
import { ShopDataContext } from "../../context/shop-data.context"
import ProductCard from "../../components/product-card/product-card.component";

import "./shop.styles.scss"
const Shop = () =>{
 const { currentShopData } = useContext(ShopDataContext);

    return(
        <div className="products-container">
        {currentShopData.map((product)=>{
            return(
                
                    <ProductCard key = {product.id} products = {product}/>
                
            )
        })}
        </div>
            )
}

export default Shop