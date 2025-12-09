const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
const LOG_OUT = 'LOG_OUT';
const UPDATE_CATEGORIES_DATA = 'UPDATE_CATEGORIES_DATA';

export const DUMMY_CATEGORIES_DATA = [];

export const setCategoriesData = (data) => ({
  type: UPDATE_CATEGORIES,
  data,
});

export const logoutToCategories = () => ({
  type: LOG_OUT,
});
//my work start
export const UpdateCategoriesData = (data) => ({
  type: UPDATE_CATEGORIES_DATA,
  data,
});

//my work end
const initialState = {
  categories: DUMMY_CATEGORIES_DATA,
};

export const categories = (state = initialState, action) => {
 
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: action.data
      };
    case UPDATE_CATEGORIES_DATA:
      return {
        ...state,
        categories: [...state.categories, ...action.data],
      };
    case LOG_OUT: {
      return initialState
    }
    default:
      return state;
  }
};
