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
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;

export const selectActiveModal = (state) => state.modal.activeModal;
export const selectIsModalOpen = (state) => state.modal.activeModal;
