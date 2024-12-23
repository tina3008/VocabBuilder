import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchWords, addWord, deleteWord } from "./operations";
import { selectWords } from "./selectors";
import { selectFilter } from "./selectors";
import { logOut } from "../auth/operations";
const wordsSlice = createSlice({
  name: "words",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(fetchWords.fulfilled, (state, action) => {    
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.map((word, index) => ({
          id: word.id || index,
          ...word,
        }));
      })
      .addCase(fetchWords.rejected, (state, action) => {
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
    if (!filters || !filters.values) {
      return words;
    }

    // return words.filter((word) => {
    //   const { levels, languages, price_per_hour } = filters.values;
    //   let matches = true;

      // if (levels) {
      //   matches = matches && teacher.levels.includes(levels);
      // }

      // if (languages) {
      //   matches = matches && teacher.languages.includes(languages);
      // }

      // if (price_per_hour) {
      //   matches = matches && teacher.price_per_hour == price_per_hour;
      // }

    //   return matches;
    // });
  }
);
export const wordReducer = wordsSlice.reducer;
