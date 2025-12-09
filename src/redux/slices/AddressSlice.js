// import {createSlice} from '@reduxjs/toolkit';

// export const AddressSlice = createSlice({
//   name: 'address',
//   initialState: {
//     data: [],
//   },
//   reducers: {
//     addAddress(state, action) {
//       console.log('state==========>',state);
//       state.data.push(...action.payload);
//     },
//     deleteAddress(state, action) {
//       let newArr = state.data.filter(item => {
//         return item.id !== action.payload;
//       });
//       state.data = newArr;
//     },
//     updateAddress(state, action) {
//       let temp = state.data;
//       temp.map(item => {
//         if (item.id == action.payload.id) {
//           item.state = action.payload.state;
//           item.city = action.payload.city;
//           item.pincode = action.payload.pincode;
//           item.type = action.payload.type;
//         }
//       });
//       state.data = temp;
//     },
//   },
// });
// export const {addAddress, deleteAddress, updateAddress} = AddressSlice.actions;
// export default AddressSlice.reducer;

// reducers/addressReducer.js

const ADD_ADDRESSES = 'ADD_ADDRESSES';
const ADD_TO_ADDRESSES = 'ADD_TO_ADDRESSES';
const UPDATE_TO_ADDRESS = 'UPDATE_TO_ADDRESS';
const REMOVE_FROM_ADDRESS = 'REMOVE_FROM_ADDRESS';
const LOGOUT_TO_ADDRESSES = 'LOGOUT_TO_ADDRESSES';



export const addAddresses = (addresses) => {
  return {
    type: ADD_ADDRESSES,
    payload: addresses,
  };
};

export const addToAddress = (item) => {
  return {
    type: ADD_TO_ADDRESSES,
    payload: {item},
  };
};
export const updateAddressByObjectId = (objectId, updatedData) => {
  return {
    type: UPDATE_TO_ADDRESS,
    payload: { objectId, updatedData },
  };
};
export const removeFromAddress = itemId => {
  return {
    type: REMOVE_FROM_ADDRESS,
    payload: itemId,
  };
};
export const logoutToAddress = () => ({
  type: LOGOUT_TO_ADDRESSES,
});

const initialState = {
  addresses: [],
};

export  const deliveryAddress = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESSES:
      return {
        ...state,
        addresses: [ ...action.payload],
      };
      case ADD_TO_ADDRESSES:
      const {item} = action.payload;
      const updatedProductList = [...state.addresses];
      
        updatedProductList.push(item);

      return {
        ...state,
        addresses: updatedProductList,
      };
      case UPDATE_TO_ADDRESS:
      const { objectId, updatedData } = action.payload;
      const updatedAddresses = state.addresses.map((address) => {
        if (address.objectId === objectId) {
          return {
            ...address,
            ...updatedData,
          };
        }
        return address;
      });
      return {
        ...state,
        addresses: updatedAddresses,
      };
      case REMOVE_FROM_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.filter(
          cartItem => cartItem.objectId !== action.payload,
        ),
      };
      case LOGOUT_TO_ADDRESSES: {
        return initialState;
      }
    default:
      return state;
  }
};


