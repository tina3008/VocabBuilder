import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    activeModal: null,
  },
  reducers: {
    openModal: (state, action) => {
      console.log("Opening modal:", action.payload);
      state.activeModal = action.payload;
      
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
