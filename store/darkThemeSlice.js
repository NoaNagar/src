import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkTheme: localStorage.getItem("darkTheme") === "true" ? true : false,
};

const darkTheme = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setThemePreference(state, action) {
      state.darkTheme = action.payload;
      localStorage.setItem("darkTheme", action.payload.toString());
    },
  },
});

export const darkThemeActions = darkTheme.actions;

export default darkTheme.reducer;
