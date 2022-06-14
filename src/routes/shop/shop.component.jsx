import {Routes, Route} from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import ProductDetails from '../../components/product-details/product-details.component';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import {setCategories} from "../../store/categories/category.action"
import ProductEditForm from '../../components/product-edit/product-edi.component';
const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap =  async () => {
       const categoryArray = await  getCategoriesAndDocuments();
       dispatch(setCategories(categoryArray));
    }
    getCategoriesMap();
    
  }, [dispatch ])
  return (
        <Routes>
            <Route index element = {<CategoriesPreview />} />
            <Route path = ':category' element = {<Category />} />
            <Route path = ':category/:id/details' element = {<ProductDetails />} />
            <Route path = ':category/:id/edit' element = {<ProductEditForm />} />

            
        </Routes>
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

export default Shop;
