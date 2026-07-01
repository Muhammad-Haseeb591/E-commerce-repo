import { createSlice } from "@reduxjs/toolkit";

const getItemId = (item) => item?._id ?? item?.id;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    hydrated: false,
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload || [];
    },

    setHydrated: (state, action) => {
      state.hydrated = action.payload;
    },

    addToCart: (state, action) => {
      const product = action.payload;
      const productId = getItemId(product);
      if (!productId) return;

      const normalized = { ...product, _id: productId };
      const existing = state.items.find((i) => getItemId(i) === productId);
      const stockLimit = normalized.stock ?? existing?.stock ?? Infinity;

      if (existing) {
        if (existing.quantity < stockLimit) {
          existing.quantity += 1;
        }
      } else {
        state.items.push({ ...normalized, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => getItemId(i) !== action.payload);
    },

    increaseQty: (state, action) => {
      const item = state.items.find((i) => getItemId(i) === action.payload);
      const stockLimit = item?.stock ?? Infinity;
      if (item && item.quantity < stockLimit) item.quantity += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((i) => getItemId(i) === action.payload);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter((i) => getItemId(i) !== action.payload);
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
  setCart,
  setHydrated,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;