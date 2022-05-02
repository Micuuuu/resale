import { createSelector} from 'reselect';
  
const  selectCategoryReducer = (state) =>{ 
    return state.categories;
}

export  const selectCategories = createSelector(
    [selectCategoryReducer], // the imput selector
    (categoriesSlice) => {
        return categoriesSlice.categories} //the output selector
)
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

  
