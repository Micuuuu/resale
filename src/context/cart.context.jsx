import { createContext } from "react";

import { useReducer } from "react";
import createAction from "../utils/reducer/reducer.utils";

//functie prin car imi cauta in array
const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems contains productToAdd
  const existingCartItems = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  //if found, increment quantity
  if (existingCartItems)
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  //return new array with modifiend cartItems/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItems = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );
  // check if quantity is equal to  1 , if it is is remove that item from the cart
  if (existingCartItems.quantity === 1)
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);

  // return back canrtitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, productToClear) => {
  const existingCartItems = cartItems.find(
    (cartItem) => cartItem.id === productToClear.id
  );

  if (existingCartItems) {
    return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
  }
};


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  total: 0
});


const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,

}

export const USER_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) =>{
  const {type, payload} = action;

  
  switch(type){
    case  USER_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }

    case USER_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }

    default:
      throw new Error(`unhandled type of ${type} in cartReducer`)
  }
}

export const CartProvider = ({ children }) => {
  //const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [total, setTotal]  = useState(0);

  

  // useEffect(() => {
  //   const newCartCount = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity,
  //     0
  //   );
  //   setCartCount(newCartCount);
  // }, [cartItems]);

  // useEffect(() => {
  //   const newTotal = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.price*cartItem.quantity,
  //     0
  //   );
  //   setTotal(newTotal);
  // }, [cartItems]);
 
 
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)  // USE REDUCER primeste functia noastra Reduce si valoarea initiala a lui State
  const {cartItems, cartCount, isCartOpen, cartTotal} = state;
  
  const updateCartItemReducer = (newCartItems) => {
    /*
    generate newCartTotal
    generate newCartCount 
    dispatch new action with payload = {
       newCartItems, newCartTotal, newCartCount 
     }
    */
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0);
    const newCartTotal = newCartItems.reduce(
        (total, cartItem) => total + cartItem.price*cartItem.quantity,
        0
      );
    
      dispatch(createAction(USER_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal }
      ) );
      

    

  }
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemReducer(newCartItems);
  };
  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemReducer(newCartItems);

  };
  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    updateCartItemReducer(newCartItems);

  };

  const setIsCartOpen = (isCartOpen) => {
    
      dispatch(createAction(USER_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen))
  }

  
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,

    cartCount,
    cartTotal
  };

  return <CartContext.Provider value={value}> {children}</CartContext.Provider>;
};
