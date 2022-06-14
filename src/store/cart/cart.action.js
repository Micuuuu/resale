import createAction from "../../utils/reducer/reducer.utils"
import { CART_ACTION_TYPES } from "./cart.types"


export const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItems = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );
    //if found, increment quantity
    if (existingCartItems)
      return cartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity  }
          : cartItem
      );
      
    //return new array with modifiend cartItems/ new cart item
    console.log('add function 2')

    return [...cartItems, { ...productToAdd, quantity: 1 }];
  };



export const removeCartItem = (cartItems, productToRemove) => {
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


export const clearCartItem = (cartItems, productToClear) => {
  const existingCartItems = cartItems.find(
    (cartItem) => cartItem.id === productToClear.id
  );

  if (existingCartItems) {
    return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
  }
};

    export  const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    console.log('add function 1')
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
  };
  export  const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);

  };
  export  const clearItemFromCart = (cartItems, productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);

  };


export const setIsCartOpen = (isCartOpen) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen)