import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  planId: '',
  plans: [],
  isPlanActive: false,
  subsCribedData: [],
  filters: [],
  first: false,
}

const inAppPurchaseSlice = createSlice({
  name: 'inAppPurchase',
  initialState,
  reducers: {
    setSubscriptionPlan(state, action) {
      state.planId = action.payload.planId
    },

    setPlans(state, action) {
      state.plans = action.payload.plans
    },

    setIsPlanActive(state, action) {
      state.isPlanActive = action.payload
    },

    mySubscribedPlan(state, action) {
      state.subsCribedData = [action.payload]
    },

    myPurchaseFilters(state, action) {
      state.filters = [action.payload]
    },

    setFirstTimeSubscribe(state, action) {
      state.first = action.payload
    },

    logOut() {
      return initialState
    },
  },
})

/* -------------------- Actions -------------------- */
export const {
  setSubscriptionPlan,
  setPlans,
  setIsPlanActive,
  mySubscribedPlan,
  myPurchaseFilters,
  setFirstTimeSubscribe,
  logOut,
} = inAppPurchaseSlice.actions

/* -------------------- Reducer -------------------- */
export default inAppPurchaseSlice.reducer
