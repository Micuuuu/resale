import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal]  = useState(0);
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.price*cartItem.quantity,
      0
    );
    setTotal(newTotal);
  }, [cartItems]);
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };
  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    setCartItems,
    cartCount,
    total
  };

  return <CartContext.Provider value={value}> {children}</CartContext.Provider>;
};
