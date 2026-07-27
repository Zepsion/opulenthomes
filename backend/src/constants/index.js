/**
 * Centralized application constants.
 * Import from here instead of hardcoding magic strings across the codebase.
 */

export const USER_ROLES = Object.freeze({
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  BROKER: "broker", // reserved for future Broker Portal
  BUILDER: "builder", // reserved for future Builder Portal
  CUSTOMER: "customer",
});

export const PROPERTY_STATUS = Object.freeze({
  AVAILABLE: "available",
  SOLD: "sold",
  RENTED: "rented",
  UNDER_CONSTRUCTION: "under_construction",
  DRAFT: "draft",
});

export const PROPERTY_TYPE = Object.freeze({
  APARTMENT: "apartment",
  VILLA: "villa",
  PLOT: "plot",
  COMMERCIAL: "commercial",
  PENTHOUSE: "penthouse",
  FARMHOUSE: "farmhouse",
});

export const LISTING_TYPE = Object.freeze({
  SALE: "sale",
  RENT: "rent",
});

export const LEAD_STATUS = Object.freeze({
  NEW: "new",
  CONTACTED: "contacted",
  QUALIFIED: "qualified",
  NEGOTIATION: "negotiation",
  CONVERTED: "converted",
  LOST: "lost",
});

export const LEAD_SOURCE = Object.freeze({
  WEBSITE: "website",
  PHONE: "phone",
  REFERRAL: "referral",
  WALK_IN: "walk_in",
  CHATBOT: "chatbot", // reserved for future AI Chatbot integration
  CRM: "crm", // reserved for future CRM integration
});

export const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
});

export const CLOUDINARY_FOLDERS = Object.freeze({
  PROPERTIES: "properties",
  BUILDERS: "builders",
  USERS: "users",
  LOCATIONS: "locations",
});

export const PAGINATION_DEFAULTS = Object.freeze({
  PAGE: 1,
  LIMIT: 12,
  MAX_LIMIT: 100,
});
