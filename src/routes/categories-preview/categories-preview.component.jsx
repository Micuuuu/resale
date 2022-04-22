import { useContext } from "react";
import { CategoriesContext } from "../../context/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";


const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
        <div className = "shop-container">
                {
                    Object.keys(categoriesMap).map((title) =>{
                        const products = categoriesMap[title];
                        return (<CategoryPreview key = {title} title = {title} products = {products} />) 
                    })
                }
        </div>
        );
//     <Fragment>
//       {Object.keys(categoriesMap).map((title) => (
//         <Fragment key = {title}>
//           <h2>{title}</h2>
//           <div className="products-container">
//             {categoriesMap[title].map((product) => (
//                <ProductCard key={product.id} products={product} />
//             ))}
//           </div>
//         </Fragment>
//   ))}
      
//     </Fragment>
  
};

export default CategoriesPreview;
