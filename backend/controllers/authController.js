const jwt    = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
// Token
const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

// OTP — 4 digit
const generateOtp = () =>
  Math.floor(1000 + Math.random() * 9000).toString();

// SIGNUP — Step 1: Form submit, OTP bhejo
exports.sendOtp = async (req, res) => {
  try {
    const { fullName, email, phone, password, subscribeNews } = req.body;

    // Validation
    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: "Tamam fields zaroori hain" });
    }

    // Email already exist karta hai?
    const existing = await User.findOne({ email });
    if (existing && existing.isVerified) {
      return res.status(400).json({ success: false, message: "Yeh email already registered hai" });
    }

    const otp       = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    if (existing && !existing.isVerified) {
      // Pehle se unverified user hai — OTP update karo
      existing.otp       = otp;
      existing.otpExpiry = otpExpiry;
      existing.fullName  = fullName;
      existing.phone     = phone;
      existing.password  = password; // pre-save mein hash hoga
      await existing.save();
    } else {
      // Naya user banao
      await User.create({ fullName, email, phone, password, subscribeNews, otp, otpExpiry });
    }

    console.log(`OTP for ${email}: ${otp}`);
    
    res.status(200).json({ success: true, message: "OTP bhej diya gaya" });

  } catch (err) {
    console.error("sendOtp error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── SIGNUP — Step 2: OTP verify, account confirm ────────
exports.verifySignup = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email aur OTP zaroori hain" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User nahi mila" });
    }

    // OTP check
    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "OTP ghalat hai" });
    }

    // OTP expiry check
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ success: false, message: "OTP expire ho gaya, dobara bhejein" });
    }

    // Verify karo
    user.isVerified = true;
    user.otp        = undefined;
    user.otpExpiry  = undefined;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Account ban gaya!",
      token,
      user: {
        id:       user._id,
        fullName: user.fullName,
        email:    user.email,
        phone:    user.phone,
      },
    });

  } catch (err) {
    console.error("verifySignup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── LOGIN ────────────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({ success: false, message: "please provide Email/Phone or password" });
    }

    // Email ya phone se dhundho
    const user = await User.findOne({
      $or: [
        { email: emailOrPhone.toLowerCase() },
        { phone: emailOrPhone },
      ],
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Email or password is incorrect" });
    }

    if (!user.isVerified) {
      return res.status(401).json({ success: false, message: "Please verify your email first" });
    }

    // Password check
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Email or password is incorrect" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id:       user._id,
        fullName: user.fullName,
        email:    user.email,
        phone:    user.phone,
      },
    });

  } catch (err) {
    console.error("login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET CURRENT USER (protected)
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password -otp -otpExpiry");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};