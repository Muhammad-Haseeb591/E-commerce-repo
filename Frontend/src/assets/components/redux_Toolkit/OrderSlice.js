import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/orders";

const config = {
  withCredentials: true,
};

// ==========================
// Fetch Orders
// ==========================
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(BASE_URL, config);
      return res.data.orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Orders fetch failed."
      );
    }
  }
);

const orderSlice = createSlice({
  name: "orders",

  initialState: {
    orders: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;