import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  suggestions: [],
  newsList: [],
  currentPage: 1,
  totalResults: 0, 
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
      state.totalResults = action.payload; 
    },
  },
});

export const {
  setSearchTerm,
  setSuggestions,
  setNewsList,
  setCurrentPage,
  setTotalResults, 
} = newsSlice.actions;

export default newsSlice.reducer;
