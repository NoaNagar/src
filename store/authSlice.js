import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  userData: undefined,
  isBuisness: false,
  isAdmin: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.userData = action.payload;
      state.isBuisness = action.payload.isBusiness || false;
      state.isAdmin = action.payload.isAdmin || false;
      state.id = action.payload._id;
    },
    logout(state) {
      state.loggedIn = false;
    },
    loginUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
