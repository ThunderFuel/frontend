import { configureStore } from "@reduxjs/toolkit";
import { commonSlice } from "./commonSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cartSlice } from "./cartSlice";

const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
