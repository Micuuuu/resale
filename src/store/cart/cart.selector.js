import {createSelector} from 'reselect';
export const selectCartReducer = state => state.cart;
export const selectCartItems =  createSelector(
    [selectCartReducer],
    (cart) => {
    return cart.cartItems
    }
)
export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
)

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
              (total, cartItem) => total + cartItem.price*cartItem.quantity,
              0
            )
)


// const newCartCount = newCartItems.reduce(
//     (total, cartItem) => total + cartItem.quantity,
//     0);
// const newCartTotal = newCartItems.reduce(
//       (total, cartItem) => total + cartItem.price*cartItem.quantity,
//       0
//     );
