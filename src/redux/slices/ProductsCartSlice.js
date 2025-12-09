const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
const LOGOUT_TO_CART = 'LOGOUT_TO_CART';
const SET_TO_CART = 'SET_TO_CART';

export const addToCart = (item, quantity = 1) => {
  return {
    type: ADD_TO_CART,
    payload: {item, quantity},
  };
};

export const removeFromCart = itemId => {
  return {
    type: REMOVE_FROM_CART,
    payload: itemId,
  };
};

export const increaseQuantity = itemId => {
  return {
    type: INCREASE_QUANTITY,
    payload: itemId,
  };
};

export const decreaseQuantity = itemId => {
  return {
    type: DECREASE_QUANTITY,
    payload: itemId,
  };
};

export const logoutToCart = () => ({
  type: LOGOUT_TO_CART,
});
// cartReducer.js

export const setToCart = payload => ({
  type: SET_TO_CART,
  payload,
});

const initialState = {
  cartItems: [],
};

export const productCart = (state = initialState, action) => {
  switch (action.type) {
    // cartReducer.js

    case ADD_TO_CART:
      const {item, quantity} = action.payload;
      const updatedProductList = [...state.cartItems];
      const existingItemIndex = updatedProductList.findIndex(
        cartItem => cartItem.item.objectId === item.objectId,
      );

      if (existingItemIndex !== -1) {
        // Item already exists in the cart, update its quantity
        updatedProductList[existingItemIndex] = {
          ...updatedProductList[existingItemIndex],
          quantity: updatedProductList[existingItemIndex].quantity + quantity,
        };
      } else {
        // Item doesn't exist in the cart, add it
        updatedProductList.push({item, quantity, isOutOfStock:true});
      }

      // Combine items with the same objectId and update the state
      const combinedProductList = updatedProductList.reduce(
        (accumulator, currentItem) => {
          const existingItem = accumulator.find(
            item => item.item.objectId === currentItem.item.objectId,
          );
          if (existingItem) {
            existingItem.quantity += currentItem.quantity;
          } else {
            accumulator.push(currentItem);
          }
          return accumulator;
        },
        [],
      );

      return {
        ...state,
        cartItems: combinedProductList,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.item.objectId !== action.payload,
        ),
      };
    case INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(cartItem =>
          cartItem.item.objectId === action.payload
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem,
        ),
      };
    // cartReducer.js

    case DECREASE_QUANTITY:
      const updatedCartItems = state.cartItems.map(cartItem => {
        if (cartItem.item.objectId === action.payload) {
          const newQuantity = Math.max(0, cartItem.quantity - 1); // Ensure quantity doesn't go below 0
          return {...cartItem, quantity: newQuantity};
        }
        return cartItem;
      });

      // Remove items with quantity 0
      const filteredCartItems = updatedCartItems.filter(
        cartItem => cartItem.quantity > 0,
      );

      return {
        ...state,
        cartItems: filteredCartItems,
      };

    case SET_TO_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    case LOGOUT_TO_CART: {
      return initialState;
    }
    default:
      return state;
  }
};
