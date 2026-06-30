import { useState } from "react";

const inputClass =
  "w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition text-sm";

const labelClass = "block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1.5";

const PRODUCTS = [
  { name: "Wireless Headphones Pro", qty: 1, price: 129.99, img: "🎧" },
  { name: "USB-C Charging Cable", qty: 2, price: 14.99, img: "🔌" },
];

const SUBTOTAL = PRODUCTS.reduce((sum, p) => sum + p.price * p.qty, 0);
const SHIPPING = 5.99;
const TAX = SUBTOTAL * 0.08;
const TOTAL = SUBTOTAL + SHIPPING + TAX;

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("stripe");
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
    if (paymentMethod === "stripe") {
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

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md w-full">
          <div className="w-20 h-20 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Order Confirmed!</h2>
          <p className="text-zinc-400 mb-2">Thanks, {form.firstName}! Your order has been placed.</p>
          <p className="text-zinc-500 text-sm mb-8">
            A confirmation will be sent to{" "}
            <span className="text-violet-400 break-all">{form.email}</span>.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-left mb-6">
            <p className="text-zinc-400 text-sm mb-1">Payment method</p>
            <p className="text-white font-semibold capitalize">
              {paymentMethod === "stripe" ? "💳 Credit / Debit Card" : "💵 Cash on Delivery"}
            </p>
            <p className="text-zinc-400 text-sm mt-3 mb-1">Total charged</p>
            <p className="text-violet-400 font-bold text-xl">${TOTAL.toFixed(2)}</p>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ firstName: "", lastName: "", email: "", phone: "", address: "", city: "", state: "", zip: "", country: "US" });
              setCardNumber(""); setExpiry(""); setCvv("");
            }}
            className="text-zinc-500 hover:text-white text-sm transition underline underline-offset-4"
          >
            Place another order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-sm font-bold">S</div>
            <span className="font-bold text-lg tracking-tight">ShopLux</span>
          </div>
          {/* Breadcrumbs — hide middle steps on very small screens */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-500 min-w-0">
            <span className="text-violet-400 font-medium whitespace-nowrap">Cart</span>
            <span>›</span>
            <span className="text-white font-medium whitespace-nowrap">Checkout</span>
            <span className="hidden sm:inline">›</span>
            <span className="hidden sm:inline whitespace-nowrap">Confirmation</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-zinc-500 shrink-0">
            <span>🔒</span>
            <span className="hidden sm:inline">Secure checkout</span>
          </div>
        </div>
      </header>

      {/* Mobile collapsible order summary banner */}
      <div className="lg:hidden border-b border-zinc-800 bg-zinc-900">
        <button
          onClick={() => setSummaryOpen((o) => !o)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm"
        >
          <span className="flex items-center gap-2 text-violet-400 font-medium">
            🛒 {summaryOpen ? "Hide" : "Show"} order summary
          </span>
          <span className="flex items-center gap-2 text-white font-bold">
            ${TOTAL.toFixed(2)}
            <span className="text-zinc-400 text-xs transition-transform" style={{ transform: summaryOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
          </span>
        </button>
        {summaryOpen && (
          <div className="px-4 pb-4 space-y-3 border-t border-zinc-800 pt-4">
            {PRODUCTS.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-xl shrink-0">{p.img}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{p.name}</p>
                  <p className="text-zinc-500 text-xs">Qty: {p.qty}</p>
                </div>
                <p className="text-sm font-semibold text-white shrink-0">${(p.price * p.qty).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t border-zinc-800 pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-zinc-400"><span>Subtotal</span><span className="text-white">${SUBTOTAL.toFixed(2)}</span></div>
              <div className="flex justify-between text-zinc-400"><span>Shipping</span><span className="text-white">${SHIPPING.toFixed(2)}</span></div>
              <div className="flex justify-between text-zinc-400"><span>Tax (8%)</span><span className="text-white">${TAX.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold pt-1"><span>Total</span><span className="text-violet-400">${TOTAL.toFixed(2)}</span></div>
            </div>
          </div>
        )}
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-10 lg:grid lg:grid-cols-[1fr_400px] lg:gap-10">
        {/* LEFT: Forms */}
        <div className="space-y-8">

          {/* Contact Info */}
          <section>
            <h2 className="text-base sm:text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-7 h-7 bg-violet-600 rounded-full text-xs flex items-center justify-center font-bold shrink-0">1</span>
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First name */}
              <div>
                <label className={labelClass}>First name</label>
                <input
                  type="text" placeholder="First name" value={form.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  className={`${inputClass} ${errors.firstName ? "border-red-500" : ""}`}
                />
                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
              </div>
              {/* Last name */}
              <div>
                <label className={labelClass}>Last name</label>
                <input
                  type="text" placeholder="Last name" value={form.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  className={`${inputClass} ${errors.lastName ? "border-red-500" : ""}`}
                />
                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
              </div>
              {/* Email */}
              <div className="sm:col-span-2">
                <label className={labelClass}>Email</label>
                <input
                  type="email" placeholder="you@example.com" value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className={`${inputClass} ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              {/* Phone */}
              <div className="sm:col-span-2">
                <label className={labelClass}>Phone (optional)</label>
                <input
                  type="tel" placeholder="+1 (555) 000-0000" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Shipping Address */}
          <section>
            <h2 className="text-base sm:text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-7 h-7 bg-violet-600 rounded-full text-xs flex items-center justify-center font-bold shrink-0">2</span>
              Shipping Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Street */}
              <div className="sm:col-span-2">
                <label className={labelClass}>Street Address</label>
                <input
                  placeholder="123 Main Street, Apt 4B" value={form.address}
                  onChange={(e) => setField("address", e.target.value)}
                  className={`${inputClass} ${errors.address ? "border-red-500" : ""}`}
                />
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
              </div>
              {/* City */}
              <div>
                <label className={labelClass}>City</label>
                <input
                  placeholder="New York" value={form.city}
                  onChange={(e) => setField("city", e.target.value)}
                  className={`${inputClass} ${errors.city ? "border-red-500" : ""}`}
                />
                {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
              </div>
              {/* State */}
              <div>
                <label className={labelClass}>State / Province</label>
                <input
                  placeholder="NY" value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className={inputClass}
                />
              </div>
              {/* ZIP */}
              <div>
                <label className={labelClass}>ZIP / Postal Code</label>
                <input
                  placeholder="10001" value={form.zip}
                  onChange={(e) => setField("zip", e.target.value)}
                  className={`${inputClass} ${errors.zip ? "border-red-500" : ""}`}
                />
                {errors.zip && <p className="text-red-400 text-xs mt-1">{errors.zip}</p>}
              </div>
              {/* Country */}
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
            <h2 className="text-base sm:text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-7 h-7 bg-violet-600 rounded-full text-xs flex items-center justify-center font-bold shrink-0">3</span>
              Payment Method
            </h2>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 mb-6">
              {/* Card Payment */}
              <button
                onClick={() => setPaymentMethod("stripe")}
                className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${paymentMethod === "stripe" ? "border-violet-500 bg-violet-500/10" : "border-zinc-700 bg-zinc-900 hover:border-zinc-600"}`}
              >
                {paymentMethod === "stripe" && (
                  <span className="absolute top-3 right-3 w-4 h-4 bg-violet-500 rounded-full flex items-center justify-center text-xs">✓</span>
                )}
                <div className="text-2xl mb-2">💳</div>
                <div className="font-semibold text-sm">Card Payment</div>
                <div className="text-zinc-500 text-xs mt-0.5">Visa, Mastercard, Amex</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {["VISA", "MC", "AMEX"].map((b) => (
                    <span key={b} className="text-[9px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded font-mono">{b}</span>
                  ))}
                </div>
              </button>

              {/* Cash on Delivery */}
              <button
                onClick={() => setPaymentMethod("cod")}
                className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${paymentMethod === "cod" ? "border-violet-500 bg-violet-500/10" : "border-zinc-700 bg-zinc-900 hover:border-zinc-600"}`}
              >
                {paymentMethod === "cod" && (
                  <span className="absolute top-3 right-3 w-4 h-4 bg-violet-500 rounded-full flex items-center justify-center text-xs">✓</span>
                )}
                <div className="text-2xl mb-2">💵</div>
                <div className="font-semibold text-sm">Cash on Delivery</div>
                <div className="text-zinc-500 text-xs mt-0.5">Pay when you receive</div>
                <div className="flex gap-1 mt-2">
                  <span className="text-[9px] bg-zinc-800 text-green-400 px-1.5 py-0.5 rounded font-mono">FREE</span>
                </div>
              </button>
            </div>

            {/* Card Fields */}
            {paymentMethod === "stripe" && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-zinc-300">Card Details</span>
                  <span className="text-xs text-zinc-600 ml-auto flex items-center gap-1">🔒 256-bit SSL</span>
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
                  {errors.cardNumber && <p className="text-red-400 text-xs mt-1">{errors.cardNumber}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Expiry</label>
                    <input
                      placeholder="MM/YY" value={expiry}
                      onChange={(e) => { setExpiry(formatExpiry(e.target.value)); setErrors({ ...errors, expiry: "" }); }}
                      className={`${inputClass} ${errors.expiry ? "border-red-500" : ""}`}
                    />
                    {errors.expiry && <p className="text-red-400 text-xs mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>CVV</label>
                    <input
                      placeholder="•••" type="password" maxLength={4} value={cvv}
                      onChange={(e) => { setCvv(e.target.value.replace(/\D/g, "")); setErrors({ ...errors, cvv: "" }); }}
                      className={`${inputClass} ${errors.cvv ? "border-red-500" : ""}`}
                    />
                    {errors.cvv && <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* COD Info */}
            {paymentMethod === "cod" && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5 flex gap-3 items-start">
                <span className="text-2xl shrink-0">📦</span>
                <div>
                  <p className="text-sm font-semibold text-zinc-200 mb-1">Cash on Delivery selected</p>
                  <p className="text-zinc-500 text-sm">Have the exact amount ready when your delivery arrives. Our courier will collect payment at your door.</p>
                </div>
              </div>
            )}
          </section>

          {/* Submit button — mobile only (bottom of form) */}
          <div className="lg:hidden">
            <button
              onClick={handleSubmit}
              className="w-full bg-violet-600 hover:bg-violet-500 active:scale-[0.98] text-white font-bold py-4 rounded-xl transition-all text-sm tracking-wide"
            >
              {paymentMethod === "stripe" ? "Pay" : "Place Order"} · ${TOTAL.toFixed(2)}
            </button>
            <p className="text-zinc-600 text-xs text-center mt-3 flex items-center justify-center gap-1">
              <span>🔒</span> Secure &amp; encrypted checkout
            </p>
          </div>
        </div>

        {/* RIGHT: Order Summary sidebar (desktop only) */}
        <aside className="hidden lg:block lg:sticky lg:top-8 h-fit">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h3 className="font-bold text-base">Order Summary</h3>
              <p className="text-zinc-500 text-xs mt-0.5">{PRODUCTS.length} items</p>
            </div>

            {/* Items */}
            <div className="px-6 py-4 space-y-4 border-b border-zinc-800">
              {PRODUCTS.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-2xl shrink-0">{p.img}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{p.name}</p>
                    <p className="text-zinc-500 text-xs">Qty: {p.qty}</p>
                  </div>
                  <p className="text-sm font-semibold text-white shrink-0">${(p.price * p.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Promo */}
            <div className="px-6 py-4 border-b border-zinc-800">
              <div className="flex gap-2">
                <input placeholder="Promo code" className={`${inputClass} flex-1 text-xs py-2.5`} />
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-4 rounded-lg transition whitespace-nowrap">Apply</button>
              </div>
            </div>

            {/* Totals */}
            <div className="px-6 py-4 space-y-3 border-b border-zinc-800 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span><span className="text-white">${SUBTOTAL.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Shipping</span><span className="text-white">${SHIPPING.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Tax (8%)</span><span className="text-white">${TAX.toFixed(2)}</span>
              </div>
            </div>
            <div className="px-6 py-4 flex justify-between items-center border-b border-zinc-800">
              <span className="font-bold">Total</span>
              <span className="text-violet-400 font-bold text-xl">${TOTAL.toFixed(2)}</span>
            </div>

            {/* Submit — desktop */}
            <div className="px-6 py-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-violet-600 hover:bg-violet-500 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all text-sm tracking-wide"
              >
                {paymentMethod === "stripe" ? "Pay" : "Place Order"} · ${TOTAL.toFixed(2)}
              </button>
              <p className="text-zinc-600 text-xs text-center mt-3 flex items-center justify-center gap-1">
                <span>🔒</span> Secure &amp; encrypted checkout
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
