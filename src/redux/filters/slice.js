import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    values: {
      category: "",
      en: " ",
      ua: " ",
      verbType: "",
    },
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  },
  reducers: {
    setStatusFilter: (state, action) => {
      state.values = { ...state.values, ...action.payload };

    },

    // addToFavorites(state, action) {
    //   const id = action.payload;
    //   if (!state.favorites.includes(id)) {
    //     state.favorites.push(id);
    //     localStorage.setItem("favorites", JSON.stringify(state.favorites));
    //   }
    // },
    // removeFromFavorites(state, action) {
    //   const id = action.payload;
    //   state.favorites = state.favorites.filter(
    //     (favoriteId) => favoriteId !== id
    //   );
    //   localStorage.setItem("favorites", JSON.stringify(state.favorites));
    // },
  },
});

export const { setStatusFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

// const filterSlice = createSlice({
//   name: "filters",
//   initialState: {
//     values: {
//       category: "",
//       word: "",
//       verbType: "", 
//       en: " ",
//       ua: " ",
//     },
//   },
//   reducers: {
//     setStatusFilter: (state, action) => {
//       state.values = { ...state.values, ...action.payload };
//     },
//   },
// });

// export const { setStatusFilter } =
//   filterSlice.actions;
// export const filterReducer = filterSlice.reducer;
