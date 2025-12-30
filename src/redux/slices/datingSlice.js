import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  matches: [],
  swipes: [],
  incomingSwipes: [],
  didSubscribeToSwipes: false,
};

const datingSlice = createSlice({
  name: 'dating',
  initialState,
  reducers: {
    setSwipes(state, action) {
      state.swipes = action.payload;
    },
    setIncomingSwipes(state, action) {
      state.incomingSwipes = action.payload;
    },
    setMatches(state, action) {
      state.matches = action.payload;
    },
    setSwipesListenerDidSubscribe(state) {
      state.didSubscribeToSwipes = true;
    },
    resetDating() {
      return initialState;
    },
  },
});

export const {
  setSwipes,
  setIncomingSwipes,
  setMatches,
  setSwipesListenerDidSubscribe,
  resetDating,
} = datingSlice.actions;

export default datingSlice.reducer;
