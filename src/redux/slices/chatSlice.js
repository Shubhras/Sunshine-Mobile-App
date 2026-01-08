import { createSlice } from '@reduxjs/toolkit';
import { normalizeObjectTimestamps } from '../../constants/helpers/helperFunction';

const initialState = {
  areChannelsSubcribed: false,
  channels: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // setChannels(state, action) {
    //   state.channels = action.payload ?? [];
    // },
    setChannels(state, action) {
      state.channels = normalizeObjectTimestamps(action.payload);
    },

    setChannelsSubcribed(state, action) {
      state.areChannelsSubcribed = action.payload;
    },

    resetAllChat: () => initialState,
  },
});

export const { setChannels, setChannelsSubcribed, resetAllChat } =
  chatSlice.actions;

export default chatSlice.reducer;
