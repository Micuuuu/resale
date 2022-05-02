import {Routes, Route} from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import {setCategories} from "../../store/categories/category.action"
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
