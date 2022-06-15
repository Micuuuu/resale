import ProductCard from "../product-card/product-card.component";
import {  Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./category-preview.styles.scss"
import { selectCurrentUser } from "../../store/user/user.selector";

const CategoryPreview = ({title, products}) => {
    const currentUser = useSelector(selectCurrentUser);
    return(
        <div className="category-preview-container">
            <h2>
                
                <Link  className="title" to={title}>{title.toUpperCase()}</Link>
                
            </h2>
            <div className="preview">
                { 

                  products.filter((x, idx) =>   idx < 4 ).map((product)=>{

                    return <ProductCard key = {product.id} products = {product} title = {title}  currentUser = {currentUser}/>              
                  })   
                }         
            </div>

        </div>
    )
};

export default CategoryPreview;