const SET_ORDERS = 'SET_ORDERS';
const UPDATE_ORDERS = 'UPDATE_ORDERS';
const LOG_OUT_ORDERS = 'LOG_OUT_ORDERS';

export const INTIIAL_ORDERS = {};

export const setOrders = (data) => ({
  type: SET_ORDERS,
  data,
});

export const logoutOrders = () => ({
  type: LOG_OUT_ORDERS,
});
//my work start
export const updateOrders = (data) => ({
  type: UPDATE_ORDERS,
  data,
});

//my work end
const initialState = {
  ordersData: INTIIAL_ORDERS,
};

export const ordersData = (state = initialState, action) => {
 
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        ordersData: action.data
      };
    case UPDATE_ORDERS:
      return {
        ...state,
        ordersData: {...state.ordersData, ...action.data},
      };
    case LOG_OUT_ORDERS: {
      return initialState
    }
    default:
      return state;
  }
};
