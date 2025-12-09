const SET_SUB_CATEGORIES = 'SET_SUB_CATEGORIES';
const LOG_OUT = 'LOG_OUT';

export const DUMMY_CATEGORIES_DATA = [];

export const setSubCategoriesData = (data) => ({
  type: SET_SUB_CATEGORIES,
  data,
});

export const logoutSubCategories = () => ({
  type: LOG_OUT,
});

const initialState = {
  subCategories: DUMMY_CATEGORIES_DATA,
};

export const subCategories = (state = initialState, action) => {
 
  switch (action.type) {
    case SET_SUB_CATEGORIES:
      return {
        ...state,
        subCategories: action.data
      };
    
    case LOG_OUT: {
      return initialState
    }
    default:
      return state;
  }
};
