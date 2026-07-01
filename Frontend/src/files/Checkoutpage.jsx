import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { formatAmount } from "../utils/formatCurrency";

const inputClass =
  "w-full bg-white border border-[#333333] rounded-lg px-4 py-3 text-[#333333] placeholder-gray-400 focus:outline-none focus:border-[#333333] focus:ring-1 focus:ring-[#333333] transition text-sm";

const labelClass = "block text-xs font-semibold text-[#333333]/70 uppercase tracking-widest mb-1.5";

const SHIPPING = 5.99;
const TAX_RATE = 0.08;

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔗 CART -> CHECKOUT (items passed from Cart.jsx via navigate state)
  const PRODUCTS = location.state?.items || [];

  const SUBTOTAL = PRODUCTS.reduce(
    (sum, p) => sum + Number(p.price) * (p.quantity || p.qty || 1),
    0
  );
  const TAX = SUBTOTAL * TAX_RATE;
  const TOTAL = PRODUCTS.length ? SUBTOTAL + SHIPPING + TAX : 0;

  const [paymentMethod, setPaymentMethod] = useState("rs");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "Pakistan",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const formatPrice = (amount) => formatAmount(amount, paymentMethod);

  const formatCard = (val) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    return digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = "Valid email required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.zip.trim()) e.zip = "Required";
    if (paymentMethod === "us") {
      if (cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Enter 16-digit card number";
      if (!expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = "MM/YY required";
      if (cvv.length < 3) e.cvv = "3 or 4 digits required";
    }
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  };

  const setField = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((er) => ({ ...er, [key]: "" }));
  };

  // ❌ NO CART DATA — sent here directly without going through /cart
  if (!submitted && PRODUCTS.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center space-y-4 text-gray-400">
          <p className="text-[#333333] font-medium">Cart khali hai, checkout nahi ho sakta</p>
          <button
            onClick={() => navigate("/cart")}
            className="bg-[#333333] hover:bg-[#1f1f1f] active:scale-[0.98] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all"
          >
            Cart par jayein
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md w-full">
          <div className="w-20 h-20 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-white">✓</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] mb-3">Order Confirmed!</h2>
          <p className="text-gray-600 mb-2">Thanks, {form.firstName}! Your order has been placed.</p>
          <p className="text-gray-500 text-sm mb-8">
            A confirmation will be sent to{" "}
            <span className="text-[#333333] font-medium break-all">{form.email}</span>.
          </p>
          <div className="bg-white border border-[#333333] rounded-2xl p-5 text-left mb-6">
            <p className="text-gray-500 text-sm mb-1">Payment method</p>
            <p className="text-[#333333] font-semibold capitalize">
              {paymentMethod === "us" ? "💳 Credit / Debit Card (USD)" : "💵 Cash on Delivery (PKR)"}
            </p>
            <p className="text-gray-500 text-sm mt-3 mb-1">Total charged</p>
            <p className="text-[#333333] font-bold text-xl">{formatPrice(TOTAL)}</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-gray-500 hover:text-[#333333] text-sm transition underline underline-offset-4"
          >
            Continue shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#333333]">
      {/* Header */}
      <header className="border-b border-[#333333] px-4 sm:px-6 py-4 bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <Link
            to="/cart"
            className="flex items-center justify-center size-10 shrink-0 text-[#333333] hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back to cart"
          >
            <IoArrowBack className="size-5" />
          </Link>

          <div className="flex justify-center min-w-0 flex-1">
            <img
              className="logo-responsive h-[28px] sm:h-[32px] w-auto object-contain"
              src="//insignia.com.pk/cdn/shop/files/final_logo_insignia-01_2847a8f6-7ff7-4e81-ab09-44d3d3fe386e.png?v=1686553684&width=600"
              alt="Insignia PK"
              srcSet="//insignia.com.pk/cdn/shop/files/final_logo_insignia-01_2847a8f6-7ff7-4e81-ab09-44d3d3fe386e.png?v=1686553684&width=200 200w, //insignia.com.pk/cdn/shop/files/final_logo_insignia-01_2847a8f6-7ff7-4e81-ab09-44d3d3fe386e.png?v=1686553684&width=300 300w"
              loading="eager"
            />
          </div>
        </div>
      </header>

      {/* Mobile collapsible order summary banner */}
      <div className="lg:hidden border-b border-[#333333] bg-gray-50">
        <button
          onClick={() => setSummaryOpen((o) => !o)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm"
        >
          <span className="flex items-center gap-2 text-[#333333] font-medium">
            🛒 {summaryOpen ? "Hide" : "Show"} order summary
          </span>
          <span className="flex items-center gap-2 text-[#333333] font-bold">
            {formatPrice(TOTAL)}
            <span className="text-gray-500 text-xs transition-transform" style={{ transform: summaryOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
          </span>
        </button>
        {summaryOpen && (
          <div className="px-4 pb-4 space-y-3 border-t border-[#333333] pt-4">
            {PRODUCTS.map((p, i) => (
              <div key={p._id || p.productId || i} className="flex items-center gap-3">
                <img
                  src={p.images?.[0] || ""}
                  alt={p.name}
                  className="w-10 h-10 bg-gray-100 border border-[#333333] rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#333333] truncate">{p.name}</p>
                  <p className="text-gray-500 text-xs">Qty: {p.quantity || p.qty}</p>
                </div>
                <p className="text-sm font-semibold text-[#333333] shrink-0">
                  {formatPrice(p.price * (p.quantity || p.qty))}
                </p>
              </div>
            ))}
            <div className="border-t border-[#333333] pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="text-[#333333]">{formatPrice(SUBTOTAL)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="text-[#333333]">{formatPrice(SHIPPING)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax (8%)</span><span className="text-[#333333]">{formatPrice(TAX)}</span></div>
              <div className="flex justify-between font-bold pt-1 text-[#333333]"><span>Total</span><span>{formatPrice(TOTAL)}</span></div>
            </div>
          </div>
        )}
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-10 lg:grid lg:grid-cols-[1fr_400px] lg:gap-10">
        {/* LEFT: Forms */}
        <div className="space-y-8">

          {/* Contact Info */}
          <section>
            <h2 className="text-base sm:text-lg font-bold mb-5 flex items-center gap-2 text-[#333333]">
              <span className="w-7 h-7 bg-[#333333] text-white rounded-full text-xs flex items-center justify-center font-bold shrink-0">1</span>
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First name</label>
                <input
                  type="text" placeholder="First name" value={form.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  className={`${inputClass} ${errors.firstName ? "border-red-500" : ""}`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className={labelClass}>Last name</label>
                <input
                  type="text" placeholder="Last name" value={form.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  className={`${inputClass} ${errors.lastName ? "border-red-500" : ""}`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Email</label>
                <input
                  type="email" placeholder="you@example.com" value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className={`${inputClass} ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Phone (optional)</label>
                <input
                  type="tel" placeholder="+92 " value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Shipping Address */}
          <section>
            <h2 className="text-base sm:text-lg font-bold mb-5 flex items-center gap-2 text-[#333333]">
              <span className="w-7 h-7 bg-[#333333] text-white rounded-full text-xs flex items-center justify-center font-bold shrink-0">2</span>
              Shipping Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelClass}>Street Address</label>
                <input
                  placeholder="123 Main Street, Apt 4B" value={form.address}
                  onChange={(e) => setField("address", e.target.value)}
                  className={`${inputClass} ${errors.address ? "border-red-500" : ""}`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              <div>
                <label className={labelClass}>City</label>
                <input
                  placeholder="New York" value={form.city}
                  onChange={(e) => setField("city", e.target.value)}
                  className={`${inputClass} ${errors.city ? "border-red-500" : ""}`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className={labelClass}>State / Province</label>
                <input
                  placeholder="NY" value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>ZIP / Postal Code</label>
                <input
                  placeholder="10001" value={form.zip}
                  onChange={(e) => setField("zip", e.target.value)}
                  className={`${inputClass} ${errors.zip ? "border-red-500" : ""}`}
                />
                {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
              </div>
              <div>
                <label className={labelClass}>Country</label>
                <select
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="US">🇺🇸 United States</option>
                  <option value="GB">🇬🇧 United Kingdom</option>
                  <option value="PK">🇵🇰 Pakistan</option>
                  <option value="CA">🇨🇦 Canada</option>
                  <option value="AU">🇦🇺 Australia</option>
                  <option value="IN">🇮🇳 India</option>
                </select>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section>
            <h2 className="text-base sm:text-lg font-bold mb-5 flex items-center gap-2 text-[#333333]">
              <span className="w-7 h-7 bg-[#333333] text-white rounded-full text-xs flex items-center justify-center font-bold shrink-0">3</span>
              Payment Method
            </h2>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setPaymentMethod("us")}
                className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${paymentMethod === "us" ? "border-[#333333] bg-[#333333]/10" : "border-[#333333] bg-white hover:bg-gray-50"}`}
              >
                {paymentMethod === "us" && (
                  <span className="absolute top-3 right-3 w-4 h-4 bg-[#333333] text-white rounded-full flex items-center justify-center text-xs">✓</span>
                )}
                <div className="text-2xl mb-2">💳</div>
                <div className="font-semibold text-sm text-[#333333]">Card Payment (USD)</div>
                <div className="text-gray-500 text-xs mt-0.5">Visa, Mastercard, Amex</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {["VISA", "MC", "AMEX"].map((b) => (
                    <span key={b} className="text-[9px] bg-gray-100 border border-[#333333] text-[#333333] px-1.5 py-0.5 rounded font-mono">{b}</span>
                  ))}
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod("rs")}
                className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${paymentMethod === "rs" ? "border-[#333333] bg-[#333333]/10" : "border-[#333333] bg-white hover:bg-gray-50"}`}
              >
                {paymentMethod === "rs" && (
                  <span className="absolute top-3 right-3 w-4 h-4 bg-[#333333] text-white rounded-full flex items-center justify-center text-xs">✓</span>
                )}
                <div className="text-2xl mb-2">💵</div>
                <div className="font-semibold text-sm text-[#333333]">Cash on Delivery (PKR)</div>
                <div className="text-gray-500 text-xs mt-0.5">Pay when you receive</div>
                <div className="flex gap-1 mt-2">
                  <span className="text-[9px] bg-gray-100 border border-[#333333] text-green-700 px-1.5 py-0.5 rounded font-mono">FREE</span>
                </div>
              </button>
            </div>

            {paymentMethod === "us" && (
              <div className="bg-white border border-[#333333] rounded-xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-[#333333]">Card Details</span>
                  <span className="text-xs text-gray-500 ml-auto flex items-center gap-1">🔒 256-bit SSL</span>
                </div>
                <div>
                  <label className={labelClass}>Card Number</label>
                  <div className="relative">
                    <input
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => { setCardNumber(formatCard(e.target.value)); setErrors({ ...errors, cardNumber: "" }); }}
                      className={`${inputClass} pr-12 ${errors.cardNumber ? "border-red-500" : ""}`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg">
                      {cardNumber.startsWith("4") ? "💳" : cardNumber.startsWith("5") ? "🟡" : "💳"}
                    </span>
                  </div>
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Expiry</label>
                    <input
                      placeholder="MM/YY" value={expiry}
                      onChange={(e) => { setExpiry(formatExpiry(e.target.value)); setErrors({ ...errors, expiry: "" }); }}
                      className={`${inputClass} ${errors.expiry ? "border-red-500" : ""}`}
                    />
                    {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>CVV</label>
                    <input
                      placeholder="•••" type="password" maxLength={4} value={cvv}
                      onChange={(e) => { setCvv(e.target.value.replace(/\D/g, "")); setErrors({ ...errors, cvv: "" }); }}
                      className={`${inputClass} ${errors.cvv ? "border-red-500" : ""}`}
                    />
                    {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "rs" && (
              <div className="bg-white border border-[#333333] rounded-xl p-4 sm:p-5 flex gap-3 items-start">
                <span className="text-2xl shrink-0">📦</span>
                <div>
                  <p className="text-sm font-semibold text-[#333333] mb-1">Cash on Delivery selected</p>
                  <p className="text-gray-600 text-sm">Have the exact amount ready when your delivery arrives. Our courier will collect payment at your door.</p>
                </div>
              </div>
            )}
          </section>

          <div className="lg:hidden">
            <button
              onClick={handleSubmit}
              className="w-full bg-[#333333] hover:bg-[#333333]/90 active:scale-[0.98] text-white font-bold py-4 rounded-xl transition-all text-sm tracking-wide"
            >
              {paymentMethod === "us" ? "Pay" : "Place Order"} · {formatPrice(TOTAL)}
            </button>
            <p className="text-gray-500 text-xs text-center mt-3 flex items-center justify-center gap-1">
              <span>🔒</span> Secure &amp; encrypted checkout
            </p>
          </div>
        </div>

        {/* RIGHT: Order Summary sidebar (desktop only) */}
        <aside className="hidden lg:block lg:sticky lg:top-8 h-fit">
          <div className="bg-white border border-[#333333] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#333333]">
              <h3 className="font-bold text-base text-[#333333]">Order Summary</h3>
              <p className="text-gray-500 text-xs mt-0.5">{PRODUCTS.length} items</p>
            </div>

            <div className="px-6 py-4 space-y-4 border-b border-[#333333]">
              {PRODUCTS.map((p, i) => (
                <div key={p._id || p.productId || i} className="flex items-center gap-3">
                  <img
                    src={p.images?.[0] || ""}
                    alt={p.name}
                    className="w-12 h-12 bg-gray-100 border border-[#333333] rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#333333] truncate">{p.name}</p>
                    <p className="text-gray-500 text-xs">Qty: {p.quantity || p.qty}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#333333] shrink-0">
                    {formatPrice(p.price * (p.quantity || p.qty))}
                  </p>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 space-y-3 border-b border-[#333333] text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span><span className="text-[#333333]">{formatPrice(SUBTOTAL)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span><span className="text-[#333333]">{formatPrice(SHIPPING)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span><span className="text-[#333333]">{formatPrice(TAX)}</span>
              </div>
            </div>
            <div className="px-6 py-4 flex justify-between items-center border-b border-[#333333]">
              <span className="font-bold text-[#333333]">Total</span>
              <span className="text-[#333333] font-bold text-xl">{formatPrice(TOTAL)}</span>
            </div>

            <div className="px-6 py-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-[#333333] hover:bg-[#333333]/90 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all text-sm tracking-wide"
              >
                {paymentMethod === "us" ? "Pay" : "Place Order"} · {formatPrice(TOTAL)}
              </button>
              <p className="text-gray-500 text-xs text-center mt-3 flex items-center justify-center gap-1">
                <span>🔒</span> Secure &amp; encrypted checkout
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}