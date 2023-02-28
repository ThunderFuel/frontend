import { createSlice } from "@reduxjs/toolkit";
import { useLocalStorage } from "hooks/useLocalStorage";

const { getItem } = useLocalStorage();
const firstLogin = getItem("firstLogin");

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    showClosedBetaModal: firstLogin ? true : false,
  },
  reducers: {
    toggleClosedBetaModal: (state) => {
      state.showClosedBetaModal = !state.showClosedBetaModal;
    },
  },
  extraReducers: {},
});

export const { toggleClosedBetaModal } = commonSlice.actions;

export default commonSlice.reducer;
