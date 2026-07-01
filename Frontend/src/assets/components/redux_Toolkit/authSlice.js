import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = "http://localhost:3000/auth";

// Async Thunks 

// Signup
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ fullName, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE}/register`, { fullName, email, password });
      return res.data; // { token, user }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE}/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

// ── Slice ────────────────────────────────────────────────
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:    localStorage.getItem("user")  ? JSON.parse(localStorage.getItem("user"))  : null,
    token:   localStorage.getItem("token") ? localStorage.getItem("token") : null,
    loading: false,
    error:   null,
  },
  reducers: {
    // Manual logout
    logout: (state) => {
      state.user  = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    // Error clear karo
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {

    // ── registerUser ──
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user    = action.payload.user;
        state.token   = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user",  JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });

    // ── loginUser ──
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user    = action.payload.user;
        state.token   = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user",  JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;