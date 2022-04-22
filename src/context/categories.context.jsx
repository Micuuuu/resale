import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {},
    setcurrentCategoriesMap: () => null
})

export const CategoriesProvider = ({children}) =>{
    const [categoriesMap, setCategoriesMap] = useState({});
   
    useEffect(() => {
        const getCategoriesMap =  async () => {
           const categoryMap = await  getCategoriesAndDocuments();
           setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
        
    }, [])

    const value = {categoriesMap}
  
    return <CategoriesContext.Provider value = {value}> {children}</CategoriesContext.Provider>
}