import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    activeModal: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
    setModalData: (state, action) => {
      state.modalData = action.payload;
    },
  },
});

export const { openModal, closeModal, setModalData } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
