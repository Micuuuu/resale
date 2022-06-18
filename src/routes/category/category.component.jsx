import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";

import ProductCard from "../../components/product-card/product-card.component";
import "./category.styles.scss";
import { selectCurrentUser } from "../../store/user/user.selector";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);
  const currentUser = useSelector(selectCurrentUser)
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-shop-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} products={product} title = {category} currentUser = {currentUser} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
