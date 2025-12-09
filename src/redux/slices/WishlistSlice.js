const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
const LOGOUT_TOGGLE_FAVORITE = 'LOGOUT_TOGGLE_FAVORITE';
const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';
const SET_TO_FAVORITE = 'SET_TO_FAVORITE';



export const setFavoriteData = (data) => ({
  type: SET_TO_FAVORITE,
  data,
});
export const addToFavorite = (item) => {
  return {
    type: ADD_TO_FAVORITE,
    payload: {item},
  };
};

export const toggleFavorite = (itemId) => ({
  type: TOGGLE_FAVORITE,
  itemId,
});
export const logoutToggleFavorite = () => ({
  type: LOGOUT_TOGGLE_FAVORITE,
});
export const initialState = {
  wishList: [],
  wishListID:[]
};

export const wishLists = (state = initialState, action) => {
  switch (action.type) {
  
    case TOGGLE_FAVORITE: {
      const { itemId } = action;
      const updatedWishList = [...state.wishList]; // Copy the existing wishlist array

      const index = updatedWishList.indexOf(itemId);
      if (index !== -1) {
        updatedWishList.splice(index, 1); // If the string ID exists, remove it from the wishlist
      } else {
        updatedWishList.push(itemId); // If the string ID doesn't exist, add it to the wishlist
      }

      return {
        ...state,
        wishList: updatedWishList,
      };
    }
    case ADD_TO_FAVORITE:
      const {item} = action.payload;
      const updatedProductList = [...state.wishList];
      const updatedProductListID = [...state.wishListID];
      // console.log("item,item",item.objectId);
      // console.log("updatedProductList,updatedProductList",updatedProductList);
      const existingItemIndex = updatedProductList.findIndex(
        cartItem => cartItem.objectId === item.objectId,
      );
      // console.log("wwwwwwwwwwww");

      if (existingItemIndex !== -1) {
        console.log("existingItemIndex");
       const removeData =  updatedProductList.filter(
          cartItem => cartItem.objectId !== item.objectId,
        )
        const removeDataID =  updatedProductListID.filter(
          cartItem => cartItem !== item.objectId,
        )
        return {
          ...state,
          wishList: removeData,
          wishListID:removeDataID,
        };
       
      } else {
        console.log("not");

        // Item doesn't exist in the cart, add it
        updatedProductList.push(item);
        updatedProductListID.push(item.objectId)
        return {
          ...state,
          wishList: updatedProductList,
          wishListID:updatedProductListID,
        };
      }


    case SET_TO_FAVORITE:
      const tempID = [];
      action.data.map((val)=>{
          tempID.push(val.objectId)
        })
      return {
        ...state,
        wishList: action.data,
        wishListID:tempID,
    };
    case LOGOUT_TOGGLE_FAVORITE : {
      return initialState
    }
    default:
      return state;
  }
};

