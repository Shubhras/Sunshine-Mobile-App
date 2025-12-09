import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locations: [],
};

const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    // ✅ Add new location only if not already exists
    addLocation: (state, action) => {
      const newLocation = action.payload;
      const exists = state.locations.some(loc => loc.id === newLocation.id);
      if (!exists) {
        state.locations.push(newLocation);
      } else {
        console.log('Location already exists:', newLocation.id);
      }
    },

    // ✅ Update existing location only if it exists
    updateLocation: (state, action) => {
      const { id, data } = action.payload;
      const index = state.locations.findIndex(loc => loc.id === id);

      if (index !== -1) {
        state.locations[index] = { ...state.locations[index], ...data };
      } else {
        console.log('Location not found:', id);
      }
    },

    // ✅ Replace all locations
    setLocationData: (state, action) => {
      state.locations = action.payload;
    },

    // ✅ Delete all locations
    deleteAllLocations: (state) => {
      state.locations = [];
    },

     // ✅ Remove one location (by email)
    removeOneLocation: (state, action) => {
      const emailToRemove = action.payload;
      state.locations = state.locations.filter(
        loc => loc.email !== emailToRemove
      );
    },
  },
});

export const { addLocation, updateLocation, setLocationData, deleteAllLocations, removeOneLocation } = locationSlice.actions;
export default locationSlice.reducer;
