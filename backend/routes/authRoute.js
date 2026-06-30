const express        = require("express");
const authController = require("../controllers/authController");
const { protect }    = require("../middleware/authMiddleware");   // ✅ sahi path

const authRouter = express.Router();

authRouter.post("/send-otp",      authController.sendOtp);
authRouter.post("/verify-signup", authController.verifySignup);
authRouter.post("/login",         authController.login);
authRouter.get("/me",   protect,  authController.getMe);

module.exports = { authRouter };