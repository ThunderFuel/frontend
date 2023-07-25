import { configureStore } from "@reduxjs/toolkit";
import { commonSlice } from "./commonSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cartSlice } from "./cartSlice";
import { mobileSearchSlice } from "./mobileSearchSlice";
import { walletSlice } from "./walletSlice";
import { checkoutSlice } from "./checkoutSlice";
import { NFTDetailsSlice } from "./NFTDetailsSlice";
import { bulkListingSlice } from "./bulkListingSlice";

const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    cart: cartSlice.reducer,
    mobileSearch: mobileSearchSlice.reducer,
    wallet: walletSlice.reducer,
    checkout: checkoutSlice.reducer,
    nftdetails: NFTDetailsSlice.reducer,
    bulkListing: bulkListingSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
