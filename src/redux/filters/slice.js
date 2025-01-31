import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../words/operations";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    values: {
      category: "",
      en: " ",
      ua: " ",
      isIrregular: "",
    },
    pageType: "dictionary",
  },
  reducers: {
    setStatusFilter: (state, action) => {
      state.values = { ...state.values, ...action.payload };
    },
    setPageType: (state, action) => {
      state.pageType = action.payload; 
    },
  },
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;  
        
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setStatusFilter, setCategory, setPageType } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
export const categoriesReducer = categoriesSlice.reducer;