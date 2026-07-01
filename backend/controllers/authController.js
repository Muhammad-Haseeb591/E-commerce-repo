const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==============================
// Generate JWT Token
// ==============================
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ==============================
// Send Cookie + User
// ==============================
const sendToken = (user, res) => {
  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true only in production
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
  });

  return res.status(200).json({
    success: true,
    message: "Authentication successful.",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
};

// ==============================
// REGISTER
// ==============================
exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const user = await User.create({
      fullName,
      email,
      password,
    });

    sendToken(user, res);

  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// LOGIN
// ==============================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    sendToken(user, res);

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// LOGOUT
// ==============================
exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};

// ==============================
// GET LOGGED-IN USER
// ==============================
exports.getMe = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("GetMe Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};