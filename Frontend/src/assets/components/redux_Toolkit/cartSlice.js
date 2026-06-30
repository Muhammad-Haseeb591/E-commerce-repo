import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {

    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((i) => i._id === product._id);
      if (existing) {
        if (existing.quantity < existing.stock) {
          existing.quantity += 1;
        }
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
    },

    increaseQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item && item.quantity < item.stock) item.quantity += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter((i) => i._id !== action.payload);
        } else {
          item.quantity -= 1;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;