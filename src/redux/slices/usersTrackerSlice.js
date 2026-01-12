import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: null,
  didSubscribeToUsers: false,
}

const usersTrackerSlice = createSlice({
  name: 'usersTracker',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = [...action.payload]
    },
    setUsersListenerDidSubscribe(state) {
      state.didSubscribeToUsers = true
    },
    usersTrackesLogout() {
      return initialState
    },
  },
})

export const {
  setUsers,
  setUsersListenerDidSubscribe,
  usersTrackesLogout,
} = usersTrackerSlice.actions

export default usersTrackerSlice.reducer
