export const getCurrencyFromPayment = (paymentMethod) =>
  paymentMethod === "rs" ? "PKR" : "USD";

export const formatAmount = (amount, paymentMethod) => {
  const value = Number(amount) || 0;
  const currency = getCurrencyFromPayment(paymentMethod);

  if (currency === "PKR") {
    return `Rs. ${value.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;
  }

  return `$${value.toFixed(2)}`;
};
