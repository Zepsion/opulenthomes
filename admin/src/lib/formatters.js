export const formatCurrency = (amount, currency = "INR") =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);

export const formatDate = (isoString) =>
  new Date(isoString).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
