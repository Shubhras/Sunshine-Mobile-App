// inAppPurchaseSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  planId: '',
  selectedPlan: null,        // ✅ NEW
  plans: [],
  isPlanActive: false,
  subsCribedData: [],
  filters: [],
  first: false,
  activeSubscriptions: [],   // ✅ NEW (restore / active list)
};

const inAppPurchaseSlice = createSlice({
  name: 'inAppPurchase',
  initialState,
  reducers: {
    setSubscriptionPlan(state, action) {
      state.planId = action.payload.planId;
    },

    setSelectedPlan(state, action) {          // ✅ NEW
      state.selectedPlan = action.payload;
    },

    setPlans(state, action) {
      state.plans = action.payload.plans;
    },

    setIsPlanActive(state, action) {
      state.isPlanActive = action.payload;
    },

    mySubscribedPlan(state, action) {
      state.subsCribedData = [action.payload];
    },

    myPurchaseFilters(state, action) {
      state.filters = [action.payload];
    },

    setFirstTimeSubscribe(state, action) {
      state.first = action.payload;
    },

    setActiveSubscriptions(state, action) {    // ✅ NEW
      state.activeSubscriptions = action.payload || [];
    },

    logOut() {
      return initialState;
    },
  },
});

export const {
  setSubscriptionPlan,
  setSelectedPlan,
  setPlans,
  setIsPlanActive,
  mySubscribedPlan,
  myPurchaseFilters,
  setFirstTimeSubscribe,
  setActiveSubscriptions,
  logOut,
} = inAppPurchaseSlice.actions;

export default inAppPurchaseSlice.reducer;
