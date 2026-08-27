export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Properties", path: "/properties" },
  { label: "Builders", path: "/builders" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const CONTACT_PHONE = {
  display: "+91 9769444414",
  tel: "+919769444414",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919769444414",
};

export const SOCIAL_LINKS = {
  whatsapp: `https://wa.me/${CONTACT_PHONE.whatsapp}`,
  instagram: `https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || ""}`,
};

export const LISTING_TYPE_OPTIONS = [
  { value: "sale", label: "Buy" },
  { value: "rent", label: "Rent" },
];

export const PROPERTY_TYPE_OPTIONS = [
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "penthouse", label: "Penthouse" },
  { value: "plot", label: "Plot" },
  { value: "commercial", label: "Commercial" },
  { value: "farmhouse", label: "Farmhouse" },
];

export const BUDGET_OPTIONS = [
  { value: "5000000", label: "Up to ₹50 Lac" },
  { value: "10000000", label: "Up to ₹1 Cr" },
  { value: "25000000", label: "Up to ₹2.5 Cr" },
  { value: "50000000", label: "Up to ₹5 Cr" },
  { value: "100000000", label: "Up to ₹10 Cr" },
];

export const PROPERTY_STATUS_LABELS = {
  available: "Available",
  sold: "Sold",
  rented: "Rented",
  under_construction: "Under Construction",
  draft: "Draft",
};

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
