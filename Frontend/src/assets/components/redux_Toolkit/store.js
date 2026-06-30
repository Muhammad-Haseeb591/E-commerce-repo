import { configureStore } from "@reduxjs/toolkit";
import FetchPrducts from "./fetcherSlice";
import cartReducer   from "./cartSlice"
import favouriteReducer from "../redux_Toolkit/FavouriteSlice"
import authReducer from "../redux_Toolkit/authSlice"

export const store = configureStore({
  reducer: {
    FetchPrducts,
    cart: cartReducer,  
    favourites: favouriteReducer,
    auth: authReducer,
    
  },
});