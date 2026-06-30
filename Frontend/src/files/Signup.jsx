import { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, Phone, ShoppingBag } from "lucide-react";
import { sendOtp, verifySignup, clearError, resetOtpSent } from "../assets/components/redux_Toolkit/authSlice";

// ── Google Icon ──────────────────────────────────────────
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
  </svg>
);

// ── Password Strength ────────────────────────────────────
const getStrength = (password) => {
  let score = 0;
  if (password.length >= 8)        score++;
  if (/[A-Z]/.test(password))      score++;
  if (/[0-9]/.test(password))      score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const STRENGTH_LABEL = ["Bohat kamzor", "Kamzor", "Theek hai", "Achi", "Mazboot"];
const STRENGTH_COLOR = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-lime-500", "bg-green-500"];

// ── OTP Input ────────────────────────────────────────────
const OtpInput = ({ value, onChange, length = 4 }) => {
  const inputsRef = useRef([]);

  const handleChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const otpArr = value.split("");
    otpArr[i]    = val.slice(-1);
    const newOtp = otpArr.join("").padEnd(length, "");
    onChange(newOtp.trimEnd());
    if (val && i < length - 1) inputsRef.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !value[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2.5 justify-center">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-12 py-3 text-center text-lg font-semibold rounded-xl border border-gray-200 text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#333333]/10 focus:border-[#333333] transition-all"
        />
      ))}
    </div>
  );
};

// ── Main Signup Component ────────────────────────────────
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, otpSent } = useSelector((state) => state.auth);

  // Form fields
  const [fullName,      setFullName]      = useState("");
  const [email,         setEmail]         = useState("");
  const [phone,         setPhone]         = useState("");
  const [password,      setPassword]      = useState("");
  const [confirmPass,   setConfirmPass]   = useState("");
  const [showPassword,  setShowPassword]  = useState(false);
  const [agreed,        setAgreed]        = useState(false);
  const [subscribeNews, setSubscribeNews] = useState(true);

  // OTP fields
  const [otp,          setOtp]          = useState("");
  const [resendTimer,  setResendTimer]  = useState(0);
  const [localError,   setLocalError]   = useState("");

  const strength   = getStrength(password);
  const redirectTo = location.state?.from || "/";

  // Resend OTP countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  // OTP bhejne ke baad timer start karo
  useEffect(() => {
    if (otpSent) setResendTimer(30);
  }, [otpSent]);

  // Form validation
  const validateForm = () => {
    if (!fullName.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setLocalError("Tamam fields zaroori hain");
      return false;
    }
    if (!/^\d{10,11}$/.test(phone.replace(/\D/g, ""))) {
      setLocalError("Sahi phone number darj karein");
      return false;
    }
    if (password.length < 8) {
      setLocalError("Password kam az kam 8 characters ka hona chahiye");
      return false;
    }
    if (password !== confirmPass) {
      setLocalError("Passwords match nahi kar rahe");
      return false;
    }
    if (!agreed) {
      setLocalError("Terms & Conditions accept karna zaroori hai");
      return false;
    }
    return true;
  };

  // Step 1 — OTP bhejo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    dispatch(clearError());
    if (!validateForm()) return;

    dispatch(sendOtp({ fullName, email, phone, password, subscribeNews }));
  };

  // Step 2 — OTP verify
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLocalError("");
    dispatch(clearError());

    if (otp.length < 4) {
      setLocalError("Pura 4-digit code darj karein");
      return;
    }

    const result = await dispatch(verifySignup({ email, otp }));

    if (verifySignup.fulfilled.match(result)) {
      navigate(redirectTo);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setLocalError("");
    dispatch(clearError());
    dispatch(sendOtp({ fullName, email, phone, password, subscribeNews }));
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  const handleGuestCheckout = () => {
    navigate(redirectTo);
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-[400px]">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="w-11 h-11 rounded-xl bg-[#333333] mx-auto mb-5 flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <h1 className="text-[28px] font-bold text-[#333333] tracking-tight">
            {!otpSent ? "Account banayein" : "Verify karein"}
          </h1>
          <p className="text-sm text-gray-400 mt-1.5">
            {!otpSent
              ? "Shuru karne ke liye apni details bharein"
              : `Code bheja gaya hai ${email}`}
          </p>
        </div>

        {/* Card */}
        <div className="border border-gray-200 rounded-2xl p-7 shadow-sm">

          {!otpSent ? (
            <>
              {/* ── Step 1: Form ── */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Full Name */}
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Pura naam</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ali Hassan"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-[#333333] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#333333]/10 focus:border-[#333333] transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aap@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-[#333333] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#333333]/10 focus:border-[#333333] transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Phone number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="03XX-XXXXXXX"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-[#333333] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#333333]/10 focus:border-[#333333] transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">Order updates aur delivery ke liye istemal hoga</p>
                </div>

                {/* Password */}
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 text-sm text-[#333333] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#333333]/10 focus:border-[#333333] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#333333] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Strength bar */}
                  {password && (
                    <div className="mt-2">
                      <div className="flex gap-1">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors ${
                              i < strength ? STRENGTH_COLOR[strength - 1] : "bg-gray-100"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1">{STRENGTH_LABEL[Math.max(strength - 1, 0)]}</p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1.5 block">Password confirm karein</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 text-sm text-[#333333] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#333333]/10 focus:border-[#333333] transition-all"
                    />
                    {confirmPass && password === confirmPass && (
                      <Check className="w-4 h-4 text-green-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                </div>

                {/* Newsletter */}
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscribeNews}
                    onChange={(e) => setSubscribeNews(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-[#333333] cursor-pointer shrink-0"
                  />
                  <span className="text-xs text-gray-500 leading-relaxed">
                    Mujhe naye offers aur deals ke emails bhejein
                  </span>
                </label>

                {/* Terms */}
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-[#333333] cursor-pointer shrink-0"
                  />
                  <span className="text-xs text-gray-500 leading-relaxed">
                    Main{" "}
                    <Link to="/terms" className="text-[#333333] font-medium hover:underline">Terms & Conditions</Link>
                    {" "}aur{" "}
                    <Link to="/privacy" className="text-[#333333] font-medium hover:underline">Privacy Policy</Link>
                    {" "}se agree karta/karti hoon
                  </span>
                </label>

                {/* Error */}
                {displayError && (
                  <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    {displayError}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#333333] hover:bg-[#1f1f1f] text-white text-sm font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Account banayein <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 uppercase tracking-wide">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 active:scale-[0.99] transition-all text-sm font-medium text-[#333333]"
              >
                <GoogleIcon />
                Continue with Google
              </button>

              {/* Guest */}
              <button
                type="button"
                onClick={handleGuestCheckout}
                className="w-full flex items-center justify-center gap-2 py-3 mt-3 text-sm font-medium text-gray-500 hover:text-[#333333] transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Guest ki tarah shopping jari rakhein
              </button>
            </>
          ) : (
            <>
              {/* ── Step 2: OTP Verify ── */}
              <form onSubmit={handleVerifyOtp} className="space-y-5">

                <OtpInput value={otp} onChange={setOtp} length={4} />

                {displayError && (
                  <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-center">
                    {displayError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#333333] hover:bg-[#1f1f1f] text-white text-sm font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Verify karein <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>

                {/* Resend */}
                <p className="text-center text-xs text-gray-400">
                  Code nahi mila?{" "}
                  {resendTimer > 0 ? (
                    <span className="text-gray-300">Dobara bhejein ({resendTimer}s)</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-[#333333] font-medium hover:underline"
                    >
                      Dobara bhejein
                    </button>
                  )}
                </p>

                {/* Back */}
                <button
                  type="button"
                  onClick={() => dispatch(resetOtpSent())}
                  className="w-full text-center text-xs text-gray-400 hover:text-[#333333] transition-colors"
                >
                  ← Details edit karein
                </button>
              </form>
            </>
          )}
        </div>

        {/* Login link */}
        {!otpSent && (
          <p className="text-center text-sm text-gray-400 mt-6">
            Pehle se account hai?{" "}
            <Link to="/login" className="text-[#333333] font-medium hover:underline">
              Sign in karein
            </Link>
          </p>
        )}

      </div>
    </div>
  );
};

export default Signup;