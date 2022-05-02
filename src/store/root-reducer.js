import { combineReducers } from "redux"; //  o metoda ce ne ajuta sa creeam in reducer mare la final pe care il putem folosi on "store" prin combinarea
//celor mici
import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";
export const rootReducer = combineReducers({
user: userReducer,
categories: categoriesReducer,
cart: cartReducer,

})