import { configureStore } from "@reduxjs/toolkit";
import FetchPrducts from "./fetcherSlice";
import cartReducer   from "./cartSlice"
import favouriteReducer from "../redux_Toolkit/Favouriteslice"
import authReducer from "../redux_Toolkit/authSlice"
import orderReducer from "../redux_Toolkit/OrderSlice"

export const store = configureStore({
  reducer: {
    FetchPrducts,
    cart: cartReducer,  
    favourites: favouriteReducer,
    auth: authReducer,
    orders: orderReducer,
    
  },
});