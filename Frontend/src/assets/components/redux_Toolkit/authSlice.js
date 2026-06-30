import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = "http://localhost:3000/auth";

// ── Async Thunks ─────────────────────────────────────────

// Step 1: OTP bhejo
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE}/send-otp`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "OTP nahi gaya");
    }
  }
);

// Step 2: OTP verify — account banao
export const verifySignup = createAsyncThunk(
  "auth/verifySignup",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE}/verify-signup`, { email, otp });
      return res.data; // { token, user }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "OTP ghalat hai");
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ emailOrPhone, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE}/login`, { emailOrPhone, password });
      return res.data; // { token, user }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login fail ho gaya");
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
    otpSent: false, // signup mein step 2 pe jaane ke liye
  },
  reducers: {
    // Manual logout
    logout: (state) => {
      state.user    = null;
      state.token   = null;
      state.error   = null;
      state.otpSent = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    // Error clear karo
    clearError: (state) => {
      state.error = null;
    },
    // OTP step reset karo
    resetOtpSent: (state) => {
      state.otpSent = false;
    },
  },
  extraReducers: (builder) => {

    // ── sendOtp ──
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true; // step 2 pe jao
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });

    // ── verifySignup ──
    builder
      .addCase(verifySignup.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(verifySignup.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = false;
        state.user    = action.payload.user;
        state.token   = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user",  JSON.stringify(action.payload.user));
      })
      .addCase(verifySignup.rejected, (state, action) => {
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

export const { logout, clearError, resetOtpSent } = authSlice.actions;
export default authSlice.reducer;