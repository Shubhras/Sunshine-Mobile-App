import { createSlice } from '@reduxjs/toolkit';
import {
  normalizeObjectTimestamps,
  normalizeTimestamp,
} from '../../constants/helpers/helperFunction';

const initialState = {
  users: {},
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    },
    // updateUser: (state, action) => {
    //   return {
    //     ...state,
    //     users: {...state.users, ...action.payload},
    //   };
    // },
    // updateUser: (state, action) => {
    //   const payload = { ...action.payload };

    //   if (payload.lastOnlineTimestamp) {
    //     payload.lastOnlineTimestamp = normalizeTimestamp(
    //       payload.lastOnlineTimestamp,
    //     );
    //   }
    //   if (payload.createdAt) {
    //     payload.createdAt = normalizeTimestamp(payload.createdAt);
    //   }

    //   state.users = {
    //     ...state.users,
    //     ...payload,
    //   };
    // },
    updateUser: (state, action) => {
      const sanitizedPayload = normalizeObjectTimestamps(action.payload);

      state.users = {
        ...state.users,
        ...sanitizedPayload,
      };
    },
    logoutUser: state => {
      // Clear user data when the user logs out
      state.users = {};
    },
    removeUserLogin: (state, action) => {
      const emailToRemove = action.payload; // email passed in dispatch
      if (state.users?.loginUsers?.length) {
        state.users.loginUsers = state.users.loginUsers.filter(
          user => user.email !== emailToRemove,
        );
      }
    },
  },
});

export const { loginUser, logoutUser, updateUser, removeUserLogin } =
  usersSlice.actions;
export default usersSlice.reducer;
