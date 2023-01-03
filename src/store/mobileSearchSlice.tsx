import { createSlice } from "@reduxjs/toolkit";

export const mobileSearchSlice = createSlice({
  name: "mobileSearch",
  initialState: {
    show: false,
  },

  reducers: {
    onToggle: (state) => {
      state.show = !state.show;
    },
  },
});

export const { onToggle } = mobileSearchSlice.actions;

export default mobileSearchSlice.reducer;
