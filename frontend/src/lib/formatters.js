export const formatCurrency = (amount, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

export const formatArea = (value, unit = "sqft") => `${value?.toLocaleString("en-IN")} ${unit}`;
