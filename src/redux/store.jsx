import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./slices/NewsSlice.jsx";

const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});

export default store;
