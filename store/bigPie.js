import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import darkThemeSlice from "./darkThemeSlice";
import likedCards from "./likedCards";

const store = configureStore({
  reducer: {
    authSlice,
    darkThemeSlice,
    likedCards,
  },
});

export default store;
