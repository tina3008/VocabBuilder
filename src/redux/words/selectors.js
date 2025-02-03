export const selectWords = (state) => state.words.recommendPage;
export const selectWord = (state) => state.words.item;
export const selectDictionaryWords = (state) => state.words.dictionaryPage?.items;
export const selectRecomendWords = (state) => state.words.recommendPage?.items;
export const state = (state) => state;

export const selectLoading = (state) => state.words.isLoading;
export const selectError = (state) => state.words.error;
export const selectFilter = (state) => state.filters;
export const selectPageType = (state) => state.filters.pageType;
export const selectStatistics = (state) => state.words.totalCount;
export const selectedWord = (state) => state.words.selectedWord;
export const selectCategories = (state) => state.categories.categories;
export const selectCategoriesLoading = (state) => state.categories.loading;
export const selectCategoriesError = (state) => state.categories.error;

export const selectDictionaryPage = (state) => state.words.dictionaryPage;
export const selectRecommendPage = (state) => state.words.recommendPage;

export const selectTasks = (state) => state.words.fetchTasks;
export const selectAnswers = (state) => state.words.answers;
