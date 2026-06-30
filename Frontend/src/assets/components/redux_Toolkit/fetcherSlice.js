import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL = "http://localhost:3000/admin";

// ── 1. Fetch All Products ───────────────────────────────
export const fetchData = createAsyncThunk(
  'products/fetchData',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/products/getproducts`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      return Array.isArray(data) ? data : data.products || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ── 2. Delete Product ───────────────────────────────────
export const deleteProductAsync = createAsyncThunk(
  'products/delete',
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/deleteproduct/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      return id; // ← deleted id wapas aayega — filter ke liye
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ── 3. Edit Product ─────────────────────────────────────
export const editProductAsync = createAsyncThunk(
  'products/edit',
  async ({ id, updatedData }, thunkAPI) => {
    // ↑ id — konsa product  updatedData — kya change karna hai
    try {
      const res = await fetch(`${BASE_URL}/updateproduct/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Failed to update product");
      const data = await res.json();
      return data.product; // ← updated product wapas aayega
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ── Slice ───────────────────────────────────────────────
const fetcherSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
    deleteLoading: false,  // ← delete ke liye alag loading
    editLoading: false,    // ← edit ke liye alag loading
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ── Fetch ────────────────────────────────────────
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── Delete ───────────────────────────────────────
      .addCase(deleteProductAsync.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.deleteLoading = false;
        // action.payload = deleted product ka id
        state.products = state.products.filter(
          (p) => p._id !== action.payload
        );
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      // ── Edit ─────────────────────────────────────────
      .addCase(editProductAsync.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(editProductAsync.fulfilled, (state, action) => {
        state.editLoading = false;
        // action.payload = updated product
        // purana product dhundo aur replace karo
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload; // ← replace karo
        }
      })
      .addCase(editProductAsync.rejected, (state, action) => {
        state.editLoading = false;
        state.error = action.payload;
      });
  }
});

export default fetcherSlice.reducer;