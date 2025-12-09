const POPULAR_SEARCH = 'POPULAR_SEARCH';
const RECENT_SEARCH = 'RECENT_SEARCH';
const REMOVE_RECENT_SEARCH = 'REMOVE_RECENT_SEARCH';
const CLEAR_RECENT_SEARCHES = 'CLEAR_RECENT_SEARCHES';
const TEXT_DEBOUNCING = 'TEXT_DEBOUNCING';
const ACTIVE_POPULAR_SEARCH = 'ACTIVE_POPULAR_SEARCH';
const ACTIVE_RECENT_SEARCH = 'ACTIVE_RECENT_SEARCH';
const LOGOUT_TO_SEARCHES = 'LOGOUT_TO_SEARCHES';
const REAFRESH_TO_SEARCH = 'REAFRESH_TO_SEARCH';

export const popularSearch = data => ({
  type: POPULAR_SEARCH,
  data,
});

export const recentSearch = data => ({
  type: RECENT_SEARCH,
  data,
});

export const removeRecentSearch = itemToRemove => ({
  type: REMOVE_RECENT_SEARCH,
  payload: itemToRemove,
});

export const clearAllRecentSearches = () => ({
  type: CLEAR_RECENT_SEARCHES,
});

export const textDebouncing = data => ({
  type: TEXT_DEBOUNCING,
  data,
});
export const activePopularSearch = data => ({
  type: ACTIVE_POPULAR_SEARCH,
  data,
});
export const activeRecentSearch = data => ({
  type: ACTIVE_RECENT_SEARCH,
  data,
});

export const logoutTosearch = () => ({
  type: LOGOUT_TO_SEARCHES,
});

export const  refreshSearch = () => ({
  type: REAFRESH_TO_SEARCH,
})

const initialState = {
  popularSearch: [],
  recentSearch: [],
  refreshSearch: [],
  stopBouncing: false,
  activePopularSearch: false,
  activeRecentSearch: false,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case POPULAR_SEARCH:
      return {
        ...state,
        popularSearch: action.data,
      };
    case RECENT_SEARCH:
      const newValue = action.data;
      const updatedProductList = [newValue, ...state.recentSearch.filter(item => item?.toLowerCase() !== newValue?.toLowerCase())];
      const uniqueProductList = [...new Set(updatedProductList)].slice(0, 15);
      return {
        ...state,
        recentSearch: uniqueProductList,
      };
      // const newValue = action.data;
      // const updatedProductList = [...state.recentSearch];
      // if (!updatedProductList.includes(newValue)) {
      //   updatedProductList.push(newValue);
      // }
      // return {
      //   ...state,
      //   recentSearch: updatedProductList,
      // };

    case REMOVE_RECENT_SEARCH:
      return {
        ...state,
        recentSearch: state.recentSearch.filter(
          item => item !== action.payload,
        ),
      };
    case CLEAR_RECENT_SEARCHES:
      return {
        ...state,
        recentSearch: [],
      };
    case TEXT_DEBOUNCING:
      return {
        ...state,
        stopBouncing: action.data,
      };
    case ACTIVE_POPULAR_SEARCH:
      return {
        ...state,
        activePopularSearch: action.data,
      };
    case ACTIVE_RECENT_SEARCH:
      return {
        ...state,
        activeRecentSearch: action.data,
      };
    case LOGOUT_TO_SEARCHES: {
      return initialState;
    }

    case REAFRESH_TO_SEARCH:{
      return {
        ...state,
        refreshSearch: [],
      };
    }
    default:
      return state;
  }
};
