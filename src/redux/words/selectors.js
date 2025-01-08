export const selectWords = (state) => state.words.items;
export const selectWord = (state) => state.words.item;
 export const state = (state) => state;

export const selectLoading = (state) => state.words.isLoading;
export const selectError = (state) => state.words.error;
 export const selectFilter = (state) => state.filters;
export const selectStatistics = (state) => state.words.totalCount;
export const selectedWord = (state) => state.words.selectedWord;