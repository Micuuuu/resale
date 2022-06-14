import { createSelector} from 'reselect';
  
const  selectCategoryReducer = (state) =>{ 
    return state.categories;
}
  

const selectCategories = createSelector(
    [selectCategoryReducer], // the imput selector
    (categoriesSlice) => {
        return categoriesSlice.categories} //the output selector
)

const selectItems = createSelector(
    [selectCategories],
    (categories) => { 
        return categories.reduce((acc,category) =>{
            const {title, items} = category
        acc[title.toLowerCase()] =items;
        const itemss = acc["clothes"];
        return acc;
      }, {} );
     }
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => { 
        return categories.reduce((acc, category) =>{
        const {title, items} = category
        acc[title.toLowerCase()] =items;
            
        return acc;
      }, {} );
     }
);


export const selectAllProducts = createSelector(
    [selectCategoriesMap],
    (categories) => { 
     

      const arr = Object.keys(categories).reduce(function(res, v) {
        return res.concat(categories[v]);
    }, []);
    return arr
    }
);


export const selectProductsById = createSelector(
    [selectAllProducts],
    (arr) => { 
       

    return arr.reduce((acc, product) =>{
        const {id} = product
        acc[id] =product;
            
        return acc;
      }, {} );
     
     }
);

export const selectProductsByOwnerId = createSelector(
    [selectAllProducts],
    (arr) => { 
       

    return arr.reduce((acc, product) =>{
        const {owner} = product
        const {uid} = owner
        acc[uid] ={product};
            
        return acc;
      }, {} );
     
     }
);