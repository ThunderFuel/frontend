import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    showCloseBetaModal: false,
  },
  reducers: {
    toggleClosedBetaModal: (state) => {
      state.showCloseBetaModal = !state.showCloseBetaModal;
    },
  },
  extraReducers: {},
});

export const { toggleClosedBetaModal } = commonSlice.actions;

export default commonSlice.reducer;
