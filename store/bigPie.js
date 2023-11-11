import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import darkThemeSlice from "./darkThemeSlice";

const store = configureStore({
  reducer: {
    authSlice,
    darkThemeSlice,
  },
});

export default store;
