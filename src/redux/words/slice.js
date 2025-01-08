import { createSelector, createSlice } from "@reduxjs/toolkit";
import { allWords, addWord, deleteWord, fetchStatistics } from "./operations";
import { selectWords, selectFilter, selectedWord } from "./selectors";

import { logOut } from "../auth/operations";
const wordsSlice = createSlice({
  name: "words",
  initialState: {
    items: [],
    totalPage: "",
    loading: false,
    error: null,
    allWords: {},
    selectWord: null,
    totalCount: null,
    selectedWord: null,
  },

  reducers: {
    setSelectedWord: (state, action) => {
      state.selectedWord = action.payload;
      console.log("setSelectedWord", action.payload);
      
    },
    clearSelectedWord: (state) => {
      state.selectedWord = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allWords.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(allWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.results;
      })

      .addCase(allWords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addWord.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(addWord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addWord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteWord.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(deleteWord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteWord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchStatistics.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.totalCount = action.payload;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export const visibleWords = createSelector(
  [selectWords, selectFilter],
  (words, filters) => {
    const { word, category, verbType } = filters.values;

    return words.filter((wordItem) => {
      const matchesWord = word
        ? wordItem.en?.toLowerCase().includes(word.trim().toLowerCase())
        : true;

      const matchesCategory = category ? wordItem.category === category : true;

      const matchesVerbType =
        category === "verb" && verbType ? wordItem.verbType === verbType : true;

      return matchesWord && matchesCategory && matchesVerbType;
    });
  }
);

export const wordReducer = wordsSlice.reducer;
export const { setSelectedWord, clearSelectedWord } = wordsSlice.actions;