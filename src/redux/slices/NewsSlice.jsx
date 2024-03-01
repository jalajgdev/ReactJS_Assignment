// Inside NewsSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  suggestions: [],
  newsList: [],
  currentPage: 1,
  totalResults: 0, // Add this line to store the total number of results
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    setNewsList: (state, action) => {
      state.newsList = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalResults: (state, action) => {
      state.totalResults = action.payload; // Add this reducer
    },
  },
});

export const {
  setSearchTerm,
  setSuggestions,
  setNewsList,
  setCurrentPage,
  setTotalResults, // Add this line to export the setTotalResults action
} = newsSlice.actions;

export default newsSlice.reducer;
