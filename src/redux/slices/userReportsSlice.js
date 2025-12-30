import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bannedUserIDs: [],
};

const userReportsSlice = createSlice({
  name: 'userReports',
  initialState,
  reducers: {
    setBannedUserIDs(state, action) {
      state.bannedUserIDs = action.payload;
    },
    resetUserReports() {
      return initialState;
    },
  },
});

export const {
  setBannedUserIDs,
  resetUserReports,
} = userReportsSlice.actions;

export default userReportsSlice.reducer;
