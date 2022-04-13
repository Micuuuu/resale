import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

import SHOP_DATA from "../shop-data.json"

export const ShopDataContext = createContext({
    currentShopData: [],
    setcurrentShopData: () => null
})

export const ShopDataProvider = ({children}) =>{
    const [currentShopData, setcurrentShopData] = useState(SHOP_DATA);
    const value = {currentShopData, setcurrentShopData}
  
  
    return <ShopDataContext.Provider value = {value}> {children}</ShopDataContext.Provider>
}