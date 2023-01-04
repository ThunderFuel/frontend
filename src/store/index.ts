import { configureStore } from "@reduxjs/toolkit";
import { commonSlice } from "./commonSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cartSlice } from "./cartSlice";
import { mobileSearchSlice } from "./mobileSearchSlice";
import { walletSlice } from "./walletSlice";

const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    cart: cartSlice.reducer,
    mobileSearch: mobileSearchSlice.reducer,
    wallet: walletSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
