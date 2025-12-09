import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  disputeResons: [],
};

const disputeResonsSlice = createSlice({
  name: 'disputeResons',
  initialState,
  reducers: {
    

    // ✅ Replace all disput eResons
    setDisputeResons: (state, action) => {
      state.disputeResons = action.payload;
    },

    // ✅ Delete all dispute Resons
    deleteDisputeResons: (state) => {
      state.disputeResons = [];
    },
  },
});

export const { setDisputeResons, deleteDisputeResons } = disputeResonsSlice.actions;
export default disputeResonsSlice.reducer;
