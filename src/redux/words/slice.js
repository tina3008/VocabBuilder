import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  allWords,
  addWord,
  deleteWord,
  fetchStatistics,
  fetchWordsOwn,
  changeWord,
  addWordId,
  fetchTasks,
  fetchAnswers,
  fetchWordById,
  fetchAllOwnWords,
} from "./operations";
import {
  selectFilter,
  selectDictionaryWords,
  selectRecomendWords,
} from "./selectors";

import { logOut } from "../auth/operations";
const wordsSlice = createSlice({
  name: "words",
  initialState: {
    items: [],
    tasks: [],
    wordProgress: null,
    selectedWord: null,
    isLoading: false,
    error: null,
    loading: false,
    error: null,
    allWords: {},
    fetchWordsOwn: {},
    selectWord: null,
    totalCount: null,
    selectedWord: null,
    fetchTasks: [],
    setSelectAnswers: [],
    answers: [],
    dictionaryPage: {
      items: [],
      currentPage: 1,
      totalPage: "",
    },
    recommendPage: {
      items: [],
      currentPage: 1,
      totalPage: "",
    },
  },

  reducers: {
    setSelectedWord: (state, action) => {
      state.selectedWord = action.payload;
    },
    clearSelectedWord: (state) => {
      state.selectedWord = null;
    },
    setSelectTasks: (state, action) => {
      state.selectTasks = action.payload;
    },
    setSelectWord: (state, action) => {
      const wordId = action.payload?._id;
      if (wordId) {
        state.selectWord = wordId;
      }
    },
    setSelectAnswers: (state, action) => {
      state.answers = action.payload;
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
        state.recommendPage.items = action.payload.results;
        state.recommendPage.totalPage = action.payload.totalPages;
        state.recommendPage.currentPage = action.payload.page;
      })
      .addCase(allWords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.fetchTasks = action.payload.tasks;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchAnswers.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.fetchAnswers = action.payload.answers;
      })
      .addCase(fetchAnswers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchWordsOwn.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(fetchWordsOwn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.dictionaryPage.items = action.payload.results;
        state.dictionaryPage.totalPage = action.payload.totalPages;
        state.dictionaryPage.currentPage = action.payload.page;
      })
      .addCase(fetchWordsOwn.rejected, (state, action) => {
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
      .addCase(changeWord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.dictionaryPage.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.dictionaryPage.items[index] = action.payload;
        }
      })
      .addCase(addWordId.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(addWordId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.dictionaryPage.items = state.dictionaryPage.items.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(addWordId.rejected, (state, action) => {
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
        state.dictionaryPage.items = state.dictionaryPage.items.filter(
          (item) => item._id !== action.payload._id
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
        state.dictionaryPage.items = [];
        state.recommendPage.items = [];
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchWordById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchWordById.pending, (state) => {
        state.error = false;
        state.isLoading = true;
        state.item = action.payload;
      })
      .addCase(fetchWordById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.totalCount = action.payload;
      })
      .addCase(fetchAllOwnWords.pending, (state) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(fetchAllOwnWords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
        state.item = action.payload.find(
          (word) => word._id === state.selectWord
        );
      })
      .addCase(fetchAllOwnWords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const memoWordsSelector = () =>
  createSelector(
    [
      (state, pageType) => {
        if (pageType === "recommend") {
          return selectRecomendWords(state) || [];
        }
        if (pageType === "dictionary") {
          return selectDictionaryWords(state) || [];
        }
        return [];
      },
      selectFilter,
    ],
    (words, filters) => {
      const { word, category, isIrregular } = filters.values;

      return words.filter((wordItem) => {
        const matchesWord = word
          ? wordItem.en?.toLowerCase().includes(word.trim().toLowerCase())
          : true;

        const matchesCategory = category
          ? wordItem.category === category
          : true;

        const matchesVerbType =
          category === "verb" && isIrregular
            ? wordItem.isIrregular === isIrregular
            : true;

        return matchesWord && matchesCategory && matchesVerbType;
      });
    }
  );

export const visibleWords = (pageType) =>
  createSelector(
    [
      (state) => {
        if (pageType === "recommend") {
          return selectRecomendWords || [];
        }
        if (pageType === "dictionary") {
          return selectDictionaryWords || [];
        }
        return [];
      },
      selectFilter,
    ],

    (words, filters) => {
      const { word, category, isIrregular } = filters.values;

      return words.filter((wordItem) => {
        const matchesWord = word
          ? wordItem.en?.toLowerCase().includes(word.trim().toLowerCase())
          : true;

        const matchesCategory = category
          ? wordItem.category === category
          : true;

        const matchesVerbType =
          category === "verb" && isIrregular
            ? wordItem.isIrregular === isIrregular
            : true;

        return matchesWord && matchesCategory && matchesVerbType;
      });
    }
  );

export const wordReducer = wordsSlice.reducer;
export const {
  setSelectedWord,
  clearSelectedWord,
  setSelectTasks,
  setSelectWord,
  setSelectAnswers,
} = wordsSlice.actions;
