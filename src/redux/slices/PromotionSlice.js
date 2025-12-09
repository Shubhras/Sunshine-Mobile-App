const SET_PROMOTION  = 'SET_PROMOTION';
const LOG_OUT_PROMOTION = 'LOG_OUT_PROMOTION';
const UPDATE_PROMOTION = 'UPDATE_PROMOTION';

export const DUMMY_CATEGORIES_DATA = [];

export const setPromotion = (data) => ({
  type: SET_PROMOTION,
  data,
});

export const logoutPromotion = () => ({
  type: LOG_OUT_PROMOTION,
});
//my work start
export const UpdatePromotion = (data) => ({
  type: UPDATE_PROMOTION,
  data,
});

//my work end
const initialState = {
  promotionList: DUMMY_CATEGORIES_DATA,
};

export const promotionList = (state = initialState, action) => {
 
  switch (action.type) {
    case SET_PROMOTION:
      return {
        ...state,
        promotionList: action.data
      };
    case UPDATE_PROMOTION:
      return {
        ...state,
        promotionList: [...state.promotionList, ...action.data],
      };
    case LOG_OUT_PROMOTION: {
      return initialState
    }
    default:
      return state;
  }
};
